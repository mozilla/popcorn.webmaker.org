/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

(function( Butter ) {
  Butter.Editor.register( "interaction", "load!{{baseDir}}templates/assets/editors/interactions/interaction-editor.html",
    function( rootElement, butter ) {

    var _this = this;

    var _rootElement = rootElement,
        _trackEvent,
        _butter,
        _popcornOptions,
        _pluginOptions,
        _mousetrapHelper,
        _popcorn = butter.currentMedia.popcorn.popcorn;

    function stopPropagation( e ) {
      e.preventDefault();
      e.stopPropagation();
    }

    function blockShortcuts() {
      window.addEventListener( "keydown", stopPropagation, false );
    }

    function unblockShortcuts() {
      window.removeEventListener( "keydown", stopPropagation, false );
    }

    // Listen for start/stop and disable/enable keyboard shortcuts
    _popcorn.on( "interactionStart", blockShortcuts );
    _popcorn.on( "interactionEnd", unblockShortcuts );

    /**
     * Member: setup
     *
     * Sets up the content of this editor
     *
     * @param {TrackEvent} trackEvent: The TrackEvent being edited
     */
    function setup( trackEvent ) {
      _trackEvent = trackEvent;
      _popcornOptions = _trackEvent.popcornOptions;
      _pluginOptions = trackEvent.popcornTrackEvent;
      _mousetrapHelper = _pluginOptions._mousetrapHelper;

      var sequences = _pluginOptions.sequences || {};
          sequences.winSequence = sequences.winSequence || [];
          sequences.macSequence = sequences.macSequence || [];

      var container = _rootElement.querySelector( ".editor-options" ),
          manifestOptions = {},
          pickers = {};

      function onCreatePropertyFromManifest( elementType, element, trackEvent, name ) {
        manifestOptions[ name ] = { element: element, trackEvent: trackEvent, elementType: elementType };
      }

      function attachHandlers() {
        var key,
            option,
            element,
            elementType,
            label,
            trackEvent;

        function processCombo( OS ) {
          _mousetrapHelper.bindInputTag( element, sequences[ OS + "Sequence" ], unblockShortcuts, blockShortcuts, function( newSequence ) {
            var newOptions = {};

            newOptions[ OS + "Combo" ] = newSequence;

            trackEvent.update( newOptions );
          });
        }

        var isMousetrapLoaded = function() {
          if ( _mousetrapHelper ) {
            if ( key === "winCombo" ) {
              processCombo( "win" );
            } else if ( key === "macCombo" ) {
              processCombo( "mac" );
            }
          } else {
            setTimeout(function(){
              isMousetrapLoaded();
            }, 5 );
          }
        };

        for ( key in manifestOptions ) {
          if ( manifestOptions.hasOwnProperty( key ) ) {
            option = manifestOptions[ key ];
            trackEvent = option.trackEvent;
            element = option.element;
            elementType = option.elementType;
            label = option.label;

            if ( elementType === "select" ) {
              _this.attachSelectChangeHandler( element, trackEvent, key, _this.updateTrackEventSafe );
            } else if ( elementType === "input" ) {
              // Add "Apply" button
              var applyBttn = document.createElement( "button" );
                  applyBttn.type = "button";
                  applyBttn.classList.add( "apply" );
                  applyBttn.innerHTML = "Apply";

              element.parentNode.insertBefore( applyBttn, element.nextSibling );
              element.setAttribute( "readonly", "readonly" );
              element.classList.add( "mousetrap" );

              isMousetrapLoaded();
            }
          }
        }

        container.insertBefore( _this.createStartEndInputs( trackEvent, _this.updateTrackEventSafe ), container.firstChild );
      }

      _this.createPropertiesFromManifest({
        trackEvent: trackEvent,
        callback: onCreatePropertyFromManifest,
        basicContainer: container,
        ignoreManifestKeys: [ "start", "end", "" ]
      });

      attachHandlers();
      _this.updatePropertiesFromManifest( trackEvent );
      _this.setTrackEventUpdateErrorCallback( _this.setErrorState );
    }

    function onTrackEventUpdated( e ) {
      _trackEvent = e.target;
      _this.updatePropertiesFromManifest( _trackEvent );
      _this.setErrorState( false );
    }

    // Extend this object to become a TrackEventEditor
    Butter.Editor.TrackEventEditor.extend( _this, butter, rootElement, {
      open: function( parentElement, trackEvent ) {
        // Update properties when TrackEvent is updated
        trackEvent.listen( "trackeventupdated", onTrackEventUpdated );
        setup( trackEvent );
      },
      close: function() {
        _trackEvent.unlisten( "trackeventupdated", onTrackEventUpdated );
      }
    });
  });
}( window.Butter ));
