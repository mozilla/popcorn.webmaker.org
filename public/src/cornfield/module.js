/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/xhr", "localized" ], function( xhr, Localized ) {

  var Cornfield = function( butter ) {

    var authenticated = false,
        avatar = "",
        username = "",
        webmakerAuth,
        self = this;

    function onLogin( user ) {
      authenticated = true;
      username = user.username;
      avatar = user.avatar;
      butter.dispatch( "authenticated" );
      if ( butter.project && butter.project.id ) {
        xhr.get( "/api/project/" + butter.project.id, function( res ) {
          if ( res.status === 404 ) {
            // They didn't own the project. Use the logic we have to force remixes on butter load.
            window.location.reload();
          }
        });
      }
    }
    function onLogout() {
      authenticated = false;
      butter.dispatch( "logout" );
    }

    function onReady() {
      webmakerAuth = new window.WebmakerLogin({
        csrfToken: document.querySelector( "meta[name=csrf-token]" ).content,
        showCTA: false
      });
      butter.unlisten( "ready", onReady );
      webmakerAuth.on( "login", onLogin );
      webmakerAuth.on( "logout", onLogout );
      webmakerAuth.on( "verified", function(user) {
        if ( user ) {
          onLogin( user );
        } else {
          onLogout();
        }
      });
    }

    if ( butter.isReady ) {
      onReady();
    } else {
      butter.listen( "ready", onReady );
    }

    this.username = function() {
      return username;
    };

    this.avatar = function() {
      return avatar;
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

      var url = "/" + Localized.getCurrentLang() + "/api/project/";

      if ( id ) {
        url += id;
      }

      xhr.post( url, data, function( response ) {
        // Reset save function to its original incarnation.
        self.save = saveFunction;

        callback( response );
      });
    }

    function removePlaceholder( id, callback ) {
      console.warn( "Warning: Popcorn Maker remove is already in progress. Ignoring request." );
      callback( { error: "Remove is already in progress. Ignoring request." } );
    }

    function removeFunction( id, callback ) {
      self.remove = removePlaceholder;

      var url = "/api/delete/";

      if ( !id ) {
        return callback({ message: "No id passed to identify project being removed." });
      }

      url += id;

      xhr.post( url, function( response ) {
        // Reset remove function to its original incarnation.
        self.remove = removeFunction;

        callback( response );
      });
    }

    this.create = function() {
      webmakerAuth.create();
    };
    this.login = function() {
      webmakerAuth.login();
    };
    this.logout = function() {
      webmakerAuth.logout();
    };
    this.remove = removeFunction;
    this.save = saveFunction;
    this.publish = publishFunction;

  };

  Cornfield.__moduleName = "cornfield";

  return Cornfield;
});
