// webmaker-loginapi only exposes it's utility methods if you initialize it with an
// Express instance and a LOGINURL.

module.exports = function( app, options ) {
  module.exports = require("webmaker-loginapi")( app, options );
};
