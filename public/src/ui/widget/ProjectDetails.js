/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/popcorn.webmaker.org/master/LICENSE */

define( [ "util/keys", "ui/widget/tooltip", "localized", "ui/widget/textbox" ],
  function( KEYS, ToolTip, Localized, TextboxWrapper ) {

  function ProjectDetails( butter ) {

    var _butter = butter,
        _currentTags = [],
        _thumbnailInput,
        _thumbnailUl;

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
      }, false );

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

    return {
      addThumbnail: addThumbnail,

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

        input.addEventListener( "keydown", function( e ) {
          if ( e.keyCode === KEYS.ENTER || e.keyCode === KEYS.COMMA ) {
            e.preventDefault();
            addTags( encodeURIComponent( e.target.value ) );
            input.value = "";
          }
        }, false );

        input.addEventListener( "blur", function( e ) {
          addTags( encodeURIComponent( e.target.value ) );
          input.value = "";
        }, false );

        // Removal of Tags from project
        ul.addEventListener( "click", function( e ) {
          if ( e.target.tagName === "LI" ) {
            var target = e.target,
                tag = target.value;

            // Remove from tags array
            var i = _currentTags.indexOf( tag );
            _currentTags.splice( i, 1 );
            ul.removeChild( target );
            _butter.project.tags = _currentTags.join( "," );
          }
        }, false );

        if ( !ul.childNodes.length || _currentTags.length !== ul.childNodes.length ||
             _currentTags.length !== _butter.project.tags.length ) {
          var tags = _butter.project.tags;

          // Default a single tag "popcorn" to be present on new projects.
          if ( !tags.length ) {
            tags = "popcorn";
          }

          ul.innerHTML = "";
          _currentTags = [];

          addTags( tags, true );
        }
      },

      thumbnail: function( container, dropArea ) {
       var source,
           events;
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
              addThumbnail( src, dropArea );
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

        }, false );

        if ( !_thumbnailUl.childNodes.length ) {
          events = _butter.getTrackEvents( "type", "image" ).concat( _butter.getTrackEvents( "type", "sequencer" ) );

          for ( var i = 0; i < events.length; i++ ) {
            source = events[ i ].popcornOptions.src || events[ i ].popcornOptions.thumbnailSrc;
            if ( source ) {
              if ( !_butter.project.thumbnail ) {
                // Default it to something cool, if we can.
                _butter.project.thumbnail = source;
              }

              addThumbnail( source, dropArea );
            }
          }

          // Still no default,
          // so default it to something not as cool,
          // but still pretty cool.
          if ( !_butter.project.thumbnail ) {
            _butter.project.thumbnail = location.protocol + "//" + location.host + "/resources/icons/fb-logo.png";
          }

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

        input.addEventListener( "keyup", checkDescription, false );

        function checkValue( e ) {
          var target = e.target;

          _butter.project.description = target.value;
        }

        input.addEventListener( "blur", checkValue, false );
        input.value = _butter.project.description || "";
      },

      buttons: function( container, callback ) {
        var yes = container.querySelector( ".yes-button" ),
            no = container.querySelector( ".no-button" );

        function buttonClick( e ) {
          var target = e.target;

          if ( target === yes ) {
            callback( true );
          } else {
            callback();
          }
        }

        yes.addEventListener( "click", buttonClick, false );
        no.addEventListener( "click", buttonClick, false );
      }
    };
  }

  return ProjectDetails;

});
