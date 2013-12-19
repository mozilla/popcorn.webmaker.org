/*globals TogetherJS*/
define([ "WebmakerUI", "localized", "dialog/dialog", "util/lang", "l10n!/layouts/header.html", "ui/widget/textbox", "ui/widget/tooltip",
         "ui/widget/ProjectDetails", "util/togetherjs-syncer" ],
  function( WebmakerUI, Localized, Dialog, Lang, HEADER_TEMPLATE, TextBoxWrapper, ToolTip, ProjectDetails, TogetherJSSyncer ) {

  return function( butter, options ){

    options = options || {};

    var TOOLTIP_NAME = "name-error-header-tooltip";

    var _this = this,
        _rootElement = Lang.domFragment( HEADER_TEMPLATE, ".butter-header" ),
        _saveButton = _rootElement.querySelector( ".butter-save-btn" ),
        _projectTitle = _rootElement.querySelector( ".butter-project-title" ),
        _projectName = _projectTitle.querySelector( ".butter-project-name" ),
        _clearEvents = _rootElement.querySelector( ".butter-clear-events-btn" ),
        _removeProject = _rootElement.querySelector( ".butter-remove-project-btn" ),
        _previewBtn = _rootElement.querySelector( ".butter-preview-btn" ),
        _noProjectNameToolTip,
        _makeDetails = _rootElement.querySelector( "#make-details" ),
        _projectTitlePlaceHolderText = _projectName.innerHTML,
        _toolTip, _loginTooltip,
        _projectDetails = new ProjectDetails( butter ),
        _togetherJS,
        _langSelector = _rootElement.querySelector( "#lang-picker" ),
        _togetherjsBtn = _rootElement.querySelector( ".together-toggle" ),
        _togetherJSSyncer;

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

    // Feature flag might not be enabled.
    if ( _togetherjsBtn ) {
      _togetherJSSyncer = new TogetherJSSyncer( butter );

      var toggleTogether = function( started ) {
        return function() {
          _togetherjsBtn.innerHTML = started ? Localized.get( "Go it alone" ) : Localized.get( "Collaborate" );
        };
      };

      TogetherJS.on( "ready", toggleTogether( true ) );
      TogetherJS.on( "close", toggleTogether( false ) );

      _togetherjsBtn.addEventListener( "click", function() {
        _togetherJS = new TogetherJS( this );
      });

      if ( TogetherJS.running ) {
        toggleTogether( true )();
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

    function afterSave() {
      openProjectEditor();
      togglePreviewButton( true );
      toggleProjectNameListeners( true );
      toggleDeleteProject( true );
    }

    function submitSave() {
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
    }

    function saveProject() {
      if ( butter.project.isSaved ) {
        return;
      } else if ( !checkProjectName( butter.project.name ) ) {
        nameError();
      } else if ( !butter.project.id ) {
        toggleSaveButton( false );
        _makeDetails.classList.remove( "butter-hidden" );
      } else {
        submitSave();
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
      var dialog;
      if ( butter.project.id && butter.project.isSaved ) {
        dialog = Dialog.spawn( "remove-project", {
          data: {
            callback: function() {
              butter.project.remove(function( e ) {

                if ( e.error === "okay" ) {
                  window.onbeforeunload = null;
                  window.history.replaceState( {}, "", "/" + Localized.getCurrentLang() + "/editor/" );
                  window.location.reload();
                } else {
                  showErrorDialog( Localized.get( "There was a problem saving your project" ) );
                }
              });
            }
          }
        });
        dialog.open();
      }
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

      _projectDetails.thumbnail( _makeDetails.querySelector( "[name='thumbnail']" ) );
      _projectDetails.tags( _makeDetails.querySelector( "[name='tags']" ) );
      _projectDetails.description( _makeDetails.querySelector( "[name='description']" ) );
      _projectDetails.buttons( _makeDetails.querySelector( "[name='buttons']" ), function( save ) {
        if ( save ) {
          submitSave();
        }

        _makeDetails.classList.add( "butter-hidden" );
        toggleSaveButton( true );
        togglePreviewButton( false );
        toggleProjectNameListeners( true );
      });

      _clearEvents.addEventListener( "click", clearEventsClick, false );
    });
  };
});
