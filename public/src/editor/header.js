/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "localized", "ui/widget/tooltip" ], function( Localized, Tooltip ) {

  return function( editorAreaDOMRoot, editorModule ) {
    var _mediaButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-media" ),
        _popcornButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-popcorn" ),
        _projectButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-share" ),
        _tutorialButton = editorAreaDOMRoot.querySelector( ".butter-editor-tutorial" ),
        _waitForMediaTooltip;

    var _focusMap = {
      "media-editor": _mediaButton,
      "plugin-list": _popcornButton,
      "project-editor": _projectButton,
      "tutorial-editor": _tutorialButton
    };

    var _currentFocus;

    // Create a message for the disabled plugin list.
    _waitForMediaTooltip = Tooltip.create({
      name: "wait-for-media",
      message: Localized.get( "Waiting for media to load" ),
      element: _popcornButton,
      top: "60px"
    });

    _mediaButton.addEventListener( "click", function() {
      editorModule.openEditor( "media-editor" );
    }, false );

    function openPluginList() {
      editorModule.openEditor( "plugin-list" );
    }

    function openProjectEditor() {
      editorModule.openEditor( "project-editor" );
    }

    _projectButton.addEventListener( "click", openProjectEditor, false );
    _tutorialButton.addEventListener( "click", function() {
      editorModule.openEditor( "tutorial-editor" );
    }, false );

    this.setFocus = function( editorName ) {
      var focusCandidate = _focusMap[ editorName ];
      if ( _currentFocus ) {
        _currentFocus.classList.remove( "butter-active" );
      }
      if ( focusCandidate ) {
        focusCandidate.classList.add( "butter-active" );
        _currentFocus = focusCandidate;
      }
    };

    Object.defineProperty( this, "focusMap", {
      enumerable: true,
      writeable: false,
      configurable: false,
      get: function() {
        return _focusMap;
      }
    });

    this.views = {
      enablePlugins: function() {
        _waitForMediaTooltip.hidden = true;
        _popcornButton.classList.remove( "butter-editor-btn-disabled" );
        _popcornButton.addEventListener( "click", openPluginList, false );
      },
      disablePlugins: function() {
        _waitForMediaTooltip.hidden = false;
        _popcornButton.classList.add( "butter-editor-btn-disabled" );
        _popcornButton.removeEventListener( "click", openPluginList, false );
      }
    };
  };
});
