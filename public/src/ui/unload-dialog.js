define([ "localized" ], function( Localized ) {

  return function( butter ) {

    // We only want to nag users about this if they've never saved at all,
    // since our project backups start automatically after the user clicks
    // Save the first time.  Once they've saved, if they exit, they either saved
    // or we have a backup and can restore on reload.
    var _projectWasSavedOnce = false;

    function areYouSure() {
      return Localized.get( "You have unsaved project data." );
    }

    function projectChanged() {
      if ( !_projectWasSavedOnce ) {
        window.onbeforeunload = areYouSure;
      }
    }

    function projectSaved() {
      _projectWasSavedOnce = true;
      window.onbeforeunload = null;
    }

    this.toggle = function( state ) {
      if ( state ) {
        butter.listen( "projectsaved", projectSaved );
        butter.listen( "projectchanged", projectChanged );
      } else {
        butter.unlisten( "projectsaved", projectSaved );
        butter.unlisten( "projectchanged", projectChanged );
        window.onbeforeunload = null;
      }
    };
  };

});
