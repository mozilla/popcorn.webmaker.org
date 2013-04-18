var express = require( "express" ),
    habitat = require( "habitat" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" );

habitat.load();

var app = express(),
    env = new habitat();
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' ))),
    routes = require( "./routes" );

nunjucksEnv.express( app );
app.disable( "x-powered-by" );

app.use( express.logger());
app.use( express.compress());
app.use( express.static( path.join( __dirname + "/public" )));
app.use( app.router );

app.listen( env.get( "PORT" ), function() {
  console.log( "Server listening ( http://localhost:%d )", env.get( "PORT" ));
});
