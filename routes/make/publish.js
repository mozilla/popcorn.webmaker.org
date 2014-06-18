var utilities = require( "../../lib/utilities" ),
    metrics = require( "../../lib/metrics" ),
    makeClient = require( "../../lib/makeapi" );

module.exports = function( req, res, next ) {
  var project = res.locals.project;

  if ( !project ) {
    return next( utilities.error( 404, "No Project Found" ) );
  }

  makeClient.update( project.makeid, {
    published: true
  }, function( err ) {
    if ( err ) {
      return next( utilities.error( 500, err.toString() ) );
    }

    metrics.increment( "project.publish" );
    res.json({
      status: "okay"
    });
  });
};
