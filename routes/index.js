'use strict';

module.exports = {
  api: require( "./api" ),
  pages: require( "./pages" ),
  path: function( path ) {
    return function( req, res ) {
      res.render( path );
    };
  }
};
