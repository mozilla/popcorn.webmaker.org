/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "localized", "core/eventmanager", "core/media", "util/sanitizer" ],
        function( Localized, EventManager, Media, Sanitizer ) {

  var __butterStorage = window.localStorage;

  function Project( butter ) {

    var _this = this,
        _id, _name, _template, _description, _dataObject, _video,
        _publishUrl, _iframeUrl, _remixedFrom, _remixedFromUrl, _makeid, _isRemix,

        _tags = [],

        // Whether or not a save to server is required (project data has changed)
        _isDirty = false,

        // Whether or not a backup to storage is required (project data has changed)
        _needsBackup = false,

        // Whether or not the project is saved to the db and published.
        // The notion of "saving" to consumers of this code is unware of
        // the save vs. publish distinction. As such, we use isSaved externally
        // and isPublished internally, where Publish follows Save and is
        // more correct.
        _isPublished = false,

        // How often to backup data in ms. If 0, no backups are done.
        _backupIntervalMS = butter.config.value( "backupInterval" )|0,

        // Interval for backups, starts first time user clicks Save.
        _backupInterval = -1,

        _thumbnail = location.protocol + "//" + location.host + "/resources/icons/fb-logo.png",
        _background = "#FFFFFF";

    function invalidate() {
      // Project is dirty, needs save, backup
      _isDirty = true;
      _needsBackup = true;

      // If the project has an id (if it was saved), start backups again
      // since they may have been stopped if LocalStorage size limits were
      // exceeded.
      if ( _id ) {
        startBackups();
      }

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
          _thumbnail = val;
          invalidate();
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
          if ( !_dataObject || _isDirty ) {
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

      // Have changes made it to the db and been published?
      "isSaved": {
        get: function() {
          return _isPublished && !_isDirty;
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

      _video = document.getElementById( "video" );
      _video.style.background = _background;

      // Listen for changes in the project data so we know when to save.
      [ "mediacontentchanged",
        "mediaclipadded",
        "mediaclipremoved",
        "mediatargetchanged",
        "trackadded",
        "trackremoved",
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
        _isPublished = true;
      }

      if ( json.name ) {
        // replace HTML entities ("&amp;", etc), possibly introduced by
        // templating rules being applied to project metadata, with
        // their plain form counterparts ("&", etc).
        _name = Sanitizer.reconstituteHTML( json.name );
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
        startBackups();
      }

      // This is an old project. Force it into a dirty state to encourage resaving.
      if ( _isPublished && !_makeid ) {
        _isDirty = true;
      }

    };

    // Export project data as JSON string (e.g., for use with project.import())
    _this.export = function() {
      return JSON.stringify( _this.data );
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
      data.author = butter.cornfield.username();
      data.description = _description;
      data.tags = _tags.join( "," );
      data.thumbnail = _thumbnail;
      data.background = _background;
      data.backupDate = Date.now();
      try {
        __butterStorage.setItem( "butter-backup-project", JSON.stringify( data ) );
        _needsBackup = false;
      } catch ( e ) {
        // Deal with QUOTA_EXCEEDED_ERR when localStorage is full.
        // Stop the backup loop because we know we can't save anymore until the
        // user changes something about the project.
        clearInterval( _backupInterval );
        _backupInterval = -1;

        // Purge the saved project, since it won't be complete.
        __butterStorage.removeItem( "butter-backup-project" );

        console.warn( "Warning: Popcorn Maker LocalStorage quota exceeded. Stopping automatic backup. Will be restarted when project changes again." );
      }
    };

    _this.remove = function( callback ) {
      if ( !callback ) {
        callback = function() {};
      }

      // Don't delete if there is no project.
      if ( !_this.isSaved ) {
        callback({ error: "okay" });
        return;
      }

      butter.cornfield.remove( _id, callback );
    };

    // Save and Publish a project.  Saving only happens if project data needs
    // to be saved (i.e., it has been changed since last save, or was never
    // saved before).
    _this.save = function( callback ) {
      if ( !callback ) {
        callback = function() {};
      }

      // Don't save if there is nothing new to save.
      if ( _this.isSaved ) {
        callback({ error: "okay" });
        return;
      }

      function saveProject() {
        butter.unlisten( "mediaready", saveProject );
        var projectData = {
          id: _id,
          name: _name,
          template: _template,
          author: butter.cornfield.username(),
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

        // Save to db, then publish
        butter.cornfield.save( _id, projectData, function( e ) {
          if ( e.error === "okay" ) {
            // Since we've now fully saved, blow away autosave backup
            _isDirty = false;
            __butterStorage.removeItem( "butter-backup-project" );

            // Start keeping backups in storage, if not already started
            startBackups();

            // Keep any URLs generated from store in sync with the project.
            if ( e.project ) {
              _thumbnail = e.project.thumbnail;
            }

            // Keep any URLs generated from store in sync with the project.
            if ( e.project ) {
              _thumbnail = e.project.thumbnail;
            }

            // If this was a first save, grab id generated by server and store
            if ( !_id ) {
              _id = e.project.id;
            }

            // Now Publish and get URLs for embed
            butter.cornfield.publish( _id, function( e ) {
              if ( e.error === "okay" ) {
                // Save + Publish is OK
                _isPublished = true;
                _publishUrl = e.publishUrl;
                _iframeUrl = e.iframeUrl;
              }

              // Let consumers know that the project is now saved;
              _this.dispatch( "projectsaved" );

              if ( window.history.replaceState ) {
                window.history.replaceState({}, "", "/" + Localized.getCurrentLang() + "/editor/" + _id + "/edit" );
              }

              callback( e );
            });
          } else {
            callback( e );
          }
        });
      }

      var popcorn = butter.currentMedia.popcorn.popcorn,
          byEnd = popcorn.data.trackEvents.byEnd,
          lastEvent = byEnd[ byEnd.length - 2 ];

      // If it's not greater than two, this mean we only have Popcorns padding events.
      if ( byEnd.length > 2  && lastEvent.end < butter.currentMedia.duration ) {
        butter.listen( "mediaready", saveProject );
        butter.currentMedia.url = "#t=," + lastEvent.end;
      } else {
        saveProject();
      }
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
      __butterStorage.removeItem( "butter-backup-project" );

      if ( projectBackup ) {
        backupDate = projectBackup.backupDate;
      }
    } catch( e ) { }

    callback( projectBackup, backupDate );
  };

  return Project;
});
