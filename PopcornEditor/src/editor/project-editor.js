/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "editor/editor", "editor/base-editor",
          "l10n!../../{{lang}}/layouts/project-editor.html",
          "util/social-media", "ui/widget/textbox",
          "ui/widget/tooltip", "analytics" ],
  function( Editor, BaseEditor, LAYOUT_SRC, SocialMedia, TextboxWrapper, ToolTip, analytics ) {

  Editor.register( "project-editor", LAYOUT_SRC, function( rootElement, butter ) {

    var _rootElement = rootElement,
        _socialMedia = new SocialMedia(),
        _backgroundInput = _rootElement.querySelector( ".butter-project-background-colour" ),
        _colorContainer = _rootElement.querySelector( ".color-container" ),
        _viewSourceBtn = _rootElement.querySelector( ".butter-view-source-btn" ),
        _settingsTabBtn = _rootElement.querySelector( ".settings-tab-btn" ),
        _saveButton = _rootElement.querySelector( ".butter-save-btn" ),
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
      if ( !_project.isSaved ) {
        return;
      }
      activateProjectTab( e.target );
    }

    for ( _idx = 0; _idx < _numProjectTabs; _idx++ ) {
      _projectTab = _projectTabs[ _idx ];
      _projectTab.addEventListener( "click", onProjectTabClick );
    }

    butter.listen( "droppable-unsupported", function unSupported() {
      _this.setErrorState( "Sorry, but your browser doesn't support this feature." );
    });

    butter.listen( "droppable-upload-failed", function failedUpload( e ) {
      _this.setErrorState( e.data );
    });

    function shareProject() {
      if ( _project.publishUrl ) {
        // Ensure Share buttons have loaded
      }
    }

    function afterSave() {
      toggleSaving( true );
      toggleSaveButton( false );
    }

    function submitSave() {
      toggleSaving( false );
      _saveButton.textContent = "Saving";

      // Check box decides save or publish, for now, save then publish in afterSave...
      butter.project.save(function( e ) {
        if ( e.status === "okay" ) {
          afterSave();
          return;
        } else {
          toggleSaveButton( true );
          butter.project.useBackup();
          showErrorDialog( "There was a problem saving your project" );
        }
      });
    }

    function saveProject() {
      if ( butter.project.isSaved ) {
        return;
      } else {
        submitSave();
      }
    }

    function toggleSaveButton( on ) {
      if ( butter.project.isSaved ) {
        _saveButton.textContent = "Saved";
      } else {
        _saveButton.textContent = "Save";
      }
      if ( on ) {
        _saveButton.classList.remove( "butter-disabled" );
      } else {
        _saveButton.classList.add( "butter-disabled" );
      }

      butter.project.isSaved = !butter.project.isSaved;
    }

    function toggleSaving( on ) {
      if ( on ) {
        _saveButton.classList.remove( "butter-button-waiting" );
        _saveButton.addEventListener( "click", saveProject );
      } else {
        _saveButton.classList.add( "butter-button-waiting" );
        _saveButton.removeEventListener( "click", saveProject, false );
      }
    }

    function showErrorDialog( message ) {
      var dialog = Dialog.spawn( "error-message", {
        data: message,
        events: {
          cancel: function() {
            dialog.close();
          }
        }
      });
      dialog.open();
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
    _saveButton.addEventListener( "click", saveProject );
    butter.listen( "logout", onLogout );

    _project = butter.project;

    _viewSourceBtn.onclick = function() {
      return _project.isSaved;
    };

    Editor.BaseEditor.extend( this, butter, rootElement, {
      open: function() {

        if ( !_project.isSaved ) {
          _viewSourceBtn.classList.add( "butter-disabled" );
        }
        _viewSourceBtn.href = "view-source:" + _project.iframeUrl;

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
