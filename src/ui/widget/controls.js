/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/lang", "util/time", "analytics", "text!layouts/controls.html" ],
  function( LangUtils, Time, analytics, CONTROLS_LAYOUT ) {

  function Controls( container, options ) {

    var LEFT_MOUSE_BUTTON = 0,
        SPACE_BAR = 32;

    var _controls = LangUtils.domFragment( CONTROLS_LAYOUT ).querySelector( "#butter-controls" ),
        _container = typeof container === "string" ? document.getElementById( container ) : container, p,
        // variables
        muteButton, playButton, currentTimeDialog, fullscreenButton,
        durationDialog, timebar, timeTooltip, progressBar, bigPlayButton,
        scrubber, seeking, playStateCache, active, thumbnailContainer, videoContainer,
        volume, volumeProgressBar, volumeScrubber, position, controlsContainer,
        controlsShare, controlsRemix, controlsFullscreen, controlsLogo, attributionContainer,
        // functions
        bigPlayClicked, activate, deactivate, volumechange, onSequencesReady,
        togglePlay, timeMouseMove, timeMouseDown, timeMouseUp, timeMouseOver, timeMouseOut,
        tooltipMouseMove, onPause, onPlay, volumeMouseMove, volumeMouseUp,
        volumeMouseDown, durationchange, mutechange,
        scheduleTooltip, cancelTooltip, removeTooltip, addTooltip;

    // Deal with callbacks for various buttons in controls
    options = options || {};
    var nop = function(){},
        onShareClick = options.onShareClick || nop,
        onRemixClick = options.onRemixClick || nop,
        onFullscreenClick = options.onFullscreenClick || nop,
        onLogoClick = options.onLogoClick || nop,
        init = options.init || nop;

    bigPlayButton = document.getElementById( "controls-big-play-button" );
    bigPlayButton.classList.remove( "hide-button" );
    controlsContainer = document.querySelector( ".controls" );
    thumbnailContainer = document.querySelector( "#thumbnail-container" );
    attributionContainer = document.querySelector( "#attribution-info" );
    videoContainer = document.getElementById( "container" );

    bigPlayClicked = function() {
      p.media.removeEventListener( "play", bigPlayClicked, false );
      bigPlayButton.removeEventListener( "click", bigPlayClicked, false );
      bigPlayButton.classList.add( "hide-button" );
      p.media.addEventListener( "mouseover", activate );

      if ( thumbnailContainer ) {
        thumbnailContainer.classList.add( "hidden" );
      }

      if ( p.paused() ) {
        p.play();
        playButton.classList.remove( "controls-paused" );
        playButton.classList.add( "controls-playing" );
      }
    };

    function onInit() {

      if ( thumbnailContainer ) {
        thumbnailContainer.removeEventListener( "click", onInit, false );
        thumbnailContainer.classList.remove( "preload" );
      }

      bigPlayButton.removeEventListener( "click", onInit, false );
      controlsContainer.classList.remove( "controls-hide" );
      if ( attributionContainer ) {
        attributionContainer.classList.add( "show" );
      }
      function setPopcorn( popcorn ) {
        p = popcorn;
      }
      init( setPopcorn );

      p.controls( false );
      p.media.addEventListener( "play", bigPlayClicked );
      if ( p.readyState() >= 1 ) {

        ready();
      } else {

        p.media.addEventListener( "loadedmetadata", ready );
      }
    }

    var ready = function() {
      p.media.removeEventListener( "loadedmetadata", ready, false );

      muteButton = document.getElementById( "controls-mute" );
      playButton = document.getElementById( "controls-play" );
      currentTimeDialog = document.getElementById( "controls-currenttime" );
      durationDialog = document.getElementById( "controls-duration" );
      timebar = document.getElementById( "controls-timebar" );
      timeTooltip = _container.querySelector( ".controls-time-tooltip" );
      progressBar = document.getElementById( "controls-progressbar" );
      scrubber = document.getElementById( "controls-scrubber" );
      volume = document.getElementById( "controls-volume" );
      fullscreenButton = document.getElementById( "controls-fullscreen" );
      volumeProgressBar = document.getElementById( "controls-volume-progressbar" );
      volumeScrubber = document.getElementById( "controls-volume-scrubber" );
      controlsShare = document.getElementById( "controls-share" );
      controlsRemix = document.getElementById( "controls-remix" );
      controlsFullscreen = document.getElementById( "controls-fullscreen" );
      controlsLogo = document.getElementById( "controls-logo" );
      seeking = false;
      playStateCache = false;
      active = false;

      // Wire custom callbacks for right-hand buttons
      controlsShare.addEventListener( "click", onShareClick );
      controlsRemix.addEventListener( "click", onRemixClick );
      controlsFullscreen.addEventListener( "click", onFullscreenClick );
      controlsLogo.addEventListener( "click", onLogoClick );

      // this block is used to ensure that when the video is played on a mobile device that the controls and playButton overlay
      // are in the correct state when it begins playing
      if ( !p.paused() ) {
        if ( bigPlayButton ) {
          bigPlayClicked();
        }
        playButton.classList.remove( "controls-paused" );
        playButton.classList.add( "controls-playing" );
      }

      if ( !options.preload ) {
        bigPlayClicked();
      }

      _controls.classList.add( "controls-ready" );

      activate = function() {

        active = true;
        _controls.classList.add( "controls-active" );
      };

      deactivate = function() {

        active = false;
        if ( !seeking ) {
          _controls.classList.remove( "controls-active" );
        }
      };

      p.media.addEventListener( "mouseout", deactivate );
      _controls.addEventListener( "mouseover", activate );
      _controls.addEventListener( "mouseout", deactivate );

      togglePlay = function( e ) {
        var waiting = document.querySelector( ".embed" ).getAttribute( "data-state-waiting" );
        // Only continue if event was triggered by the left mouse button or the spacebar
        if ( e.button !== LEFT_MOUSE_BUTTON && e.which !== SPACE_BAR ) {
          return;
        }

        if ( p.paused() ) {
          if ( !waiting ) {
            p.play();
          } else {
            onPlay();
            p.on( "sequencesReady", onSequencesReady );
          }
        } else {

          p.pause();
        }
      };

      onSequencesReady = function() {
        p.off( "sequencesReady", onSequencesReady );
        p.play();
      };

      onPause = function() {
        playButton.classList.remove( "controls-playing" );
        playButton.classList.add( "controls-paused" );
      };

      onPlay = function() {
        p.off( "sequencesReady", p.play );
        playButton.classList.remove( "controls-paused" );
        playButton.classList.add( "controls-playing" );
      };

      p.media.addEventListener( "click", togglePlay );
      window.addEventListener( "keypress", togglePlay );

      if ( playButton ) {

        playButton.addEventListener( "click", togglePlay );
        if ( analytics ) {
          playButton.addEventListener( "click", function() {
            // State has already been toggled here, so we check the current state.
            if ( !p.paused() ) {
              analytics.event( "Play Clicked", {
                label: "Embed"
              });
            } else {
              analytics.event( "Pause Clicked", {
                label: "Embed"
              });
            }
          } );
        }

        p.on( "play", onPlay );
        p.on( "pause", onPause );
      }

      if ( muteButton ) {

        muteButton.addEventListener( "click", function( e ) {

          if ( e.button !== 0 ) {

            return;
          }

          p[ p.muted() ? "unmute" : "mute" ]();
        } );

        mutechange = function() {

          if ( p.muted() ) {

            muteButton.classList.remove( "icon-volume-up" );
            muteButton.classList.add( "icon-volume-off" );
          } else {

            muteButton.classList.add( "icon-volume-up" );
            muteButton.classList.remove( "icon-volume-off" );
          }
        };

        p.on( "volumechange", mutechange );
        mutechange();
      }

      if ( volume ) {

        volumeMouseMove = function( e ) {

          e.preventDefault();

          position = e.clientX - volume.getBoundingClientRect().left;

          if ( position <= 0 ) {

            p.mute();
            position = 0;
          } else if ( position > volume.offsetWidth ) {

            position = volume.offsetWidth;
          } else if ( p.muted() ) {

            p.unmute();
          }

          if ( volumeProgressBar ) {

            volumeProgressBar.style.width = ( position / volume.offsetWidth * 100 ) + "%";
          }

          if ( volumeScrubber ) {

            volumeScrubber.style.left = ( ( position - ( volumeScrubber.offsetWidth / 2 ) ) / volume.offsetWidth * 100 ) + "%";
          }

          p.volume( position / volume.offsetWidth );
        };

        volumeMouseUp = function( e ) {

          if ( e.button !== 0 ) {

            return;
          }

          e.preventDefault();
          window.removeEventListener( "mouseup", volumeMouseUp, false );
          window.removeEventListener( "mousemove", volumeMouseMove, false );
        };

        volumeMouseDown = function( e ) {

          if ( e.button !== 0 ) {

            return;
          }

          position = e.clientX - volume.getBoundingClientRect().left;

          e.preventDefault();
          window.addEventListener( "mouseup", volumeMouseUp );
          window.addEventListener( "mousemove", volumeMouseMove );

          if ( position === 0 ) {

            p.mute();
          } else if ( p.muted() ) {

            p.unmute();
          }

          if ( volumeProgressBar ) {

            volumeProgressBar.style.width = ( position / volume.offsetWidth * 100 ) + "%";
          }

          if ( volumeScrubber ) {

            volumeScrubber.style.left = ( ( position - ( volumeScrubber.offsetWidth / 2 ) ) / volume.offsetWidth * 100 ) + "%";
          }

          p.volume( position / volume.offsetWidth );
        };

        volume.addEventListener( "mousedown", volumeMouseDown );

        volumechange = function() {

          var width;

          if ( p.muted() ) {

            width = 0;
          } else {

            width = p.volume();
          }

          if ( width === 0 ) {

            if ( muteButton ) {

              muteButton.classList.remove( "controls-unmuted" );
              muteButton.classList.add( "controls-muted" );
            }
          }

          if ( volumeProgressBar ) {

            volumeProgressBar.style.width = ( width * 100 ) + "%";
          }

          if ( volumeScrubber ) {

            volumeScrubber.style.left = ( ( width - ( volumeScrubber.offsetWidth / 2 ) ) * 100 ) + "%";
          }
        };

        p.on( "volumechange", volumechange );

        // fire to get and set initially volume slider position
        volumechange();
      }

      if ( durationDialog ) {

        durationchange = function() {
          durationDialog.innerHTML = Time.toTimecode( p.duration(), 0 );
        };

        durationchange();
      }

      if ( timebar ) {

        timeMouseMove = function( e ) {

          e.preventDefault();

          position = e.clientX - timebar.getBoundingClientRect().left;

          if ( position < 0 ) {

            position = 0;
          } else if ( position > timebar.offsetWidth ) {

            position = timebar.offsetWidth;
          }

          if ( progressBar ) {

            progressBar.style.width = ( position / timebar.offsetWidth * 100 ) + "%";
          }

          if ( scrubber ) {

            scrubber.style.left = ( ( position - ( scrubber.offsetWidth / 2 ) ) / timebar.offsetWidth * 100 ) + "%";
          }
          tooltipMouseMove( e );

          p.currentTime( position / timebar.offsetWidth * 100 * p.duration() / 100 );
        };

        removeTooltip = function() {
          timeTooltip.classList.remove( "tooltip-no-transition-on" );
        };

        addTooltip = function() {
          timeTooltip.classList.add( "tooltip-no-transition-on" );
        };

        timeMouseUp = function( e ) {

          if ( e.button !== 0 ) {

            return;
          }

          e.preventDefault();
          seeking = false;
          if ( !active ) {
            deactivate();
          }
          if ( playStateCache ) {
            p.play();
          }

          timebar.addEventListener( "mouseout", timeMouseOut );
          timebar.addEventListener( "mouseover", timeMouseOver );
          timebar.addEventListener( "mousemove", tooltipMouseMove );
          window.removeEventListener( "mouseup", timeMouseUp, false );
          window.removeEventListener( "mousemove", timeMouseMove, false );
        };

        scheduleTooltip = function() {
          window.addEventListener( "mouseup", removeTooltip );
        };

        cancelTooltip = function() {
          window.removeEventListener( "mouseup", removeTooltip, false );
        };

        timeMouseDown = function( e ) {

          if ( e.button !== 0 ) {

            return;
          }

          position = e.clientX - timebar.getBoundingClientRect().left;

          e.preventDefault();
          seeking = true;
          playStateCache = !p.paused();
          p.pause();

          timebar.removeEventListener( "mouseout", timeMouseOut, false );
          timebar.removeEventListener( "mouseover", timeMouseOver, false );
          timebar.removeEventListener( "mousemove", tooltipMouseMove, false );
          window.addEventListener( "mousemove", timeMouseMove );
          window.addEventListener( "mouseup", timeMouseUp );


          if ( progressBar ) {

            progressBar.style.width = ( position / timebar.offsetWidth * 100 ) + "%";
          }

          if ( scrubber ) {

            scrubber.style.left = ( ( position - ( scrubber.offsetWidth / 2 ) ) / timebar.offsetWidth * 100 ) + "%";
          }

          p.currentTime( position / timebar.offsetWidth * 100 * p.duration() / 100 );
        };

        tooltipMouseMove = function( e ) {
          addTooltip();
          if ( timeTooltip ) {
            var leftPosition = e.clientX - timebar.getBoundingClientRect().left;
            if ( leftPosition < 0 ) {
              leftPosition = 0;
            } else if ( leftPosition > timebar.offsetWidth ) {
              leftPosition = timebar.offsetWidth;
            }

            timeTooltip.style.left = leftPosition + "px";
            timeTooltip.innerHTML = Time.toTimecode( leftPosition / timebar.offsetWidth * p.duration(), 0 );
          }
        };

        timeMouseOver = function() {
          addTooltip();

          timebar.addEventListener( "mousemove", tooltipMouseMove );
        };

        timeMouseOut = function() {
          removeTooltip();
          timebar.removeEventListener( "mousemove", tooltipMouseMove, false );
        };

        timebar.addEventListener( "mouseout", scheduleTooltip );
        timebar.addEventListener( "mouseover", cancelTooltip );
        timebar.addEventListener( "mouseout", timeMouseOut );
        timebar.addEventListener( "mouseover", timeMouseOver );
        timebar.addEventListener( "mousedown", timeMouseDown );

        p.on( "timeupdate", function() {

          var time = p.currentTime(),
              width = ( time / p.duration() * 100 * timebar.offsetWidth / 100 );

          if ( progressBar ) {

            progressBar.style.width = ( width / timebar.offsetWidth * 100 ) + "%";
          }

          if ( scrubber ) {

            scrubber.style.left = ( ( width - ( scrubber.offsetWidth / 2 ) ) / timebar.offsetWidth * 100 ) + "%";
          }

          if ( currentTimeDialog ) {

            currentTimeDialog.innerHTML = Time.toTimecode( time, 0 );
          }
        });
      }
    };

    _container.appendChild( _controls );

    // If we're not autoPlay, wait for user interaction before we're ready.
    if ( !options.preload ) {
      if ( thumbnailContainer ) {
        thumbnailContainer.addEventListener( "click", onInit );
      }
      bigPlayButton.addEventListener( "click", onInit );
    } else {
      onInit();
      bigPlayButton.addEventListener( "click", bigPlayClicked );
    }
    if ( analytics ) {
      bigPlayButton.addEventListener( "click", function() {
        analytics.event( "Big Play Clicked", {
          label: "Embed"
        });
      } );
    }

    if ( !_container ) {

      return;
    }

    return _container;
  }

  return {
    create: Controls
  };
});
