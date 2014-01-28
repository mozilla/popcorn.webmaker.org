(function ( Popcorn ) {

  var _pluginRoot = "/templates/assets/plugins/popup/";

  function newlineToBreak( string, elem ) {
    var splitNewlines = string.split( /\r?\n/gm );

    if ( splitNewlines.length > 1 ) {
      string = document.createTextNode( splitNewlines[ 0 ] );
      elem.appendChild( string );
      elem.appendChild( document.createElement( "br" ) );

      for ( var i = 1; i < splitNewlines.length; i++ ) {
        var breakElem,
            textNode = document.createTextNode( splitNewlines[ i ] );

        elem.appendChild( textNode );

        if ( splitNewlines[ i + 1 ] ) {
          breakElem = document.createElement( "br" );
          elem.appendChild( breakElem );
        }
      }
    } else {
      string = document.createTextNode( string );
      elem.appendChild( string );
    }
  }

  var descriptionHelper = (function parseFactory() {
    var descriptionRegex = /([\S\s]*)(\[[\S\s]+\]\(http[s]?:\/\/[\S]+\))([\S\s]*)/g;

    // Individual link regex
    var rawLinkRegex = /\[[\s\S]+\]\([\S]+ ?[\S]*\)/g,
        urlPhraseRegex = /^(\[)([ \S]+)(\])/,
        urlLinkRegex = /(\()([\S]+)(\))$/;

    // Containers for parsed data
    var markdownRemoved,
        finalCode;

    /**
     * parseText
     * --
     * Recursive function. Separates plaintext from
     * markdown-style link markup, then returns an
     * array containing both in the order they appeared
     * in the original string.
     * --
     * string : string to be parsed,
     * parsedText : array to attach results to (optional)
     */
    function parseText( string, parsedText ) {
      var matches;
      parsedText = parsedText || [];

      if ( !string ) {
        return null;
      }

      matches = descriptionRegex.exec( string );
      if ( matches ) {
        // Check if the first grouping needs more processing,
        // and if so, only keep the second (markup) and third (plaintext) groupings
        if ( matches[ 1 ].match( descriptionRegex ) ) {
          parsedText.unshift( matches[ 2 ], matches[ 3 ] );
        } else {
          parsedText.unshift( matches[ 1 ], matches[ 2 ], matches[ 3 ] );
        }

        return parseText( matches[ 1 ], parsedText );
      }

      return parsedText;
    }

    /**
     * parseLink
     * --
     * Returns an object with a phrase, and the link associated
     * with it.
     * --
     * rawLink : Markdown string to be parsed
     */
    function parseLink( rawLink ) {
      if ( rawLink && rawLink.length ) {
        rawLink = rawLink[ 0 ];
        return {
          phrase: rawLink.match( urlPhraseRegex )[ 2 ],
          url: rawLink.match( urlLinkRegex )[ 2 ]
        };
      }

      return null;
    }

    function parseDescription( rawText ) {
      var rawBits = parseText( rawText );

      // Reset containers
      markdownRemoved = "";
      finalCode = [];

      if ( rawBits && rawBits.length ) {
        var match,
            link;

        rawBits.forEach(function( rawBit ) {
          // Check if it's a link to be parsed
          match = rawBit.match( rawLinkRegex );
          link = parseLink( match );

          if ( link ) {
            finalCode.push( link );
            markdownRemoved += link.phrase;
          } else {
            // Wasn't a link? Must be plaintext
            finalCode.push( rawBit );
            markdownRemoved += rawBit;
          }
        });
      }

      return {
        finalCode: finalCode,
        markdownRemoved: markdownRemoved
      };
    }

    return {
      parseDescription: parseDescription,
      finalCode: function getFinalCode() {
        return finalCode;
      },
      markdownRemoved: function getMarkdownRemoved() {
        return markdownRemoved;
      }
    };
  })();

  Popcorn.plugin( "slider", {
    manifest: {
      about: {
        name: "Popcorn slider Plugin",
        version: "0.1",
        author: "@mjschranz, @sedge"
      },
      options: {
        start: {
          elem: "input",
          type: "text",
          label: "In",
          "units": "seconds"
        },
        end: {
          elem: "input",
          type: "text",
          label: "Out",
          "units": "seconds"
        },
        title: {
          elem: "input",
          type: "text",
          label: "sliderTitle",
          "default": "Title here!",
          hidden: false
        },
        description: {
          elem: "textarea",
          type: "text",
          label: "sliderDescription",
          "default": "Add links using the [markdown](http://goo.gl/wPqayl) link syntax.",
          instructions: "Add links using the [markdown](http://goo.gl/wPqayl) link syntax.",
          hidden: false
        },
        // The description as viewed by the end-user,
        // i.e. no markup (html or markdown)
        textDescription: {
          hidden: true
        },
        icon: {
          elem: "select",
          options: [ "Error", "Audio", "Broken Heart", "Cone", "Earth",
                     "Eye", "Heart", "Info", "Man", "Money", "Music", "Net",
                     "Skull", "Star", "Thumbs Down", "Thumbs Up", "Time",
                     "Trophy", "Tv", "User", "Virus", "Women" ],
          values: [ "error", "audio", "brokenheart", "cone", "earth",
                     "eye", "heart", "info", "man", "money", "music", "net",
                     "skull", "star", "thumbsdown", "thumbsup", "time",
                     "trophy", "tv", "user", "virus", "women" ],
          label: "sliderImage",
          "default": "error",
          optional: true
        },
        left: {
          elem: "input",
          type: "number",
          label: "X Position",
          "units": "%",
          "default": 2,
          hidden: true
        },
        top: {
          elem: "input",
          type: "number",
          label: "Y Position",
          "units": "%",
          "default": 60,
          hidden: true
        },
        transition: {
          elem: "select",
          options: [ "None", "Fade", "Slide Up", "Slide Down", "Slide Left", "Slide Right" ],
          values: [ "popcorn-none", "popcorn-fade", "popcorn-slide-up", "popcorn-slide-down",
                    "popcorn-slide-left", "popcorn-slide-right" ],
          label: "sliderTransition",
          "default": "popcorn-slide-right"
        },
        theme: {
          elem: "select",
          options: [ "sliderTheme-light", "sliderTheme-dark" ],
          values: [ "popcorn-slider-light", "popcorn-slider-dark" ],
          label: "sliderTheme",
          "default": "popcorn-slider-light"
        },
        zindex: {
          hidden: true
        }
      }
    },

    _setup: function( options ) {
      // Expose parseDescription
      options.parseDescription = descriptionHelper.parseDescription;

      // Scaffolding vars
      var outerContainer = options._container = document.createElement( "div" ),
          textContainer = document.createElement( "div" ),
          imgContainer = document.createElement( "div" ),
          header = document.createElement( "h2" ),
          description = document.createElement( "p" ),
          img = document.createElement( "img" ),
          target = Popcorn.dom.find( options.target );

      // Pull parsed description from `descriptionHelper` object
      var finalCode = descriptionHelper.finalCode();

      var context = this;

      if ( !target ) {
        target = this.media.parentNode;
      }

      outerContainer.style.zIndex = +options.zindex;
      outerContainer.style.left = options.left + "%";
      outerContainer.style.top = options.top + "%";

      // Add base classes.
      options._target = target;
      outerContainer.id = Popcorn.guid( "slider" );
      outerContainer.classList.add( "slider-outer" );

      if ( options.transition ) {
        outerContainer.classList.add( options.transition );
      }

      outerContainer.classList.add( "off" );
      textContainer.classList.add( "slider-inner" );
      header.classList.add( "slider-header" );
      description.classList.add( "slider-description" );

      // Check that description has been parsed
      if ( !( finalCode && typeof( finalCode.push ) === "function" ) ) {
        descriptionHelper.parseDescription( options.description );
        finalCode = descriptionHelper.finalCode();
      }

      // Construct final version of description
      if ( finalCode && finalCode.length ) {
        finalCode.forEach(function( result ) {
          if ( typeof( result ) === "string" ) {
            newlineToBreak( result, description );
          } else {
            var link;

            link = document.createElement( "a" );
            link.target = "_blank";
            link.href = result.url;
            newlineToBreak( result.phrase, link );

            link.addEventListener( "click", function(){
              context.media.pause();
            }, false );

            description.appendChild( link );
          }
        });
      } else {
        description.innerHTML = "";
      }

      // Basic addition of text.
      newlineToBreak( options.title, header );
      textContainer.appendChild( header );
      textContainer.appendChild( description );
      imgContainer.appendChild( img );
      outerContainer.appendChild( imgContainer );
      outerContainer.appendChild( textContainer );
      target.appendChild( outerContainer );

      // Setup image
      imgContainer.classList.add( "slider-icon" );
      img.src = _pluginRoot + "images/" + options.icon + ".png";

      options.toString = function() {
        // use the default option if it doesn't exist
        return options.title;
      };

      // Apply theme
      outerContainer.classList.add( options.theme );
    },

    start: function( event, options ) {
      if ( options._container ) {
        options._container.classList.remove( "off" );
      }
    },

    end: function( event, options ) {
      if ( options._container ) {
        options._container.classList.add( "off" );
      }
    },

    _teardown: function( options ) {
      if ( options._target ) {
        options._target.removeChild( options._container );
      }
    }
  });
}( window.Popcorn ));

