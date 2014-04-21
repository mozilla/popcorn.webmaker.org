// PLUGIN: sequencer

(function ( Popcorn ) {

  // XXX: SoundCloud has a bug (reported by us, but as yet unfixed) which blocks
  // loading of a second iframe/player if the iframe for the first is removed
  // from the DOM.  We can simply move old ones to a quarantine div, hidden from
  // the user for now (see #2630).  We lazily create and memoize the instance.
  // I am seeing this on other iframes as well. Going to do this on all cases.
  function getElementQuarantine() {
    if ( getElementQuarantine.instance ) {
      return getElementQuarantine.instance;
    }

    var quarantine = document.createElement( "div" );
    quarantine.style.width = "0px";
    quarantine.style.height = "0px";
    quarantine.style.overflow = "hidden";
    quarantine.style.visibility = "hidden";
    document.body.appendChild( quarantine );

    getElementQuarantine.instance = quarantine;
    return quarantine;
  }

  var _waiting = 0;

  var loadingHandler = {
    loading: [],
    compare: function( a, b ) {
      return a.start - b.start;
    },
    add: function( options, beginLoad ) {
      var _this = this;
      this.loading.push({
        start: options.start,
        end: options.end,
        beginLoad: beginLoad
      });
      this.loading.sort( this.compare );
      if ( this.loading.length === 1 ) {
        setTimeout( function() {
          _this.next();
        }, 0 );
      }
    },
    next: function( currentTime ) {
      // If no clip is found because we're at the end of any loading
      // clip's range, default to 0, the first clip in the sequence.
      var nextClip = 0;
      // Find the clip closest to the currentTime.
      for ( var index = 0; index < this.loading.length; index++ ) {
        if ( this.loading[ index ].start <= currentTime &&
             this.loading[ index ].end >= currentTime ) {
          nextClip = index;
          break;
        }
      }
      // Load the clip, and remove it from the loading clips.
      // Once the clip is loaded (or fails), it knows to call next.
      if ( this.loading[ nextClip ] ) {
        this.loading[ nextClip ].beginLoad();
      }
      this.loading.splice( nextClip, 1 );
    }
  };

  Popcorn.plugin( "sequencer", {
    _setup: function( options ) {
      var _this = this;

      options.setupContainer = function() {
        var container = document.createElement( "div" ),
            target = Popcorn.dom.find( options.target );

        if ( !target ) {
          target = _this.media.parentNode;
        }

        options._target = target;
        options._container = container;

        container.style.zIndex = 0;
        container.className = "popcorn-sequencer";
        container.style.position = "absolute";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.top = 0;
        container.style.left = 0;

        function surpressClick() {
          if ( options._clip.paused() ) {
            _this.pause();
          } else {
            _this.play();
          }
        }

        container.addEventListener( "mouseover", function() {
          _this.off( "pause", options._playEvent );
          _this.off( "play", options._playEvent );
          options._clip.on( "play", surpressClick );
          options._clip.on( "pause", surpressClick );
        } );

        container.addEventListener( "mouseout", function() {
          options._clip.off( "play", surpressClick );
          options._clip.off( "pause", surpressClick );
          _this.on( "play", options._playEvent );
          _this.on( "pause", options._pauseEvent );
        } );

        target.appendChild( container );
      };
      options.displayLoading = function() {
        if ( !options.waiting ) {
          options.waiting = true;
          _waiting++;
          document.querySelector( ".embed" ).setAttribute( "data-state-waiting", true );
          document.querySelector( ".embed" ).classList.add( "show-loading" );
        }
      };
      options.hideLoading = function() {
        if ( options.waiting ) {
          options.waiting = false;
          --_waiting;
          if ( _waiting === 0 ) {
            _this.emit( "sequencesReady" );
            document.querySelector( ".embed" ).removeAttribute( "data-state-waiting" );
            document.querySelector( ".embed" ).classList.remove( "show-loading" );
          }
        }
      };
      options.setZIndex = function() {
        if ( !options.hidden && options.active ) {
          options._container.style.zIndex = +options.zindex;
        } else {
          options._container.style.zIndex = 0;
        }
      };

      if ( !options.from || options.from > options.duration ) {
        options.from = 0;
      }

      options._volumeEvent = function() {
        if ( _this.muted() ) {
          options._clip.mute();
        } else {
          if ( !options.mute ) {
            options._clip.unmute();
            options._clip.volume( ( options.volume / 100 ) * _this.volume() );
          } else {
            options._clip.mute();
          }
        }
      };

      options.readyEvent = function() {

        options._clip.media.style.width = "100%";
        options._clip.media.style.height = "100%";
        options._container.style.width = "100%";
        options._container.style.height = "100%";
        // If teardown was hit before ready, ensure we teardown.
        if ( options._cancelLoad ) {
          options.playIfReady();
          options._cancelLoad = false;
          options.tearDown();
        }
        options.failed = false;
        options._clip.off( "error", options.fail );
        options._clip.off( "loadedmetadata", options.readyEvent );
        options.ready = true;
        options._container.style.width = ( options.width || "100" ) + "%";
        options._container.style.height = ( options.height || "100" ) + "%";
        options._container.style.top = ( options.top || "0" ) + "%";
        options._container.style.left = ( options.left || "0" ) + "%";
        _this.on( "volumechange", options._volumeEvent );
        if ( options.active ) {
          options._startEvent();
        } else {
          options._setClipCurrentTime( +options.from );
        }
      };

      options.clearLoading = function() {
        loadingHandler.next( _this.currentTime() );
        options._clip.off( "loadedmetadata", options.clearLoading );
      };

      // Function to ensure the mixup as to if a clip is an array
      // or string is normalized to an array as often as possible.
      options.sourceToArray = function( object, type ) {
        // If our src is not an array, create an array of one.
        object[ type ] = typeof object[ type ] === "string" ? [ object[ type ] ] : object[ type ];
      };

      // If loading times out, we want to let the media continue to play.
      // The clip that failed to load would be ignored,
      // and everything else playable.
      options.fail = function() {
        options.clearLoading();
        options.failed = true;
        options.setZIndex();
        options.hideLoading();
        options.playIfReady();
      };

      options.attemptJWPlayer = function() {
        options._clip.off( "error", options.attemptJWPlayer );
        if ( !options._clip.error ) {
          // For some reason html5 media clips are throwing error events,
          // with no actual error, only in the embed...
          return;
        }
        var jwDiv = document.createElement( "div" ),
            videoElement = document.getElementById( options._clip.media.id );

        if ( !videoElement ) {
          options.fail();
          return;
        }
        // Remove the dead html5 video element.
        options._container.removeChild( videoElement );
        options._container.appendChild( jwDiv );
        jwDiv.id = Popcorn.guid( "popcorn-jwplayer-" );
        var jwplayer = Popcorn.HTMLJWPlayerVideoElement( jwDiv ),
            // We use an already decoded src string from before.
            src = options._clip.media.src;
        // Now we can fail.
        options._clip = new Popcorn( jwplayer, { frameAnimation: true } );
        options._clip.on( "error", options.fail );
        options._clip.on( "loadedmetadata", options.readyEvent );
        options._clip.on( "loadedmetadata", options.clearLoading );
        jwplayer.src = src;
      };

      options.tearDown = function() {
        _this.off( "volumechange", options._volumeEvent );
        // If we have no options._clip, no source was given to this track event,
        // and it is being torn down.
        if ( options._clip ) {
          // XXX: pull the SoundCloud iframe element out of our video div, and quarantine
          // so we don't delete it, and block loading future SoundCloud instances. See above.
          // This is also fixing an issue in youtube, so we do it for all medias with iframes now.
          // If you remove the iframe, there is potential that other services
          // are still referencing these iframes. Keeping them around protects us.
          var elementParent = options._clip.media.parentNode,
              element = elementParent.querySelector( "iframe" ) ||
                        elementParent.querySelector( "video" ) ||
                        elementParent.querySelector( "audio" );
          if ( element ) {
            getElementQuarantine().appendChild( element );
          }
          options._clip.destroy();
        }

        // Tear-down old instances, special-casing iframe removal, see above.
        if ( options._container && options._container.parentNode ) {
          options._container.parentNode.removeChild( options._container );
        }
      };

      options.clearEvents = function() {
        _this.off( "play", options._playEvent );
        _this.off( "pause", options._pauseEvent );
        _this.off( "seeked", options._onSeeked );
        _this.off( "timeupdate", options._onTimeUpdate );
      };

      options.addSource = function() {
        // if the video is denied for any reason, most cases youtube embedding disabled,
        // don't bother waiting and display fail case.
        if ( options.denied ) {
          options.fail();
        }

        for ( var i = 0; i < options.source.length; i++ ) {
          var value = options.source[ i ],
              split = value.split( "?" ),
              querystring = split[ 1 ];

          value = split[ 0 ].trim();
          options.source[ i ] = querystring ? value + "?" + querystring : value;
        }

        options._clip = Popcorn.smart( options._container, options.source, { frameAnimation: true } );

        options._clip.on( "error", options.attemptJWPlayer );

        if ( options._clip.error ) {
          options.attemptJWPlayer();
          return;
        }

        if ( options._clip.media.readyState >= 1 ) {
          options.readyEvent();
          options.clearLoading();
        } else {
          options._clip.on( "loadedmetadata", options.readyEvent );
          options._clip.on( "loadedmetadata", options.clearLoading );
        }
      };

      options._onProgress = function() {

        if ( options._clip.ended() ) {
          return;
        }
        if ( !options._isBuffering() ) {
          // We found a valid range so playing can resume.
          options.hideLoading();
          if ( options.playIfReady() ) {
            options._clip.play();
          }
          return;
        }
      };

      options._isBuffering = function() {
        var i, l,
            buffered = options._clip.media.buffered,
            time = _this.currentTime() - options.start + ( +options.from );

        for ( i = 0, l = buffered.length; i < l; i++ ) {
          // Check if a range is valid, if so, return early.
          if ( buffered.start( i ) <= time &&
               buffered.end( i ) > time ) {
            // We found a valid range so playing can resume.
            return false;
          }
        }
        return true;
      };

      options._onTimeUpdate = function() {

        if ( options._clip.ended() ) {
          return;
        }

        // If we hit here, we failed to find a valid range,
        // so we should probably stop everything. We'll get out of sync.
        if ( options._isBuffering() && !_this.paused() ) {
          options.playWhenReady = true;
          _this.pause();
          options._clip.pause();
          options.displayLoading();
        }
      };

      // Ensures seek time is seekable, and not already seeked.
      // Returns true for successful seeks.
      options._setClipCurrentTime = function( time ) {
        if ( !time && time !== 0 ) {
          time = _this.currentTime() - options.start + ( +options.from );
        }
        if ( time !== options._clip.currentTime() &&
             time >= ( +options.from ) && time <= options.duration ) {
          options._clip.currentTime( time );
        }
      };

      // While clip is loading, do not let the timeline play.
      options.playIfReady = function() {
        if ( options.playWhenReady && !_waiting ) {
          options.playWhenReady = false;
          _this.play();
          return true;
        }
        return false;
      };

      options.setupContainer();
      if ( options.source ) {
        options.sourceToArray( options, "source" );
        if ( options.fallback ) {
          options.sourceToArray( options, "fallback" );
        }
        if ( options.fallback ) {
          options.source = options.source.concat( options.fallback );
        }
        loadingHandler.add( options, options.addSource );
      }

      options._startEvent = function() {
        options._setClipCurrentTime();
        _this.on( "seeked", options._onSeeked );

        // Ensure this wrapper supports buffered.
        // Once these wrappers have a buffered time range object, it should just work.
        if ( options._clip.media.buffered.length ) {
          _this.on( "timeupdate", options._onTimeUpdate );
          options._clip.on( "progress", options._onProgress );
        }
        if ( options.playIfReady() ) {
          options._clip.play();
        }
        _this.on( "play", options._playEvent );
        _this.on( "pause", options._pauseEvent );
        options.hideLoading();
        options.setZIndex();
        if ( options.active ) {
          options._volumeEvent();
        }
      };

      options._endEvent = function() {
        if ( !options._clip.paused() ) {
          options._clip.pause();
        }
        // reset current time so next play from start is smooth. We've pre seeked.
        options._setClipCurrentTime( +options.from );
        options._clip.mute();
        options._container.style.zIndex = 0;
      };

      options._playEvent = function() {
        if ( options._clip.paused() &&
             !_waiting &&
             !options._clip.ended() ) {
          options._clip.play();
        }
      };

      options._pauseEvent = function() {
        if ( !options._clip.paused() ) {
          options._clip.pause();
        }
      };

      // event to seek the clip if the main timeline seeked.
      options._onSeeked = function() {
        options._setClipCurrentTime();
      };

      options.toString = function() {
        return options.title || options.source || "";
      };

      if ( options.duration > 0 &&
           options.end - ( options.start - ( +options.from ) ) > options.duration ) {
        options.end = options.duration + ( options.start - ( +options.from ) );
      }
    },
    _update: function( options, updates ) {
      if ( updates.hasOwnProperty( "duration" ) ) {
        options.duration = updates.duration;
      }
      if ( updates.hasOwnProperty( "from" ) && updates.from < options.duration ) {
        options.from = updates.from;
      }
      if ( options.end - ( options.start - ( +options.from ) ) > options.duration ) {
        options.end = options.duration + ( options.start - ( +options.from ) );
      }
      if ( updates.hasOwnProperty( "zindex" ) ) {
        options.zindex = updates.zindex;
        options.setZIndex();
      }
      if ( updates.title ) {
        options.title = updates.title;
      }
      if ( updates.denied ) {
        options.denied = updates.denied;
      }
      if ( updates.hasOwnProperty( "hidden" ) ) {
        options.hidden = updates.hidden;
        options.setZIndex();
      }
      if ( updates.fallback ) {
        options.sourceToArray( updates, "fallback" );
        options.fallback = updates.fallback;
      }
      if ( updates.source ) {
        options.sourceToArray( updates, "source" );
        if ( options.fallback ) {
          updates.source = updates.source.concat( options.fallback );
        }
        if ( updates.source.toString() !== options.source.toString() ) {
          options.ready = false;
          options.playWhenReady = false;
          if ( options.active ) {
            options.displayLoading();
          }
          if ( updates.fallback ) {
            updates.source = updates.source.concat( updates.fallback );
          }
          options.source = updates.source;
          options.clearEvents();
          // TODO: ensure any pending loads are torn down.
          options.tearDown();
          options.setupContainer();
          if ( !this.paused() ) {
            options.playWhenReady = true;
            this.pause();
            if ( options._clip && !options._clip.paused() ) {
              options._clip.pause();
            }
          }
          loadingHandler.add( options, options.addSource );
        }
      }
      if ( updates.hasOwnProperty( "top" ) ) {
        options.top = updates.top;
        options._container.style.top = ( options.top || "0" ) + "%";
      }
      if ( updates.hasOwnProperty( "left" ) ) {
        options.left = updates.left;
        options._container.style.left = ( options.left || "0" ) + "%";
      }
      if ( updates.hasOwnProperty( "height" ) ) {
        options.height = updates.height;
        options._container.style.height = ( options.height || "100" ) + "%";
      }
      if ( updates.hasOwnProperty( "width" ) ) {
        options.width = updates.width;
        options._container.style.width = ( options.width || "100" ) + "%";
      }
      if ( options.ready ) {
        if ( updates.hasOwnProperty( "mute" ) ) {
          options.mute = updates.mute;
          options._volumeEvent();
        }
        if ( updates.hasOwnProperty( "volume" ) ) {
          options.volume = updates.volume;
          options._volumeEvent();
        }
        if ( updates.hasOwnProperty( "from" ) ||
             updates.hasOwnProperty( "start" ) ||
             updates.hasOwnProperty( "end" ) ) {
          options._setClipCurrentTime();
        }
      }
    },
    _teardown: function( options ) {
      // If we're ready, or never going to be, simply teardown.
      if ( options.ready || !options.source ) {
        options.tearDown();
      } else {
        // If we're not ready yet, ensure we do the proper teardown once ready.
        options._cancelLoad = true;
      }
    },
    start: function( event, options ) {
      options.active = true;
      if ( options.source ) {
        if ( !options.hidden && options.failed ) {
          // display player in case any external players show a fail message.
          // eg. youtube embed disabled by uploader.
          options._container.style.zIndex = +options.zindex;
          return;
        }
        if ( !this.paused() ) {
          options.playWhenReady = true;
        }
        if ( options.ready ) {
          options._startEvent();
        } else {
          this.pause();
          options.displayLoading();
        }
      }
    },
    end: function( event, options ) {
      // cancel any pending or future starts
      options.active = false;
      options.playWhenReady = false;
      options.clearEvents();
      options.hideLoading();
      if ( options.ready ) {
        options._clip.off( "progress", options._onProgress );
        options._endEvent();
      } else {
        options._container.style.zIndex = 0;
      }
    },
    manifest: {
      about: {},
      options: {
        start: {
          elem: "input",
          type: "text",
          label: "In",
          "units": "seconds"
        },
        end: {
          elem: "input",
          type: "text",
          label: "Out",
          "units": "seconds"
        },
        source: {
          elem: "input",
          type: "url",
          label: "Source URL",
          "default": ""
        },
        fallback: {
          elem: "input",
          type: "url",
          label: "Fallback URL (only applies to exported projects)",
          "default": ""
        },
        title: {
          elem: "input",
          type: "text",
          label: "Clip title",
          "default": ""
        },
        width: {
          elem: "input",
          type: "number",
          label: "Width",
          "default": 100,
          "units": "%",
          hidden: true
        },
        height: {
          elem: "input",
          type: "number",
          label: "Height",
          "default": 100,
          "units": "%",
          hidden: true
        },
        top: {
          elem: "input",
          type: "number",
          label: "Top",
          "default": 0,
          "units": "%",
          hidden: true
        },
        left: {
          elem: "input",
          type: "number",
          label: "Left",
          "default": 0,
          "units": "%",
          hidden: true
        },
        from: {
          elem: "input",
          type: "seconds",
          "units": "seconds",
          "label": "Start at",
          "default": 0
        },
        volume: {
          elem: "input",
          type: "range",
          units: "%",
          label: "Volume",
          slider_unit: "%",
          min: 0,
          max: 100,
          "default": 100
        },
        hidden: {
          elem: "input",
          type: "checkbox",
          label: "Sound only",
          "default": false
        },
        mute: {
          elem: "input",
          type: "checkbox",
          label: "Mute",
          "default": false
        },
        zindex: {
          hidden: true,
          "default": 0
        },
        denied: {
          hidden: true,
          "default": false
        },
        duration: {
          hidden: true,
          "default": 0
        },
        linkback: {
          hidden: true,
          "default": ""
        },
        contentType: {
          hidden: true,
          "default": ""
        },
        type: {
          hidden: true,
          "default": ""
        }
      }
    }
  });

}( Popcorn ));

