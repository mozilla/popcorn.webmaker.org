/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

(function( Butter ) {

  Butter.Editor.register( "slider", "load!{{baseDir}}templates/assets/editors/slider/slider-editor.html",
    function( rootElement, butter, compiledLayout ) {

    var _this = this;

    var _rootElement = rootElement,
        _trackEvent,
        _butter,
        _popcornOptions,
        _MAX_CHARS = 180;

    var _changeHandlerCb = function _changeHandlerCb( te, updateOptions ) {
      // Parse the description using the descriptionHelper() object from
      // popcorn.slider.js
      var description = te.popcornTrackEvent.parseDescription( updateOptions.description );
      description = description.markdownRemoved;

      if ( description.length > _MAX_CHARS ) {
        _this.setErrorState( "Limit of " + _MAX_CHARS + " characters of the description text was hit. Please use less." );
      } else {
        te.update( updateOptions );
      }
    };

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

      var basicContainer = _rootElement.querySelector( ".editor-options" ),
          pluginOptions = {};

      function callback( elementType, element, trackEvent, name ) {
        pluginOptions[ name ] = { element: element, trackEvent: trackEvent, elementType: elementType };
      }

      function attachHandlers() {
        var key,
            option;

        for ( key in pluginOptions ) {
          if ( pluginOptions.hasOwnProperty( key ) ) {

            option = pluginOptions[ key ];

            if ( key === "description" ) {
              var instructions = document.createElement( "p" ),
                  parent = option.element.parentNode,
                  style = instructions.style;

              instructions.innerHTML = trackEvent.manifest.options.description.instructions;
              style.margin = "7px 10px";
              style.fontSize = "0.9em";
              style.fontStyle = "italic";

              parent.insertBefore( instructions, option.element );

              _this.attachInputChangeHandler( option.element, option.trackEvent, key, _changeHandlerCb );
            } else if ( option.elementType === "input" || option.elementType === "textarea" ) {
              _this.attachInputChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
            } else if ( option.elementType === "select" ) {
              _this.attachSelectChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
            }
          }
        }

        basicContainer.insertBefore( _this.createStartEndInputs( trackEvent, _this.updateTrackEventSafe ), basicContainer.firstChild );
      }

      _this.createPropertiesFromManifest({
        trackEvent: trackEvent,
        callback: callback,
        basicContainer: basicContainer,
        ignoreManifestKeys: [ "start", "end" ]
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
        // Disable description link functionality during editing
        var anchors = trackEvent.popcornTrackEvent._container.querySelectorAll( "a" ),
            anchorContainer,
            counter = anchors.length;

        for ( ; counter; --counter ) {
          anchors[ counter - 1 ].onclick = function _falseClick() {
            return false;
          };
        }

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

