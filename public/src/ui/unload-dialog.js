define([ "localized" ], function( Localized ) {

  return function( butter ) {

    function areYouSure() {
      return Localized.get( "You have unsaved project data." );
    }

    butter.listen( "projectchanged", function() {
      window.onbeforeunload = areYouSure;
    });

    butter.listen( "projectsaved", function() {
      window.onbeforeunload = null;
    });

    // Used when a project is loaded from backups. Prevents user
    // from leaving page immediately.
    this.turnOnDialog = function() {
      window.onbeforeunload = areYouSure;
    };
  };

});
