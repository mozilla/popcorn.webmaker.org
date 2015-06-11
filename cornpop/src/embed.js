/*! This Source Code Form is subject to the terms of the MIT license
 *  If a copy of the MIT license was not distributed with this file, you can
 *  obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

function init() {

  var stateClasses = [
        "embed-playing",
        "embed-paused",
        "embed-dialog-open"
      ],
      fullScreenedElem;

  // Sometimes we want to show the info div when we pause, sometimes
  // we don't (e.g., when we open the share dialog).
  var hideInfoDiv = false;

  /**
   * embed.js is a separate, top-level entry point into the requirejs
   * structure of src/.  We use it in order to cherry-pick modules from
   * Butter as part of our embed scripts.  The embed.js file is meant
   * to be used on its own, without butter.js, and vice versa.  See
   * tools/embed.js and tools/embed.optimized.js, and the `make embed`
   * target for more info.
   */

  function $( id ) {
    if ( typeof id !== "string" ) {
      return id;
    }
    return document.querySelector( id );
  }

  function show( elem ) {
    elem = $( elem );
    if ( !elem ) {
      return;
    }
    elem.style.display = "block";
  }

  function fullScreenEnabled() {
    var container = document.querySelector( ".video" ),
        controls;

    container.classList.add( "full-screen" );

    if ( fullScreenedElem.requestFullscreen ) {
      fullScreenedElem.removeEventListener( "fullscreenchange", fullScreenEnabled, false );
      fullScreenedElem.addEventListener( "fullscreenchange", fullScreenDisabled );
    } else if ( fullScreenedElem.mozRequestFullScreen ) {
      fullScreenedElem.removeEventListener( "mozfullscreenchange", fullScreenEnabled, false );
      fullScreenedElem.addEventListener( "mozfullscreenchange", fullScreenDisabled );
    } else if ( fullScreenedElem.webkitRequestFullscreen ) {
      fullScreenedElem.removeEventListener( "webkitfullscreenchange", fullScreenEnabled, false );
      fullScreenedElem.addEventListener( "webkitfullscreenchange", fullScreenDisabled );
    }

    // OSX has a nice fancy animation that delays the fullscreen transition, but our event still fires.
    // Because of this, we receive a "premature" innerHeight value.
    setTimeout(function() {
      controls = document.querySelector( "#controls" );
      container.style.height = window.innerHeight - controls.offsetHeight + "px";
    }, 1000 );
  }

  function fullScreenDisabled() {
    var container = document.querySelector( ".video" );

    container.classList.remove( "full-screen" );
    container.style.height = "";
    if ( fullScreenedElem.requestFullscreen ) {
      fullScreenedElem.removeEventListener( "fullscreenchange", fullScreenDisabled, false );
    } else if ( fullScreenedElem.mozRequestFullScreen ) {
      fullScreenedElem.removeEventListener( "mozfullscreenchange", fullScreenDisabled, false );
    } else if ( fullScreenedElem.webkitRequestFullscreen ) {
      fullScreenedElem.removeEventListener( "webkitfullscreenchange", fullScreenDisabled, false );
    }

    fullScreenedElem = null;
  }

  function requestFullscreen( elem ) {
    fullScreenedElem = elem;

    if ( elem.requestFullscreen ) {
      elem.addEventListener( "fullscreenchange", fullScreenEnabled );
      elem.requestFullscreen();
    } else if ( elem.mozRequestFullScreen ) {
      elem.addEventListener( "mozfullscreenchange", fullScreenEnabled );
      elem.mozRequestFullScreen();
    } else if ( elem.webkitRequestFullscreen ) {
      elem.addEventListener( "webkitfullscreenchange", fullScreenEnabled );
      elem.webkitRequestFullscreen();
    }
  }

  function isFullscreen() {
    return !((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen));
  }

  function cancelFullscreen() {
    if ( document.exitFullScreen ) {
      document.exitFullScreen();
    } else if ( document.mozCancelFullScreen ) {
      document.mozCancelFullScreen();
    } else if ( document.webkitCancelFullScreen ) {
      document.webkitCancelFullScreen();
    }
  }

  function hide( elem ) {
    elem = $( elem );
    if ( !elem ) {
      return;
    }
    elem.style.display = "none";
  }

  function shareClick( popcorn ) {
    if ( !popcorn.paused() ) {
      hideInfoDiv = true;
      popcorn.pause();
    }

    setStateClass( "embed-dialog-open" );
    hide( "#controls-big-play-button" );
    clearStateClass();
    show( "#share-container" );
  }

  function remixClick() {
    window.open( $( "#remix-post" ).href, "_blank" );
  }

  function fullscreenClick() {
    if( !isFullscreen() ) {
      requestFullscreen( document.body );
    } else {
      cancelFullscreen();
    }
  }

  function setupClickHandlers( popcorn, config ) {
    function replay() {
      popcorn.play( config.start );
    }

    $( "#replay-post" ).addEventListener( "click", replay );
    $( "#replay-share" ).addEventListener( "click", replay );
    $( "#share-post" ).addEventListener( "click", function() {
      shareClick( popcorn );
    } );
  }

  function buildIFrameHTML() {
    var src = window.location,
      // Sizes are strings: "200x400"
      shareSize = $( ".size-options .current .dimensions" ).textContent.split( "x" ),
      width = shareSize[ 0 ],
      height = shareSize[ 1 ];

    return "<iframe src='" + src + "' width='" + width + "' height='" + height +
           "' frameborder='0' mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>";
  }

  // We put the embed's cannoncial URL in a <link rel="cannoncial" href="...">
  function getCanonicalURL() {
    var links = document.querySelectorAll( "link" ),
        link;

    for ( var i = 0; i < links.length; i++ ) {
      link = links[ i ];
      if ( link.rel === "canonical" ) {
        return link.href;
      }
    }
    // Should never happen, but for lint...
    return "";
  }

  // indicate which state the post roll is in
  function setStateClass( state ) {
    var el = $( "#post-roll-container" );

    if ( el.classList.contains( state ) ) {
      return;
    }

    clearStateClass( el );

    el.classList.add( state );
  }

  // clear the state class indicator for the post roll container
  function clearStateClass( el ) {
    el = el || $( "#post-roll-container" );

    for ( var i = 0; i < stateClasses.length; i++ ) {
      el.classList.remove( stateClasses[ i ] );
    }
  }

  function setupEventHandlers( popcorn, config, analytics ) {
    var sizeOptions = document.querySelectorAll( ".option" ),
        i, l, messages;

    $( "#share-close" ).addEventListener( "click", function() {
      hide( "#share-container" );

      // If the video is done, go back to the postroll
      if ( popcorn.ended() ) {
        setStateClass( "embed-dialog-open" );
      }
    }, false );

    function sizeOptionFn( e ) {
      e.preventDefault();
      $( ".size-options .current" ).classList.remove( "current" );
      this.classList.add( "current" );
      $( "#share-iframe" ).value = buildIFrameHTML();
    }

    for ( i = 0, l = sizeOptions.length; i < l; i++ ) {
      sizeOptions[ i ].addEventListener( "click", sizeOptionFn );
    }

    popcorn.on( "ended", function() {
      analytics.event( "Media Ended", {
        nonInteraction: true,
        label: "Embed"
      });
      setStateClass( "embed-dialog-open" );
      window.parent.postMessage({
        namespace: "popcorn-embed",
        type: "ended"
      }, "*" );
    });

    popcorn.on( "pause", function() {
      if ( hideInfoDiv ) {
        setStateClass( "embed-dialog-open" );
        hideInfoDiv = false;
      } else {
        setStateClass( "embed-paused" );
      }
      window.parent.postMessage({
        namespace: "popcorn-embed",
        currentTime: popcorn.currentTime(),
        type: "pause"
      }, "*" );
    });

    popcorn.on( "play", function() {
      window.parent.postMessage({
        namespace: "popcorn-embed",
        currentTime: popcorn.currentTime(),
        type: "play"
      }, "*" );
    });

    if ( document.querySelector( ".embed" ).getAttribute( "data-state-waiting" ) ) {
      popcorn.on( "sequencesReady", function() {
        window.parent.postMessage({
          namespace: "popcorn-embed",
          type: "loadedmetadata"
        }, "*" );
      });
    } else {
      popcorn.on( "loadedmetadata", function() {
        window.parent.postMessage({
          namespace: "popcorn-embed",
          type: "loadedmetadata"
        }, "*" );
      });
    }

    popcorn.on( "durationchange", function() {
      window.parent.postMessage({
        namespace: "popcorn-embed",
        duration: popcorn.duration(),
        type: "durationchange"
      }, "*" );
    });

    popcorn.on( "timeupdate", function() {
      window.parent.postMessage({
        namespace: "popcorn-embed",
        currentTime: popcorn.currentTime(),
        type: "timeupdate"
      }, "*" );
    });

    popcorn.on( "playing", function() {
      hide( "#share-container" );
      setStateClass( "embed-playing" );
    });

    function buildOptions( data, manifest ) {
      var options = {};

      for( var option in manifest ) {
        if ( manifest.hasOwnProperty( option ) ) {
          options[ option ] = data[ option ];
        }
      }

      return options;
    }

    popcorn.on( "trackstart", function( e ) {
      window.parent.postMessage({
        namespace: "popcorn-embed",
        plugin: e.plugin,
        type: e.type,
        options: buildOptions( e, e._natives.manifest.options )
      }, "*" );
    });

    popcorn.on( "trackend", function( e ) {
      window.parent.postMessage({
        namespace: "popcorn-embed",
        plugin: e.plugin,
        type: e.type,
        options: buildOptions( e, e._natives.manifest.options )
      }, "*" );
    });

    messages = {
      play: function( data ) {
        popcorn.play( data.currentTime );
      },
      pause: function( data ) {
        popcorn.pause( data.currentTime );
      },
      currentTime: function( data ) {
        popcorn.currentTime( data.currentTime );
      }
    };

    function onMessage( e ) {
      var data = e.data,
          type = data.type,
          namespace = data.namespace,
          message = messages[ type ];
      if ( namespace !== "popcorn-embed" && message ) {
        message( data );
      }
    }

    window.addEventListener( "message", onMessage );

    function onCanPlay() {
      if ( config.autoplay ) {
        popcorn.play();
      }
    }
    popcorn.on( "canplay", onCanPlay );

    // See if Popcorn was ready before we got setup
    if ( popcorn.readyState() >= 3 && config.autoplay ) {
      popcorn.off( "canplay", onCanPlay );
      popcorn.play();
    }
  }

  var require = requirejs.config({
    baseUrl: "/src",
    paths: {
      "json": "../external/require/json",
      "text": "../external/require/text",
      "localized": "/static/bower/webmaker-i18n/localized",
      "analytics": "/static/bower/webmaker-analytics/analytics",
      "jquery": "/static/bower/jquery/dist/jquery.min",
      "ua-parser": "/static/bower/ua-parser-js/src/ua-parser.min"
    }
  });

  define("embed-main",
    [
      "util/uri",
      "util/lang",
      "ui/widget/controls",
      "ui/widget/textbox",
      "ui/resizeHandler",
      "util/mediatypes",
      "analytics",
      "text!layouts/attribution.html",
      "util/accepted-flash",
      "util/accepted-ua",
      "popcorn"
    ],
    function( URI, LangUtil, Controls, TextboxWrapper, ResizeHandler, MediaUtil, analytics, DEFAULT_LAYOUT_SNIPPETS, FLASH ) {

      var __defaultLayouts = LangUtil.domFragment( DEFAULT_LAYOUT_SNIPPETS );
      /**
       * Expose Butter so we can get version info out of the iframe doc's embed.
       * This "butter" is never meant to live in a page with the full "butter".
       * We warn then remove if this happens.
       **/
      var Butter = {
            version: "Butter-Embed-@VERSION@"
          },
          popcorn,
          resizeHandler = new ResizeHandler(),
          config,
          qs = URI.parse( window.location.href ).queryKey,
          container = document.querySelectorAll( ".container" )[ 0 ];

      /**
       * the embed can be configured via the query string:
       *   autohide   = 1{default}|0    automatically hide the controls once playing begins
       *   autoplay   = 1|{default}0    automatically play the video on load
       *   controls   = 1{default}|0    display controls
       *   start      = {integer 0-end} time to start playing (default=0)
       *   end        = {integer 0-end} time to end playing (default={end})
       *   fullscreen = 1{default}|0    whether to allow fullscreen mode (e.g., hide/show button)
       *   loop       = 1|0{default}    whether to loop when hitting the end
       *   showinfo   = 1{default}|0    whether to show video title, author, etc. before playing
       *   preload    = auto{default}|none    whether to preload the video, or wait for user action
       **/
      config = {
        autohide: qs.autohide === "1" ? true : false,
        autoplay: qs.autoplay === "1" ? true : false,
        controls: qs.controls === "0" ? false : true,
        preload: qs.preload !== "none",
        start: qs.start|0,
        end: qs.end|0,
        fullscreen: qs.fullscreen === "0" ? false : (function( document ) {
          // Check for prefixed/unprefixed Fullscreen API support
          if ( "fullScreenElement" in document ) {
            return true;
          }

          var pre = "khtml o ms webkit moz".split( " " ),
              i = pre.length,
              prefix;

          while ( i-- ) {
            prefix = pre[ i ];
            if ( (prefix + "FullscreenElement" ) in document ) {
              return true;
            }
          }
          return false;
        }( document )),
        loop: qs.loop === "1" ? true : false,
        branding: qs.branding === "0" ? false : true,
        showinfo: qs.showinfo === "0" ? false : true
      };

      resizeHandler.resize();
      window.addEventListener( "resize", resizeHandler.resize );

      Controls.create( "controls", {
        onShareClick: function() {
          shareClick( popcorn );
        },
        onRemixClick: function() {
          remixClick( popcorn );
        },
        onFullscreenClick: function() {
          fullscreenClick();
        },
        init: function( setPopcorn ) {
          // cornfield writes out the Popcorn initialization code as popcornDataFn()
          window.popcornDataFn();
          popcorn = Popcorn.byId( "Butter-Generated" );
          setPopcorn( popcorn );
          // Always show controls.  See #2284 and #2298 on supporting
          // options.controls, options.autohide.
          popcorn.controls( true );

          if ( config.loop ) {
            popcorn.loop( true );
          }

          // Either the video is ready, or we need to wait.
          if ( popcorn.readyState() >= 1 ) {
            onLoad();
          } else {
            popcorn.media.addEventListener( "canplay", onLoad );
          }

          if ( config.branding ) {
            setupClickHandlers( popcorn, config );
            setupEventHandlers( popcorn, config, analytics );

            // Wrap textboxes so they click-to-highlight and are readonly
            TextboxWrapper.applyTo( $( "#share-url" ), { readOnly: true } );
            TextboxWrapper.applyTo( $( "#share-iframe" ), { readOnly: true } );

            // Write out the iframe HTML necessary to embed this
            $( "#share-iframe" ).value = buildIFrameHTML();

            // Get the page's canonical URL and put in share URL
            $( "#share-url" ).value = getCanonicalURL();
          }

          var sequencerEvents = popcorn.data.trackEvents.where({ type: "sequencer" }),
              imageEvents = popcorn.data.trackEvents.where({ type: "image" }),
              mapEvents = popcorn.data.trackEvents.where({ type: "googlemap" }),
              attributionContainer = document.querySelector( ".attribution-details" ),
              attributionMedia = document.querySelector( ".attribution-media" ),
              toggler = $( ".attribution-logo" ),
              closeBtn = $( ".attribution-close" ),
              container = $( ".attribution-info" ),
              checkedFlashVersion;

          // Backwards compat for old layout. Removes the null media that's shown there.
          if ( attributionMedia ) {
            attributionContainer.removeChild( attributionMedia );
          }

          toggler.addEventListener( "click", function() {
            container.classList.toggle( "attribution-on" );
          } );

          closeBtn.addEventListener( "click", function() {
            container.classList.toggle( "attribution-on" );
          } );

          if ( sequencerEvents.length ) {
            var clipsContainer = __defaultLayouts.querySelector( ".attribution-media" ).cloneNode( true ),
                clipCont,
                clip,
                source,
                type;

            for ( var i = 0; i < sequencerEvents.length; i++ ) {
              clip = sequencerEvents[ i ];
              clipCont = __defaultLayouts.querySelector( ".data-container.media" ).cloneNode( true );
              source = clip.source[ 0 ];
              type = MediaUtil.checkUrl( source );

              if ( type === "YouTube" && !checkedFlashVersion ) {
                checkedFlashVersion = true;
                FLASH.warn();
              }

              if ( type === "Archive" ) {
                source = clip.linkback;
              }

              clipCont.querySelector( "span" ).classList.add( type.toLowerCase() + "-icon" );
              clipCont.querySelector( "a" ).href = source;
              clipCont.querySelector( "a" ).innerHTML = clip.title;

              clipsContainer.appendChild( clipCont );
            }

            attributionContainer.appendChild( clipsContainer );
          }

          if ( imageEvents.length ) {
            var imagesContainer = __defaultLayouts.querySelector( ".attribution-images" ).cloneNode( true ),
                imgCont,
                img,
                imgPrefix = "/resources/icons/",
                foundMatch = false;

            for ( var k = 0; k < imageEvents.length; k++ ) {
              img = imageEvents[ k ];
              imgCont = __defaultLayouts.querySelector( ".data-container.image" ).cloneNode( true );

              var href = img.photosetId || img.src || "http://www.flickr.com/search/?m=tags&q=" + img.tags,
                  text = img.src || img.photosetId || img.tags,
                  icon = document.createElement( "img" );

              icon.classList.add( "media-icon" );

              imgCont.querySelector( "a" ).href = href;
              imgCont.querySelector( "a" ).innerHTML = text;

              // We have a slight edgecase where "default" image events have all attributes
              // to support better user experience when trying different options in the image
              // plugin editor. In this scenario, they didn't change past the default single image.
              if ( img.tags && img.photosetId && img.src ) {
                img.tags = img.photosetId = "";
              }

              if ( img.tags || img.photosetId || MediaUtil.checkUrl( img.src ) === "Flickr" ) {
                foundMatch = true;
                icon.src += imgPrefix + "flickr-black.png";
                imgCont.insertBefore( icon, imgCont.firstChild );
                imagesContainer.appendChild( imgCont );
              } else if ( img.src.indexOf( "giphy" ) !== -1 ) {
                foundMatch = true;
                icon.src += imgPrefix + "giphy.png";
                imgCont.insertBefore( icon, imgCont.firstChild );
                imagesContainer.appendChild( imgCont );
              } else {
                imgCont = null;
              }
            }

            // We only care about attributing Flickr and Giphy images
            if ( foundMatch ) {
              attributionContainer.appendChild( imagesContainer );
            }
          }

          // We only need to know if a maps event exists in some fashion.
          if ( mapEvents.length ) {
            var extraAttribution = __defaultLayouts.querySelector( ".attribution-extra" ).cloneNode( true );

            extraAttribution.querySelector( ".data-container" ).innerHTML = Popcorn.manifest.googlemap.about.attribution;
            attributionContainer.appendChild( extraAttribution );
          }
        },
        preload: config.preload
      });

      // Setup UI based on config options
      if ( !config.showinfo ) {
        var embedInfo = document.getElementById( "embed-info" );
        embedInfo.parentNode.removeChild( embedInfo );
      }

      // Some config options want the video to be ready before we do anything.
      function onLoad() {
        var start = config.start,
            end = config.end;

        if ( config.fullscreen ) {
          // dispatch an event to let the controls know we want to setup a click listener for the fullscreen button
          popcorn.emit( "butter-fullscreen-allowed", container );
        }

        popcorn.off( "load", onLoad );

        // update the currentTime to the embed options start value
        // this is needed for mobile devices as attempting to listen for `canplay` or similar events
        // that let us know it is safe to update the current time seem to be futile
        function timeupdate() {
          popcorn.currentTime( start );
          popcorn.off( "timeupdate", timeupdate );
        }
        // See if we should start playing at a time other than 0.
        // We combine this logic with autoplay, since you either
        // seek+play or play or neither.
        if ( start > 0 && start < popcorn.duration() ) {
          popcorn.on( "seeked", function onSeeked() {
            popcorn.off( "seeked", onSeeked );
            if ( config.autoplay ) {
              popcorn.play();
            }
          });
          popcorn.on( "timeupdate", timeupdate );
        } else if ( config.autoplay ) {
          popcorn.play();
        }

        // See if we should pause at some time other than duration.
        if ( end > 0 && end > start && end <= popcorn.duration() ) {
          popcorn.cue( end, function() {
            popcorn.pause();
            popcorn.emit( "ended" );
          });
        }
      }

      if ( window.Butter && console && console.warn ) {
        console.warn( "Butter Warning: page already contains Butter, removing." );
        delete window.Butter;
      }
      window.Butter = Butter;
    }
  );

  require(["localized", "util/shims"], function( Localized ) {
    Localized.ready(function() {
      require([ "embed-main" ]);
    });
  });
}

document.addEventListener( "DOMContentLoaded", function() {
  // Source tree case vs. require-built case.
  if ( typeof require === "undefined" ) {
    var rscript = document.createElement( "script" );
    rscript.onload = function() {
      init();
    };
    rscript.src = "/external/require/require.js";
    document.head.appendChild( rscript );
  } else {
    init();
  }
} );
