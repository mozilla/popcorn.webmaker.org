/*global $*/
define([ "core/localized", "dialog/dialog", "util/lang", "l10n!/layouts/header.html", "l10n!/layouts/tutorial-list.html","text!layouts/tutorial-view.html", "ui/widget/textbox", "ui/widget/tooltip", "make-api", "json!/api/butterconfig" ],
  function( Localized, Dialog, Lang, HEADER_TEMPLATE, TUTORIAL_LIST_TEMPLATE, TUTORIAL_VIEW_TEMPLATE, TextBoxWrapper, ToolTip, Make, config ) {

  return function( butter, options ){

    options = options || {};

    var TOOLTIP_NAME = "name-error-header-tooltip";

    var _this = this,
        _rootElement = Lang.domFragment( HEADER_TEMPLATE, ".butter-header" ),
        _bodyWrapper = document.querySelector( ".body-wrapper" ),
        _tutorialButtonContainer = document.querySelector( ".butter-tutorial-container" ),
        _saveButton = _rootElement.querySelector( ".butter-save-btn" ),
        _projectTitle = _rootElement.querySelector( ".butter-project-title" ),
        _projectName = _projectTitle.querySelector( ".butter-project-name" ),
        _clearEvents = _rootElement.querySelector( ".butter-clear-events-btn" ),
        _previewBtn = _rootElement.querySelector( ".butter-preview-btn" ),
        _projectBtn = _rootElement.querySelector( ".butter-project-btn" ),
        _projectMenu = _rootElement.querySelector( ".butter-project-menu" ),
        _projectMenuControl = _rootElement.querySelector( ".butter-project-menu-control" ),
        _projectMenuList = _projectMenu.querySelector( ".butter-btn-menu" ),
        _noProjectNameToolTip,
        _projectTitlePlaceHolderText = _projectName.innerHTML,
        _toolTip, _loginTooltip;

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

    var make = new Make({
      apiURL: config.make_endpoint
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

    function toggleProjectButton( on ) {
      if ( on ) {
        _projectBtn.classList.remove( "butter-disabled" );
        _projectBtn.addEventListener( "click", openProjectEditor, false );
      } else {
        _projectBtn.classList.add( "butter-disabled" );
        _projectBtn.removeEventListener( "click", openProjectEditor, false );
      }
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

    function toggleClearButton( on ) {
      if ( on ) {
        _clearEvents.classList.remove( "butter-disabled" );
        _clearEvents.addEventListener( "click", clearEventsClick, false );
      } else {
        _clearEvents.classList.add( "butter-disabled" );
        _clearEvents.removeEventListener( "click", clearEventsClick, false );
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
        toggleProjectButton( false );
      },
      clean: function() {
        togglePreviewButton( true );
        toggleSaveButton( false );
        toggleProjectButton( true );
      },
      login: function() {
        var isSaved = butter.project.isSaved;

        toggleProjectNameListeners( butter.cornfield.authenticated() );
        togglePreviewButton( isSaved );
        toggleSaveButton( !isSaved && butter.cornfield.authenticated() );
        toggleProjectButton( isSaved );
      },
      logout: function() {
        togglePreviewButton( false );
        toggleSaveButton( false );
        toggleProjectButton( false );
        toggleProjectNameListeners( false );
      }
    };

    // Set up the project menu
    _projectMenuControl.addEventListener( "click", function() {
      if ( butter.currentMedia.hasTrackEvents() ) {
        toggleClearButton( true );
      } else {
        toggleClearButton( false );
      }
      _projectMenu.classList.toggle( "butter-btn-menu-expanded" );
    }, false );

    _projectMenuList.addEventListener( "click", function( e ) {
      if ( e.target.classList.contains( "butter-disabled" ) ) {
        return;
      }
      _projectMenu.classList.remove( "butter-btn-menu-expanded" );
    }, true );

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

      ToolTip.create({
        name: TOOLTIP_NAME,
        message: Localized.get( "Please give your project a name before saving" ),
        hidden: false,
        element: _projectTitle,
        top: "50px",
        error: true
      });

      _noProjectNameToolTip = ToolTip.get( TOOLTIP_NAME );
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
      _projectName.textContent = butter.project.name;
    });

    butter.listen( "projectchanged", function() {
      // Re-enable "Save" button to indicate things are not saved
      _this.views.dirty();
    });

    function loadTutorials() {
      var tutorialUrl;

      if ( butter.project.publishUrl ) {
        tutorialUrl = butter.project.publishUrl;
      } else if ( butter.project.remixedFromUrl ) {
        tutorialUrl = butter.project.remixedFromUrl;
      }

      make.tags( "tutorial-" + escape( tutorialUrl ) ).then( function( err, results ) {
        var tutorialView = Lang.domFragment( TUTORIAL_VIEW_TEMPLATE, ".tutorial-view" ),
            tutorialTemplate = Lang.domFragment( TUTORIAL_LIST_TEMPLATE, ".tutorial-template" ),
            iframeCover = tutorialView.querySelector( ".tutorial-iframe-cover" ),
            iframe = tutorialView.querySelector( ".tutorial-iframe" ),
            closeButton = tutorialView.querySelector( ".tutorial-close-button" ),
            viewTitle = tutorialView.querySelector( ".tutorial-view-title" ),
            tutorialList = document.querySelector( ".tutorial-list" ),
            tutorialBtn = document.querySelector( ".tutorial-btn" );

        if ( err || !results.length ) {
          return;
        }

        tutorialBtn.classList.remove( "hidden" );

        var onCoverMouseUp = function() {
          iframeCover.style.display = "none";
          tutorialView.addEventListener( "mousedown", onCoverMouseDown, false );
          document.removeEventListener( "mouseup", onCoverMouseUp, false );
        };

        var onCoverMouseDown = function() {
          iframeCover.style.display = "block";
          tutorialView.removeEventListener( "mousedown", onCoverMouseDown, false );
          document.addEventListener( "mouseup", onCoverMouseUp, false );
        };

        var createTutorialItem = function( item ) {
          var tutorialElement = document.createElement( "div" );
          tutorialElement.classList.add( "tutorial-list-item" );
          tutorialElement.addEventListener( "click", function() {
            iframe.src = item.url + "?details=hidden";
            viewTitle.innerHTML = "Tutorial: " + item.title;
            tutorialView.classList.remove( "closed" );
            tutorialView.style.height = "";
            tutorialView.style.width = "";
          }, false );
          tutorialElement.innerHTML = item.title;
          tutorialList.appendChild( tutorialElement );
        };

        tutorialView.addEventListener( "mousedown", onCoverMouseDown, false );

        closeButton.userSelect = "none";
        document.body.appendChild( tutorialView );

        closeButton.addEventListener( "click", function() {
          tutorialView.classList.add( "closed" );
          tutorialView.style.height = 0;
          tutorialView.style.width = 0;
        }, false );

        tutorialBtn.addEventListener( "click", function() {
          tutorialList.classList.toggle( "open" );
        }, false );

        $( tutorialView ).draggable({
          cancel: "iframe"
        });
        $( tutorialView ).resizable();

        for ( var i = 0; i < results.length; i++ ) {
          createTutorialItem( results[ i ] );
        }
      });
    }

    function loadDashboard() {
      var myProjectsButton = document.querySelector( ".user-info > .makes" ),
          container = document.querySelector( ".my-projects-container" ),
          iframe = document.querySelector( ".my-projects-iframe" );

     function close() {
        myProjectsButton.addEventListener( "click", open, false );
        myProjectsButton.removeEventListener( "click", close, false );

        container.style.zIndex = "";
        container.style.position = "";
        iframe.style.height = "";
      }

      function open() {
        myProjectsButton.addEventListener( "click", close, false );
        myProjectsButton.removeEventListener( "click", open, false );

        iframe.style.height = "300px";

        iframe.src = "/dashboard";
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
        toggleProjectButton( false );
      }

      if ( butter.project.publishUrl ||
           butter.project.remixedFromUrl ) {
        loadTutorials();
      }
    });
  };
});
