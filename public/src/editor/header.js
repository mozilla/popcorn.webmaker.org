/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "ui/widget/tooltip" ], function( Tooltip ) {

  return function( editorAreaDOMRoot, editorModule, saveFunction ) {
    var _mediaButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-media" ),
        _popcornButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-popcorn" ),
        _reviewPublishButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-review-publish" ),
        _loginToSaveTooltip,
        _waitForMediaTooltip;

    var _focusMap = {
      "media-editor": _mediaButton,
      "plugin-list": _popcornButton,
      "project-editor": _reviewPublishButton
    };

    var _currentFocus;

    // Create a message for the disabled share editor.
    // Note: this can return null if the `login-to-share` Tooltip isn't registered
    // (e.g. in tests). So, null checks need to be performed below.
    _loginToSaveTooltip = Tooltip.create({
      name: "login-to-share",
      message: "Login to save your project",
      element: _reviewPublishButton,
      top: "60px"
    });

    // Create a message for the disabled plugin list.
    _waitForMediaTooltip = Tooltip.create({
      name: "wait-for-media",
      message: "Waiting for media to load",
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

    function saveAndOpen() {
      saveFunction(openProjectEditor);
    }

    _popcornButton.classList.add( "butter-editor-btn-disabled" );

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
      disableProjectEditor: function() {
        _loginToSaveTooltip.classList.remove( "tooltip-off" );
        _reviewPublishButton.classList.add( "butter-editor-btn-disabled" );
        _reviewPublishButton.removeEventListener( "click", openProjectEditor, false );
        // If the project editor is open, open the media editor instead.
        if ( _currentFocus === _reviewPublishButton ) {
          editorModule.openEditor( "media-editor" );
        }
      },
      savedProject: function() {
        _loginToSaveTooltip.classList.add( "tooltip-off" );
        _reviewPublishButton.classList.remove( "butter-editor-btn-disabled" );
        _reviewPublishButton.removeEventListener( "click", saveFunction, false );
        _reviewPublishButton.addEventListener( "click", openProjectEditor, false );
      },
      unsavedProject: function() {
        _loginToSaveTooltip.classList.add( "tooltip-off" );
        _reviewPublishButton.classList.remove( "butter-editor-btn-disabled" );
        _reviewPublishButton.addEventListener( "click", saveAndOpen, false );
      },
      enablePlugins: function() {
        _waitForMediaTooltip.classList.add( "tooltip-off" );
        _popcornButton.classList.remove( "butter-editor-btn-disabled" );
        _popcornButton.addEventListener( "click", openPluginList, false );
      },
      disablePlugins: function() {
        _waitForMediaTooltip.classList.remove( "tooltip-off" );
        _popcornButton.classList.add( "butter-editor-btn-disabled" );
        _popcornButton.removeEventListener( "click", openPluginList, false );
      }
    };

  };

});
