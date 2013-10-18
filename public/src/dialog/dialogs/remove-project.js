define([ "l10n!/dialog/dialogs/remove-project.html", "dialog/dialog" ],
  function( LAYOUT_SRC, Dialog ){

  Dialog.register( "remove-project", LAYOUT_SRC, function( dialog, data ) {
    var callback = data.callback || function(){};

    dialog.registerActivity( "ok", function(){
      dialog.send( "ok" );
      dialog.activity( "default-close" );
      callback();
    });

    dialog.enableElements( ".yes", ".no" );
    dialog.enableCloseButton();
    dialog.assignEscapeKey( "default-close" );
    dialog.assignEnterKey( "ok" );
    dialog.assignButton( ".yes", "ok" );
    dialog.assignButton( ".no", "default-close" );
  });
});