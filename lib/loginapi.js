// webmaker-loginapi only exposes it's utility methods if you initialize it with an
// Express instance and a LOGINURL.

module.exports = function( app, url ) {
  module.exports = require("webmaker-loginapi")( app, url );
};
