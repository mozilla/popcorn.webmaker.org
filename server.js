// Newrelic *must* be the first module loaded. Do not move this require module!
if ( process.env.NEW_RELIC_HOME ) {
  require( "newrelic" );
}

var express = require( "express" ),
    path = require( "path" ),
    helmet = require( "helmet" ),
    nunjucks = require( "nunjucks" ),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( __dirname + "/views" ) ),
    app = express(),
    lessMiddleware = require( "less-middleware" ),
    requirejsMiddleware = require( "requirejs-middleware" ),
    config = require( "./lib/config" ),
    Project,
    filter,
    middleware,
    APP_HOSTNAME = config.hostname,
    WWW_ROOT =  __dirname + "/public",
    i18n = require( "webmaker-i18n" ),
    emulate_s3 = config.S3_EMULATION || !config.S3_KEY;

nunjucksEnv.addFilter( "instantiate", function( input ) {
    var tmpl = new nunjucks.Template( input );
    return tmpl.render( this.getVariables() );
});

nunjucksEnv.express( app );

app.configure( function() {
  var tmpDir = path.normalize( require( "os" ).tmpDir() + "/mozilla.butter/" );

  app.use( express.logger( config.logger ) );
  app.use( "/static/bower", express.static( path.join( __dirname, "/bower_components" ), {
    maxAge: "31556952000" // one year
  }));
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
      debug: config.DEBUG,
      once: config.OPTIMIZE_JS,
      modules: {
        "/src/butter.js": {
          include: [ "butter" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js",
          paths: {
            "make-api": path.resolve( __dirname, "node_modules/makeapi-client/src/make-api" ),
            "sso-include": path.resolve( __dirname, "node_modules/webmaker-sso/include" )
          }
        },
        "/src/embed.js": {
          include: [ "embed" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js"
        },
        "/templates/assets/editors/editorhelper.js": {
          include: [ "../templates/assets/editors/editorhelper" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js"
        }
      },
      defaults: {
        name: "../external/require/require",
        baseUrl: WWW_ROOT + "/src/",
        findNestedDependencies: true,
        optimize: "none",
        preserveLicenseComments: false,
        paths: {
          "localized": path.resolve( __dirname, "bower_components/webmaker-i18n/localized" ),
          "WebmakerUI": path.resolve( __dirname, "bower_components/webmaker-ui/ui" ),
          "webmaker-ui-fragments": path.resolve( __dirname, "bower_components/webmaker-ui/webmaker-ui-fragments" )
        },
        wrap: {
          startFile: __dirname + "/tools/wrap.start",
          endFile: __dirname + "/tools/wrap.end"
        }
      }
    }))
    .use( express.static( tmpDir, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) )
    .use( express.static( WWW_ROOT, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) );

  // Setup locales with i18n
  app.use( i18n.middleware({
    supported_languages: config.SUPPORTED_LANGS,
    default_lang: "en-US",
    mappings: config.LANG_MAPPINGS,
    translation_directory: path.resolve( __dirname, "locale" )
  }));

  app.locals({
    config: {
      app_hostname: APP_HOSTNAME,
      audience: config.AUDIENCE,
      ga_account: config.GA_ACCOUNT,
      ga_domain: config.GA_DOMAIN,
      jwplayer_key: config.JWPLAYER_KEY,
      make_endpoint: config.MAKE_ENDPOINT,
      user_bar: config.USER_BAR,
      sync_limit: config.SYNC_LIMIT
    },
    supportedLanguages: i18n.getLanguages(),
    listDropdownLang: config.SUPPORTED_LANGS
  });

  app.use( express.json() )
    .use( express.urlencoded() )
    .use( express.cookieParser() )
    .use( express.cookieSession( config.session ) )
    .use( express.csrf() )
    .use( helmet.xframe() )
    /* Show Zeus who's boss
     * This only affects requests under /api and /persona, not static files
     * because the static file writes the response header before we hit this middleware
     */
    .use( function( req, res, next ) {
      res.header( "Cache-Control", "no-store" );
      return next();
    })
    .use( app.router )
    /*jslint unused: false */
    .use( function( err, req, res, next ) {
      if ( !err.status ) {
        err.status = 500;
      }

      middleware.errorHandler( err, req, res );
    })
    /*jslint unused: false */
    .use( function( req, res, next ) {
      var err = {
        message: req.gettext( "This page doesn't exist" ),
        status: 404
      };

      middleware.errorHandler( err, req, res );
    });

  Project = require( "./lib/project" )( config.database );
  filter = require( "./lib/filter" )( Project.isDBOnline );
});

