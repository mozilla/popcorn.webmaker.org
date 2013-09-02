var utils = require( "../../lib/utilities" ),
    makeClient = require( "../../lib/makeapi" );

module.exports = function( req, res, next ) {
  makeClient.remove( res.locals.project.makeid, function( err ) {
    if ( err ) {
      return next( utils.error( 500, err.toString() ) );
    }

    next();
  });
};