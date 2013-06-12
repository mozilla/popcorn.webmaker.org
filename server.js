// Newrelic *must* be the first module loaded. Do not move this require module!
if ( process.env.NEW_RELIC_HOME ) {
  require( 'newrelic' );
}

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    helmet = require( "helmet" ),
    nunjucks = require('nunjucks'),
    nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader( __dirname + '/views' )),
    app = express(),
    lessMiddleware = require( 'less-middleware' ),
    requirejsMiddleware = require( 'requirejs-middleware' ),
    config = require( './lib/config' ),
    Project,
    filter,
    sanitizer = require( './lib/sanitizer' ),
    FileStore = require( './lib/file-store.js' ),
    metrics = require('./lib/metrics.js'),
    utils,
    middleware = require( './lib/middleware' ),
    stores = {},
    APP_HOSTNAME = config.hostname,
    WWW_ROOT =  __dirname + '/public',
    port = config.PORT,
    makeapiConfig = {
      apiURL: config.MAKE_ENDPOINT,
      auth: config.MAKE_USERNAME + ":" + config.MAKE_PASSWORD
    };

nunjucksEnv.express( app );

function setupStore( storeConfig ) {
  var store = FileStore.create( storeConfig.type, storeConfig.options );
  if ( store.requiresFileSystem ) {
    app.use( express.static( store.root, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) );
  }
  return store;
}

if ( config.USE_WEBFAKER ) {
  var webfaker = require( "webfaker" );

  webfaker.start({
    port: port + 1,
    username: config.MAKE_USERNAME,
    password: config.MAKE_PASSWORD,
    isAdminCheck: false
  }, function() {
    console.log( "Started Webfaker services on http://localhost ports: FakeAPI=%s, Fogin=%s, Fubble=%s",
                 port + 1, port + 2, port + 3 );

    process.on( "exit", function() {
      webfaker.stop();
    });
  });
}

app.locals({
  config: {
    ga_account: config.GA_ACCOUNT,
    ga_domain: config.GA_DOMAIN,
    user_bar: config.USER_BAR
  }
});

