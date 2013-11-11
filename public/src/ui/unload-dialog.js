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
  };

});
