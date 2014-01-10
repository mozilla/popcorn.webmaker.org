/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "dialog/dialog", "util/dragndrop", "util/lang", "util/keys", "text!layouts/track-handle.html" ],
  function( Dialog, DragNDrop, LangUtils, KeysUtils, TRACK_HANDLE_LAYOUT ) {

  return function( butter, media, mediaInstanceRootElement, tracksContainer ) {

    var _media = media,
        _container = mediaInstanceRootElement.querySelector( ".track-handle-container" ),
        _listElement = _container.querySelector( ".handle-list" ),
        _tracks = {},
        _menus = [],
        _this = this,
        _draggingHandleIndex,
        _draggingHandleId;

    function sortHandles(){
      if ( butter.currentMedia ) {
        var tracks = butter.currentMedia.orderedTracks,
            trackHandle;
        for ( var i = 0, l = tracks.length; i < l; ++i ) {
          trackHandle = _tracks[ tracks[ i ].id ];
          // It *is* possible for there to be more tracks than there are track handles while importing, so
          // do a check here to see if a handle exists first before ordering.
          if ( trackHandle ) {
            _listElement.appendChild( trackHandle.element );
          }
        }
      }
    }

    DragNDrop.listen( "sortstarted", function onSortStarted( e ) {
      var originalEvent = e.data,
          orderedTracks = butter.currentMedia.orderedTracks,
          id = originalEvent.target.getAttribute( "data-butter-track-id" );

      for ( var i = 0; i < orderedTracks.length; i++ ) {
        if ( orderedTracks[ i ].id === id ) {
          _draggingHandleIndex = i;
          _draggingHandleId = id;
        }
      }

    });

    var _sortable = DragNDrop.sortable( _listElement, {
      change: function( elements ) {
        var newIndex, id,
            orderedTracks = butter.currentMedia.orderedTracks,
            track,
            indexCache;

        for( var i = 0, l = elements.length; i < l; ++i ) {
          id = elements[ i ].getAttribute( "data-butter-track-id" );
          if ( id === _draggingHandleId ) {
            newIndex = i;
            break;
          }
        }

        track = orderedTracks[ _draggingHandleIndex ];
        orderedTracks.splice( _draggingHandleIndex, 1 );
        orderedTracks.splice( newIndex, 0, track );

        indexCache = newIndex;
        if ( newIndex < _draggingHandleIndex ) {
          var temp = _draggingHandleIndex;

          _draggingHandleIndex = newIndex;
          newIndex = temp;
        }

        butter.currentMedia.sortTracks( _draggingHandleIndex, newIndex );

        // We now need to set the values of "current index" to where we replaced since sortstarted
        // won't fire again until the mouse is let go and then an element is selected again.
        _draggingHandleIndex = indexCache;
      }
    });

    _media.listen( "trackorderchanged", function( e ) {
      var tracks = e.data;
      for ( var i = 0, l = tracks.length; i < l; i++ ) {
        var track = tracks[ i ],
            element = _tracks[ track.id ].element;
        element.querySelector( "span.title" ).textContent = track.name;
        element.querySelector( "span.title" ).title = track.name;
      }
    });

    function onTrackAdded( e ) {
      var track = e.data,
          trackId = track.id,
          trackDiv = LangUtils.domFragment( TRACK_HANDLE_LAYOUT, ".track-handle" ),
          menuDiv = trackDiv.querySelector( ".menu" ),
          titleElement = trackDiv.querySelector( ".title" ),
          contentContainerElement = trackDiv.querySelector( ".content-container" ),
          titleInputElement = trackDiv.querySelector( ".title-input" ),
          editIconElement = trackDiv.querySelector( ".icon-pencil" ),
          deleteButton = menuDiv.querySelector( ".delete" );

      function startTitleEdit() {
        titleInputElement.value = track.name;
        contentContainerElement.classList.add( "butter-hidden" );
        titleInputElement.classList.remove( "butter-hidden" );
        titleInputElement.focus();

        titleElement.removeEventListener( "click", startTitleEdit, false );
        editIconElement.removeEventListener( "click", startTitleEdit, false );

        titleInputElement.addEventListener( "change", finishTitleEdit, false );
        titleInputElement.addEventListener( "blur", finishTitleEdit, false );
        titleInputElement.select();
      }

      function onKeypress( e ) {
        if ( e.keyCode === KeysUtils.ENTER ) {
          titleInputElement.blur();
        }
      }

      titleInputElement.addEventListener( "keypress", onKeypress, false );

      track.listen( "tracknamechanged", function() {
        titleElement.textContent = track.name;
        titleElement.title = track.name;
      });

      function finishTitleEdit() {
        track.name = titleInputElement.value;
        contentContainerElement.classList.remove( "butter-hidden" );
        titleInputElement.classList.add( "butter-hidden" );

        titleElement.addEventListener( "click", startTitleEdit, false );
        editIconElement.addEventListener( "click", startTitleEdit, false );
        titleInputElement.removeEventListener( "change", finishTitleEdit, false );
        titleInputElement.removeEventListener( "blur", finishTitleEdit, false );
        titleInputElement.value = "";
      }

      titleInputElement.value = "";
      titleElement.addEventListener( "click", startTitleEdit, false );
      editIconElement.addEventListener( "click", startTitleEdit, false );

      deleteButton.addEventListener( "click", function() {
        var dialog = Dialog.spawn( "delete-track", {
          data: track.name,
          events: {
            submit: function( e ){
              if ( e.data ) {
                media.removeTrack( track );
              } //if
              dialog.close();
            },
            cancel: function(){
              dialog.close();
            }
          }
        });
        dialog.open();
      }, false );

      trackDiv.addEventListener( "dblclick", function(){
        var dialog = Dialog.spawn( "track-data", {
          data: track,
          events: {
            submit: function( e ) {
              // wrap in a try catch so we know right away about any malformed JSON
              try {
                var trackData = JSON.parse( e.data ),
                    trackEvents = track.trackEvents,
                    trackDataEvents = trackData.trackEvents,
                    dontRemove = {},
                    toAdd = [],
                    i,
                    l;

                trackDiv.childNodes[ 0 ].textContent = track.name = trackData.name;
                trackDiv.childNodes[ 0 ].title = track.name = trackData.name;
                // update every trackevent with it's new data
                for ( i = 0, l = trackDataEvents.length; i < l; i++ ) {
                  var teData = trackDataEvents[ i ],
                      te = track.getTrackEventById( teData.id );

                  // check to see if the current track event exists already
                  if ( te ) {
                    te.update( teData.popcornOptions );
                    /* remove it from our reference to the array of track events so we know
                     * which ones to remove later
                     */
                    dontRemove[ teData.id ] = teData;
                  // if we couldn't find the track event, it must be a new one
                  } else {
                    toAdd.push( { type: teData.type, popcornOptions: teData.popcornOptions } );
                  }
                }

                // remove all trackEvents that wern't updated
                for ( i = trackEvents.length, l = 0; i >= l; i-- ) {
                  if ( trackEvents[ i ] && !dontRemove[ trackEvents[ i ].id ] ) {
                    track.removeTrackEvent( trackEvents[ i ] );
                  }
                }

                // add all the trackEvents that didn't exist so far
                for ( i = 0, l = toAdd.length; i < l; i++ ) {
                  track.addTrackEvent( toAdd[ i ] );
                }
                // let the dialog know things went well
                dialog.send( "track-updated" );
              } catch ( error ) {
                // inform the dialog about the issue
                dialog.send( "error" );
              }
            }
          }
        });
        dialog.open();
      }, false );

      _menus.push( menuDiv );

      trackDiv.setAttribute( "data-butter-track-id", trackId );
      menuDiv.setAttribute( "data-butter-track-id", trackId );
      menuDiv.querySelector( ".delete" ).setAttribute( "data-butter-track-id", trackId );
      trackDiv.querySelector( "span.track-handle-icon" ).setAttribute( "data-butter-track-id", trackId );
      trackDiv.querySelector( "span.title" ).setAttribute( "data-butter-track-id", trackId );
      trackDiv.querySelector( "span.title" ).appendChild( document.createTextNode( track.name ) );

      _sortable.addItem( trackId, {
        item: trackDiv,
        handle: trackDiv.querySelector( "span.track-handle-icon" )
      });

      _listElement.appendChild( trackDiv );

      _tracks[ trackId ] = {
        id: trackId,
        track: track,
        element: trackDiv,
        menu: menuDiv
      };

      sortHandles();
    }

    var existingTracks = _media.tracks;
    for( var i=0; i<existingTracks.length; ++i ){
      onTrackAdded({
        data: existingTracks[ i ]
      });
    }

    _media.listen( "trackadded", onTrackAdded );

    _media.listen( "trackremoved", function( e ){
      var trackId = e.data.id;
      _listElement.removeChild( _tracks[ trackId ].element );
      _sortable.removeItem( trackId );
      _menus.splice( _menus.indexOf( _tracks[ trackId ].menu ), 1 );
      delete _tracks[ trackId ];
    });

    tracksContainer.element.addEventListener( "scroll", function(){
      _container.scrollTop = tracksContainer.element.scrollTop;
    }, false );

    _container.addEventListener( "mousewheel", function( e ){
      if( e.wheelDeltaY ){
        tracksContainer.element.scrollTop -= e.wheelDeltaY;
        e.preventDefault();
      }
    }, false );

    // For Firefox
    _container.addEventListener( "DOMMouseScroll", function( e ){
      if( e.axis === e.VERTICAL_AXIS && !e.shiftKey ){
        tracksContainer.element.scrollTop += e.detail * 2;
        e.preventDefault();
      }
    }, false );

    this.update = function(){
      _container.scrollTop = tracksContainer.element.scrollTop;
    };

    _this.update();

    Object.defineProperties( this, {
      element: {
        enumerable: true,
        get: function(){
          return _container;
        }
      }
    });

  }; //TrackHandles

});
