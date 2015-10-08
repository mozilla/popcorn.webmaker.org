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
    emulate_s3 = config.S3_EMULATION || !config.S3_KEY,
    messina,
    logger;

nunjucksEnv.express( app );

app.disable( "x-powered-by" );

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
});

middleware = require( "./lib/middleware" );

app.get( "/external/make-api.js", function( req, res ) {
  res.sendfile( path.resolve( __dirname, "node_modules/makeapi-client/src/make-api.js" ) );
});
app.get( "/external/jwplayer.js", function( req, res ) {
  res.redirect( "//jwpsrv.com/library/" + app.locals.config.jwplayer_key + ".js" );
});

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

// Localized Strings
app.get( "/strings/:lang?", middleware.crossOrigin, i18n.stringsRoute( "en-US" ) );

app.get("/", function(req, res) {
  res.render('views/deprecated.html');
});

app.get("*", function(req, res) {
  res.redirect('/');
});

app.listen( config.PORT, function() {
  console.log( "HTTP Server started on " + APP_HOSTNAME );
  console.log( "Press Ctrl+C to stop" );
});

// If we're in running in emulated S3 mode, run a mini
// server for serving up the "s3" published content.
if ( emulate_s3 ) {
  require( "mox-server" ).runServer( config.MOX_PORT || 12319 );
}
