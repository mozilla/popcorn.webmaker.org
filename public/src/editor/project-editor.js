/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "localized", "editor/editor", "editor/base-editor",
          "l10n!/layouts/project-editor.html",
          "util/social-media", "ui/widget/textbox",
          "ui/widget/tooltip", "util/keys" ],
  function( Localized, Editor, BaseEditor, LAYOUT_SRC, SocialMedia, TextboxWrapper, ToolTip, KEYS ) {

  Editor.register( "project-editor", LAYOUT_SRC, function( rootElement, butter ) {

    var _rootElement = rootElement,
        _socialMedia = new SocialMedia(),
        _projectURL = _rootElement.querySelector( ".butter-project-url" ),
        _descriptionInput = _rootElement.querySelector( ".butter-project-description" ),
        _dropArea = _rootElement.querySelector( ".image-droparea" ),
        _thumbnailInput = _rootElement.querySelector( ".butter-project-thumbnail" ),
        _backgroundInput = _rootElement.querySelector( ".butter-project-background-colour" ),
        _colorContainer = _rootElement.querySelector( ".color-container" ),
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
        _imageThumbs = _rootElement.querySelector( ".image-thumbnails" ),
        _tagsList = _rootElement.querySelector( ".tags-output" ),
        _tagsInput = _rootElement.querySelector( ".tags-input" ),
        _currentTags = [],
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

    function checkTags( tags ) {
      return tags.split( /,|\#|\s/ ).filter( function( item ) {
        return item;
      }).join( ", " );
    }

    function applyInputListeners( element, key ) {
      function checkValue( e ) {
        var target = e.target;
        if ( target.value !== _project[ key ] ) {
          _project[ key ] = target.value;
        }

        if ( key === "thumbnail" ) {
          addThumbnail( _project.thumbnail, true );
        }
      }

      element.addEventListener( "blur", checkValue, false );
    }

    applyInputListeners( _thumbnailInput, "thumbnail" );
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
      addThumbnail( _project.thumbnail, true );
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

    function addThumbnail( url, isSelected ) {
      var li = document.createElement( "li" ),
          image = _imageThumbs.querySelector( "[data-source='" + url + "']" );

      if ( image ) {
        return;
      }

      li.setAttribute( "data-source", url );
      li.style.backgroundImage = "url('" + url + "')";
      li.addEventListener( "click", function( e ) {
        var source = e.target.dataset.source,
            selected = _imageThumbs.querySelector( ".selected" );

        selected.classList.remove( "selected" );
        e.target.classList.add( "selected" );
        _project.thumbnail = source;
        _thumbnailInput.value = _project.thumbnail;
      }, false );

      if ( isSelected ) {
        var selected = _imageThumbs.querySelector( ".selected" );

        if ( selected ) {
          selected.classList.remove( "selected" );
        }

        li.classList.add( "selected" );
      }

      _imageThumbs.appendChild( li );
    }

    function addTags( tags, addFromOpen ) {
      var tag;

      if ( !tags ) {
        return;
      }

      if ( typeof tags === "string" ) {
        tags = tags.split( "," );
      }

      for ( var i = 0; i < tags.length; i++ ) {
        tag = tags[ i ];

        var val = tag.replace( /[,#\s]/g, "" );

        if ( val && _currentTags.indexOf( val ) === -1 ) {
          var currentProjectTags = butter.project.tags,
              li = document.createElement( "li" );

          _currentTags.push( val );

          if ( !addFromOpen ) {
            currentProjectTags.push( val );
            butter.project.tags = currentProjectTags.join( "," );
          }

          li.innerHTML = val;
          _tagsList.appendChild( li );
        }
      }

      _tagsInput.value = "";
    }

    _tagsInput.addEventListener( "keydown", function( e ) {
      if ( e.keyCode === KEYS.ENTER || e.keyCode === KEYS.COMMA ) {
        addTags( e.target.value );
      }
    }, false );

    _tagsInput.addEventListener( "blur", function( e ) {
      addTags( e.target.value );
    }, false );

    // Removal of Tags from project
    _tagsList.addEventListener( "click", function( e ) {
      if ( e.target.tagName === "LI" ) {
        var target = e.target,
            tag = target.value;

        // Remove from tags array
        var i = _currentTags.indexOf( tag );
        _currentTags.splice( i, 1 );
        _tagsList.removeChild( target );
        butter.project.tags = _currentTags.join( "," );
      }
    }, false );

    function trackEventHandle( e ) {
      var trackEvent = e.data,
          src = trackEvent.popcornOptions.src,
          image = _imageThumbs.querySelector( "[data-source='" + src + "']" );

      if ( e.type === "trackeventremoved" && image ) {
        _imageThumbs.removeChild( image );
        return;
      }

      if ( !image && src ) {
        addThumbnail( src );
        return;
      }
    }

    butter.listen( "projectsaved", onProjectSaved );
    butter.listen( "autologinsucceeded", onLogin );
    butter.listen( "authenticated", onLogin );
    butter.listen( "projectchanged", onProjectChanged );
    butter.listen( "logout", onProjectChanged );
    butter.listen( "trackeventadded", trackEventHandle );
    butter.listen( "trackeventremoved", trackEventHandle );
    butter.listen( "trackeventupdated", trackEventHandle );

    Editor.BaseEditor.extend( this, butter, rootElement, {
      open: function() {
        _project = butter.project;

        this.attachColorChangeHandler( _colorContainer, null, "background", function( te, options, message, prop ) {
          if ( message ) {
            _this.setErrorState( message );
            return;
          } else {
            _project.background = options.background;
          }
        });

        if ( !_imageThumbs.childNodes.length ) {
          var imageEvents = butter.getTrackEvents( "type", "image" ),
              foundProjectThumbnail =  _project.thumbnail.indexOf( "/resources/icons/fb-logo.png" ) !== -1 ? true : false;

          // Thumbnail is the default.
          if ( foundProjectThumbnail ) {
             addThumbnail( _project.thumbnail, true );
          } else {
            addThumbnail( location.protocol + "//" + location.host + "/resources/icons/fb-logo.png" );
          }

          for ( var i = 0; i < imageEvents.length; i++ ) {
            if ( imageEvents[ i ].popcornOptions.src ) {
              var source = imageEvents[ i ].popcornOptions.src;

              if ( source === _project.thumbnail ) {
                foundProjectThumbnail = true;
                addThumbnail( source, foundProjectThumbnail );
                return;
              }

              addThumbnail( source );
            }
          }

          // Project has a thumbnail that wasn' added VIA image events and isn't the default
          if ( !foundProjectThumbnail ) {
            addThumbnail( _project.thumbnail, true );
          }
        }

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
        addTags( _project.tags, true );
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
