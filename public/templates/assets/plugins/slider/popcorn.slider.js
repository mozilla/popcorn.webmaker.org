(function ( Popcorn ) {

   var _pluginRoot = "/templates/assets/plugins/popup/";

  function newlineToBreak( string ) {
    // Deal with both \r\n and \n
    return string.replace( /\r?\n/gm, "<br>" );
  }

  Popcorn.plugin( "slider", {

    manifest: {
      about: {
        name: "Popcorn slider Plugin",
        version: "0.1",
        author: "@mjschranz"
      },
      options: {
        textHeader: {
          elem: "textarea",
          label: "Text",
          "default": "Sample Header"
        },
        textDescription: {
          elem: "textarea",
          label: "Text",
          "default": "This is some basic description"
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
          label: "Image",
          "default": "error",
          optional: true
        },
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
        left: {
          elem: "input",
          type: "number",
          label: "X Position",
          "units": "%",
          "default": 2
        },
        top: {
          elem: "input",
          type: "number",
          label: "Y Position",
          "units": "%",
          "default": 60
        },
        transition: {
          elem: "select",
          options: [ "None", "Pop", "Fade", "Slide Up", "Slide Down", "Slide Left", "Slide Right" ],
          values: [ "popcorn-none", "popcorn-pop", "popcorn-fade", "popcorn-slide-up", "popcorn-slide-down",
                    "popcorn-slide-left", "popcorn-slide-right" ],
          label: "Transition",
          "default": "popcorn-slide-right"
        },
        zindex: {
          hidden: true
        }
      }
    },

    _setup: function( options ) {
      var outerContainer = options._container = document.createElement( "div" ),
          textContainer = document.createElement( "div" ),
          imgContainer = document.createElement( "div" ),
          header = document.createElement( "h2" ),
          description = document.createElement( "p" ),
          img = document.createElement( "img" ),
          target = Popcorn.dom.find( options.target );

      if ( !target ) {
        target = this.media.parentNode;
      }

      outerContainer.style.zIndex = +options.zindex;
      outerContainer.style.left = options.left + "%";
      outerContainer.style.top = options.top + "%";

      // Add base classes.
      options._target = target;
      outerContainer.id = Popcorn.guid( "slider" );
      outerContainer.classList.add( "fivel-slider-outer" );

      if ( options.transition ) {
        outerContainer.classList.add( options.transition );
      }

      outerContainer.classList.add( "off" );
      textContainer.classList.add( "fivel-slider-inner" );
      header.classList.add( "fivel-slider-header" );
      description.classList.add( "fivel-slider-description" );

      // Basic addition of text.
      header.innerHTML = newlineToBreak( options.textHeader );
      description.innerHTML = newlineToBreak( options.textDescription );
      textContainer.appendChild( header );
      textContainer.appendChild( description );
      imgContainer.appendChild( img );
      outerContainer.appendChild( imgContainer );
      outerContainer.appendChild( textContainer );
      target.appendChild( outerContainer );

      // Setup image
      imgContainer.classList.add( "fivel-slider-icon" );
      img.src = _pluginRoot + "images/" + options.icon + ".png";

      options.toString = function() {
        // use the default option if it doesn't exist
        return options.textHeader + "," + options.textDescription;
      };
    },

    start: function( event, options ) {
      if ( options._container ) {
        options._container.classList.remove( "off" );      }
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