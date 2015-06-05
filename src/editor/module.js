/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

/**
 * Module: EditorModule
 *
 * Butter Module for Editors
 */
define( [ "localized", "core/eventmanager", "core/trackevent", "./editor",
          "ui/toggler", "ui/resizeHandler", "util/lang", "l10n!/layouts/editor-area.html",
          "./default", "core/logger", "./header", "./editorhelper",
          // Included here to register themselves.
          "./media-gallery-editor", "./project-editor", "./sequencer-editor", "./tutorial-editor" ],
  function( Localized, EventManager, TrackEvent, Editor,
            Toggler, ResizeHandler, LangUtils, EDITOR_AREA_LAYOUT,
            DefaultEditor, Logger, Header, EditorHelper ){

  var DEFAULT_EDITOR_NAME = "plugin-list";

  // Expose DefaultEditor to external editors
  Editor.DefaultEditor = DefaultEditor;

  /**
   * Class: EventEditor
   *
   * Module which provides Editor functionality to Butter
   */
  function EventEditor( butter, moduleOptions, ButterNamespace ){

    moduleOptions = moduleOptions || {};

    var _currentEditor,
        _editorAreaDOMRoot = LangUtils.domFragment( EDITOR_AREA_LAYOUT, ".butter-editor-area" ),
        _editorContentArea = _editorAreaDOMRoot.querySelector( ".butter-editor-content" ),
        _header,
        _toggler,
        _editorHelper,
        _this = this,
        _createdEditors = {},
        _resizeHandler = new ResizeHandler( { margin: 26, border: 15 } ),
        _logger = new Logger( butter.id );

    EventManager.extend( _this );

    ButterNamespace.Editor = Editor;

    _editorHelper = new EditorHelper( butter );

    _header = new Header( _editorAreaDOMRoot, _this );
    LangUtils.applyTransitionEndListener( _editorAreaDOMRoot, _resizeHandler.resize );

    /**
     * Member: openEditor
     *
     * Opens an editor corresponding to the given editor name if it exists
     *
     * @param {String} editorName: Name of editor to open
     * @param {Object} options: An object storing various optional parameters that are used when opening an editor. These options are:
     * * @param {Booelean} persist: Indicate whether or not the editor should be recreated each time it wants to be opened
     * * @param {Object} openData: TrackEvent data used within an editors `open` method
     */
    _this.openEditor = function( editorName, options ) {
      options = options || {};

      var persist = options.persist,
          onTransitionEnd,
          onEditorOpened;

      onEditorOpened = function() {
        butter.dispatch( "editoropened", editorName );
      };

      onTransitionEnd = function() {
        LangUtils.removeTransitionEndListener( _editorAreaDOMRoot, onTransitionEnd );
        onEditorOpened();
      };

      persist = persist === true || persist === false ? persist : Editor.isPersistent( editorName );

      _toggler.state = false;

      if ( _currentEditor ) {
        _currentEditor.close();
      }

      // Some editors may not need to be created again. If so, store them in an object and open and close them as needed.
      if ( persist && _createdEditors[ editorName ] ) {
        _currentEditor = _createdEditors[ editorName ];
      } else {
        _currentEditor = _createdEditors[ editorName ] = Editor.create( editorName, butter );
      }

      _currentEditor.open( _editorContentArea, options.openData );
      _currentEditor.listen( "back", function() {
        _this.openEditor( DEFAULT_EDITOR_NAME );
      });

      // Check if this is a top-level editor
      if ( _header.focusMap[ editorName ] ) {
        _header.setFocus( editorName );
      } else {
        // Otherwise, it is an event editor, so focus the default editor
        _header.setFocus( DEFAULT_EDITOR_NAME );
      }


      // If the editor was closed when this was called, remove classes keeping it hidden
      if ( _editorAreaDOMRoot.classList.contains( "minimized" ) ) {
        LangUtils.applyTransitionEndListener( _editorAreaDOMRoot, onTransitionEnd );
        _editorAreaDOMRoot.classList.remove( "minimized" );
        document.body.classList.add( "editor-open" );
      } else {
        onEditorOpened();
      }

      return _currentEditor;
    };

    /**
     * Member: closeTrackEventEditor
     *
     * Closes the currently opened editor and opens the default one in it's place
     *
     */
    _this.closeEditor = function() {
      _currentEditor.close();
      _currentEditor = null;
      _this.openEditor( DEFAULT_EDITOR_NAME );
    };

    /**
     * Member: closeEditor
     *
     * A safer means of closing an editor. This ensures that the current open editor's trackevent matches the
     * passed in trackevent before calling its close method.
     *
     * @param {TrackEvent} trackEvent: The trackevent being used to compare against the current open editor.
     */
    _this.closeTrackEventEditor = function( trackEvent ) {
      var isTrackEventEditor = _currentEditor.getTrackEvent;

      if ( trackEvent && isTrackEventEditor &&
          isTrackEventEditor().id === trackEvent.id ) {

        _this.closeEditor();
      }
    };

    /**
     * Member: editTrackEvent
     *
     * Open the editor corresponding to the type of the given TrackEvent
     *
     * @param {TrackEvent} trackEvent: TrackEvent to edit
     */
    _this.editTrackEvent = function( trackEvent ) {
      var editorType = Editor.isRegistered( trackEvent.type ) ? trackEvent.type : "default";

      if ( !trackEvent || !( trackEvent instanceof TrackEvent ) ) {
        throw new Error( "trackEvent must be valid to start an editor." );
      }

      if ( _currentEditor && _currentEditor.getTrackEvent ) {
        if ( trackEvent.id === _currentEditor.getTrackEvent().id ) {
          return _currentEditor;
        }
      }

      return _this.openEditor( editorType, { openData: trackEvent } );
    };

    /**
     * Member: _start
     *
     * Prepares this module for Butter startup
     *
     * @param {Function} onModuleReady: Callback to signify that module is ready
     */
    this._start = function( onModuleReady ){

      _toggler = new Toggler( _editorAreaDOMRoot.querySelector( ".butter-editor-close-btn" ),
        function() {
          var newState = !_editorAreaDOMRoot.classList.contains( "minimized" );

          var _togetherjs = document.querySelector( ".togetherjs-dock-right" );
          _toggler.state = newState;
          if ( newState ) {
            document.body.classList.remove( "editor-open" );
            _editorAreaDOMRoot.classList.add( "minimized" );
            if ( _togetherjs ) {
              _togetherjs.classList.add( "minimized" );
            }
          }
          else {
            document.body.classList.add( "editor-open" );
            _editorAreaDOMRoot.classList.remove( "minimized" );
            if ( _togetherjs ) {
              _togetherjs.classList.remove( "minimized" );
            }
          }
          _this.dispatch( "editortoggled", !newState );

        }, Localized.get( "Show/Hide Editor" ), true );

      var editorsToLoad = [],
          editorsLoaded = 0;

      if ( butter.config.value( "ui" ).enabled !== false ) {

        // Set up views for plugin list editor
        butter.listen( "mediaready", _header.views.enablePlugins );
        butter.listen( "trackeventeditorclose", function( e ) {
          _this.closeTrackEventEditor( e.data );
        });
        document.body.classList.add( "butter-editor-spacing" );

        // Start minimized
        _editorAreaDOMRoot.classList.add( "minimized" );
        document.body.classList.remove( "editor-open" );

        butter.ui.setEditor( _editorAreaDOMRoot );

        var config = butter.config.value( "editor" );
        for ( var editorName in config ) {
          if ( config.hasOwnProperty( editorName ) ) {
            editorsToLoad.push({
              url: config[ editorName ],
              type: "js"
            });
          }
        }

        if ( editorsToLoad.length > 0 ){
          butter.loader.load( editorsToLoad, function() {
            Editor.initialize(function( pluginCallbacks ) {
              // Register all callbacks for each plugin type with EditorHelper Module.
              // This is needed so any trackeventupdated dispatch properly adds these
              // helper methods.
              for ( var key in pluginCallbacks ) {
                if ( pluginCallbacks.hasOwnProperty( key ) ) {
                  _editorHelper.addPlugin( key, pluginCallbacks[ key ] );
                }
              }

              onModuleReady();
            }, butter.config.value( "baseDir" ) );
          }, function( e ) {
            _logger.log( "Couldn't load editor " + e.target.src );

            if ( ++editorsLoaded === editorsToLoad.length ) {
              onModuleReady();
            }
          });
        }
        else {
          onModuleReady();
        }

      }
      else {
        onModuleReady();
      }
    };

    Object.defineProperties( _this, {
      currentEditor: {
        enumerable: true,
        get: function() {
          return _currentEditor;
        }
      },
      editorHelper: {
        enumerable: true,
        get: function() {
          return _editorHelper;
        }
      }
    });
  }

  this.register = Editor.register;

  EventEditor.__moduleName = "editor";

  return EventEditor;

}); //define
