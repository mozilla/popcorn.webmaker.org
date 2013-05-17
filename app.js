var express = require( "express" ),
    habitat = require( "habitat" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    persona = require( "express-persona" ),
    route = require( "./routes" ),
    lessMiddleWare = require( "less-middleware" );

habitat.load();

var app = express(),
    env = new habitat(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, 'views' ))),
    loginAPI = require( "webmaker-loginapi" )( env.get( "LOGINAPI" ) ),
    routes = route( env.get( "MAKE_ENDPOINT" ), env.get( "AUDIENCE" ), env.get( "LOGIN" ) ),
    NODE_ENV = env.get( "NODE_ENV" ),
    WWW_ROOT = path.resolve( __dirname, "public" );

nunjucksEnv.express( app );
app.disable( "x-powered-by" );

app.use( express.logger( NODE_ENV === "development" ? "dev" : "" ) );
app.use( express.compress() );
app.use( express.static( path.join( __dirname, "public" )));
app.use( express.bodyParser() );
app.use( express.cookieParser() );
app.use( express.cookieSession({secret: env.get('SESSION_SECRET')}) );
app.use( app.router );

var optimize = NODE_ENV !== "development",
    tmpDir = path.join( require( "os" ).tmpDir(), "mozilla.webmaker.org" );
app.use( lessMiddleWare({
  once: optimize,
  debug: !optimize,
  dest: tmpDir,
  src: WWW_ROOT,
  compress: optimize,
  yuicompress: optimize,
  optimization: optimize ? 0 : 2
}));
app.use( express.static( tmpDir ) );

app.get( "/healthcheck", routes.api.healthcheck );

app.get( "/", routes.page( "index" ) );
app.get( "/learn", routes.page( "learn" ) );
app.get( "/teach", routes.page( "teach" ) );
app.get( "/party", routes.page( "party" ) );

app.get( "/sso/include.js", routes.includejs( env.get( "HOSTNAME" ) ) );

/**
 * WEBMAKER SSO
 */
persona(app, { audience: env.get( "AUDIENCE" ) } );

app.get( "/user/:userid", function( req, res ) {
  loginAPI.getUser(req.session.email, function(err, user) {
    if(err || !user) {
      return res.json({
        status: "failed",
        reason: (err || "user not defined")
      });
    }
    res.json({
      status: "okay",
      user: user
    });
  });
});
/**
 * END WEBMAKER SSO
 */

app.listen( env.get( "PORT" ), function() {
  console.log( "Server listening ( http://localhost:%d )", env.get( "PORT" ));
});
