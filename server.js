process.env.NEW_RELIC_BROWSER_MONITOR_ENABLE = false;

// Newrelic *must* be the first module loaded. Do not move this require module!
var newrelic;
if ( process.env.NEW_RELIC_HOME ) {
  newrelic = require( "newrelic" );
} else {
  newrelic = {
    getBrowserTimingHeader: function () {
      return "<!-- New Relic RUM disabled -->";
    }
  };
}

var express = require( "express" ),
    path = require( "path" ),
    helmet = require( "helmet" ),
    nunjucks = require( "nunjucks" ),
    nunjucksEnv = new nunjucks.Environment([
      new nunjucks.FileSystemLoader( __dirname + "/views" ),
      new nunjucks.FileSystemLoader( __dirname + "/public" )
    ]),
    app = express(),
    lessMiddleware = require( "less-middleware" ),
    rtltrForLess = require("rtltr-for-less"),
    requirejsMiddleware = require( "requirejs-middleware" ),
    config = require( "./lib/config" ),
    Project,
    filter,
    middleware,
    APP_HOSTNAME = config.APP_HOSTNAME,
    WWW_ROOT =  __dirname + "/public",
    i18n = require( "webmaker-i18n" ),
    WebmakerAuth = require( "webmaker-auth" ),
    emulate_s3 = config.S3_EMULATION || !config.S3_KEY,
    messina,
    logger;

nunjucksEnv.addFilter( "instantiate", function( input ) {
    var tmpl = new nunjucks.Template( input );
    return tmpl.render( this.getVariables() );
});

nunjucksEnv.express( app );

app.disable( "x-powered-by" );

var webmakerAuth = new WebmakerAuth({
  loginURL: config.LOGIN_SERVER_URL,
  loginHost: config.APP_HOSTNAME,
  authLoginURL: config.LOGIN_SERVER_URL_WITH_AUTH,
  secretKey: config.SECRET,
  forceSSL: config.FORCE_SSL,
  domain: config.COOKIE_DOMAIN
});

