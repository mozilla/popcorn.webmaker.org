'use strict';

module.exports = {
  api: require( "./api" ),
  pages: require( "./pages" ),
  path: function( path ) {
    return function( req, res ) {
      res.render( path );
    };
  },
  strings: function( i18n ) {
    return function( req, res ) {
      res.jsonp( i18n.getStrings( req.params.lang || req.lang || "en-US" ) );
    };
  }
};
