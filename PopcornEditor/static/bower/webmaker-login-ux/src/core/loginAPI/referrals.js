var cookiejs = require('cookie-js');

module.exports = function referrals() {
  var referralCookieSettings = {
    // grab only the first two parts of the hostname
    domain: location.hostname.split('.').slice(-2).join('.'),
    path: '/',
    // secure cookie if connection uses TLS
    secure: location.protocol === 'https:',
    // expire in one week
    expires: new Date((Date.now() + 60 * 1000 * 60 * 24 * 7))
  };
  var refValue = /ref=((?:\w|-)+)/.exec(window.location.search);
  var cookieRefValue = cookiejs.parse(document.cookie).webmakerReferral;

  if (refValue) {
    refValue = refValue[1];
    if (cookieRefValue !== refValue) {
      document.cookie = cookiejs.serialize('webmakerReferral', refValue, referralCookieSettings);
      cookieRefValue = refValue;
    }
  }

  return {
    clearReferrerCookie: function () {
      referralCookieSettings.expires = new Date((Date.now() - 10000));
      document.cookie = cookiejs.serialize('webmakerReferral', 'expire', referralCookieSettings);
      referralCookieSettings.expires = new Date((Date.now() + 60 * 1000 * 60 * 24 * 7));
    },
    refValue: function () {
      return cookieRefValue;
    }
  };
};
