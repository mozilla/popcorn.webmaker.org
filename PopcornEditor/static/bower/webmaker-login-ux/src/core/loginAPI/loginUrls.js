module.exports = function (options) {

  var paths = {},
    host = options.host || '';

  paths = options.paths || {};
  paths.authenticate = options.paths.authenticate || '/authenticate';
  paths.legacyCreate = options.paths.legacyCreate || '/create';
  paths.verify = options.paths.verify || '/verify';
  paths.logout = options.paths.logout || '/logout';
  paths.checkUsername = options.paths.checkUsername || '/check-username';
  paths.request = options.paths.request || '/auth/v2/request';
  paths.uidExists = options.paths.uidExists || '/auth/v2/uid-exists';
  paths.createUser = options.paths.createUser || '/auth/v2/create';
  paths.authenticateToken = options.paths.authenticateToken || '/auth/v2/authenticateToken';
  paths.verifyPassword = options.paths.verifyPassword || '/auth/v2/verify-password';
  paths.requestResetCode = options.paths.requestResetCode || '/auth/v2/request-reset-code';
  paths.removePassword = options.paths.removePassword || '/auth/v2/remove-password';
  paths.enablePasswords = options.paths.enablePasswords || '/auth/v2/enable-passwords';
  paths.resetPassword = options.paths.resetPassword || '/auth/v2/reset-password';

  return {
    request: host + paths.request,
    authenticateToken: host + paths.authenticateToken,
    authenticate: host + paths.authenticate,
    legacyCreate: host + paths.legacyCreate,
    createUser: host + paths.createUser,
    verify: host + paths.verify,
    logout: host + paths.logout,
    uidExists: host + paths.uidExists,
    checkUsername: host + paths.checkUsername,
    verifyPassword: host + paths.verifyPassword,
    requestResetCode: host + paths.requestResetCode,
    removePassword: host + paths.removePassword,
    enablePasswords: host + paths.enablePasswords,
    resetPassword: host + paths.resetPassword
  };
};
