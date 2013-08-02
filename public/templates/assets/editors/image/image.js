/*global EditorHelper*/

EditorHelper.addPlugin( "image", function( trackEvent ) {

  var _popcornOptions = trackEvent.popcornTrackEvent,
      _container = _popcornOptions._container,
      _target = _popcornOptions._target;

  if ( window.jQuery ) {

    if ( _popcornOptions.src ) {
      window.EditorHelper.droppable( trackEvent, _container );
    }

    window.EditorHelper.selectable( trackEvent, _container );
    window.EditorHelper.draggable( trackEvent, _container, _target, {
      tooltip: "Drag an image from your desktop",
      editable: false
    });
    window.EditorHelper.resizable( trackEvent, _container, _target, {
      minWidth: 5,
      minHeight: 5,
      handlePositions: "n,ne,e,se,s,sw,w,nw"
    });
  }
});
