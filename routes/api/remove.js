module.exports = function( req, res, next ) {
  var utils = require( "../../lib/utilities" ),
      metrics = require( "../../lib/metrics" );

  var project = res.locals.project;

  if ( !project ) {
    return next( utils.error( 404, "project not found" ) );
  }

  project.destroy()
  .success(function() {
    // Delete published projects, too
    var embedShell = utils.generateIdString( project.id ),
        embedDoc = embedShell + "_";

    /*
      If we can't delete the file, it's already gone, ignore errors.
      Fire-and-forget.
      TODO: WE NEED TO ACTUALLY RE IMPLEMENT THIS WHEN WE DO CASCADING DELETES
      stores.publish.remove( embedShell );
      stores.publish.remove( embedDoc );
     */

    metrics.increment( 'project.delete' );
    next();
  })
  .error(function( err ) {
    next( utils.error( 500, err.toString() ) );
  });
};

