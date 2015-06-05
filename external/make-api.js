/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// Shim module so we can safely check what environment this is being included in.
var module = module || undefined;

(function ( module ) {
  var API_PREFIX = "/api/20130724/";

  var selectedXHRStrategy,
      hawk,
      request;

  var Make = function( options ) {
    return new Make.m.init( options );
  };

  Make.m = Make.prototype = {
    init: function( options ) {

      if ( !options || !options.apiURL ) {
        throw new Error( "Missing options object or apiURL attribute!" );
      }

      this.queryPairs = [];

      var searchPath = "search";

      this.apiURL = options.apiURL;
      this.makePrefix = ( options.apiPrefix || API_PREFIX ) + "make/";
      this.listPrefix = ( options.apiPrefix || API_PREFIX ) + "list/";

      if ( options.hawk ) {
        if ( !options.hawk.key || !options.hawk.id ) {
          throw new Error( "Hawk authentication requires both a key and ID - check your configuration!" );
        }
        this.credentials = {
          key: options.hawk.key,
          id: options.hawk.id,
          algorithm: "sha256"
        };
        searchPath = "protectedSearch";
      }

      this.searchPath = this.makePrefix + searchPath;

      if ( options.csrf ) {
        this.csrfToken = options.csrf;
      }

      return;
    },

    nodeStrategy: function( type, path, data, callback ) {
      // Only use auth if provided
      var requestOptions = {
            method: type,
            uri: path,
            json: data,
            headers: {},
            timeout: 10000 // timeout after 10s
          },
          self = this,
          header;

      if ( this.credentials ) {
        header = hawk.client.header( path, type, { credentials: this.credentials } );
        requestOptions.headers.Authorization = header.field;
      }

      request( requestOptions, function( err, res, body ) {
        if ( err ) {
          return callback( err );
        }

        if ( self.credentials ) {
          if ( !hawk.client.authenticate( res, self.credentials, header.artifacts, { payload: JSON.stringify( body ) } ) ) {
            return callback( "Warning: The response does not authenticate - your traffic may be getting intercepted and modified" );
          }
        }

        if ( res.statusCode === 200 ) {
          callback( null, body );
        } else {
          // something went wrong, the body contains the details
          callback( body );
        }
      });
    },

    browserStrategy: function( type, path, data, callback ) {
      var request = new XMLHttpRequest();

      request.open( type, path, true );

      // If the XHR object supports a timeout add a 10s timeout
      if (request.timeout === 0) {
        request.timeout = 10000;
      }
      if ( this.csrfToken ) {
        request.setRequestHeader( "X-CSRF-Token", this.csrfToken ); // express.js uses a non-standard name for csrf-token
      }

      request.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
      request.onreadystatechange = function() {
        var response,
            error;
        if ( this.readyState === 4 ) {
          try {
            response = JSON.parse( this.responseText ),
            error = response.error;
          }
          catch ( exception ) {
            error = exception;
          }
          if ( error ) {
            callback( error );
          } else {
            callback( null, response );
          }
        }
      };
      request.send( JSON.stringify( data ) );
    },
    doXHR: function( type, path, data, callback ) {
      if ( typeof data === "function" ) {
        callback = data;
        data = {};
      } else if ( typeof data === "string" ) {
        path = data.length ? path + "?" + data : path;
        data = {};
      }
      // use the globally selected XHR strategy (see end of file)
      this[ selectedXHRStrategy ]( type, this.apiURL + path, data, callback );
    },

    addPair: function( queryPairs, key, val, not ) {
      val = val ? val.toString() : "";
      if ( !val.length ) {
        return this;
      }
      val = not ? "{!}" + val : val;
      queryPairs.push( encodeURIComponent( key ) + "=" + encodeURIComponent( val ) );
    },

    mapAndJoinTerms: function( terms ) {
      return terms.map(function( val ) {
        return val.trim();
      }).join( "," );
    },

    addArrayPair: function( queryPairs, options, field, not ){
      if ( options ) {
        var terms = options[ field ] || options,
            execution = options.execution || "and";
        if ( Array.isArray( terms ) ) {
          terms = this.mapAndJoinTerms( terms );
        } else {
          terms = this.mapAndJoinTerms( terms.split( "," ) );
        }
        terms = execution + "," + terms;
        this.addPair( queryPairs, field, terms, not );
      }
    },

    wrap: function ( make ) {
      var self = this;
      // Lazily extract various tags types as needed, and memoize.
      function lazyInitTags( o, name, regexp ) {
        delete o[ name ];
        var tags = [];
        make.tags.forEach( function( tag ) {
          if( regexp.test( tag ) ) {
            tags.push( tag );
          }
        });
        o[ name ] = tags;
        return tags;
      }

      var wrapped = {
        // Application Tags are "webmaker.org:foo", which means two
        // strings, joined with a ':', and the first string does not
        // contain an '@'
        get appTags() {
          return lazyInitTags( self, 'appTags', /^[^@]+\:[^:]+/ );
        },

        // User Tags are "some@something.com:foo", which means two
        // strings, joined with a ':', and the first string contains
        // an email address (i.e., an '@').
        get userTags() {
          return lazyInitTags( self, 'userTags', /^[^@]+@[^@]+\:[^:]+/ );
        },

        // Raw Tags are "foo" or "#fooBar", which means one string
        // which does not include a colon.
        get rawTags() {
          return lazyInitTags( self, 'rawTags', /^[^:]+$/ );
        },

        // Determine whether this make is tagged with any of the tags
        // passed into `tags`.  This can be a String or [ String ],
        // and the logic is OR vs. AND for multiple.
        taggedWithAny: function( tags ) {
          var any = false,
              all = make.tags;
          tags = Array.isArray( tags ) ? tags : [ tags ];
          for( var i = 0; i < tags.length; i++ ) {
            if ( all.indexOf( tags[ i ] ) > -1 ) {
              return true;
            }
          }
          return false;
        },

        // Get a list of other makes that were remixed from this make.
        // The current make's URL is used as a key.
        remixes: function( callback ) {
          callback = callback || function(){};
          self
          .find({ remixedFrom: wrapped._id })
          .then( callback );
        },

        // Similar to remixes(), but filter out only those remixes that
        // have a different locale (i.e., are localized versions of this
        // make).
        locales: function( callback ) {
          callback = callback || function(){};
          this.remixes( function( err, results ) {
            if( err ) {
              callback( err );
              return;
            }
            var locales = [];
            results.forEach( function( one ) {
              if ( one.locale !== wrapped.locale ) {
                locales.push( one );
              }
            });
            callback( null, locales );
          });
        },

        // Get the original make used to create this remix. Null is sent
        // back in the callback if there was no original (not a remix)
        original: function( callback ) {
          callback = callback || function(){};
          if ( !wrapped.remixedFrom ) {
            callback( null, null );
            return;
          }
          self
          .find({ _id: wrapped._id })
          .then( callback );
        },

        update: function( email, callback ) {
          callback = callback || function(){};
          self
          .update( wrapped._id, wrapped, callback );
        }

      };

      // Extend wrapped with contents of make
      [ "url", "contentType", "locale", "title", "remixCount",
        "description", "author", "published", "tags", "thumbnail",
        "username", "remixedFrom", "_id", "emailHash", "createdAt",
        "updatedAt", "likes", "reports", "remixurl", "editurl" ].forEach( function( prop ) {
          wrapped[ prop ] = make[ prop ];
      });

      // Virtuals will only be exposed while still on the server end
      // forcing us to still manually expose it for client side users.
      wrapped.id = wrapped._id;

      return wrapped;
    },

    find: function( options ) {
      options = options || {};

      for ( var key in options ) {
        if ( options.hasOwnProperty( key ) && this[ key ] ) {
          if ( Array.isArray( options[ key ] ) ) {
            this[ key ].apply( this, options[ key ] );
          } else {
            this[ key ]( options[ key ] );
          }
        }
      }
      return this;
    },

    author: function( name, not ) {
      this.addPair( this.queryPairs, "author", name, not );
      return this;
    },

    user: function( id, not ) {
      this.addPair( this.queryPairs, "user", id, not );
      return this;
    },

    tags: function( options, not ) {
      this.addArrayPair( this.queryPairs, options, "tags", not );
      return this;
    },

    tagPrefix: function( prefix, not ) {
      this.addPair( this.queryPairs, "tagPrefix", prefix, not );
      return this;
    },

    url: function( url, not ) {
      this.addPair( this.queryPairs, "url", url, not );
      return this;
    },

    contentType: function( contentType, not ) {
      this.addPair( this.queryPairs, "contentType", contentType, not );
      return this;
    },

    remixedFrom: function( id, not ) {
      this.addPair( this.queryPairs, "remixedFrom", id, not );
      return this;
    },

    id: function( ids, not ) {
      if ( typeof ids === "string" ) {
        this.addPair( this.queryPairs, "id", ids, not );
      } else {
        // override execution to be "or"
        if ( Array.isArray( ids ) ) {
          ids = {
            id: ids,
            execution: "or"
          };
        } else {
          ids.execution = "or";
        }
        addArrayPair( this.queryPairs, ids, "id", not );
      }
      return this;
    },

    title: function( title, not ) {
      this.addPair( this.queryPairs, "title", title, not );
      return this;
    },

    description: function( desc, not ) {
      this.addPair( this.queryPairs, "description", desc, not );
      return this;
    },

    likedByUser: function( username ) {
      this.addPair( this.queryPairs, "likedByUser", username );
      return this;
    },

    limit: function( num ) {
      this.addPair( this.queryPairs, "limit", num );
      return this;
    },

    page: function( num ) {
      this.addPair( this.queryPairs, "page", num );
      return this;
    },

    sortByField: function( field, direction ) {
      var sortOpts;
      if ( typeof field === "string" ) {
        sortOpts = field;
        sortOpts += "," + ( direction ? direction : "desc" );
        this.addPair( this.queryPairs, "sortByField", sortOpts );
        return this;
      }
      return this;
    },

    or: function() {
      this.addPair( this.queryPairs, "or", "1" );
      return this;
    },

    getRemixCounts: function() {
      this.addPair( this.queryPairs, "getRemixCounts", "true" );
      return this;
    },

    then: function( callback ) {
      var querystring = this.queryPairs.join( "&" ),
          self = this;

      this.queryPairs = [];

      this.doXHR( "GET", this.searchPath,
        querystring,
        function( err, data ) {
          if ( err ) {
            return callback( err );
          }

          if ( !data ) {
            return callback( null, [], 0);
          }

          // Wrap resulting makes with some extra API.
          var hits = data.makes;
          for ( var i = 0; i < hits.length; i++ ) {
            hits[ i ] = self.wrap( hits[ i ] );
          }
          callback( null, hits, data.total );
        }
      );
    },

    create: function create( options, callback ) {
      this.doXHR( "POST", this.makePrefix, options, callback );
      return this;
    },

    update: function update( id, options, callback ) {
      this.doXHR( "PUT", this.makePrefix + id, options, callback );
      return this;
    },

    like: function like( id, maker, callback ) {
      this.doXHR( "PUT", this.makePrefix + "like/" + id, { maker: maker }, callback );
      return this;
    },

    unlike: function update( id, maker, callback ) {
      this.doXHR( "PUT", this.makePrefix + "unlike/" + id, { maker: maker }, callback );
      return this;
    },

    remove: function remove( id, callback ) {
      this.doXHR( "DELETE", this.makePrefix + id, callback );
      return this;
    },

    autocompleteTags: function autocompleteTags( term, size, callback ) {
      if ( !callback && typeof size === "function" ) {
        callback = size;
        size = 10;
      }
      var query = "t=" + term + "&s=" + size;
      this.doXHR( "GET", this.makePrefix + "tags", query, callback );
      return this;
    },

    report: function report( id, maker, callback ) {
      this.doXHR( "PUT", this.makePrefix + "report/" + id, { maker: maker }, callback );
      return this;
    },

    cancelReport: function cancelReport( id, maker, callback ) {
      this.doXHR( "PUT", this.makePrefix + "cancelReport/" + id, { maker: maker }, callback );
      return this;
    },

    remixCount: function remixCount( id, options, callback ) {
      options = options || {};
      var from = options.from || "",
          to = options.to || "",
          qs = "id=" + id + "&from=" + from + "&to=" + to;

      this.doXHR( "GET", this.makePrefix + "remixCount", qs, callback );
      return this;
    },

    createList: function createList( options, callback ) {
      this.doXHR( "POST", this.listPrefix, options, callback );
      return this;
    },

    updateList: function updateList( id, options, callback) {
      this.doXHR( "PUT", this.listPrefix + id, options, callback );
      return this;
    },

    removeList: function removeList( id, userId, callback ) {
      this.doXHR( "DELETE", this.listPrefix + id, { userId: userId }, callback );
      return this;
    },

    getList: function getList( id, callback, noWrap ) {
      var self = this;
      this.doXHR(
        "GET",
        this.listPrefix + id,
        function( err, data ) {
          if ( err ) {
            return callback( err );
          }

          if ( !data ) {
            return callback( null, [], 0);
          }

          if ( noWrap ) {
            return callback( null, data );
          }

          // Wrap resulting makes with some extra API.
          for ( var i = 0; i < data.makes.length; i++ ) {
            data.makes[ i ] = self.wrap( data.makes[ i ] );
          }
          callback( null, data );
        }
      );
      return this;
    },

    getListsByUser: function( userId, callback ) {
      this.doXHR( "GET", this.listPrefix + "user/" + userId, callback );
      return this;
    }
  };

  Make.m.init.prototype = Make.m;

  // Depending on the environment we need to export our "Make" object differently.
  if ( typeof module !== 'undefined' && module.exports ) {
    request = require( "request" );
    hawk = require( "hawk" );
    // npm install makeapi support
    selectedXHRStrategy = "nodeStrategy";
    module.exports = Make;
  } else {
    selectedXHRStrategy = "browserStrategy";
    if ( typeof define === "function" && define.amd ) {
      // Support for requirejs
      define(function() {
        return Make;
      });
    } else {
      // Support for include on individual pages.
      window.Make = Make;
    }
  }
}( module ));
