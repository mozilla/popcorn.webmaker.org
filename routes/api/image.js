var fs = require( "fs" ),
    metrics = require( "../../lib/metrics" ),
    s3 = require( "../../lib/s3" ),
    utilities = require( "../../lib/utilities" ),
    uuid = require( "node-uuid" );

var validMimeTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/svg+xml": ".svg"
};

module.exports = function( req, res ) {
  // We've verified the image is valid in filters
  var image = req.files.image[ 0 ],
      extension = validMimeTypes[ image.headers[ "content-type" ] ],
      s3Path = "/user_uploads/" + uuid.v4() + extension;

  var s3req = s3.put( s3Path, {
    "x-amz-acl": "public-read",
    "Content-Length": image.size,
    "Content-Type": image.headers[ "content-type" ]
  }).on( "error", function( err ) {
    utilities.cleanUpTempFiles( utilities.parseTempFiles( req ) );

    res.json( 500, { error: "S3.putImage returned " + err } );
    metrics.increment( "image.upload.error" );
  }).on( "response", function( s3res ) {
    utilities.cleanUpTempFiles( utilities.parseTempFiles( req ) );

    if ( s3res.statusCode !== 200 ) {
      res.json( 500, { error: "Failed to upload image. Uploading file failed." } );
      metrics.increment( "image.upload.error" );
      return;
    }

    res.json( { url: s3.url( s3Path ) } );
    metrics.increment( "image.upload.success" );
  });

  fs.createReadStream( image.path ).pipe( s3req );
};
