module.exports = function( Project ) {
  var utils = require( "../../lib/utilities" );

  return function( req, res ) {
    Project.findRemixes( { id: req.params.id }, function( err, projects ) {
      if ( err ) {
        res.jsonp( 500, { error: err } );
      }
      res.jsonp( { error: "okay", results: utils.pruneSearchResults( projects ) } );
    });
  };
};
