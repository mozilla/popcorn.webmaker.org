/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

/*globals google*/
( function( Butter ) {

  Butter.Editor.register( "googlemap", "load!{{baseDir}}plugins/googlemap-editor.html",
    function( rootElement, butter ) {

    var _this = this;

    var _rootElement = rootElement,
        _trackEvent,
        _popcornEventMapReference,
        _butter,
        _popcorn,
        _cachedValues = {},
        _toggleMaps,
        _toggleStreetView;

    /**
     * Member: getMapFromTrackEvent
     *
     * Retrieves a handle to the map associated with the trackevent.
     */
    function getMapFromTrackEvent() {
      if ( !_trackEvent.popcornTrackEvent._map ) {
        _trackEvent.popcornTrackEvent.onmaploaded = function( options, map ){
          _popcornEventMapReference = map;
        };
      }
      else {
        _popcornEventMapReference = _trackEvent.popcornTrackEvent._map;
      }
    }

    /**
     * Member: setup
     *
     * Sets up the content of this editor
     *
     * @param {TrackEvent} trackEvent: The TrackEvent being edited
     */
    function setup( trackEvent ) {
      _trackEvent = trackEvent;

      _trackEvent._cachedValues = {};

      var pluginOptions = {},
          ignoreKeys = [
            "target",
            "start",
            "end"
          ],
          optionsContainer = _rootElement.querySelector( ".editor-options" );

      function callback( elementType, element, trackEvent, name ) {
        pluginOptions[ name ] = {
          element: element,
          trackEvent: trackEvent,
          elementType: elementType
        };
      }

      function attachHandlers() {
        var key,
            option,
            pitchObject,
            headingObject,
            currentMapType;

        _toggleStreetView = function() {
          pitchObject.element.parentNode.style.display = "block";
          headingObject.element.parentNode.style.display = "block";
          _this.scrollbar.update();
        };

        _toggleMaps = function() {
          pitchObject.element.parentNode.style.display = "none";
          headingObject.element.parentNode.style.display = "none";
          _this.scrollbar.update();
        };

        function streetviewSearchFailed( e ) {
          _popcorn.off( "googlemaps-zero-results", streetviewSearchFailed );
          if ( e.toggleMaps ) {
            pluginOptions.type.element.value = _trackEvent.popcornOptions.type = _cachedValues.type;
            pluginOptions.zoom.element.value = _trackEvent.popcornOptions.zoom = _cachedValues.zoom;
            _toggleMaps();
          }
          _this.setErrorState( e.error );
        }

        function attachTypeHandler( option ) {
          option.element.addEventListener( "change", function( e ) {

            var elementVal = e.target.value,
                updateOptions = {},
                popcornOptions = _trackEvent.popcornOptions,
                target;

            if ( elementVal === "STREETVIEW" ) {
              _popcorn.on( "googlemaps-zero-results", streetviewSearchFailed );
              _trackEvent._cachedValues.type = _cachedValues.type = popcornOptions.type;

              _toggleStreetView();

              // If current map is using custom positions vs static
              if ( popcornOptions.lat && popcornOptions.lng ) {
                _cachedValues.lat = popcornOptions.lat;
                _cachedValues.lng = popcornOptions.lng;
              } else {
                _cachedValues.location = popcornOptions.location;
              }

              // Set zoom to one because the behaviour of this value differs
              // between streetview and map view
              _trackEvent._cachedValues.zoom = _cachedValues.zoom = popcornOptions.zoom;
              updateOptions.zoom = 0;
            } else {
              _toggleMaps();

              // If current map is using custom positions vs static
              if ( _cachedValues.lat && _cachedValues.lng ) {
                updateOptions.lat = _cachedValues.lat;
                updateOptions.lng = _cachedValues.lng;
              } else if ( _cachedValues.location ) {
                updateOptions.location = _cachedValues.location;
              }

              if ( popcornOptions.type === "STREETVIEW" ) {
                updateOptions.zoom = _cachedValues.zoom;
              }
            }

            updateOptions.type = elementVal;
            option.trackEvent.update( updateOptions );

            // Attempt to make the trackEvent's target blink
            target = _butter.getTargetByType( "elementID", option.trackEvent.popcornOptions.target );
            if ( target ) {
              target.view.blink();
            } else {
              _butter.currentMedia.view.blink();
            }
          } );
        }

        function attachFullscreenHandler( option ) {
          option.element.addEventListener( "click", function( e ) {
            var srcElement = e.target,
                updateOptions = {},
                popcornOptions = _trackEvent.popcornOptions;

            if ( srcElement.checked ) {
              _cachedValues.width = popcornOptions.width;
              _cachedValues.height = popcornOptions.height;
              _cachedValues.top = popcornOptions.top;
              _cachedValues.left = popcornOptions.left;

              updateOptions = {
                height: 100,
                width: 100,
                left: 0,
                top: 0,
                fullscreen: true
              };

            } else {
              updateOptions = {
                height: _cachedValues.height,
                width: _cachedValues.width,
                left: _cachedValues.left,
                top: _cachedValues.top,
                fullscreen: false
              };
            }

            trackEvent.update( updateOptions );
          } );
        }

        function updateLocation( te, prop ) {
          _cachedValues.location = prop.location;

          _this.updateTrackEventSafe( te, {
            location: prop.location
          });
        }

        function updateZoom( te, prop ) {
          var zoom = +prop.zoom;

          // zoom can only be an integer, except in streetview
          if ( _trackEvent.popcornOptions.type !== "STREETVIEW" && zoom !== zoom >> 0 ) {
            _this.setErrorState( Butter.localized.get( "Zoom cannot be a decimal number." ) );
            return;
          }

          _cachedValues.zoom = zoom;

          _this.updateTrackEventSafe( te, {
            zoom: zoom
          });
        }

        for ( key in pluginOptions ) {
          if ( pluginOptions.hasOwnProperty( key ) ) {
            option = pluginOptions[ key ];

            if ( key === "type" ) {
              pitchObject = pluginOptions.pitch;
              headingObject = pluginOptions.heading;
              currentMapType = option.trackEvent.popcornOptions.type;

              if ( currentMapType === "STREETVIEW" ) {
                _toggleStreetView();
              } else {
                _toggleMaps();
              }

              attachTypeHandler( option );
            } else if ( option.elementType === "select" && key !== "type" ) {
              _this.attachSelectChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
            } else if ( key === "fullscreen" ) {
              attachFullscreenHandler( option );
            } else if ( key === "location" ) {
              _this.attachInputChangeHandler( option.element, option.trackEvent, key, updateLocation );
            } else if ( key === "zoom" ) {
              _this.attachInputChangeHandler( option.element, option.trackEvent, key, updateZoom );
            } else if ( option.elementType === "input" ) {
              _this.attachInputChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
            }
          }
        }

      }

      optionsContainer.appendChild( _this.createStartEndInputs( trackEvent, _this.updateTrackEventSafe ) );

      _this.createPropertiesFromManifest({
        trackEvent: trackEvent,
        callback: callback,
        basicContainer: optionsContainer,
        ignoreManifestKeys: ignoreKeys
      });

      attachHandlers();
      optionsContainer.appendChild( _this.createSetAsDefaultsButton( trackEvent ) );
      _this.updatePropertiesFromManifest( trackEvent );
      _this.scrollbar.update();

      _this.setTrackEventUpdateErrorCallback( _this.setErrorState );

    }

    function mapLoaded() {
      _popcorn.off( "googlemaps-loaded", mapLoaded );
      getMapFromTrackEvent();
    }

    function onTrackEventUpdated( e ) {
      var popcornOptions;

      _trackEvent = e.target;
      _this.updatePropertiesFromManifest( _trackEvent );
      _this.setErrorState( false );
      popcornOptions = _trackEvent.popcornOptions;

      if ( _trackEvent.popcornOptions.type === "STREETVIEW" ) {
        _toggleStreetView();
      } else {
        _toggleMaps();
      }

      // We have to store lat/lng values on track event update because
      // we update these with events from dragging the map and not fields
      // in the editor.
      _cachedValues.lat = popcornOptions.lat;
      _cachedValues.lng = popcornOptions.lng;

      // Now we REALLY know that we can try setting up listeners
      _popcorn.on( "googlemaps-loaded", mapLoaded );
    }

    // Extend this object to become a BaseEditor
    Butter.Editor.TrackEventEditor.extend( _this, butter, rootElement, {
      open: function( parentElement, trackEvent ) {
        var popcornOptions = trackEvent.popcornOptions;

        _popcorn = butter.currentMedia.popcorn.popcorn;

        _cachedValues = {
          width: popcornOptions.width,
          height: popcornOptions.height,
          top: popcornOptions.top,
          left: popcornOptions.left,
          location: popcornOptions.location,
          zoom: popcornOptions.zoom,
          lat: popcornOptions.lat,
          lng: popcornOptions.lng
        };

        _butter = butter;
        // Update properties when TrackEvent is updated
        trackEvent.listen( "trackeventupdated", onTrackEventUpdated );

        // Now we REALLY know that we can try setting up listeners
        _popcorn.on( "googlemaps-loaded", mapLoaded );

        setup( trackEvent );

      },
      close: function() {
        _trackEvent.unlisten( "trackeventupdated", onTrackEventUpdated );
      }
    });
  }, false, function( trackEvent, popcorn ) {

    var container = trackEvent.popcornTrackEvent._container,
        target = trackEvent.popcornTrackEvent._target,
        popcornEventMapReference,
        self = this;

    this.selectable( trackEvent, container );

    function setup() {

      if ( trackEvent.popcornOptions.fullscreen ) {
        return;
      }

      self.draggable( trackEvent, container, target, {
        tooltip: "Double click to interact"
      });

      self.resizable( trackEvent, container, target, {
        handlePositions: "e, se, s, sw, w, n, ne, nw",
        minHeight: 20,
        minWidth: 20
      });
    }

    // prevent duplicate map listeners
    if ( !trackEvent.popcornTrackEvent.listenersSetup ) {
      trackEvent.popcornTrackEvent.listenersSetup = true;

      // Plugin emits this event when googlemaps fires it's idle event. We have to wait until
      // Google considers the map done loading
      popcorn.on( "googlemaps-loaded", function() {
        popcorn.off( "googlemaps-loaded" );

        // We need to setup listeners on the maps for the following events incase the user decides
        // to manipulate the map before opening the editor
        function setupMapListeners() {

          // Timeouts protect us from a flood of update requests from the Google API
          var locationTimeout,
              streetViewTimeout,
              zoomTimeout;

          function locationChanged() {

            if ( locationTimeout ) {
              clearTimeout( locationTimeout );
            }

            locationTimeout = setTimeout(function() {
              var center = popcornEventMapReference.getCenter();

              trackEvent.update({
                lat: center.lat(),
                lng: center.lng(),
                location: ""
              });
            }, 50 );
          }

          function streetViewUpdate() {

            if ( streetViewTimeout ) {
              clearTimeout( streetViewTimeout );
            }

            streetViewTimeout = setTimeout(function() {

              var pov = popcornEventMapReference.streetView.pov,
                  latlng = popcornEventMapReference.streetView.getPosition(),
                  updateOptions = {};

              updateOptions.heading = pov.heading;
              updateOptions.pitch = pov.pitch;
              updateOptions.zoom = pov.zoom;
              updateOptions.lat = latlng.lat();
              updateOptions.lng = latlng.lng();
              updateOptions.location = "";

              trackEvent.update( updateOptions );
            }, 100 );
          }

          function zoomChange() {

            if ( zoomTimeout ) {
              clearTimeout( zoomTimeout );
            }

            zoomTimeout = setTimeout(function() {
              trackEvent.update({
                zoom: popcornEventMapReference.getZoom()
              });
            }, 50 );
          }

          function closeClick() {
            trackEvent.update({
              type: trackEvent._cachedValues.type || "ROADMAP",
              zoom: trackEvent._cachedValues.zoom || 0
            });
          }

          // Regular map event listeners
          google.maps.event.addListener( popcornEventMapReference, "drag", locationChanged );
          google.maps.event.addListener( popcornEventMapReference, "dragend", locationChanged );
          google.maps.event.addListener( popcornEventMapReference, "zoom_changed", zoomChange );

          // StreetView event listeners
          google.maps.event.addListener( popcornEventMapReference.streetView, "pov_changed", streetViewUpdate );
          google.maps.event.addListener( popcornEventMapReference.streetView, "position_changed", streetViewUpdate );
          google.maps.event.addListener( popcornEventMapReference.streetView, "pano_changed", streetViewUpdate );
          google.maps.event.addListener( popcornEventMapReference.streetView, "closeclick", closeClick );

          setup();
        }

        popcornEventMapReference = trackEvent.popcornTrackEvent._map;
        setupMapListeners();
      });
    }
  });
}( window.Butter ));
