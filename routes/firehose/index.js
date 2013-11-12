module.exports = function( Project ) {
  var utils = require( "../../lib/utilities" );

  function endPointSetup( projectMethod ) {
    return function( req, res ) {
      Project[ projectMethod ]( { limit: req.params.limit }, function( err, projects ) {
        if ( err ) {
          res.jsonp( 500, { error: err } );
        }
        res.jsonp( { status: "okay", results: utils.pruneSearchResults( projects ) } );
      });
    };
  }

  return {
    remixes: require( "./remixes" )( Project ),
    recentlyCreated: endPointSetup( "recentlyCreated" ),
    recentlyUpdated: endPointSetup( "recentlyUpdated" ),
    recentlyRemixed: endPointSetup( "recentlyRemixed" )
  };
};
