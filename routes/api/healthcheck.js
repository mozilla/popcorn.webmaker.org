var version = require( "../../package" ).version;
var wts = require( "webmaker-translation-stats" );
var i18n = require( "webmaker-i18n" );
var path = require( "path" );

module.exports = function( req, res ) {
  var healthcheckObject = {
    http: "okay",
    version: version
  };
  wts(i18n.getSupportLanguages(), path.join( __dirname, "../../locale" ), function( err, data ) {
    if(err) {
      healthcheckObject.locales = err.toString();
    } else {
      healthcheckObject.locales = data;
    }
    res.send(healthcheckObject);
  });
};
