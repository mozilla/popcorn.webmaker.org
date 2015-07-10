define([],
function() {
  var listeners = {};

  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin)
      return;

    for (key in listeners) {
      if (e.data.type === key) {
        listeners[key].forEach(function (handler) {
          handler(e.data.data);
        });
      }
    }
  });

  return {
    save: function (data) {
      message = {
        data: data,
        type: 'save'
      };
      // posts message to outside of the iframe
      parent.postMessage(message, window.location.origin);
    },
    listen: function (eventName, handler) {
      if (listeners[eventName] === undefined) {
        listeners[eventName] = [handler];
      } else {
        listeners[eventName].push(handler);
      }
    }
  }
});

