define([ "WebmakerUI", "localized", "dialog/dialog", "util/lang", "l10n!/layouts/header.html", "ui/widget/textbox", "ui/widget/tooltip" ],
  function( WebmakerUI, Localized, Dialog, Lang, HEADER_TEMPLATE, TextBoxWrapper, ToolTip ) {

  return function( butter, options ){

    options = options || {};

    var TOOLTIP_NAME = "name-error-header-tooltip";

    var _this = this,
        _rootElement = Lang.domFragment( HEADER_TEMPLATE, ".butter-header" ),
        _bodyWrapper = document.querySelector( ".body-wrapper" ),
        _saveButton = _rootElement.querySelector( ".butter-save-btn" ),
        _projectTitle = _rootElement.querySelector( ".butter-project-title" ),
        _projectName = _projectTitle.querySelector( ".butter-project-name" ),
        _clearEvents = _rootElement.querySelector( ".butter-clear-events-btn" ),
        _removeProject = _rootElement.querySelector( ".butter-remove-project-btn" ),
        _previewBtn = _rootElement.querySelector( ".butter-preview-btn" ),
        _projectMenu = _rootElement.querySelector( ".butter-project-menu" ),
        _projectMenuControl = _rootElement.querySelector( ".butter-project-menu-control" ),
        _projectMenuList = _projectMenu.querySelector( ".butter-btn-menu" ),
        _noProjectNameToolTip,
        _projectTitlePlaceHolderText = _projectName.innerHTML,
        _toolTip, _loginTooltip,
        _langSelector = _rootElement.querySelector( ".lang-picker" );

    // URL redirector for language picker
    WebmakerUI.langPicker( _langSelector );

    // create a tooltip for the plrojectName element
    _toolTip = ToolTip.create({
      title: "header-title-tooltip",
      message: Localized.get( "Change the name of your project" ),
      element: _projectTitle,
      top: "60px"
    });

    // Default state
    _toolTip.hidden = true;

    _loginTooltip = ToolTip.create({
      title: "header-title-tooltip",
      message: Localized.get( "Login to save your project!" ),
      element: _projectTitle,
      top: "60px"
    });

    _this.element = _rootElement;

    ToolTip.apply( _projectTitle );

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

    function saveProject() {
      function afterSave() {
        butter.editor.openEditor( "project-editor" );
        togglePreviewButton( true );
        toggleProjectNameListeners( true );
        toggleDeleteProject( true );
      }

      if ( butter.project.isSaved ) {
        return;
      } else if ( !checkProjectName( butter.project.name ) ) {
        nameError();
      } else {
        if ( !butter.project.isSaved ) {
          toggleSaveButton( false );

          butter.project.save(function( e ) {
            if ( e.error === "okay" ) {
              afterSave();
              return;
            } else {
              toggleSaveButton( true );
              togglePreviewButton( false );
              toggleProjectNameListeners( true );
              showErrorDialog( Localized.get( "There was a problem saving your project" ) );
            }
          });
        } else {
          afterSave();
        }
      }
    }

    function openProjectEditor() {
      butter.editor.openEditor( "project-editor" );
    }

    function toggleSaveButton( on ) {
      if ( on ) {
        _saveButton.classList.remove( "butter-disabled" );
        _saveButton.addEventListener( "click", saveProject, false );
      } else {
        _saveButton.classList.add( "butter-disabled" );
        _saveButton.removeEventListener( "click", saveProject, false );
      }
    }

    function togglePreviewButton( on ) {
      if ( on ) {
        _previewBtn.classList.remove( "butter-disabled" );
        _previewBtn.href = butter.project.publishUrl;
        _previewBtn.onclick = function() {
          return true;
        };
      } else {
        _previewBtn.classList.add( "butter-disabled" );
        _previewBtn.href = "";
        _previewBtn.onclick = function() {
          return false;
        };
      }
    }

    function toggleProjectNameListeners( state, tooltipIgnore ) {
      if ( state ) {
        _projectTitle.addEventListener( "click", projectNameClick, false );
        _projectName.classList.remove( "butter-disabled" );
        _projectName.addEventListener( "click", projectNameClick, false );
      } else {
        _projectTitle.removeEventListener( "click", projectNameClick, false );
        _projectName.removeEventListener( "click", projectNameClick, false );
        _projectName.classList.add( "butter-disabled" );
      }

      if ( !tooltipIgnore ) {
        _loginTooltip.hidden = state;
        _toolTip.hidden = !state;
      }
    }

    function removeProject() {
      butter.project.remove(function( e ) {

        if ( e.error === "okay" ) {
          butter.ui.unloadDialog.toggle( false );
          window.history.replaceState( {}, "", "/" + Localized.getCurrentLang() + "/editor/" );
          window.location.reload();
        } else {
          showErrorDialog( Localized.get( "There was a problem saving your project" ) );
        }
      });
    }

    function toggleDeleteProject( state ) {
      if ( state ) {
        _removeProject.addEventListener( "click", removeProject, false );
        _removeProject.classList.remove( "butter-disabled" );
      } else {
        _removeProject.removeEventListener( "click", removeProject, false );
        _removeProject.classList.add( "butter-disabled" );
      }
    }

    function projectNameClick() {
      var input = document.createElement( "input" );

      input.type = "text";

      input.placeholder = _projectTitlePlaceHolderText;
      input.classList.add( "butter-project-name" );
      input.value = _projectName.textContent !== _projectTitlePlaceHolderText ? _projectName.textContent : "";
      TextBoxWrapper.applyTo( input );
      _projectTitle.replaceChild( input, _projectName );
      toggleProjectNameListeners( false, true );
      input.focus();
      input.addEventListener( "blur", onBlur, false );
      input.addEventListener( "keypress", onKeyPress, false );
    }

    function clearEventsClick() {
      var dialog;
      if ( butter.currentMedia && butter.currentMedia.hasTrackEvents() ) {
        dialog = Dialog.spawn( "delete-track-events", {
          data: butter
        });
        dialog.open();
      }
    }

    this.views = {
      dirty: function() {
        togglePreviewButton( false );
        toggleSaveButton( butter.cornfield.authenticated() );
      },
      clean: function() {
        togglePreviewButton( true );
        toggleSaveButton( false );
      },
      login: function() {
        var isSaved = butter.project.isSaved;

        toggleProjectNameListeners( butter.cornfield.authenticated() );
        togglePreviewButton( isSaved );
        toggleSaveButton( !isSaved && butter.cornfield.authenticated() );
        toggleDeleteProject( isSaved && butter.cornfield.authenticated() );
      },
      logout: function() {
        togglePreviewButton( false );
        toggleSaveButton( false );
        toggleProjectNameListeners( false );
      }
    };

    function destroyToolTip() {
      if ( _noProjectNameToolTip && !_noProjectNameToolTip.destroyed ) {
        _projectTitle.removeEventListener( "mouseover", destroyToolTip, false );
        _noProjectNameToolTip.destroy();
      }
    }

    function onKeyPress( e ) {
      var node = _projectTitle.querySelector( ".butter-project-name" );

      // if this wasn't the 'enter' key, return early
      if ( e.keyCode !== 13 ) {
        return;
      }

      node.blur();
      node.removeEventListener( "keypress", onKeyPress, false );
    }

    /*
     * Function: checkProjectName
     *
     * Checks whether the current projects name is a valid one or not.
     * @returns boolean value representing whether or not the current project name is valid
     */
    function checkProjectName( name ) {
      return !!name && name !== _projectTitlePlaceHolderText;
    }

    function nameError() {
      destroyToolTip();

      _projectTitle.addEventListener( "mouseover", destroyToolTip, false );

      _noProjectNameToolTip = ToolTip.create({
        name: TOOLTIP_NAME,
        message: Localized.get( "Please give your project a name before saving" ),
        hidden: false,
        hover: false,
        element: _projectTitle,
        top: "60px",
        error: true
      });
    }

    function onBlur() {
      var node = _projectTitle.querySelector( ".butter-project-name" );
      node.removeEventListener( "blur", onBlur, false );

      _projectName.textContent = node.value || _projectTitlePlaceHolderText;
      if( checkProjectName( _projectName.textContent ) ) {
        butter.project.name = _projectName.textContent;
        saveProject();
      } else {
        nameError();
        toggleProjectNameListeners( true );
      }

      _projectTitle.replaceChild( _projectName, node );
    }

    this.attachToDOM = function() {
      document.body.classList.add( "butter-header-spacing" );
      document.body.insertBefore( _rootElement, document.body.firstChild );

      loadDashboard();
    };

    butter.listen( "authenticated", _this.views.login, false );
    butter.listen( "logout", _this.views.logout, false );

    butter.listen( "projectsaved", function() {
      // Disable "Save" button
      _this.views.clean();
      toggleDeleteProject( true );
      _projectName.textContent = butter.project.name;
    });

    butter.listen( "projectchanged", function() {
      // Re-enable "Save" button to indicate things are not saved
      _this.views.dirty();
    });

    function loadDashboard() {
      var myProjectsButton = document.querySelector( ".my-makes" ),
          container = document.querySelector( ".my-projects-container" ),
          iframe = document.querySelector( ".my-projects-iframe" );

     function close() {
        myProjectsButton.addEventListener( "click", open, false );
        myProjectsButton.removeEventListener( "click", close, false );

        container.classList.remove( "open" );
        iframe.style.height = "";
      }

      function open() {
        myProjectsButton.addEventListener( "click", close, false );
        myProjectsButton.removeEventListener( "click", open, false );

        container.classList.add( "open" );
        iframe.style.height = "300px";
        iframe.src = "/dashboard/" + Localized.getCurrentLang();
      }

      myProjectsButton.addEventListener( "click", open, false );
    }

    butter.listen( "ready", function() {
      if ( butter.project.name && ( butter.project.id || butter.project.isRemix ) ) {
        _projectName.textContent = butter.project.name;
      }

      if ( !butter.cornfield.authenticated() ) {
        toggleProjectNameListeners( false );
        togglePreviewButton( false );
        toggleSaveButton( false );
        toggleDeleteProject( false );
      }
      _clearEvents.addEventListener( "click", clearEventsClick, false );
    });
  };
});
