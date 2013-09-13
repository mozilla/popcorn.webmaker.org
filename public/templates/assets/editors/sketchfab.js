/*global EditorHelper*/

EditorHelper.addPlugin( "sketchfab", function( trackEvent ) {
  var popcornOptions = trackEvent.popcornTrackEvent,
      container = popcornOptions._container,
      target = popcornOptions._target;

  EditorHelper.draggable( trackEvent, container, target, {
    tooltip: "Double click to interact"
  });

  EditorHelper.resizable( trackEvent, container, target, {
    minWidth: 40,
    minHeight: 40,
    handlePositions: "n,ne,e,se,s,sw,w"
  });

});