app.configure( function() {
  var tmpDir = path.normalize( require( "os" ).tmpDir() + "/mozilla.butter/" );

  if ( config.ENABLE_GELF_LOGS ) {
    messina = require( "messina" );
    logger = messina( "popcorn.webmaker.org-" + config.NODE_ENV || "development" );
    logger.init();
    app.use( logger.middleware() );
  } else {
    app.use( express.logger( config.logger ) );
  }

  app.use( function( req, res, next ) {
    var allowed = [ "/static/bower/font-awesome/font/" ];
    for ( var i = 0; i < allowed.length; i++ ) {
      if ( req.url.substring( 0, allowed[ i ].length ) === allowed[ i ] ) {
        res.header( "Access-Control-Allow-Origin", "*" );
      }
    }
    next();
  });
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  if ( !!config.FORCE_SSL ) {
    app.use( helmet.hsts() );
    app.enable( "trust proxy" );
  }
  app.use( express.compress() )
    .use( lessMiddleware(rtltrForLess({
      once: config.OPTIMIZE_CSS,
      dest: tmpDir,
      src: WWW_ROOT,
      compress: config.OPTIMIZE_CSS,
      yuicompress: config.OPTIMIZE_CSS,
      optimization: config.OPTIMIZE_CSS ? 0 : 2
    })))
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
            "make-api": path.resolve( __dirname, "node_modules/makeapi-client/src/make-api" )
          }
        },
        "/src/embed.js": {
          include: [ "embed" ],
          mainConfigFile: WWW_ROOT + "/src/popcorn.js"
        }
      },
      defaults: {
        name: "../external/require/require",
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
    .use( function( req, res, next ) {
      if ( req.url === "/src/layouts/controls.html" ||
           req.url === "/src/layouts/attribution.html" ||
           req.url === "/src/layouts/warn.html") {
        res.set( "Access-Control-Allow-Origin", "*" );
      }

      process.nextTick( next );
    })
    .use( express.static( tmpDir, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) )
    .use( express.static( WWW_ROOT, JSON.parse( JSON.stringify( config.staticMiddleware ) ) ) );

  app.use( express.json() )
    .use( express.urlencoded() )
    .use( webmakerAuth.cookieParser() )
    .use( webmakerAuth.cookieSession() );

    // Setup locales with i18n
    app.use( i18n.middleware({
      supported_languages: config.SUPPORTED_LANGS,
      default_lang: "en-US",
      mappings: require("webmaker-locale-mapping"),
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
        node_hubble_endpoint: config.NODE_HUBBLE_ENDPOINT,
        sync_limit: config.SYNC_LIMIT
      },
      languages: i18n.getSupportLanguages(),
      newrelic: newrelic,
      bower_path: "/static/bower"
    });

    app.use(function (req, res, next) {
      res.locals({
        currentPath: req.path,
        direction: req.localeInfo.direction === "rtl" ? "left" : "right",
        returnPath: req.param( "page" )
      });
      next();
    });

    app.use( express.csrf() )
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

// Note: REDIS_URL is purposely not added to the default config.
// This is because the mediasync module will default to using node-cache
// when it is not provided for local dev.
require( "webmaker-mediasync" )( app, {
  serviceKeys: {
    soundcloud: config.SYNC_SOUNDCLOUD,
    flickr: config.SYNC_FLICKR,
    giphy: config.SYNC_GIPHY
  },
  limit: config.SYNC_LIMIT,
  REDIS_URL: config.REDIS_URL
});

middleware = require( "./lib/middleware" );

var routes = require( "./routes" );

app.param( "myproject", middleware.loadOwnProject( Project ));
app.param( "anyproject", middleware.loadAnyProject( Project ));

app.post( "/api/publish/:myproject",
  filter.isLoggedIn, filter.isStorageAvailable,
  routes.make.publish
);

app.post( "/authenticate", webmakerAuth.handlers.authenticate );
app.post( "/logout", webmakerAuth.handlers.logout );
app.post( "/verify", webmakerAuth.handlers.verify );

app.post( "/auth/v2/create", webmakerAuth.handlers.createUser );
app.post( "/auth/v2/uid-exists", webmakerAuth.handlers.uidExists );
app.post( "/auth/v2/request", webmakerAuth.handlers.request );
app.post( "/auth/v2/authenticateToken", webmakerAuth.handlers.authenticateToken );
app.post( "/auth/v2/verify-password", webmakerAuth.handlers.verifyPassword );
app.post( "/auth/v2/request-reset-code", webmakerAuth.handlers.requestResetCode );
app.post( "/auth/v2/reset-password", webmakerAuth.handlers.resetPassword );

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
app.get( "/external/jwplayer.js", function( req, res ) {
  res.redirect( "//jwpsrv.com/library/" + app.locals.config.jwplayer_key + ".js" );
});

// Project Endpoints
app.post( "/api/project/:id?",
  filter.isLoggedIn,
  filter.isStorageAvailable,
  routes.api.synchronize( Project ),
  routes.api.publish,
  routes.make.synchronize
);

app.post( "/api/delete/:myproject", filter.isLoggedIn, filter.isStorageAvailable, routes.make.remove, routes.api.remove );
app.get( "/api/remix/:anyproject", filter.isStorageAvailable, routes.api.remix, routes.api.projectResponse( Project ) );
app.get( "/api/project/:anyproject", filter.isStorageAvailable, routes.api.find, routes.api.projectResponse( Project ) );

// Firehose Endpoints
//app.get( "/api/project/:id/remixes", filter.isStorageAvailable, filter.crossOriginAccessible, routes.firehose.remixes );
//app.get( "/api/projects/recentlyUpdated/:limit?", filter.isStorageAvailable, filter.crossOriginAccessible, routes.firehose.recentlyUpdated );
//app.get( "/api/projects/recentlyCreated/:limit?", filter.isStorageAvailable, filter.crossOriginAccessible, //routes.firehose.recentlyCreated );
//app.get( "/api/projects/recentlyRemixed/:limit?", filter.isStorageAvailable, filter.crossOriginAccessible, routes.firehose.recentlyRemixed );

app.post( "/crash", routes.api.crash );
app.post( "/feedback", routes.api.feedback );

app.get( "/healthcheck", routes.api.healthcheck );

// NOTE:
// This endpoint is publicly accessible with CORS enabled. Be careful of the information
// that is attached to it. IE, avoid putting API keys and other more sensitive information
// here.
app.get( "/api/butterconfig", middleware.crossOrigin, function( req, res ) {
  res.json({
    "audience": app.locals.config.audience,
    "make_endpoint": app.locals.config.make_endpoint,
    "node_hubble_endpoint": app.locals.config.node_hubble_endpoint,
    "clyp_endpoint": config.CLYP_ENDPOINT,
    "sync_limit": app.locals.config.sync_limit
  });
});

// routes to be used in text!
app.get( "/layouts/header.html", function( req, res ) {
  res.render( "/layouts/header.html", {
    audience: app.locals.config.audience,
    togetherjsEnabled: config.TOGETHERJS_ENABLED
  });
});

routes.overrides( app );
routes.redirect( app );

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
