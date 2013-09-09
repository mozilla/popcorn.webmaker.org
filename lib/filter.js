'use strict';

var dbCheckFn, filters,
    utils = require( "./utilities" );

filters = {
  isLoggedIn: function( req, res, next ) {
    if ( req.session.email ) {
      next();
    } else {
      next( utils.error( 403, "unauthorized" ) );
    }
  },
  isStorageAvailable: function( req, res, next ) {
    if ( dbCheckFn() ) {
      next();
    } else {
      next( utils.error( 500, "storage service is not running" ) );
    }
  },
  crossOriginAccessible: function( req, res, next ) {
    res.set( 'Access-Control-Allow-Origin', '*' );
    next();
  },
  isImage: function( req, res, next ) {
    var validMimeTypes = [
          "image/jpeg",
          "image/png",
          "image/gif"
        ],
        image = req.files.image;

    if ( validMimeTypes.indexOf( image.headers[ "content-type" ] ) >= 0 ) {
      return next();
    }

    next( utils.error( 404, "Upload Failed - Invalid MimeType." ) );
  }
};

module.exports = function ctor( fn ) {
  dbCheckFn = fn;
  return filters;
};
