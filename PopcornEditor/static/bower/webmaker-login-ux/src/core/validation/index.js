var usernameRegex = /^[a-zA-Z0-9\-]{1,20}$/,
  emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  containsBothCases = /^.*(?=.*[a-z])(?=.*[A-Z]).*$/,
  containsDigit = /\d/;

var MIN_PASSWORD_LEN = 8;

module.exports = {
  isEmail: function (email) {
    return emailRegex.test(email);
  },
  isUsername: function (username) {
    return usernameRegex.test(username);
  },
  passwordsMatch: function (password, confirmation) {
    return password === confirmation;
  },
  checkPasswordStrength: function (password) {
    if (!password) {
      return false;
    }

    var lengthValid = password.length >= MIN_PASSWORD_LEN,
      caseValid = !! password.match(containsBothCases),
      digitValid = !! password.match(containsDigit);

    return {
      lengthValid: lengthValid,
      caseValid: caseValid,
      digitValid: digitValid
    };
  }
};
