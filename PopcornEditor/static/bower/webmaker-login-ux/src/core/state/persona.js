var Emitter = require('./emitter.js');
var analytics = require('webmaker-analytics');

module.exports = function PersonaController(loginApi) {
  var emitter = new Emitter();

  var PERSONA_EVENTS = {
    signedIn: 'signedIn',
    newUser: 'newUser'
  };

  var analyticsLabel = {
    label: 'persona'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    authenticate: function () {
      if (!window.navigator.id) {
        return console.error('No persona found. Did you load include.js?');
      }

      analytics.event('Persona Login Clicked');

      window.navigator.id.get(function (assertion) {
        if (!assertion) {
          analytics.event('Webmaker Login Cancelled', analyticsLabel);
          return;
        }

        loginApi.personaLogin(assertion, function (err, resp, body) {
          if (err || resp.status !== 200) {
            analytics.event('Webmaker Login Failed', analyticsLabel);
            return;
          }

          analytics.event('Webmaker Login Succeeded', analyticsLabel);

          if (body.user) {
            emit(PERSONA_EVENTS.signedIn, body.user);
          } else if (body.email) {
            analytics.event('Webmaker New User Started', analyticsLabel);
            emit(PERSONA_EVENTS.newUser, body.email);
          }
        });
      });
    }
  };
};
