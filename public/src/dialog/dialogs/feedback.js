/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "l10n!/dialog/dialogs/feedback.html", "dialog/dialog", "util/xhr" ],
  function( LAYOUT_SRC, Dialog, xhr ) {
    Dialog.register( "feedback", LAYOUT_SRC, function ( dialog ) {
      var rootElement = dialog.rootElement,
          updateBtn = rootElement.querySelector( ".update" ),
          infoBtn = rootElement.querySelector( ".icon-info-sign" ),
          dialogInfo = rootElement.querySelector( ".dialog-info" ),
          browserSpan = rootElement.querySelector( "#browser" ),
          browserInfo = navigator.userAgent,
          dateSpan = rootElement.querySelector( "#date" ),
          dateInfo = (new Date()).toDateString(),
          commentsTextArea = rootElement.querySelector( "#comments" );

      // Show the user what we're collecting
      browserSpan.innerHTML = browserInfo;
      dateSpan.innerHTML = dateInfo;

      updateBtn.addEventListener( "click", function() {
        if( commentsTextArea.value ) {
          var commentsReport = {
            date: dateInfo,
            browser: browserInfo,
            comments: commentsTextArea.value
          };
          xhr.post( "/feedback", commentsReport );
          dialog.activity( "default-close" );
        }
      } );

      infoBtn.addEventListener( "click", function() {
        dialogInfo.classList.toggle( "dialog-hidden" );
      } );

      dialog.enableCloseButton();
      dialog.assignEscapeKey( "default-close" );
    });
});
