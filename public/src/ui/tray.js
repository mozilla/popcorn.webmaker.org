/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/lang",  "./logo-spinner", "./resizeHandler",
          "text!layouts/tray.html",
          "l10n!/layouts/status-area.html", "text!layouts/timeline-area.html" ],
  function( LangUtils, LogoSpinner, ResizeHandler,
            TRAY_LAYOUT,
            STATUS_AREA_LAYOUT, TIMELINE_AREA_LAYOUT ) {

  return function( butter ){

    var statusAreaFragment = LangUtils.domFragment( STATUS_AREA_LAYOUT, ".media-status-container" ),
        timelineAreaFragment = LangUtils.domFragment( TIMELINE_AREA_LAYOUT, ".butter-timeline" ),
        trayRoot = LangUtils.domFragment( TRAY_LAYOUT, ".butter-tray" ),
        timelineArea = trayRoot.querySelector( ".butter-timeline-area" ),
        trayHandle = trayRoot.querySelector( ".butter-tray-resize-handle" ),
        bodyWrapper = document.querySelector( ".body-wrapper" ),
        addTrackButton = statusAreaFragment.querySelector( "button.add-track" ),
        loadingContainer = trayRoot.querySelector( ".butter-loading-container" ),
        resizeHandler = new ResizeHandler( { margin: 26, border: 15 } ),
        trayHeight = 0,
        minHeight = 0,
        logoSpinner = new LogoSpinner( loadingContainer );

    this.statusArea = trayRoot.querySelector( ".butter-status-area" );
    this.timelineArea = timelineArea;

    this.rootElement = trayRoot;

    this.statusArea.appendChild( statusAreaFragment );
    this.timelineArea.appendChild( timelineAreaFragment );

    LangUtils.applyTransitionEndListener( trayRoot, resizeHandler.resize );

    addTrackButton.addEventListener( "click", function() {
      butter.currentMedia.addTrack( null, true );
    }, false );

    this.attachToDOM = function() {
      document.body.appendChild( trayRoot );
    };

    this.show = function() {
      // This function's only purpose is to avoid having transitions on the tray while it's attached to the DOM,
      // since Chrome doesn't display the element where it should be on load.
      trayRoot.classList.add( "butter-tray-transitions" );
    };

    function onTrayHandleMousedown( e ) {
      e.preventDefault();
      trayHandle.removeEventListener( "mousedown", onTrayHandleMousedown, false );
      window.addEventListener( "mousemove", onTrayHandleMousemove, false );
      window.addEventListener( "mouseup", onTrayHandleMouseup, false );
    }
    function onTrayHandleMousemove( e ) {
      trayHeight = window.innerHeight - e.pageY;
      if ( trayHeight < minHeight ) {
        trayHeight = minHeight;
      }
      if ( e.pageY < bodyWrapper.offsetTop ) {
        trayHeight = window.innerHeight - bodyWrapper.offsetTop;
      }
      trayRoot.style.height = trayHeight + "px";
      bodyWrapper.style.bottom = trayHeight + "px";
      resizeHandler.resize();
      butter.timeline.media.resize();
    }
    function onTrayHandleMouseup() {
      trayHandle.addEventListener( "mousedown", onTrayHandleMousedown, false );
      window.removeEventListener( "mousemove", onTrayHandleMousemove, false );
      window.removeEventListener( "mouseup", onTrayHandleMouseup, false );
    }

    trayHandle.addEventListener( "mousedown", onTrayHandleMousedown, false );

    this.setMediaInstance = function( mediaInstanceRootElement ) {
      var timelineContainer = this.timelineArea.querySelector( ".butter-timeline" );
      trayHeight = trayRoot.offsetHeight;
      minHeight = trayHeight - timelineArea.offsetHeight;
      bodyWrapper.style.bottom = trayHeight + "px";
      timelineContainer.innerHTML = "";
      timelineContainer.appendChild( mediaInstanceRootElement );
    };

    this.toggleLoadingSpinner = function( state ) {
      if ( state ) {
        logoSpinner.start();
        loadingContainer.style.display = "block";
      }
      else {
        logoSpinner.stop( function() {
          loadingContainer.style.display = "none";
        });
      }
    };

    Object.defineProperties( this, {
      minimized: {
        enumerable: true,
        set: function( val ) {
          if ( val ) {
            document.body.classList.add( "tray-minimized" );
            trayRoot.classList.add( "butter-tray-minimized" );
            trayRoot.style.bottom = -this.timelineArea.offsetHeight + "px";
            trayHeight = trayRoot.offsetHeight;
            bodyWrapper.style.bottom = trayHeight - this.timelineArea.offsetHeight + "px";
            trayHandle.removeEventListener( "mousedown", onTrayHandleMousedown, false );
          }
          else {
            document.body.classList.remove( "tray-minimized" );
            trayRoot.classList.remove( "butter-tray-minimized" );
            trayHandle.addEventListener( "mousedown", onTrayHandleMousedown, false );
            if ( trayHeight ) {
              trayRoot.style.height = trayHeight + "px";
              bodyWrapper.style.bottom = trayHeight + "px";
            }
            trayRoot.style.bottom = "0";
          }
        },
        get: function() {
          return trayRoot.classList.contains( "butter-tray-minimized" );
        }
      }
    });

  };

});
