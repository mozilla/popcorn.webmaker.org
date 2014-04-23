/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "localized", "util/lang", "util/keys", "util/time", "./base-editor", "ui/widget/tooltip",
          "l10n!/layouts/trackevent-editor-defaults.html" ],
  function( Localized, LangUtils, KeysUtils, TimeUtils, BaseEditor, ToolTip,
            DEFAULT_LAYOUT_SNIPPETS ) {

  var NULL_FUNCTION = function(){};

  var __defaultLayouts = LangUtils.domFragment( DEFAULT_LAYOUT_SNIPPETS ),
      __googleFonts = [
        "Gentium Book Basic",
        "Lato",
        "Vollkorn",
        "Merriweather",
        "Gravitas One",
        "PT Sans",
        "Open Sans",
        "Bangers",
        "Fredoka One",
        "Covered By Your Grace",
        "Coda"
      ];

  /**
   * Class: TrackEventEditor
   *
   * Extends a given object to be a TrackEvent editor, giving it capabilities to work with TrackEvents
   *
   * @param {Object} extendObject: Object to be extended to become a TrackEvent editor
   * @param {Butter} butter: An instance of Butter
   * @param {DOMElement} rootElement: The root element to which the editor's content will be attached
   * @param {Object} events: Events such as 'open' and 'close' can be defined on this object to be called at the appropriate times
   */
  function TrackEventEditor( extendObject, butter, rootElement, events ) {
    // Wedge a check for scrollbars into the open event if it exists
    var _oldOpenEvent = events.open,
        _trackEventUpdateErrorCallback = NULL_FUNCTION,
        _trackEvent;

    events.open = function( parentElement, trackEvent ) {
      var basicButton = rootElement.querySelector( ".basic-tab" ),
          advancedButton = rootElement.querySelector( ".advanced-tab" ),
          basicTab = rootElement.querySelector( ".editor-options" ),
          advancedTab = rootElement.querySelector( ".advanced-options" ),
          wrapper = rootElement.querySelector( ".scrollbar-outer" );

      _trackEvent = trackEvent;

      if ( _oldOpenEvent ) {
        _oldOpenEvent.apply( this, arguments );
      }
      // Code for handling basic/advanced options tabs are going to be the same. If the user defined these buttons
      // handle it for them here rather than force them to write the code in their editor
      if ( basicButton && advancedButton ) {
        basicButton.addEventListener( "mouseup", function() {
          if ( basicTab.classList.contains( "display-off" ) ) {
            basicTab.classList.toggle( "display-off" );
            advancedTab.classList.toggle( "display-off" );
            basicButton.classList.add( "butter-active" );
            advancedButton.classList.remove( "butter-active" );
            extendObject.scrollbar.update();
          }
        });

        advancedButton.addEventListener( "mouseup", function() {
          if ( !basicTab.classList.contains( "display-off" ) ) {
            basicTab.classList.toggle( "display-off" );
            advancedTab.classList.toggle( "display-off" );
            basicButton.classList.remove( "butter-active" );
            advancedButton.classList.add( "butter-active" );
            extendObject.scrollbar.update();
          }
        });

        // Override default scrollbar to account for both tab containers
        extendObject.addScrollbar({
          inner: wrapper,
          outer: wrapper,
          appendTo: rootElement.querySelector( ".scrollbar-container" )
        });
      }

      if ( extendObject.scrollbar ) {
        extendObject.scrollbar.update();
      }

      extendObject.showPluginPreview( trackEvent );

    };

    BaseEditor.extend( extendObject, butter, rootElement, events );

    extendObject.defaultLayouts = __defaultLayouts.cloneNode( true );

    /**
     * Member: updateTrackEventSafe
     *
     * Attempt to update the properties of a TrackEvent; call _trackEventUpdateErrorCallback if a failure occurs.
     *
     * @param {TrackEvent} trackEvent: TrackEvent to update
     * @param {Object} properties: TrackEvent properties to update
     */
    extendObject.updateTrackEventSafe = function( trackEvent, properties ) {
      if ( properties.hasOwnProperty( "start" ) ) {
        if ( properties.start < 0 ) {
          properties.start = 0;
        }
      }
      if ( properties.hasOwnProperty( "end" ) ) {
        if ( properties.end > butter.duration ) {
          properties.end = butter.duration;
        }
      }
      try {
        trackEvent.update( properties );
      }
      catch ( e ) {
        _trackEventUpdateErrorCallback( e.toString() );
      }
    };

    extendObject.createBreadcrumbs = function( trackEvent ) {
      var oldTitleEl = rootElement.querySelector( "h1" ),
          breadcrumbsLayout = extendObject.defaultLayouts.querySelector( ".butter-breadcrumbs" ),
          backLink = breadcrumbsLayout.querySelector( ".butter-breadcrumbs-back" ),
          editorTitle =  breadcrumbsLayout.querySelector( ".butter-editor-title" ),
          closeEditorLink =  breadcrumbsLayout.querySelector( ".close-btn" ),
          pluginName = trackEvent.manifest.displayName || trackEvent.type;

      if ( !trackEvent || !oldTitleEl ) {
        return;
      }

      closeEditorLink.addEventListener( "click", function() {
        extendObject.dispatch( "back" );
      } );

      backLink.addEventListener( "click", function() {
        extendObject.dispatch( "back" );
      } );

      if ( trackEvent.type ) {
        editorTitle.innerHTML = "";
        editorTitle.appendChild( document.createTextNode( Localized.get( pluginName ) ) );
      }

      oldTitleEl.parentNode.replaceChild( breadcrumbsLayout, oldTitleEl );
    };

    /**
     * Member: createTargetsList
     *
     * Creates a list of targets in a <select>, including one specifically for "Media Element"
     */
    extendObject.createTargetsList = function( targets ) {
      var propertyRootElement = __defaultLayouts.querySelector( ".trackevent-property.targets" ).cloneNode( true ),
          selectElement = propertyRootElement.querySelector( "select" ),
          mediaOptionElement = selectElement.firstChild,
          optionElement;

      // Create one <option> per target
      for ( var i = 1; i < targets.length; ++i ) {
        optionElement = document.createElement( "option" );
        optionElement.value = targets[ i ].element.id;
        optionElement.innerHTML = targets[ i ].element.id;

        // If the default target <option> (for Media Element) exists, place them before it
        if ( mediaOptionElement ) {
          selectElement.insertBefore( optionElement, mediaOptionElement );
        }
        else {
          selectElement.appendChild( optionElement );
        }
      }

      return propertyRootElement;
    };

    extendObject.showPluginPreview = function( trackEvent ) {
      var startTime = trackEvent.popcornOptions.start,
          endTime = trackEvent.popcornOptions.end,
          currentTime = butter.currentTime,
          accuracy = startTime * Math.pow( 10, TimeUtils.timeAccuracy - 1 );

      if ( currentTime < startTime || currentTime > endTime ) {
        // Account for accuracy
        butter.currentTime = startTime === 0 ? startTime : Math.ceil( startTime * accuracy ) / accuracy;
      }
    };

    /**
     * Member: attachSelectChangeHandler
     *
     * Attaches a handler to the change event from a <select> element and updates the TrackEvent corresponding to the given property name
     *
     * @param {DOMElement} element: Element to which handler is attached
     * @param {TrackEvent} trackEvent: TrackEvent to update
     * @param {String} propertyName: Name of property to update when change is detected
     */
    extendObject.attachSelectChangeHandler = function( element, trackEvent, propertyName ) {
      element.addEventListener( "change", function() {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );

        // Attempt to make the trackEvent's target blink
        var target = extendObject.butter.getTargetByType( "elementID", trackEvent.popcornOptions.target );
        if( target ) {
          target.view.blink();
        }
        else {
          extendObject.butter.currentMedia.view.blink();
        }
      } );
    };

    /**
     * Member: attachSecondsChangeHandler
     *
     * Attaches handlers to an element (likely an <input>) and updates the TrackEvent corresponding to the given property name.
     * Special consideration is given to properties like "start" and "end" that can't be blank.
     *
     * @param {DOMElement} element: Element to which handler is attached
     * @param {TrackEvent} trackEvent: TrackEvent to update
     * @param {String} propertyName: Name of property to update when change is detected
     * @param {Function} callback: Called when update is ready to occur
     */
    extendObject.attachSecondsChangeHandler = function( element, trackEvent, propertyName, callback ) {

      extendObject.attachInputChangeHandler( element, trackEvent, propertyName, function( te, options ) {
        options[ propertyName ] = TimeUtils.toSeconds( options[ propertyName ] );
        callback( trackEvent, options );
      });

    };

    /**
     * Member: attachCheckboxChangeHandler
     *
     * Attaches handlers to a checkbox element and updates the TrackEvent corresponding to the given property name
     *
     * @param {DOMElement} element: Element to which handler is attached
     * @param {TrackEvent} trackEvent: TrackEvent to update
     * @param {String} propertyName: Name of property to update when change is detected
     */
    extendObject.attachCheckboxChangeHandler = function( element, trackEvent, propertyName, callBack ) {
      callBack = callBack || function( trackEvent, updateOptions ) {
        trackEvent.update( updateOptions );
      };
      element.addEventListener( "click", function() {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.checked;
        callBack( trackEvent, updateOptions, propertyName );
      } );
    };

    extendObject.attachSliderChangeHandler = function( element, trackEvent, propertyName, callback ) {
      var scrubber = element.querySelector( ".butter-slider-scrubber" ),
          manifestOptions = trackEvent.manifest.options[ propertyName ],
          MAX_VAL = manifestOptions.max || 100,
          MIN_VAL = manifestOptions.min || 0,
          sliderUnit = manifestOptions.slider_unit || "",
          precision = manifestOptions.precision || 0,
          SCRUBBER_OFFSET = 4,
          SCRUBBER_TOOLTIP_OFFSET = 3,
          sliderToolTip = element.querySelector( ".butter-slider-tooltip" ),
          rects = element.getBoundingClientRect();

      callback = callback || extendObject.updateTrackEventSafe;

      function toReal( n ) {
        var maxUI = element.offsetWidth;
        return ( n / maxUI ) * MAX_VAL;
      }

      function toUI( n ) {
        var maxUI = element.offsetWidth;
        return ( n / MAX_VAL ) * maxUI;
      }

      function normalize( n ) {
        if ( n < MIN_VAL ) {
          n = MIN_VAL;
        } else if ( n > MAX_VAL ) {
          n = MAX_VAL;
        }

        n = n.toFixed( manifestOptions.precision );

        return n;
      }

      function setSliderToolTip( val ) {
        val = parseFloat( normalize( toReal( val - rects.left ) ) );
        sliderToolTip.style.left = toUI( val ) + "px";
        sliderToolTip.innerHTML = val.toFixed( precision ) + sliderUnit;
      }

      function setScrubber( val ) {
        val = normalize( toReal( val - rects.left ) );
        scrubber.style.left = toUI( val ) - SCRUBBER_OFFSET + "px";
      }

      function updateUI() {
        var val = parseFloat( trackEvent.popcornOptions[ propertyName ] ),
            left = toUI( val ) - SCRUBBER_OFFSET;
        scrubber.style.left = left + "px";
        sliderToolTip.style.left = left + SCRUBBER_TOOLTIP_OFFSET + "px";
        sliderToolTip.innerHTML = val.toFixed( precision ) + sliderUnit;
      }

      function updateTrackEvent( options ) {
        callback( trackEvent, options );
        updateUI();
      }

      function onSlideStop( e ) {
        var left = e.clientX - rects.left,
            properties = {};

        properties[ propertyName ] = normalize( toReal( left ) );
        updateTrackEvent( properties );

        sliderToolTip.classList.remove( "tooltip-no-transition-on" );
        element.addEventListener( "mousedown", onSliderMouseDown );
        onMouseOut();
        document.removeEventListener( "mousemove", onSliding, false );
        document.removeEventListener( "mouseup", onSlideStop, false );
      }

      function onSliding( e ) {
        setSliderToolTip( e.clientX );
        setScrubber( e.clientX );
      }

      function onSlideStart( e ) {
        e.preventDefault();
        element.removeEventListener( "mouseover", onMouseOver, false );
        element.removeEventListener( "mousemove", onMouseMove, false );
        element.removeEventListener( "mouseout", onMouseOut, false );
        element.removeEventListener( "mousedown", onSliderMouseDown, false );
        sliderToolTip.classList.add( "tooltip-no-transition-on" );
        document.addEventListener( "mousemove", onSliding );
        document.addEventListener( "mouseup", onSlideStop );
      }

      function onSliderMouseDown( e ) {
        e.preventDefault();

        document.addEventListener( "mousemove", onSliding );
        document.addEventListener( "mouseup", onSlideStop );
        element.removeEventListener( "mouseout", onMouseOut, false );
        sliderToolTip.classList.add( "tooltip-no-transition-on" );
        setScrubber( e.clientX );
      }

      function onMouseMove( e ) {
        setSliderToolTip( e.clientX );
      }

      function onMouseOver( e ) {
        sliderToolTip.classList.add( "tooltip-no-transition-on" );
        setSliderToolTip( e.clientX );
        element.removeEventListener( "mouseover", onMouseOver, false );
        element.addEventListener( "mouseout", onMouseOut );
        element.addEventListener( "mousemove", onMouseMove );
      }

      function onMouseOut() {
        sliderToolTip.classList.remove( "tooltip-no-transition-on" );
        element.removeEventListener( "mouseout", onMouseOut, false );
        element.removeEventListener( "mousemove", onMouseMove, false );
        element.addEventListener( "mouseover", onMouseOver );
      }

      scrubber.addEventListener( "mousedown", onSlideStart );
      element.addEventListener( "mouseover", onMouseOver );
      element.addEventListener( "mousedown", onSliderMouseDown );
      updateUI();
    };

    /**
     * Member: attachCheckboxGroupChangeHandler
     *
     * Attaches handlers to a checkbox element and updates the TrackEvent corresponding to the given property name
     *
     * @param {TrackEvent} trackEvent: TrackEvent to update
     * @param {String} propertyName: Name of property to update when change is detected
     */
    function attachCheckboxGroupChangeHandler( element, trackEvent, propertyName ) {
      element.addEventListener( "click", function() {
        var updateOption = {},
            updateOptions = {},
            i,
            labels = trackEvent.manifest.options[ propertyName ].labels,
            currentElement;

        // Add in the rest
        for ( i in labels ) {
          if ( labels.hasOwnProperty( i ) ) {
            currentElement = extendObject.rootElement.querySelector( "[data-manifest-key='" + i + "']" );
            updateOptions[ i ] = currentElement.checked;
          }
        }

        updateOption[ propertyName ] = updateOptions;

        trackEvent.update( updateOption );
      } );
    }

    /**
     * Member: attachInputChangeHandler
     *
     * Attaches handlers to a checkbox element and updates the TrackEvent corresponding to the given property name
     *
     * @param {DOMElement} element: Element to which handler is attached
     * @param {TrackEvent} trackEvent: TrackEvent to update
     * @param {String} propertyName: Name of property to update when change is detected
     * @param {Function} callback: OPTIONAL - Called when update is ready to occur
     */
     extendObject.attachInputChangeHandler = function( element, trackEvent, propertyName, callback ) {

      function updateTrackEvent( trackEvent, callback, updateOptions ) {
        if ( callback ) {
          callback( trackEvent, updateOptions );
        } else {
          trackEvent.update( updateOptions );
        }
      }

      var ignoreChange,
          manifestType,
          manifestElem,
          isNumber;

      if ( trackEvent.popcornTrackEvent ) {
        manifestType = trackEvent.popcornTrackEvent._natives.manifest.options[ propertyName ].type;
        manifestElem = trackEvent.popcornTrackEvent._natives.manifest.options[ propertyName ].elem;
      }

      isNumber = manifestType === "number" ? true : false;

      function validateNumber( val ) {
        var popcornOptions = trackEvent.popcornOptions;

        // Not so pretty looking workaround for Firefox not implementing input type=number
        if ( isNaN( val ) || val === "" ) {
          val = popcornOptions[ propertyName ];
        }
        return val;
      }

      function onMousedown( e ) {
        e.stopPropagation();
        e.preventDefault();
        var val = element.value,
            updateOptions = {};

        window.removeEventListener( "mousedown", onMousedown, true );
        if ( isNumber ) {
          val = validateNumber( val );
        }

        updateOptions[ propertyName ] = val;
        updateTrackEvent( trackEvent, callback, updateOptions );

        element.blur();
      }

      if ( manifestElem === "textarea" ) {
        element.addEventListener( "input", function( e ) {

          window.addEventListener( "mousedown", onMousedown, true );
          var updateOptions = {},
              val = element.value;

          e.preventDefault();

          if ( isNumber ) {
            val = validateNumber( val );
          }

          updateOptions[ propertyName ] = val;
          updateTrackEvent( trackEvent, callback, updateOptions );
          ignoreChange = true;
        }, false );
      } else {
        element.addEventListener( "keypress", function( e ) {
          var updateOptions = {},
              val = element.value;

          window.addEventListener( "mousedown", onMousedown, true );
          if ( e.keyCode === KeysUtils.ENTER ) {
            e.preventDefault();

            if ( isNumber ) {
              val = validateNumber( val );
            }

            updateOptions[ propertyName ] = val;
            updateTrackEvent( trackEvent, callback, updateOptions );
            ignoreChange = true;
          }
        } );
      }

      if ( element.type === "number" || isNumber ) {
        element.addEventListener( "change", function() {

          var updateOptions = {},
              val = element.value;

          if ( ignoreChange ) {
            ignoreChange = false;
          } else {

            val = validateNumber( val );

            updateOptions[ propertyName ] = val;
            updateTrackEvent( trackEvent, callback, updateOptions );
          }
        } );
      }
    };

    extendObject.createStartEndInputs = function( trackEvent, callback ) {
      var editorElement = __defaultLayouts.querySelector( ".start-end" ).cloneNode( true ),
          start = editorElement.querySelector( "input[data-manifest-key='start']" ),
          end = editorElement.querySelector( "input[data-manifest-key='end']" );

      extendObject.attachSecondsChangeHandler( start, trackEvent, "start", callback );
      extendObject.attachSecondsChangeHandler( end, trackEvent, "end", callback );

      return editorElement;
    };

    extendObject.createSetAsDefaultsButton = function( trackEvent ) {
      var editorElement = __defaultLayouts.querySelector( ".checkbox" ).cloneNode( true ),
          span = editorElement.querySelector( ".butter-form-checkbox span" ),
          checkbox = editorElement.querySelector( ".butter-form-checkbox input" );
      span.innerHTML = Localized.get( "Set as default" );
      if ( trackEvent.isDefault ) {
        checkbox.checked = true;
      }
      checkbox.addEventListener( "change", function() {
        if ( !trackEvent.isDefault ) {
          if ( trackEvent.defaults.current ) {
            trackEvent.defaults.current.isDefault = false;
          }
          trackEvent.isDefault = true;
        } else {
          trackEvent.isDefault = false;
        }
      } );
      return editorElement;
    };

    /**
     * Member: createManifestItem
     *
     * Creates an element according to the manifest of the TrackEvent
     *
     * @param {String} name: Name of the manifest item to represent
     * @param {Object} manifestEntry: The manifest entry from a Popcorn plugin
     * @param {*} data: Initial data to insert in the created element
     * @param {TrackEvent} trackEvent: TrackEvent to which handlers will be attached
     * @param {Function} itemCallback: Optional. Called for each item, for the user to add functionality after creation
     */
    extendObject.createManifestItem = function( name, manifestEntry, data, trackEvent, itemCallback ) {
      var elem = manifestEntry.elem || "default",
          itemLabel = Localized.get( manifestEntry.label ) || Localized.get( name ),
          isStartOrEnd = [ "start", "end" ].indexOf( name.toLowerCase() ) > -1,
          units = Localized.get( manifestEntry.units ) || ( isStartOrEnd ? "seconds" : "" ),
          propertyArchetypeSelector,
          propertyArchetype,
          editorElement,
          option,
          tooltip,
          manifestEntryOption,
          i, l;

      // Get the right property archetype
      propertyArchetypeSelector = ".trackevent-property." + elem;
      if ( units ) {
        propertyArchetypeSelector += ".units";
      }
      if ( manifestEntry.type === "checkbox" ) {
        propertyArchetypeSelector += ".checkbox";
      }
      if ( manifestEntry.type === "radio" ) {
        propertyArchetypeSelector += ".radio";
      }
      if ( manifestEntry.type === "range" ) {
        propertyArchetypeSelector += ".range";
      }
      if ( manifestEntry.type === "color" ) {
        propertyArchetypeSelector += ".color";
      }

      propertyArchetype = __defaultLayouts.querySelector( propertyArchetypeSelector ).cloneNode( true );

      // If the manifestEntry was specified to be hidden bail early
      if ( manifestEntry.hidden ) {
        return;
      }

      // only populate if this is an input element that has associated units
      if ( units ) {
        propertyArchetype.querySelector( ".butter-unit" ).innerHTML = units;
      }

      // Grab the element with class 'property-name' to supply the archetype for new manifest entries
      if ( propertyArchetype.querySelector( ".property-name" ) ) {
        propertyArchetype.querySelector( ".property-name" ).innerHTML = itemLabel;
      }

      // If the manifest's 'elem' property is 'select', create a <select> element. Otherwise, create an
      // <input>.
      if ( manifestEntry.elem === "select" ) {
        editorElement = propertyArchetype.querySelector( "select" );

        // data-manifest-key is used to update this property later on
        editorElement.setAttribute( "data-manifest-key", name );

        if ( manifestEntry.options ) {
          for ( i = 0, l = manifestEntry.options.length; i < l; ++i ){
            option = document.createElement( "option" );
            // This is a safe fallback for select element where we don't want to translate options.
            manifestEntryOption = Localized.get( manifestEntry.options[ i ] ) || manifestEntry.options[ i ];

            // if the manifest has values for options, use the options as labels
            // and the values as values for the <option> elements
            if ( manifestEntry.values && manifestEntry.values[ i ] ) {
              option.innerHTML = manifestEntryOption;
              option.value = manifestEntry.values[ i ];
            }
            else {
              option.value = option.innerHTML = manifestEntryOption;
            }

            editorElement.appendChild( option );
          }
        }
        else if ( manifestEntry.googleFonts && __googleFonts ) {
          var font,
              m,
              fLen;

          __googleFonts = __googleFonts.sort();

          for ( m = 0, fLen = __googleFonts.length; m < fLen; m++ ) {
            font = document.createElement( "option" );

            font.value = font.innerHTML = __googleFonts[ m ];
            editorElement.appendChild( font );
          }
        }
      } else if ( manifestEntry.elem === "textarea" ) {
        editorElement = propertyArchetype.querySelector( "textarea" );

        // data-manifest-key is used to update this property later on
        editorElement.setAttribute( "data-manifest-key", name );

        if ( data ) {
          // Don't print "undefined" or the like
          if ( data === undefined || typeof data === "object" ) {
            data = "";
          }
          editorElement.value = data;
        }

      } else if ( manifestEntry.elem === "checkbox-group" ) {
        var item,
            elementParent = propertyArchetype,
            checkbox,
            label;

        editorElement = propertyArchetype.querySelector( ".checkbox-group" ).cloneNode( true );

        // Remove originally defined element
        elementParent.removeChild( elementParent.querySelector( "div" ) );

        for ( item in manifestEntry.labels ) {
          if ( manifestEntry.labels.hasOwnProperty( item ) ) {
            checkbox = editorElement.querySelector( ".value" );
            label = editorElement.querySelector( ".property-name" );

            attachCheckboxGroupChangeHandler( checkbox, trackEvent, name );

            label.innerHTML = Localized.get( manifestEntry.labels[ item ] );
            checkbox.value = manifestEntry.default[ item ];
            checkbox.setAttribute( "data-manifest-key", item );

            elementParent.appendChild( editorElement );
            editorElement = propertyArchetype.querySelector( ".checkbox-group" ).cloneNode( true );
          }
        }
      } else {
        if ( manifestEntry.type === "range" ) {
          tooltip = propertyArchetype.querySelector( ".butter-slider-tooltip" );

          propertyArchetype.querySelector( ".slider-start" ).innerHTML = manifestEntry.min || 0;
          propertyArchetype.querySelector( ".slider-end" ).innerHTML = ( manifestEntry.max || 100 ) + ( manifestEntry.slider_unit || "" );

          tooltip.setAttribute( "data-manifest-key", name );

          editorElement = propertyArchetype.querySelector( ".butter-slider" );
        } else if ( manifestEntry.type === "color" ) {
          editorElement = propertyArchetype;
          // Don't print "undefined" or the like
          if ( data ) {
            editorElement.querySelector( "input" ).value = data;
            editorElement.querySelector( ".color-picker-toggle" ).style.background = data;
          }

          // data-manifest-key is used to update this property later on
          editorElement.querySelector( "input" ).setAttribute( "data-manifest-key", name );
        } else {
          editorElement = propertyArchetype.querySelector( "input" );
          if ( data ) {
            // Don't print "undefined" or the like
            if ( data === undefined || typeof data === "object" ) {
              data = manifestEntry.type === "number" ? 0 : "";
            }
            editorElement.placeholder = editorElement.value = data;
          }

          try {
            editorElement.type = manifestEntry.type;
            // step="any" will stop the :invalid pseudo class in Chrome from being applied if the value is a not a "whole" number. i.e. 1.234
            if ( editorElement.type === "number" ) {
              editorElement.step = manifestEntry.step || "any";
            }
          }
          catch ( e ) {
            // Suppress IE9 errors
          }
          // data-manifest-key is used to update this property later on
          editorElement.setAttribute( "data-manifest-key", name );
        }
      }

      if ( itemCallback ) {
        itemCallback( manifestEntry.elem, editorElement, trackEvent, name );
      }

      return propertyArchetype;
    };

    /**
     * Member: updatePropertiesFromManifest
     *
     * Updates TrackEvent properties visible in the editor with respect to the TrackEvent's manifest
     *
     * @param {TrackEvent} trackEvent: TrackEvent which supplies the manifest and property updates
     */
    extendObject.updatePropertiesFromManifest = function ( trackEvent, manifestKeys, forceTarget ) {
      var element,
          popcornOptions = trackEvent.popcornOptions,
          manifestOptions = trackEvent.manifest.options,
          manifestEntry,
          option,
          units,
          i, l;

      manifestKeys = manifestKeys || Object.keys( manifestOptions );

      if ( forceTarget && manifestKeys.indexOf( "target" ) === -1 ) {
        manifestKeys = manifestKeys.concat( "target" );
      }

      for ( i = 0, l = manifestKeys.length; i < l; ++i ) {
        option = manifestKeys[ i ];
        if ( manifestOptions[ option ] ) {
          manifestEntry = manifestOptions[ option ];
          units = manifestEntry.units;
        }

        // Look for the element with the correct manifest-key which was attached to an element during creation of the editor
        element = extendObject.rootElement.querySelector( "[data-manifest-key='" + option + "']" );

        if ( element ) {
          // Checkbox elements need to be treated specially to manipulate the 'checked' property
          if ( element.type === "checkbox" ) {
            element.checked = popcornOptions[ option ];
          }
          else if ( manifestEntry.type === "range" ) {
            element.innerHTML = parseFloat( popcornOptions[ option ] ).toFixed( manifestEntry.precision ) + ( manifestEntry.slider_unit || "" );
          }
          else {
            if ( typeof popcornOptions[ option ] !== "undefined" ) {
              if ( units === "seconds" ) {
                element.value = TimeUtils.toTimecode( popcornOptions[ option ] );
              } else {
                element.value = popcornOptions[ option ];
              }
            } else {
              element.value = manifestOptions[ option ].default || "";
            }
          }
        }
        else if ( manifestOptions[ option ] && manifestOptions[ option ].elem === "checkbox-group" ) {
          var m,
              labels = manifestOptions[ option ].labels,
              popcornOption = popcornOptions[ option ];

          for ( m in labels ) {
            if ( labels.hasOwnProperty( m ) ) {
              element = extendObject.rootElement.querySelector( "[data-manifest-key='" + m + "']" );

              if ( typeof popcornOptions[ option ] !== "undefined" ) {
                element.checked = popcornOption[ m ];
              } else {
                element.checked = manifestOptions[ option ].default[ m ];
              }
            }
          }
        }
      }
    };

    /**
     * Member: createPropertiesFromManifest
     *
     * Creates editable elements according to the properties on the manifest of the given TrackEvent
     *
     * @param {options} An object which can expect the following properties:
     *
     *  {TrackEvent} trackEvent: TrackEvent from which manifest will be retrieved
     *  {Function} itemCallback: Callback which is passed to createManifestItem for each element created
     *  {Array} manifestKeys: Optional. If only specific keys are desired from the manifest, use them
     *  {DOMElement} basicContainer: Optional. If specified, elements will be inserted into basicContainer, not rootElement
     *  {DOMElement} advancedContainer: Optional. If specified, elements will be inserted into advancedContainer, not rootElement
     *  {Array} ignoreManifestKeys: Optional. Keys in this array are ignored such that elements for them are not created
     */
    extendObject.createPropertiesFromManifest = function( options ) {
      var manifestOptions,
          item,
          element,
          container,
          optionGroup,
          manifestKeys,
          basicContainer,
          advancedContainer,
          trackEvent = options.trackEvent,
          ignoreManifestKeys = options.ignoreManifestKeys || [],
          i, l;

      basicContainer = options.basicContainer || extendObject.rootElement;
      advancedContainer = options.advancedContainer || extendObject.rootElement;

      if ( !trackEvent.manifest ) {
        throw "Unable to create properties from null manifest. Perhaps trackevent is not initialized properly yet.";
      }

      extendObject.createBreadcrumbs( trackEvent );

      manifestOptions = trackEvent.manifest.options;

      manifestKeys = options.manifestKeys || Object.keys( manifestOptions );

      for ( i = 0, l = manifestKeys.length; i < l; ++i ) {
        item = manifestKeys[ i ];
        optionGroup = manifestOptions[ item ].group ? manifestOptions[ item ].group : "basic";
        container = optionGroup === "advanced" ? advancedContainer : basicContainer;
        if ( ignoreManifestKeys && ignoreManifestKeys.indexOf( item ) > -1 ) {
          continue;
        }
        element = extendObject.createManifestItem( item, manifestOptions[ item ], trackEvent.popcornOptions[ item ], trackEvent, options.callback );

        if ( element ) {
          container.appendChild( element );
        }
      }
    };

    /**
     * Member: setTrackEventUpdateErrorCallback
     *
     * Stores a callback which is called when a trackevent update error occurs.
     *
     * @param {Function} errorCallback: Callback which is called upon error.
     */
    extendObject.setTrackEventUpdateErrorCallback = function( errorCallback ) {
      _trackEventUpdateErrorCallback = errorCallback || NULL_FUNCTION;
    };

    extendObject.getTrackEvent = function() {
      return _trackEvent;
    };

  }

  return {
    extend: TrackEventEditor,
    EDITOR_FRAGMENTS: __defaultLayouts
  };

});
