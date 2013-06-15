module.exports = function( req, res ) {
  var metrics = require( "../../lib/metrics" ),
      sanitizer = require( "../../lib/sanitizer" ),
      utils = require( "../../lib/utilities" ),
      projectJSON = JSON.parse( res.locals.project.data, sanitizer.reconstituteHTMLinJSON ),
      loginClient = require( "../../lib/loginapi" );

  projectJSON.name = "Remix of " + res.locals.project.name;
  projectJSON.template = res.locals.project.template;
  projectJSON.remixedFrom = res.locals.project.id;
  projectJSON.makeid = res.locals.project.makeid;

  loginClient.getUser( res.locals.project.email, function( err, user ) {
    if ( err || !user ) {
      // If there's an error, user doesn't exist on loginapi so we use popcorn.wmc.o
      // Or there could actually be an error of some sort.
      // TODO FIX THIS API
      projectJSON.remixedFromUrl = "http://popcorn.webmadecontent.org/" + res.locals.project.id.toString( 36 );
    } else {
      projectJSON.remixedFromUrl = utils.embedShellURL( user.username, res.locals.project.id );
    }

    res.json( projectJSON );
    metrics.increment( 'user.remix' );
  });
};
