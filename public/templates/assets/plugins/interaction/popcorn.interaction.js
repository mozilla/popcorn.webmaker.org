(function( Popcorn ) {
  // Javascript shim for element.classList compatibility in IE 8
  if(typeof document!=="undefined"&&!("classList"in document.documentElement)){(function(e){"use strict";if(!("HTMLElement"in e)&&!("Element"in e))return;var t="classList",n="prototype",r=(e.HTMLElement||e.Element)[n],i=Object,s=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++){if(t in this&&this[t]===e){return t}}return-1},u=function(e,t){this.name=e;this.code=DOMException[e];this.message=t},a=function(e,t){if(t===""){throw new u("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(t)){throw new u("INVALID_CHARACTER_ERR","String contains an invalid character")}return o.call(e,t)},f=function(e){var t=s.call(e.className),n=t?t.split(/\s+/):[],r=0,i=n.length;for(;r<i;r++){this.push(n[r])}this._updateClassName=function(){e.className=this.toString()}},l=f[n]=[],c=function(){return new f(this)};u[n]=Error[n];l.item=function(e){return this[e]||null};l.contains=function(e){e+="";return a(this,e)!==-1};l.add=function(){var e=arguments,t=0,n=e.length,r,i=false;do{r=e[t]+"";if(a(this,r)===-1){this.push(r);i=true}}while(++t<n);if(i){this._updateClassName()}};l.remove=function(){var e=arguments,t=0,n=e.length,r,i=false;do{r=e[t]+"";var s=a(this,r);if(s!==-1){this.splice(s,1);i=true}}while(++t<n);if(i){this._updateClassName()}};l.toggle=function(e,t){e+="";var n=this.contains(e),r=n?t!==true&&"remove":t!==false&&"add";if(r){this[r](e)}return!n};l.toString=function(){return this.join(" ")};if(i.defineProperty){var h={get:c,enumerable:true,configurable:true};try{i.defineProperty(r,t,h)}catch(p){if(p.number===-2146823252){h.enumerable=false;i.defineProperty(r,t,h)}}}else if(i[n].__defineGetter__){r.__defineGetter__(t,c)}})(self)}

  var importMousetrap = document.createElement( "script" );

  importMousetrap.src = "http://cdn.craig.is/js/mousetrap/mousetrap.min.js";
  importMousetrap.type = "text/javascript";

  document.head.appendChild( importMousetrap );
  importMousetrap.onload = function() {
    /**
     * mouseTrapHelperFactory()
     * ----
     * Returns an object with five methods:
     *
     * bindInputTag( tag, sequence )
     *  | Sets up key-selection functionality in the passed
     *  | `tag`, and stores the sequence entered by the user in
     *  | the passed `sequence` array.  When a `blur` event fires
     *  | on the `tag`, pressing the sequence of keys the user selected
     *  | will fire a default callback.
     *  |
     *  | `tag` = Dom reference to an input tag
     *  | `sequence` = Array containing keys to be pressed in order
     *
     * updateCallback( newCallback )
     *  | If passed a function, sets it as the callback to fire
     *  | when a user-specified and bound key-combination is pressed
     *
     * bindSequence( sequence, callback )
     *  | Binds the key sequence represented by an array of strings
     *  | to fire `callback`
     *
     * unbindSequence( sequence )
     *  | Release the key sequence being monitored by
     *  | the Mousetrap library.
     *
     * bindAll( callback )
     *  | Bind a callback to each individual key
     *
     * bindKeyup( key, callback )
     *  | Bind callback to the keyup event on the passed key
     *
     * sequenceToString( key )
     *  | Returns a human-readable string representing the sequence
     *  | in the passed array
     */
    var _mousetrapHelper = (function mouseTrapHelperFactory( options ) {
      var KEYS = options.keys || {
        // Non Alphanumeric
        alt: "alt",
        backspace: "backspace",
        capslock: "capslock",
        ctrl: "ctrl",
        del: "del",
        down: "down",
        enter: "enter",
        esc: "esc",
        end: "end",
        escape: "escape",
        home: "home",
        ins: "ins",
        left: "left",
        meta: "meta",
        pageup: "pageup",
        pagedown: "pagedown",
        "return": "return",
        right: "right",
        shift: "shift",
        space: "space",
        tab: "tab",
        up: "up",

        // Numbers
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",

        // Alphabet
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        e: "e",
        f: "f",
        g: "g",
        h: "h",
        i: "i",
        j: "j",
        k: "k",
        l: "l",
        m: "m",
        n: "n",
        o: "o",
        p: "p",
        q: "q",
        r: "r",
        s: "s",
        t: "t",
        u: "u",
        v: "v",
        w: "w",
        x: "x",
        y: "y",
        z: "z"
      },
      modifiers = options.modifiers || {
        ctrl: "ctrl",
        alt: "alt",
        shift: "shift",
        meta: "meta",
        option: "option"
      },
      macKeys = {
        alt: "option",
        meta: "cmd",
        enter: "return",
        backspace: "delete"
      };

      var keyComboCallback = function keyComboCallback( e ) {
        console.error( "No callback has been specified for the mouseTrapHelper." );
        e.preventDefault();
      };
      var _self = this;

      options = options || {};

      // Removes all elements from the passed array reference
      function cleanArray( array ) {
        if ( array && array.length ) {
          var length = array.length,
              i;

          for ( i = 0; i < length; i++ ) {
            array.pop();
          }
        }
      }

      function bindAll( callback ) {
        callback = callback || function() {
          console.log( "No bindAll callback specified!" );
        };

        for ( var key in KEYS ) {
          if ( KEYS.hasOwnProperty( key ) ) {
            Mousetrap.bind( key, callback );
          }
        }
      }

      function unbindAll() {
        for ( var key in KEYS ) {
          if ( KEYS.hasOwnProperty( key ) ) {
            Mousetrap.unbind( key );
          }
        }
      }

      function listenForAssignment( tag, sequence ) {
        function addKeyToSequence( e, combo ) {
          e.preventDefault();
          if ( sequence.length < 4 ) {
            sequence.push( combo );
          } else {
            cleanArray( sequence );
            sequence.push( combo );
          }

          tag.value = sequenceToString( sequence );
        }

        bindAll( addKeyToSequence );
      }

      // Generates a string indicating the allowed
      // key-combos in a way the Mousetrap library
      // will understand
      function sequenceToKeycombo( sequence ) {
        var modKeys = [],
            modSequence = "",
            modLength,
            otherKeys = [],
            otherLength,
            length = sequence && sequence.length,
            key,
            ret = "",
            i;

        if ( length ) {
          // Split modifier and other keys into
          // seperate arrays
          for ( i = 0; i < length; i++ ) {
            key = sequence[ i ];
            if ( modifiers[ key ] ) {
              modKeys.push( key );
            } else {
              otherKeys.push( key );
            }
          }

          // Create first part of keycombo (modifiers)
          modLength = modKeys.length;
          if ( modLength ) {
            for ( i = 0; i < modLength - 1; i++ ) {
              modSequence += modKeys[ i ] + "+";
            }
            modSequence += modKeys[ i ];
          }

          // Create second part of keycombo (non-modifiers)
          // and return result
          otherLength = otherKeys.length;
          if ( otherLength > 1 ) {
            for ( i = 0; i < otherLength - 1; i++ ) {
              ret += modSequence + "+" + otherKeys[ i ] + " ";
            }
            ret += modSequence + "+" + otherKeys[ i ];
          } else {
            ret += modSequence + ( otherLength ? "+" + otherKeys[ 0 ] : "" );
          }
        }

        return ret;
      }

      function sequenceToString( sequence ) {
        var length = sequence.length,
            ret = "";
        if ( length ) {
            var i = 0;

            for ( ; i < length - 1; i++ ) {
                ret += sequence[ i ] + "+";
            }
            ret += sequence[ i ];
        }

        // Search & replace for mac keys when appropriate
        if ( _keyboardHelper.getOS() === "mac" ) {
          for ( var key in macKeys ) {
            if ( macKeys.hasOwnProperty( key ) ) {
              ret = ret.replace( key, macKeys[ key ], "gi" );
            }
          }
        }

        return ret;
      }

      return {
        bindInputTag: function( tag, sequence, focus, unfocus ) {
          // On focus, reset array & unbind old listeners
          // then clear tag value and listen for new keystrokes
          tag.onfocus = function onFocus( e ) {
            Mousetrap.unbind( sequenceToKeycombo( sequence ) );
            cleanArray( sequence );
            tag.value = "";
            listenForAssignment( tag, sequence );
            focus();
          };

          // On blur, stop listening for key-combos
          // and listen for the user defined key-combos
          tag.onblur = function onBlur( e ) {
            unbindAll();
            unfocus();
          };
        },
        updateCallback: function( newCallback ) {
          keyComboCallback = newCallback;
        },
        bindSequence: function( sequence, callback ) {
          callback = callback || keyComboCallback;

          Mousetrap.bind( sequenceToKeycombo( sequence ), callback );
        },
        unbindSequence: function( sequence ) {
          Mousetrap.unbind( sequenceToKeycombo( sequence ) );
        },
        bindKeyup: function( key, callback ) {
          Mousetrap.bind( key, callback, "keyup" );
        },
        bindAll: bindAll,
        unbindAll: unbindAll,
        sequenceToString: sequenceToString
      };
    })({});

    /**
     * keyboardHelperFactory()
     * ----
     * Returns an object with eight methods:
     *
     * insertKeyboard( element )
     *  | Inserts keyboard into the passed element
     *
     * showKeyboard()
     *  | Fades in the keyboard
     *
     * hideKeyboard()
     *  | Fades out the keyboard
     *
     * correctKey( key )
     *  | Highlights the passed key in green
     *
     * incorrectKey( key )
     *  | Highlights the passed key in red
     *
     * keyOff( key )
     *  | Removes the highlight from the passed key
     *
     * clearKeys()
     *  | Removes all key highlights
     *
     * setMessage( message )
     *  | Changes the message displayed above the keyboard
     *
     * getOS()
     *  | Returns a string representing the OS type
     */
    var _keyboardHelper = (function keyboardHelperFactory( options ){
      var keyboardCode = "<div class=\"keyboard_left\"><!-- row 1 --><div class=\"keyboard_row\"><div class=\"key key_backtick\">`</div><div class=\"key key_1\"><span>1</span></div><div class=\"key key_2\"><span>2</span></div><div class=\"key key_3\"><span>3</span></div><div class=\"key key_4\"><span>4</span></div><div class=\"key key_5\"><span>5</span></div><div class=\"key key_6\"><span>6</span></div><div class=\"key key_7\"><span>7</span></div><div class=\"key key_8\"><span>8</span></div><div class=\"key key_9\"><span>9</span></div><div class=\"key key_0\"><span>0</span></div><div class=\"key key_minus\"><span>-</span></div><div class=\"key key_equals\"><span>=</span></div><div class=\"key key_backspace\"><span>Backsp</span></div><div class=\"key key_backspace key_macBackspace keyOff\"><span>Delete</span></div></div><!-- row 2 --><div class=\"keyboard_row\"><div class=\"key key_tab\"><span>Tab</span></div><div class=\"key key_q\"><span>Q</span></div><div class=\"key key_w\"><span>W</span></div><div class=\"key key_e\"><span>E</span></div><div class=\"key key_r\"><span>R</span></div><div class=\"key key_t\"><span>T</span></div><div class=\"key key_y\"><span>Y</span></div><div class=\"key key_u\"><span>U</span></div><div class=\"key key_i\"><span>I</span></div><div class=\"key key_o\"><span>O</span></div><div class=\"key key_p\"><span>P</span></div><div class=\"key key_openBracket\"><span>[</span></div><div class=\"key key_closeBracket\"><span>]</span></div><div class=\"key key_\\\"><span>\\</span></div></div><!-- row 3 --><div class=\"keyboard_row\"><div class=\"key key_capslock\"><span>CAPS</span></div><div class=\"key key_a\"><span>A</span></div><div class=\"key key_s\"><span>S</span></div><div class=\"key key_d\"><span>D</span></div><div class=\"key key_f\"><span>F</span></div><div class=\"key key_g\"><span>G</span></div><div class=\"key key_h\"><span>H</span></div><div class=\"key key_j\"><span>J</span></div><div class=\"key key_k\"><span>K</span></div><div class=\"key key_l\"><span>L</span></div><div class=\"key key_;\"><span>;</span></div><div class=\"key key_'\"><span>'</span></div><div class=\"key key_enter\"><span>Enter</span></div><div class=\"key key_enter key_macEnter keyOff\"><span>Return</span></div></div><!-- row 4 --><div class=\"keyboard_row\"><div class=\"key key_shift\"><span>Shift</span></div><div class=\"key key_z\"><span>Z</span></div><div class=\"key key_x\"><span>X</span></div><div class=\"key key_c\"><span>C</span></div><div class=\"key key_v\"><span>V</span></div><div class=\"key key_b\"><span>B</span></div><div class=\"key key_n\"><span>N</span></div><div class=\"key key_m\"><span>M</span></div><div class=\"key key_,\"><span>,</span></div><div class=\"key key_.\"><span>.</span></div><div class=\"key key_/\"><span>/</span></div><div class=\"key key_shift\"><span>Shift</span></div></div><!-- row5 --><div class=\"keyboard_row\"><div class=\"key key_ctrl\"><span>Ctrl</span></div><div class=\"key key_meta\"><span>Win</span></div><div class=\"key key_meta key_macMeta keyOff\"><span>Cmd</span></div><div class=\"key key_alt\"><span>Alt</span></div><div class=\"key key_alt key_macAlt keyOff\"><span>Option</span></div><div class=\"key key_space\"><span>Space</span></div><div class=\"key key_alt\"><span>Alt</span></div><div class=\"key key_alt key_macAlt keyOff\"><span>Option</span></div><div class=\"key key_ctrl\"><span>Ctrl</span></div></div></div><div class=\"keyboard_right\"><!-- row 1 --><div class=\"keyboard_row\"><div class=\"key key_ins\"><span>Ins</span></div><div class=\"key key_home\"><span>Home</span></div><div class=\"key key_pgup\"><span>PgUp</span></div></div><!-- row 2 --><div class=\"keyboard_row\"><div class=\"key key_minorDel\"><span>Del</span></div><div class=\"key key_end\"><span>End</span></div><div class=\"key key_pgdwn\"><span>PgDn</span></div></div><!-- row 3 --><div class=\"keyboard_row\"><div class=\"key key_blank\">&nbsp</div></div><!-- row 4 --><div class=\"keyboard_arrows\"><div class=\"keyboard_row\"><div class=\"key key_up\"><span>Up</span></div></div><!-- row5 --><div class=\"keyboard_row\"><div class=\"key key_left\"><span>Left</span></div><div class=\"key key_down\"><span>Down</span></div><div class=\"key key_right\"><span>Right</span></div></div></div></div>",
          messageBoxCode = "<div class=\"messageBox\"><p></p></div>";

      var keyboard,
          messageBox,
          localContainer,
          keyElement,
          OS = "win";

      // Create & cache keyboard container
      keyboard = {
        source: keyboardCode
      };
      keyboard.el = document.createElement( "div" );
      keyboard.el.innerHTML = messageBoxCode + keyboard.source;

      // Add initial classes
      keyboard.classes = keyboard.el.classList;
      keyboard.classes.add( "keyboard", "off" );

      // Cache reference to "styles"
      var styleReference = keyboard.el.style;

      // This should match the length of the css transition
      var transitionDelay = 1000;

      return {
        insertKeyboard: function ( element ) {
          var macRegex = /Mac/g,
              macKeys = [
                "key_macAlt",
                "key_macMeta",
                "key_macEnter",
                "key_macBackspace"
              ],
              winKeys = [
                "key_alt",
                "key_meta",
                "key_enter",
                "key_backspace"
              ],
              keys = keyboard.el,
              currentKey,
              i, j;

          // Process OS specific keyboard keys
          if ( window.navigator.userAgent.match( macRegex ) ) {
            OS = "mac";

            for ( i = 0; i < winKeys.length; i++ ) {
              currentKey = keys.getElementsByClassName( winKeys[ i ] );

              for ( j = 0; j < currentKey.length; j++ ) {
                currentKey[ j ].classList.add( "keyOff" );
              }
            }

            for ( i = 0; i < macKeys.length; i++ ) {
              currentKey = keys.getElementsByClassName( macKeys[ i ] );

              for ( j = 0; j < currentKey.length; j++ ) {
                currentKey[ j ].classList.remove( "keyOff" );
              }
            }
          }

          messageBox = keyboard.el.getElementsByClassName( "messageBox" )[ 0 ];

          element.appendChild( keys );
          localContainer = element;
        },
        showKeyboard: function () {
          if ( keyboard.classes.contains( "off" ) ) {
            keyboard.classes.remove( "off" );
          }
        },
        hideKeyboard: function () {
          if ( !keyboard.classes.contains( "off" ) ) {
            keyboard.classes.add( "off" );
          }
        },
        correctKey: function ( key ) {
          keyElement = keyboard.el.getElementsByClassName( "key_" + key );
          var length = keyElement && keyElement.length;

          if ( length ) {
            for ( var i = 0; i < length; i++ ) {
              keyElement[ i ].classList.remove( "invalid" );
              keyElement[ i ].classList.add( "valid" );
            }
          }
        },
        incorrectKey: function ( key ) {
          keyElement = keyboard.el.getElementsByClassName( "key_" + key );
          var length = keyElement && keyElement.length;

          if ( length ) {
            for ( var i = 0; i < length; i++ ) {
              keyElement[ i ].classList.remove( "valid" );
              keyElement[ i ].classList.add( "invalid" );
            }
          }
        },
        keyOff: function ( key ) {
          keyElement = keyboard.el.getElementsByClassName( "key_" + key );
          var length = keyElement && keyElement.length,
              classes;

          if ( length ) {
            for ( var i = 0; i < length; i++ ) {
              classes = keyElement[ i ].classList;

              if ( classes.contains( "valid" ) ) {
                classes.remove( "valid" );
              }

              if ( classes.contains( "invalid" ) ) {
                classes.remove( "invalid" );
              }
            }
          }
        },
        clearKeys: function () {
          var validKeys = keyboard.el.getElementsByClassName( "valid" ),
              invalidKeys = keyboard.el.getElementsByClassName( "invalid" ),
              validLength = validKeys && validKeys.length,
              invalidLength = invalidKeys && invalidKeys.length,
              i;

          // Notice the static '0's in the for loops.
          // Accessing an element "pops" it off the
          // HTMLCollection object, so we loop through
          // as many times as there are elements.
          if ( validLength ) {
            for ( i = 0; i < validLength; i++ ) {
              validKeys[ 0 ].classList.remove( "valid" );
            }
          }
          if ( invalidLength ) {
            for ( i = 0; i < invalidLength; i++ ) {
              invalidKeys[ 0 ].classList.remove( "invalid" );
            }
          }
        },
        setMessage: function( message ) {
          // TODO - Add fancy css here?
          messageBox.getElementsByTagName( "p" )[ 0 ].innerHTML = message;
        },
        getOS: function() {
          return OS;
        }
      }
    })();

    function keyByValue( obj, value ) {
      var key;

      for ( key in obj ) {
        if ( obj[ key ] === value ) {
          return key;
        }
      }

      return -1;
    }

    function keyUpCallback( e, combo ){
      e.preventDefault();

      _keyboardHelper.keyOff( combo );
    }

    // Returns the callback that fires when a keycombination
    // is pressed. Add extra logic here.
    function resumePlaybackConstructor( combo ) {
      return function ( e ) {
        e.preventDefault();
        if ( combo.length ) {
          for ( var i = 0; i < combo.length; i++ ) {
            _keyboardHelper.correctKey( combo[ i ] );
          }
        }

        window.setTimeout(function(){
          _keyboardHelper.clearKeys();

          // TODO: Display congrats message
          self.play();
        }, 1500);
      };
    }

    /**
     * Plugin Definition
     */
    Popcorn.plugin( "interaction", function() {
      var self = this,
          sequences = [],
          sequencePosition = 0,
          workingSequence,
          rKeyPosition,
          i;

      return {
        _setup: function( options ) {
          // Cache mousetrap helper & sequence arrays
          options._mousetrapHelper = _mousetrapHelper;
          options.sequences = options.sequences || sequences;
          sequences[ 0 ] = options.sequences[ 0 ] = options.sequences[ 0 ] || [];
          sequences[ 1 ] = options.sequences[ 1 ] = options.sequences[ 1 ] || [];
          sequences[ 2 ] = options.sequences[ 2 ] = options.sequences[ 2 ] || [];

          // Force the duration of the track event
          options.end = options.start + 0.5;

          // Cache resume playback callback
          var resumePlaybackConstructor = function ( combo ) {
            return function ( e ) {
              e.preventDefault();
              if ( combo.length ) {
                for ( var i = 0; i < combo.length; i++ ) {
                  _keyboardHelper.correctKey( combo[ i ] );
                }
              }

              _keyboardHelper.setMessage( "Congratulations!");

              window.setTimeout(function(){
                _keyboardHelper.clearKeys();

                self.play();
              }, 1500);
            };
          };
          options._resumePlaybackConstructor = resumePlaybackConstructor;

          var target = Popcorn.dom.find( options.target );

          if ( !target ) {
            target = this.media.parentNode;
          }

          options._target = target;

          // Insert keyboard
          _keyboardHelper.insertKeyboard( target );

          // Build image
          if ( options.imgSrc ) {
            var imgDiv = document.createElement( "div" );

            options._container = document.createElement( "div" );
            options._container.style.position = "absolute";
            options._container.style.width = options.width + "%";
            options._container.style.height = options.height + "%";
            options._container.style.top = options.top + "%";
            options._container.style.left = options.left + "%";
            options._container.style.zIndex = +options.zindex;
            options._container.classList.add( options.transition );
            options._container.classList.add( "off" );

            imgDiv.style.borderStyle = "none";
            imgDiv.style.width = "100%";
            imgDiv.style.height = "100%";
            imgDiv.style.backgroundPosition = "center center";
            imgDiv.style.backgroundSize = "contain";
            imgDiv.style.backgroundRepeat = "no-repeat";
            imgDiv.style.backgroundImage = "url( \"" + options.imgSrc + "\" )";

            options._container.appendChild( imgDiv );
            options._target.appendChild( options._container );
          }

          options.toString = function() {
            return "";
          };
        },
        start: function( event, options ) {
          this.emit( "interactionStart" );
          _keyboardHelper.showKeyboard();

          // Bind key listeners
          if ( sequences[ 0 ] && sequences[ 0 ].length ) {
            _mousetrapHelper.bindSequence( sequences[ 0 ], options._resumePlaybackConstructor( sequences[ 0 ] ) );
            _keyboardHelper.setMessage( "Press " + _mousetrapHelper.sequenceToString( sequences[ 0 ] ) );
          }
          if ( sequences[ 1 ] && sequences[ 1 ].length ) {
            _mousetrapHelper.bindSequence( sequences[ 1 ], options._resumePlaybackConstructor( sequences[ 1 ] ) );
            _keyboardHelper.setMessage( "Press " + _mousetrapHelper.sequenceToString( sequences[ 1 ] ) );
          }
          if ( sequences[ 2 ] && sequences[ 2 ].length ) {
            _mousetrapHelper.bindSequence( sequences[ 2 ], options._resumePlaybackConstructor( sequences[ 2 ] ) );
            _keyboardHelper.setMessage( "Press " + _mousetrapHelper.sequenceToString( sequences[ 2 ] ) );
          }

          this.pause();
        },
        end: function() {
          this.emit( "interactionEnd" );
          _keyboardHelper.hideKeyboard();

          if ( sequences[ 0 ] ) {
            _mousetrapHelper.unbindSequence( sequences [ 0 ] );
          }
          if ( sequences[ 1 ] ) {
            _mousetrapHelper.unbindSequence( sequences [ 1 ] );
          }
          if ( sequences[ 2 ] ) {
            _mousetrapHelper.unbindSequence( sequences [ 2 ] );
          }
        }
      };
    },
    // Manifest
    {
      options: {
        // Standard
        start: {
          elem: "input",
          type: "text",
          label: "In",
          units: "seconds"
        },
        end: {
          elem: "input",
          type: "text",
          label: "Out",
          units: "seconds"
        },

        // Custom
        target: {
          hidden: true
        },
        imgSrc: {
          hidden: true
        },
        combo1: {
          label: "combo1",
          elem: "input",
          type: "text",
          readonly: true
        },
        combo2: {
          label: "combo2",
          elem: "input",
          type: "text",
          readonly: true
        },
        combo3: {
          label: "combo3",
          elem: "input",
          type: "text",
          readonly: true
        },

        // Positioning
        width: {
          elem: "input",
          type: "number",
          label: "Width",
          "units": "%",
          "default": 150,
          hidden: true
        },
        height: {
          elem: "input",
          type: "number",
          label: "Height",
          "units": "%",
          "default": 150,
          hidden: true
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
        zindex: {
          elem: "input",
          type: "number",
          label: "Height",
          hidden: true
        }
      }
    });
  };
}( Popcorn ));
