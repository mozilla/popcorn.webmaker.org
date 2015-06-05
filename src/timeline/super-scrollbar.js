/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

/* Super scrollbar is a scrollbar and a zoom bar in one.
 * It also doubles as a minimap of sorts.
 * Displaying a preview of all the tracks and track events */
define( [ "util/lang", "text!layouts/super-scrollbar.html" ],
  function( LangUtils, SUPER_SCROLLBAR_LAYOUT ) {

  var TRACK_PADDING = 1,          // This padding is pixels between track event visuals.
      MIN_WIDTH = 5,              // The smallest the viewport can get.
      ARROW_MIN_WIDTH = 50,       // The arrows have to change position at this point.
      ARROW_MIN_WIDTH_CLASS = "super-scrollbar-small";

  return function( outerElement, innerElement, boundsChangedCallback, media ) {
    var _outer = LangUtils.domFragment( SUPER_SCROLLBAR_LAYOUT, "#butter-super-scrollbar-outer-container" ),
        _inner = _outer.querySelector( "#butter-super-scrollbar-inner-container" ),
        _duration,
        _media = media,
        // viewport is the draggable, resizable, representation of the viewable track container.
        _viewPort = _inner.querySelector( "#butter-super-scrollbar-viewport" ),
        _leftHandle = _viewPort.querySelector( "#butter-super-scrollbar-handle-left" ),
        _rightHandle = _viewPort.querySelector( "#butter-super-scrollbar-handle-right" ),
        // visuals is the container for the visual representations for track events.
        _visuals = _inner.querySelector( "#butter-super-scrollbar-visuals" ),
        _scrubber = _inner.querySelector( "#buter-super-scrollbar-scrubber" ),
        _zoomSlider = _outer.querySelector( ".butter-super-scrollbar-zoom-slider" ),
        _zoomSliderContainer = _outer.querySelector( ".butter-super-scrollbar-zoom-slider-container" ),
        _zoomSliderHandle = _outer.querySelector( ".butter-super-scrollbar-zoom-handle" ),
        _butterEditorOffsetLeft,
        _html = document.querySelector( "html" ),
        _leftOffset = 0,
        _rightOffset = 0,
        _viewLeft = 0,
        _viewRight = 0,
        _trackEventVisuals = {},
        _boundsChangedCallback = function( right, width ) {
          if ( width !== -1 ) {
            _zoomSliderHandle.style.right = width * 100 + "%";
          }
          boundsChangedCallback( right, width );
        },
        _this = this;

    var checkMinSize, onViewMouseUp, onViewMouseDown, onViewMouseMove,
        onLeftMouseUp, onLeftMouseDown, onLeftMouseMove,
        onRightMouseUp, onRightMouseDown, onRightMouseMove,
        onElementMouseUp, onElementMouseDown, onElementMouseMove,
        updateView;

    checkMinSize = function() {
      if ( _viewPort.getBoundingClientRect().width < ARROW_MIN_WIDTH ) {
        _inner.classList.add( ARROW_MIN_WIDTH_CLASS );
      } else {
        _inner.classList.remove( ARROW_MIN_WIDTH_CLASS );
      }
    };

    _this.update = function() {
      checkMinSize();
    };

    onElementMouseUp = function( e ) {
      e.stopPropagation();
      window.removeEventListener( "mouseup", onElementMouseUp, false );
      window.removeEventListener( "mousemove", onElementMouseMove, false );
    };

    onViewMouseUp = function( e ) {
      e.stopPropagation();
      outerElement.addEventListener( "scroll", updateView );
      window.removeEventListener( "mouseup", onViewMouseUp, false );
      window.removeEventListener( "mousemove", onViewMouseMove, false );
    };

    onLeftMouseUp = function( e ) {
      e.stopPropagation();
      outerElement.addEventListener( "scroll", updateView );
      window.removeEventListener( "mouseup", onLeftMouseUp, false );
      window.removeEventListener( "mousemove", onLeftMouseMove, false );
    };

    onRightMouseUp = function( e ) {
      e.stopPropagation();
      outerElement.addEventListener( "scroll", updateView );
      window.removeEventListener( "mouseup", onRightMouseUp, false );
      window.removeEventListener( "mousemove", onRightMouseMove, false );
    };

    onElementMouseDown = function( e ) {
      // Stop text selection in chrome.
      e.preventDefault();
      e.stopPropagation();
      media.currentTime = ( (e.clientX + _butterEditorOffsetLeft) - _inner.offsetLeft ) / _inner.clientWidth * _duration;
      window.addEventListener( "mouseup", onElementMouseUp );
      window.addEventListener( "mousemove", onElementMouseMove );
    };

    onViewMouseDown = function( e ) {
      e.stopPropagation();
      // Stop text selection in chrome.
      e.preventDefault();
      outerElement.removeEventListener( "scroll", updateView, false );
      _leftOffset = (e.clientX + _butterEditorOffsetLeft) - _inner.offsetLeft - _viewPort.offsetLeft;
      _rightOffset = _viewPort.offsetWidth - _leftOffset;
      _media.pause();  // pause the media here to diffuse confusion with scrolling & playing
      window.addEventListener( "mouseup", onViewMouseUp );
      window.addEventListener( "mousemove", onViewMouseMove );
    };

    onLeftMouseDown = function( e ) {
      // Stop text selection in chrome.
      e.preventDefault();
      e.stopPropagation();
      _media.pause();  // pause the media here to diffuse confusion with scrolling & playing
      outerElement.removeEventListener( "scroll", updateView, false );
      window.addEventListener( "mouseup", onLeftMouseUp );
      window.addEventListener( "mousemove", onLeftMouseMove );
    };

    onRightMouseDown = function( e ) {
      // Stop text selection in chrome.
      e.preventDefault();
      e.stopPropagation();
      _media.pause();  // pause the media here to diffuse confusion with scrolling & playing
      outerElement.removeEventListener( "scroll", updateView, false );
      window.addEventListener( "mouseup", onRightMouseUp );
      window.addEventListener( "mousemove", onRightMouseMove );
    };

    onElementMouseMove = function( e ) {
      e.preventDefault();
      e.stopPropagation();
      media.currentTime = ( (e.clientX + _butterEditorOffsetLeft) -_inner.offsetLeft ) / _inner.clientWidth * _duration;
    };

    onViewMouseMove = function( e ) {
      e.preventDefault();
      e.stopPropagation();
      var thisLeft = ( (e.clientX + _butterEditorOffsetLeft) - _inner.offsetLeft - _leftOffset ) / _inner.clientWidth,
          thisRight = ( _inner.clientWidth - ( (e.clientX + _butterEditorOffsetLeft) - _inner.offsetLeft + _rightOffset ) ) / _inner.clientWidth;

      if ( thisLeft < 0 ) {
        thisLeft = 0;
        thisRight = ( _inner.clientWidth - _viewPort.offsetWidth ) / _inner.clientWidth;
      } else if ( thisRight < 0 ) {
        thisRight = 0;
        thisLeft = _viewPort.offsetLeft / _inner.clientWidth;
      }

      _viewLeft = thisLeft;
      _viewRight = thisRight;

      _viewPort.style.left = _viewLeft * 100 + "%";
      _viewPort.style.right = _viewRight * 100 + "%";
      _boundsChangedCallback( _viewLeft, -1 );
    };

    onLeftMouseMove = function( e ) {
      e.preventDefault();
      e.stopPropagation();

      // position is from the left of the container, to the left of the viewport.
      var position = (e.clientX + _butterEditorOffsetLeft) - _inner.offsetLeft,
          rightBound = ( _viewLeft * _inner.clientWidth ) + _viewPort.clientWidth;

      // make sure we never go out of bounds.
      if ( position < 0 ) {
        position = 0;
      }
      // make sure left never goes over right.
      if ( position + MIN_WIDTH > rightBound ) {
        position = rightBound - MIN_WIDTH;
      }
      _viewLeft = position / _inner.clientWidth;
      _viewPort.style.left = _viewLeft * 100 + "%";
      _boundsChangedCallback( _viewLeft, _viewPort.offsetWidth / _inner.clientWidth );
    };

    onRightMouseMove = function( e ) {
      e.preventDefault();
      e.stopPropagation();

      // position is from the right of the container, to the right of the viewport.
      var position = _inner.clientWidth - ( (e.clientX + _butterEditorOffsetLeft) - _inner.offsetLeft ),
          leftBound = ( _viewRight * _inner.clientWidth ) + _viewPort.clientWidth;

      // make sure we never go out of bounds.
      if ( position < 0 ) {
        position = 0;
      }
      // make sure right never goes over left.
      if ( position + MIN_WIDTH > leftBound ) {
        position = leftBound - MIN_WIDTH;
      }
      _viewRight = position / _inner.clientWidth;
      _viewPort.style.right = _viewRight * 100 + "%";
      _boundsChangedCallback( _viewLeft, _viewPort.offsetWidth / _inner.clientWidth );
    };

    updateView = function() {
      _viewLeft = outerElement.scrollLeft / innerElement.offsetWidth;
      _viewPort.style.left = _viewLeft * 100 + "%";
      _viewRight = 1 - ( outerElement.scrollLeft + outerElement.clientWidth ) / innerElement.offsetWidth;
      _viewPort.style.right = _viewRight * 100 + "%";
    };

    _inner.addEventListener( "mousedown", onElementMouseDown );
    outerElement.addEventListener( "scroll", updateView );
    _viewPort.addEventListener( "mousedown", onViewMouseDown );
    _leftHandle.addEventListener( "mousedown", onLeftMouseDown );
    _rightHandle.addEventListener( "mousedown", onRightMouseDown );

    /**
     * scaleViewPort
     *
     * Scales the viewport by a percentage value (0 - 1). The viewport grows or shrinks
     * to cover less or more area, and calls _boundsChangedCallback with the new (left, width) combination
     * as percentage values (0 - 1). This action has the consequence of zooming the
     * track container viewport in or out.
     *
     * A left and right position are calculated by moving them a set amount from their current
     * positions around the mid-point of the viewport. A new width value is also calculated
     * to provide _boundsChangedCallback with the necessary values: left & width.
     *
     * If the growth or shrink rate results in less than a pixel on both ends, nothing happens.
     *
     * @param {Number} scale: Percentage (0 - 1) to grow or shrink the viewport
     */
    function scaleViewPort( scale ) {

      var viewWidth = _viewPort.offsetWidth,
          viewLeft = _viewPort.offsetLeft,
          rectWidth = _inner.clientWidth,
          scrubberLeft = _scrubber.offsetLeft,
          oldScale = viewWidth / rectWidth,
          scaleDiff = oldScale - scale,
          halfScale = scaleDiff * 0.5,
          pixelGrowth = Math.abs( scaleDiff * rectWidth ),
          leftScale = halfScale,
          rightScale = halfScale,
          leftSide = scrubberLeft - viewLeft,
          rightSide = viewWidth - leftSide;

      // make sure our growth is at least a pixel on either side.
      if ( pixelGrowth < 1 ) {
        return;
      }

     // The scrubber is in the viewport
     if ( scrubberLeft >= viewLeft && scrubberLeft <= viewLeft + viewWidth ) {

       // If we're zooming in, we're already modifying the large side.
       // However, if we're zooming out, instead modify the small side
       if ( scaleDiff < 0 ) {
         rightSide = scrubberLeft - viewLeft;
         leftSide = viewWidth - rightSide;
       }

       // The scrubber is close to the middle, modify both sides smoothly.
       if ( Math.abs( leftSide - rightSide ) <= pixelGrowth  ) {
         leftScale = scaleDiff * ( leftSide / viewWidth );
         rightScale = scaleDiff * ( rightSide / viewWidth );
       } else {

         if ( leftSide > rightSide ) {
           leftScale += rightScale;
           rightScale = 0;
         } else if ( rightSide > leftSide ) {
           rightScale += leftScale;
           leftScale = 0;
         }
       }
     }

      _viewRight += rightScale;
      _viewLeft += leftScale;

      if ( _viewRight < 0 ) {
        _viewLeft += _viewRight;
        _viewRight = 0;
      }
      if ( _viewLeft < 0 ) {
        _viewRight += _viewLeft;
        _viewLeft = 0;
      }

      _viewPort.style.right = _viewRight * 100 + "%";
      _viewPort.style.left = _viewLeft * 100 + "%";
      _boundsChangedCallback( _viewLeft, scale );
    }

    function zoomSliderMouseUp() {
      outerElement.addEventListener( "scroll", updateView );
      window.removeEventListener( "mouseup", zoomSliderMouseUp, false );
      window.removeEventListener( "mousemove", zoomSliderMouseMove, false );
      _zoomSliderContainer.addEventListener( "mousedown", zoomSliderContainerMouseDown );
      _zoomSliderHandle.addEventListener( "mousedown", zoomSliderHanldeMouseDown );
    }

    function zoomSliderMouseMove( e ) {
      e.preventDefault();
      updateZoomSlider( e );
    }

    function updateZoomSlider( e ) {
      var position = _zoomSlider.offsetWidth - ( (e.clientX + _butterEditorOffsetLeft) - ( _zoomSliderContainer.offsetLeft + ( _zoomSliderHandle.offsetWidth / 2 ) ) ),
          scale;

      if ( position < 0 ) {
        position = 0;
      } else if ( position > _zoomSlider.offsetWidth ) {
        position = _zoomSlider.offsetWidth;
      }
      scale = position / _zoomSlider.offsetWidth;
      if ( scale * _inner.clientWidth < MIN_WIDTH ) {
        scale = MIN_WIDTH / _inner.clientWidth;
      }
      scaleViewPort( scale );
      _zoomSliderHandle.style.right = position / _zoomSlider.offsetWidth * 100 + "%";
    }

    function zoomSliderContainerMouseDown( e ) {
      // Stop text selection in chrome.
      e.preventDefault();
      outerElement.removeEventListener( "scroll", updateView, false );
      updateZoomSlider( e );
      _zoomSliderHandle.removeEventListener( "mousedown", zoomSliderHanldeMouseDown, false );
      _zoomSliderContainer.removeEventListener( "mousedown", zoomSliderContainerMouseDown, false );
      window.addEventListener( "mousemove", zoomSliderMouseMove );
      window.addEventListener( "mouseup", zoomSliderMouseUp );
    }

    function zoomSliderHanldeMouseDown( e ) {
      // Stop text selection in chrome.
      e.preventDefault();
      outerElement.removeEventListener( "scroll", updateView, false );
      _zoomSliderHandle.removeEventListener( "mousedown", zoomSliderHanldeMouseDown, false );
      _zoomSliderContainer.removeEventListener( "mousedown", zoomSliderContainerMouseDown, false );
      window.addEventListener( "mousemove", zoomSliderMouseMove );
      window.addEventListener( "mouseup", zoomSliderMouseUp );
    }

    _zoomSliderContainer.addEventListener( "mousedown", zoomSliderContainerMouseDown );
    _zoomSliderHandle.addEventListener( "mousedown", zoomSliderHanldeMouseDown );

    function updateTrackEventVisual( trackEvent, order ) {
      var trackEventVisual = document.createElement( "div" ),
          style = trackEvent.view.element.style;
      trackEventVisual.classList.add( "butter-super-scrollbar-trackevent" );
      _trackEventVisuals[ trackEvent.id ] = trackEventVisual;
      _visuals.appendChild( trackEventVisual );
      trackEventVisual.style.width = style.width;
      trackEventVisual.style.left = style.left;
      trackEventVisual.style.top = ( trackEventVisual.offsetHeight + TRACK_PADDING ) * order + "px";
    }

    _media.listen( "trackeventremoved", function( e ) {
      var trackEvent = _trackEventVisuals[ e.data.id ];
      if ( trackEvent ) {
        delete _trackEventVisuals[ e.data.id ];
        trackEvent.parentNode.removeChild( trackEvent );
      }
    });

    _media.listen( "trackeventupdated", function( e ) {
      var trackEvent = _trackEventVisuals[ e.data.id ],
          style = e.data.view.element.style;
      if ( trackEvent ) {
        trackEvent.style.width = style.width;
        trackEvent.style.left = style.left;
      }
    });

    _media.listen( "trackorderchanged", function( e ) {
      var data = e.data, i = 0,
          j, jl, trackEvent, track,
          il = data.length;
      for ( ; i < il; i++ ) {
        track = data[ i ];
        for ( j = 0, jl = track.trackEvents.length; j < jl; j++ ) {
          trackEvent = _trackEventVisuals[ track.trackEvents[ j ].id ];
          if ( trackEvent ) {
            trackEvent.style.top = ( trackEvent.offsetHeight + TRACK_PADDING ) * track.order + "px";
          }
        }
      }
    });

    _media.listen( "mediatimeupdate", function( e ) {
      _scrubber.style.left = e.data.currentTime / _duration * 100 + "%";
    });

    _this.initialize = function() {
      _butterEditorOffsetLeft = document.querySelector(".butter-editor-area").offsetLeft;
      _butterEditorOffsetLeft = _html.dir === "rtl" ? _butterEditorOffsetLeft : 0;
      var i, j, tl, tel,
          trackEvents,
          order,
          track,
          tracks = _media.tracks;
      for ( i = 0, tl = tracks.length; i < tl; i++ ) {
        track = tracks[ i ];
        trackEvents = track.trackEvents;
        order = track.order;
        for ( j = 0, tel = trackEvents.length; j < tel; j++ ) {
          updateTrackEventVisual( trackEvents[ j ], order );
        }
      }
      _media.listen( "trackeventadded", function( e ) {
        updateTrackEventVisual( e.data, e.target.order );
      });
    };

    _media.listen( "mediaready", function( e ) {
      _duration = e.target.duration;
      updateView();
      checkMinSize();
    });

    _this.resize = function() {
      _butterEditorOffsetLeft = document.querySelector(".butter-editor-area").offsetLeft;
      _butterEditorOffsetLeft = _html.dir === "rtl" ? _butterEditorOffsetLeft : 0;
      _this.update();
      _boundsChangedCallback( _viewPort.offsetLeft / _inner.clientWidth, _viewPort.offsetWidth / _inner.clientWidth );
    };

    Object.defineProperties( this, {
      element: {
        enumerable: true,
        get: function(){
          return _outer;
        }
      }
    });
  };
});

