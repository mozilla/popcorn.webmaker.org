/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "core/localized", "editor/editor", "editor/base-editor",
          "l10n!/layouts/project-editor.html",
          "util/social-media", "ui/widget/textbox",
          "ui/widget/tooltip" ],
  function( Localized, Editor, BaseEditor, LAYOUT_SRC, SocialMedia, TextboxWrapper, ToolTip ) {

  Editor.register( "project-editor", LAYOUT_SRC, function( rootElement, butter ) {

    var _rootElement = rootElement,
        _socialMedia = new SocialMedia(),
        _projectURL = _rootElement.querySelector( ".butter-project-url" ),
        _tagInput = _rootElement.querySelector( ".butter-project-tags" ),
        _descriptionInput = _rootElement.querySelector( ".butter-project-description" ),
        _dropArea = _rootElement.querySelector( ".image-droparea" ),
        _thumbnailInput = _rootElement.querySelector( ".butter-project-thumbnail" ),
        _backgroundInput = _rootElement.querySelector( ".butter-project-background-colour" ),
        _projectEmbedURL = _rootElement.querySelector( ".butter-project-embed-url" ),
        _embedSize = _rootElement.querySelector( ".butter-embed-size" ),
        _previewBtn = _rootElement.querySelector( ".butter-preview-link" ),
        _projectLinkUrl = _rootElement.querySelector( ".butter-project-url" ),
        _projectLinkButton = _rootElement.querySelector( ".butter-preview-link" ),
        _viewSourceBtn = _rootElement.querySelector( ".butter-view-source-btn" ),
        _settingsTabBtn = _rootElement.querySelector( ".settings-tab-btn" ),
        _embedTabBtn = _rootElement.querySelector( ".embed-tab-btn" ),
        _shareTabBtn = _rootElement.querySelector( ".share-tab-btn" ),
        _shareTwitter = _rootElement.querySelector( ".butter-share-twitter" ),
        _shareGoogle = _rootElement.querySelector( ".butter-share-google" ),
        _loginToSaveDialog = _rootElement.querySelector( ".login-to-save-dialog" ),
        _embedDimensions = _embedSize.value.split( "x" ),
        _embedWidth = _embedDimensions[ 0 ],
        _embedHeight = _embedDimensions[ 1 ],
        _projectTabs = _rootElement.querySelectorAll( ".project-tab" ),
        _this = this,
        _numProjectTabs = _projectTabs.length,
        _descriptionToolTip,
        _descriptionTimeout,
        _project,
        _projectTab,
        _idx;

    _descriptionInput.value = butter.project.description ? butter.project.description : "";
    _backgroundInput.value = butter.project.background ? butter.project.background : "#FFFFFF";

    _backgroundInput.addEventListener( "change", function() {
      _project.background = this.value;
    }, false );

    ToolTip.create({
      name: "description-tooltip",
      element: _descriptionInput.parentNode,
      message: Localized.get( "Your description will show up when shared on social media!" ),
      top: "100%",
      left: "50%",
      error: true,
      hidden: true,
      hover: false
    });

    _descriptionToolTip = ToolTip.get( "description-tooltip" );

    function checkDescription() {
      if ( _descriptionInput.value ) {
        if ( _descriptionTimeout ) {
          clearTimeout( _descriptionTimeout );
          _descriptionToolTip.hidden = true;
        }
        return;
      }
      _descriptionToolTip.hidden = false;

      _descriptionTimeout = setTimeout(function() {
        _descriptionToolTip.hidden = true;
      }, 5000 );
    }

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
      _projectTab.addEventListener( "click", onProjectTabClick, false );
    }

    function updateEmbed( url ) {
      _projectEmbedURL.value = "<iframe src='" + url + "' width='" + _embedWidth + "' height='" + _embedHeight + "'" +
      " frameborder='0' mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>";
    }

    _embedSize.addEventListener( "change", function() {
      _embedDimensions = _embedSize.value.split( "x" );
      _embedWidth = _embedDimensions[ 0 ];
      _embedHeight = _embedDimensions[ 1 ];
      updateEmbed( butter.project.iframeUrl );
    }, false );

    function applyInputListeners( element, key ) {
      var ignoreBlur = false,
          target;

      function checkValue( e ) {
        target = e.target;
        if ( target.value !== _project[ key ] ) {
          _project[ key ] = target.value;
        }
      }

      element.addEventListener( "blur", function( e ) {
        if ( !ignoreBlur ) {
          checkValue( e );
        } else {
          ignoreBlur = false;
        }
      }, false );
    }

    applyInputListeners( _thumbnailInput, "thumbnail" );
    applyInputListeners( _tagInput, "tags" );

    applyInputListeners( _descriptionInput, "description" );
    _descriptionInput.addEventListener( "keyup", checkDescription, false );

    TextboxWrapper.applyTo( _projectURL, { readOnly: true } );
    TextboxWrapper.applyTo( _projectEmbedURL, { readOnly: true } );
    TextboxWrapper.applyTo( _descriptionInput );
    TextboxWrapper.applyTo( _thumbnailInput );

    window.EditorHelper.droppable( null, _dropArea );

    butter.listen( "droppable-unsupported", function unSupported() {
      _this.setErrorState( Localized.get( "Sorry, but your browser doesn't support this feature." ) );
    });

    butter.listen( "droppable-upload-failed", function failedUpload( e ) {
      _this.setErrorState( e.data );
    });

    butter.listen( "droppable-succeeded", function uploadSuceeded( e ) {
      _project.thumbnail = _dropArea.querySelector( "img" ).src = e.data;
      _thumbnailInput.value = _project.thumbnail;
    });

    function onProjectSaved() {
      _previewBtn.href = _projectURL.value = _project.publishUrl;
      _viewSourceBtn.href = "view-source:" + _project.iframeUrl;
      updateEmbed( _project.iframeUrl );
      _shareTabBtn.classList.remove( "butter-disabled" );
      _viewSourceBtn.classList.remove( "butter-disabled" );
      _embedTabBtn.classList.remove( "butter-disabled" );
      _projectLinkButton.classList.remove( "butter-disabled" );
      _projectLinkUrl.classList.remove( "butter-disabled" );
      _loginToSaveDialog.classList.add( "hidden" );
    }
    function onLogin() {
      if ( butter.project.isSaved ) {
        onProjectSaved();
      }
    }
    function onProjectChanged() {
      _shareTabBtn.classList.add( "butter-disabled" );
      _viewSourceBtn.classList.add( "butter-disabled" );
      _embedTabBtn.classList.add( "butter-disabled" );
      _projectLinkButton.classList.add( "butter-disabled" );
      _projectLinkUrl.classList.add( "butter-disabled" );
      activateProjectTab( _settingsTabBtn );
      _loginToSaveDialog.classList.remove( "hidden" );
    }

    butter.listen( "projectsaved", onProjectSaved );
    butter.listen( "autologinsucceeded", onLogin );
    butter.listen( "authenticated", onLogin );
    butter.listen( "projectchanged", onProjectChanged );
    butter.listen( "logout", onProjectChanged );

    Editor.BaseEditor.extend( this, butter, rootElement, {
      open: function() {
        _project = butter.project;

        _previewBtn.href = _projectURL.value = _project.publishUrl || "";
        if ( !_project.isSaved ) {
          _shareTabBtn.classList.add( "butter-disabled" );
          _viewSourceBtn.classList.add( "butter-disabled" );
          _embedTabBtn.classList.add( "butter-disabled" );
          _projectLinkButton.classList.add( "butter-disabled" );
          _projectLinkUrl.classList.add( "butter-disabled" );
          _loginToSaveDialog.classList.remove( "hidden" );
        }
        _viewSourceBtn.href = "view-source:" + _project.iframeUrl;
        _thumbnailInput.value = _project.thumbnail;
        _tagInput.value = _project.tags;
        updateEmbed( _project.iframeUrl );

        _previewBtn.onclick = function() {
          return _project.isSaved && butter.cornfield.authenticated();
        };
        _viewSourceBtn.onclick = function() {
          return _project.isSaved && butter.cornfield.authenticated();
        };

        // Ensure Share buttons have loaded
        if ( !_shareTwitter.childNodes.length ) {
          _socialMedia.hotLoad( _shareTwitter, _socialMedia.twitter, _project.publishUrl );
        }
        if ( !_shareGoogle.childNodes.length ) {
          _socialMedia.hotLoad( _shareGoogle, _socialMedia.google, _project.publishUrl );
        }

        _this.scrollbar.update();

      },
      close: function() {
      }
    });
  }, true );
});
