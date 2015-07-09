var Emitter = require('./emitter.js');
var validation = require('../validation');
var analytics = require('webmaker-analytics');

module.exports = function JoinController(loginApi, showCTA) {

  var emitter = new Emitter();

  var JOIN_ALERTS = {
    agreeToTerms: 'agreeToTerms',
    accountExists: 'accountExists',
    invalidEmail: 'invalidEmail',
    invalidUsername: 'invalidUsername',
    usernameTaken: 'usernameTaken',
    serverError: 'serverError'
  };

  var JOIN_EVENTS = {
    sendingRequest: 'sendingRequest',
    displayAlert: 'displayAlert',
    hideAlert: 'hideAlert',
    displayUsernameInput: 'displayUsernameInput',
    displayEmailInput: 'displayEmailInput',
    displayWelcome: 'displayWelcome'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  function setRequestState(state) {
    emit(JOIN_EVENTS.sendingRequest, state, !state ? true : false);
  }

  function displayAlert(alertId, forceUpdate) {
    emit(JOIN_EVENTS.displayAlert, alertId, forceUpdate);
  }

  function clearAlerts(alerts) {
    alerts = Array.isArray(alerts) ? alerts : [alerts];
    alerts.forEach(function (alert) {
      emit(JOIN_EVENTS.hideAlert, alert);
    });
  }

  function validateEmailCallback(err, resp, body) {
    setRequestState(false);
    if (err || resp.status !== 200) {
      return displayAlert(JOIN_ALERTS.serverError, true);
    }

    if (body.exists) {
      return displayAlert(JOIN_ALERTS.accountExists, true);
    }
  }

  function usernameExistsCallback(err, resp, body) {
    setRequestState(false);

    if (err || resp.status !== 200) {
      return displayAlert(JOIN_ALERTS.serverError, true);
    }

    if (body.exists) {
      return displayAlert(JOIN_ALERTS.usernameTaken, true);
    }

    emit(JOIN_EVENTS.displayUsernameInput);

  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      if (!listener) {
        return emitter.off(event);
      }
      emitter.removeListener(event, listener);
    },
    start: function () {
      emit(JOIN_EVENTS.displayEmailInput);
    },
    validateEmail: function (email) {
      clearAlerts([
        JOIN_ALERTS.invalidEmail,
        JOIN_ALERTS.accountExists,
        JOIN_ALERTS.serverError
      ]);

      var valid = validation.isEmail(email);

      if (!valid) {
        displayAlert(JOIN_ALERTS.invalidEmail);
        return false;
      }

      setRequestState(true);

      loginApi.uidExists(email, validateEmailCallback);
      return true;
    },
    submitEmail: function (agreeToTerms) {
      if (!agreeToTerms) {
        return displayAlert(JOIN_ALERTS.agreeToTerms);
      }
      emit(JOIN_EVENTS.displayUsernameInput);
    },
    agreeToTermsChanged: function (agree) {
      if (agree) {
        emit(JOIN_EVENTS.hideAlert, JOIN_ALERTS.agreeToTerms);
      }
    },
    validateUsername: function (username) {
      clearAlerts([
        JOIN_ALERTS.invalidUsername,
        JOIN_ALERTS.usernameTaken,
        JOIN_ALERTS.serverError
      ]);

      if (!username) {
        return;
      }

      var valid = validation.isUsername(username);

      if (!valid) {
        return displayAlert(JOIN_ALERTS.invalidUsername);
      }

      setRequestState(true);

      loginApi.uidExists(username, usernameExistsCallback);
    },
    submitUser: function (formData) {
      clearAlerts([
        JOIN_ALERTS.agreeToTerms,
        JOIN_ALERTS.serverError,
      ]);

      var lang = 'en-US';
      var html = document.querySelector('html');

      if (html.lang) {
        lang = html.lang;
      }

      setRequestState(true);
      loginApi.createUser({
        email: formData.email,
        username: formData.username,
        mailingList: formData.subscribeToList,
        prefLocale: lang
      }, function (err, resp, body) {
        setRequestState(false);
        if (err || resp.status !== 200) {
          return displayAlert(JOIN_ALERTS.serverError);
        }
        analytics.event('Webmaker New User Created', {
          nonInteraction: true
        });
        analytics.conversionGoal('WebmakerNewUserCreated');
        emit(JOIN_EVENTS.displayWelcome, body.user, showCTA);
      });
    }
  };
};
