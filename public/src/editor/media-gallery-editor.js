/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "localized", "util/lang", "util/uri", "util/xhr", "util/keys", "util/mediatypes", "editor/editor",
 "util/time", "util/dragndrop", "analytics", "l10n!/layouts/media-editor.html", "json!/api/butterconfig" ],
  function( Localized, LangUtils, URI, XHR, KeysUtils, MediaUtils, Editor, Time, DragNDrop, analytics, EDITOR_LAYOUT, CONFIG ) {

  var _parentElement =  LangUtils.domFragment( EDITOR_LAYOUT, ".media-editor" ),
      _addMediaPanel = _parentElement.querySelector( ".add-media-panel" ),

      _clipBtnText = Localized.get( "Create clip" ),
      _searchBtnText = Localized.get( "Search" ),
      _resultsText = Localized.get( "Results" ),
      _myMediaText = Localized.get( "My Media Gallery" ),

      _urlInput = _addMediaPanel.querySelector( ".add-media-input" ),
      _addBtn = _addMediaPanel.querySelector( ".add-media-btn" ),
      _errorMessage = _parentElement.querySelector( ".media-error-message" ),
      _loadingSpinner = _parentElement.querySelector( ".media-loading-spinner" ),

      _searchInput = _addMediaPanel.querySelector( ".search-media-input" ),

      _oldValue,
      _galleryPanel = _parentElement.querySelector( ".media-gallery" ),
      _galleryHeader = _parentElement.querySelector( ".media-gallery-heading" ),
      _galleryList = _galleryPanel.querySelector( "#project-items" ),
      _GALLERYITEM = LangUtils.domFragment( EDITOR_LAYOUT, ".media-gallery-item.gallery-video" ),
      _searchSelector = _parentElement.querySelector( ".search-items > select" ),
      _pagingContainer = _parentElement.querySelector( ".paging-container" ),
      _projectTab = _parentElement.querySelector( ".project-tab" ),
      _searchTab = _parentElement.querySelector( ".search-tab" ),

      _itemContainers = {
        project: _galleryList,
        YouTube: _galleryPanel.querySelector( "#youtube-items" ),
        SoundCloud: _galleryPanel.querySelector( "#soundcloud-items" ),
        Flickr: _galleryPanel.querySelector( "#flickr-items" ),
        Giphy: _galleryPanel.querySelector( "#giphy-items" )
      },
      _sectionContainers = {
        project: _addMediaPanel.querySelector( ".project-clips" ),
        search: _addMediaPanel.querySelector( ".search-items" )
      },

      _currentSearch = "YouTube",
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
        "Flickr",
        "Image"
      ];

  function resetInput() {
    _urlInput.value = "";
    _searchInput.value = "";

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
    _butter.generateSafeTrackEvent({
      type: "image",
      popcornOptions: popcornOptions
    });
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
    } else if ( data.type === "Giphy" ) {
      iconSource += "giphy.png";
    } else {
      data.type = "Image";
      el.querySelector( ".mg-type > img" ).classList.add( "butter-hidden" );
      el.querySelector( ".mg-type-text" ).classList.remove( "photo" );
    }

    el.querySelector( ".mg-type > img" ).src = iconSource;
    el.querySelector( ".mg-type-text" ).innerHTML = data.type;
    thumbnailBtn.appendChild( thumbnailImg );
    thumbnailImg.src = thumbnailSrc;

    if ( options.remove ) {
      deleteBtn.addEventListener( "click", function() {

        thumbnailBtn.removeEventListener( "click", addEvent );
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
      analytics.event( "Track Event Added", {
        label: "clicked"
      });
      var popcornOptions = {
            src: source,
            start: _butter.currentTime,
            title: data.title
          };

      options.callback( popcornOptions, data );
    }

    thumbnailBtn.addEventListener( "click", addEvent );

    options.container.insertBefore( el, options.container.firstChild );

    if ( _this.scrollbar ) {
      _this.scrollbar.update();
    }
    resetInput();
  }

  function addMediaEvent( popcornOptions ) {
    _butter.deselectAllTrackEvents();
    _butter.generateSafeTrackEvent({
      type: "sequencer",
      popcornOptions: popcornOptions
    });
  }

  function addMedia( data, options ) {
    var el = options.element || _GALLERYITEM.cloneNode( true ),
        container = options.container,
        deleteBtn = el.querySelector( ".mg-delete-btn" ),
        thumbnailBtn = el.querySelector( ".mg-thumbnail" ),
        thumbnailImg,
        thumbnailSrc = data.thumbnail,
        source = data.source;

    data.duration = ( +data.duration );

    dragNDrop( thumbnailBtn, {
      source: source,
      fallback: data.fallback,
      denied: data.denied,
      end: data.duration,
      from: data.from || 0,
      title: data.title,
      type: data.type,
      thumbnailSrc: thumbnailSrc,
      duration: data.duration,
      linkback: data.linkback,
      contentType: data.contentType,
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
      } );
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
    if ( thumbnailSrc ) {
      thumbnailImg.classList.add( "media-thumbnail" );
      thumbnailImg.src = thumbnailSrc;
    }

    el.classList.add( "mg-" + data.type.toLowerCase() );

    function addEvent() {
      analytics.event( "Track Event Added", {
        label: "clicked"
      });
      var start = _butter.currentTime,
          end = start + data.duration,
          popcornOptions = {
            source: data.source,
            fallback: data.fallback,
            denied: data.denied,
            start: start,
            end: end,
            type: data.type,
            thumbnailSrc: thumbnailSrc,
            from: data.from || 0,
            title: data.title,
            duration: data.duration,
            linkback: data.linkback,
            contentType: data.contentType,
            hidden: data.hidden || false
          };

      options.callback = options.callback || addMediaEvent;
      options.callback( popcornOptions, data );
    }

    thumbnailBtn.addEventListener( "click", addEvent );

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
      if ( data.type === "image" ) {
        el = LangUtils.domFragment( EDITOR_LAYOUT, ".media-gallery-item.gallery-photo" );
        el.classList.remove( "gallery-item-grid" );
        addPhotos( data, {
          container: _galleryList,
          element: el,
          remove: true
        });
      } else {
        addMedia( data, {
          element: el,
          container: _galleryList,
          remove: true
        });
      }
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

      if ( !_sectionContainers.project.classList.contains( "butter-hidden" ) ) {
        onAddMediaClick();
      } else {
        searchAPIs( true );
      }
    }
  }

  function formatSource( value ) {
    if ( !value ) {
      return "";
    }

    var split = value.split( "?" ),
        querystring = split[ 1 ];

    value = split[ 0 ].trim();

    return querystring ? value + "?" + querystring : value;
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

  function pagingSearchCallback( page ) {
    var search = _currentSearch,
        container = _itemContainers[ _currentSearch ],
        value = _searchInput.value || container.dataset.query,
        query,
        loadingLi = document.createElement( "li" );

    value = value ? value.trim() : "";
    _searchInput.value = value;

    if ( !value ) {
      return onDenied( Localized.get( "Your search contained no results!" ) );
    }

    query = value;
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

    XHR.get( "/api/webmaker/search/" + _currentSearch + "?page=" + page + "&q=" + query, function( data ) {
      container.innerHTML = "";

      if ( data.status === "okay" ) {
        container.setAttribute( "data-total", data.total );

        // If the user selects the project tab before finishing, we still populate that container
        // with results, but prevent the pagination controls from displaying.
        if ( !_projectTab.classList.contains( "butter-active" ) ) {
          pagination( page, data.total, pagingSearchCallback );
        } else {
          pagination( 1, 0, pagingSearchCallback );
        }

        if ( data.results && data.results.length ) {
          for ( var k = 0; k < data.results.length; k++ ) {
            if ( data.results[ k ] ) {
              if ( search !== "Flickr" && search !== "Giphy" ) {
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
          }

          resetInput();
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

    _parentElement.classList.add( "no-paging" );

    if ( !total ) {
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
        prevBtn = document.createElement( "li" ),
        html = document.querySelector( "html" );


    if ( html.dir === "ltr") {
      prevBtn.innerHTML = "<span class=\"icon-chevron-left\"></span>";
      nextBtn.innerHTML = "<span class=\"icon-chevron-right\"></span>";
    } else {
      prevBtn.innerHTML = "<span class=\"icon-chevron-right\"></span>";
      nextBtn.innerHTML = "<span class=\"icon-chevron-left\"></span>";
    }

    ul.innerHTML = "";

    // Show previous?
    if ( page > 1 ) {
      prevBtn.addEventListener( "click", function() {
        callback( page - 1 );
      } );
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
        li.addEventListener( "click", pageClick );
      }

      ul.appendChild( li );
    }

    if ( totalPages > endPage ) {
      var ellipsis = document.createElement( "li" );
      li = document.createElement( "li" );
      li.innerHTML = totalPages;

      li.addEventListener( "click", function() {
        callback( totalPages );
      } );

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

    _parentElement.classList.remove( "no-paging" );
  };

  function searchAPIs( resetPage ) {
    var page = _itemContainers[ _currentSearch ].dataset.page;
    _addBtn.classList.add( "hidden" );

    // Reset page as it's a new search.
    if ( resetPage ) {
      page = 1;
    }

    pagingSearchCallback( page );
  }

  function setup() {
    _urlInput.addEventListener( "focus", onFocus );
    _urlInput.addEventListener( "input", onInput );
    _urlInput.addEventListener( "keydown", onEnter );

    _searchInput.addEventListener( "focus", onFocus );
    _searchInput.addEventListener( "input", onInput );
    _searchInput.addEventListener( "keydown", onEnter );

    _addBtn.addEventListener( "click", function( e ) {
      if ( !_sectionContainers.project.classList.contains( "butter-hidden" ) ) {
        onAddMediaClick( e );
      } else {
        searchAPIs( true );
      }
    } );
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

    _searchSelector.addEventListener( "change", function toggleItemType( e ) {
      var value = e.target.value,
          container;

      for ( var key in _itemContainers ) {
        if ( _itemContainers.hasOwnProperty( key ) ) {
          container = _itemContainers[ key ];

          if ( key === value ) {
            _currentSearch = key;
            container.style.display = "";
            _galleryHeader.innerHTML = _currentSearch + " " + _resultsText;
            pagination( container.dataset.page, container.dataset.total, pagingSearchCallback );
          } else {
            container.style.display = "none";
          }

          _this.scrollbar.update();
        }
      }
    } );

    _projectTab.addEventListener( "mouseup", function() {
      if ( !_projectTab.classList.contains( "butter-active" ) ) {
        _searchTab.classList.remove( "butter-active" );
        _projectTab.classList.add( "butter-active" );
        _galleryPanel.classList.remove( "search-items" );
        _addMediaPanel.classList.remove( "search-items" );

        _addBtn.innerHTML = _clipBtnText;
        _galleryHeader.innerHTML = _myMediaText;
        _sectionContainers.project.classList.remove( "butter-hidden" );
        _sectionContainers.search.classList.add( "butter-hidden" );
        _itemContainers[ _currentSearch ].classList.add( "butter-hidden" );
        _itemContainers.project.classList.remove( "butter-hidden" );

        // We don't page the gallery items that are tied down to a project.
        pagination( 1, 0, pagingSearchCallback );
        resetInput();
        _this.scrollbar.update();
      }
    });

    _searchTab.addEventListener( "mouseup", function() {
      if ( !_searchTab.classList.contains( "butter-active" ) ) {
        var container = _itemContainers[ _currentSearch ];

        _searchTab.classList.add( "butter-active" );
        _projectTab.classList.remove( "butter-active" );
        _galleryPanel.classList.add( "search-items" );
        _addMediaPanel.classList.add( "search-items" );

        _sectionContainers.project.classList.add( "butter-hidden" );
        _sectionContainers.search.classList.remove( "butter-hidden" );
        _itemContainers[ _currentSearch ].classList.remove( "butter-hidden" );
        _itemContainers.project.classList.add( "butter-hidden" );
        _addBtn.innerHTML = _searchBtnText;
        _galleryHeader.innerHTML = _currentSearch + " " + _resultsText;

        pagination( container.dataset.page, container.dataset.total, pagingSearchCallback );
        resetInput();
        _this.scrollbar.update();
      }
    } );

    setup();

    Editor.BaseEditor.extend( _this, butter, rootElement, {
      open: function() {},
      close: function() {}
    });

  }, true );
});
