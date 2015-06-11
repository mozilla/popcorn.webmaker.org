/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */
(function() {

  var ACCEPTED_UA_LIST = {
    "Chromium": 17,
    "Chrome": 17,
    "Firefox": 10,
    "IE": 9,
    "Safari": 6,
    "Opera": 12
  },

  MOBILE_OS_BLACKLIST = [
    "Android",
    "iOS",
    "BlackBerry",
    "MeeGo",
    "Windows Phone OS",
    "Firefox OS",
    // For BB Playbook
    "RIM Tablet OS"
  ];

  define([ "ua-parser", "util/warn", "localized" ],
         function( UAParser, Warn, Localized ){

    // ua-parser uses the current browsers UA by default
    var ua = new UAParser().getResult(),
        name = ua.browser.name,
        major = ua.browser.major,
        os = ua.os.name,
        acceptedUA = false;

    for ( var uaName in ACCEPTED_UA_LIST ) {
      if ( ACCEPTED_UA_LIST.hasOwnProperty( uaName ) && MOBILE_OS_BLACKLIST.indexOf( os ) === -1 ) {
        if ( name === uaName ) {
          if ( +major >= ACCEPTED_UA_LIST[ uaName ] ) {
            acceptedUA = true;
          }
        }
      }
    }

    if ( !acceptedUA ) {
      Warn.showWarning( Localized.get( "UA_WARNING_TEXT" ) );
    }
  });
}());
