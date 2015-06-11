/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define( [ "util/time", "util/keys", "analytics" ], function( util, Keys, analytics ){

  function Button( parentNode, className, onClick ) {
    var _container = parentNode.querySelector( className ),
        _button = _container.querySelector( ".status-button" ),
        _state = true;

    function update() {
      if( _state ){
        _button.removeAttribute( "data-state" );
      }
      else {
        _button.setAttribute( "data-state", true );
      }
    }
    _button.addEventListener( "mousedown", function( e ) {
      // Disable text selection in chrome while clicking.
      e.preventDefault();
    } );
    _button.addEventListener( "click", onClick );

    Object.defineProperties( this, {
      state: {
        enumerable: true,
        get: function(){
          return _state;
        },
        set: function( val ){
          _state = val;
          update();
        }
      }
    });
  }

  function Time( parentNode, media ){
    var _container = parentNode.querySelector( ".time-container" ),
        _timeBox = _container.querySelector( ".current-time" ),
        _durationInput = _container.querySelector( ".duration-input" ),
        _media = media,
        _oldValue = 0;

    function setTime( time, setCurrentTime ){
      if( typeof( time ) === "string" || !isNaN( time ) ){
        if( setCurrentTime ){
          try {
            time = util.toSeconds( time );
            _media.currentTime = time;
          }
          catch( e ){
            time = _media.currentTime;
          } //try
        } //if

        _timeBox.innerHTML = util.toTimecode( time, 0 );
      }
      else {
        _timeBox.innerHTML = _oldValue;
      } //if
    } //setTime

    _media.listen( "mediatimeupdate", function(){
      setTime( _media.currentTime, false );
    });

    _media.listen( "mediadurationchanged", function() {
      _durationInput.value = util.toTimecode( _media.duration, 0 );
    });

    function updateDuration( val ) {
      var seconds = util.toSeconds( val );

      if ( seconds <= 0 ) {
        seconds = _media.duration;
      }

      _durationInput.classList.remove( "input-active" );
      _media.url = "#t=," + seconds;
      _durationInput.value = util.toTimecode( seconds, 0 );
      _durationInput.addEventListener( "click", onDurationClick );
      _durationInput.removeEventListener( "blur", onBlur, false );
      _durationInput.removeEventListener( "keydown", onKeyDown, false );
      _durationInput.blur();
    }

    function onBlur( e ) {
      e.preventDefault();

      updateDuration( _durationInput.value );
    }

    function onKeyDown( e ) {
      if ( e.keyCode === Keys.ENTER ) {
        updateDuration( _durationInput.value );
      }
    }

    function onDurationClick() {
      _durationInput.removeEventListener( "click", onDurationClick, false );
      _durationInput.classList.add( "input-active" );

      _durationInput.addEventListener( "blur", onBlur );

      _durationInput.addEventListener( "keydown", onKeyDown );
    }

    _durationInput.addEventListener( "click", onDurationClick );

    setTime( 0, false );

  }

  return function Status( media, statusArea ) {

    var _media = media,
        _statusContainer = statusArea.querySelector( ".status-container" ),
        _muteButton,
        _playButton,
        _time;

    _statusContainer.className = "status-container";

    _time = new Time( statusArea, _media );

    _muteButton = new Button( statusArea, ".mute-button-container", function() {
      _media.muted = !_media.muted;
    });

    _playButton = new Button( statusArea, ".play-button-container", function() {
      if ( _media.paused ) {
        _media.paused = false;
        analytics.event( "Play Clicked", {
          label: "Editor"
        });
      } else {
        _media.paused = true;
        analytics.event( "Pause Clicked", {
          label: "Editor"
        });
      }
    });

    // Ensure default state is correct
    _playButton.state = true;

    _media.listen( "mediamuted", function(){
      _muteButton.state = false;
    });

    _media.listen( "mediaunmuted", function(){
      _muteButton.state = true;
    });

    _media.listen( "mediavolumechange", function(){
      _muteButton.state = !_media.muted;
    });

    _media.listen( "mediaended", function(){
      _playButton.state = true;
    });

    _media.listen( "mediaplay", function(){
      _playButton.state = false;
    });

    _media.listen( "mediapause", function(){
      _playButton.state = true;
    });

  };

});

