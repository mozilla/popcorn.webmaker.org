/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */
(function() {

  define([ "../../external/PluginDetect/PluginDetect_Flash", "util/warn", "localized" ],
         function( PluginDetect, Warn, Localized ){

    // Hard coded value for now. We need to chat with whoever is in charge of Mozilla's
    // PFS2 instance to see if we can use the service / what limitations there might be
    var MIN_FLASH_VERSION = 11;

    return {
      warn: function() {
        var flashVersion = PluginDetect.getVersion( "Flash" );
        if ( !flashVersion || +flashVersion.split( "," )[ 0 ] < MIN_FLASH_VERSION ) {
          Warn.showWarning( Localized.get( "flashWarning" ) );
        }
      }
    };
  });
}());
