/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "core/eventmanager", "./header",
          "./unload-dialog", "crashreporter",
          "first-run", "./tray", "editor/ui-kit",
          "core/trackevent", "dialog/dialog",
          "util/dragndrop", "make-api",
          "./resizeHandler", "json!/api/butterconfig" ],
  function( EventManager, Header,
            UnloadDialog, CrashReporter,
            FirstRun, Tray, UIKitDummy,
            TrackEvent, Dialog,
            DragNDrop, Make,
            ResizeHandler, config ){

  var html = document.querySelector( "html" );
  var TRANSITION_DURATION = 500,
      BUTTER_CSS_FILE = "{css}/butter.ui." + html.dir + ".css";

  var __unwantedKeyPressElements = [
        "TEXTAREA",
        "INPUT",
        "VIDEO",
        "AUDIO"
      ],
      __disabledKeyRepeats = [
        32, // space key
        27, // esc key
        8   // del key
      ];

  var NUDGE_INCREMENT_SMALL = 0.25,
      NUDGE_INCREMENT_LARGE = 1;

  function UI( butter ){

    var _uiConfig = butter.config,
        _uiOptions = _uiConfig.value( "ui" ),
        _unloadDialog,
        _resizeHandler,
        _stageWrapper = document.querySelector( ".stage-wrapper" ),
        _this = this;

    // Top-level way to test our crash reporter.
    butter.simulateError = CrashReporter.simulateError;

    EventManager.extend( _this );

    this.contentStateLocked = false;

    this.tray = new Tray( butter );
    this.header = new Header( butter, _uiConfig );

    // Filled in by the editor module
    this.editor = null;

    if ( _uiOptions.enabled ) {
      if ( _uiOptions.onLeaveDialog ) {
        _unloadDialog = new UnloadDialog( butter );
        _this.unloadDialog = _unloadDialog;
      }
      document.body.classList.add( "butter-header-spacing" );
      document.body.classList.add( "butter-tray-spacing" );
    }

    _stageWrapper.addEventListener( "mousedown", function() {
      if( butter.selectedEvents.length ) {
        butter.deselectAllTrackEvents();
      }
    } );

    this.loadIcons = function( plugins ) {
      var path, img, div;

      plugins.forEach( function( plugin ) {
          path = plugin.icon;

          if ( !path ) {
            return;
          }

          img = new Image();
          img.id = plugin.type + "-icon";
          img.src = path;

          // We can't use "display: none", since that makes it
          // invisible, and thus not load.  Opera also requires
          // the image be in the DOM before it will load.
          div = document.createElement( "div" );
          div.className = "butter-image-preload";

          div.appendChild( img );
          document.body.appendChild( div );
      });
    };

    var make = new Make({
      apiURL: config.make_endpoint
    });

    function loadTutorials() {
      var tutorialUrl;

      if ( butter.project.publishUrl ) {
        tutorialUrl = butter.project.publishUrl;
      } else if ( butter.project.remixedFromUrl ) {
        tutorialUrl = butter.project.remixedFromUrl;
      }

      make.id( butter.project.makeid ).then( function( err, results ) {

        var urls = [],
            tutorials = [],
            tag = "";

        function addNext( url ) {
          if ( !url ) {
            if ( tutorials.length ) {
              butter.editor.openEditor( "tutorial-editor", {
                openData: tutorials
              });
            }
            return;
          }

          make.url( url ).then( function( err, results ) {
            var result = results[ 0 ];
            if ( !err ) {
              if ( result ) {
                tutorials.push({
                  url: result.url + "?details=hidden",
                  title: result.title || result.url
                });
              } else {
                tutorials.push({
                  url: url,
                  title: url
                });
              }
            }
            addNext( urls.pop() );
          });
        }

        if ( err || !results.length ) {
          return;
        }

        for ( var i = 0; i < results[ 0 ].tags.length; i++ ) {
          tag = results[ 0 ].tags[ i ];
          if ( tag.indexOf( "tutorial-" ) === 0 ) {
            urls.push( decodeURIComponent( tag.replace( "tutorial-", "" ) ) );
          }
        }

        addNext( urls.pop() );
      });
    }

    this.setEditor = function( editorAreaDOMRoot ) {
      _this.editor = editorAreaDOMRoot;
      document.body.appendChild( editorAreaDOMRoot );
    };

    this.load = function( onReady ) {
      var loadOptions = {
        type: "css",
        url: BUTTER_CSS_FILE
      };

      function loadUI() {
        butter.loader.load( [ loadOptions ], function() {
          // load things that need the css file in loadOptions
          // to be loaded before we do anything with it.
          _this.tray.attachToDOM();
          _this.header.attachToDOM();
          _this.loadIcons( _uiConfig.value( "plugin" ).plugins );

          // Spin-up the crash reporter
          CrashReporter.init( butter, _uiConfig );

          function firstRunInit() {
            butter.unlisten( "mediaready", firstRunInit );

            // Open the media-editor editor right after butter is finished starting up
            butter.editor.openEditor( "media-editor" );
            if ( butter.project.publishUrl ||
                 butter.project.remixedFromUrl ) {
              loadTutorials();
            }
            FirstRun.init();
          }

          butter.listen( "mediaready", firstRunInit );

          onReady();
        });
      }

      if ( _uiOptions.enabled ) {
        loadUI();
      }
      else {
        onReady();
      }
    };

    /**
     * Member: moveTrackEventLeft
     *
     * If possible, moves a TrackEvent to the left by a specified amount.
     *
     * @param {TrackEvent} trackEvent: TrackEvent to move
     * @param {Number} amount: Amount by which the event is to move.
     */
    function moveTrackEventLeft( trackEvent, amount ) {
      var currentPopcornOptions = trackEvent.popcornOptions,
          currentDuration = currentPopcornOptions.end - currentPopcornOptions.start,
          overlappingTrackEvent,
          popcornOptions;

      if ( currentPopcornOptions.start > amount ) {
        popcornOptions = {
          start: currentPopcornOptions.start - amount,
          end: currentPopcornOptions.end - amount
        };
      }
      else {
        popcornOptions = {
          start: 0,
          end: currentDuration
        };
      }

      // If an overlapping trackevent was found, position this trackevent such that its left side is snug against the right side
      // of the overlapping trackevent.
      overlappingTrackEvent = trackEvent.track.findOverlappingTrackEvent( popcornOptions.start, popcornOptions.end, trackEvent );

      if ( overlappingTrackEvent ) {
        popcornOptions.start = overlappingTrackEvent.popcornOptions.end;
        popcornOptions.end = popcornOptions.start + currentDuration;
      }

      trackEvent.update( popcornOptions );
    }

    /**
     * Member: shrinkTrackEvent
     *
     * If possible, shrinks a TrackEvent to the left by a specified amount.
     *
     * @param {TrackEvent} trackEvent: TrackEvent to move
     * @param {Number} amount: Amount by which the event is to shrink.
     */
    function shrinkTrackEvent( trackEvent, amount ) {
      var currentPopcornOptions = trackEvent.popcornOptions,
          popcornOptions;

      if ( currentPopcornOptions.end - currentPopcornOptions.start - amount >= TrackEvent.MINIMUM_TRACKEVENT_SIZE ) {
        popcornOptions = {
          end: currentPopcornOptions.end - amount
        };
      }
      else {
        popcornOptions = {
          end: currentPopcornOptions.start + TrackEvent.MINIMUM_TRACKEVENT_SIZE
        };
      }

      // No need to check for overlapping TrackEvents here, since you can't shrink your TrackEvent to overlap another. That's silly.

      trackEvent.update( popcornOptions );
    }

    /**
     * Member: moveTrackEventRight
     *
     * If possible, moves a TrackEvent to the right by a specified amount.
     *
     * @param {TrackEvent} trackEvent: TrackEvent to move
     * @param {Number} amount: Amount by which the event is to move.
     */
    function moveTrackEventRight( trackEvent, amount ) {
      var currentPopcornOptions = trackEvent.popcornOptions,
          currentMediaDuration = butter.currentMedia.duration,
          currentDuration = currentPopcornOptions.end - currentPopcornOptions.start,
          overlappingTrackEvent,
          popcornOptions;

      if ( currentPopcornOptions.end <= currentMediaDuration - amount ) {
        popcornOptions = {
          start: currentPopcornOptions.start + amount,
          end: currentPopcornOptions.end + amount
        };
      }
      else {
        popcornOptions = {
          start: currentMediaDuration - ( currentPopcornOptions.end - currentPopcornOptions.start ),
          end: currentMediaDuration
        };
      }

      overlappingTrackEvent = trackEvent.track.findOverlappingTrackEvent( popcornOptions.start, popcornOptions.end, trackEvent );

      // If an overlapping trackevent was found, position this trackevent such that its right side is snug against the left side
      // of the overlapping trackevent.
      if ( overlappingTrackEvent ) {
        popcornOptions.end = overlappingTrackEvent.popcornOptions.start;
        popcornOptions.start = popcornOptions.end - currentDuration;
      }
      trackEvent.update( popcornOptions );
    }

    /**
     * Member: growTrackEvent
     *
     * If possible, grows a TrackEvent to the by a specified amount.
     *
     * @param {TrackEvent} trackEvent: TrackEvent to grow is to shrink.
     */
    function growTrackEvent( trackEvent, amount ) {
      var currentPopcornOptions = trackEvent.popcornOptions,
          overlappingTrackEvent,
          popcornOptions;

      if ( currentPopcornOptions.end <= butter.currentMedia.duration - amount ) {
        popcornOptions = {
          end: currentPopcornOptions.end + amount
        };
      }
      else {
        popcornOptions = {
          end: butter.currentMedia.duration
        };
      }

      // If an overlapping trackevent was found, position this trackevent such that its left side is snug against the right side
      // of the overlapping trackevent.
      overlappingTrackEvent = trackEvent.track.findOverlappingTrackEvent( currentPopcornOptions.start, popcornOptions.end, trackEvent );

      if ( overlappingTrackEvent ) {
        popcornOptions.end = overlappingTrackEvent.popcornOptions.end;
      }

      trackEvent.update( popcornOptions );
    }

    Object.defineProperties( this, {
      enabled: {
        get: function() {
          return _uiOptions.enabled;
        }
      }
    });

    var orderedTrackEvents = butter.orderedTrackEvents = [],
        sortTrackEvents = function( a, b ) {
          return a.popcornOptions.start > b .popcornOptions.start;
        };

    butter.listen( "trackeventadded", function( e ) {
      var trackEvent = e.data;
      orderedTrackEvents.push( trackEvent );
      orderedTrackEvents.sort( sortTrackEvents );
    }); // listen

    butter.listen( "trackeventremoved", function( e ) {
      var trackEvent = e.data,
          index = orderedTrackEvents.indexOf( trackEvent );
      if( index > -1 ){
        orderedTrackEvents.splice( index, 1 );
      } // if
    }); // listen

    butter.listen( "trackeventupdated", function() {
      orderedTrackEvents.sort( sortTrackEvents );
    }); // listen

    var processKey = {
      32: function( e ) { // space key
        e.preventDefault();

        if( butter.currentMedia.ended ){
          butter.currentMedia.paused = false;
        }
        else{
          butter.currentMedia.paused = !butter.currentMedia.paused;
        }
      }, // space key

      // left key
      37: function( e ) {
        var amount = e.shiftKey ? NUDGE_INCREMENT_LARGE : NUDGE_INCREMENT_SMALL,

            // Sorted selected events are used here because they should be moved from right to left.
            // Otherwise, overlapping can occur instantly, producing unexpected results.
            selectedEvents = butter.sortedSelectedEvents,

            i, seLength;

        if( selectedEvents.length ) {
          e.preventDefault();
          if ( e.ctrlKey || e.metaKey ) {
            for( i = 0, seLength = selectedEvents.length; i < seLength; ++i ) {
              shrinkTrackEvent( selectedEvents[ i ], amount );
            }
          }
          else {
            for( i = selectedEvents.length - 1; i >= 0; --i ) {
              moveTrackEventLeft( selectedEvents[ i ], amount );
            }
          }
        }
        else {
          butter.currentTime -= amount;
        }
      },

      // up key
      38: function( e ) {
        var track,
            trackEvent,
            nextTrack,

            //copy this selectedEvents because it will change inside loop
            selectedEvents = butter.selectedEvents.slice();

        if ( selectedEvents.length ) {
          e.preventDefault();
        }

        for ( var i = 0, seLength = selectedEvents.length; i < seLength; i++ ) {
          trackEvent = selectedEvents[ i ];
          track = trackEvent.track;
          nextTrack = butter.currentMedia.getLastTrack( track );
          if ( nextTrack && !nextTrack.findOverlappingTrackEvent( trackEvent ) ) {
            track.removeTrackEvent( trackEvent, true );
            nextTrack.addTrackEvent( trackEvent );
          }
        }
      },

      // right key
      39: function( e ) {
        var amount = e.shiftKey ? NUDGE_INCREMENT_LARGE : NUDGE_INCREMENT_SMALL,

            // Sorted selected events are used here because they should be moved from right to left.
            // Otherwise, overlapping can occur instantly, producing unexpected results.
            selectedEvents = butter.sortedSelectedEvents,

            i, seLength;

        if( selectedEvents.length ) {
          e.preventDefault();
          if ( e.ctrlKey || e.metaKey ) {
            for( i = 0, seLength = selectedEvents.length; i < seLength; ++i ) {
              growTrackEvent( selectedEvents[ i ], amount );
            }
          }
          else {
            for( i = 0, seLength = selectedEvents.length; i < seLength; ++i ) {
              moveTrackEventRight( selectedEvents[ i ], amount );
            }
          }
        }
        else {
          butter.currentTime += amount;
        }
      },

      // down key
      40: function( e ) {
        var track,
            trackEvent,
            nextTrack,

            //copy this selectedEvents because it will change inside loop
            selectedEvents = butter.selectedEvents.slice();

        if ( selectedEvents.length ) {
          e.preventDefault();
        }

        for ( var i = 0, seLength = selectedEvents.length; i < seLength; i++ ) {
          trackEvent = selectedEvents[ i ];
          track = trackEvent.track;
          nextTrack = butter.currentMedia.getNextTrack( track );
          if ( nextTrack && !nextTrack.findOverlappingTrackEvent( trackEvent ) ) {
            track.removeTrackEvent( trackEvent, true );
            nextTrack.addTrackEvent( trackEvent );
          }
        }
      },

      27: function() { // esc key
        if ( !DragNDrop.isDragging ) {
          butter.deselectAllTrackEvents();
        }
      },

      8: function( e ) { // del key
        var selectedEvents = butter.selectedEvents.slice(),             // Copy selectedEvents array to circumvent it changing
                                                                        // if deletion actually occurs, while still taking
                                                                        // advantage of caching.
            selectedEvent,
            dialog,
            i, l = selectedEvents.length;

        e.preventDefault();

        if( selectedEvents.length ) {

          // If any event is being dragged or resized we don't want to
          // allow deletion.
          for( i = 0; i < l; i++ ) {
            if ( selectedEvents[ i ].uiInUse ) {
              return;
            }
          }

          // If we have one track event just delete it, otherwise display a warning dialog.
          if ( selectedEvents.length === 1 ) {
            selectedEvent = selectedEvents[ 0 ];
            selectedEvent.track.removeTrackEvent( selectedEvent );
            return;
          }

          // Delete the events with warning dialog.
          dialog = Dialog.spawn( "delete-track", {
            data: selectedEvents.length + " track events",
            events: {
              submit: function() {
                for( i = 0; i < l; i++ ) {
                  selectedEvent = selectedEvents[ i ];
                  selectedEvent.track.removeTrackEvent( selectedEvent );
                }
                dialog.close();
              },
              cancel: function() {
                dialog.close();
              }
            }
          });
          dialog.open();
        }
      },

      9: function( e ) { // tab key
        if( orderedTrackEvents.length && butter.selectedEvents.length <= 1 ){
          e.preventDefault();
          var index = 0,
              direction = e.shiftKey ? -1 : 1;
          if( orderedTrackEvents.indexOf( butter.selectedEvents[ 0 ] ) > -1 ){
            index = orderedTrackEvents.indexOf( butter.selectedEvents[ 0 ] );
            if( orderedTrackEvents[ index+direction ] ){
              index+=direction;
            } else if( !e.shiftKey ){
              index = 0;
            } else {
              index = orderedTrackEvents.length - 1;
            } // if
          } // if
          butter.deselectAllTrackEvents();
          orderedTrackEvents[ index ].selected = true;
        } // if
      }, // tab key

      67: function( e ) { // c key
        if ( e.ctrlKey || e.metaKey ) {
          butter.copyTrackEvents();
        }
      }, // c key

      86: function( e ) { // v key
        if ( e.ctrlKey || e.metaKey ) {
          butter.pasteTrackEvents();
        }
      }, // v key

      65: function( e ) {
        if ( e.ctrlKey || e.metaKey ) {
          e.preventDefault();

          var tracks = butter.currentMedia.tracks,
              i, k, trackEventLn, track,
              trackLn = tracks.length;

          for ( i = 0; i < trackLn; i++ ) {
            track = tracks[ i ];

            if ( track.trackEvents ) {
              trackEventLn = track.trackEvents.length;
            }

            for ( k = 0; k < trackEventLn; k++ ) {
              track.trackEvents[ k ].selected = true;
            }
          }
        }
      } // a key
    };

    function onKeyDown( e ){
      var key = e.which || e.keyCode,
          eTarget = e.target;
      // this allows backspace and del to do the same thing on windows and mac keyboards
      key = key === 46 ? 8 : key;
      if( processKey[ key ] && !eTarget.isContentEditable && __unwantedKeyPressElements.indexOf( eTarget.nodeName ) === -1 ){

        if ( __disabledKeyRepeats.indexOf( key ) > -1 ) {
          window.removeEventListener( "keydown", onKeyDown, false );
          window.addEventListener( "keyup", onKeyUp );
        }

        processKey[ key ]( e );
      } // if
    }

    function onKeyUp() {
      window.removeEventListener( "keyup", onKeyUp, false );
      window.addEventListener( "keydown", onKeyDown );
    }

    function unbindKeyDownListener() {
      window.removeEventListener( "keydown", onKeyDown, false );
    }

    function bindKeyDownListener() {
      window.addEventListener( "keydown", onKeyDown );
    }

    DragNDrop.listen( "dragstarted", unbindKeyDownListener );
    DragNDrop.listen( "dragstopped", bindKeyDownListener );
    DragNDrop.listen( "resizestarted", unbindKeyDownListener );
    DragNDrop.listen( "resizestopped", bindKeyDownListener );
    DragNDrop.listen( "sortstarted", unbindKeyDownListener );
    DragNDrop.listen( "sortstopped", bindKeyDownListener );

    this.TRANSITION_DURATION = TRANSITION_DURATION;

    butter.listen( "ready", function(){
      _resizeHandler = new ResizeHandler( { margin: 26, border: 15 } ),
      _resizeHandler.resize();
      window.addEventListener( "resize", _resizeHandler.resizee );
    });

    butter.listen( "mediaready", bindKeyDownListener );

    _this.dialogDir = butter.config.value( "dirs" ).dialogs || "";

    // This is an easter egg to open a UI kit editor. Hurrah
    _this.showUIKit = function() {
      butter.editor.openEditor( "ui-kit" );
    };

  } //UI

  UI.__moduleName = "ui";

  return UI;

});
