define( [ "../util/xhr" ], function( xhr ) {
  var _strings,
      _readyCallback,
      _isReady = false;

  function ready( json ) {
     _readyCallback = _readyCallback || function(){};

    function domReady() {
      // If the DOM isn't ready yet, repeat when it is
      if ( document.readyState !== "complete" ) {
        document.onreadystatechange = domReady;
        return;
      }
      document.onreadystatechange = null;
      _strings = json;
      _isReady = true;
      _readyCallback();
    }

    domReady();    
  }

  // Get the current lang from the document's HTML element, which the                                                                             
  // server set when the page was first rendered. This saves us having                                                                            
  // to pass extra locale info around on the URL.
  function getCurrentLang() {
    var html = document.querySelector( "html" );
    return html && html.lang ? html.lang : "en-US";
  }

  xhr.get( "/strings/" + getCurrentLang(), function( res ) {
    ready( res );
  });

  return {
    get: function( key ) {
      if ( !_strings ) {
        console.error( "[popcorn.webmaker.org] Error: string catalog not found." );
        return "";
      }
      return ( _strings[ key ] || "" );
    },

    getCurrentLang: getCurrentLang,

    // Localized strings are ready                                                                                                                
    ready: function( cb ) {
      _readyCallback = cb;
      if ( _isReady ) {
        _readyCallback();
      }
    },

    isReady: function() {
      return !!_isReady;
    }
  };
});