require( "./lib/loginapi" )( app, {
  audience: config.AUDIENCE,
  loginURL: config.LOGIN_SERVER_URL_WITH_AUTH
});

require( "webmaker-mediasync" )( app, {
  serviceKeys: {
    soundcloud: config.SYNC_SOUNDCLOUD,
    flickr: config.SYNC_FLICKR,
    giphy: config.SYNC_GIPHY
  },
  limit: config.SYNC_LIMIT
});

middleware = require( "./lib/middleware" );

var routes = require( "./routes" );

app.param( "myproject", middleware.loadOwnProject( Project ));
app.param( "anyproject", middleware.loadAnyProject( Project ));

app.post( "/api/publish/:myproject",
  filter.isLoggedIn, filter.isStorageAvailable,
  routes.api.publish
);

app.get( "/dashboard/:lang", function( req, res ) {
  res.redirect( config.AUDIENCE + "/" + req.params.lang + "/me?app=popcorn" );
});

app.get( "/", routes.pages.editor );
app.get( "/index.html", routes.pages.editor );
app.get( "/editor", routes.pages.editor );
app.get( "/editor/:id", routes.pages.editor );
app.get( "/editor/:id/edit", routes.pages.editor );
app.get( "/editor/:id/remix", routes.pages.editor );
app.get( "/templates/basic", routes.pages.editor );
app.get( "/templates/basic/index.html", routes.pages.editor );

app.get( "/external/make-api.js", function( req, res ) {
  res.sendfile( path.resolve( __dirname, "node_modules/makeapi-client/src/make-api.js" ) );
});
app.get( "/external/sso-include.js", function( req, res ) {
  res.sendfile( path.resolve( __dirname, "node_modules/webmaker-sso/include.js" ) );
});
app.get( "/external/jwplayer.js", function( req, res ) {
  res.redirect( "//jwpsrv.com/library/" + app.locals.config.jwplayer_key + ".js" );
});

// Project Endpoints
app.post( "/api/project/:id?",
  filter.isLoggedIn,
  filter.isStorageAvailable,
  routes.api.synchronize( Project ),
  routes.make.synchronize
);

app.post( "/api/delete/:myproject", filter.isLoggedIn, filter.isStorageAvailable, routes.make.remove, routes.api.remove );
app.get( "/api/remix/:anyproject", filter.isStorageAvailable, routes.api.remix, routes.api.projectResponse( Project ) );
app.get( "/api/project/:myproject", filter.isLoggedIn, filter.isStorageAvailable, routes.api.find, routes.api.projectResponse( Project ) );

// Firehose Endpoints
//app.get( "/api/project/:id/remixes", filter.isStorageAvailable, filter.crossOriginAccessible, routes.firehose.remixes );
//app.get( "/api/projects/recentlyUpdated/:limit?", filter.isStorageAvailable, filter.crossOriginAccessible, routes.firehose.recentlyUpdated );
//app.get( "/api/projects/recentlyCreated/:limit?", filter.isStorageAvailable, filter.crossOriginAccessible, //routes.firehose.recentlyCreated );
//app.get( "/api/projects/recentlyRemixed/:limit?", filter.isStorageAvailable, filter.crossOriginAccessible, routes.firehose.recentlyRemixed );

app.post( "/crash", routes.api.crash );
app.post( "/feedback", routes.api.feedback );

