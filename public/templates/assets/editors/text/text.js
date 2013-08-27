/*global EditorHelper*/

EditorHelper.addPlugin( "text", function( trackEvent ) {
  var _container,
      target;

  _container = trackEvent.popcornTrackEvent._container;
  target = trackEvent.popcornTrackEvent._target;

  if ( window.jQuery ) {
    EditorHelper.draggable( trackEvent, _container, target, {
      end: function() {
        if ( trackEvent.popcornOptions.position !== "custom" ) {
          trackEvent.update({
            position: "custom"
          });
        }
      }
    });
    EditorHelper.resizable( trackEvent, _container, target, {
      minWidth: 10,
      handlePositions: "e,w",
      end: function() {
        if ( trackEvent.popcornOptions.position !== "custom" ) {
          trackEvent.update({
            position: "custom"
          });
        }
      }
    });

    EditorHelper.selectable( trackEvent, _container );
    EditorHelper.contentEditable( trackEvent, _container.querySelectorAll( ".popcorn-text div span" ) );
  }
});
