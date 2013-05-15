/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */
define( [ "util/lang", "text!./webmakernav.html" ],
  function( Lang,  BASE_LAYOUT ) {

  return function( options ) {
    options = options || {};

    var container = options.container,
        root = Lang.domFragment( BASE_LAYOUT );
    container.appendChild( root );
  };
});

