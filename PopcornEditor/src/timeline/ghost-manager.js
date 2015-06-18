/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "./ghost-track" ], function( GhostTrack ) {

  function GhostManager( media, tracksContainerElement ) {

    var _media = media,
        _tracksContainerElement = tracksContainerElement;

    function createGhostTrackForNextTrack( track, nextTrack ) {
      var ghostTrack;
      if ( !track.ghost ) {
        ghostTrack = track.ghost = new GhostTrack( track, nextTrack );
        if ( !nextTrack ) {
          _tracksContainerElement.appendChild( ghostTrack.view.element );
        }
        else {
          _tracksContainerElement.insertBefore( ghostTrack.view.element, nextTrack.view.element );
        }
      }
      return track.ghost;
    }

    function cleanUpGhostTracks() {
      var tracks = _media.tracks;
      for ( var i = 0, l = tracks.length; i < l; ++i ) {
        cleanUpGhostTrack( tracks[ i ] );
      }
    }

    function cleanUpGhostTrack( track ) {
      var ghostTrack = track.ghost;
      if ( ghostTrack && ghostTrack.numGhostTrackEvents === 0 ) {
        _tracksContainerElement.removeChild( ghostTrack.view.element );
        track.ghost = null;
      }
    }

    function cleanUpGhostTrackEvent( trackEventView ) {
      var ghostTrack = trackEventView.ghost.track;
      trackEventView.cleanupGhost();
      if ( ghostTrack.lastTrack ) {
        cleanUpGhostTrack( ghostTrack.lastTrack );
      }
    }

    this.trackEventDragged = function( trackEventView, trackView ) {
      var track, nextTrack,
          ghostLeft, ghostWidth,
          ghostLeftAbsolute,
          overlappingTrackEvent,
          overlappingDirection;
      if ( trackView ) {
        track = trackView.track;

        overlappingTrackEvent = trackView.findOverlappingTrackEvent( trackEventView );
        if ( overlappingTrackEvent ) {

          overlappingDirection = trackView.findOverlappingDirection( trackEventView, overlappingTrackEvent.view );
          if ( overlappingDirection === "top" || overlappingDirection === "bottom" ) {
            nextTrack = _media.getNextTrack( track );
            if ( !nextTrack || nextTrack.view.findOverlappingTrackEvent( trackEventView ) ) {
              nextTrack = createGhostTrackForNextTrack( track, nextTrack );
            }
            if ( trackEventView.ghost && trackEventView.ghost.track !== nextTrack ) {
              cleanUpGhostTrackEvent( trackEventView );
            }
            if ( !trackEventView.ghost ) {
              nextTrack.view.addTrackEventGhost( trackEventView.createGhost() );
            }
            trackEventView.updateGhost();
          } else {
            if ( trackEventView.ghost && trackEventView.ghost.track !== track ) {
              cleanUpGhostTrackEvent( trackEventView );
            }
            if ( !trackEventView.ghost ) {
              if ( overlappingDirection === "left" ) {
                ghostLeft = overlappingTrackEvent.view.element.offsetLeft - trackEventView.element.offsetWidth;
                ghostLeftAbsolute = overlappingTrackEvent.view.element.getBoundingClientRect().left - trackEventView.element.offsetWidth;
              } else if ( overlappingDirection === "right" ) {
                ghostLeft = overlappingTrackEvent.view.element.offsetLeft + overlappingTrackEvent.view.element.offsetWidth;
                ghostLeftAbsolute = overlappingTrackEvent.view.element.getBoundingClientRect().left + overlappingTrackEvent.view.element.offsetWidth;
              }
              ghostWidth = trackEventView.element.offsetWidth;
              if ( ghostLeft < 0 ||
                   ( ghostLeft + ghostWidth ) > _tracksContainerElement.offsetWidth ||
                   track.view.findOverlappingTrackEvent( trackEventView, ghostLeftAbsolute, ghostWidth ) ) {
                nextTrack = _media.getNextTrack( track );
                if ( !nextTrack || nextTrack.view.findOverlappingTrackEvent( trackEventView ) ) {
                  nextTrack = createGhostTrackForNextTrack( track, nextTrack );
                }
                if ( trackEventView.ghost && trackEventView.ghost.track !== nextTrack ) {
                  cleanUpGhostTrackEvent( trackEventView );
                }
                if ( !trackEventView.ghost ) {
                  nextTrack.view.addTrackEventGhost( trackEventView.createGhost() );
                }
                trackEventView.updateGhost();
              } else {
                track.view.addTrackEventGhost( trackEventView.createGhost( ghostLeft ) );
              }
            }
          }
        }
        else if ( trackEventView.ghost ) {
          track = trackEventView.ghost.track;
          trackEventView.cleanupGhost();
          cleanUpGhostTracks();
        }
      }
      else if ( trackEventView.ghost ) {
        track = trackEventView.ghost.track;
        trackEventView.cleanupGhost();
        cleanUpGhostTracks();
      }
    };

    this.removeGhostsAfterDrop = function( trackEvent ) {
      var currentTrack = trackEvent.track,
          ghost = trackEvent.view.ghost;

      if ( ghost && ghost.track ) {
        trackEvent.view.cleanupGhost( currentTrack );
        cleanUpGhostTracks();
      }
    };

  }

  return GhostManager;

});
