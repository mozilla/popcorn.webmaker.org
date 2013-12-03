(function( Popcorn ) {
  // Javascript shim for element.classList compatibility in IE 8
  if(typeof document!=="undefined"&&!("classList"in document.documentElement)){(function(e){"use strict";if(!("HTMLElement"in e)&&!("Element"in e))return;var t="classList",n="prototype",r=(e.HTMLElement||e.Element)[n],i=Object,s=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++){if(t in this&&this[t]===e){return t}}return-1},u=function(e,t){this.name=e;this.code=DOMException[e];this.message=t},a=function(e,t){if(t===""){throw new u("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(t)){throw new u("INVALID_CHARACTER_ERR","String contains an invalid character")}return o.call(e,t)},f=function(e){var t=s.call(e.className),n=t?t.split(/\s+/):[],r=0,i=n.length;for(;r<i;r++){this.push(n[r])}this._updateClassName=function(){e.className=this.toString()}},l=f[n]=[],c=function(){return new f(this)};u[n]=Error[n];l.item=function(e){return this[e]||null};l.contains=function(e){e+="";return a(this,e)!==-1};l.add=function(){var e=arguments,t=0,n=e.length,r,i=false;do{r=e[t]+"";if(a(this,r)===-1){this.push(r);i=true}}while(++t<n);if(i){this._updateClassName()}};l.remove=function(){var e=arguments,t=0,n=e.length,r,i=false;do{r=e[t]+"";var s=a(this,r);if(s!==-1){this.splice(s,1);i=true}}while(++t<n);if(i){this._updateClassName()}};l.toggle=function(e,t){e+="";var n=this.contains(e),r=n?t!==true&&"remove":t!==false&&"add";if(r){this[r](e)}return!n};l.toString=function(){return this.join(" ")};if(i.defineProperty){var h={get:c,enumerable:true,configurable:true};try{i.defineProperty(r,t,h)}catch(p){if(p.number===-2146823252){h.enumerable=false;i.defineProperty(r,t,h)}}}else if(i[n].__defineGetter__){r.__defineGetter__(t,c)}})(self)}

  var importMousetrap = document.createElement( "script" ),
      _mousetrapHelper,
      _mousetrapLoaded = false;

  importMousetrap.src = "http://cdn.craig.is/js/mousetrap/mousetrap.min.js";
  importMousetrap.type = "text/javascript";

  document.head.appendChild( importMousetrap );

  var isMouseTrapLoaded = function() {
    if ( window.Mousetrap ) {
      _mousetrapLoaded = true;

      /**
       * mouseTrapHelperFactory()
       * ----
       * Returns an object with seven methods:
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
      _mousetrapHelper = (function mouseTrapHelperFactory() {
        var _self = this;

        var KEYS = {
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
        MAX_KEYS_PER_SEQUENCE = 4,
        modifiers = {
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

        var workingMacSequence = [],
            workingWinSequence = [];

        function keyComboCallback( e ) {
          console.error( "No callback has been specified for the mouseTrapHelper." );
          e.preventDefault();
        }

        // Removes all elements from the passed array reference
        function cleanArray( array ) {
          array.length = 0;
        }

        // Removes all elements from the passed array reference
        function copyArray( to, from ) {
          cleanArray( to );

          for ( var i = 0; i < from.length; i++ ) {
            to[ i ] = from[ i ];
          }
        }

        function bindAll( callback ) {
          if ( !callback ){
            throw( "No bindAll callback specified!" );
          }

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
            if ( sequence.length < MAX_KEYS_PER_SEQUENCE ) {
              sequence.push( combo );
            } else {
              cleanArray( sequence );
              sequence.push( combo );
            }
            console.log( "changing value to sequence: ", sequence );
            tag.value = sequenceToString( sequence );
          }

          bindAll( addKeyToSequence );
        }

        // Generates a string indicating the allowed
        // key-combos in a way the Mousetrap library
        // will understand
        // i.e. ["ctrl", "a"] -> "ctrl+a"
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

          if ( !length ) {
            return ret;
          }

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

          return ret;
        }

        function sequenceToString( sequence ) {
          var length = sequence.length,
              ret = "";

          if ( length ) {
            for ( var i = 0; i < length - 1; i++ ) {
              ret += sequence[ i ] + "+";
            }
            ret += sequence[ i ];
          }

          // Search & replace for mac keys when appropriate
          if ( _keyboardHelper.getKeyboardType() === "mac" ) {
            for ( var key in macKeys ) {
              if ( macKeys.hasOwnProperty( key ) ) {
                ret = ret.replace( key, macKeys[ key ], "gi" );
              }
            }
          }

          return ret;
        }

        return {
          bindInputTag: function( tag, sequence, focus, unfocus, cb ) { // focuz = unblockshortcuts, unforcus = blockshortcuts
            var workingSequence = [],
                // This is crazy hacky, but it grabs the correct button
                // for the passed tag.
                applyButton = tag.nextSibling;

            applyButton.onclick = function ( e ) {
              copyArray( sequence, workingSequence );
              tag.value = sequenceToString( sequence );
              cleanArray( workingSequence );
              cb( sequenceToString( sequence ) );
            };

            // On focus, clear tag & working array values,
            // and copy new keystrokes into the working array
            tag.onfocus = function ( e ) {
              cleanArray( workingSequence );
              tag.value = "";
              listenForAssignment( tag, workingSequence );
              focus();
            };

            // On blur, stop listening for keystrokes
            // and assign sequence to the tag value
            tag.onblur = function ( e ) {
              tag.value = sequenceToString( sequence );
              unbindAll();
              // unfocus();
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
      })();
    } else {
      setTimeout(function(){
        isMouseTrapLoaded();
      }, 5 );
    }
  };
  isMouseTrapLoaded();

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
   * keyOff( key )
   *  | Removes the highlight from the passed key
   *
   * clearKeys()
   *  | Removes all key highlights
   *
   * setMessage( message )
   *  | Changes the message displayed above the keyboard
   *
   * getKeyboardType()
   *  | Returns a string representing the OS type
   */
  var _keyboardHelper = (function keyboardHelperFactory(){
    var keyboardCode = "",
        messageBoxCode = "<div class=\"messageBox\"><p></p></div>";

    var keyboardLeftRows = [
          // Row 1
          [{
            classes: "key key_backtick",
            contents: "`"
          },{
            classes: "key key_1",
            contents: "1"
          },{
            classes: "key key_2",
            contents: "2"
          },{
            classes: "key key_3",
            contents: "3"
          },{
            classes: "key key_4",
            contents: "4"
          },{
            classes: "key key_5",
            contents: "5"
          },{
            classes: "key key_6",
            contents: "6"
          },{
            classes: "key key_7",
            contents: "7"
          },{
            classes: "key key_8",
            contents: "8"
          },{
            classes: "key key_9",
            contents: "9"
          },{
            classes: "key key_0",
            contents: "0"
          },{
            classes: "key key_minus",
            contents: "-"
          },{
            classes: "key key_equals",
            contents: "="
          },{
            classes: "key key_backspace",
            contents: "Backsp"
          },{
            classes: "key key_backspace key_macBackspace keyOff",
            contents: "Delete"
          }],
          // Row 2
          [{
            classes: "key key_tab",
            contents: "Tab"
          },{
            classes: "key key_q",
            contents: "Q"
          },{
            classes: "key key_w",
            contents: "W"
          },{
            classes: "key key_e",
            contents: "E"
          },{
            classes: "key key_r",
            contents: "R"
          },{
            classes: "key key_t",
            contents: "T"
          },{
            classes: "key key_y",
            contents: "Y"
          },{
            classes: "key key_u",
            contents: "U"
          },{
            classes: "key key_i",
            contents: "I"
          },{
            classes: "key key_o",
            contents: "O"
          },{
            classes: "key key_p",
            contents: "P"
          },{
            classes: "key key_openBracket",
            contents: "["
          },{
            classes: "key key_closeBracket",
            contents: "]"
          },{
            classes: "key key_\\",
            contents: "\\"
          }],
          // Row 3
          [{
            classes: "key key_capslock",
            contents: "CAPS"
          },{
            classes: "key key_a",
            contents: "A"
          },{
            classes: "key key_s",
            contents: "S"
          },{
            classes: "key key_d",
            contents: "D"
          },{
            classes: "key key_f",
            contents: "F"
          },{
            classes: "key key_g",
            contents: "G"
          },{
            classes: "key key_h",
            contents: "H"
          },{
            classes: "key key_j",
            contents: "J"
          },{
            classes: "key key_k",
            contents: "K"
          },{
            classes: "key key_l",
            contents: "L"
          },{
            classes: "key key_;",
            contents: ";"
          },{
            classes: "key key_'",
            contents: "'"
          },{
            classes: "key key_enter",
            contents: "Enter"
          },{
            classes: "key key_enter key_macEnter keyOff",
            contents: "Return"
          }],
          // Row 4
          [{
            classes: "key key_shift",
            contents: "Shift"
          },{
            classes: "key key_z",
            contents: "Z"
          },{
            classes: "key key_x",
            contents: "X"
          },{
            classes: "key key_c",
            contents: "C"
          },{
            classes: "key key_v",
            contents: "V"
          },{
            classes: "key key_b",
            contents: "B"
          },{
            classes: "key key_n",
            contents: "N"
          },{
            classes: "key key_m",
            contents: "M"
          },{
            classes: "key key_,",
            contents: ","
          },{
            classes: "key key_.",
            contents: "."
          },{
            classes: "key key_/",
            contents: "/"
          },{
            classes: "key key_shift",
            contents: "Shift"
          }],
          // Row 5
          [{
            classes: "key key_ctrl",
            contents: "Ctrl"
          },{
            classes: "key key_meta",
            contents: "Win"
          },{
            classes: "key key_meta key_macMeta keyOff",
            contents: "Cmd"
          },{
            classes: "key key_alt",
            contents: "Alt"
          },{
            classes: "key key_alt key_macAlt keyOff",
            contents: "Option"
          },{
            classes: "key key_space",
            contents: "Space"
          },{
            classes: "key key_alt",
            contents: "Alt"
          },{
            classes: "key key_alt key_macAlt keyOff",
            contents: "Option"
          },{
            classes: "key key_ctrl",
            contents: "Ctrl"
          }]
        ],
        keyboardRightRows = [
          // Row 1 - keyboardRightRows[ 0 ]
          [{
            classes: "key key_ins",
            contents: "Ins"  // - keyboardRightRows[ 0 ][ 0 ]
          },{
            classes: "key key_home",
            contents: "Home"
          },{
            classes: "key key_pgup",
            contents: "PgUp"
          }],
          // Row 2 - keyboardRightRows[ 1 ]
          [{
            classes: "key key_minorDel",
            contents: "Del"  // - keyboardRightRows[ 1 ][ 0 ]
          },{
            classes: "key key_end",
            contents: "End"
          },{
            classes: "key key_pgdwn",
            contents: "PgDn"
          }],
          // Row 3 - keyboardRightRows[ 2 ]
          [{
            classes: "key key_blank",
            contents: "&nbsp"  // - keyboardRightRows[ 2 ][ 0 ]
          }],
          // Subdiv separation -  - keyboardRightRows[ 3 ]
          [
            // Row 4 - keyboardRightRows[ 3 ][ 0 ]
            [{
              classes: "key key_up",
              contents: "Up"  // - keyboardRightRows[ 3 ][ 0 ][ 0 ]
            }],
            // Row 5
            [{
              classes: "key key_left",
              contents: "Left"
            },{
              classes: "key key_down",
              contents: "Down"
            },{
              classes: "key key_right",
              contents: "Right"
            }]
          ]
        ];

    var currentRow,
        currentDiv,
        subRow;

    // Construct "keyboard-left" div
    keyboardCode = "<div class=\"keyboard_left\">";
    for ( var i = 0; i < keyboardLeftRows.length; i++ ) {
      currentRow = keyboardLeftRows[ i ];
      keyboardCode += "<div class=\"keyboard_row\">";
      for ( var j = 0; j < currentRow.length; j++ ) {
        currentDiv = currentRow[ j ];

        keyboardCode += "<div class=\"" + currentDiv.classes + "\">" + "<span>" + currentDiv.contents + "</span>" + "</div>";
      }
      keyboardCode += "</div>";
    }
    keyboardCode += "</div>";

    // Construct "keyboard-right" div
    keyboardCode += "<div class=\"keyboard_right\">";
    for ( i = 0; i < keyboardRightRows.length; i++ ) {
      currentRow = keyboardRightRows[ i ];

      keyboardCode += currentRow[ 0 ].length ? "<div class=\"keyboard_arrows\">" : "<div class=\"keyboard_row\">";
      for ( j = 0; j < currentRow.length; j++ ) {
        currentDiv = currentRow[ j ];

        // If there's length, this is a sub-div containing
        // its own rows.
        if (currentDiv.length) {
          keyboardCode += "<div class=\"keyboard_row\">";

          for ( var q = 0; q < currentDiv.length; q++ ) {
            subRow = currentDiv[ q ];
            keyboardCode += "<div class=\"" + subRow.classes + "\">" + "<span>" + subRow.contents + "</span>" + "</div>";
          }
          keyboardCode += "</div>";
        } else {
          keyboardCode += "<div class=\"" + currentDiv.classes + "\">" + "<span>" + currentDiv.contents + "</span>" + "</div>";
        }
      }
      keyboardCode += "</div>";
    }
    keyboardCode += "</div>";

    var keyboard,
        messageBox,
        localContainer,
        keyElement,
        keyboardType = "win";

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
          keyboardType = "mac";

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
        var length = keyElement && keyElement.length || 0;

        for ( var i = 0; i < length; i++ ) {
          keyElement[ i ].classList.remove( "invalid" );
          keyElement[ i ].classList.add( "valid" );
        }
      },
      keyOff: function ( key ) {
        keyElement = keyboard.el.getElementsByClassName( "key_" + key );
        var length = keyElement && keyElement.length || 0,
            classes;

        for ( var i = 0; i < length; i++ ) {
          classes = keyElement[ i ].classList;

          if ( classes.contains( "valid" ) ) {
            classes.remove( "valid" );
          }

          if ( classes.contains( "invalid" ) ) {
            classes.remove( "invalid" );
          }
        }
      },
      clearKeys: function () {
        var validKeys = keyboard.el.getElementsByClassName( "valid" ),
            validLength = validKeys && validKeys.length,
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
      },
      setMessage: function( message ) {
        // TODO - Add fancy css here?
        messageBox.getElementsByTagName( "p" )[ 0 ].innerHTML = message;
      },
      getKeyboardType: function() {
        return keyboardType;
      }
    };
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

  /**
   * Plugin Definition
   */
  Popcorn.plugin( "interaction", function() {
    var self = this,
        sequences = {},
        sequencePosition = 0,
        rKeyPosition,
        i;

    // This configures
    var playbackDelay = 2000;

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
        }, playbackDelay );
      };
    };

    return {
      _setup: function( options ) {
        options._mousetrapLoaded = _mousetrapLoaded;

        var isHelperReady = function(){
          if ( _mousetrapHelper ) {
            // Cache mousetrap helper & sequence arrays
            options._mousetrapHelper = _mousetrapHelper;
            options._mousetrapLoaded = _mousetrapLoaded;
            options.sequences = options.sequences || sequences;
            sequences.winSequence = options.winSequence = options.winSequence || [];
            sequences.macSequence = options.macSequence = options.macSequence || [];
          } else {
            setTimeout(function(){
              isHelperReady();
            }, 5 );
          }
        };
        isHelperReady();

        // Force the duration of the track event
        options.end = options.start + 0.5;

        // Cache resume playback callback
        options._resumePlaybackConstructor = resumePlaybackConstructor;

        var target = Popcorn.dom.find( options.target );
        if ( !target ) {
          target = this.media.parentNode;
        }
        options._target = target;

        // Insert keyboard
        _keyboardHelper.insertKeyboard( target );

        options.toString = function() {
          return "";
        };
      },
      start: function( event, options ) {
        var that = this;

        var isHelperReady = function() {
          if ( _mousetrapHelper ) {
            that.emit( "interactionStart" );
            _keyboardHelper.showKeyboard();

            // Bind key listeners based on keyboard type
            if ( _keyboardHelper.getKeyboardType === "win" ) {
              if ( sequences.winSequence && sequences.winSequence.length ) {
                _mousetrapHelper.bindSequence( sequences.winSequence, options._resumePlaybackConstructor( sequences.winSequence ) );
                _keyboardHelper.setMessage( "Press " + _mousetrapHelper.sequenceToString( sequences.winSequence ).toUpperCase() );
              }
            } else {
              if ( sequences.macSequence && sequences.macSequence.length ) {
                _mousetrapHelper.bindSequence( sequences.macSequence, options._resumePlaybackConstructor( sequences.macSequence ) );
                _keyboardHelper.setMessage( "Press " + _mousetrapHelper.sequenceToString( sequences.macSequence ).toUpperCase() );
              }
            }

            that.pause();
          } else {
            setTimeout(function(){
              isHelperReady();
            }, 5 );
          }
        };

        isHelperReady();
      },
      end: function() {
        var that = this;

        var isHelperReady = function() {
          if ( _mousetrapHelper ) {
            that.emit( "interactionEnd" );
            _keyboardHelper.hideKeyboard();

            // Remove keycombo bindings bindings
            if ( _keyboardHelper.getKeyboardType === "win" ) {
              _mousetrapHelper.unbindSequence( sequences.winSequence );
            } else {
              _mousetrapHelper.unbindSequence( sequences.macSequence );
            }
          } else {
            setTimeout(function(){
              isHelperReady();
            }, 5 );
          }
        };

        isHelperReady();
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
      winCombo: {
        label: "Win Combo",
        elem: "input",
        type: "text",
        readonly: true
      },
      macCombo: {
        label: "Mac Combo",
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
