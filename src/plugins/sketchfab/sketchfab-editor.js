/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

( function( Butter ) {

  Butter.Editor.register( "sketchfab", "load!{{baseDir}}plugins/sketchfab-editor.html",
    function( rootElement, butter ) {

    var _this = this;

    var _rootElement = rootElement,
        _trackEvent;

    function onTrackEventUpdated( e ) {
      _trackEvent = e.target;
      _this.updatePropertiesFromManifest( _trackEvent );
      _this.setErrorState( false );
    }

    function updateTrackEvent( te, prop ) {
      _this.setErrorState( false );
      _this.updateTrackEventSafe( te, prop );
    }

    // Extend this object to become a BaseEditor
    Butter.Editor.TrackEventEditor.extend( _this, butter, rootElement, {
      open: function( parentElement, trackEvent ) {
        _trackEvent = trackEvent;

        var optionsContainer = _rootElement.querySelector( ".editor-options" );

        optionsContainer.appendChild( _this.createStartEndInputs( trackEvent, updateTrackEvent ) );

        _this.createPropertiesFromManifest({
          trackEvent: trackEvent,
          basicContainer: optionsContainer,
          ignoreManifestKeys: [ "target", "start", "end" ],
          callback: function( elementType, element ) {
            var handlerMap = {
              select: "attachSelectChangeHandler",
              checkbox: "attachCheckboxChangeHandler"
            };

            // Waterfall handler identification: handlerMap[input|select] -> handlerMap[checkbox] -> "attachInputChangeHandler"
            var handlerFunction = handlerMap[ elementType ] || handlerMap[ element.type ] || "attachInputChangeHandler";
            _this[ handlerFunction ]( element, _trackEvent, element.getAttribute( "data-manifest-key" ), updateTrackEvent );
          }
        });

        optionsContainer.appendChild( _this.createSetAsDefaultsButton( trackEvent ) );
        _this.updatePropertiesFromManifest( trackEvent );
        _this.scrollbar.update();

        _this.setTrackEventUpdateErrorCallback( _this.setErrorState );

        trackEvent.listen( "trackeventupdated", onTrackEventUpdated );
      },
      close: function() {
        _trackEvent.unlisten( "trackeventupdated", onTrackEventUpdated );
      }
    });
  }, false, function( trackEvent ) {
    var popcornOptions = trackEvent.popcornTrackEvent,
        container = popcornOptions._container,
        target = popcornOptions._target;

    this.draggable( trackEvent, container, target, {
      tooltip: Butter.localized.get( "Double click to interact" )
    });

    this.resizable( trackEvent, container, target, {
      minWidth: 40,
      minHeight: 40,
      handlePositions: "n,ne,e,se,s,sw,w,nw"
    });

    this.selectable( trackEvent, container );
  });
}( window.Butter ));
