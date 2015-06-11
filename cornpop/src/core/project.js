/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "localized", "core/eventmanager", "core/media", "util/sanitizer" ],
        function( Localized, EventManager, Media, Sanitizer ) {

  var __butterStorage = window.localStorage,
      DATA_USAGE_WARNING = "Warning: Popcorn Maker LocalStorage quota exceeded. Stopping automatic backup. Will be restarted when project changes again.";

  function removeBackup() {
    __butterStorage.removeItem( "butter-backup-project" );
  }

  function Project( butter ) {

    var _this = this,
        _id, _name, _template, _description, _dataObject, _video,
        _publishUrl, _iframeUrl, _remixedFrom, _remixedFromUrl, _makeid, _isRemix,

        _tags = [],

        // Whether or not a backup to storage is required (project data has changed)
        _needsBackup = false,
        _isSaved = false,
        _isPublished = false,
        _public = true,

        // How often to backup data in ms. If 0, no backups are done.
        _backupIntervalMS = butter.config.value( "backupInterval" )|0,

        // Interval for backups, starts first time user clicks Save.
        _backupInterval = -1,

        _thumbnail = location.protocol + "//" + location.host + "/resources/icons/fb-logo.png",
        _background = "#FFFFFF";

    function invalidate() {
      // Project is dirty, needs save, backup
      _isSaved = false;
      _isPublished = false;
      _needsBackup = true;

      // Start backups again since they may have been
      // stopped if LocalStorage size limits were exceeded.
      startBackups();

      // Let consumers know that the project changed
      _this.dispatch( "projectchanged" );
    }

    // Manage access to project properties.  Some we only want
    // to be read (and managed by db/butter), others we want to
    // affect save logic.
    Object.defineProperties( _this, {
      "id": {
        get: function() {
          return _id;
        },
        enumerable: true
      },

      "name": {
        get: function() {
          return _name;
        },
        set: function( value ) {
          if ( value !== _name ) {
            _name = value;
            document.title = _name + " - " + Localized.get( "Popcorn Maker" );
            invalidate();
          }
        },
        enumerable: true
      },

      "template": {
        get: function() {
          return _template;
        },
        set: function( value ) {
          if ( value !== _template ) {
            _template = value;
            invalidate();
          }
        },
        enumerable: true
      },

      "description": {
        get: function() {
          return _description;
        },
        set: function( value ) {
          if ( value !== _description ) {
            _description = value;
            invalidate();
          }
        },
        enumerable: true
      },

      "thumbnail": {
        set: function( val ) {
          if ( val !== _thumbnail ) {
            _thumbnail = val;
            invalidate();
          }
        },
        get: function() {
          return _thumbnail;
        },
        enumerable: true
       },

      "background": {
        set: function( val ) {
          if ( val !== _background ) {
            _background = val;
            _video.style.background = _background;
            invalidate();
          }
        },
        get: function() {
          return _background;
        },
        enumerable: true
      },

      "tags": {
        set: function( val ) {
          _tags = val.split( "," ).map(function( v ) {
            return v.trim();
          });
          invalidate();
        },
        get: function() {
          return _tags;
        },
        enumerable: true
      },

      "makeid": {
        get: function() {
          return _makeid;
        },
        enumerable: true
      },

      "data": {
        get: function() {
          // Memoize value, since it doesn't always change
          if ( !_dataObject || !_isSaved ) {
            var exportJSONMedia = [];
            for ( var i = 0; i < butter.media.length; ++i ) {
              exportJSONMedia.push( butter.media[ i ].json );
            }
            _dataObject = {
              targets: butter.serializeTargets(),
              media: exportJSONMedia
            };
          }
          return _dataObject;
        },
        enumerable: true
      },

      "publishUrl": {
        get: function() {
          return _publishUrl;
        },
        enumerable: true
      },

      "remixedFromUrl": {
        get: function() {
          return _remixedFromUrl;
        },
        enumerable: true
      },

      "iframeUrl": {
        get: function() {
          return _iframeUrl;
        },
        enumerable: true
      },

      // Have changes made it to the db?
      "isSaved": {
        get: function() {
          return _isSaved;
        },
        enumerable: true
      },

      "isPublished": {
        get: function() {
          return _isPublished;
        },
        enumerable: true
      },

      "public": {
        set: function( val ) {
          if ( val !== _public ) {
            _public = val;
            invalidate();
          }
        },
        get: function() {
          return _public;
        },
        enumerable: true
      },

      "isRemix": {
        get: function () {
          return _isRemix;
        },
        enumerable: true
      }

    });

    EventManager.extend( _this );

    // Once saved data is loaded, and media is ready, we start to care about
    // the app's data states changing, and want to track.
    butter.listen( "mediaready", function mediaReady() {
      butter.unlisten( "mediaready", mediaReady );

      startBackups();
      _video = document.getElementById( "video" );
      _video.style.background = _background;

      // Listen for changes in the project data so we know when to save.
      [ "mediaclipadded",
        "mediaclipremoved",
        "mediatargetchanged",
        "trackadded",
        "trackremoved",
        "tracknamechanged",
        "trackorderchanged",
        "tracktargetchanged",
        "trackeventadded",
        "trackeventremoved",
        "trackeventupdated"
      ].forEach( function( event ) {
        butter.listen( event, invalidate );
      });
    });

    function startBackups() {
      if ( _backupInterval === -1 && _backupIntervalMS > 0 ) {
        _needsBackup = true;
        _backupInterval = setInterval( backupData, _backupIntervalMS );
        // Do a backup now so we don't miss anything
        backupData();
      }
    }

    // Import project data from JSON (i.e., created with project.export())
    _this.import = function( json ) {
      var oldTarget, targets, targetData,
          mediaData, media, m, i, l;
      // If JSON, convert to Object
      if ( typeof json === "string" ) {
        try {
          json = JSON.parse( json );
        } catch( e ) {
          return;
        }
      }

      if ( json.projectID ) {
        _id = json.projectID;
        _isSaved = true;
      }

      if ( json.published ) {
        _isPublished = true;
      }

      if ( json.projectID && !json.published ) {
        _public = false;
      }

      if ( json.name ) {
        // replace HTML entities ("&amp;", etc), possibly introduced by
        // templating rules being applied to project metadata, with
        // their plain form counterparts ("&", etc).
        _name = Sanitizer.reconstituteHTML( json.name );
        document.title = _name + " - " + Localized.get( "Popcorn Maker" );
      }

      if ( json.template ) {
        _template = json.template;
      }

      if ( json.makeid ) {
        _makeid = json.makeid;
      }

      if ( json.isRemix ) {
        _isRemix = json.isRemix;
      }

      if ( json.description ) {
        _description = json.description;
      }

      if ( json.tags ) {
        _tags = json.tags;
      }

      if ( json.thumbnail ) {
        _thumbnail = json.thumbnail;
      }

      if ( json.background ) {
        _background = json.background;
      }

      if ( json.publishUrl ) {
        _publishUrl = json.publishUrl;
      }

      if ( json.iframeUrl ) {
        _iframeUrl = json.iframeUrl;
      }

      if ( json.remixedFrom ) {
        _remixedFrom = json.remixedFrom;
      }

      _remixedFromUrl = json.remixedFromUrl;

      targets = json.targets;
      if ( targets && Array.isArray( targets ) ) {
        for ( i = 0, l = targets.length; i < l; ++i ) {
          targetData = targets[ i ];
          oldTarget = butter.getTargetByType( "elementID", targetData.element );
          // Only add target if it's not already added.
          if ( !oldTarget ) {
            butter.addTarget( targetData );
          } else {
            // If it was already added, just update its json.
            oldTarget.json = targetData;
          }
        }
      } else if ( console ) {
        console.warn( "Ignored imported target data. Must be in an Array." );
      }

      media = json.media;
      if ( media && Array.isArray( media ) ) {
        for ( i = 0, l = media.length; i < l; ++i ) {
          mediaData = media[ i ];
          m = butter.getMediaByType( "target", mediaData.target );

          if ( !m ) {
            m = new Media();
            m.json = mediaData;
            butter.addMedia( m );
          } else {
            m.json = mediaData;
          }
        }
      } else if ( console ) {
        console.warn( "Ignored imported media data. Must be in an Array." );
      }

      // If this is a restored backup, restart backups now (vs. on first save)
      // since the user indicated they want it.
      if ( json.backupDate ) {
        butter.ui.unloadDialog.turnOnDialog();
      }

      // This is an old project. Force it into a dirty state to encourage resaving.
      if ( _isPublished && !_makeid ) {
        _isSaved = false;
        _isPublished = false;
      }

    };

    // Export project data as JSON string (e.g., for use with project.import())
    _this.export = function() {
      return JSON.stringify( _this.data );
    };

    function setData( data, callback ) {
      try {
        __butterStorage.setItem( "butter-backup-project", JSON.stringify( data ) );
        _needsBackup = false;
      } catch ( e ) {

        // Purge the saved project, since it won't be complete.
        removeBackup();
        console.warn( DATA_USAGE_WARNING );
        return callback( e );
      }
      return callback();
    }

    _this.useBackup = function() {
      // Using backup means we have likely crashed, so we cannot trust any new
      // data, just previous data saved before the crash.
      clearInterval( _backupInterval );
      window.onbeforeunload = null;
      _backupInterval = -1;

      var data = JSON.parse( __butterStorage.getItem( "butter-backup-project" ) );
      // If we haven't saved a backup then there's no need to use backup on reload
      if ( !data ) {
        return;
      }
      data.useBackup = true;

      setData( data, function() {} );
    };


    // Expose backupData() to make testing possible
    var backupData = _this.backupData = function() {
      // If the project isn't different from last time, or if it's known
      // to not fit in storage, don't bother trying.
      if ( !_needsBackup ) {
        return;
      }
      // Save everything but the project id
      var data = _this.data;
      data.name = _name;
      data.template = _template;
      data.author = 'TODO';
      data.description = _description;
      data.tags = _this.tags;
      data.thumbnail = _thumbnail;
      data.background = _background;
      data.backupDate = Date.now();
      data.useBackup = false;
      setData( data, function( error ) {
        if ( error ) {
          // Deal with QUOTA_EXCEEDED_ERR when localStorage is full.
          // Stop the backup loop because we know we can't save anymore until the
          // user changes something about the project.
          clearInterval( _backupInterval );
          _backupInterval = -1;
        }
      });
    };

    _this.remove = function( callback ) {
      if ( !callback ) {
        callback = function() {};
      }

      // Don't delete if there is no project.
      if ( !_this.isSaved ) {
        callback({ status: "okay" });
        return;
      }

      // butter.cornfield.remove( _id, callback );
    };

    // Save a project.  Saving only happens if project data needs
    // to be saved (i.e., it has been changed since last save, or was never
    // saved before).
    _this.save = function( callback ) {
      if ( !callback ) {
        callback = function() {};
      }

      // Don't save if there is nothing new to save.
      if ( _this.isSaved ) {
        callback({ status: "okay" });
        return;
      }

      function saveProject() {
        butter.unlisten( "mediaready", saveProject );
        var projectData = {
          id: _id,
          name: _name,
          template: _template,
          author: 'TODO',
          description: _description,
          thumbnail: _thumbnail,
          background: _background,
          data: _this.data,
          tags: _this.tags,
          remixedFrom: _remixedFrom,
          makeid: _makeid
        };

        // Save to local storage first in case network is down.
        backupData();

        _isSaved = true;

        // posts message to outside of the iframe
        parent.postMessage(projectData, window.location.origin);

        callback({ status: "okay" });
      }

      var popcorn = butter.currentMedia.popcorn.popcorn,
          byEnd = popcorn.data.trackEvents.byEnd,
          lastEvent = byEnd[ byEnd.length - 2 ];

      // If it's not greater than two, this mean we only have Popcorn's padding events.
      if ( byEnd.length > 2  && lastEvent.end < butter.currentMedia.duration ) {
        butter.listen( "mediaready", saveProject );
        butter.currentMedia.url = "#t=," + lastEvent.end;
      } else {
        saveProject();
      }
    };

    _this.publish = function( callback ) {
      if ( !callback ) {
        callback = function() {};
      }

      // Don't publish if already published.
      if ( _this.isPublished ) {
        callback({ status: "okay" });
        return;
      }

      /*
      // Now Publish and get URLs for embed
      butter.cornfield.publish( _id, function( e ) {
        if ( e.status === "okay" ) {
          // Save + Publish is OK
          _isPublished = true;
        }

        callback( e );
      });
      */
    };
  }

  // Check for an existing project that was autosaved but not saved.
  // Returns project backup data as JS object if found, otherwise null.
  // NOTE: caller must create a new Project object and call import.
  Project.checkForBackup = function( butter, callback ) {
    // See if we already have a project autosaved from another session.
    var projectBackup, backupDate;

    // For testing purposes, we can skip backup recovery
    if ( butter.config.value( "recover" ) === "purge" ) {
      callback( null, null );
      return;
    }

    try {
      projectBackup = __butterStorage.getItem( "butter-backup-project" );
      projectBackup = JSON.parse( projectBackup );

      // Delete since user can save if he/she wants.
      removeBackup();

      if ( projectBackup ) {
        backupDate = projectBackup.backupDate;
      }
    } catch( e ) { }

    callback( projectBackup, backupDate );
  };

  return Project;
});
