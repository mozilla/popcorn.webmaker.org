/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/lang", "util/uri", "util/keys", "util/mediatypes", "editor/editor",
 "util/time", "util/dragndrop", "text!layouts/tutorial-editor.html" ],
  function( LangUtils, URI, KeysUtils, MediaUtils, Editor, Time, DragNDrop, EDITOR_LAYOUT ) {

  var _parentElement =  LangUtils.domFragment( EDITOR_LAYOUT, ".tutorial-editor" );

  Editor.register( "tutorial-editor", null, function( rootElement, butter ) {
    var _this = this,
        _butter = butter,
        _tutorialData = null;

    Editor.BaseEditor.extend( _this, _butter, _parentElement, {
      open: function( element, options ) {
        if ( _tutorialData ) {
          return;
        }
        _tutorialData = options.tutorialData;
        var iframe = _parentElement.querySelector( ".tutorial-iframe" ),
            viewTitle = _parentElement.querySelector( ".tutorial-view-title" ),
            select = _parentElement.querySelector( ".tutorial-list" );
        document.querySelector( ".butter-editor-tutorial" ).classList.remove( "hidden" );

        var selectTutorialItem = function( index ) {
          select.selectedIndex = 0;
          iframe.src = _tutorialData[ index ].url + "?details=hidden";
        };

        var createTutorialItem = function( item ) {
          var option = document.createElement( "option" );
          option.innerHTML = item.title;
          option.value = item.url + "?details=hidden";
          select.appendChild( option );
        };

        for ( var i = 0; i < _tutorialData.length; i++ ) {
          createTutorialItem( _tutorialData[ i ] );
        }

        select.addEventListener( "change", function( e ) {
          iframe.src = e.target.value;
        }, false );
        selectTutorialItem( 0 );
      },
      close: function() {}
    });

  }, true );
});
