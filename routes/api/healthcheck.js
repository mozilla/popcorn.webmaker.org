var version = require( "../../package" ).version;

module.exports = function( req, res ) {
  res.json({
    http: "okay",
    version: version
  });
};
