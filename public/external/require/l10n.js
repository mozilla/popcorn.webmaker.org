/**
 l10n.js - meant to be used like so:

     require(['l10n!/some/url'], ...

  Depends on text.js plugin.
**/
define( [ 'text', 'core/localized' ], function ( text, localized ) {
  return {
    load: function(name, req, onLoad, config) {
      name = name.replace( /^\//, "/" + localized.getCurrentLang() + "/" );
      text.load(name, req, onLoad, config);
    }
  };
});
