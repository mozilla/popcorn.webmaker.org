module.exports = function( Project, stores, makeConfig ) {
  var metrics = require( "../../lib/metrics" );

  return {
    crash: require( "./crash" ),
    feedback: require( "./feedback" ),
    healthcheck: require( "./healthcheck" ),
    image: require( "./image" ),
    publish: require( "./publish" ),
    synchronize: require( "./synchronize" )( Project, metrics ),
    remove: require( "./remove" )( Project, metrics, stores ),
    remix: require( "./remix" )( Project ),
    find: require( "./find" )( Project, makeConfig )
  };
};
