var PopcornEditor = (function () {
  var PopcornEditor = {},
      _savehandler = function () { return; },
      listeners = {},
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

  // List of events that PopcornEditor supports
  PopcornEditor.events = {save: 'save'};

  /**
   * Sets the given handler as the handler for the event
   *
   * @param eventName : [string] name of the event (must be in events)
   * @param handler : [function] takes event
   */
  PopcornEditor.listen = function (eventName, handler) {
    console.log(this);
    listeners[eventName] = handler;
  }

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

  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin)
      return;

    for (key in listeners) {
      if (e.data.type === key) {
        listeners[key](e.data.data);
      }
    }
  });

  return PopcornEditor;
})();
