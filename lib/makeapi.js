var config = require( "./config" );

if ( !config.MAKE_ENDPOINT || !config.MAKE_PRIVATEKEY || !config.MAKE_PUBLICKEY ) {
  throw new Error( "MakeAPI authentication missing or incorrect" );
}

module.exports = require( "makeapi-client" )({
  apiURL: config.MAKE_ENDPOINT,
  hawk: {
    key: config.MAKE_PRIVATEKEY,
    id: config.MAKE_PUBLICKEY,
    algorithm: "sha256"
  }
});
