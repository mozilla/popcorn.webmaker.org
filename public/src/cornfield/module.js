/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/xhr" ], function( xhr ) {

  var Cornfield = function( butter ) {

    var authenticated = false,
        username = "",
        self = this;

    butter.listen( "ready", function onReady() {
      butter.unlisten( "ready", onReady );
      navigator.idSSO.app = {
        onlogin: function( webmakerEmail, webmakerUserName ) {
          authenticated = true;
          username = webmakerUserName;
          butter.dispatch( "authenticated" );
        },
        onlogout: function() {
          authenticated = false;
          butter.dispatch( "logout" );
        }
      };
    });

    this.username = function() {
      return username;
    };

    this.authenticated = function() {
      return authenticated;
    };

    function publishPlaceholder( id, callback ) {
      console.warn( "Warning: Popcorn Maker publish is already in progress. Ignoring request." );
      callback( { error: "Publish is already in progress. Ignoring request." } );
    }

    function publishFunction( id, callback ) {
      // Re-route successive calls to `publish` until a complete response has been
      // received from the server.
      self.publish = publishPlaceholder;

      xhr.post( "/api/publish/" + id, function( response ) {
        // Reset publish function to its original incarnation.
        self.publish = publishFunction;

        callback( response );
      });
    }

    function savePlaceholder( id, data, callback ) {
      console.warn( "Warning: Popcorn Maker save is already in progress. Ignoring request." );
      callback( { error: "Save is already in progress. Ignoring request." } );
    }

    function saveFunction( id, data, callback ) {
      // Re-route successive calls to `save` until a complete response has been
      // received from the server.
      self.save = savePlaceholder;

      var url = "/api/project/";

      if ( id ) {
        url += id;
      }

      xhr.post( url, data, function( response ) {
        // Reset save function to its original incarnation.
        self.save = saveFunction;

        callback( response );
      });
    }

    this.save = saveFunction;
    this.publish = publishFunction;

  };

  Cornfield.__moduleName = "cornfield";

  return Cornfield;
});
