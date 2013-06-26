var config = require( "./config" );

module.exports = require( "makeapi-client" )({
  apiURL: config.MAKE_ENDPOINT,
  auth: config.MAKE_USERNAME + ":" + config.MAKE_PASSWORD
});
