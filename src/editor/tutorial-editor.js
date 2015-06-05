/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/lang", "editor/editor", "text!layouts/tutorial-editor.html" ],
  function( LangUtils, Editor, EDITOR_LAYOUT ) {

  var _parentElement =  LangUtils.domFragment( EDITOR_LAYOUT,".tutorial-editor" ),
      _tutorialButton,
      _select,
      _items = [],
      _iframe;

  function selectTutorialItem( index ) {
    _select.selectedIndex = 0;
    _iframe.src = _items[ index ].url;
  }

  function createTutorialItem( item ) {
    var option = document.createElement( "option" );
    _items.push( item );
    option.innerHTML = item.title;
    option.value = item.url;
    _select.appendChild( option );
  }

  Editor.register( "tutorial-editor", null, function( rootElement, butter ) {
    rootElement = _parentElement;
    _tutorialButton = document.querySelector( ".butter-editor-tutorial" );
    _select = rootElement.querySelector( ".tutorial-list" );
    _iframe = rootElement.querySelector( ".tutorial-iframe" );

    _select.addEventListener( "change", function( e ) {
      _iframe.src = e.target.value;
    } );

    Editor.BaseEditor.extend( this, butter, rootElement, {
      open: function( element, results ) {
        if ( !results ) {
          return;
        }
        _tutorialButton.classList.remove( "butter-hidden" );

        for ( var i = 0; i < results.length; i++ ) {
          createTutorialItem( results[ i ] );
        }
        selectTutorialItem( 0 );
      },
      close: function() {}
    });

  }, true );
});
