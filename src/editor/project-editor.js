/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "localized", "editor/editor", "editor/base-editor",
          "l10n!/layouts/project-editor.html",
          "util/social-media", "ui/widget/textbox",
          "ui/widget/tooltip", "analytics" ],
  function( Localized, Editor, BaseEditor, LAYOUT_SRC, SocialMedia, TextboxWrapper, ToolTip, analytics ) {

  Editor.register( "project-editor", LAYOUT_SRC, function( rootElement, butter ) {

    var _rootElement = rootElement,
        _socialMedia = new SocialMedia(),
        _backgroundInput = _rootElement.querySelector( ".butter-project-background-colour" ),
        _colorContainer = _rootElement.querySelector( ".color-container" ),
        _viewSourceBtn = _rootElement.querySelector( ".butter-view-source-btn" ),
        _settingsTabBtn = _rootElement.querySelector( ".settings-tab-btn" ),
        _settingsContainer = _rootElement.querySelector( ".settings-container" ),
        _projectTabs = _rootElement.querySelectorAll( ".project-tab" ),
        _this = this,
        _numProjectTabs = _projectTabs.length,
        _project,
        _projectTab,
        _editorHelper = butter.editor.editorHelper,
        _idx;


    _backgroundInput.value = butter.project.background ? butter.project.background : "#FFFFFF";

    function activateProjectTab( target ) {
      var currentDataName = target.getAttribute( "data-tab-name" ),
          dataName;

      for ( var i = 0; i < _numProjectTabs; i++ ) {
        dataName = _projectTabs[ i ].getAttribute( "data-tab-name" );

        if ( dataName === currentDataName ) {
          _rootElement.querySelector( "." + dataName + "-container" ).classList.remove( "display-off" );
          target.classList.add( "butter-active" );
        } else {
          _rootElement.querySelector( "." + dataName + "-container" ).classList.add( "display-off" );
          _projectTabs[ i ].classList.remove( "butter-active" );
        }

      }

      _this.scrollbar.update();
    }

    function onProjectTabClick( e ) {
      if ( !_project.isSaved || !butter.cornfield.authenticated() ) {
        return;
      }
      activateProjectTab( e.target );
    }

    for ( _idx = 0; _idx < _numProjectTabs; _idx++ ) {
      _projectTab = _projectTabs[ _idx ];
      _projectTab.addEventListener( "click", onProjectTabClick );
    }

    butter.listen( "droppable-unsupported", function unSupported() {
      _this.setErrorState( Localized.get( "Sorry, but your browser doesn't support this feature." ) );
    });

    butter.listen( "droppable-upload-failed", function failedUpload( e ) {
      _this.setErrorState( e.data );
    });

    function shareProject() {
      if ( _project.publishUrl ) {
        // Ensure Share buttons have loaded
      }
    }

    function onProjectSaved() {
      _viewSourceBtn.href = "view-source:" + _project.iframeUrl;
      _viewSourceBtn.classList.remove( "butter-disabled" );

      shareProject();
    }

    function onLogin() {
      if ( butter.project.isSaved ) {
        onProjectSaved();
      }
    }

    function onLogout() {
      onProjectChanged();
    }

    function onProjectChanged() {
      _viewSourceBtn.classList.add( "butter-disabled" );
      activateProjectTab( _settingsTabBtn );
    }

    butter.listen( "projectsaved", onProjectSaved );
    butter.listen( "autologinsucceeded", onLogin );
    butter.listen( "authenticated", onLogin );
    butter.listen( "projectchanged", onProjectChanged );
    butter.listen( "logout", onLogout );

    _project = butter.project;

    _viewSourceBtn.onclick = function() {
      return _project.isSaved && butter.cornfield.authenticated();
    };

    Editor.BaseEditor.extend( this, butter, rootElement, {
      open: function() {

        if ( !_project.isSaved ) {
          _viewSourceBtn.classList.add( "butter-disabled" );
        }
        _viewSourceBtn.href = "view-source:" + _project.iframeUrl;

        if ( butter.cornfield.authenticated() ) {
          onLogin();
        } else {
          onLogout();
        }

        shareProject();

        _this.scrollbar.update();

      },
      close: function() {
      }
    });

    this.attachColorChangeHandler( _colorContainer, null, "background", function( te, options, message ) {
      if ( message ) {
        _this.setErrorState( message );
        return;
      } else {
        _project.background = options.background;
      }
    });
  }, true );
});
