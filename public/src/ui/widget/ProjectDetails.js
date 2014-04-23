/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/popcorn.webmaker.org/master/LICENSE */

define( [ "util/keys", "ui/widget/tooltip", "localized", "ui/widget/textbox",
          "json!/api/butterconfig", "jquery" ],
  function( KEYS, ToolTip, Localized, TextboxWrapper, config, $ ) {

  function ProjectDetails( butter ) {

    var _butter = butter,
        _currentTags = [],
        _titleInput,
        _error,
        _thumbnailInput,
        _thumbnailUl,
        _noProjectNameToolTip,
        _saveButton,
        _cancelButton,
        _saveCallback;

    function onButtonClick( e ) {
      var target = e.target;

      if ( target === _saveButton ) {
        _saveCallback( true );
      } else {
        _titleInput.value = butter.project.name || "";
        _saveCallback();
      }
    }

    function enableSave() {
      _noProjectNameToolTip.hidden = true;
      _saveButton.addEventListener( "click", onButtonClick );
      _saveButton.classList.remove( "butter-disabled" );
    }
    function disableSave() {
      _noProjectNameToolTip.hidden = false;
      _saveButton.removeEventListener( "click", onButtonClick, false );
      _saveButton.classList.add( "butter-disabled" );
    }

    function addThumbnail( url, dropArea ) {
      var li = document.createElement( "li" ),
          image = _thumbnailUl.querySelector( "[data-source='" + url + "']" );

      if ( image ) {
        return;
      }

      if ( dropArea ) {
        dropArea.querySelector( "img" ).src = url;
      }

      li.setAttribute( "data-source", url );
      li.style.backgroundImage = "url('" + url + "')";
      li.addEventListener( "click", function( e ) {
        var source = e.target.dataset.source,
            selected = _thumbnailUl.querySelector( ".selected" );

        if ( selected ) {
          selected.classList.remove( "selected" );
        }

        e.target.classList.add( "selected" );
        _butter.project.thumbnail = source;

        if ( dropArea ) {
          dropArea.querySelector( "img" ).src = source;
        }

        _thumbnailInput.value = _butter.project.thumbnail;
      } );

      _thumbnailUl.appendChild( li );
    }

    function selectThumb( url ) {
      var li = _thumbnailUl.querySelector( "[data-source='" + url + "']" ),
          selected = _thumbnailUl.querySelector( ".selected" );

      if ( selected ) {
        selected.classList.remove( "selected" );
      }

      li.classList.add( "selected" );
    }

    function updateTitle() {
      if ( butter.project.name ) {
        _titleInput.value = butter.project.name;
      }
    }

    return {
      addThumbnail: addThumbnail,

      open: function() {
        function onInput() {
          if ( _titleInput.value ) {
            enableSave();
            _error.classList.add( "butter-hidden" );
            return;
          }
          disableSave();
          _error.classList.remove( "butter-hidden" );
        }
        updateTitle();
        onInput();
        _titleInput.select();
        _titleInput.addEventListener( "input", onInput );
      },

      updateTitle: updateTitle,

      selectThumb: selectThumb,

      tags: function( container ) {
        var ul = container.querySelector( ".tags-output" ),
            input = container.querySelector( ".tags-input" );

        function checkTags( tags ) {
          return tags.split( /,|\#|\s/ ).filter( function( item ) {
            return item;
          }).join( "," );
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
            if ( val && _currentTags.indexOf( val ) === -1 && val.indexOf( ":" ) === -1 ) {
              var currentProjectTags = _butter.project.tags,
                  li = document.createElement( "li" );

              _currentTags.push( val );
              if ( !addFromOpen ) {
                currentProjectTags.push( val );
                _butter.project.tags = checkTags( currentProjectTags.join( "," ) );
              }

              li.textContent = decodeURIComponent( val );
              ul.appendChild( li );
            }
          }
        }

        function blurCallback( e ) {
          addTags( encodeURIComponent( e.target.value ) );
          input.value = "";
        }

        $( input ).autocomplete({
          source: function( request, response ) {
            var term = request.term;
            $.getJSON( config.make_endpoint + "/api/20130724/make/tags?t=" + term, function( data ) {
              response( data.tags.map(function( item ) {
                return item.term;
              }));
            });
          },
          minLength: 1,
          delay: 200,
          focus: function () {
            input.removeEventListener( "blur", blurCallback, false );
          },
          close: function () {
            input.addEventListener( "blur", blurCallback );
          },
          select: function( e, ui) {
            addTags( encodeURIComponent( ui.item.value ) );
            input.value = "";
            e.preventDefault();
          }
        });

        input.addEventListener( "keydown", function( e ) {
          if ( e.keyCode === KEYS.ENTER || ( !e.shiftKey && e.keyCode === KEYS.COMMA ) ) {
            e.preventDefault();
            addTags( encodeURIComponent( e.target.value ) );
            $( input ).autocomplete( "close" );
            input.value = "";
          }
        } );

        input.addEventListener( "blur", blurCallback );

        // Removal of Tags from project
        ul.addEventListener( "click", function( e ) {
          if ( e.target.tagName === "LI" ) {
            var target = e.target,
                tag = target.textContent;

            // Remove from tags array
            var i = _currentTags.indexOf( tag );
            _currentTags.splice( i, 1 );
            ul.removeChild( target );
            _butter.project.tags = _currentTags.join( "," );
          }
        } );

        if ( !ul.childNodes.length || _currentTags.length !== ul.childNodes.length ||
             _currentTags.length !== _butter.project.tags.length ) {
          var tags = _butter.project.tags;

          ul.innerHTML = "";
          _currentTags = [];

          addTags( tags, true );
        }
      },

      title: function( container ) {
        _error = container.querySelector( ".error" );
        _titleInput = container.querySelector( ".title-input" );
        _titleInput.addEventListener( "change", function() {
          if ( _titleInput.value ) {
            butter.project.name = _titleInput.value;
          }
        } );
      },

      thumbnail: function( container, dropArea ) {
        _thumbnailInput = container.querySelector( ".thumbnail-input" );
        _thumbnailUl = container.querySelector( ".thumbnail-choices" );

        function trackEventHandle( e ) {
          var trackEvent = e.data,
            src = trackEvent.popcornOptions.src || trackEvent.popcornOptions.thumbnailSrc,
            image = _thumbnailUl.querySelector( "[data-source='" + src + "']" );

          if ( e.type === "trackeventremoved" && image ) {
            _thumbnailUl.removeChild( image );
            return;
          }
          if ( !image && src ) {
            // This means we only have one thumbnail and it's the default,
            // so we should make the new one the current thumbnail.
            if ( _thumbnailUl.childNodes.length === 1 && _butter.project.thumbnail.indexOf( "/resources/icons/fb-logo.png" ) >= 0 ) {
              addThumbnail( src, dropArea );
              selectThumb( src );
              _butter.project.thumbnail = src;
            } else {
              addThumbnail( src );
            }
            return;
          }
        }

        _thumbnailInput.addEventListener( "blur", function( e ) {
          var source = e.target.value;

          if ( source !== _butter.project.thumbnail ) {
            _butter.project.thumbnail = source;
            addThumbnail( source, dropArea );
            selectThumb( source );
          }

        } );

        if ( !_thumbnailUl.childNodes.length ) {

          addThumbnail( _butter.project.thumbnail, dropArea );
          selectThumb( _butter.project.thumbnail );

          _butter.listen( "trackeventadded", trackEventHandle );
          _butter.listen( "trackeventremoved", trackEventHandle );
          _butter.listen( "trackeventupdated", trackEventHandle );
        }

        _thumbnailInput.value = _butter.project.thumbnail;
        TextboxWrapper.applyTo( _thumbnailInput );
      },

      description: function( container ) {
        var input = container.querySelector( ".description-input" ),
            tooltip,
            descriptionTimeout;

        ToolTip.create({
          name: "description-tooltip",
          element: input.parentNode,
          message: Localized.get( "Your description will show up when shared on social media!" ),
          top: "105%",
          left: "50%",
          error: true,
          hidden: true,
          hover: false
        });

        tooltip = ToolTip.get( "description-tooltip" );

        function checkDescription() {
          if ( input.value ) {
            if ( descriptionTimeout ) {
              clearTimeout( descriptionTimeout );
              tooltip.hidden = true;
            }
            return;
          }
          tooltip.hidden = false;

          descriptionTimeout = setTimeout(function() {
            tooltip.hidden = true;
          }, 5000 );
        }

        TextboxWrapper.applyTo( input );

        input.addEventListener( "keyup", checkDescription );

        function checkValue( e ) {
          var target = e.target;

          _butter.project.description = target.value;
        }

        input.addEventListener( "blur", checkValue );
        input.value = _butter.project.description || "";
      },

      searchableCheckbox: function( container ) {
        var input = container.querySelector( ".searchable-checkbox" );
        input.checked = butter.project.public;

        input.addEventListener( "change", function() {
          butter.project.public = input.checked;
        } );
      },

      buttons: function( container, callback ) {
        var yesButtonContainer = container.querySelector( ".yes-button-container" );
        _saveButton = container.querySelector( ".yes-button" );
        _cancelButton = container.querySelector( ".no-button" );
        _saveCallback = callback;
        _cancelButton.addEventListener( "click", onButtonClick );

        _noProjectNameToolTip = ToolTip.create({
          name: "save-tooltip",
          message: Localized.get( "Please give your project a name before saving" ),
          hidden: false,
          element: yesButtonContainer,
          top: "40px"
        });
      }
    };
  }

  return ProjectDetails;

});