app.configure( function() {
  var tmpDir = path.normalize( require( "os" ).tmpDir() + "/mozilla.butter/" );

  app.use( express.logger( config.logger ) );
  if ( !!config.FORCE_SSL ) {
    app.use( helmet.hsts() );
    app.enable( "trust proxy" );
  }
  app.use( express.compress() )
    .use( lessMiddleware({
      once: config.OPTIMIZE_CSS,
      dest: tmpDir,
      src: WWW_ROOT,
      compress: config.OPTIMIZE_CSS,
      yuicompress: config.OPTIMIZE_CSS,
      optimization: config.OPTIMIZE_CSS ? 0 : 2
    }))
    .use( requirejsMiddleware({
      src: WWW_ROOT,
      dest: tmpDir,
      once: config.OPTIMIZE_JS,
      modules: {
        "/src/butter.js": {
          include: [ "butter" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js",
          paths: {
            "make-api": path.resolve( __dirname, "node_modules/makeapi/public/js/make-api" ),
            "sso-include": path.resolve( __dirname, "node_modules/webmaker-sso/include" )
          }
        },
        "/src/embed.js": {
          include: [ "embed" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js",
        },
        "/templates/assets/editors/editorhelper.js": {
          include: [ "../templates/assets/editors/editorhelper" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js"
        }
      },
      defaults: {
        baseUrl: WWW_ROOT + "/src/",
        findNestedDependencies: true,
        optimize: "none",
        preserveLicenseComments: false,
        wrap: {
          startFile: __dirname + "/tools/wrap.start",
          endFile: __dirname + "/tools/wrap.end"
        }
      }
    }))
    .use( express.static( tmpDir, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) )
    .use( express.static( WWW_ROOT, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) );

  // File Store types and options come from JSON config file.
  stores.publish = setupStore( config.publishStore );

  app.use( express.bodyParser() )
    .use( express.cookieParser() )
    .use( express.cookieSession( config.session ) )
    .use( express.csrf() )
    /* Show Zeus who's boss
     * This only affects requests under /api and /persona, not static files
     * because the static file writes the response header before we hit this middleware
     */
    .use( function( req, res, next ) {
      res.header( 'Cache-Control', 'no-store' );
      return next();
    })
    .use( app.router )
    .use( function( err, req, res, next) {
      if ( !err.status ) {
        err.status = 500;
      }

      res.status( err.status );
      res.render( 'error.html', { message: err.message, status: err.status });
    })
    .use( function( req, res, next ) {
      res.status( 404 );
      res.render( 'error.html', { message: "This page doesn't exist", status: 404 });
    });

  utils = require( './lib/utils' )({
    EMBED_HOSTNAME: config.EMBED_HOSTNAME ? config.EMBED_HOSTNAME : APP_HOSTNAME,
    EMBED_SUFFIX: '_'
  }, stores );

  Project = require( './lib/project' )( config.database, makeapiConfig, utils );
  filter = require( './lib/filter' )( Project.isDBOnline );
});

require( 'express-persona' )( app, {
  audience: config.AUDIENCE
});
require( "webmaker-loginapi" )( app, config.LOGIN_SERVER_URL_WITH_AUTH );

var routes = require('./routes');
routes = routes( app, Project, filter, sanitizer, stores, utils, makeapiConfig );

function writeEmbedShell( embedPath, url, data, callback ) {
  if( !writeEmbedShell.template ) {
    writeEmbedShell.template = nunjucksEnv.getTemplate( 'embed-shell.html' );
  }
  var sanitized = sanitizer.compressHTMLEntities( writeEmbedShell.template.render( data ) );
  stores.publish.write( embedPath, sanitized, callback );
}

function writeEmbed( embedPath, url, data, callback ) {
  if( !writeEmbed.template ) {
    writeEmbed.template = nunjucksEnv.getTemplate( 'embed.html' );
  }
  var sanitized = sanitizer.compressHTMLEntities( writeEmbed.template.render( data ) );
  stores.publish.write( embedPath, sanitized, callback );
}

app.post( '/api/publish/:id',
  filter.isLoggedIn, filter.isStorageAvailable,
  function publishRoute( req, res ) {

  var email = req.session.email,
      id = parseInt( req.params.id, 10 );

  if ( isNaN( id ) ) {
    res.json( { error: "ID was not a number" }, 500 );
    return;
  }

  Project.find( { id: id, email: email }, function( err, project ) {
    if ( err ) {
      res.json( { error: err }, 500);
      return;
    }

    if ( !project ) {
      res.json( { error: 'project not found' }, 404);
      return;
    }

    var projectData = JSON.parse( project.data, sanitizer.escapeHTMLinJSON );

      var baseHref = APP_HOSTNAME + "/editor/",
          popcornString = '<script>';

      projectData.media.forEach(function( currentMedia ) {
        // We expect a string (one url) or an array of url strings.
        // Turn a single url into an array of 1 string.
        var mediaUrls = typeof currentMedia.url === "string" ? [ currentMedia.url ] : currentMedia.url;
        var mediaUrlsString = '[ "' + mediaUrls.join('", "') + '" ]';

        var mediaPopcornOptions = currentMedia.popcornOptions || {};
        // Force the Popcorn instance we generate to have an ID we can query.
        mediaPopcornOptions.id = "Butter-Generated";

        // src/embed.js initializes Popcorn by executing the global popcornDataFn()
        popcornString += '\nvar popcornDataFn = function(){';
        popcornString += '\nvar popcorn = Popcorn.smart("#' + currentMedia.target + '", ' +
                         mediaUrlsString + ', ' + JSON.stringify( mediaPopcornOptions ) + ');';
        currentMedia.tracks.forEach(function( currentTrack ) {
          currentTrack.trackEvents.forEach(function( currentTrackEvent ) {
            popcornString += '\npopcorn.' + currentTrackEvent.type + '(';
            popcornString += JSON.stringify( currentTrackEvent.popcornOptions, null, 2 );
            popcornString += ');';
          });
        });

        popcornString += '};\n';
      });

      popcornString += '</script>\n';

      // Convert 1234567890 => "kf12oi"
      var description = project.description || 'Created with Popcorn Maker - part of the Mozilla Webmaker initiative',
          idBase36 = utils.generateIdString( id ),
          publishUrl = utils.generatePublishUrl( id ),
          iframeUrl = utils.generateIframeUrl( id );

      function finished( err ) {
        if ( err ) {
          res.json({ error: 'internal server error' }, 500);
        } else {
          res.json({ error: 'okay', publishUrl: publishUrl, iframeUrl: iframeUrl });
          metrics.increment( 'project.publish' );
        }
      }

      // This is a query string-only URL because of the <base> tag
      var remixUrl = project.id + "/remix",
          mediaUrl = projectData.media[ 0 ].url,
          attribURL = Array.isArray( mediaUrl ) ? mediaUrl[ 0 ] : mediaUrl;

      function publishEmbedShell() {
        // Write out embed shell HTML
        writeEmbedShell( idBase36, publishUrl,
                         {
                           author: project.author,
                           config: app.locals.config,
                           projectName: project.name,
                           description: description,
                           embedShellSrc: publishUrl,
                           embedSrc: iframeUrl,
                           baseHref: APP_HOSTNAME,
                           thumbnail: project.thumbnail,
                           remixUrl: baseHref + remixUrl,
                           makeEndpoint: config.MAKE_ENDPOINT,
                           makeID: project.makeid
                         },
                         finished );
      }

      writeEmbed( idBase36 + utils.constants().EMBED_SUFFIX, iframeUrl,
                  {
                    id: id,
                    author: project.author,
                    config: app.locals.config,
                    title: project.name,
                    description: description,
                    mediaSrc: attribURL,
                    embedShellSrc: publishUrl,
                    baseHref: baseHref,
                    remixUrl: baseHref + remixUrl,
                    popcorn: popcornString,
                    thumbnail: project.thumbnail
                  },
                  publishEmbedShell );

  });
});

app.get( '/', routes.pages.landing );
app.get( '/index.html', routes.pages.landing );

app.get( '/dashboard', middleware.isAuthenticated, filter.isStorageAvailable, function( req, res ) {
  res.redirect( config.AUDIENCE + "/me?app=popcorn" );
});

app.get( '/editor', routes.pages.editor );
app.get( '/editor/:id', routes.pages.editor );
app.get( '/editor/:id/edit', routes.pages.editor );
app.get( '/editor/:id/remix', routes.pages.editor );
app.get( '/templates/basic', routes.pages.editor );
app.get( '/templates/basic/index.html', routes.pages.editor );

app.get( '/external/make-api.js', function( req, res ) {
  res.sendfile( path.resolve( __dirname, "node_modules/makeapi/public/js/make-api.js" ) );
});
app.get( '/external/sso-include.js', function( req, res ) {
  res.sendfile( path.resolve( __dirname, "node_modules/webmaker-sso/include.js" ) );
});

app.post( '/crash', routes.api.crash );
app.post( '/feedback', routes.api.feedback );

app.get( '/healthcheck', routes.api.healthcheck );

app.get( '/api/butterconfig', function( req, res ) {
  res.json({
    "makeEndpoint": config.MAKE_ENDPOINT,
    "user_bar": app.locals.config.user_bar
  });
});

app.put( "/api/image", filter.isImage, routes.api.image );

app.listen( port, function() {
  console.log( 'HTTP Server started on ' + APP_HOSTNAME );
  console.log( 'Press Ctrl+C to stop' );
});
