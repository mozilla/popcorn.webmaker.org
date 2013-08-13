/*global EditorHelper*/

EditorHelper.addPlugin( "image", function( trackEvent ) {

  var _popcornOptions = trackEvent.popcornTrackEvent,
      _container = _popcornOptions._container,
      _clone,
      _draggable,
      _cloneContainer,
      _target = _popcornOptions._target;

  if ( window.jQuery ) {

    if ( _popcornOptions.src ) {
      window.EditorHelper.droppable( trackEvent, _container );
    }

    window.EditorHelper.selectable( trackEvent, _container );
    if ( trackEvent.popcornOptions.src ) {
      trackEvent.draggable = window.EditorHelper.draggable( trackEvent, _container, _target, {
        tooltip: "Double click to crop image"
      });
    } else {
      trackEvent.draggable = window.EditorHelper.draggable( trackEvent, _container, _target, {
        disableTooltip: true,
        editable: false
      });
    }

    function createHelper( suffix ) {
      var el = document.createElement( "div" );
      el.classList.add( "ui-resizable-handle" );
      el.classList.add( "ui-resizable-" + suffix );
      return el;
    }

    _container.appendChild( createHelper( "top" ) );
    _container.appendChild( createHelper( "bottom" ) );
    _container.appendChild( createHelper( "left" ) );
    _container.appendChild( createHelper( "right" ) );

    if ( !$( _container ).data( "resizable" ) ) {
      $( _container ).resizable({
        handles: "n,ne,e,se,s,sw,w,nw",
        containment: "parent",
        start: function() {
          var image = trackEvent.popcornTrackEvent.image;
          if ( image ) {
            image.style.top = image.offsetTop + "px";
            image.style.left = image.offsetLeft + "px";
            image.style.width = image.clientWidth + "px";
            image.style.height = image.clientHeight + "px";
            if ( _clone ) {
              _clone.style.width = _clone.clientWidth + "px";
              _clone.style.height = _clone.clientHeight + "px";
              _cloneContainer.style.width = _cloneContainer.clientWidth + "px";
              _cloneContainer.style.height = _cloneContainer.clientHeight + "px";
              _clone.style.top = _clone.offsetTop + "px";
              _clone.style.left = _clone.offsetLeft + "px";
              _cloneContainer.style.top = _cloneContainer.offsetTop + "px";
              _cloneContainer.style.left = _cloneContainer.offsetLeft + "px";
            }
          }
        },
        stop: function( event, ui ) {
          var image = trackEvent.popcornTrackEvent.image,
              width = _container.clientWidth,
              height = _container.clientHeight,
              left = ui.position.left,
              top = ui.position.top,
              imageHeight,
              imageWidth,
              imageTop,
              imageLeft;

          if ( image ) {
            if ( left < 0 ) {
              width += left;
              left = 0;
            }
            if ( top < 0 ) {
              height += top;
              top = 0;
            }

            if ( width + left > _target.clientWidth ) {
              width = _target.clientWidth - left;
            }
            if ( height + top > _target.clientHeight ) {
              height = _target.clientHeight - top;
            }

            width = width / _target.clientWidth * 100;
            height = height / _target.clientHeight * 100;
            left = left / _target.clientWidth * 100;
            top = top / _target.clientHeight * 100;

            imageWidth = image.offsetWidth / _container.clientWidth * 100;
            imageHeight = image.offsetHeight / _container.clientHeight * 100;
            imageTop = image.offsetTop / _container.clientHeight * 100;
            imageLeft = image.offsetLeft / _container.clientWidth * 100;

            _container.style.width = width + "%";
            _container.style.height = height + "%";
            _container.style.top = top + "%";
            _container.style.left = left + "%";

            image.style.width = imageWidth + "%";
            image.style.height = imageHeight + "%";
            image.style.top = imageTop + "%";
            image.style.left = imageLeft + "%";

            trackEvent.update({
              innerWidth: imageWidth,
              innerHeight: imageHeight,
              innerTop: imageTop,
              innerLeft: imageLeft,
              width: width,
              height: height,
              left: left,
              top: top
            });
          }
        }
      });
    }

    if ( trackEvent.popcornTrackEvent.image && trackEvent.popcornOptions.src ) {
      _cloneContainer = document.createElement( "div" );
      _cloneContainer.classList.add( "clone-container" );
      _clone = trackEvent.popcornTrackEvent.image.cloneNode();
      _clone.classList.add( "image-crop-clone" );
      _cloneContainer.appendChild( _clone );
      _container.appendChild( _cloneContainer );

      _clone.appendChild( createHelper( "top" ) );
      _clone.appendChild( createHelper( "bottom" ) );
      _clone.appendChild( createHelper( "left" ) );
      _clone.appendChild( createHelper( "right" ) );

      $( _clone ).draggable({
        drag: function( event, ui ) {
          trackEvent.popcornTrackEvent.image.style.top = ui.position.top + "px";
          trackEvent.popcornTrackEvent.image.style.left = ui.position.left + "px";
        },
        stop: function( event, ui ) {
          var top = ui.position.top / _container.clientHeight * 100,
              left = ui.position.left / _container.clientWidth * 100;

          trackEvent.update({
            innerTop: top,
            innerLeft: left
          });
          trackEvent.draggable.edit();
        }
      });

      $( _clone ).resizable({
        handles: "n, ne, e, se, s, sw, w, nw",
        resize: function( event, ui ) {
          trackEvent.popcornTrackEvent.image.style.height = _clone.clientHeight + "px";
          trackEvent.popcornTrackEvent.image.style.width = _clone.clientWidth + "px";
          _clone.style.height = _clone.clientHeight + "px";
          _clone.style.width = _clone.clientWidth + "px";
          trackEvent.popcornTrackEvent.image.style.top = ui.position.top + "px";
          trackEvent.popcornTrackEvent.image.style.left = ui.position.left + "px";
          _clone.style.top = ui.position.top + "px";
          _clone.style.left = ui.position.left + "px";
        },
        stop: function( event, ui ) {
          trackEvent.update({
            innerHeight: _clone.offsetHeight / _container.clientHeight * 100,
            innerWidth: _clone.offsetWidth / _container.clientWidth * 100,
            innerTop: ui.position.top / _container.clientHeight * 100,
            innerLeft: ui.position.left / _container.clientWidth * 100
          });
          trackEvent.draggable.edit();
        }
      });
    }
  }
});
