var CornPop = (function () {
  var cornpop = {},
      _savehandler = function () { return; };

  cornpop.init = function (el) {
    var editor = document.getElementById(el),
        iframe = document.createElement('iframe');

    iframe.setAttribute('src', 'cornpop/editor.html');
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
  cornpop.setSaveHandler = function (handler) {
    this._saveHandler = function (e) {
      if (e.origin !== window.location.origin)
        return;

      handler(e.data);
    };
    window.addEventListener('message', this._saveHandler);
  };

  return cornpop;
})();
