var express = require( "express" ),
    habitat = require( "habitat" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    route = require( "./routes" );

habitat.load();

var app = express(),
    env = new habitat(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' ))),
    routes = route( env.get( "MAKE_ENDPOINT" ), env.get( "PERSONA_SSO" ) );

nunjucksEnv.express( app );
app.disable( "x-powered-by" );

app.use( express.logger( "dev" ));
app.use( express.compress() );
app.use( express.static( path.join( __dirname + "/public" )));
app.use( app.router );

app.get( "/healthcheck", routes.api.healthcheck );

app.get( "/", routes.page( "index" ) );
app.get( "/learn", routes.page( "learn" ) );
app.get( "/teach", routes.page( "teach" ) );
app.get( "/party", routes.page( "party" ) );

app.listen( env.get( "PORT" ), function() {
  console.log( "Server listening ( http://localhost:%d )", env.get( "PORT" ));
});
