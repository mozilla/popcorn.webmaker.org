/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

(function( Butter ) {

  Butter.Editor.register( "hotspot", "load!{{baseDir}}templates/assets/editors/hotspot/hotspot-editor.html",
    function( rootElement, butter ) {

    var _this = this,
        _rootElement = rootElement,
        _trackEvent,
        _container = _rootElement.querySelector( ".editor-options" ),
        _addFrame = _rootElement.querySelector( ".add-frame" ),
        _frameLayout = _rootElement.querySelector( ".hotspot-frame" ).cloneNode( true ),
        _frameSelector = _rootElement.querySelector( ".frame-selector" ),
        _framesContainer = _rootElement.querySelector( ".frames-container" ),
        _errorFrameButton = _rootElement.querySelector( ".add-frame-error" ),
        _popcornOptions,
        _frames,
        _activeFrameContainer,
        _activeFrameObj,
        _butter;

    function setupNewHotspot( frame, hotspot, hotspotSelector ) {
      var newHotspotOption = document.createElement( "option" ),
          hotspotObj = hotspot || {},
          hotspotId = hotspotObj.id || Popcorn.guid( "hotspot-correct" );

      hotspotObj.id = hotspotId;

      newHotspotOption.value = hotspotId;
      newHotspotOption.innerHTML = "Correct Hotspot " + hotspotId;
      hotspotSelector.appendChild( newHotspotOption );

      if ( frame.hotspots.indexOf( hotspotObj ) === -1 ) {
        frame.hotspots.push( hotspotObj );

        _trackEvent.update({
          frames: _frames.slice( 0 )
        });
      }
    }

    function addErrorFrame() {
      setupNewFrame( {}, true );
    }

    function toggleAddErrorFrame( flag ) {
      // Add an error frame, which we always store at the ending index of the frames array.
      // We give it a special id and there is only ever one active per trackevent.
      if ( flag ) {
        _errorFrameButton.addEventListener( "click", addErrorFrame, false );
      } else {
        _errorFrameButton.removeEventListener( "click", addErrorFrame, false );
      }
    }

    function setupNewFrame( frame, isError ) {
      var options = _frameSelector.querySelectorAll( "option" ),
          frameObj = frame || {},
          frameId,
          newFrameOption = document.createElement( "option" ),
          newFrameLayout = _frameLayout.cloneNode( true ),
          frameName = newFrameLayout.querySelector( ".frame-name" ),
          frameImage = newFrameLayout.querySelector( ".frame-image" ),
          frameHotspotSelector = newFrameLayout.querySelector( ".hotspot-selector" ),
          frameAddHotspot = newFrameLayout.querySelector( ".add-hotspot" ),
          removeHotspot = newFrameLayout.querySelector( ".remove-hotspot" );

      if ( !isError ) {
        frameId = frameObj.id || Popcorn.guid( "hotspot-frame" );
      } else {
        frameId = "error";
      }

      frameObj.id = frameId;
      frameObj.hotspots = frameObj.hotspots || [];
      frameObj.name = frameObj.name || "Frame " + frameId;
      frameObj.image = frameObj.image || "";

      newFrameOption.value = frameId;
      frameName.value = newFrameOption.innerHTML = frameObj.name;
      frameImage.value = frameObj.image || "";

      if ( _frameSelector.lastChild && _frameSelector.lastChild.value === "error" ) {
        _frameSelector.insertBefore( newFrameOption, _frameSelector.lastChild );
      } else {
        _frameSelector.appendChild( newFrameOption );
      }

      newFrameOption.setAttribute( "data-frame-editor-option-id", frameId );
      newFrameLayout.setAttribute( "data-frame-editor-container-id", frameId );
      _framesContainer.appendChild( newFrameLayout );
      
      if ( _activeFrameContainer ) {
        _activeFrameContainer.classList.add( "butter-hidden" );
      }

      newFrameOption.addEventListener( "click", function( e ) {
        var frameId = e.target.getAttribute( "data-frame-editor-option-id" ),
            editorFramePanel,
            pluginFramePanel;

        for ( var i = 0; i < _frames.length; i++ ) {
          if ( _frames[ i ].id === frameId ) {
            // Hide active container
            editorFramePanel = document.querySelector( "[data-frame-editor-container-id='" + _activeFrameObj.id + "']" );
            pluginFramePanel = document.querySelector( "[data-frame-container-id='" + _activeFrameObj.id + "']" );
            editorFramePanel.classList.add( "butter-hidden" );
            pluginFramePanel.classList.add( "hidden" );

            // Display new container
            _activeFrameObj = _frames[ i ];
            editorFramePanel = document.querySelector( "[data-frame-editor-container-id='" + _activeFrameObj.id + "']" );
            pluginFramePanel = document.querySelector( "[data-frame-container-id='" + _activeFrameObj.id + "']" );
            editorFramePanel.classList.remove( "butter-hidden" );
            pluginFramePanel.classList.remove( "hidden" );
          }
        }
      }, false );

      if ( !isError ) {
        frameImage.addEventListener( "blur", function( e ) {
          _activeFrameObj.image = e.target.value;
          _trackEvent.update({
            frames: _frames.slice( 0 )
          });
        }, false );

        frameName.addEventListener( "blur", function( e ) {
          var frameOption = document.querySelector( "[data-frame-editor-option-id='" + _activeFrameObj.id + "']" );

          _activeFrameObj.name = frameOption.innerHTML = e.target.value;
          _trackEvent.update({
            frames: _frames.slice( 0 )
          });
        }, false );

        removeHotspot.addEventListener( "click", function() {
          var activeOption = frameHotspotSelector.options[ frameHotspotSelector.selectedIndex ],
              hotspotId;

          // Potential for no option to be selected
          if ( activeOption ) {
            hotspotId = activeOption.value;

            for ( var i = 0; i < _activeFrameObj.hotspots.length; i++ ) {
              if ( _activeFrameObj.hotspots[ i ].id === hotspotId ) {
                _activeFrameObj.hotspots.splice( i, 1 );
                frameHotspotSelector.removeChild( activeOption );
                break;
              }
            }

            _trackEvent.update({
              frames: _frames.slice( 0 )
            });
          }
        }, false );

        frameAddHotspot.addEventListener( "click", function() {
          setupNewHotspot( frameObj, {}, frameHotspotSelector );
        }, false );
      } else {
        frameName.disabled = true;
        frameName.classList.add( "butter-disabled" );
        newFrameLayout.querySelector( ".select-container" ).classList.add( "butter-hidden" );
        newFrameLayout.querySelector( ".default.input" ).classList.add( "butter-hidden" );
        toggleAddErrorFrame();
      }

      if ( _frames.indexOf( frameObj ) === -1 ) {
        newFrameOption.selected = true;
        _activeFrameContainer = newFrameLayout;
        _activeFrameObj = frameObj;
        _activeFrameContainer.classList.remove( "butter-hidden" );
        
        // We maintain the error frame as the last frame in the internal tracking array
        if ( _frames.length && _frames[ _frames.length - 1 ].id === "error" ) {
          _frames.splice( _frames.length - 2, 0, frameObj );
        } else {
          _frames.push( frameObj );
        }

        if ( isError ) {
          _trackEvent.update({
            frames: _frames.slice( 0 )
          });
        }
      }

      // If we have an error frame, make sure it stays disabled.
      // If we don't but have at least 1 frame enabled it, otherwise
      // disabled it until 1 frame is present.
      if ( _frames.length && _frames[ _frames.length - 1 ].id === "error" ) {
        _errorFrameButton.classList.add( "butter-disabled" );
      } else if ( _frames.length ) {
        _errorFrameButton.classList.remove( "butter-disabled" );
        toggleAddErrorFrame( true );
      } else {
        _errorFrameButton.classList.add( "butter-disabled" );
      }

      if ( frameObj.hotspots.length ) {
        for ( var i = 0; i < frameObj.hotspots.length; i++ ) {
          setupNewHotspot( frameObj, frameObj.hotspots[ i ], frameHotspotSelector );
        }
      } else if ( frameObj.id !== "error" ) {
        setupNewHotspot( frameObj, {}, frameHotspotSelector );
      }

    }

    _addFrame.addEventListener( "click", function() {
      setupNewFrame();
    }, false );

    function sortFrames( e ) {

      if ( !_activeFrameObj ) {
        return;
      }

      var activeFrameOption = _frameSelector.querySelector( "[data-frame-editor-option-id='" + _activeFrameObj.id + "']" ),
          insertBeforeOption,
          frameOptionIndex,
          sortDirection = e.target.getAttribute( "data-sort-direction" ),
          frameObject;

      frameOptionIndex = _frames.indexOf( _activeFrameObj );

      // Bail early as we have no need to sort an error frame
      if ( _activeFrameObj.id === "error" && sortDirection !== "remove" ) {
        return;
      }

      // If direction is up and we aren't already in the first(zero) index
      if ( sortDirection === "up" && frameOptionIndex ) {
        insertBeforeOption = _frameSelector.childNodes[ frameOptionIndex - 1 ];
        // temporarily remove the dom reference.
        _frameSelector.removeChild( activeFrameOption );
        frameObject = _frames.splice( frameOptionIndex, 1 )[ 0 ];
        _frames.splice( frameOptionIndex - 1, 0, frameObject );
        _frameSelector.insertBefore( activeFrameOption, insertBeforeOption );

        _trackEvent.update({
          frames: _frames.slice( 0 )
        });
      } else if ( sortDirection === "down" && frameOptionIndex + 1 < _frames.length ) {

        // Bail early as we don't want to sort frames below the error frame.
        if ( _frames[ _frames.length -1 ] && _frames[ _frames.length - 1 ].id === "error" ) {
          return;
        }

        // temporarily remove the dom reference.
        _frameSelector.removeChild( activeFrameOption );
        frameObject = _frames.splice( frameOptionIndex, 1 )[ 0 ];
        _frames.splice( frameOptionIndex + 1, 0, frameObject );
        insertBeforeOption = _frameSelector.childNodes[ frameOptionIndex + 1 ];

        if ( insertBeforeOption ) {
          _frameSelector.insertBefore( activeFrameOption, insertBeforeOption );
        } else {
          _frameSelector.appendChild( activeFrameOption );
        }

        _trackEvent.update({
          frames: _frames.slice( 0 )
        });
      } else if ( sortDirection === "remove" && frameOptionIndex !== -1 ) {
        _frameSelector.removeChild( activeFrameOption );
        _frames.splice( frameOptionIndex, 1 );

        // If there's a frame still at the old frames index, prioritize that as active.
        // If not, try at frameOptionIndex - 1.
        // If error frame, default first frame to being active.
        if ( _activeFrameObj.id !== "error" ) {
          if ( _frames[ frameOptionIndex ] ) {
            _activeFrameObj = _frames[ frameOptionIndex ];
          } else if ( _frames[ frameOptionIndex - 1 ] ) {
            _activeFrameObj = _frames[ frameOptionIndex - 1 ];
          }
        } else if ( _frames[ 0 ] ) {
          _activeFrameObj = _frames[ 0 ];
        }

        _trackEvent.update({
          frames: _frames.slice( 0 )
        });
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
      _popcornOptions = _trackEvent.popcornOptions;
      _frames = _popcornOptions.frames;

      for ( var i = 0; i < _frames.length; i++ ) {
        setupNewFrame( _frames[ i ] );   
      }

      setupClickBlockers( true );
      determineActiveFrame();

      var buttons = _rootElement.querySelectorAll( ".frame-sort-menu > li" ),
          button;

      for ( var k = 0; k < buttons.length; k++ ) {
        button = buttons[ k ].querySelector( "a > span" );
        button.addEventListener( "click", sortFrames, false );
      }

      _this.setTrackEventUpdateErrorCallback( _this.setErrorState );
    }

    function determineActiveFrame() {
      var activeFrame,
          editorFramePanel,
          editorFrameOption,
          pluginFramePanel;

      if ( _activeFrameObj ) {
        activeFrame = _activeFrameObj;
      } else if ( _frames[ 0 ] ) {
        _activeFrameObj = activeFrame = _frames[ 0 ];
      }

      // We could be opening the editor for the first time
      if ( activeFrame ) {
        editorFramePanel = document.querySelector( "[data-frame-editor-container-id='" + activeFrame.id + "']" );
        editorFrameOption = document.querySelector( "[data-frame-editor-option-id='" + activeFrame.id + "']" );
        pluginFramePanel = document.querySelector( "[data-frame-container-id='" + activeFrame.id + "']" );

        editorFramePanel.classList.remove( "butter-hidden" );
        editorFrameOption.selected = true;
        pluginFramePanel.classList.remove( "hidden" );
      }

      _this.scrollbar.update();
    }

    function onTrackEventUpdated( e ) {
      _trackEvent = e.target;
      _popcornOptions = _trackEvent.popcornOptions;
      _frames = _popcornOptions.frames;
      setupClickBlockers( true );
      determineActiveFrame();
      _this.setErrorState( false );
    }

    function setupClickBlockers( flag ) {
      var hotspots,
          clickContainer;

      if ( flag ) {
        for ( var j = 0; j < _frames.length; j++ ) {
          hotspots = _frames[ j ].hotspots;

          for ( var i = 0; i < hotspots.length; i++ ) {
            clickContainer = document.querySelector( "[data-hotspot-click-container-id='" + hotspots[ i ].id + "']" );
            clickContainer.classList.add( "off" );
          }
        }
      } else {
        for ( var t = 0; t < _frames.length; t++ ) {
          hotspots = _frames[ t ].hotspots;

          for ( var k = 0; k < hotspots.length; k++ ) {
            clickContainer = document.querySelector( "[data-hotspot-click-container-id='" + hotspots[ k ].id + "']" );
            clickContainer.classList.remove( "off" );
          }
        }
      }
    }

    function setActiveFrame( data ) {
      // Hide the error frame panel
      document.querySelector( "[data-frame-editor-container-id='" + _activeFrameObj.id + "']" ).classList.add( "butter-hidden" );
      _activeFrameObj = data.activeFrame;
      determineActiveFrame();
    }

    // Extend this object to become a TrackEventEditor
    Butter.Editor.TrackEventEditor.extend( _this, butter, rootElement, {
      open: function( parentElement, trackEvent ) {
        _butter = butter;

        // Update properties when TrackEvent is updated
        trackEvent.listen( "trackeventupdated", onTrackEventUpdated );

        // A flag used to notify plugins whether or not it needs to worry about displaying the first frame
        // when start is hit.
        // This is always hit before start.
        trackEvent.popcornTrackEvent.inEditor = true;

        _butter.currentMedia.popcorn.popcorn.on( "error-frame-return", setActiveFrame );

        setup( trackEvent );
      },
      close: function() {
        _trackEvent.unlisten( "trackeventupdated", onTrackEventUpdated );

        // A flag used to notify plugins whether or not it needs to worry about displaying the first frame
        // when start is hit.
        // This is always hit before start.
        _trackEvent.popcornTrackEvent.inEditor = false;

        _butter.currentMedia.popcorn.popcorn.off( "error-frame-return", setActiveFrame );

        setupClickBlockers();
      }
    });
  }, false, function( trackEvent ) {
    var _container,
        target,
        hotspots;

    _container = trackEvent.popcornTrackEvent._container;
    hotspots = _container.querySelectorAll( ".hotspot-container" );
    target = trackEvent.popcornTrackEvent._target;

    function callback( ui, elem ) {
      var hotspotId = elem.getAttribute( "data-hotspot-container-id" ),
          frames = trackEvent.popcornOptions.frames,
          frame,
          foundHotspot;

      for ( var i = 0; i < frames.length; i++ ) {
        frame = frames[ i ];

        for ( var k = 0; k < frame.hotspots.length; k++ ) {
          if ( frame.hotspots[ k ].id === hotspotId ) {
            foundHotspot = frame.hotspots[ k ];
            break;
          }
        }
      }

      if ( foundHotspot ) {
        foundHotspot.top = ui.top;
        foundHotspot.left = ui.left;
        foundHotspot.height = ui.height;
        foundHotspot.width = ui.width;

        trackEvent.update({
          frames: frames.slice( 0 )
        });
      }
    }

    for ( var i = 0; i < hotspots.length; i++ ) {
      // This is used because the version of butter that Fivel includes doesn't have our
      // selectable code. That selectable code also causes some problems with this.
      hotspots[ i ].style.boxShadow = "0 0 1px #3fb58e";
      hotspots[ i ].style.border = "1px solid #3fb58e";
      hotspots[ i ].style.margin = "-1px";

      this.draggable( trackEvent, hotspots[ i ], target, {
        disableTooltip: true,
        end: callback
      });
      this.resizable( trackEvent, hotspots[ i ], target, {
        handlePositions: "n,ne,e,se,s,sw,w,nw",
        end: callback
      });
    }
  });
}( window.Butter ));
