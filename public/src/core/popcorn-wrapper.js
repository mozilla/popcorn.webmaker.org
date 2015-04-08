/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */
/*jshint evil:true*/

define( [ "localized", "core/logger", "core/eventmanager", "util/uri", "util/accepted-flash" ],
        function( Localized, Logger, EventManager, URI, FLASH ) {

      // how long to wait for the status of something in checkTimeoutLoop
  var STATUS_INTERVAL = 100,
      // timeout duration to wait for media to be ready
      MEDIA_WAIT_DURATION = 10000;

  /* The Popcorn-Wrapper wraps various functionality and setup associated with
   * creating, updating, and removing associated data with Popcorn.js.
   */
  return function ( mediaId, options ){

    var _id = mediaId,
        _logger = new Logger( _id + "::PopcornWrapper" ),
        _popcornEvents = options.popcornEvents || {},
        _onPrepare = options.prepare || function(){},
        _onFail = options.fail || function(){},
        _onTimeout = options.timeout || function(){},
        _popcorn,
        _mediaReady = false,
        _interruptLoad = false,
        _this = this,
        _checkedFlashVersion = false;

    /* Destroy popcorn bindings specifically without touching other discovered
     * settings
     */
    this.unbind = function(){
      if ( _popcorn ) {
        try{
          _popcorn.destroy();
          _popcorn = undefined;
        }
        catch( e ){
          _logger.log( "WARNING: Popcorn did NOT get destroyed properly: \n" + e.message + "\n" + e.stack );
        }
      }
    };

    /* Setup any handlers that were defined in the options passed into
     * popcorn wrapper. Events such as timeupdate, paused, etc
     */
    function addPopcornHandlers(){
      for ( var eventName in _popcornEvents ){
        if ( _popcornEvents.hasOwnProperty( eventName ) ) {
          _popcorn.on( eventName, _popcornEvents[ eventName ] );
        }
      } //for
    } //addPopcornHandlers

    // Cancel loading or preparing of media whilst attempting to setup
    this.interruptLoad = function(){
      _interruptLoad = true;
    }; //interrupt

    // Update Popcorn events with data from a butter trackevent
    this.synchronizeEvent = function( trackEvent, newOptions ) {
      var options = trackEvent.popcornOptions,
          popcornId = trackEvent.id,
          popcornEvent = null;

      function createTrackEvent() {
        if ( _popcorn.getTrackEvent( popcornId ) ) {
          _popcorn[ trackEvent.type ]( popcornId, newOptions );
        } else {
          _popcorn[ trackEvent.type ]( popcornId, options );
        }

        popcornEvent = _popcorn.getTrackEvent( popcornId );
        trackEvent.popcornTrackEvent = popcornEvent;

        trackEvent.popcornOptions.start = +popcornEvent.start;
        trackEvent.popcornOptions.end = +popcornEvent.end;

        if ( trackEvent.view ) {
          if ( popcornEvent.toString ) {
            if ( trackEvent.type === "sequencer" ) {
              // Check for flash and display a warning if
              // the media type is a flash player.
              if ( !_checkedFlashVersion && "YouTube Vimeo SoundCloud".indexOf( trackEvent.popcornOptions.type ) !== -1 ) {
                _checkedFlashVersion = true;
                FLASH.warn();
              }
              if ( !trackEvent.popcornOptions.hidden ) {
                trackEvent.view.element.classList.add( "sequencer-video" );
                trackEvent.view.element.classList.remove( "sequencer-audio" );
              } else {
                trackEvent.view.element.classList.add( "sequencer-audio" );
                trackEvent.view.element.classList.remove( "sequencer-video" );
              }
            }
          }

          trackEvent.view.update( trackEvent.popcornOptions );

          // make sure we have a reference to the trackevent before calling toString
          if ( trackEvent.popcornTrackEvent ) {
            trackEvent.view.elementText = trackEvent.popcornTrackEvent.toString();
            // we should only get here if no exceptions happened
            trackEvent.dispatch( "trackeventupdated", trackEvent );
          }
        }
      }

      if ( _popcorn ) {
        // make sure the plugin is still included
        if ( _popcorn[ trackEvent.type ] ) {
          createTrackEvent();
        }
      }
    };

    // Destroy a Popcorn trackevent
    this.destroyEvent = function( trackEvent ){
      var popcornId = trackEvent.id;

      // ensure the trackevent actually exists before we remove it
      if ( _popcorn ) {
        if ( popcornId && _popcorn.getTrackEvent( popcornId ) ) {
          _popcorn.removeTrackEvent( popcornId );
        } //if

      } //if
    }; //destroyEvent

    /* Create functions for various failure and success cases,
     * generate the Popcorn string and ensures our player is ready
     * before we actually create the Popcorn instance and notify the
     * user.
     */
    this.prepare = function( url, target, popcornOptions ){
      var urlsFromString;

      _mediaReady = false;

      // called when timeout occurs preparing media
      function mediaTimeoutWrapper( e ) {
        _onTimeout( e );
      }

      // called when there's a serious failure in preparing popcorn
      function failureWrapper( e ) {
        _interruptLoad = true;
        _logger.log( e );
        _onFail( e );
      }

      // attempt to grab the first url for a type inspection
      // In the case of URL being a string, check that it doesn't follow our format for
      // Null Video (EG #t=,200). Without the check it incorrectly will splice on the comma.
      var firstUrl = url;
      if ( typeof( url ) !== "string" ) {
        if ( !url.length ) {
          throw "URL is invalid: empty array or not a string.";
        }
        else {
          firstUrl = url[ 0 ];
        }
      }
      else if ( url.indexOf( "#t" ) !== 0 && url.indexOf( "," ) > -1 ) {
        urlsFromString = url.split( "," );
        firstUrl = urlsFromString[ 0 ];
        url = urlsFromString;
      }

      // if there isn't a target, we can't really set anything up, so stop here
      if ( !target ) {
        _logger.log( "Warning: tried to prepare media with null target." );
        return;
      }

      // only enter this block if popcorn doesn't already exist (call clear() first to destroy it)
      if ( !_popcorn ) {
        try {
          // generate a function which will create a popcorn instance when entered into the page
          createPopcorn( popcornOptions, url, target );
          // once popcorn is created, attach listeners to it to detect state
          addPopcornHandlers();
          // wait for the media to become available and notify the user, or timeout
          waitForMedia( _onPrepare, mediaTimeoutWrapper );
        }
        catch( e ) {
          // if we've reached here, we have an internal failure in butter or popcorn
          failureWrapper( e );
        }
      }
    };

    /* 
     * Create a Popcorn instance in the page.
     */
    function createPopcorn( popcornOptions, url, target ){
      var popcorn = Popcorn.smart( "#" + target, url, popcornOptions );

      popcorn.controls( false );
      _popcorn = popcorn;
    }

    /* Abstract the problem of waiting for some condition to occur with a timeout. Loop on checkFunction,
     * calling readyCallback when it succeeds, or calling timeoutCallback after MEDIA_WAIT_DURATION milliseconds.
     */
    function checkTimeoutLoop( checkFunction, readyCallback, timeoutCallback ){
      var ready = false;

      // perform one check
      function doCheck(){

        if ( _interruptLoad ) {
          return;
        }

        // run the check function
        ready = checkFunction();
        if ( ready ) {
          // if success, call the ready callback
          readyCallback();
        }
        else {
          // otherwise, prepare for another loop
          setTimeout( doCheck, STATUS_INTERVAL );
        }
      }

      // set a timeout to occur after timeoutDuration milliseconds
      setTimeout(function(){
        // if success hasn't already occurred, call timeoutCallback
        if ( !ready ) {
          timeoutCallback();
        }
      }, MEDIA_WAIT_DURATION );

      //init
      doCheck();
    }

    /* Wait for the media to return a sane readyState and duration so we can interact
     * with it (uses checkTimeoutLoop).
     */
    function waitForMedia( readyCallback, timeoutCallback ){
      checkTimeoutLoop(function(){
        // Make sure _popcorn still exists (e.g., destroy() hasn't been called),
        // that we're ready, and that we have a duration.
        _mediaReady = ( _popcorn && ( _popcorn.media.readyState >= 1 && _popcorn.duration() > 0 ) );

        return _mediaReady;
      }, readyCallback, timeoutCallback, MEDIA_WAIT_DURATION );
    }

    function onSequencesReady() {
      _popcorn.off( "sequencesReady", onSequencesReady );
      _popcorn.play();
    }

    // Passthrough to the Popcorn instances play method
    this.play = function(){
      var waiting = document.querySelector( ".embed" ).getAttribute( "data-state-waiting" );
      if ( _mediaReady && _popcorn.paused() ) {
        if ( !waiting ) {
          _popcorn.play();
        } else {
          document.querySelector( ".play-button-container .status-button" ).setAttribute( "data-state", true );
          _popcorn.on( "sequencesReady", onSequencesReady );
        }
      }
    };

    // Passthrough to the Popcorn instances pause method
    this.pause = function(){
      if ( _mediaReady && !_popcorn.paused() ) {
        _popcorn.pause();
      }
    };

    Object.defineProperties( this, {
      volume: {
        enumerable: true,
        set: function( val ){
          if ( _popcorn ) {
            _popcorn.volume( val );
          } //if
        },
        get: function() {
          if ( _popcorn ) {
            return _popcorn.volume();
          }
          return false;
        }
      },
      muted: {
        enumerable: true,
        set: function( val ) {
          if ( _popcorn ) {
            if ( val ) {
              _popcorn.mute();
            }
            else {
              _popcorn.unmute();
            } //if
          } //if
        },
        get: function() {
          if ( _popcorn ) {
            return _popcorn.muted();
          }
          return false;
        }
      },
      currentTime: {
        enumerable: true,
        set: function( val ) {
          if ( _mediaReady && _popcorn ) {
            _popcorn.currentTime( val );
          } //if
        },
        get: function() {
          if ( _popcorn ) {
            return _popcorn.currentTime();
          }
          return 0;
        }
      },
      duration: {
        enumerable: true,
        get: function() {
          if ( _popcorn ) {
            return _popcorn.duration();
          } //if
          return 0;
        }
      },
      popcorn: {
        enumerable: true,
        get: function(){
          return _popcorn;
        }
      },
      paused: {
        enumerable: true,
        get: function() {
          if ( _popcorn ) {
            return _popcorn.paused();
          } //if
          return true;
        },
        set: function( val ) {
          if ( _popcorn ) {
            if ( val ) {
              _this.pause();
            }
            else {
              _this.play();
            } //if
          } //if
        }
      } //paused
    });

  };

});
