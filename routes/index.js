module.exports = function( makeEndpoint, personaSSO ){
  return {
    api: {
      healthcheck: require( "./api/healthcheck" )
    },
    page: function( view ) {
      return require( "./page" )( view, makeEndpoint, personaSSO );
    }
  };
};
