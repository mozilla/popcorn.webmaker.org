(function( Popcorn ) {
  var importMousetrap = document.createElement( "script" );

  importMousetrap.src = "http://cdn.craig.is/js/mousetrap/mousetrap.min.js";
  importMousetrap.type = "text/javascript";

  document.head.appendChild( importMousetrap );

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
      callback = callback || function(){ console.log( "No bindAll callback specified!" ); };

      for ( var key in KEYS ) {
        Mousetrap.bind( key, callback );
      }
    }

    function unbindAll() {
      for ( var key in KEYS ) {
          Mousetrap.unbind( key );
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
      return ret;
    }

    return {
      bindInputTag: function( tag, sequence, callback ) {
        // Set user-keypress callback
        keyComboCallback = callback || keyComboCallback;

        // On focus, reset array & unbind old listeners
        // then clear tag value and listen for new keystrokes
        tag.onfocus = function onFocus( e ) {
          Mousetrap.unbind( sequenceToKeycombo( sequence ) );
          cleanArray( sequence );
          tag.value = "";
          listenForAssignment( tag, sequence );
        };

        // On blur, stop listening for key-combos
        // and listen for the user defined key-combos
        tag.onblur = function onBlur( e ) {
          unbindAll();
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
      bindAll: bindAll,
      unbindAll: unbindAll,
      bindKeyup: function( key, callback ) {
        Mousetrap.bind( key, callback, "keyup" );
      }
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
   * switchOS( osType )
   *  | Displays the correct keyboard keys for the
   *  | operating system detected by the plugin
   *
   */
  var _keyboardHelper = (function keyboardHelperFactory( options ){
    var keyboardCode = "<div class=\"keyboard_left\"><!-- row 1 --><div class=\"keyboard_row\"><div class=\"key key_backtick\">`</div><div class=\"key key_1\"><span>1</span></div><div class=\"key key_2\"><span>2</span></div><div class=\"key key_3\"><span>3</span></div><div class=\"key key_4\"><span>4</span></div><div class=\"key key_5\"><span>5</span></div><div class=\"key key_6\"><span>6</span></div><div class=\"key key_7\"><span>7</span></div><div class=\"key key_8\"><span>8</span></div><div class=\"key key_9\"><span>9</span></div><div class=\"key key_0\"><span>0</span></div><div class=\"key key_minus\"><span>-</span></div><div class=\"key key_equals\"><span>=</span></div><div class=\"key key_backspace\"><span>Backsp</span></div><div class=\"key key_macBackspace off\"><span>Delete</span></div></div><!-- row 2 --><div class=\"keyboard_row\"><div class=\"key key_tab\"><span>Tab</span></div><div class=\"key key_q\"><span>Q</span></div><div class=\"key key_w\"><span>W</span></div><div class=\"key key_e\"><span>E</span></div><div class=\"key key_r\"><span>R</span></div><div class=\"key key_t\"><span>T</span></div><div class=\"key key_y\"><span>Y</span></div><div class=\"key key_u\"><span>U</span></div><div class=\"key key_i\"><span>I</span></div><div class=\"key key_o\"><span>O</span></div><div class=\"key key_p\"><span>P</span></div><div class=\"key key_openBracket\"><span>[</span></div><div class=\"key key_closeBracket\"><span>]</span></div><div class=\"key key_\\\"><span>\\</span></div></div><!-- row 3 --><div class=\"keyboard_row\"><div class=\"key key_capslock\"><span>CAPS</span></div><div class=\"key key_a\"><span>A</span></div><div class=\"key key_s\"><span>S</span></div><div class=\"key key_d\"><span>D</span></div><div class=\"key key_f\"><span>F</span></div><div class=\"key key_g\"><span>G</span></div><div class=\"key key_h\"><span>H</span></div><div class=\"key key_j\"><span>J</span></div><div class=\"key key_k\"><span>K</span></div><div class=\"key key_l\"><span>L</span></div><div class=\"key key_;\"><span>;</span></div><div class=\"key key_'\"><span>'</span></div><div class=\"key key_enter\"><span>Enter</span></div><div class=\"key key_macEnter off\"><span>Enter</span></div></div><!-- row 4 --><div class=\"keyboard_row\"><div class=\"key key_shift\"><span>Shift</span></div><div class=\"key key_z\"><span>Z</span></div><div class=\"key key_x\"><span>X</span></div><div class=\"key key_c\"><span>C</span></div><div class=\"key key_v\"><span>V</span></div><div class=\"key key_b\"><span>B</span></div><div class=\"key key_n\"><span>N</span></div><div class=\"key key_m\"><span>M</span></div><div class=\"key key_,\"><span>,</span></div><div class=\"key key_.\"><span>.</span></div><div class=\"key key_/\"><span>/</span></div><div class=\"key key_shift\"><span>Shift</span></div></div><!-- row5 --><div class=\"keyboard_row\"><div class=\"key key_ctrl\"><span>Ctrl</span></div><div class=\"key key_meta\"><span>Win</span></div><div class=\"key key_macMeta off\"><span>Command</span></div><div class=\"key key_alt\"><span>Alt</span></div><div class=\"key key_space\"><span>Space</span></div><div class=\"key key_alt\"><span>Alt</span></div><div class=\"key key_ctrl\"><span>Ctrl</span></div></div></div><div class=\"keyboard_right\"><!-- row 1 --><div class=\"keyboard_row\"><div class=\"key key_ins\"><span>Ins</span></div><div class=\"key key_home\"><span>Home</span></div><div class=\"key key_pgup\"><span>PgUp</span></div></div><!-- row 2 --><div class=\"keyboard_row\"><div class=\"key key_minorDel\"><span>Del</span></div><div class=\"key key_end\"><span>End</span></div><div class=\"key key_pgdwn\"><span>PgDn</span></div></div><!-- row 3 --><div class=\"keyboard_row\"><div class=\"key key_blank\">&nbsp</div></div><!-- row 4 --><div class=\"keyboard_arrows\"><div class=\"keyboard_row\"><div class=\"key key_up\"><span>Up</span></div></div><!-- row5 --><div class=\"keyboard_row\"><div class=\"key key_left\"><span>Left</span></div><div class=\"key key_down\"><span>Down</span></div><div class=\"key key_right\"><span>Right</span></div></div></div></div>";


    var keyboard,
        localContainer,
        keyElement,
        fadeIn,
        fadeOut;

    // Fades in
    fadeIn = function( styleReference ) {
      var opacity;

      if ( typeof( styleReference.opacity ) === "undefined" ) {
        styleReference.opacity = 0;
      }

      function inTimer() {
        opacity = Number( styleReference.opacity );

        styleReference.opacity = opacity + 0.05;
        if ( opacity < 0.9 ) {
          setTimeout( inTimer, 30 );
        } else {
          styleReference.opacity = 1;
        }
      }

      inTimer();
    };

    // Calls a recursive function for fading out the opacity of the passed
    // "style" property
    fadeOut = function( styleReference, callback ) {
      callback = callback || function() {};

      var opacity;

      if ( typeof( styleReference.opacity ) === "undefined" ) {
        styleReference.opacity = 1;
      }

      function outTimer() {
        opacity = Number( styleReference.opacity );

        styleReference.opacity -= 0.05;
        if ( opacity > 0.1 ) {
          setTimeout( outTimer, 30 );
        } else {
          styleReference.opacity = 0;

          // When fade-in is complete, fire callback
          callback();
        }
      }

      outTimer();
    };

    // Create & cache keyboard container
    keyboard = {
      source: keyboardCode
    };
    keyboard.el = document.createElement( "div" );
    keyboard.el.innerHTML = keyboard.source;

    // Add initial classes
    keyboard.classes = keyboard.el.classList;
    keyboard.classes.add( "keyboard", "off" );

    // Cache reference to "styles"
    keyboard.style = keyboard.el.style;

    // TODO: Detect OS and update keyboard accordingly

    return {
      insertKeyboard: function ( element ) {
        element.appendChild( keyboard.el );
        localContainer = element;
      },
      showKeyboard: function () {
        // Setting opacity
        keyboard.style.opacity = 0;
        // keyboard.classes.toggle( "off" );

        // Compatibility hack
        if ( keyboard.classes.contains( "off" ) ) {
          keyboard.classes.remove( "off" );
        }

        // Animate the fade-in
        fadeIn( keyboard.style );
      },
      hideKeyboard: function () {
        // Animate the fade-out
        fadeOut( keyboard.style, function(){ console.log( "inside toggle callback" );
          // keyboard.classes.toggle( "off" );

          // Compatibility hack
          if ( !keyboard.classes.contains( "off" ) ) {
            keyboard.classes.add( "off" );
          }

        });
      },
      correctKey: function ( key ) {
        // TODO: Confirm key identifier strings are consistent everywhere
        keyElement = keyboard.el.querySelector( ".key_" + key );

        if ( keyElement ) {
          keyElement.classList.remove( "invalid" );
          keyElement.classList.add( "valid" );
        }
      },
      incorrectKey: function ( key ) {
        // TODO: Confirm key identifier strings are consistent everywhere
        keyElement = keyboard.el.querySelector( ".key_" + key );

        if ( keyElement ) {
          keyElement.classList.remove( "valid" );
          keyElement.classList.add( "invalid" );
        }
      },
      keyOff: function ( key ) {
        keyElement = keyboard.el.querySelector( ".key_" + key );

        if ( keyElement ) {
          if ( keyElement.classList.contains( "valid" ) ) {
            keyElement.classList.remove( "valid" );
          }

          if ( keyElement.classList.contains( "invalid" ) ) {
            keyElement.classList.remove( "invalid" );
          }
        }
      },
      clearKeys: function () {
        var validKeys = keyboard.el.getElementsByClassName( "valid" ),
            invalidKeys = keyboard.el.getElementsByClassName( "invalid" ),
            validLength = validKeys && validKeys.length,
            invalidLength = invalidKeys && invalidKeys.length,
            i;

        if ( validLength ) {
          for ( i = 0; i < validKeys; i++ ) {
            validKeys[ i ].classList.remove( "valid" );
          }
        }
        if ( invalidLength ) {
          for ( i = 0; i < invalidKeys; i++ ) {
            invalidKeys[ i ].classList.remove( "invalid" );
          }
        }
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
        var resumePlayback = function resumePlayback( e, combo ) {
          e.preventDefault();
          return self.play();
        };
        options._resumePlayback = resumePlayback;

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

        if ( sequences.length ) {
          _mousetrapHelper.bindAll(function( e, combo ) {
            if ( !sequencePosition ) {
              // Determine which sequence we're working with
              workingSequence = null;
              for ( i = 0; i < sequences.length; i++ ) {
                if ( sequences[ i ].length &&
                     sequences[ i ][ 0 ] === combo ) {
                  workingSequence = sequences[ i ];

                  sequencePosition++;

                  // Highlight key
                  _keyboardHelper.correctKey( combo );

                  break;
                }
              }

              // The key matched the first key in a sequence?
              if ( workingSequence ) {
                _mousetrapHelper.bindKeyup( combo, function( e, combo ) {
                  e.preventDefault();

                  // Reset counters
                  keyCounter = 0;
                  sequencePosition = 0;

                  // Remove highlighting from key
                  _keyboardHelper.keyOff( combo );

                  return false;
                });
              } else {
                // Highlight key
                _keyboardHelper.incorrectKey( combo );

                // Remove highlighting from key on keyup
                _mousetrapHelper.bindKeyup( combo, keyUpCallback );
              }
            } else {
              if ( workingSequence[ sequencePosition ] === combo ) {
                sequencePosition++;

                _keyboardHelper.correctKey( combo );

                // What happens if they release the key?
                _mousetrapHelper.bindKeyup( combo, function( e, combo ) {
                  e.preventDefault();

                  rKeyPosition = workingSequence.indexOf( combo );

                  // Remove highlighting from key
                  _keyboardHelper.keyOff( combo );

                  if ( rKeyPosition <= sequencePosition ) {
                    var invalidKey;

                    // Change key highlighting to invalid for all keys
                    // currently pressed in the sequence AFTER the key that was
                    // just released.
                    for ( --sequencePosition; rKeyPosition !== sequencePosition; sequencePosition-- ) {
                      invalidKey = workingSequence[ sequencePosition ];

                      _keyboardHelper.incorrectKey( invalidKey );
                      _mousetrapHelper.bindKeyup( invalidKey, keyUpCallback );
                    }
                  } // End-if {rKeyPosition}
                });
              } else {
                _keyboardHelper.incorrectKey( combo );
                _mousetrapHelper.bindKeyup( combo, keyUpCallback );
              }
            }
          });
        }

        // Bind key listeners
        if ( sequences[ 0 ] && sequences[ 0 ].length ) {
          _mousetrapHelper.bindSequence( sequences[ 0 ] );
        }
        if ( sequences[ 1 ] && sequences[ 1 ].length ) {
          _mousetrapHelper.bindSequence( sequences[ 1 ] );
        }
        if ( sequences[ 2 ] && sequences[ 2 ].length ) {
          _mousetrapHelper.bindSequence( sequences[ 2 ] );
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
}( Popcorn ));
