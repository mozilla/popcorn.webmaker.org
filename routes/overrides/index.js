module.exports = function( app ) {
  var routes = [
    "/layouts/status-area.html",
    "/layouts/media-editor.html",
    "/layouts/media-instance.html",
    "/layouts/project-editor.html",
    "/editors/default.html",
    "/layouts/editor-area.html",
    "/layouts/plugin-list-editor.html",
    "/layouts/sequencer-editor.html",
    "/layouts/trackevent-editor-defaults.html",
    "/dialog/dialogs/backup.html",
    "/dialog/dialogs/crash.html",
    "/dialog/dialogs/delete-track-events.html",
    "/dialog/dialogs/delete-track.html",
    "/dialog/dialogs/error-message.html",
    "/dialog/dialogs/feedback.html",
    "/dialog/dialogs/first-run.html",
    "/dialog/dialogs/track-data.html",
    "/dialog/dialogs/remove-project.html",
    "/plugins/googlemap-editor.html",
    "/plugins/popup-editor.html",
    "/plugins/image-editor.html",
    "/plugins/text-editor.html",
    "/plugins/wikipedia-editor.html",
    "/plugins/sketchfab-editor.html"
  ];

  routes.forEach( function ( view ) {
    app.get( view, function ( req, res ) {
      res.render( view );
    });
  });

};
