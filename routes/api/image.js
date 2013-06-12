var metrics = require( "../../lib/metrics" );

module.exports = function( utils, stores ) {
  var fs = require( "fs" );

  return function( req, res ) {
    var image = req.files.image,
        validMimeTypes = {
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/gif": ".gif"
        },
        extension = validMimeTypes[ image.type ] ? validMimeTypes[ image.type ] : "",
        urlPair = utils.generateFileName( extension );

    fs.readFile( image.path, function( err, data ) {

      if ( err ) {
        res.json( 500, { error: "Failed to upload image. Reading file failed." } );
        metrics.increment( 'error.save.store-image' );
        return;
      }

      stores.images.write( urlPair.filename, data, image.type, function( error ) {

        if ( error ) {
          res.json( 500, { error: "Failed to upload image. Uploading file failed." } );
          metrics.increment( 'error.save.store-image' );
          return;
        }

        res.json( { url: urlPair.url } );
        metrics.increment( 'project.images-upload' );
      });
    });
  };
};
