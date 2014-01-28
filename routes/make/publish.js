var utils = require( "../../lib/utilities" ),
    metrics = require( "../../lib/metrics" ),
    makeClient = require( "../../lib/makeapi" );

module.exports = function( req, res, next ) {
  var project = res.locals.project;

  if ( !project ) {
    return res.json(404, { error: "No Project Found" });
  }

  makeClient.update( project.makeid, {
    maker: project.email,
    make: {
      published: true
    }
  }, function( err, make ) {
    if ( err ) {
      return res.json(500, { error: err });
    }

    metrics.increment( "project.publish" );
    res.json({
      error: "okay"
    });
  });
};

