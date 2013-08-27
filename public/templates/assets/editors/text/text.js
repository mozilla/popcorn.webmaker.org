/*global EditorHelper*/

EditorHelper.addPlugin( "text", function( trackEvent ) {
  var _container,
      _selectableContainer = trackEvent.popcornTrackEvent._innerDiv,
      target;

  _container = trackEvent.popcornTrackEvent._container;
  target = trackEvent.popcornTrackEvent._target;

  if ( window.jQuery ) {
    if ( trackEvent.popcornOptions.position === "custom" ) {
      EditorHelper.draggable( trackEvent, _container, target );
      EditorHelper.resizable( trackEvent, _container, target, {
        minWidth: 10,
        handlePositions: "e,w"
      });

      _selectableContainer = _container;
    }

    EditorHelper.selectable( trackEvent, _selectableContainer, _container );
    EditorHelper.contentEditable( trackEvent, _container.querySelectorAll( ".popcorn-text div span" ) );
  }
});
