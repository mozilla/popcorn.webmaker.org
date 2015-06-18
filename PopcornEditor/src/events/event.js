define([],
function() {
  return {
    save: function (data) {
      // posts message to outside of the iframe
      parent.postMessage(data, window.location.origin);
    }
  }
});

