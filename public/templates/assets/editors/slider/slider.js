/*global EditorHelper*/

EditorHelper.addPlugin( "slider", function( trackEvent ) {
  var _container,
      target;

  _container = trackEvent.popcornTrackEvent._container;
  target = trackEvent.popcornTrackEvent._target;

  if ( window.jQuery ) {
    EditorHelper.draggable( trackEvent, _container, target, {
      disableTooltip: true
    });
    EditorHelper.selectable( trackEvent, _container );
  }
});
