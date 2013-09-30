/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "localized", "util/lang", "util/uri", "util/xhr", "util/keys", "util/mediatypes", "editor/editor",
 "util/time", "util/dragndrop", "l10n!/layouts/media-editor.html", "json!/api/butterconfig" ],
  function( Localized, LangUtils, URI, XHR, KeysUtils, MediaUtils, Editor, Time, DragNDrop, EDITOR_LAYOUT, CONFIG ) {

  var _parentElement =  LangUtils.domFragment( EDITOR_LAYOUT, ".media-editor" ),
      _addMediaTitle = _parentElement.querySelector( ".add-new-media" ),
      _addMediaPanel = _parentElement.querySelector( ".add-media-panel" ),

      _clipText = Localized.get( "Create new media clip" ),
      _clipBtnText = Localized.get( "Create clip" ),
      _searchText = Localized.get( "Search for items" ),
      _searchBtnText = Localized.get( "Search" ),
      _galleryText = Localized.get( "Gallery" ),
      _projectGalleryText = Localized.get( "Project Gallery" ),

      _urlInput = _addMediaPanel.querySelector( ".add-media-input" ),
      _addBtn = _addMediaPanel.querySelector( ".add-media-btn" ),
      _errorMessage = _parentElement.querySelector( ".media-error-message" ),
      _loadingSpinner = _parentElement.querySelector( ".media-loading-spinner" ),

      _searchInput = _addMediaPanel.querySelector( ".search-media-input" ),

      _oldValue,
      _galleryPanel = _parentElement.querySelector( ".media-gallery" ),
      _galleryHeader = _parentElement.querySelector( ".heading-text" ),
      _galleryList = _galleryPanel.querySelector( ".media-gallery-list" ),
      _GALLERYITEM = LangUtils.domFragment( EDITOR_LAYOUT, ".media-gallery-item.gallery-video" ),
      _sectionSelector = _parentElement.querySelector( ".media-gallery-selector > select" ),
      _pagingContainer = _parentElement.querySelector( ".paging-container" ),
      _itemContainers = {
        user: _galleryList,
        YouTube: _galleryPanel.querySelector( "#youtube-items" ),
        SoundCloud: _galleryPanel.querySelector( "#soundcloud-items" ),
        Flickr: _galleryPanel.querySelector( "#flickr-items" ),
        Giphy: _galleryPanel.querySelector( "#giphy-items" )
      },
      _sectionContainers = {
        user: _addMediaPanel.querySelector( ".user-clips" ),
        search: _addMediaPanel.querySelector( ".search-items" )
      },
      _currentContainer = "user",
      _butter,
      _media,
      _mediaLoadTimeout,
      _cancelSpinner,
      _LIMIT = CONFIG.sync_limit,
      MEDIA_LOAD_TIMEOUT = 10000,
      _this,
      TRANSITION_TIME = 2000,
      _photoTypes = [
        "Giphy",
        "Flickr"
      ];

  function toggleAddNewMediaPanel() {
    _parentElement.classList.toggle( "add-media-collapsed" );
    _this.scrollbar.update();
  }

  function resetInput() {
    _urlInput.value = "";

    clearTimeout( _mediaLoadTimeout );
    clearTimeout( _cancelSpinner );
    _urlInput.classList.remove( "error" );
    _addMediaPanel.classList.remove( "invalid-field" );
    _errorMessage.classList.add( "hidden" );
    _loadingSpinner.classList.add( "hidden" );

    _addBtn.classList.add( "hidden" );
  }

  function onDenied( error, preventFieldHightlight ) {
    clearTimeout( _cancelSpinner );
    clearTimeout( _mediaLoadTimeout );
    _errorMessage.innerHTML = error;
    _loadingSpinner.classList.add( "hidden" );
    if ( !preventFieldHightlight ) {
      _addMediaPanel.classList.add( "invalid-field" );
    }
    setTimeout( function() {
      _errorMessage.classList.remove( "hidden" );
    }, 300 );
  }

  function dragNDrop( element, popcornOptions ) {
    DragNDrop.helper( element, {
      pluginOptions: popcornOptions,
      start: function() {
        for ( var i = 0, l = _butter.targets.length; i < l; ++i ) {
          _butter.targets[ i ].iframeDiv.style.display = "block";
        }
      },
      stop: function() {
        _butter.currentMedia.pause();
        for ( var i = 0, l = _butter.targets.length; i < l; ++i ) {
          _butter.targets[ i ].iframeDiv.style.display = "none";
        }
      }
    });
  }

  function addPhotoEvent( popcornOptions ) {
    _butter.deselectAllTrackEvents();
    _butter.generateSafeTrackEvent( "image", popcornOptions );
  }

  function addPhotos( data, options ) {
    var el = options.element || LangUtils.domFragment( EDITOR_LAYOUT, ".media-gallery-item.gallery-photo" ),
        deleteBtn = el.querySelector( ".mg-delete-btn" ),
        thumbnailBtn = el.querySelector( ".mg-thumbnail" ),
        thumbnailImg = document.createElement( "img" ),
        thumbnailSrc = data.thumbnail,
        iconSource = "/resources/icons/",
        source = data.source;

    thumbnailBtn.addEventListener( "mouseover", function() {
      thumbnailImg.src = source;
    });

    thumbnailBtn.addEventListener( "mouseout", function() {
      thumbnailImg.src = thumbnailSrc;
    });

    dragNDrop( thumbnailBtn, { src: source } );

    thumbnailBtn.setAttribute( "data-popcorn-plugin-type", "image" );
    thumbnailBtn.setAttribute( "data-butter-draggable-type", "plugin" );

    el.querySelector( ".mg-title" ).innerHTML = data.title;

    if ( data.type === "Flickr" ) {
      iconSource += "flickr-black.png";
    } else {
      iconSource += "giphy.png";
    }

    el.querySelector( ".mg-type > img" ).src = iconSource;
    el.querySelector( ".mg-type-text" ).innerHTML = data.type;
    thumbnailBtn.appendChild( thumbnailImg );
    thumbnailImg.src = thumbnailSrc;

    if ( options.remove ) {
      deleteBtn.addEventListener( "click", function() {

        thumbnailBtn.removeEventListener( "click", addEvent, false );
        options.container.removeChild( el );
        _this.scrollbar.update();
        delete _media.clipData[ source ];
        _butter.dispatch( "mediaclipremoved" );
      }, false );
    } else {
      el.removeChild( deleteBtn );
    }

    options.callback = options.callback || addPhotoEvent;

    function addEvent() {
      var start = _butter.currentTime,
          end = start + data.duration,
          popcornOptions = {
            src: source,
            start: start,
            end: end,
            title: data.title
          };

      options.callback( popcornOptions, data );
    }

    thumbnailBtn.addEventListener( "click", addEvent, false );

    options.container.insertBefore( el, options.container.firstChild );

    if ( _this.scrollbar ) {
      _this.scrollbar.update();
    }
    resetInput();
  }

  function addMediaEvent( popcornOptions ) {
    _butter.deselectAllTrackEvents();
    trackEvent = _butter.generateSafeTrackEvent( "sequencer", popcornOptions );
  }

  function addMedia( data, options ) {
    var el = options.element || _GALLERYITEM.cloneNode( true ),
        container = options.container,
        deleteBtn = el.querySelector( ".mg-delete-btn" ),
        thumbnailBtn = el.querySelector( ".mg-thumbnail" ),
        thumbnailImg,
        thumbnailSrc = data.thumbnail,
        source = data.source;

    dragNDrop( thumbnailBtn, {
      source: data.source,
      denied: data.denied,
      end: data.duration,
      from: data.from || 0,
      title: data.title,
      duration: data.duration,
      hidden: data.hidden
    });

    thumbnailBtn.setAttribute( "data-popcorn-plugin-type", "sequencer" );
    thumbnailBtn.setAttribute( "data-butter-draggable-type", "plugin" );

    if ( options.remove ) {
      deleteBtn.addEventListener( "click", function() {

        thumbnailBtn.removeEventListener( "click", addEvent, false );
        container.removeChild( el );
        _this.scrollbar.update();
        delete _media.clipData[ source ];
        _butter.dispatch( "mediaclipremoved" );
      }, false );
    } else {
      el.removeChild( deleteBtn );
    }

    _loadingSpinner.classList.add( "hidden" );

    el.querySelector( ".mg-title" ).innerHTML = data.title;
    el.querySelector( ".mg-type" ).classList.add( data.type.toLowerCase() + "-icon" );
    el.querySelector( ".mg-type-text" ).innerHTML = data.type;
    el.querySelector( ".mg-duration" ).innerHTML = Time.toTimecode( data.duration, 0 );
    if ( data.type === "HTML5" ) {
      if ( typeof data.thumbnail === "object" ) {
        thumbnailSrc = URI.makeUnique( data.source ).toString();
      }
      thumbnailImg = document.createElement( "video" );
    } else {
      thumbnailImg = document.createElement( "img" );
    }
    thumbnailBtn.appendChild( thumbnailImg );
    thumbnailImg.src = thumbnailSrc;

    el.classList.add( "mg-" + data.type.toLowerCase() );

    function addEvent() {
      var start = _butter.currentTime,
          end = start + data.duration,
          playWhenReady = false,
          trackEvent,
          popcornOptions = {
            source: URI.makeUnique( data.source ).toString(),
            denied: data.denied,
            start: start,
            end: end,
            from: data.from || 0,
            title: data.title,
            duration: data.duration,
            linkback: data.linkback,
            hidden: data.hidden || false
          };

      options.callback = options.callback || addMediaEvent;

      if ( end > _media.duration ) {
        _butter.listen( "mediaready", function onMediaReady() {
          _butter.unlisten( "mediaready", onMediaReady );
          if ( playWhenReady ) {
            _media.play();
          }
          options.callback( popcornOptions, data );
        });

        playWhenReady = !_media.paused;
        _media.url = "#t=," + end;
      } else {
        options.callback( popcornOptions, data );
      }
    }

    thumbnailBtn.addEventListener( "click", addEvent, false );

    options.container.insertBefore( el, options.container.firstChild );

    if ( _this.scrollbar ) {
      _this.scrollbar.update();
    }
    resetInput();
  }

  function onSuccess( data ) {
    var el = _GALLERYITEM.cloneNode( true ),
        source = data.source;

    if ( !_media.clipData[ source ] ) {
      _media.clipData[ source ] = data;
      _butter.dispatch( "mediaclipadded" );

      el.classList.add( "new" );

      setTimeout(function() {
        el.classList.remove( "new" );
      }, TRANSITION_TIME );

      addMedia( data, {
        element: el,
        container: _galleryList,
        remove: true
      });
    } else {
      onDenied( Localized.get( "Your gallery already has that media added to it" ) );
    }
  }

  function addMediaToGallery( url, onDenied ) {
    var data = {};

    // Don't trigger with empty inputs
    if ( !url ) {
      return;
    }

    var checkUrl = URI.parse( url );

    if ( !checkUrl.protocol ) {
      url = window.location.protocol + "//" + url;
    }
    data.source = url;
    data.type = "sequencer";
    _mediaLoadTimeout = setTimeout( function() {
      _errorMessage.innerHTML = Localized.get( "Your media source is taking too long to load" );
      _errorMessage.classList.remove( "hidden" );
      _addMediaPanel.classList.add( "invalid-field" );
    }, MEDIA_LOAD_TIMEOUT );
    MediaUtils.getMetaData( data.source, onSuccess, onDenied );
  }

  function onFocus() {
    _oldValue = _urlInput.value;
  }

  function onInput() {
    if ( _urlInput.value || _searchInput.value ) {
      _addBtn.classList.remove( "hidden" );
    } else {
      _addBtn.classList.add( "hidden" );
    }
    clearTimeout( _cancelSpinner );
    clearTimeout( _mediaLoadTimeout );
    _addMediaPanel.classList.remove( "invalid-field" );
    _loadingSpinner.classList.add( "hidden" );
    _errorMessage.classList.add( "hidden" );
  }

  function onEnter( e ) {
    if ( e.keyCode === KeysUtils.ENTER ) {
      e.preventDefault();

      if ( _currentContainer === "user" ) {
        onAddMediaClick();
      } else {
        searchAPIs( true );
      }
    }
  }

  function formatSource( value ) {
    return !value ? "" : value.trim().split( " " ).join( "" );
  }

  function onBlur( e ) {
    e.preventDefault();
  }

  function onAddMediaClick() {
    // transitionend event is not reliable and not cross browser supported.
    _cancelSpinner = setTimeout( function() {
      _loadingSpinner.classList.remove( "hidden" );
    }, 300 );
    _addBtn.classList.add( "hidden" );
    _urlInput.value = formatSource( _urlInput.value );
    addMediaToGallery( _urlInput.value, onDenied );
  }

  function addPhotoCallback( popcornOptions, data ) {
    var source = data.source,
        element;

    // We want to add images from searching/accounts to that project's gallery
    if ( !_media.clipData[ source ] ) {
      _media.clipData[ source ] = data;
      _butter.dispatch( "mediaclipadded" );
      element = LangUtils.domFragment( EDITOR_LAYOUT, ".media-gallery-item.gallery-photo" );
      element.classList.remove( "gallery-item-grid" );
      addPhotos( data, {
        container: _galleryList,
        element: element,
        remove: true
      });
    }

    addPhotoEvent( popcornOptions );
  }

  function addMediaCallback( popcornOptions, data ) {
    if ( !_media.clipData[ data.source ] ) {
      _media.clipData[ data.source ] = data;
      _butter.dispatch( "mediaclipadded" );
      addMedia( data, {
        container: _galleryList,
        remove: true
      });
    }

    addMediaEvent( popcornOptions );
  }

  function pagingCallback( page ) {
    var container = _itemContainers[ _currentContainer ],
        value = _searchInput.value || container.dataset.query,
        query = value,
        loadingLi = document.createElement( "li" );

    if ( !value ) {
      return;
    }

    container.setAttribute( "data-query", value );

    // Hashtags will break URLs
    if ( value.charAt( 0 ) === "#" ) {
      query = value.substring( 1 );
    }

    query = encodeURIComponent( query );
    container.innerHTML = "";
    container.setAttribute( "data-page", page );
    loadingLi.innerHTML = "<span class=\"media-loading-spinner butter-spinner media-gallery-loading\" ></span>";
    container.appendChild( loadingLi );

    XHR.get( "/api/webmaker/search/" + _currentContainer + "?page=" + page + "&q=" + query, function( data ) {
      container.innerHTML = "";

      if ( data.status === "okay" ) {
        container.setAttribute( "data-total", data.total );
        pagination( page, data.total, pagingCallback );

        if ( data.results && data.results.length ) {
          for ( var k = 0; k < data.results.length; k++ ) {
            if ( _currentContainer !== "Flickr" && _currentContainer !== "Giphy" ) {
              addMedia( data.results[ k ], {
                container: container,
                callback: addMediaCallback
              });
            } else {
              addPhotos( data.results[ k ], {
                container: container,
                callback: addPhotoCallback
              });
            }
          }
        } else {
          onDenied( Localized.get( "Your search contained no results!" ) );
        }

        _this.scrollbar.update();
      } else {
        onDenied( Localized.get( "An error occured when making your request!" ), true );
      }
    });
  }

  var pagination = function( page, total, callback ) {

    // Ensure page and toal are always an integer. IE: 2 and not "2"
    page = parseInt( page, 10 );
    total = parseInt( total, 10 );

    _parentElement.classList.remove( "user-gallery" );

    if ( !total ) {
      _parentElement.classList.add( "user-gallery" );
      return;
    }

    var ul = _pagingContainer.querySelector( "ul" ),
        li,
        MAX_NUMS = 5,
        totalPages = total ? Math.ceil( total / _LIMIT ) : 0,
        set = Math.floor( ( page - 1 ) / MAX_NUMS ),
        startPage = set * MAX_NUMS + 1,
        endPage = Math.min( ( set * MAX_NUMS ) + MAX_NUMS, totalPages ),
        nextBtn = document.createElement( "li" ),
        prevBtn = document.createElement( "li" );

    prevBtn.innerHTML = "<span class=\"icon-chevron-left\"></span>";
    nextBtn.innerHTML = "<span class=\"icon-chevron-right\"></span>";

    ul.innerHTML = "";

    // Show previous?
    if ( page > 1 ) {
      prevBtn.addEventListener( "click", function() {
        callback( page - 1 );
      }, false );
      ul.appendChild( prevBtn );
    }

    function pageClick( e ) {
      var nextPage = e.target.getAttribute( "data-page" );

      // Ensure page is always an integer. IE: 2 and not "2"
      nextPage = parseInt( nextPage, 10 );

      callback( nextPage );
    }

    // Iterate over all pages;
    for ( var i = startPage; i <= endPage; i++ ) {
      li = document.createElement( "li" );
      li.innerHTML = i;
      li.setAttribute( "data-page", i );

      if ( i === page ) {
        li.classList.add( "active" );
      }
      // If we only have one page, don't add a listener to trigger another page.
      if ( total > _LIMIT ) {
        li.addEventListener( "click", pageClick, false );
      }

      ul.appendChild( li );
    }

    if ( totalPages > endPage ) {
      var ellipsis = document.createElement( "li" );
      li = document.createElement( "li" );
      li.innerHTML = totalPages;

      li.addEventListener( "click", function() {
        callback( totalPages );
      }, false );

      ellipsis.classList.add( "ellipsis" );
      ul.appendChild( ellipsis );
      ul.appendChild( li );
    }

    if ( page < totalPages ) {
      nextBtn.addEventListener( "click", function() {
        callback( page + 1 );
      }, false );
      ul.appendChild( nextBtn );
    }

  };

  function searchAPIs( resetPage ) {
    var page = _itemContainers[ _currentContainer ].dataset.page;
    _addBtn.classList.add( "hidden" );

    // Reset page as it's a new search.
    if ( resetPage ) {
      page = 1;
    }

    pagingCallback( page );
  }

  function setup() {
    _addMediaTitle.addEventListener( "click", toggleAddNewMediaPanel, false );

    _urlInput.addEventListener( "focus", onFocus, false );
    _urlInput.addEventListener( "input", onInput, false );
    _urlInput.addEventListener( "keydown", onEnter, false );

    _searchInput.addEventListener( "focus", onFocus, false );
    _searchInput.addEventListener( "input", onInput, false );
    _searchInput.addEventListener( "keydown", onEnter, false );

    _addBtn.addEventListener( "click", function( e ) {
      if ( _currentContainer === "user" ) {
        onAddMediaClick( e );
      } else {
        searchAPIs( true );
      }
    }, false );
  }

  Editor.register( "media-editor", null, function( rootElement, butter ) {
    rootElement = _parentElement;
    _this = this;
    _butter = butter;
    _media = _butter.currentMedia;

    // We keep track of clips that are in the media gallery for a project once it is saved
    // and every time after it is saved.
    var clips = _media.clipData,
        clip,
        element;

    for ( var key in clips ) {
      if ( clips.hasOwnProperty( key ) ) {
        clip = clips[ key ];
        if ( typeof clip === "object" ) {
          clip.source = formatSource( clip.source );

          if ( _photoTypes.indexOf( clip.type ) === -1 ) {
            addMedia( clip, {
              container: _galleryList,
              remove: true
            });
          } else {
            element = LangUtils.domFragment( EDITOR_LAYOUT, ".media-gallery-item.gallery-photo" );
            element.classList.remove( "gallery-item-grid" );
            addPhotos( clip, {
              container: _galleryList,
              element: element,
              remove: true
            });
          }
        } else if ( typeof clip === "string" ) {
          // Load projects saved with just the url the old way.
          // Remove it too, so future saves don't come through here.
          delete clips[ key ];
          clip = formatSource( clip );
          // Fire an onSuccess so a new, updated clip is added to clipData.
          MediaUtils.getMetaData( clip, onSuccess );
        }
      }
    }

    _sectionSelector.addEventListener( "change", function toggleItemType( e ) {
      var value = e.target.value,
          container;

      for ( var key in _itemContainers ) {
        if ( _itemContainers.hasOwnProperty( key ) ) {
          container = _itemContainers[ key ];

          if ( key === value ) {
            _currentContainer = key;
            container.style.display = "";

            if ( key !== "user" ) {
              _sectionContainers.user.classList.add( "butter-hidden" );
              _sectionContainers.search.classList.remove( "butter-hidden" );
              _addMediaTitle.innerHTML = _searchText;
              _addBtn.innerHTML = _searchBtnText;
              _galleryHeader.innerHTML = _currentContainer + " " + _galleryText;
              pagination( container.dataset.page, container.dataset.total, pagingCallback );

            } else {
              _addBtn.innerHTML = _clipBtnText;
              _addMediaTitle.innerHTML = _clipText;
              _galleryHeader.innerHTML = _projectGalleryText;
              _sectionContainers.user.classList.remove( "butter-hidden" );
              _sectionContainers.search.classList.add( "butter-hidden" );
              // We don't page the gallery items that are tied down to a project.
              pagination( 1, 0, pagingCallback );
            }

            resetInput();

            _this.scrollbar.update();
          } else {
            container.style.display = "none";
            _this.scrollbar.update();
          }
        }
      }
    }, false );

    setup();

    Editor.BaseEditor.extend( _this, butter, rootElement, {
      open: function() {},
      close: function() {}
    });

  }, true );
});
