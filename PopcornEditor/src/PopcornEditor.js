var PopcornEditor = (function () {
  var PopcornEditor = {},
      _savehandler = function () { return; };

  PopcornEditor.init = function (el, url) {
    var editor = document.getElementById(el),
        iframe = document.createElement('iframe'),
        url = url || 'PopcornEditor/editor.html';

    iframe.setAttribute('src', url);
    iframe.setAttribute('frameborder', '0');
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    editor.appendChild(iframe);
  };

  /**
   * Sets the given handler as the function called when a save event happens
   *
   * @param handler : function - takes ( event )
   */
  PopcornEditor.setSaveHandler = function (handler) {
    this._saveHandler = function (e) {
      if (e.origin !== window.location.origin)
        return;

      handler(e.data);
    };
    window.addEventListener('message', this._saveHandler);
  };

  return PopcornEditor;
})();
