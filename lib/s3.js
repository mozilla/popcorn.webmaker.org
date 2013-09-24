var config = require( "./config" ),
    s3 = (function() {
      var emulated = config.S3_EMULATION || !config.S3_KEY,
          options = {
            bucket: config.S3_BUCKET,
            key: config.S3_KEY,
            secret: config.S3_SECRET,
            domain: config.S3_DOMAIN
          },
          s3lib = emulated ? require( "noxmox" ).mox : require( "knox" );
      return s3lib.createClient( options );
    }());

module.exports = s3;
