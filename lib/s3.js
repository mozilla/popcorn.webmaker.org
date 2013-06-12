var config = require( "./config" ),
    s3 = require( "knox" ).createClient({
      bucket: config.S3_BUCKET,
      key: config.S3_KEY,
      secret: config.S3_SECRET
    });

module.exports = s3;
