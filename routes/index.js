module.exports = {
  api: require( "./api" ),
  make: require( "./make" ),
  pages: require( "./pages" ),
  overrides: function ( app ) {
    return require( "./overrides" )( app );
  },
  path: function( path ) {
    return function( req, res ) {
      res.render( path );
    };
  }
};
