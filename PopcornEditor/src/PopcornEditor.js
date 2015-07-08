var PopcornEditor = (function () {
  var PopcornEditor = {},
      _savehandler = function () { return; },
      iframe;

  PopcornEditor.init = function (el, url) {
    var editor = document.getElementById(el),
        url = url || 'PopcornEditor/editor.html';

    this.iframe = document.createElement('iframe'),

    this.iframe.setAttribute('src', url);
    this.iframe.setAttribute('frameborder', '0');
    this.iframe.style.width = '100%';
    this.iframe.style.height = '100%';

    editor.appendChild(this.iframe);
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

  /**
   * Loads the popcorn json blob into the editor
   *
   * @param data : [object] json object
   */
  PopcornEditor.loadInfo = function (data) {
      this.iframe.contentWindow.postMessage({
         data: data,
         type: 'load'
      }, window.location.origin);
  };

  return PopcornEditor;
})();
