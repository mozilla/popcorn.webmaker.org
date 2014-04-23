/* This Source Code Form is subject to the terms of the MIT license
 *  * If a copy of the MIT license was not distributed with this file, you can
 *  * obtain one at http://www.mozillapopcorn.org/butter-license.txt */

define( [ "localized", "l10n!/dialog/dialogs/backup.html", "dialog/dialog", "util/time" ],
  function( Localized, LAYOUT_SRC, Dialog, TimeUtil ) {

    function replaceProjectName( name, elements ) {
      for ( var i = 0, l = elements.length; i < l; i++ ) {
        elements[ i ].innerHTML = name;
      }
    }

    function fireAndCloseFn( fn, dialog ) {
      return function() {
        fn();
        dialog.activity( "default-close" );
      };
    }

    Dialog.register( "backup", LAYOUT_SRC, function ( dialog, data ) {

      var rootElement = dialog.rootElement,
          projectNameSpans = rootElement.querySelectorAll( ".butter-backup-project-name" ),
          backupDateSpan = rootElement.querySelector( ".butter-backup-date" ),
          backupLoadBtn = rootElement.querySelector( ".butter-backup-load" ),
          backupDiscardBtn = rootElement.querySelector( ".butter-backup-discard" ),
          loadProject = fireAndCloseFn( data.loadProject, dialog ),
          discardProject = fireAndCloseFn( data.discardProject, dialog ),
          projectName = data.projectName || "Unsaved Project";

      backupLoadBtn.addEventListener( "click", loadProject );
      backupDiscardBtn.addEventListener( "click", discardProject );

      // Show useful time info, for example: "5 minutes ago"
      backupDateSpan.innerHTML = TimeUtil.toPrettyString( Date.now() - data.backupDate ) + " " + Localized.get( "ago" );

      // Give the user info about the project we have in backup via name
      replaceProjectName( projectName, projectNameSpans );
    });
});
