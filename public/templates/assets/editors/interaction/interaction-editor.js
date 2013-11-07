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

    // Listen for start/stop and disable/enable keyboard shortcuts
    _popcorn.on( "interactionStart", function() {
      window.addEventListener( "keydown", stopPropagation, false )
    });
    _popcorn.on( "interactionEnd", function() {
      window.removeEventListener( "keydown", stopPropagation, false );
    });

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

      var sequences = _pluginOptions.sequences || [];
          sequences[ 0 ] = sequences[ 0 ] || [];
          sequences[ 1 ] = sequences[ 1 ] || [];
          sequences[ 2 ] = sequences[ 2 ] || [];

      var container = _rootElement.querySelector( ".editor-options" ),
          pluginOptions = {},
          pickers = {};

      function callback( elementType, element, trackEvent, name ) {
        pluginOptions[ name ] = { element: element, trackEvent: trackEvent, elementType: elementType };
      }

      function attachHandlers() {
        var key,
            option,
            element,
            elementType,
            label,
            trackEvent;

        for ( key in pluginOptions ) {
          if ( pluginOptions.hasOwnProperty( key ) ) {
            option = pluginOptions[ key ];
            trackEvent = option.trackEvent;
            element = option.element;
            elementType = option.elementType;
            label = option.label;

            if ( elementType === "select" ) {
              _this.attachSelectChangeHandler( element, trackEvent, key, _this.updateTrackEventSafe );
            } else if ( elementType === "input" ) {
              if ( key === "combo1" ) {
                _this.attachInputChangeHandler( element, trackEvent, key, _this.updateTrackEventSafe );
                _mousetrapHelper.bindInputTag( element, sequences[ 0 ] );
              } else if ( key === "combo2" ) {
                _this.attachInputChangeHandler( element, trackEvent, key, _this.updateTrackEventSafe );
                _mousetrapHelper.bindInputTag( element, sequences[ 1 ] );
              } else if ( key === "combo3" ) {
                _this.attachInputChangeHandler( element, trackEvent, key, _this.updateTrackEventSafe );
                _mousetrapHelper.bindInputTag( element, sequences[ 2 ] );
              }

              element.setAttribute( "readonly", "readonly" );
              element.classList.add( "mousetrap" );
            }
          }
        }

        container.insertBefore( _this.createStartEndInputs( trackEvent, _this.updateTrackEventSafe ), container.firstChild );
      }

      // backwards comp
      if ( "center left right".match( _popcornOptions.position ) ) {
        _popcornOptions.alignment = _popcornOptions.position;
        _popcornOptions.position = "middle";
      }

      _this.createPropertiesFromManifest({
        trackEvent: trackEvent,
        callback: callback,
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
        _butter = butter;

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
