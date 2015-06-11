/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

(function(){
  // This fills in any plugins that no longer
  // exist but may still exist in user data.
  var deprecated = [ "twitter" ];

  for ( var i = 0; i < deprecated.length; i++ ) {
    Popcorn.plugin( deprecated[ i ], {
      manifest: {
        deprecated: true
      }
    });
  }
  return;

}());
