define( [ "util/xhr", "util/keys", "localized", "jquery" ], function( XHR, KEYS, Localized, $ ) {

  var __plugins = {};

  function EditorHelper( butter ) {
    var _this = this;

    function _updateFunction( e ) {

      var trackEvent = e.target;

      if ( trackEvent.popcornTrackEvent && __plugins[ trackEvent.type ] ) {
        __plugins[ trackEvent.type ].call( _this, trackEvent, butter.currentMedia.popcorn.popcorn, $ );
      }
    } //updateFunction

    butter.listen( "trackeventupdated", _updateFunction );

    // This fix is to ensure content-editable still updates correctly, and deals with ie9 not reading document.activeElement properly
    function blurActiveEl() {
     if ( document.activeElement && document.activeElement.blur ) {
        document.activeElement.blur();
      }
    }

    function calculateFinalPositions( event, ui, trackEvent, targetContainer, container, options ) {
      var target = targetContainer.getBoundingClientRect(),
          height = container.clientHeight,
          width = container.clientWidth,
          top = ui.position.top,
          left = ui.position.left,
          targetHeight = target.height,
          targetWidth = target.width,
          minHeightPix = targetHeight * ( ( options.minHeight || 0 ) / 100 ),
          minWidthPix = targetWidth * ( ( options.minWidth || 0 ) / 100 );

      top = Math.max( 0, top );
      left = Math.max( 0, left );
      height = Math.max( minHeightPix, height );
      width = Math.max( minWidthPix, width );

      if ( ( container.offsetTop + height ) > targetHeight ) {
        top = targetHeight - height;
      }

      if ( ( container.offsetLeft + width ) > targetWidth ) {
        left = targetWidth - width;
      }

      height = ( height / targetHeight ) * 100;
      width = ( width / targetWidth ) * 100;

      if ( options.end ) {
        options.end();
      }

      // Enforce container size here, instead of relying on the update.
      container.style.width = width + "%";
      container.style.height = height + "%";

      blurActiveEl();

      trackEvent.update({
        height: height,
        width: width,
        top: ( top / targetHeight ) * 100,
        left: ( left / targetWidth ) * 100
      });
    }

    _this.selectable = function( trackEvent, dragContainer ) {

      var highlight = function() {

        var media,
            manifestOptions,
            track = trackEvent.track;

        if ( !track || !track._media ) {
          return;
        }

        if ( !trackEvent.manifest || !trackEvent.manifest.options ) {
          return;
        }

        media = track._media;
        manifestOptions = trackEvent.manifest.options;

        if ( "zindex" in manifestOptions ) {
          var newZIndex = media.maxPluginZIndex - track.order;
          if ( trackEvent.selected ) {
            dragContainer.classList.add( "track-event-selected" );
            dragContainer.style.zIndex = newZIndex + media.maxPluginZIndex;
          } else {
            dragContainer.style.zIndex = newZIndex;
            dragContainer.classList.remove( "track-event-selected" );
          }
        }
      };

      var onSelect = function( e ) {
        e.stopPropagation();

        if ( !e.shiftKey ) {
          butter.deselectAllTrackEvents();
        }
        trackEvent.selected = true;

        // If the current open editor isn't a trackevent editor,
        // open an editor for this event
        if ( !butter.editor.currentEditor.getTrackEvent ) {
          butter.editor.editTrackEvent( trackEvent );
        }
      };

      var update = function() {
        dragContainer.removeEventListener( "mousedown", onSelect, false );
        trackEvent.unlisten( "trackeventselected", highlight );
        trackEvent.unlisten( "trackeventdeselected", highlight );
        trackEvent.unlisten( "trackeventupdated", update );
      };

      highlight();

      dragContainer.addEventListener( "mousedown", onSelect );
      trackEvent.listen( "trackeventselected", highlight );
      trackEvent.listen( "trackeventdeselected", highlight );
      trackEvent.listen( "trackeventupdated", update );
    };

    /**
     * Member: draggable
     *
     * Makes a container draggable using jQueryUI
     *
     * @param {TrackEvent} trackEvent: The trackEvent to update when position changes
     * @param {DOMElement} dragContainer: the container which to apply draggable to
     * @param {media} The current media's target element in Butter ( parent container )
     * @param {Object} extra options to apply to the draggable call
     *                 Options are:
     *                    {DOMElement} handle: Restrict drag start event to this element
     *                    {Function} start: Function to execute on drag start event
     *                    {Function} end: Function to execute on drag end event
     */
    _this.draggable = function( trackEvent, dragContainer, targetContainer, options ) {
      if ( $( dragContainer ).data( "draggable" ) ) {
        return;
      }

      var iframeCover = targetContainer.querySelector( ".butter-iframe-fix" );

      options = options || {};

      var el = document.createElement( "div" ),
          onBlur,
          onMouseDown,
          onMouseUp,
          onDblClick,
          tooltipElement;

      if ( !options.disableTooltip ) {
        tooltipElement = document.createElement( "div" );
        tooltipElement.innerHTML = options.tooltip || Localized.get( "Double click to edit" );
        tooltipElement.classList.add( "butter-tooltip" );
        tooltipElement.classList.add( "butter-tooltip-middle" );
        dragContainer.appendChild( tooltipElement );
        tooltipElement.style.marginTop = "-" + ( tooltipElement.offsetHeight / 2 ) + "px";
      }

      onBlur = function() {
        if ( tooltipElement ) {
          tooltipElement.classList.remove( "tooltip-off" );
        }
        el.addEventListener( "dblclick", onDblClick );
        document.removeEventListener( "mousedown", onBlur, false );
        el.style.display = "";
        dragContainer.classList.remove( "track-event-editing" );
      };
      onDblClick = function() {
        if ( tooltipElement ) {
          tooltipElement.classList.add( "tooltip-off" );
        }
        el.removeEventListener( "dblclick", onDblClick, false );
        document.addEventListener( "mousedown", onBlur );
        el.style.display = "none";
        dragContainer.classList.add( "track-event-editing" );
      };
      el.classList.add( "ui-draggable-handle" );
      if ( options.editable !== false ) {
        el.addEventListener( "dblclick", onDblClick );
      }

      dragContainer.appendChild( el );

      onMouseDown = function() {
        document.addEventListener( "mouseup", onMouseUp );
        el.removeEventListener( "mouseup", onMouseDown, false );
        dragContainer.style.overflow = "hidden";
      };

      onMouseUp = function() {
        document.removeEventListener( "mouseup", onMouseUp, false );
        el.addEventListener( "mouseup", onMouseDown );
        dragContainer.style.overflow = "";
      };

      // This ensures the height of the element is not increased
      el.addEventListener( "mousedown", onMouseDown );

      $( dragContainer ).draggable({
        handle: ".ui-draggable-handle",
        containment: "parent",
        start: function() {
          iframeCover.style.display = "block";

          // Open the editor
          butter.editor.editTrackEvent( trackEvent );

          if ( options.start ) {
            options.start();
          }
        },
        stop: function( event, ui ) {
          iframeCover.style.display = "none";

          calculateFinalPositions( event, ui, trackEvent, targetContainer, dragContainer, options );
        }
      });

      return {
        edit: onDblClick
      };
    };

    /**
     * Member: resizable
     *
     * Makes a container resizable using jQueryUI
     *
     * @param {TrackEvent} trackEvent: The trackEvent to update when size changes
     * @param {DOMElement} resizeContainer: the container which to apply resizable to
     * @param {media} The current media's target element in Butter ( parent container )
     * @param {Object} extra options to apply to the resizeable call
     *                 Options are:
     *                    {String} handlePositions: describes where to position resize handles ( i.e. "n,s,e,w" )
     *                              - Recommended that this option is specified due to a bug in z-indexing with
     *                                jQueryUI Resizable.
     *                    {Function} start: Function to execute on resize start event
     *                    {Function} end: Function to execute on resize end event
     *                    {Number} minWidth: Minimum width that the resizeContainer should be
     *                    {Number} minHeight: Minimum height that the resizeContainer should be
     */
    _this.resizable = function( trackEvent, resizeContainer, targetContainer, options ) {
      if ( $( resizeContainer ).data( "resizable" ) ) {
        return;
      }

      var iframeCover = targetContainer.querySelector( ".butter-iframe-fix" ),
          handlePositions = options.handlePositions;

      function createHelper( suffix ) {
        var el = document.createElement( "div" );
        el.classList.add( "ui-resizable-handle" );
        el.classList.add( "ui-resizable-" + suffix );
        return el;
      }

      if ( handlePositions.search( /\bn\b/ ) > -1 ) {
        resizeContainer.appendChild( createHelper( "top" ) );
      }
      if ( handlePositions.search( /\bs\b/ ) > -1 ) {
        resizeContainer.appendChild( createHelper( "bottom" ) );
      }
      if ( handlePositions.search( /\bw\b/ ) > -1 ) {
        resizeContainer.appendChild( createHelper( "left" ) );
      }
      if ( handlePositions.search( /\be\b/ ) > -1 ) {
        resizeContainer.appendChild( createHelper( "right" ) );
      }

      options = options || {};

      $( resizeContainer ).resizable({
        handles: options.handlePositions,
        start: function() {
          iframeCover.style.display = "block";

          // Open the editor
          butter.editor.editTrackEvent( trackEvent );

          if ( options.start ) {
            options.start();
          }
        },
        containment: "parent",
        stop: function( event, ui ) {
          iframeCover.style.display = "none";

          calculateFinalPositions( event, ui, trackEvent, targetContainer, resizeContainer, options );
        }
      });
    };

    /**
     * Member: contentEditable
     *
     * Makes a container's content editable using contenteditable
     *
     * @param {TrackEvent} trackEvent: The trackEvent to update when content changes
     * @param {DOMElement} contentContainer: the container which to listen for changes and set as editable
     */
    _this.contentEditable = function( trackEvent, container, contentContainer ) {
      if ( !contentContainer ) {
        return;
      }
      var textArea = document.createElement( "textArea" );
      textArea.rows = 1;
      container.classList.add( "content-editable" );
      contentContainer.appendChild( textArea );

      container.addEventListener( "dblclick", function() {
        textArea.value = trackEvent.popcornOptions.text;
        textArea.style.height = "auto";
        textArea.style.height = textArea.scrollHeight + "px";
        textArea.select();
      } );

      textArea.addEventListener( "input", function() {
        textArea.style.height = "auto";
        textArea.style.height = textArea.scrollHeight + "px";
      } );

      textArea.addEventListener( "keydown", function( e ) {
        if ( e.keyCode === KEYS.ENTER && !e.shiftKey ) {
          textArea.blur();
        }
      } );

      textArea.addEventListener( "change", function() {
        trackEvent.update({
          text: textArea.value
        });
      } );
    };

    function sendFile( file, trackEvent ) {
      var fd = new FormData();
      fd.append( "image", file );

      XHR.put( "/api/image", fd, function( data ) {
        if ( !data.error && data.url ) {
          if ( trackEvent ) {
            trackEvent.update( { src: data.url, title: file.name } );
          }

          butter.dispatch( "droppable-succeeded", {
            url: data.url,
            trackEvent: trackEvent
          });
        } else {
          butter.dispatch( "droppable-upload-failed", data.error );
        }
      });

      if ( trackEvent ) {
        butter.editor.editTrackEvent( trackEvent );
      }
    }

    /**
     * Member: uploader
     *
     * Make a container a file uploader button
     *
     * @param {TrackEvent} trackEvent: The trackEvent to update when content changes
     * @param {DOMElement} dropContainer: The container that listens for the click
     */

    _this.uploader = function( trackEvent, dropContainer ) {
      var fileInput = document.createElement( "input" );
      fileInput.type = "file";
      fileInput.accept = "image/*";

      dropContainer.addEventListener( "click", function() {
        fileInput.click();
      } );

      fileInput.addEventListener( "change", function() {
        sendFile( fileInput.files[ 0 ], trackEvent );
      } );
    };

    /**
     * Member: droppable
     *
     * Make a container listen for drop events for loading images from a local machine
     *
     * @param {TrackEvent} trackEvent: The trackEvent to update when content changes
     * @param {DOMElement} dropContainer: The container that listens for the drop events
     */

    _this.droppable = function( trackEvent, dropContainer ) {

      dropContainer.addEventListener( "dragover", function( e ) {
        e.preventDefault();
        dropContainer.classList.add( "butter-dragover" );
      } );

      dropContainer.addEventListener( "dragleave", function( e ) {
        e.preventDefault();
        dropContainer.classList.remove( "butter-dragover" );
      } );

      dropContainer.addEventListener( "mousedown", function( e ) {
        // Prevent being able to drag the images inside and re drop them
        e.preventDefault();
      } );

      dropContainer.addEventListener( "drop", function( e ) {

        e.preventDefault();
        e.stopPropagation();

        dropContainer.classList.remove( "butter-dragover" );

        if ( !e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files[ 0 ] ) {
          butter.dispatch( "droppable-unsupported" );
          return;
        }

        sendFile( e.dataTransfer.files[ 0 ], trackEvent );
      } );
    };

    _this.addPlugin = function( plugin, callback ) {
      __plugins[ plugin ] = callback;
    };

  }

  return EditorHelper;

}); //define

