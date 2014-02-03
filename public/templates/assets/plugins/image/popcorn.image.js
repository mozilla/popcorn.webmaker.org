"use strict";

// PLUGIN: IMAGE
// Key
(function ( Popcorn ) {

  var APIKEY = "&api_key=b939e5bd8aa696db965888a31b2f1964",
      flickrUrl = "https://secure.flickr.com/services/",
      searchPhotosCmd = flickrUrl + "rest/?method=flickr.photos.search&extras=url_m&media=photos&safe_search=1",
      getPhotosetCmd = flickrUrl + "rest/?method=flickr.photosets.getPhotos&extras=url_m&media=photos",
      getPhotoSizesCmd = flickrUrl + "rest/?method=flickr.photos.getSizes",
      jsonBits = "&format=json&jsoncallback=flickr",
      FLICKR_SINGLE_CHECK = "flickr.com/photos/",
      PER_PAGE_MAX = 100,
      urlRegex = /[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

  function searchImagesFlickr( tags, count, userId, ready ) {
    var uri = searchPhotosCmd + APIKEY + "&page=1&per_page=" + PER_PAGE_MAX;
    if ( userId && typeof userId !== "function" ) {
      uri += "&user_id=" + userId;
    }
    if ( tags ) {
      uri += "&tags=" + window.encodeURIComponent( tags );
    }
    uri += jsonBits;
    Popcorn.getJSONP( uri, function( data ) {
      var callback = ready || userId;

      callback( data, uri );
    });
  }

  function getPhotoSet( photosetId, ready, pluginInstance ) {
    var photoSplit,
        ln,
        url,
        uri,
        i;

    /* Allow for a direct gallery URL to be passed or just a gallery ID. This will accept:
     *
     * http://www.flickr.com/photos/etherworks/sets/72157630563520740/
     * or
     * 72157630563520740
     */
    if ( isNaN( photosetId ) ) {

      if ( photosetId.indexOf( "flickr.com" ) === -1 ) {

        pluginInstance.emit( "invalid-flickr-image" );
        return;
      }

      photoSplit = photosetId.split( "/" );

      // Can't always look for the ID in the same spot depending if the user includes the
      // last slash
      for ( i = 0, ln = photoSplit.length; i < ln; i++ ) {
        url = photoSplit[ i ];
        if ( !isNaN( url ) && url !== "" ) {
          photosetId = url;
          break;
        }
      }
    }

    uri = getPhotosetCmd + "&photoset_id=" + photosetId + "&per_page=" + PER_PAGE_MAX + APIKEY + jsonBits;
    Popcorn.getJSONP( uri, function( data ) {
      ready( data, uri );
    });
  }

  function calculateInOutTimes( start, duration, count ) {
    var inArr = [],
        i = 0,
        last = start,
        interval = duration / count;

    while ( i < count ) {
      inArr.push({
        "in": last = Math.round( ( start + ( interval * i++ ) ) * 100 ) / 100,
        out: i < count ? Math.round( ( last + interval ) * 100 ) / 100 : start + duration
      });
    }
    return inArr;
  }

  function validateDimension( value, fallback ) {
    if ( typeof value === "number" ) {
      return value;
    }
    return fallback;
  }

  function createImageDiv( imageUrl, linkUrl, instance ) {
    var imageDiv = document.createElement( "div" ),
        link = document.createElement( "a" );

    imageDiv.style.backgroundImage = "url( \"" + imageUrl + "\" )";
    imageDiv.classList.add( "image-plugin-img" );

    if ( linkUrl && linkUrl.match( urlRegex ) ) {
      link.setAttribute( "href", linkUrl );

      link.onclick = function() {
        instance.media.pause();
      };
    }
    link.setAttribute( "target", "_blank" );
    link.classList.add( "image-plugin-link" );

    link.appendChild( imageDiv );
    return link;
  }

  Popcorn.plugin( "image", {

    _setup: function( options ) {

      var _target,
          _container,
          _flickrCallback,
          _link,
          _image,
          _this = this;

      function setupImageDiv() {
        _container.appendChild( _link );
        _image = _link.querySelector( ".image-plugin-img" );
        _image.style.left = validateDimension( options.innerLeft, "0" ) + "%";
        _image.style.top = validateDimension( options.innerTop, "0" ) + "%";
        if ( options.innerHeight ) {
          _image.style.height = validateDimension( options.innerHeight, "0" ) + "%";
        }
        if ( options.innerWidth ) {
          _image.style.width = validateDimension( options.innerWidth, "0" ) + "%";
        }
        options.link = _link;
        options.image = _image;
      }

      options._target = _target = Popcorn.dom.find( options.target );
      options._container = _container = document.createElement( "div" );

      _container.classList.add( "image-plugin-container" );
      _container.style.width = validateDimension( options.width, "100" ) + "%";
      _container.style.height = validateDimension( options.height, "100" ) + "%";
      _container.style.top = validateDimension( options.top, "0" ) + "%";
      _container.style.left = validateDimension( options.left, "0" ) + "%";
      _container.style.zIndex = +options.zindex;
      _container.classList.add( options.transition );
      _container.classList.add( "off" );

      if ( _target ) {

        _target.appendChild( _container );

        if ( options.src ) {

          if ( options.src.indexOf( FLICKR_SINGLE_CHECK ) > -1 ) {
            var url = options.src,
                urlSplit,
                uri,
                ln,
                _flickrStaticImage,
                photoId,
                i;

            urlSplit = url.split( "/" );

            for ( i = 0, ln = urlSplit.length; i < ln; i++ ) {
              url = urlSplit[ i ];
              if ( !isNaN( url ) && url !== "" ) {
                photoId = url;
                break;
              }
            }

            uri = getPhotoSizesCmd + APIKEY + "&photo_id=" + photoId + jsonBits;


            _flickrStaticImage = function( data ) {

              if ( data.stat === "ok" ) {

                // Unfortunately not all requests contain an "Original" size option
                // so I'm always taking the second last one. This has it's upsides and downsides
                _link = createImageDiv( data.sizes.size[ data.sizes.size.length - 2 ].source, options.linkSrc, _this );
                setupImageDiv();
              }
            };

            Popcorn.getJSONP( uri, _flickrStaticImage );
          } else {
            _link = createImageDiv( options.src, options.linkSrc, _this );
            setupImageDiv();
          }
        } else {

          var _inOuts = [],
              _lastVisible,
              _tagRefs = [];

          options._updateImage = function() {
            var io,
                ref,
                currTime = _this.currentTime(),
                i = _tagRefs.length - 1;
            for ( ; i >= 0; i-- ) {
              io = _inOuts[ i ];
              ref = _tagRefs[ i ];
              if ( io && currTime >= io[ "in" ] && currTime < io.out && ref.classList.contains( "image-plugin-hidden" ) ) {
                if ( _lastVisible ) {
                  _lastVisible.classList.add( "image-plugin-hidden" );
                }
                ref.classList.remove( "image-plugin-hidden" );
                _lastVisible = ref;
                break;
              }
            }
          };

          _flickrCallback = function( data, url ) {

            var _collection = ( data.photos || data.photoset ),
                _photos,
                _url,
                _totalPhotos,
                item;

            if ( !_collection ) {
              return;
            }

            _totalPhotos = _collection.total;
            _photos = _collection.photo;

            if ( !_photos ) {
              return;
            }

            for ( var i = 0; i < _photos.length; i++ ) {
              if ( options.count > _tagRefs.length ) {
                item = _photos[ i ];
                _url = ( item.media && item.media.m ) || window.unescape( item.url_m );
                _link = createImageDiv( _url, _url, _this );
                _link.classList.add( "image-plugin-hidden" );
                _container.insertBefore( _link, _container.children[ i ] );
                _tagRefs.push( _link );
              } else {
                break;
              }
            }

            if ( _tagRefs.length < options.count && _collection.page !== _collection.pages && _photos.length === PER_PAGE_MAX ) {
              url = url.replace( /\&per\_page\=[0-9]+/, "" );
              url += "&per_page=" + _collection.page + 1;

              Popcorn.getJSONP( url, function( data ) {
                _flickrCallback( data, url );
              });
            } else {
              _inOuts = calculateInOutTimes( options.start, options.end - options.start, _tagRefs.length );

              if ( !_tagRefs.length ) {
                _this.emit( "popcorn-image-failed-retrieve" );
                return;
              }

              if ( options.count !== _tagRefs.length ) {
                options.count = _tagRefs.length;
                // Used to sync back the new count data with Butter Events
                _this.emit( "popcorn-image-count-update", options.count );
              }

              // Check if should be currently visible
              options._updateImage();

              //  Check if should be updating
              if ( _this.currentTime() >= options.start && _this.currentTime() <= options.end ) {
                _this.on( "timeupdate", options._updateImage );
              }
            }
          };

          if ( options.tags ) {
            searchImagesFlickr( options.tags, options.count || 10, _flickrCallback );
          } else if ( options.photosetId ) {
            getPhotoSet( options.photosetId, _flickrCallback, _this );
          }
        }

        options.toString = function() {
          var _splitSource = [];
          if ( options.title ) {
            return options.title;
          } else if ( /^data:/.test( options.src ) ) {
            // might ba a data URI
            return options.src.substring( 0 , 30 ) + "...";
          } else if ( options.src ) {
            _splitSource = options.src.split( "/" );
            return _splitSource[ _splitSource.length - 1 ];
          } else if ( options.tags ) {
            return options.tags;
          } else if ( options.photosetId ) {
            return options.photosetId;
          }

          return "Image Plugin";
        };
      }
    },

    start: function( event, options ) {
      var container = options._container,
          redrawBug;

      if ( container ) {
        if ( options._updateImage ) {
          this.on( "timeupdate", options._updateImage );
        }

        container.classList.add( "on" );
        container.classList.remove( "off" );

        // Safari Redraw hack - #3066
        container.style.display = "none";
        redrawBug = container.offsetHeight;
        container.style.display = "";
      }
    },

    end: function( event, options ) {
      if( options._container ) {
        if ( options._updateImage ) {
          this.off( "timeupdate", options._updateImage );
        }

        options._container.classList.add( "off" );
        options._container.classList.remove( "on" );
      }
    },

    _teardown: function( options ) {
      if ( options._updateImage ) {
        this.off( options._updateImage );
      }
      options._container.parentNode.removeChild( options._container );
      delete options._container;
    },

    manifest: {
      about: {
        name: "Popcorn image Plugin",
        version: "0.1",
        author: "cadecairos",
        website: "https://chrisdecairos.ca/"
      },
      options: {
        target: "video-overlay",
        src: {
          elem: "input",
          type: "url",
          label: "Source URL",
          "default": "https://popcorn.webmaker.org/resources/popcorn-logo.svg",
          FLICKR_SINGLE_CHECK: FLICKR_SINGLE_CHECK
        },
        linkSrc: {
          elem: "input",
          type: "url",
          label: "Link URL",
          validation: urlRegex
        },
        tags: {
          elem: "input",
          type: "text",
          label: "Flickr: Tags",
          optional: true,
          "default": "Mozilla"
        },
        photosetId: {
          elem: "input",
          type: "text",
          label: "Flickr: Photoset Id",
          optional: true,
          "default": "http://www.flickr.com/photos/etherworks/sets/72157630563520740/"
        },
        count: {
          elem: "input",
          type: "number",
          label: "Flickr: Count",
          optional: true,
          "default": 3,
          MAX_COUNT: 20
        },
        width: {
          elem: "input",
          type: "number",
          label: "Width",
          "default": 100,
          "units": "%",
          hidden: true
        },
        height: {
          elem: "input",
          type: "number",
          label: "Height",
          "default": 100,
          "units": "%",
          hidden: true
        },
        top: {
          elem: "input",
          type: "number",
          label: "Top",
          "default": 0,
          "units": "%",
          hidden: true
        },
        left: {
          elem: "input",
          type: "number",
          label: "Left",
          "default": 0,
          "units": "%",
          hidden: true
        },
        innerTop: {
          elem: "input",
          type: "number",
          "default": 0,
          "units": "%",
          hidden: true
        },
        innerLeft: {
          elem: "input",
          type: "number",
          "default": 0,
          "units": "%",
          hidden: true
        },
        innerWidth: {
          elem: "input",
          type: "number",
          "default": 0,
          "units": "%",
          hidden: true
        },
        innerHeight: {
          elem: "input",
          type: "number",
          "default": 0,
          "units": "%",
          hidden: true
        },
        title: {
          elem: "input",
          type: "text",
          label: "Image Title",
          "default": ""
        },
        transition: {
          elem: "select",
          options: [ "None", "Pop", "Slide Up", "Slide Down", "Fade" ],
          values: [ "popcorn-none", "popcorn-pop", "popcorn-slide-up", "popcorn-slide-down", "popcorn-fade" ],
          label: "Transition",
          "default": "popcorn-fade"
        },
        start: {
          elem: "input",
          type: "text",
          label: "Start",
          units: "seconds"
        },
        end: {
          elem: "input",
          type: "text",
          label: "End",
          units: "seconds"
        },
        zindex: {
          hidden: true
        }
      }
    }
  });
}( window.Popcorn ));
