/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/lang",  "./logo-spinner", "./resizeHandler", "./toggler", "localized",
          "text!layouts/tray.html",
          "l10n!/layouts/status-area.html", "text!layouts/timeline-area.html" ],
  function( LangUtils, LogoSpinner, ResizeHandler, Toggler, Localized,
            TRAY_LAYOUT,
            STATUS_AREA_LAYOUT, TIMELINE_AREA_LAYOUT ) {

  return function( butter ){

    var _toggler,
        statusAreaFragment = LangUtils.domFragment( STATUS_AREA_LAYOUT, ".media-status-container" ),
        timelineAreaFragment = LangUtils.domFragment( TIMELINE_AREA_LAYOUT, ".butter-timeline" ),
        trayRoot = LangUtils.domFragment( TRAY_LAYOUT, ".butter-tray" ),
        timelineArea = trayRoot.querySelector( ".butter-timeline-area" ),
        trayHandle = trayRoot.querySelector( ".butter-tray-resize-handle" ),
        bodyWrapper = document.querySelector( ".body-wrapper" ),
        stageWrapper = document.querySelector( ".stage-wrapper" ),
        addTrackButton = statusAreaFragment.querySelector( "button.add-track" ),
        loadingContainer = trayRoot.querySelector( ".butter-loading-container" ),
        resizeHandler = new ResizeHandler( { margin: 26, border: 15 } ),
        trayHeight = 205,
        minHeight = 50,
        minimized = true,
        logoSpinner = new LogoSpinner( loadingContainer );

    this.statusArea = trayRoot.querySelector( ".butter-status-area" );
    this.timelineArea = timelineArea;

    trayRoot.setAttribute( "dir", document.querySelector( "html" ).dir );
    this.rootElement = trayRoot;

    this.statusArea.appendChild( statusAreaFragment );
    this.timelineArea.appendChild( timelineAreaFragment );

    LangUtils.applyTransitionEndListener( trayRoot, resizeHandler.resize );

    addTrackButton.addEventListener( "click", function() {
      butter.currentMedia.addTrack( null, true );
    } );

    this.attachToDOM = function() {
      bodyWrapper.appendChild( trayRoot );
    };

    function onTrayHandleMousedown( e ) {
      e.preventDefault();
      trayRoot.classList.remove( "butter-tray-transitions" );
      trayHandle.removeEventListener( "mousedown", onTrayHandleMousedown, false );
      window.addEventListener( "mousemove", onTrayHandleMousemove );
      window.addEventListener( "mouseup", onTrayHandleMouseup );
    }
    function onTrayHandleMousemove( e ) {
      var height = window.innerHeight - e.pageY;
      // If it is dragged to be smaller than the min,
      // instead minimize it.
      if ( height <= minHeight ) {
        minimize( true );
        return;
      } else if ( minimized ) {
        minimize( false );
      }
      if ( e.pageY < stageWrapper.offsetTop ) {
        height = window.innerHeight - stageWrapper.offsetTop;
      }
      trayRoot.style.height = height + "px";
      stageWrapper.style.bottom = height + "px";
      resizeHandler.resize();
      butter.timeline.media.verticalResize();
    }
    function onTrayHandleMouseup( e ) {
      var height = window.innerHeight - e.pageY;
      if ( e.pageY < stageWrapper.offsetTop  ) {
        height = window.innerHeight - stageWrapper.offsetTop;
      }
      // If we have a valid height, store it incase the panel is maximized.
      if ( height > minHeight ) {
        trayHeight = height;
      }
      trayRoot.classList.add( "butter-tray-transitions" );
      trayHandle.addEventListener( "mousedown", onTrayHandleMousedown );
      window.removeEventListener( "mousemove", onTrayHandleMousemove, false );
      window.removeEventListener( "mouseup", onTrayHandleMouseup, false );
    }

    trayHandle.addEventListener( "mousedown", onTrayHandleMousedown );

    this.setMediaInstance = function( mediaInstanceRootElement ) {
      var timelineContainer = timelineArea.querySelector( ".butter-timeline" );
      LangUtils.applyTransitionEndListener( trayRoot, butter.timeline.media.verticalResize );
      stageWrapper.style.bottom = trayHeight + "px";
      timelineContainer.innerHTML = "";
      timelineContainer.appendChild( mediaInstanceRootElement );
    };

    function toggleLoadingSpinner( state ) {
      if ( state ) {
        logoSpinner.start();
        loadingContainer.style.display = "block";
      } else {
        logoSpinner.stop( function() {
          loadingContainer.style.display = "none";
        });
      }
    }
    toggleLoadingSpinner( true );

    function minimize( state ) {
      _toggler.state = state;
      minimized = state;
      if ( state ) {
        document.body.classList.add( "tray-minimized" );
        trayRoot.style.height = minHeight + "px";
        stageWrapper.style.bottom = minHeight + "px";
      } else {
        document.body.classList.remove( "tray-minimized" );
        trayRoot.style.height = trayHeight + "px";
        stageWrapper.style.bottom = trayHeight + "px";
      }
    }

    _toggler = new Toggler( trayRoot.querySelector( ".butter-toggle-button" ), function () {
      minimize( !_toggler.state );
    }, Localized.get( "Show/Hide Timeline" ) );

    minimize( true );

    butter.listen( "mediaready", function onMediaReady() {
      // This function's only purpose is to avoid having
      // transitions on the tray while it's attached to the DOM,
      // since Chrome doesn't display the element where it should be on load.
      trayRoot.classList.add( "butter-tray-transitions" );
      butter.unlisten( "mediaready", onMediaReady );
      toggleLoadingSpinner( false );
      minimize( false );
      _toggler.visible = true;
    });
  };
});
