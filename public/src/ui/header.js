/*globals TogetherJS*/
define([ "languages", "localized", "dialog/dialog", "util/lang", "l10n!/layouts/header.html", "ui/widget/textbox", "ui/widget/tooltip",
         "ui/widget/ProjectDetails", "util/togetherjs-syncer", "analytics", "selectize", "jquery" ],
  function( Languages, Localized, Dialog, Lang, HEADER_TEMPLATE, TextBoxWrapper, ToolTip, ProjectDetails, TogetherJSSyncer, analytics, selectize, $ ) {

  return function( butter, options ){

    options = options || {};

    var _this = this,
        _rootElement = Lang.domFragment( HEADER_TEMPLATE, ".butter-header" ),
        _saveContainer = _rootElement.querySelector( ".butter-save-container" ),
        _saveButton = _saveContainer.querySelector( ".butter-save-btn" ),
        _clearEvents = _rootElement.querySelector( ".butter-clear-events-btn" ),
        _webmakerNav = _rootElement.querySelector( "#webmaker-nav" ),
        _joinButton = _rootElement.querySelector( ".join-button" ),
        _signinButton = _rootElement.querySelector( ".signin-button" ),
        _logoutButton = _rootElement.querySelector( ".logout-button" ),
        _userName = _rootElement.querySelector( ".user-name-container a" ),
        _userImage = _rootElement.querySelector( ".user-image" ),
        _removeProject = _rootElement.querySelector( ".butter-remove-project-btn" ),
        _previewContainer = _rootElement.querySelector( ".butter-preview-container" ),
        _previewBtn = _previewContainer.querySelector( ".butter-preview-btn" ),
        _makeDetails = _rootElement.querySelector( "#make-details" ),
        _loginToSaveTooltip, _loginToPreviewTooltip, _saveToPreviewTooltip,
        _projectDetails = new ProjectDetails( butter ),
        _togetherJS,
        _togetherjsBtn = _rootElement.querySelector( ".together-toggle" ),
        _togetherJSSyncer;

    _loginToSaveTooltip = ToolTip.create({
      title: "header-login-save-tooltip",
      message: Localized.get( "Login to save your project!" ),
      element: _saveContainer,
      top: "60px"
    });

    _loginToPreviewTooltip = ToolTip.create({
      title: "header-login-title-tooltip",
      message: Localized.get( "Login to preview your project!" ),
      element: _previewContainer,
      top: "60px"
    });

    _saveToPreviewTooltip = ToolTip.create({
      title: "header-login-title-tooltip",
      message: Localized.get( "Save to preview your project!" ),
      element: _previewContainer,
      top: "60px"
    });

    _this.element = _rootElement;

    _joinButton.addEventListener( "click", butter.cornfield.create );
    _signinButton.addEventListener( "click", butter.cornfield.login );
    _logoutButton.addEventListener( "click", butter.cornfield.logout );

    // Display the img after the src has loaded.
    function userImageLoaded() {
      _userImage.classList.remove( "butter-hidden" );
    }

    // Feature flag might not be enabled.
    if ( _togetherjsBtn && window.TogetherJS ) {
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
      toggleSaving( true );
      togglePreviewButton( true );
      toggleDeleteProject( true );
      analytics.event( "Project Saved" );
    }

    function submitSave() {
      toggleSaving( false );
      _saveButton.textContent = Localized.get( "Saving" );

      // Check box decides save or publish, for now, save then publish in afterSave...
      butter.project.save(function( e ) {
        if ( e.status === "okay" ) {
          afterSave();
          return;
        } else {
          toggleSaveButton( true );
          togglePreviewButton( false );
          butter.project.useBackup();
          showErrorDialog( Localized.get( "There was a problem saving your project" ) );
        }
      });
    }

    function saveProject() {
      if ( butter.project.isSaved || !butter.cornfield.authenticated() ) {
        return;
      } else if ( !butter.project.id ) {
        toggleSaving( false );
        _makeDetails.classList.remove( "butter-hidden" );
        _makeDetails.style.webkitTransform = "scale(1)";
        _projectDetails.open();
      } else {
        submitSave();
      }
    }

    function openProjectEditor() {
      butter.editor.openEditor( "project-editor" );
    }

    function toggleSaveButton( on ) {
      if ( butter.project.isSaved ) {
        _saveButton.textContent = Localized.get( "Saved" );
      } else {
        _saveButton.textContent = Localized.get( "Save" );
      }
      if ( on ) {
        _saveButton.classList.remove( "butter-disabled" );
      } else {
        _saveButton.classList.add( "butter-disabled" );
      }
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

    function togglePreviewButton( on ) {
      if ( on ) {
        _saveToPreviewTooltip.hidden = true;
        _previewBtn.classList.remove( "butter-disabled" );
        _previewBtn.href = butter.project.publishUrl;
        _previewBtn.onclick = function() {
          analytics.event( "Preview", {
            label: "header"
          });
          return true;
        };
      } else {
        _saveToPreviewTooltip.hidden = !butter.cornfield.authenticated();
        _previewBtn.classList.add( "butter-disabled" );
        _previewBtn.href = "";
        _previewBtn.onclick = function() {
          return false;
        };
      }
    }

    function toggleTooltips( saved ) {
      _loginToPreviewTooltip.hidden = saved;
      _loginToSaveTooltip.hidden = saved;
    }

    function removeProject() {
      var dialog;
      if ( butter.project.id && butter.project.isSaved ) {
        dialog = Dialog.spawn( "remove-project", {
          data: {
            callback: function() {
              butter.project.remove(function( e ) {

                if ( e.status === "okay" ) {
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
        _removeProject.addEventListener( "click", removeProject );
        _removeProject.classList.remove( "butter-disabled" );
      } else {
        _removeProject.removeEventListener( "click", removeProject, false );
        _removeProject.classList.add( "butter-disabled" );
      }
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

        toggleTooltips( butter.cornfield.authenticated() );
        togglePreviewButton( isSaved );
        toggleSaveButton( !isSaved && butter.cornfield.authenticated() );
        toggleDeleteProject( isSaved && butter.cornfield.authenticated() );
        _joinButton.classList.add( "hidden" );
        _signinButton.classList.add( "hidden" );
        _logoutButton.classList.remove( "hidden" );
        _webmakerNav.classList.add( "loggedin" );
        _userName.textContent = butter.cornfield.username();
        _userImage.addEventListener( "load", userImageLoaded );
        _userImage.src = butter.cornfield.avatar();
      },
      logout: function() {
        togglePreviewButton( false );
        toggleSaveButton( false );
        toggleTooltips( false );
        _joinButton.classList.remove( "hidden" );
        _signinButton.classList.remove( "hidden" );
        _logoutButton.classList.add( "hidden" );
        _webmakerNav.classList.remove( "loggedin" );
        _userName.textContent = "";
        _userImage.removeEventListener( "load", userImageLoaded, false );
        _userImage.classList.add( ".butter-hidden" );
        _userImage.src = "";
      }
    };

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
    });

    butter.listen( "projectchanged", function() {
      // Re-enable "Save" button to indicate things are not saved
      _this.views.dirty();
    });

    butter.listen( "ready", function() {

      // Call this when language picker element is ready.
      Languages.ready({ position: "bottom", arrow: "top" }, true);
      $("#supportedLocales").selectize();

      _saveButton.addEventListener( "click", saveProject );
      if ( !butter.cornfield.authenticated() ) {
        toggleTooltips( false );
        togglePreviewButton( false );
        toggleSaveButton( false );
        toggleDeleteProject( false );
      }

      _projectDetails.title( _makeDetails.querySelector( "[name='title']" ) );
      _projectDetails.thumbnail( _makeDetails.querySelector( "[name='thumbnail']" ) );
      _projectDetails.tags( _makeDetails.querySelector( "[name='tags']" ) );
      _projectDetails.description( _makeDetails.querySelector( "[name='description']" ) );
      _projectDetails.searchableCheckbox( _makeDetails.querySelector( "[name='searchable']" ) );
      _projectDetails.buttons( _makeDetails.querySelector( "[name='buttons']" ), function( save ) {
        if ( save ) {
          submitSave();
        } else {
          toggleSaving( true );
          togglePreviewButton( false );
          toggleTooltips( true );
        }

        _makeDetails.classList.add( "butter-hidden" );
      });

      _clearEvents.addEventListener( "click", clearEventsClick );
    });
  };
});
