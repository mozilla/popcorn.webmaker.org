define([ "localized" ], function( Localized ) {

  return function( butter ) {
    var _projectWasSavedOnce = false;

    function areYouSure() {
      return Localized.get( "You have unsaved project data." );
    }

    butter.listen( "projectchanged", function() {
      if ( !_projectWasSavedOnce ) {
        window.onbeforeunload = areYouSure;
      }
    });

    butter.listen( "projectsaved", function() {
      _projectWasSavedOnce = true;
      window.onbeforeunload = null;
    });
  };

});
