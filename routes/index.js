module.exports = function( makeEndpoint, personaSSO ){
  return {
    api: {
      healthcheck: require( "./api/healthcheck" )
    },
    page: function( view ) {
      return require( "./page" )( view, makeEndpoint, personaSSO );
    },
    includejs: function( hostname ) {
      return function( req, res ) {
        res.set( "Content-Type", "application/javascript;charset=utf-8" );
        res.render( "sso/include.js", {
          HOSTNAME: hostname
        });
      };
    }
  };
};
