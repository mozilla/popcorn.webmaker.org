module.exports = {
  api: require( "./api" ),
  make: require( "./make" ),
  pages: require( "./pages" ),
  path: function( path ) {
    return function( req, res ) {
      res.render( path );
    };
  }
};
