/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/xhr" ], function( xhr ) {

  var Cornfield = function( butter ) {

    var authenticated = false,
        email = "",
        name = "",
        username = "",
        self = this;

    this.login = function( callback ) {
      navigator.id.get( function( assertion ) {
        if ( assertion ) {
          xhr.post( "/persona/verify", { assertion: assertion }, function( response ) {
            if ( response.status === "okay" ) {

              // Get email, name, and username after logging in successfully
              whoami( callback );
              return;
            }

            // If there was an error of some sort, callback on that
            callback( response );
          });
        } else {
          callback();
        }
      });
    };

    function whoami( callback ) {
      xhr.get( "/api/whoami", function( response ) {
        if ( response.status === "okay" ) {
          authenticated = true;
          email = response.email;
          username = response.username;
          name = response.name;
        }

        if ( callback ) {
          callback( response );
        }
      });
    }

    // Check to see if we're already logged in
    butter.listen( "ready", function onMediaReady() {
      butter.unlisten( "ready", onMediaReady );

      whoami( function( response ) {
        if ( !response.error ) {
          butter.dispatch( "autologinsucceeded", response );
        }
      });
    });

    this.email = function() {
      return email;
    };

    this.name = function() {
      return name;
    };

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

    this.logout = function(callback) {
      xhr.post( "/persona/logout", function( response ) {
        authenticated = false;
        email = "";
        username = "";
        name = "";

        if ( callback ) {
          callback( response );
        }
      });
    };

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