app.get( "/healthcheck", routes.api.healthcheck );

app.get( "/api/butterconfig", function( req, res ) {
  res.json({
    "audience": app.locals.config.audience,
    "make_endpoint": app.locals.config.make_endpoint,
    "user_bar": app.locals.config.user_bar,
    "sync_limit": app.locals.config.sync_limit
  });
});

// routes to be used in text!
app.get( "/layouts/header.html", function( req, res ) {
  res.render( "/layouts/header.html", {
    user_bar: app.locals.config.user_bar,
    audience: app.locals.config.audience,
    togetherjsEnabled: config.TOGETHERJS_ENABLED
  });
});

app.get( "/layouts/status-area.html", routes.path( "/layouts/status-area.html" ) );
app.get( "/layouts/media-editor.html", routes.path( "/layouts/media-editor.html" ) );
app.get( "/layouts/controls.html", routes.path( "/layouts/controls.html" ) );
app.get( "/layouts/media-instance.html", routes.path( "/layouts/media-instance.html" ) );
app.get( "/layouts/project-editor.html", routes.path( "/layouts/project-editor.html" ) );
app.get( "/layouts/editor-area.html", routes.path( "/layouts/editor-area.html" ) );
app.get( "/layouts/plugin-list-editor.html", routes.path( "/layouts/plugin-list-editor.html" ) );
app.get( "/layouts/sequencer-editor.html", routes.path( "/layouts/sequencer-editor.html" ) );
app.get( "/layouts/trackevent-editor-defaults.html", routes.path( "/layouts/trackevent-editor-defaults.html" ) );
app.get( "/dialog/dialogs/backup.html", routes.path( "/dialog/dialogs/backup.html" ) );
app.get( "/dialog/dialogs/crash.html", routes.path( "/dialog/dialogs/crash.html" ) );
app.get( "/dialog/dialogs/delete-track-events.html", routes.path( "/dialog/dialogs/delete-track-events.html" ) );
app.get( "/dialog/dialogs/delete-track.html", routes.path( "/dialog/dialogs/delete-track.html" ) );
app.get( "/dialog/dialogs/error-message.html", routes.path( "/dialog/dialogs/error-message.html" ) );
app.get( "/dialog/dialogs/feedback.html", routes.path( "/dialog/dialogs/feedback.html" ) );
app.get( "/dialog/dialogs/first-run.html", routes.path( "/dialog/dialogs/first-run.html" ) );
app.get( "/dialog/dialogs/track-data.html", routes.path( "/dialog/dialogs/track-data.html" ) );
app.get( "/dialog/dialogs/remove-project.html", routes.path( "/dialog/dialogs/remove-project.html" ) );
app.get( "/editors/default.html", routes.path( "/editor/default.html" ) );
app.get( "/templates/assets/editors/googlemap/googlemap-editor.html", routes.path( "/plugins/googlemap-editor.html" ) );
app.get( "/templates/assets/editors/popup/popup-editor.html", routes.path( "/plugins/popup-editor.html" ) );
app.get( "/templates/assets/editors/image/image-editor.html", routes.path( "/plugins/image-editor.html" ) );
app.get( "/templates/assets/editors/text/text-editor.html", routes.path( "/plugins/text-editor.html" ) );
app.get( "/templates/assets/editors/sketchfab/sketchfab-editor.html", routes.path( "/plugins/sketchfab-editor.html" ) );

// Localized Strings
app.get( "/strings/:lang?", middleware.crossOrigin, i18n.stringsRoute( "en-US" ) );

app.put( "/api/image", middleware.processForm, filter.isImage, routes.api.image );

app.listen( config.PORT, function() {
  console.log( "HTTP Server started on " + APP_HOSTNAME );
  console.log( "Press Ctrl+C to stop" );
});

// If we're in running in emulated S3 mode, run a mini
// server for serving up the "s3" published content.
if ( emulate_s3 ) {
  require( "mox-server" ).runServer( config.MOX_PORT || 12319 );
}
