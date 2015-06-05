/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

(function( Butter ) {

  Butter.Editor.register( "popup", "load!{{baseDir}}plugins/popup-editor.html",
    function( rootElement, butter ) {

    var _this = this;

    var _rootElement = rootElement,
        _trackEvent,
        _manifestOptions,
        _butter,
        _popcornOptions;

    /**
     * Member: setup
     *
     * Sets up the content of this editor
     *
     * @param {TrackEvent} trackEvent: The TrackEvent being edited
     */
    function setup( trackEvent ) {
      _trackEvent = trackEvent;
      _manifestOptions = _trackEvent.manifest.options;
      _popcornOptions = _trackEvent.popcornOptions;

      var basicContainer = _rootElement.querySelector( ".editor-options" ),
          advancedContainer = _rootElement.querySelector( ".advanced-options" ),
          pluginOptions = {},
          pickers = {};

      function callback( elementType, element, trackEvent, name ) {
        pluginOptions[ name ] = { element: element, trackEvent: trackEvent, elementType: elementType };
      }

      function attachHandlers() {
        var key,
            option;

        function togglePopup() {
          triangleObject.element.parentNode.style.display = "none";
          flipObject.element.parentNode.style.display = "none";
          soundObject.element.parentNode.style.display = "block";
          iconObject.element.parentNode.style.display = "block";
        }

        function toggleSpeech() {
          triangleObject.element.parentNode.style.display = "block";
          flipObject.element.parentNode.style.display = "block";
          soundObject.element.parentNode.style.display = "none";
          iconObject.element.parentNode.style.display = "none";
        }

        function attachTypeHandler( option ) {
          option.element.addEventListener( "change", function( e ) {
            var elementVal = e.target.value,
                updateOptions = {},
                target;

            if ( elementVal === "popup" ) {
              togglePopup();
            }
            else {
              toggleSpeech();
            }

            updateOptions.type = elementVal;
            option.trackEvent.update( updateOptions );

            // Attempt to make the trackEvent's target blink
            target = _butter.getTargetByType( "elementID", option.trackEvent.popcornOptions.target );
            if( target ) {
              target.view.blink();
            }
            else {
              _butter.currentMedia.view.blink();
            }
          } );
        }

        function colorCallback( te, prop, message ) {
          if ( message ) {
            _this.setErrorState( message );
            return;
          } else {
            te.update({
              fontColor: prop.fontColor
            });
          }
        }

        function urlCallback( trackEvent, updateOptions ) {
          if ( updateOptions.linkUrl ) {
            pickers.linkTarget.classList.remove( "butter-disabled" );
            pickers.linkTarget.disabled = false;
          } else {
            pickers.linkTarget.classList.add( "butter-disabled" );
            pickers.linkTarget.disabled = true;
          }
          trackEvent.update( updateOptions );
        }

        function updateIcon( iconImg, value ) {
            if ( value === "none" ) {
              iconImg.style.visibility = "hidden";
              iconImg.src = "";
            }
            else {
              iconImg.src = "/src/plugins/popup/images/" + value + ".png";
              iconImg.style.visibility = "initial";
            }
        }

        function iconHandler() {
          var that = this;
          setTimeout(function() {
            updateIcon( that.parentNode.querySelector( ".popup-icon-preview" ), that.value );
          });
        }

        for ( key in pluginOptions ) {
          if ( pluginOptions[ key ] ) {
            option = pluginOptions[ key ];

            if ( key === "type" ) {
              var triangleObject = pluginOptions.triangle,
                  soundObject = pluginOptions.sound,
                  iconObject = pluginOptions.icon,
                  flipObject = pluginOptions.flip,
                  currentType = option.trackEvent.popcornOptions.type;

              if ( currentType === "popup" ) {
                togglePopup();
              }
              else {
                toggleSpeech();
              }

              attachTypeHandler( option );
            }
            else if ( key === "icon" ) {
              var iconImg = document.createElement( "img" );
              iconImg.className = "popup-icon-preview";

              var iconSpan = document.createElement( "span" );
              iconSpan.className = "butter-unit";
              iconSpan.style.right = "120px";

              var iconDiv = document.createElement( "div" );
              iconDiv.className = "butter-form-append";

              option.element.parentNode.appendChild( iconDiv );
              iconDiv.appendChild( iconSpan );
              iconSpan.appendChild( iconImg );
              iconDiv.appendChild( option.element );

              _this.attachSelectChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
              option.element.style.marginLeft = "40px";
              updateIcon( iconImg, _popcornOptions.icon );
              option.element.addEventListener( "keyup" , iconHandler, false );
              option.element.addEventListener( "mouseover" , iconHandler, false );
            }
            else if ( option.elementType === "select" && key !== "type" && key !== "icon" ) {
              _this.attachSelectChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
              if ( key === "linkTarget" ) {
                pickers.linkTarget = option.element;
                if ( !_popcornOptions.linkUrl ) {
                  option.element.classList.add( "butter-disabled" );
                  pickers.linkTarget.disabled = true;
                }
              }
            }
            else if ( option.elementType === "input" ) {
              if ( key === "linkUrl" ) {
                _this.createTooltip( option.element, {
                  name: "text-link-tooltip" + Date.now(),
                  element: option.element.parentElement,
                  message: Butter.localized.get( "Links will be clickable when shared." ),
                  top: "105%",
                  left: "50%",
                  hidden: true,
                  hover: false
                });
              }

              if ( option.element.type === "checkbox" ) {
                _this.attachCheckboxChangeHandler( option.element, option.trackEvent, key );
              }
              else if ( key === "fontColor" ) {
                _this.attachColorChangeHandler( option.element, option.trackEvent, key, colorCallback );
              } else if ( key === "linkUrl" ) {
                _this.attachInputChangeHandler( option.element, option.trackEvent, key, urlCallback );
              }
              else {
                _this.attachInputChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
              }
            }
            else if ( option.elementType === "textarea" ) {
              _this.attachInputChangeHandler( option.element, option.trackEvent, key, _this.updateTrackEventSafe );
            }
          }
        }

        basicContainer.insertBefore( _this.createStartEndInputs( trackEvent, _this.updateTrackEventSafe ), basicContainer.firstChild );
      }

      if ( _popcornOptions.fontSize ) {
        _manifestOptions.fontPercentage.hidden = true;
        _manifestOptions.fontSize.hidden = false;
      } else {
        _manifestOptions.fontSize.hidden = true;
        _manifestOptions.fontPercentage.hidden = false;
      }

      _this.createPropertiesFromManifest({
        trackEvent: trackEvent,
        callback: callback,
        basicContainer: basicContainer,
        advancedContainer: advancedContainer,
        ignoreManifestKeys: [ "start", "end" ]
      });

      attachHandlers();
      basicContainer.appendChild( _this.createSetAsDefaultsButton( trackEvent ) );
      _this.updatePropertiesFromManifest( trackEvent );
      _this.setTrackEventUpdateErrorCallback( _this.setErrorState );
    }

    function anchorClickPrevention( anchorContainer ) {
      if ( anchorContainer ) {

        anchorContainer.onclick = function() {
          return false;
        };
      }
    }

    function onTrackEventUpdated( e ) {
      _trackEvent = e.target;

      var anchorContainer = _trackEvent.popcornTrackEvent._container.querySelector( "a" );
      anchorClickPrevention( anchorContainer );

      _this.updatePropertiesFromManifest( _trackEvent );
      _this.setErrorState( false );
    }

    // Extend this object to become a TrackEventEditor
    Butter.Editor.TrackEventEditor.extend( _this, butter, rootElement, {
      open: function( parentElement, trackEvent ) {
        var anchorContainer = trackEvent.popcornTrackEvent._container.querySelector( "a" );

        anchorClickPrevention( anchorContainer );

        _butter = butter;

        // Update properties when TrackEvent is updated
        trackEvent.listen( "trackeventupdated", onTrackEventUpdated );
        setup( trackEvent );
      },
      close: function() {
        _trackEvent.unlisten( "trackeventupdated", onTrackEventUpdated );
      }
    });
  }, false, function( trackEvent ) {
    var _container,
        _contentContainer,
        target;

    _container = trackEvent.popcornTrackEvent._container;
    target = trackEvent.popcornTrackEvent._target;

    _contentContainer = _container.querySelector( ".popup-inner-div > div" ) || _container.querySelector( ".speechBubble > div" );

    this.contentEditable( trackEvent, _container, _contentContainer );
    this.selectable( trackEvent, _container );
    this.draggable( trackEvent, _container, target );
    this.resizable( trackEvent, _container, target, {
      handlePositions: "e",
      minWidth: 10
    });
  });
}( window.Butter ));
