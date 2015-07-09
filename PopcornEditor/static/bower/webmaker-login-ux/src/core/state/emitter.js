var EventEmitter = require('events').EventEmitter;

module.exports = function Emitter() {

  var emitter = new EventEmitter();

  return {
    on: function (event, listener) {
      emitter.addListener(event, listener);
    },
    off: function (event, listener) {
      if (!listener) {
        emitter.removeAllListeners(event);
        return;
      }
      emitter.removeListener(event, listener);
    },
    emit: function () {
      emitter.emit.apply(emitter, arguments);
    }
  };
};
