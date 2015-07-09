var Emitter = require('./emitter.js');
var validation = require('../validation');
var analytics = require('webmaker-analytics');

module.exports = function SignInController(loginApi) {

  var emitter = new Emitter();

  var SIGNIN_ALERTS = {
    paswordReset: 'paswordReset',
    noAccount: 'noAccount',
    invalidUid: 'invalidUid',
    serverError: 'serverError',
    invalidKey: 'invalidKey',
    passwordSigninFailed: 'passwordSigninFailed',
    resetRequestFailed: 'resetRequestFailed'
  };

  var SIGNIN_EVENTS = {
    sendingRequest: 'sendingRequest',
    displayAlert: 'displayAlert',
    hideAlert: 'hideAlert',
    displayEnterUid: 'displayEnterUid',
    displayEnterPassword: 'displayEnterPassword',
    displayEnterKey: 'displayEnterKey',
    displayCheckEmail: 'displayCheckEmail',
    displayResetSent: 'displayResetSent',
    signedIn: 'signedIn'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  function setRequestState(state) {
    emit(SIGNIN_EVENTS.sendingRequest, state);
  }

  function displayAlert(alertId) {
    emit(SIGNIN_EVENTS.displayAlert, alertId);
  }

  function hideAlert(alertId) {
    emit(SIGNIN_EVENTS.hideAlert, alertId);
  }

  function clearAlerts(alerts) {
    alerts = Array.isArray(alerts) ? alerts : [alerts];
    alerts.forEach(function (alertId) {
      hideAlert(alertId);
    });
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    start: function () {
      emit(SIGNIN_EVENTS.displayEnterUid);
    },
    submitUid: function (uid, path) {
      clearAlerts([
        SIGNIN_ALERTS.invalidUid,
        SIGNIN_ALERTS.serverError,
        SIGNIN_ALERTS.noAccount
      ]);

      var valid = validation.isEmail(uid) || validation.isUsername(uid);

      if (!valid) {
        return displayAlert(SIGNIN_ALERTS.invalidUid);
      }

      setRequestState(true);
      loginApi.uidExists(uid, function uidExistsCallback(err, resp, body) {
        setRequestState(false);

        if (err || resp.status !== 200) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        var isVerified = body.verified;

        if (!body.exists) {
          return displayAlert(SIGNIN_ALERTS.noAccount);
        }

        if (body.usePasswordLogin) {
          return emit(SIGNIN_EVENTS.displayEnterPassword);
        }

        loginApi.sendLoginKey(uid, path, function sendLoginKeyCallback(err, resp, body) {
          if (err) {
            return displayAlert(SIGNIN_ALERTS.serverError);
          }

          if (isVerified) {
            emit(SIGNIN_EVENTS.displayEnterKey, false);
          } else {
            emit(SIGNIN_EVENTS.displayCheckEmail);
          }
        });
      });
    },
    displayEnterKey: function () {
      emit(SIGNIN_EVENTS.displayEnterKey, true);
    },
    verifyKey: function (uid, key, rememberMe) {
      clearAlerts([
        SIGNIN_ALERTS.serverError,
        SIGNIN_ALERTS.invalidKey
      ]);

      setRequestState(true);
      var validFor = rememberMe ? 'one-year' : '';
      loginApi.verifyKey(uid, key, validFor, function verifyKeyCallback(err, resp, body) {
        setRequestState(false);
        if (err) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        if (!body.user) {
          return displayAlert(SIGNIN_ALERTS.invalidKey);
        }

        analytics.event('Webmaker Login Succeeded', {
          label: 'key'
        });

        emit(SIGNIN_EVENTS.signedIn, body.user);

      });
    },
    verifyPassword: function (uid, password, rememberMe) {
      setRequestState(true);
      var validFor = rememberMe ? 'one-year' : '';
      loginApi.verifyPassword(uid, password, validFor, function verifyPasswordCallback(err, resp, body) {
        setRequestState(false);
        if (err) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        if (!body.user) {
          return displayAlert(SIGNIN_ALERTS.passwordSigninFailed);
        }

        analytics.event('Webmaker Login Succeeded', {
          label: 'password'
        });

        emit(SIGNIN_EVENTS.signedIn, body.user);
      });
    },
    requestReset: function (uid) {
      setRequestState(true);
      loginApi.requestReset(uid, function requestResetCallback(err, resp, body) {
        setRequestState(false);
        if (err) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        if (!body.status) {
          return displayAlert(SIGNIN_ALERTS.resetRequestFailed);
        }

        analytics.event('Webmaker Password Reset Requested');

        emit(SIGNIN_EVENTS.displayResetSent);
      });
    },
    getUidType: function (uid) {
      return validation.isEmail(uid) ? 'email' : validation.isUsername(uid) ? 'username' : null;
    }
  };
};
