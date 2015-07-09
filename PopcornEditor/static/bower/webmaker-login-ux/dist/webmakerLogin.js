(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "webmakerAuthWelcome":  {
    "message": "Welcome to Webmaker!",
    "description": "Welcome message for the join Webmaker modal dialog. Displayed after successfully creating a new Webmaker account"
  },
  "webmakerAuthServerError":  {
    "message": "An unknown error occurred on the server. Try your request again. If the problem persists, <a class=\"alert-link\" href=\"https://support.mozilla.org/kb/webmaker-account-help\" target=\"_\">get help</a>.",
    "description": "Error message displayed if an error occurs on the server."
  },
  "webmakerAuthCreateWelcome":  {
    "message": "Create A Webmaker Account",
    "description": "Header text for the join webmaker modal dialog"
  },
  "webmakerAuthChooseUsername":  {
    "message": "Choose A Username",
    "description": "Label text for the username selection input"
  },
  "webmakerAuthTakenError":  {
    "message": "<i class=\"fa fa-times\"></i> That username is taken. Try adding your favourite number at the end.",
    "description": "Error message displayed when the entered username is not available for use."
  },
  "webmakerAuthUsernameInvalid":  {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Uh oh!</strong> All usernames must be between 1-20 characters, and only include \"-\" and alphanumeric symbols",
    "description": "Error message displayed when the username entered contains symbols that are not allowed."
  },
  "webmakerAuthMailingList":  {
    "message": "Send me email updates about Webmaker and other Mozilla projects",
    "description": "Message about opting in for a Mozilla mailing list"
  },
  "webmakerAuthAgreeToTerms":  {
    "message": "I agree to Mozilla Webmaker's <a href='https://webmaker.org/terms'>Terms</a> and <a href='https://webmaker.org/privacy'>Privacy Policy</a>",
    "description": "I agree to Mozilla Webmaker's terms and privacy policy."
  },
  "webmakerAuthAgreeError":  {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Oh snap!</strong> You must agree to our terms and conditions.",
    "description": "Error message displayed if the terms and conditions checkbox isn't toggled on."
  },
  "webmakerAuthCreateAccount":  {
    "message": "Create Account",
    "description": "The button text for finishing the join Webmaker process."
  },
  "Cancel":  {
    "message": "Cancel",
    "description": "Cancel button text"
  },
  "Email":  {
    "message": "Enter Your Email",
    "description": "Label text for the email input"
  },
  "EmailOrUsername":  {
    "message": "Email or Username",
    "description": "Label text for the sign in input, asks for the username or email of the user's account."
  },
  "NotAnEmail":  {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Uh Oh!</strong> That doesn't look like an email address.",
    "description": "Error message when the text entered in an email input is not an email address"
  },
  "WebmakerAccountExists":  {
    "message": "<i class=\"fa fa-exclamation-circle\"></i>  <strong>Heads up!</strong> That email already has an account. Did you mean to <a href=\"#\" class=\"alert-link\" ng-click=\"switchToSignin();\">sign in</a>?",
    "description": "That email already has an accout. Did you mean to sign in?"
  },
  "ChooseUsername":  {
    "message": "Choose Username",
    "description": " Label text for selecting a username"
  },
  "Language Preference":  {
    "message": "Language Preference",
    "description": "Label text for selecting the preferred language for the user."
  },
  "Sign in to Webmaker":  {
    "message": "Sign In To Webmaker",
    "description": "Header text for the sign in modal dialog"
  },
  "Sign in":  {
    "message": "Sign In",
    "description": "Sign in Button text"
  },
  "Sign up":  {
    "message": "Join",
    "description": "Join button text"
  },
  "passLoginFailed":  {
    "message": "<i class=\"fa fa-times\"></i> <strong>Authentication failed!</strong>",
    "description": "Error message when a password login attempt fails"
  },
  "resetMessage":  {
    "message": "Check your email for a password reset link.",
    "description": "Directs the user to check their email for a password reset link"
  },
  "resetRequestFailed":  {
    "message": "<i class=\"fa fa-times\"></i> <strong>Uh oh!</strong> Something went wrong! Try requesting the password reset again. Or, <a class=\"alert-link\" href=\"https://support.mozilla.org/kb/webmaker-account-help\" target=\"_\">get help</a>.",
    "description": "Error displayed if a password reset request fails."
  },
  "Password":  {
    "message": "Password",
    "description": "Label text for the password input"
  },
  "Forgot your password?":  {
    "message": "Forgot your password?",
    "description": "button text for the password reset function"
  },
  "checkEmail":  {
    "message": "Check Your Email",
    "description": "Message instructing the user to check their email"
  },
  "tokenMessage":  {
    "message": "Please check your email to confirm your account.",
    "description": "Message instructing the user to check their email for an account confirmation link"
  },
  "That does not look like an email address or username":  {
    "message": "<i class=\"fa fa-times\"></i> <strong>Uh oh!</strong> That doesn't look like an email address or username.",
    "description": "Error message displayed when the input doesn't match a username or email"
  },
  "No account found for your uid":  {
    "message": "<i class=\"fa fa-times\"></i> We couldn't find your username or email address. Did you mean to <a href=\"#\" ng-click=\"switchToSignup();\" class=\"alert-link\">create an account</a>? Trouble? <a class=\"alert-link\" href=\"https://support.mozilla.org/kb/webmaker-account-help\" target=\"_\">Get help</a>.",
    "description": "Error message displayed when the given username or email doesn't have a Webmaker account and asks if they would like to sign up."
  },
  "problem sending token":  {
    "message": "<i class=\"fa fa-times\"></i> There was a problem sending a login key to you, please try again. <a class=\"alert-link\" href=\"https://support.mozilla.org/kb/webmaker-account-help\" target=\"_\">Get help</a>.",
    "description": "Error message displayed when the request for a login key fails for some reason."
  },
  "incorrectToken":  {
    "message": "<i class=\"fa fa-times\"></i> <strong>Uh oh!</strong> That key is not correct.",
    "description": "Error message displayed when the token used to log in is rejected."
  },
  "Visit Email":  {
    "message": "Visit your email to retrieve your key",
    "description": "Label text above the login key input field"
  },
  "Verified Visit Email":  {
    "message": "We emailed you a link & key to sign in",
    "description": "Message instructing the user to check their email for an account confirmation link"
  },
  "Enter key":  {
    "message": "Enter key <i class=\"fa fa-angle-right\"></i>",
    "description": "Label to enter key that was sent to user's email"
  },
  "you can switch to webmaker login":  {
    "message": "You can switch back to our Webmaker Login experience. We will send you login emails so you do not need a password.",
    "description": "Message reminding users that they can switch back to the Webmaker Login Key system instead of using a password."
  },
  "Submit":  {
    "message": "Submit",
    "description": "Label text for the submit new password button in the Reset Password Modal Dialog"
  },
  "or":  {
    "message": "or",
    "description": "Text beside the button that initiates a persona login"
  },
  "log in with Persona":  {
    "message": "log in with Persona",
    "description": "Text for the button that initiates a persona login"
  },
  "trouble with email":  {
    "message": "Trouble with email? Check your spam or <a href=\"https://support.mozilla.org/kb/webmaker-account-help\" tabindex=\"5\" target=\"_\">get help</a>",
    "description": "Text that allows users to get help"
  },
  "aboutWebmaker":  {
    "message": "Make your own web pages, interactive videos, remixes and mobile apps.",
    "description": "Short description of Webmaker"
  },
  "XRay-Goggles":  {
    "message": "X-Ray Goggles",
    "description": "The X-Ray Goggles Tool"
  },
  "AboutGoggles":  {
    "message": "X-Ray Goggles allow you to see the building blocks that make up websites on the Internet. Activate the goggles to inspect the code behind any webpage.",
    "description": "A short description of the X-Ray Goggles"
  },
  "TryGoggles":  {
    "message": "Try Goggles now",
    "description": "Text for the button that takes the user to the X-Ray Goggles homepage"
  },
  "ExploreWebmaker":  {
    "message": "Explore the rest of Webmaker",
    "description": "Text for the button which takes the user to webmaker.org/explore"
  },
  "Resources":  {
    "message": "Resources",
    "description": "The Resources section of Webmaker"
  },
  "AboutResources":  {
    "message": "Teach and learn digital skills and web literacy. Webmaker Resources are full of fun things to discover, make and teach.",
    "description": "A short description about the Resources section"
  },
  "VisitResources":  {
    "message": "Visit Resources",
    "description": "Text for the button that takes the user to the X-Ray Goggles homepage"
  },
  "passwords do not match":  {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Uh oh!</strong> The passwords do not match!",
    "description": "Error message displayed when the password input and password confirmation input do not match"
  },
  "error setting password":  {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Uh oh!</strong> There was an error trying to set your password, please try again.",
    "description": "Error displayed if there was a problem setting the new password"
  },
  "Confirm your password":  {
    "message": "Confirm Your Password",
    "description": "Label text for the password confirmation input"
  },
  "Reset Password":  {
    "message": "Reset Password",
    "description": "Reset Password Modal title"
  },
  "Set a Password":  {
    "message": "Set A Password",
    "description": "Label text for the password input box (reset password modal)"
  },
  "Password Reset Success":  {
    "message": "<i class=\"fa fa-check\"></i> <strong>Success!</strong> You've successfully reset your password, please sign in!",
    "description": "Alert displayed after successfully resetting a password"
  },
  "Password too weak":  {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Uh oh!</strong> The password you've entered is too weak. Make sure it doesn't contain any common words or patterns, and doesn't contain your email or username",
    "description": "Error message displayed if the server determined the password entered is too weak."
  },
  "Minimum password requirements":  {
    "message": "Minimum password requirements",
    "description": "Text above the list of minimum requirements that a password must satisfy"
  },
  "At least 8 characters":  {
    "message": "At least 8 characters",
    "description": "A password must contain 8 or more characters"
  },
  "At least 1 upper and lower case character":  {
    "message": "At least 1 uppercase and lowercase character",
    "description": "A password must contain at least 1 upper and lower case character"
  },
  "At least 1 number":  {
    "message": "At least 1 number",
    "description": "a password must contain at least one number character"
  },
  "resetRequestFailed": {
    "message": "<i class=\"fa fa-times\"></i>  <strong>Uh oh!</strong> There was a problem processing your request, please try again.",
    "description": "Error message displayed if the reset request fails for some reason"
  },
  "Next": {
    "message": "Next",
    "description": "Go to the next screen"
  },
  "Cancel": {
    "message": "Cancel",
    "description": "Cancel sign up or sign in"
  },
  "Done": {
    "message": "Done",
    "description": "Done, close the window."
  },
  "Remember me for one year": {
    "message": "Remember me",
    "description": "Message displayed next to the remember me checkbox"
  },
  "Lets Go!": {
    "message": "Let's Go!",
    "description": "Button text for closing the modal dialog after account creation"
  },
  "Expired Login Link": {
    "message": "Uh Oh! Your login link expired. Request a new email to sign in.",
    "description": "Error message displayed if a login link is expired"
  }
}

},{}],2:[function(require,module,exports){
"use strict";

var parse = require("./parse.js");

var filters = {},
    Lexer = parse.Lexer,
    Parser = parse.Parser,
    lexer = new Lexer({}),
    parser = new Parser(lexer, getFilter);

/**
 * Compiles src and returns a function that executes src on a target object.
 * The compiled function is cached under compile.cache[src] to speed up further calls.
 *
 * @param {string} src
 * @returns {function}
 */
function compile(src) {
    var cached;

    if (typeof src !== "string") {
        throw new TypeError("src must be a string, instead saw '" + typeof src + "'");
    }

    if (!compile.cache) {
        return parser.parse(src);
    }

    cached = compile.cache[src];
    if (!cached) {
        cached = compile.cache[src] = parser.parse(src);
    }

    return cached;
}

/**
 * A cache containing all compiled functions. The src is used as key.
 * Set this on false to disable the cache.
 *
 * @type {object}
 */
compile.cache = {};

/**
 * Just a stub of angular's $filter-method
 *
 * @private
 * @param {string} name
 * @returns {function}
 */
function getFilter(name) {
    return filters[name];
}

exports.Lexer = Lexer;
exports.Parser = Parser;
exports.compile = compile;
exports.filters = filters;
},{"./parse.js":3}],3:[function(require,module,exports){
"use strict";

// Angular environment stuff
// ------------------------------
function noop() {}

// Simplified extend() for our use-case
function extend(dst, obj) {
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            dst[key] = obj[key];
        }
    }

    return dst;
}

function isDefined(value) { return typeof value !== 'undefined'; }

function valueFn(value) { return function () { return value; }; }

function $parseMinErr(module, message, arg1, arg2, arg3) {
    var args = arguments;

    message = message.replace(/{(\d)}/g, function (match) {
        return args[2 + parseInt(match[1])];
    });

    throw new SyntaxError(message);
}

function lowercase (string) {return typeof string === "string" ? string.toLowerCase() : string;}

// Simplified forEach() for our use-case
function forEach(arr, iterator) {
    arr.forEach(iterator);
}

// Sandboxing Angular Expressions
// ------------------------------
// Angular expressions are generally considered safe because these expressions only have direct
// access to $scope and locals. However, one can obtain the ability to execute arbitrary JS code by
// obtaining a reference to native JS functions such as the Function constructor.
//
// As an example, consider the following Angular expression:
//
//   {}.toString.constructor(alert("evil JS code"))
//
// We want to prevent this type of access. For the sake of performance, during the lexing phase we
// disallow any "dotted" access to any member named "constructor".
//
// For reflective calls (a[b]) we check that the value of the lookup is not the Function constructor
// while evaluating the expression, which is a stronger but more expensive test. Since reflective
// calls are expensive anyway, this is not such a big deal compared to static dereferencing.
//
// This sandboxing technique is not perfect and doesn't aim to be. The goal is to prevent exploits
// against the expression language, but not to prevent exploits that were enabled by exposing
// sensitive JavaScript or browser apis on Scope. Exposing such objects on a Scope is never a good
// practice and therefore we are not even trying to protect against interaction with an object
// explicitly exposed in this way.
//
// A developer could foil the name check by aliasing the Function constructor under a different
// name on the scope.
//
// In general, it is not possible to access a Window object from an angular expression unless a
// window or some DOM object that has a reference to window is published onto a Scope.

function ensureSafeMemberName(name, fullExpression) {
  if (name === "constructor") {
    throw $parseMinErr('isecfld',
        'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
  }
  return name;
}

function ensureSafeObject(obj, fullExpression) {
  // nifty check if obj is Function that is fast and works across iframes and other contexts
  if (obj) {
    if (obj.constructor === obj) {
      throw $parseMinErr('isecfn',
          'Referencing Function in Angular expressions is disallowed! Expression: {0}',
          fullExpression);
    } else if (// isWindow(obj)
        obj.document && obj.location && obj.alert && obj.setInterval) {
      throw $parseMinErr('isecwindow',
          'Referencing the Window in Angular expressions is disallowed! Expression: {0}',
          fullExpression);
    } else if (// isElement(obj)
        obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))) {
      throw $parseMinErr('isecdom',
          'Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}',
          fullExpression);
    }
  }
  return obj;
}

var OPERATORS = {
    /* jshint bitwise : false */
    'null':function(){return null;},
    'true':function(){return true;},
    'false':function(){return false;},
    undefined:noop,
    '+':function(self, locals, a,b){
      a=a(self, locals); b=b(self, locals);
      if (isDefined(a)) {
        if (isDefined(b)) {
          return a + b;
        }
        return a;
      }
      return isDefined(b)?b:undefined;},
    '-':function(self, locals, a,b){
          a=a(self, locals); b=b(self, locals);
          return (isDefined(a)?a:0)-(isDefined(b)?b:0);
        },
    '*':function(self, locals, a,b){return a(self, locals)*b(self, locals);},
    '/':function(self, locals, a,b){return a(self, locals)/b(self, locals);},
    '%':function(self, locals, a,b){return a(self, locals)%b(self, locals);},
    '^':function(self, locals, a,b){return a(self, locals)^b(self, locals);},
    '=':noop,
    '===':function(self, locals, a, b){return a(self, locals)===b(self, locals);},
    '!==':function(self, locals, a, b){return a(self, locals)!==b(self, locals);},
    '==':function(self, locals, a,b){return a(self, locals)==b(self, locals);},
    '!=':function(self, locals, a,b){return a(self, locals)!=b(self, locals);},
    '<':function(self, locals, a,b){return a(self, locals)<b(self, locals);},
    '>':function(self, locals, a,b){return a(self, locals)>b(self, locals);},
    '<=':function(self, locals, a,b){return a(self, locals)<=b(self, locals);},
    '>=':function(self, locals, a,b){return a(self, locals)>=b(self, locals);},
    '&&':function(self, locals, a,b){return a(self, locals)&&b(self, locals);},
    '||':function(self, locals, a,b){return a(self, locals)||b(self, locals);},
    '&':function(self, locals, a,b){return a(self, locals)&b(self, locals);},
//    '|':function(self, locals, a,b){return a|b;},
    '|':function(self, locals, a,b){return b(self, locals)(self, locals, a(self, locals));},
    '!':function(self, locals, a){return !a(self, locals);}
};
/* jshint bitwise: true */
var ESCAPE = {"n":"\n", "f":"\f", "r":"\r", "t":"\t", "v":"\v", "'":"'", '"':'"'};


/////////////////////////////////////////


/**
 * @constructor
 */
var Lexer = function (options) {
  this.options = options;
};

Lexer.prototype = {
  constructor: Lexer,

  lex: function (text) {
    this.text = text;

    this.index = 0;
    this.ch = undefined;
    this.lastCh = ':'; // can start regexp

    this.tokens = [];

    var token;
    var json = [];

    while (this.index < this.text.length) {
      this.ch = this.text.charAt(this.index);
      if (this.is('"\'')) {
        this.readString(this.ch);
      } else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek())) {
        this.readNumber();
      } else if (this.isIdent(this.ch)) {
        this.readIdent();
        // identifiers can only be if the preceding char was a { or ,
        if (this.was('{,') && json[0] === '{' &&
            (token = this.tokens[this.tokens.length - 1])) {
          token.json = token.text.indexOf('.') === -1;
        }
      } else if (this.is('(){}[].,;:?')) {
        this.tokens.push({
          index: this.index,
          text: this.ch,
          json: (this.was(':[,') && this.is('{[')) || this.is('}]:,')
        });
        if (this.is('{[')) json.unshift(this.ch);
        if (this.is('}]')) json.shift();
        this.index++;
      } else if (this.isWhitespace(this.ch)) {
        this.index++;
        continue;
      } else {
        var ch2 = this.ch + this.peek();
        var ch3 = ch2 + this.peek(2);
        var fn = OPERATORS[this.ch];
        var fn2 = OPERATORS[ch2];
        var fn3 = OPERATORS[ch3];
        if (fn3) {
          this.tokens.push({index: this.index, text: ch3, fn: fn3});
          this.index += 3;
        } else if (fn2) {
          this.tokens.push({index: this.index, text: ch2, fn: fn2});
          this.index += 2;
        } else if (fn) {
          this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: fn,
            json: (this.was('[,:') && this.is('+-'))
          });
          this.index += 1;
        } else {
          this.throwError('Unexpected next character ', this.index, this.index + 1);
        }
      }
      this.lastCh = this.ch;
    }
    return this.tokens;
  },

  is: function(chars) {
    return chars.indexOf(this.ch) !== -1;
  },

  was: function(chars) {
    return chars.indexOf(this.lastCh) !== -1;
  },

  peek: function(i) {
    var num = i || 1;
    return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
  },

  isNumber: function(ch) {
    return ('0' <= ch && ch <= '9');
  },

  isWhitespace: function(ch) {
    // IE treats non-breaking space as \u00A0
    return (ch === ' ' || ch === '\r' || ch === '\t' ||
            ch === '\n' || ch === '\v' || ch === '\u00A0');
  },

  isIdent: function(ch) {
    return ('a' <= ch && ch <= 'z' ||
            'A' <= ch && ch <= 'Z' ||
            '_' === ch || ch === '$');
  },

  isExpOperator: function(ch) {
    return (ch === '-' || ch === '+' || this.isNumber(ch));
  },

  throwError: function(error, start, end) {
    end = end || this.index;
    var colStr = (isDefined(start)
            ? 's ' + start +  '-' + this.index + ' [' + this.text.substring(start, end) + ']'
            : ' ' + end);
    throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].',
        error, colStr, this.text);
  },

  readNumber: function() {
    var number = '';
    var start = this.index;
    while (this.index < this.text.length) {
      var ch = lowercase(this.text.charAt(this.index));
      if (ch == '.' || this.isNumber(ch)) {
        number += ch;
      } else {
        var peekCh = this.peek();
        if (ch == 'e' && this.isExpOperator(peekCh)) {
          number += ch;
        } else if (this.isExpOperator(ch) &&
            peekCh && this.isNumber(peekCh) &&
            number.charAt(number.length - 1) == 'e') {
          number += ch;
        } else if (this.isExpOperator(ch) &&
            (!peekCh || !this.isNumber(peekCh)) &&
            number.charAt(number.length - 1) == 'e') {
          this.throwError('Invalid exponent');
        } else {
          break;
        }
      }
      this.index++;
    }
    number = 1 * number;
    this.tokens.push({
      index: start,
      text: number,
      json: true,
      fn: function() { return number; }
    });
  },

  readIdent: function() {
    var parser = this;

    var ident = '';
    var start = this.index;

    var lastDot, peekIndex, methodName, ch;

    while (this.index < this.text.length) {
      ch = this.text.charAt(this.index);
      if (ch === '.' || this.isIdent(ch) || this.isNumber(ch)) {
        if (ch === '.') lastDot = this.index;
        ident += ch;
      } else {
        break;
      }
      this.index++;
    }

    //check if this is not a method invocation and if it is back out to last dot
    if (lastDot) {
      peekIndex = this.index;
      while (peekIndex < this.text.length) {
        ch = this.text.charAt(peekIndex);
        if (ch === '(') {
          methodName = ident.substr(lastDot - start + 1);
          ident = ident.substr(0, lastDot - start);
          this.index = peekIndex;
          break;
        }
        if (this.isWhitespace(ch)) {
          peekIndex++;
        } else {
          break;
        }
      }
    }


    var token = {
      index: start,
      text: ident
    };

    // OPERATORS is our own object so we don't need to use special hasOwnPropertyFn
    if (OPERATORS.hasOwnProperty(ident)) {
      token.fn = OPERATORS[ident];
      token.json = OPERATORS[ident];
    } else {
      var getter = getterFn(ident, this.options, this.text);
      token.fn = extend(function(self, locals) {
        return (getter(self, locals));
      }, {
        assign: function(self, value) {
          return setter(self, ident, value, parser.text, parser.options);
        }
      });
    }

    this.tokens.push(token);

    if (methodName) {
      this.tokens.push({
        index:lastDot,
        text: '.',
        json: false
      });
      this.tokens.push({
        index: lastDot + 1,
        text: methodName,
        json: false
      });
    }
  },

  readString: function(quote) {
    var start = this.index;
    this.index++;
    var string = '';
    var rawString = quote;
    var escape = false;
    while (this.index < this.text.length) {
      var ch = this.text.charAt(this.index);
      rawString += ch;
      if (escape) {
        if (ch === 'u') {
          var hex = this.text.substring(this.index + 1, this.index + 5);
          if (!hex.match(/[\da-f]{4}/i))
            this.throwError('Invalid unicode escape [\\u' + hex + ']');
          this.index += 4;
          string += String.fromCharCode(parseInt(hex, 16));
        } else {
          var rep = ESCAPE[ch];
          if (rep) {
            string += rep;
          } else {
            string += ch;
          }
        }
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === quote) {
        this.index++;
        this.tokens.push({
          index: start,
          text: rawString,
          string: string,
          json: true,
          fn: function() { return string; }
        });
        return;
      } else {
        string += ch;
      }
      this.index++;
    }
    this.throwError('Unterminated quote', start);
  }
};


/**
 * @constructor
 */
var Parser = function (lexer, $filter, options) {
  this.lexer = lexer;
  this.$filter = $filter;
  this.options = options;
};

Parser.ZERO = function () { return 0; };

Parser.prototype = {
  constructor: Parser,

  parse: function (text) {
    this.text = text;

    this.tokens = this.lexer.lex(text);

    var value = this.statements();

    if (this.tokens.length !== 0) {
      this.throwError('is an unexpected token', this.tokens[0]);
    }

    value.literal = !!value.literal;
    value.constant = !!value.constant;

    return value;
  },

  primary: function () {
    var primary;
    if (this.expect('(')) {
      primary = this.filterChain();
      this.consume(')');
    } else if (this.expect('[')) {
      primary = this.arrayDeclaration();
    } else if (this.expect('{')) {
      primary = this.object();
    } else {
      var token = this.expect();
      primary = token.fn;
      if (!primary) {
        this.throwError('not a primary expression', token);
      }
      if (token.json) {
        primary.constant = true;
        primary.literal = true;
      }
    }

    var next, context;
    while ((next = this.expect('(', '[', '.'))) {
      if (next.text === '(') {
        primary = this.functionCall(primary, context);
        context = null;
      } else if (next.text === '[') {
        context = primary;
        primary = this.objectIndex(primary);
      } else if (next.text === '.') {
        context = primary;
        primary = this.fieldAccess(primary);
      } else {
        this.throwError('IMPOSSIBLE');
      }
    }
    return primary;
  },

  throwError: function(msg, token) {
    throw $parseMinErr('syntax',
        'Syntax Error: Token \'{0}\' {1} at column {2} of the expression [{3}] starting at [{4}].',
          token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
  },

  peekToken: function() {
    if (this.tokens.length === 0)
      throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
    return this.tokens[0];
  },

  peek: function(e1, e2, e3, e4) {
    if (this.tokens.length > 0) {
      var token = this.tokens[0];
      var t = token.text;
      if (t === e1 || t === e2 || t === e3 || t === e4 ||
          (!e1 && !e2 && !e3 && !e4)) {
        return token;
      }
    }
    return false;
  },

  expect: function(e1, e2, e3, e4){
    var token = this.peek(e1, e2, e3, e4);
    if (token) {
      this.tokens.shift();
      return token;
    }
    return false;
  },

  consume: function(e1){
    if (!this.expect(e1)) {
      this.throwError('is unexpected, expecting [' + e1 + ']', this.peek());
    }
  },

  unaryFn: function(fn, right) {
    return extend(function(self, locals) {
      return fn(self, locals, right);
    }, {
      constant:right.constant
    });
  },

  ternaryFn: function(left, middle, right){
    return extend(function(self, locals){
      return left(self, locals) ? middle(self, locals) : right(self, locals);
    }, {
      constant: left.constant && middle.constant && right.constant
    });
  },

  binaryFn: function(left, fn, right) {
    return extend(function(self, locals) {
      return fn(self, locals, left, right);
    }, {
      constant:left.constant && right.constant
    });
  },

  statements: function() {
    var statements = [];
    while (true) {
      if (this.tokens.length > 0 && !this.peek('}', ')', ';', ']'))
        statements.push(this.filterChain());
      if (!this.expect(';')) {
        // optimize for the common case where there is only one statement.
        // TODO(size): maybe we should not support multiple statements?
        return (statements.length === 1)
            ? statements[0]
            : function(self, locals) {
                var value;
                for (var i = 0; i < statements.length; i++) {
                  var statement = statements[i];
                  if (statement) {
                    value = statement(self, locals);
                  }
                }
                return value;
              };
      }
    }
  },

  filterChain: function() {
    var left = this.expression();
    var token;
    while (true) {
      if ((token = this.expect('|'))) {
        left = this.binaryFn(left, token.fn, this.filter());
      } else {
        return left;
      }
    }
  },

  filter: function() {
    var token = this.expect();
    var fn = this.$filter(token.text);
    var argsFn = [];
    while (true) {
      if ((token = this.expect(':'))) {
        argsFn.push(this.expression());
      } else {
        var fnInvoke = function(self, locals, input) {
          var args = [input];
          for (var i = 0; i < argsFn.length; i++) {
            args.push(argsFn[i](self, locals));
          }
          return fn.apply(self, args);
        };
        return function() {
          return fnInvoke;
        };
      }
    }
  },

  expression: function() {
    return this.assignment();
  },

  assignment: function() {
    var left = this.ternary();
    var right;
    var token;
    if ((token = this.expect('='))) {
      if (!left.assign) {
        this.throwError('implies assignment but [' +
            this.text.substring(0, token.index) + '] can not be assigned to', token);
      }
      right = this.ternary();
      return function(scope, locals) {
        return left.assign(scope, right(scope, locals), locals);
      };
    }
    return left;
  },

  ternary: function() {
    var left = this.logicalOR();
    var middle;
    var token;
    if ((token = this.expect('?'))) {
      middle = this.ternary();
      if ((token = this.expect(':'))) {
        return this.ternaryFn(left, middle, this.ternary());
      } else {
        this.throwError('expected :', token);
      }
    } else {
      return left;
    }
  },

  logicalOR: function() {
    var left = this.logicalAND();
    var token;
    while (true) {
      if ((token = this.expect('||'))) {
        left = this.binaryFn(left, token.fn, this.logicalAND());
      } else {
        return left;
      }
    }
  },

  logicalAND: function() {
    var left = this.equality();
    var token;
    if ((token = this.expect('&&'))) {
      left = this.binaryFn(left, token.fn, this.logicalAND());
    }
    return left;
  },

  equality: function() {
    var left = this.relational();
    var token;
    if ((token = this.expect('==','!=','===','!=='))) {
      left = this.binaryFn(left, token.fn, this.equality());
    }
    return left;
  },

  relational: function() {
    var left = this.additive();
    var token;
    if ((token = this.expect('<', '>', '<=', '>='))) {
      left = this.binaryFn(left, token.fn, this.relational());
    }
    return left;
  },

  additive: function() {
    var left = this.multiplicative();
    var token;
    while ((token = this.expect('+','-'))) {
      left = this.binaryFn(left, token.fn, this.multiplicative());
    }
    return left;
  },

  multiplicative: function() {
    var left = this.unary();
    var token;
    while ((token = this.expect('*','/','%'))) {
      left = this.binaryFn(left, token.fn, this.unary());
    }
    return left;
  },

  unary: function() {
    var token;
    if (this.expect('+')) {
      return this.primary();
    } else if ((token = this.expect('-'))) {
      return this.binaryFn(Parser.ZERO, token.fn, this.unary());
    } else if ((token = this.expect('!'))) {
      return this.unaryFn(token.fn, this.unary());
    } else {
      return this.primary();
    }
  },

  fieldAccess: function(object) {
    var parser = this;
    var field = this.expect().text;
    var getter = getterFn(field, this.options, this.text);

    return extend(function(scope, locals, self) {
      return getter(self || object(scope, locals));
    }, {
      assign: function(scope, value, locals) {
        return setter(object(scope, locals), field, value, parser.text, parser.options);
      }
    });
  },

  objectIndex: function(obj) {
    var parser = this;

    var indexFn = this.expression();
    this.consume(']');

    return extend(function(self, locals) {
      var o = obj(self, locals),
          i = indexFn(self, locals),
          v, p;

      if (!o) return undefined;
      v = ensureSafeObject(o[i], parser.text);
      return v;
    }, {
      assign: function(self, value, locals) {
        var key = indexFn(self, locals);
        // prevent overwriting of Function.constructor which would break ensureSafeObject check
        var safe = ensureSafeObject(obj(self, locals), parser.text);
        return safe[key] = value;
      }
    });
  },

  functionCall: function(fn, contextGetter) {
    var argsFn = [];
    if (this.peekToken().text !== ')') {
      do {
        argsFn.push(this.expression());
      } while (this.expect(','));
    }
    this.consume(')');

    var parser = this;

    return function(scope, locals) {
      var args = [];
      var context = contextGetter ? contextGetter(scope, locals) : scope;

      for (var i = 0; i < argsFn.length; i++) {
        args.push(argsFn[i](scope, locals));
      }
      var fnPtr = fn(scope, locals, context) || noop;

      ensureSafeObject(context, parser.text);
      ensureSafeObject(fnPtr, parser.text);

      // IE stupidity! (IE doesn't have apply for some native functions)
      var v = fnPtr.apply
            ? fnPtr.apply(context, args)
            : fnPtr(args[0], args[1], args[2], args[3], args[4]);

      return ensureSafeObject(v, parser.text);
    };
  },

  // This is used with json array declaration
  arrayDeclaration: function () {
    var elementFns = [];
    var allConstant = true;
    if (this.peekToken().text !== ']') {
      do {
        if (this.peek(']')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var elementFn = this.expression();
        elementFns.push(elementFn);
        if (!elementFn.constant) {
          allConstant = false;
        }
      } while (this.expect(','));
    }
    this.consume(']');

    return extend(function(self, locals) {
      var array = [];
      for (var i = 0; i < elementFns.length; i++) {
        array.push(elementFns[i](self, locals));
      }
      return array;
    }, {
      literal: true,
      constant: allConstant
    });
  },

  object: function () {
    var keyValues = [];
    var allConstant = true;
    if (this.peekToken().text !== '}') {
      do {
        if (this.peek('}')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var token = this.expect(),
        key = token.string || token.text;
        this.consume(':');
        var value = this.expression();
        keyValues.push({key: key, value: value});
        if (!value.constant) {
          allConstant = false;
        }
      } while (this.expect(','));
    }
    this.consume('}');

    return extend(function(self, locals) {
      var object = {};
      for (var i = 0; i < keyValues.length; i++) {
        var keyValue = keyValues[i];
        object[keyValue.key] = keyValue.value(self, locals);
      }
      return object;
    }, {
      literal: true,
      constant: allConstant
    });
  }
};


//////////////////////////////////////////////////
// Parser helper functions
//////////////////////////////////////////////////

function setter(obj, path, setValue, fullExp) {
  var element = path.split('.'), key;
  for (var i = 0; element.length > 1; i++) {
    key = ensureSafeMemberName(element.shift(), fullExp);
    var propertyObj = obj[key];
    if (!propertyObj) {
      propertyObj = {};
      obj[key] = propertyObj;
    }
    obj = propertyObj;
  }
  key = ensureSafeMemberName(element.shift(), fullExp);
  obj[key] = setValue;
  return setValue;
}

var getterFnCache = {};

/**
 * Implementation of the "Black Hole" variant from:
 * - http://jsperf.com/angularjs-parse-getter/4
 * - http://jsperf.com/path-evaluation-simplified/7
 */
function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp) {
  ensureSafeMemberName(key0, fullExp);
  ensureSafeMemberName(key1, fullExp);
  ensureSafeMemberName(key2, fullExp);
  ensureSafeMemberName(key3, fullExp);
  ensureSafeMemberName(key4, fullExp);

  return function cspSafeGetter(scope, locals) {
          var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope;

          if (pathVal == null) return pathVal;
          pathVal = pathVal[key0];

          if (!key1) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key1];

          if (!key2) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key2];

          if (!key3) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key3];

          if (!key4) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key4];

          return pathVal;
        };
}

function simpleGetterFn1(key0, fullExp) {
  ensureSafeMemberName(key0, fullExp);

  return function simpleGetterFn1(scope, locals) {
    if (scope == null) return undefined;
    return ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
  };
}

function simpleGetterFn2(key0, key1, fullExp) {
  ensureSafeMemberName(key0, fullExp);
  ensureSafeMemberName(key1, fullExp);

  return function simpleGetterFn2(scope, locals) {
    if (scope == null) return undefined;
    scope = ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
    return scope == null ? undefined : scope[key1];
  };
}

function getterFn(path, options, fullExp) {
  // Check whether the cache has this getter already.
  // We can use hasOwnProperty directly on the cache because we ensure,
  // see below, that the cache never stores a path called 'hasOwnProperty'
  if (getterFnCache.hasOwnProperty(path)) {
    return getterFnCache[path];
  }

  var pathKeys = path.split('.'),
      pathKeysLength = pathKeys.length,
      fn;

  // When we have only 1 or 2 tokens, use optimized special case closures.
  // http://jsperf.com/angularjs-parse-getter/6
  if (pathKeysLength === 1) {
    fn = simpleGetterFn1(pathKeys[0], fullExp);
  } else if (pathKeysLength === 2) {
    fn = simpleGetterFn2(pathKeys[0], pathKeys[1], fullExp);
  } else if (options.csp) {
    if (pathKeysLength < 6) {
      fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp,
                          options);
    } else {
      fn = function(scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++],
                                pathKeys[i++], fullExp, options)(scope, locals);

          locals = undefined; // clear after first iteration
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    }
  } else {
    var code = 'var p;\n';
    forEach(pathKeys, function(key, index) {
      ensureSafeMemberName(key, fullExp);
      code += 'if(s == null) return undefined;\n' +
              's='+ (index
                      // we simply dereference 's' on any .dot notation
                      ? 's'
                      // but if we are first then we check locals first, and if so read it first
                      : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n';
    });
    code += 'return s;';

    /* jshint -W054 */
    var evaledFnGetter = new Function('s', 'k', 'pw', code); // s=scope, k=locals, pw=promiseWarning
    /* jshint +W054 */
    evaledFnGetter.toString = valueFn(code);
    fn = evaledFnGetter;
  }

  // Only cache the value if it's not going to mess up the cache object
  // This is more performant that using Object.prototype.hasOwnProperty.call
  if (path !== 'hasOwnProperty') {
    getterFnCache[path] = fn;
  }
  return fn;
}

exports.Lexer = Lexer;
exports.Parser = Parser;
},{}],4:[function(require,module,exports){
// Browser Request
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var XHR = XMLHttpRequest
if (!XHR) throw new Error('missing XMLHttpRequest')
request.log = {
  'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
}

var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

//
// request
//

function request(options, callback) {
  // The entry-point to the API: prep the options object and pass the real work to run_xhr.
  if(typeof callback !== 'function')
    throw new Error('Bad callback given: ' + callback)

  if(!options)
    throw new Error('No options given')

  var options_onResponse = options.onResponse; // Save this for later.

  if(typeof options === 'string')
    options = {'uri':options};
  else
    options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

  options.onResponse = options_onResponse // And put it back.

  if (options.verbose) request.log = getLogger();

  if(options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if(!options.uri && options.uri !== "")
    throw new Error("options.uri is a required argument");

  if(typeof options.uri != "string")
    throw new Error("options.uri must be a string");

  var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
  for (var i = 0; i < unsupported_options.length; i++)
    if(options[ unsupported_options[i] ])
      throw new Error("options." + unsupported_options[i] + " is not supported")

  options.callback = callback
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  options.body    = options.body || null
  options.timeout = options.timeout || request.DEFAULT_TIMEOUT

  if(options.headers.host)
    throw new Error("Options.headers.host is not supported");

  if(options.json) {
    options.headers.accept = options.headers.accept || 'application/json'
    if(options.method !== 'GET')
      options.headers['content-type'] = 'application/json'

    if(typeof options.json !== 'boolean')
      options.body = JSON.stringify(options.json)
    else if(typeof options.body !== 'string')
      options.body = JSON.stringify(options.body)
  }
  
  //BEGIN QS Hack
  var serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  if(options.qs){
    var qs = (typeof options.qs == 'string')? options.qs : serialize(options.qs);
    if(options.uri.indexOf('?') !== -1){ //no get params
        options.uri = options.uri+'&'+qs;
    }else{ //existing get params
        options.uri = options.uri+'?'+qs;
    }
  }
  //END QS Hack
  
  //BEGIN FORM Hack
  var multipart = function(obj) {
    //todo: support file type (useful?)
    var result = {};
    result.boundry = '-------------------------------'+Math.floor(Math.random()*1000000000);
    var lines = [];
    for(var p in obj){
        if (obj.hasOwnProperty(p)) {
            lines.push(
                '--'+result.boundry+"\n"+
                'Content-Disposition: form-data; name="'+p+'"'+"\n"+
                "\n"+
                obj[p]+"\n"
            );
        }
    }
    lines.push( '--'+result.boundry+'--' );
    result.body = lines.join('');
    result.length = result.body.length;
    result.type = 'multipart/form-data; boundary='+result.boundry;
    return result;
  }
  
  if(options.form){
    if(typeof options.form == 'string') throw('form name unsupported');
    if(options.method === 'POST'){
        var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
        options.headers['content-type'] = encoding;
        switch(encoding){
            case 'application/x-www-form-urlencoded':
                options.body = serialize(options.form).replace(/%20/g, "+");
                break;
            case 'multipart/form-data':
                var multi = multipart(options.form);
                //options.headers['content-length'] = multi.length;
                options.body = multi.body;
                options.headers['content-type'] = multi.type;
                break;
            default : throw new Error('unsupported encoding:'+encoding);
        }
    }
  }
  //END FORM Hack

  // If onResponse is boolean true, call back immediately when the response is known,
  // not when the full request is complete.
  options.onResponse = options.onResponse || noop
  if(options.onResponse === true) {
    options.onResponse = callback
    options.callback = noop
  }

  // XXX Browsers do not like this.
  //if(options.body)
  //  options.headers['content-length'] = options.body.length;

  // HTTP basic authentication
  if(!options.headers.authorization && options.auth)
    options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

  return run_xhr(options)
}

var req_seq = 0
function run_xhr(options) {
  var xhr = new XHR
    , timed_out = false
    , is_cors = is_crossDomain(options.uri)
    , supports_cors = ('withCredentials' in xhr)

  req_seq += 1
  xhr.seq_id = req_seq
  xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
  xhr._id = xhr.id // I know I will type "_id" from habit all the time.

  if(is_cors && !supports_cors) {
    var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
    cors_err.cors = 'unsupported'
    return options.callback(cors_err, xhr)
  }

  xhr.timeoutTimer = setTimeout(too_late, options.timeout)
  function too_late() {
    timed_out = true
    var er = new Error('ETIMEDOUT')
    er.code = 'ETIMEDOUT'
    er.duration = options.timeout

    request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
    return options.callback(er, xhr)
  }

  // Some states can be skipped over, so remember what is still incomplete.
  var did = {'response':false, 'loading':false, 'end':false}

  xhr.onreadystatechange = on_state_change
  xhr.open(options.method, options.uri, true) // asynchronous
  if(is_cors)
    xhr.withCredentials = !! options.withCredentials
  xhr.send(options.body)
  return xhr

  function on_state_change(event) {
    if(timed_out)
      return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})

    request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})

    if(xhr.readyState === XHR.OPENED) {
      request.log.debug('Request started', {'id':xhr.id})
      for (var key in options.headers)
        xhr.setRequestHeader(key, options.headers[key])
    }

    else if(xhr.readyState === XHR.HEADERS_RECEIVED)
      on_response()

    else if(xhr.readyState === XHR.LOADING) {
      on_response()
      on_loading()
    }

    else if(xhr.readyState === XHR.DONE) {
      on_response()
      on_loading()
      on_end()
    }
  }

  function on_response() {
    if(did.response)
      return

    did.response = true
    request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
    clearTimeout(xhr.timeoutTimer)
    xhr.statusCode = xhr.status // Node request compatibility

    // Detect failed CORS requests.
    if(is_cors && xhr.statusCode == 0) {
      var cors_err = new Error('CORS request rejected: ' + options.uri)
      cors_err.cors = 'rejected'

      // Do not process this request further.
      did.loading = true
      did.end = true

      return options.callback(cors_err, xhr)
    }

    options.onResponse(null, xhr)
  }

  function on_loading() {
    if(did.loading)
      return

    did.loading = true
    request.log.debug('Response body loading', {'id':xhr.id})
    // TODO: Maybe simulate "data" events by watching xhr.responseText
  }

  function on_end() {
    if(did.end)
      return

    did.end = true
    request.log.debug('Request done', {'id':xhr.id})

    xhr.body = xhr.responseText
    if(options.json) {
      try        { xhr.body = JSON.parse(xhr.responseText) }
      catch (er) { return options.callback(er, xhr)        }
    }

    options.callback(null, xhr, xhr.body)
  }

} // request

request.withCredentials = false;
request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

//
// defaults
//

request.defaults = function(options, requester) {
  var def = function (method) {
    var d = function (params, callback) {
      if(typeof params === 'string')
        params = {'uri': params};
      else {
        params = JSON.parse(JSON.stringify(params));
      }
      for (var i in options) {
        if (params[i] === undefined) params[i] = options[i]
      }
      return method(params, callback)
    }
    return d
  }
  var de = def(request)
  de.get = def(request.get)
  de.post = def(request.post)
  de.put = def(request.put)
  de.head = def(request.head)
  return de
}

//
// HTTP method shortcuts
//

var shortcuts = [ 'get', 'put', 'post', 'head' ];
shortcuts.forEach(function(shortcut) {
  var method = shortcut.toUpperCase();
  var func   = shortcut.toLowerCase();

  request[func] = function(opts) {
    if(typeof opts === 'string')
      opts = {'method':method, 'uri':opts};
    else {
      opts = JSON.parse(JSON.stringify(opts));
      opts.method = method;
    }

    var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
    return request.apply(this, args);
  }
})

//
// CouchDB shortcut
//

request.couch = function(options, callback) {
  if(typeof options === 'string')
    options = {'uri':options}

  // Just use the request API to do JSON.
  options.json = true
  if(options.body)
    options.json = options.body
  delete options.body

  callback = callback || noop

  var xhr = request(options, couch_handler)
  return xhr

  function couch_handler(er, resp, body) {
    if(er)
      return callback(er, resp, body)

    if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
      // The body is a Couch JSON object indicating the error.
      er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
      for (var key in body)
        er[key] = body[key]
      return callback(er, resp, body);
    }

    return callback(er, resp, body);
  }
}

//
// Utility
//

function noop() {}

function getLogger() {
  var logger = {}
    , levels = ['trace', 'debug', 'info', 'warn', 'error']
    , level, i

  for(i = 0; i < levels.length; i++) {
    level = levels[i]

    logger[level] = noop
    if(typeof console !== 'undefined' && console && console[level])
      logger[level] = formatted(console, level)
  }

  return logger
}

function formatted(obj, method) {
  return formatted_logger

  function formatted_logger(str, context) {
    if(typeof context === 'object')
      str += ' ' + JSON.stringify(context)

    return obj[method].call(obj, str)
  }
}

// Return whether a URL is a cross-domain request.
function is_crossDomain(url) {
  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

  // jQuery #8138, IE may throw an exception when accessing
  // a field from window.location if document.domain has been set
  var ajaxLocation
  try { ajaxLocation = location.href }
  catch (e) {
    // Use the href attribute of an A element since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    , parts = rurl.exec(url.toLowerCase() )

  var result = !!(
    parts &&
    (  parts[1] != ajaxLocParts[1]
    || parts[2] != ajaxLocParts[2]
    || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
    )
  )

  //console.debug('is_crossDomain('+url+') -> ' + result)
  return result
}

// MIT License from http://phpjs.org/functions/base64_encode:358
function b64_enc (data) {
    // Encodes string using MIME base64 algorithm
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

    if (!data) {
        return data;
    }

    // assume utf8 data
    // data = this.utf8_encode(data+'');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}
module.exports = request;

},{}],5:[function(require,module,exports){
(function() {

  var cookiejs = {
    /// Serialize the a name value pair into a cookie string suitable for
    /// http headers. An optional options object specified cookie parameters
    ///
    /// serialize('foo', 'bar', { httpOnly: true })
    ///   => "foo=bar; httpOnly"
    ///
    /// @param {String} name
    /// @param {String} val
    /// @param {Object} options
    /// @return {String}
    serialize: function(name, val, opt){
      opt = opt || {};
      var enc = opt.encode || encode;
      var pairs = [name + '=' + enc(val)];

      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
        pairs.push('Max-Age=' + maxAge);
      }

      if (opt.domain) pairs.push('Domain=' + opt.domain);
      if (opt.path) pairs.push('Path=' + opt.path);
      if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
      if (opt.httpOnly) pairs.push('HttpOnly');
      if (opt.secure) pairs.push('Secure');

      return pairs.join('; ');
    },

    /// Parse the given cookie header string into an object
    /// The object has the various cookies as keys(names) => values
    /// @param {String} str
    /// @return {Object}
    parse: function(str, opt) {
      opt = opt || {};
      var obj = {}
      var pairs = str.split(/; */);
      var dec = opt.decode || decode;

      pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx < 0) {
          return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' == val[0]) {
          val = val.slice(1, -1);
        }

        // only assign once
        if (undefined == obj[key]) {
          try {
            obj[key] = dec(val);
          } catch (e) {
            obj[key] = val;
          }
        }
      });

      return obj;
    }
  };

  var encode = encodeURIComponent;
  var decode = decodeURIComponent;

  // export in node environments for testing purposes.
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = cookiejs;
  } else {
    if ( typeof define === "function" && define.amd ) {
      // Support for requirejs
      define(function() {
        return cookiejs;
      });
    } else {
      // Support for include on individual pages.
      window.cookiejs = cookiejs;
    }
  }

}());

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],7:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],9:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],12:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":10,"./encode":11}],13:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":9,"querystring":12}],14:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],15:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":14,"_process":8,"inherits":7}],16:[function(require,module,exports){
// Browser bundle of nunjucks 1.0.7 

(function() {
var modules = {};
(function() {

// A simple class system, more documentation to come

function extend(cls, name, props) {
    // This does that same thing as Object.create, but with support for IE8
    var F = function() {};
    F.prototype = cls.prototype;
    var prototype = new F();

    var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;
    props = props || {};

    for(var k in props) {
        var src = props[k];
        var parent = prototype[k];

        if(typeof parent == "function" &&
           typeof src == "function" &&
           fnTest.test(src)) {
            prototype[k] = (function (src, parent) {
                return function() {
                    // Save the current parent method
                    var tmp = this.parent;

                    // Set parent to the previous method, call, and restore
                    this.parent = parent;
                    var res = src.apply(this, arguments);
                    this.parent = tmp;

                    return res;
                };
            })(src, parent);
        }
        else {
            prototype[k] = src;
        }
    }

    prototype.typename = name;

    var new_cls = function() {
        if(prototype.init) {
            prototype.init.apply(this, arguments);
        }
    };

    new_cls.prototype = prototype;
    new_cls.prototype.constructor = new_cls;

    new_cls.extend = function(name, props) {
        if(typeof name == "object") {
            props = name;
            name = "anonymous";
        }
        return extend(new_cls, name, props);
    };

    return new_cls;
}

modules['object'] = extend(Object, "Object", {});
})();
(function() {
var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;

var escapeMap = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    "<": '&lt;',
    ">": '&gt;'
};

var escapeRegex = /[&"'<>]/g;

var lookupEscape = function(ch) {
    return escapeMap[ch];
};

var exports = modules['lib'] = {};

exports.withPrettyErrors = function(path, withInternals, func) {
    try {
        return func();
    } catch (e) {
        if (!e.Update) {
            // not one of ours, cast it
            e = new exports.TemplateError(e);
        }
        e.Update(path);

        // Unless they marked the dev flag, show them a trace from here
        if (!withInternals) {
            var old = e;
            e = new Error(old.message);
            e.name = old.name;
        }

        throw e;
    }
};

exports.TemplateError = function(message, lineno, colno) {
    var err = this;

    if (message instanceof Error) { // for casting regular js errors
        err = message;
        message = message.name + ": " + message.message;
    } else {
        if(Error.captureStackTrace) {
            Error.captureStackTrace(err);
        }
    }

    err.name = 'Template render error';
    err.message = message;
    err.lineno = lineno;
    err.colno = colno;
    err.firstUpdate = true;

    err.Update = function(path) {
        var message = "(" + (path || "unknown path") + ")";

        // only show lineno + colno next to path of template
        // where error occurred
        if (this.firstUpdate) {
            if(this.lineno && this.colno) {
                message += ' [Line ' + this.lineno + ', Column ' + this.colno + ']';
            }
            else if(this.lineno) {
                message += ' [Line ' + this.lineno + ']';
            }
        }

        message += '\n ';
        if (this.firstUpdate) {
            message += ' ';
        }

        this.message = message + (this.message || '');
        this.firstUpdate = false;
        return this;
    };

    return err;
};

exports.TemplateError.prototype = Error.prototype;

exports.escape = function(val) {
  return val.replace(escapeRegex, lookupEscape);
};

exports.isFunction = function(obj) {
    return ObjProto.toString.call(obj) == '[object Function]';
};

exports.isArray = Array.isArray || function(obj) {
    return ObjProto.toString.call(obj) == '[object Array]';
};

exports.isString = function(obj) {
    return ObjProto.toString.call(obj) == '[object String]';
};

exports.isObject = function(obj) {
    return ObjProto.toString.call(obj) == '[object Object]';
};

exports.groupBy = function(obj, val) {
    var result = {};
    var iterator = exports.isFunction(val) ? val : function(obj) { return obj[val]; };
    for(var i=0; i<obj.length; i++) {
        var value = obj[i];
        var key = iterator(value, i);
        (result[key] || (result[key] = [])).push(value);
    }
    return result;
};

exports.toArray = function(obj) {
    return Array.prototype.slice.call(obj);
};

exports.without = function(array) {
    var result = [];
    if (!array) {
        return result;
    }
    var index = -1,
    length = array.length,
    contains = exports.toArray(arguments).slice(1);

    while(++index < length) {
        if(contains.indexOf(array[index]) === -1) {
            result.push(array[index]);
        }
    }
    return result;
};

exports.extend = function(obj, obj2) {
    for(var k in obj2) {
        obj[k] = obj2[k];
    }
    return obj;
};

exports.repeat = function(char_, n) {
    var str = '';
    for(var i=0; i<n; i++) {
        str += char_;
    }
    return str;
};

exports.each = function(obj, func, context) {
    if(obj == null) {
        return;
    }

    if(ArrayProto.each && obj.each == ArrayProto.each) {
        obj.forEach(func, context);
    }
    else if(obj.length === +obj.length) {
        for(var i=0, l=obj.length; i<l; i++) {
            func.call(context, obj[i], i, obj);
        }
    }
};

exports.map = function(obj, func) {
    var results = [];
    if(obj == null) {
        return results;
    }

    if(ArrayProto.map && obj.map === ArrayProto.map) {
        return obj.map(func);
    }

    for(var i=0; i<obj.length; i++) {
        results[results.length] = func(obj[i], i);
    }

    if(obj.length === +obj.length) {
        results.length = obj.length;
    }

    return results;
};

exports.asyncIter = function(arr, iter, cb) {
    var i = -1;

    function next() {
        i++;

        if(i < arr.length) {
            iter(arr[i], i, next, cb);
        }
        else {
            cb();
        }
    }

    next();
};

exports.asyncFor = function(obj, iter, cb) {
    var keys = exports.keys(obj);
    var len = keys.length;
    var i = -1;

    function next() {
        i++;
        var k = keys[i];

        if(i < len) {
            iter(k, obj[k], i, len, next);
        }
        else {
            cb();
        }
    }

    next();
};

if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(array, searchElement /*, fromIndex */) {
        if (array == null) {
            throw new TypeError();
        }
        var t = Object(array);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 2) {
            n = Number(arguments[2]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

if(!Array.prototype.map) {
    Array.prototype.map = function() {
        throw new Error("map is unimplemented for this js engine");
    };
}

exports.keys = function(obj) {
    if(Object.prototype.keys) {
        return obj.keys();
    }
    else {
        var keys = [];
        for(var k in obj) {
            if(obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    }
}
})();
(function() {
var util = modules["util"];
var lib = modules["lib"];
var Object = modules["object"];

function traverseAndCheck(obj, type, results) {
    if(obj instanceof type) {
        results.push(obj);
    }

    if(obj instanceof Node) {
        obj.findAll(type, results);
    }
}

var Node = Object.extend("Node", {
    init: function(lineno, colno) {
        this.lineno = lineno;
        this.colno = colno;

        var fields = this.fields;
        for(var i=0, l=fields.length; i<l; i++) {
            var field = fields[i];

            // The first two args are line/col numbers, so offset by 2
            var val = arguments[i + 2];

            // Fields should never be undefined, but null. It makes
            // testing easier to normalize values.
            if(val === undefined) {
                val = null;
            }

            this[field] = val;
        }
    },

    findAll: function(type, results) {
        results = results || [];

        if(this instanceof NodeList) {
            var children = this.children;

            for(var i=0, l=children.length; i<l; i++) {
                traverseAndCheck(children[i], type, results);
            }
        }
        else {
            var fields = this.fields;

            for(var i=0, l=fields.length; i<l; i++) {
                traverseAndCheck(this[fields[i]], type, results);
            }
        }

        return results;
    },

    iterFields: function(func) {
        lib.each(this.fields, function(field) {
            func(this[field], field);
        }, this);
    }
});

// Abstract nodes
var Value = Node.extend("Value", { fields: ['value'] });

// Concrete nodes
var NodeList = Node.extend("NodeList", {
    fields: ['children'],

    init: function(lineno, colno, nodes) {
        this.parent(lineno, colno, nodes || []);
    },

    addChild: function(node) {
        this.children.push(node);
    }
});

var Root = NodeList.extend("Root");
var Literal = Value.extend("Literal");
var Symbol = Value.extend("Symbol");
var Group = NodeList.extend("Group");
var Array = NodeList.extend("Array");
var Pair = Node.extend("Pair", { fields: ['key', 'value'] });
var Dict = NodeList.extend("Dict");
var LookupVal = Node.extend("LookupVal", { fields: ['target', 'val'] });
var If = Node.extend("If", { fields: ['cond', 'body', 'else_'] });
var IfAsync = If.extend("IfAsync");
var InlineIf = Node.extend("InlineIf", { fields: ['cond', 'body', 'else_'] });
var For = Node.extend("For", { fields: ['arr', 'name', 'body'] });
var AsyncEach = For.extend("AsyncEach");
var AsyncAll = For.extend("AsyncAll");
var Macro = Node.extend("Macro", { fields: ['name', 'args', 'body'] });
var Import = Node.extend("Import", { fields: ['template', 'target'] });
var FromImport = Node.extend("FromImport", {
    fields: ['template', 'names'],

    init: function(lineno, colno, template, names) {
        this.parent(lineno, colno,
                    template,
                    names || new NodeList());
    }
});
var FunCall = Node.extend("FunCall", { fields: ['name', 'args'] });
var Filter = FunCall.extend("Filter");
var FilterAsync = Filter.extend("FilterAsync", {
    fields: ['name', 'args', 'symbol']
});
var KeywordArgs = Dict.extend("KeywordArgs");
var Block = Node.extend("Block", { fields: ['name', 'body'] });
var Super = Node.extend("Super", { fields: ['blockName', 'symbol'] });
var TemplateRef = Node.extend("TemplateRef", { fields: ['template'] });
var Extends = TemplateRef.extend("Extends");
var Include = TemplateRef.extend("Include");
var Set = Node.extend("Set", { fields: ['targets', 'value'] });
var Output = NodeList.extend("Output");
var TemplateData = Literal.extend("TemplateData");
var UnaryOp = Node.extend("UnaryOp", { fields: ['target'] });
var BinOp = Node.extend("BinOp", { fields: ['left', 'right'] });
var Or = BinOp.extend("Or");
var And = BinOp.extend("And");
var Not = UnaryOp.extend("Not");
var Add = BinOp.extend("Add");
var Sub = BinOp.extend("Sub");
var Mul = BinOp.extend("Mul");
var Div = BinOp.extend("Div");
var FloorDiv = BinOp.extend("FloorDiv");
var Mod = BinOp.extend("Mod");
var Pow = BinOp.extend("Pow");
var Neg = UnaryOp.extend("Neg");
var Pos = UnaryOp.extend("Pos");
var Compare = Node.extend("Compare", { fields: ['expr', 'ops'] });
var CompareOperand = Node.extend("CompareOperand", {
    fields: ['expr', 'type']
});

var CustomTag = Node.extend("CustomTag", {
    init: function(lineno, colno, name) {
        this.lineno = lineno;
        this.colno = colno;
        this.name = name;
    }
});

var CallExtension = Node.extend("CallExtension", {
    fields: ['extName', 'prop', 'args', 'contentArgs'],

    init: function(ext, prop, args, contentArgs) {
        this.extName = ext._name || ext;
        this.prop = prop;
        this.args = args || new NodeList();
        this.contentArgs = contentArgs || [];
        this.autoescape = ext.autoescape;
    }
});

var CallExtensionAsync = CallExtension.extend("CallExtensionAsync");

// Print the AST in a nicely formatted tree format for debuggin
function printNodes(node, indent) {
    indent = indent || 0;

    // This is hacky, but this is just a debugging function anyway
    function print(str, indent, inline) {
        var lines = str.split("\n");

        for(var i=0; i<lines.length; i++) {
            if(lines[i]) {
                if((inline && i > 0) || !inline) {
                    for(var j=0; j<indent; j++) {
                        util.print(" ");
                    }
                }
            }

            if(i === lines.length-1) {
                util.print(lines[i]);
            }
            else {
                util.puts(lines[i]);
            }
        }
    }

    print(node.typename + ": ", indent);

    if(node instanceof NodeList) {
        print('\n');
        lib.each(node.children, function(n) {
            printNodes(n, indent + 2);
        });
    }
    else if(node instanceof CallExtension) {
        print(node.extName + '.' + node.prop);
        print('\n');

        if(node.args) {
            printNodes(node.args, indent + 2);
        }

        if(node.contentArgs) {
            lib.each(node.contentArgs, function(n) {
                printNodes(n, indent + 2);
            });
        }
    }
    else {
        var nodes = null;
        var props = null;

        node.iterFields(function(val, field) {
            if(val instanceof Node) {
                nodes = nodes || {};
                nodes[field] = val;
            }
            else {
                props = props || {};
                props[field] = val;
            }
        });

        if(props) {
            print(util.inspect(props, true, null) + '\n', null, true);
        }
        else {
            print('\n');
        }

        if(nodes) {
            for(var k in nodes) {
                printNodes(nodes[k], indent + 2);
            }
        }

    }
}

// var t = new NodeList(0, 0,
//                      [new Value(0, 0, 3),
//                       new Value(0, 0, 10),
//                       new Pair(0, 0,
//                                new Value(0, 0, 'key'),
//                                new Value(0, 0, 'value'))]);
// printNodes(t);

modules['nodes'] = {
    Node: Node,
    Root: Root,
    NodeList: NodeList,
    Value: Value,
    Literal: Literal,
    Symbol: Symbol,
    Group: Group,
    Array: Array,
    Pair: Pair,
    Dict: Dict,
    Output: Output,
    TemplateData: TemplateData,
    If: If,
    IfAsync: IfAsync,
    InlineIf: InlineIf,
    For: For,
    AsyncEach: AsyncEach,
    AsyncAll: AsyncAll,
    Macro: Macro,
    Import: Import,
    FromImport: FromImport,
    FunCall: FunCall,
    Filter: Filter,
    FilterAsync: FilterAsync,
    KeywordArgs: KeywordArgs,
    Block: Block,
    Super: Super,
    Extends: Extends,
    Include: Include,
    Set: Set,
    LookupVal: LookupVal,
    BinOp: BinOp,
    Or: Or,
    And: And,
    Not: Not,
    Add: Add,
    Sub: Sub,
    Mul: Mul,
    Div: Div,
    FloorDiv: FloorDiv,
    Mod: Mod,
    Pow: Pow,
    Neg: Neg,
    Pos: Pos,
    Compare: Compare,
    CompareOperand: CompareOperand,

    CallExtension: CallExtension,
    CallExtensionAsync: CallExtensionAsync,

    printNodes: printNodes
};
})();
(function() {
var lib = modules["lib"];
var Obj = modules["object"];

// Frames keep track of scoping both at compile-time and run-time so
// we know how to access variables. Block tags can introduce special
// variables, for example.
var Frame = Obj.extend({
    init: function(parent) {
        this.variables = {};
        this.parent = parent;
    },

    set: function(name, val, resolveUp) {
        // Allow variables with dots by automatically creating the
        // nested structure
        var parts = name.split('.');
        var obj = this.variables;
        var frame = this;
        
        if(resolveUp) {
            if((frame = this.resolve(parts[0]))) {
                frame.set(name, val);
                return;
            }
            frame = this;
        }

        for(var i=0; i<parts.length - 1; i++) {
            var id = parts[i];

            if(!obj[id]) {
                obj[id] = {};
            }
            obj = obj[id];
        }

        obj[parts[parts.length - 1]] = val;
    },

    get: function(name) {
        var val = this.variables[name];
        if(val !== undefined && val !== null) {
            return val;
        }
        return null;
    },

    lookup: function(name) {
        var p = this.parent;
        var val = this.variables[name];
        if(val !== undefined && val !== null) {
            return val;
        }
        return p && p.lookup(name);
    },

    resolve: function(name) {
        var p = this.parent;
        var val = this.variables[name];
        if(val != null) {
            return this;
        }
        return p && p.resolve(name);
    },

    push: function() {
        return new Frame(this);
    },

    pop: function() {
        return this.parent;
    }
});

function makeMacro(argNames, kwargNames, func) {
    return function() {
        var argCount = numArgs(arguments);
        var args;
        var kwargs = getKeywordArgs(arguments);

        if(argCount > argNames.length) {
            args = Array.prototype.slice.call(arguments, 0, argNames.length);

            // Positional arguments that should be passed in as
            // keyword arguments (essentially default values)
            var vals = Array.prototype.slice.call(arguments, args.length, argCount);
            for(var i=0; i<vals.length; i++) {
                if(i < kwargNames.length) {
                    kwargs[kwargNames[i]] = vals[i];
                }
            }

            args.push(kwargs);
        }
        else if(argCount < argNames.length) {
            args = Array.prototype.slice.call(arguments, 0, argCount);

            for(var i=argCount; i<argNames.length; i++) {
                var arg = argNames[i];

                // Keyword arguments that should be passed as
                // positional arguments, i.e. the caller explicitly
                // used the name of a positional arg
                args.push(kwargs[arg]);
                delete kwargs[arg];
            }

            args.push(kwargs);
        }
        else {
            args = arguments;
        }

        return func.apply(this, args);
    };
}

function makeKeywordArgs(obj) {
    obj.__keywords = true;
    return obj;
}

function getKeywordArgs(args) {
    var len = args.length;
    if(len) {
        var lastArg = args[len - 1];
        if(lastArg && lastArg.hasOwnProperty('__keywords')) {
            return lastArg;
        }
    }
    return {};
}

function numArgs(args) {
    var len = args.length;
    if(len === 0) {
        return 0;
    }

    var lastArg = args[len - 1];
    if(lastArg && lastArg.hasOwnProperty('__keywords')) {
        return len - 1;
    }
    else {
        return len;
    }
}

// A SafeString object indicates that the string should not be
// autoescaped. This happens magically because autoescaping only
// occurs on primitive string objects.
function SafeString(val) {
    if(typeof val != 'string') {
        return val;
    }

    this.val = val;
}

SafeString.prototype = Object.create(String.prototype);
SafeString.prototype.valueOf = function() {
    return this.val;
};
SafeString.prototype.toString = function() {
    return this.val;
};

function copySafeness(dest, target) {
    if(dest instanceof SafeString) {
        return new SafeString(target);
    }
    return target.toString();
}

function markSafe(val) {
    var type = typeof val;

    if(type === 'string') {
        return new SafeString(val);
    }
    else if(type !== 'function') {
        return val;
    }
    else {
        return function() {
            var ret = val.apply(this, arguments);

            if(typeof ret === 'string') {
                return new SafeString(ret);
            }

            return ret;
        };
    }
}

function suppressValue(val, autoescape) {
    val = (val !== undefined && val !== null) ? val : "";

    if(autoescape && typeof val === "string") {
        val = lib.escape(val);
    }

    return val;
}

function memberLookup(obj, val) {
    obj = obj || {};

    if(typeof obj[val] === 'function') {
        return function() {
            return obj[val].apply(obj, arguments);
        };
    }

    return obj[val];
}

function callWrap(obj, name, args) {
    if(!obj) {
        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
    }
    else if(typeof obj !== 'function') {
        throw new Error('Unable to call `' + name + '`, which is not a function');
    }

    return obj.apply(this, args);
}

function contextOrFrameLookup(context, frame, name) {
    var val = frame.lookup(name);
    return (val !== undefined && val !== null) ?
        val :
        context.lookup(name);
}

function handleError(error, lineno, colno) {
    if(error.lineno) {
        return error;
    }
    else {
        return new lib.TemplateError(error, lineno, colno);
    }
}

function asyncEach(arr, dimen, iter, cb) {
    if(lib.isArray(arr)) {
        var len = arr.length;

        lib.asyncIter(arr, function(item, i, next) {
            switch(dimen) {
            case 1: iter(item, i, len, next); break;
            case 2: iter(item[0], item[1], i, len, next); break;
            case 3: iter(item[0], item[1], item[2], i, len, next); break;
            default:
                item.push(i, next);
                iter.apply(this, item);
            }
        }, cb);
    }
    else {
        lib.asyncFor(arr, function(key, val, i, len, next) {
            iter(key, val, i, len, next);
        }, cb);
    }
}

function asyncAll(arr, dimen, func, cb) {
    var finished = 0;
    var len;
    var outputArr;

    function done(i, output) {
        finished++;
        outputArr[i] = output;

        if(finished == len) {
            cb(null, outputArr.join(''));
        }
    }

    if(lib.isArray(arr)) {
        len = arr.length;
        outputArr = new Array(len);

        if(len == 0) {
            cb(null, '');
        }
        else {
            for(var i=0; i<arr.length; i++) {
                var item = arr[i];

                switch(dimen) {
                case 1: func(item, i, len, done); break;
                case 2: func(item[0], item[1], i, len, done); break;
                case 3: func(item[0], item[1], item[2], i, len, done); break;
                default:
                    item.push(i, done);
                    func.apply(this, item);
                }
            }
        }
    }
    else {
        var keys = lib.keys(arr);
        len = keys.length;
        outputArr = new Array(len);

        if(len == 0) {
            cb(null, '');
        }
        else {
            for(var i=0; i<keys.length; i++) {
                var k = keys[i];
                func(k, arr[k], i, len, done);
            }
        }
    }
}

modules['runtime'] = {
    Frame: Frame,
    makeMacro: makeMacro,
    makeKeywordArgs: makeKeywordArgs,
    numArgs: numArgs,
    suppressValue: suppressValue,
    memberLookup: memberLookup,
    contextOrFrameLookup: contextOrFrameLookup,
    callWrap: callWrap,
    handleError: handleError,
    isArray: lib.isArray,
    keys: lib.keys,
    SafeString: SafeString,
    copySafeness: copySafeness,
    markSafe: markSafe,
    asyncEach: asyncEach,
    asyncAll: asyncAll
};
})();
(function() {
var lib = modules["lib"];

var whitespaceChars = " \n\t\r";
var delimChars = "()[]{}%*-+/#,:|.<>=!";
var intChars = "0123456789";

var BLOCK_START = "{%";
var BLOCK_END = "%}";
var VARIABLE_START = "{{";
var VARIABLE_END = "}}";
var COMMENT_START = "{#";
var COMMENT_END = "#}";

var TOKEN_STRING = "string";
var TOKEN_WHITESPACE = "whitespace";
var TOKEN_DATA = "data";
var TOKEN_BLOCK_START = "block-start";
var TOKEN_BLOCK_END = "block-end";
var TOKEN_VARIABLE_START = "variable-start";
var TOKEN_VARIABLE_END = "variable-end";
var TOKEN_COMMENT = "comment";
var TOKEN_LEFT_PAREN = "left-paren";
var TOKEN_RIGHT_PAREN = "right-paren";
var TOKEN_LEFT_BRACKET = "left-bracket";
var TOKEN_RIGHT_BRACKET = "right-bracket";
var TOKEN_LEFT_CURLY = "left-curly";
var TOKEN_RIGHT_CURLY = "right-curly";
var TOKEN_OPERATOR = "operator";
var TOKEN_COMMA = "comma";
var TOKEN_COLON = "colon";
var TOKEN_PIPE = "pipe";
var TOKEN_INT = "int";
var TOKEN_FLOAT = "float";
var TOKEN_BOOLEAN = "boolean";
var TOKEN_SYMBOL = "symbol";
var TOKEN_SPECIAL = "special";

function token(type, value, lineno, colno) {
    return {
        type: type,
        value: value,
        lineno: lineno,
        colno: colno
    };
}

function Tokenizer(str) {
    this.str = str;
    this.index = 0;
    this.len = str.length;
    this.lineno = 0;
    this.colno = 0;

    this.in_code = false;
}

Tokenizer.prototype.nextToken = function() {
    var lineno = this.lineno;
    var colno = this.colno;

    if(this.in_code) {
        // Otherwise, if we are in a block parse it as code
        var cur = this.current();
        var tok;

        if(this.is_finished()) {
            // We have nothing else to parse
            return null;
        }
        else if(cur == "\"" || cur == "'") {
            // We've hit a string
            return token(TOKEN_STRING, this.parseString(cur), lineno, colno);
        }
        else if((tok = this._extract(whitespaceChars))) {
            // We hit some whitespace
            return token(TOKEN_WHITESPACE, tok, lineno, colno);
        }
        else if((tok = this._extractString(BLOCK_END)) ||
                (tok = this._extractString('-' + BLOCK_END))) {
            // Special check for the block end tag
            //
            // It is a requirement that start and end tags are composed of
            // delimiter characters (%{}[] etc), and our code always
            // breaks on delimiters so we can assume the token parsing
            // doesn't consume these elsewhere
            this.in_code = false;
            return token(TOKEN_BLOCK_END, tok, lineno, colno);
        }
        else if((tok = this._extractString(VARIABLE_END))) {
            // Special check for variable end tag (see above)
            this.in_code = false;
            return token(TOKEN_VARIABLE_END, tok, lineno, colno);
        }
        else if(delimChars.indexOf(cur) != -1) {
            // We've hit a delimiter (a special char like a bracket)
            this.forward();
            var complexOps = ['==', '!=', '<=', '>=', '//', '**'];
            var curComplex = cur + this.current();
            var type;

            if(complexOps.indexOf(curComplex) !== -1) {
                this.forward();
                cur = curComplex;
            }

            switch(cur) {
            case "(": type = TOKEN_LEFT_PAREN; break;
            case ")": type = TOKEN_RIGHT_PAREN; break;
            case "[": type = TOKEN_LEFT_BRACKET; break;
            case "]": type = TOKEN_RIGHT_BRACKET; break;
            case "{": type = TOKEN_LEFT_CURLY; break;
            case "}": type = TOKEN_RIGHT_CURLY; break;
            case ",": type = TOKEN_COMMA; break;
            case ":": type = TOKEN_COLON; break;
            case "|": type = TOKEN_PIPE; break;
            default: type = TOKEN_OPERATOR;
            }

            return token(type, cur, lineno, colno);
        }
        else {
            // We are not at whitespace or a delimiter, so extract the
            // text and parse it
            tok = this._extractUntil(whitespaceChars + delimChars);

            if(tok.match(/^[-+]?[0-9]+$/)) {
                if(this.current() == '.') {
                    this.forward();
                    var dec = this._extract(intChars);
                    return token(TOKEN_FLOAT, tok + '.' + dec, lineno, colno);
                }
                else {
                    return token(TOKEN_INT, tok, lineno, colno);
                }
            }
            else if(tok.match(/^(true|false)$/)) {
                return token(TOKEN_BOOLEAN, tok, lineno, colno);
            }
            else if(tok) {
                return token(TOKEN_SYMBOL, tok, lineno, colno);
            }
            else {
                throw new Error("Unexpected value while parsing: " + tok);
            }
        }
    }
    else {
        // Parse out the template text, breaking on tag
        // delimiters because we need to look for block/variable start
        // tags (don't use the full delimChars for optimization)
        var beginChars = (BLOCK_START.charAt(0) +
                          VARIABLE_START.charAt(0) +
                          COMMENT_START.charAt(0) +
                          COMMENT_END.charAt(0));
        var tok;

        if(this.is_finished()) {
            return null;
        }
        else if((tok = this._extractString(BLOCK_START + '-')) ||
                (tok = this._extractString(BLOCK_START))) {
            this.in_code = true;
            return token(TOKEN_BLOCK_START, tok, lineno, colno);
        }
        else if((tok = this._extractString(VARIABLE_START))) {
            this.in_code = true;
            return token(TOKEN_VARIABLE_START, tok, lineno, colno);
        }
        else {
            tok = '';
            var data;
            var in_comment = false;

            if(this._matches(COMMENT_START)) {
                in_comment = true;
                tok = this._extractString(COMMENT_START);
            }

            // Continually consume text, breaking on the tag delimiter
            // characters and checking to see if it's a start tag.
            //
            // We could hit the end of the template in the middle of
            // our looping, so check for the null return value from
            // _extractUntil
            while((data = this._extractUntil(beginChars)) !== null) {
                tok += data;

                if((this._matches(BLOCK_START) ||
                    this._matches(VARIABLE_START) ||
                    this._matches(COMMENT_START)) &&
                  !in_comment) {
                    // If it is a start tag, stop looping
                    break;
                }
                else if(this._matches(COMMENT_END)) {
                    if(!in_comment) {
                        throw new Error("unexpected end of comment");
                    }
                    tok += this._extractString(COMMENT_END);
                    break;
                }
                else {
                    // It does not match any tag, so add the character and
                    // carry on
                    tok += this.current();
                    this.forward();
                }
            }

            if(data === null && in_comment) {
                throw new Error("expected end of comment, got end of file");
            }

            return token(in_comment ? TOKEN_COMMENT : TOKEN_DATA,
                         tok,
                         lineno,
                         colno);
        }
    }

    throw new Error("Could not parse text");
};

Tokenizer.prototype.parseString = function(delimiter) {
    this.forward();

    var lineno = this.lineno;
    var colno = this.colno;
    var str = "";

    while(!this.is_finished() && this.current() != delimiter) {
        var cur = this.current();

        if(cur == "\\") {
            this.forward();
            switch(this.current()) {
            case "n": str += "\n"; break;
            case "t": str += "\t"; break;
            case "r": str += "\r"; break;
            default:
                str += this.current();
            }
            this.forward();
        }
        else {
            str += cur;
            this.forward();
        }
    }

    this.forward();
    return str;
};

Tokenizer.prototype._matches = function(str) {
    if(this.index + str.length > this.length) {
        return null;
    }

    var m = this.str.slice(this.index, this.index + str.length);
    return m == str;
};

Tokenizer.prototype._extractString = function(str) {
    if(this._matches(str)) {
        this.index += str.length;
        return str;
    }
    return null;
};

Tokenizer.prototype._extractUntil = function(charString) {
    // Extract all non-matching chars, with the default matching set
    // to everything
    return this._extractMatching(true, charString || "");
};

Tokenizer.prototype._extract = function(charString) {
    // Extract all matching chars (no default, so charString must be
    // explicit)
    return this._extractMatching(false, charString);
};

Tokenizer.prototype._extractMatching = function (breakOnMatch, charString) {
    // Pull out characters until a breaking char is hit.
    // If breakOnMatch is false, a non-matching char stops it.
    // If breakOnMatch is true, a matching char stops it.

    if(this.is_finished()) {
        return null;
    }

    var first = charString.indexOf(this.current());

    // Only proceed if the first character doesn't meet our condition
    if((breakOnMatch && first == -1) ||
       (!breakOnMatch && first != -1)) {
        var t = this.current();
        this.forward();

        // And pull out all the chars one at a time until we hit a
        // breaking char
        var idx = charString.indexOf(this.current());

        while(((breakOnMatch && idx == -1) ||
               (!breakOnMatch && idx != -1)) && !this.is_finished()) {
            t += this.current();
            this.forward();

            idx = charString.indexOf(this.current());
        }

        return t;
    }

    return "";
};

Tokenizer.prototype.is_finished = function() {
    return this.index >= this.len;
};

Tokenizer.prototype.forwardN = function(n) {
    for(var i=0; i<n; i++) {
        this.forward();
    }
};

Tokenizer.prototype.forward = function() {
    this.index++;

    if(this.previous() == "\n") {
        this.lineno++;
        this.colno = 0;
    }
    else {
        this.colno++;
    }
};

Tokenizer.prototype.back = function() {
    this.index--;

    if(this.current() == "\n") {
        this.lineno--;

        var idx = this.src.lastIndexOf("\n", this.index-1);
        if(idx == -1) {
            this.colno = this.index;
        }
        else {
            this.colno = this.index - idx;
        }
    }
    else {
        this.colno--;
    }
};

Tokenizer.prototype.current = function() {
    if(!this.is_finished()) {
        return this.str.charAt(this.index);
    }
    return "";
};

Tokenizer.prototype.previous = function() {
    return this.str.charAt(this.index-1);
};

modules['lexer'] = {
    lex: function(src) {
        return new Tokenizer(src);
    },

    setTags: function(tags) {
        BLOCK_START = tags.blockStart || BLOCK_START;
        BLOCK_END = tags.blockEnd || BLOCK_END;
        VARIABLE_START = tags.variableStart || VARIABLE_START;
        VARIABLE_END = tags.variableEnd || VARIABLE_END;
        COMMENT_START = tags.commentStart || COMMENT_START;
        COMMENT_END = tags.commentEnd || COMMENT_END;
    },

    TOKEN_STRING: TOKEN_STRING,
    TOKEN_WHITESPACE: TOKEN_WHITESPACE,
    TOKEN_DATA: TOKEN_DATA,
    TOKEN_BLOCK_START: TOKEN_BLOCK_START,
    TOKEN_BLOCK_END: TOKEN_BLOCK_END,
    TOKEN_VARIABLE_START: TOKEN_VARIABLE_START,
    TOKEN_VARIABLE_END: TOKEN_VARIABLE_END,
    TOKEN_COMMENT: TOKEN_COMMENT,
    TOKEN_LEFT_PAREN: TOKEN_LEFT_PAREN,
    TOKEN_RIGHT_PAREN: TOKEN_RIGHT_PAREN,
    TOKEN_LEFT_BRACKET: TOKEN_LEFT_BRACKET,
    TOKEN_RIGHT_BRACKET: TOKEN_RIGHT_BRACKET,
    TOKEN_LEFT_CURLY: TOKEN_LEFT_CURLY,
    TOKEN_RIGHT_CURLY: TOKEN_RIGHT_CURLY,
    TOKEN_OPERATOR: TOKEN_OPERATOR,
    TOKEN_COMMA: TOKEN_COMMA,
    TOKEN_COLON: TOKEN_COLON,
    TOKEN_PIPE: TOKEN_PIPE,
    TOKEN_INT: TOKEN_INT,
    TOKEN_FLOAT: TOKEN_FLOAT,
    TOKEN_BOOLEAN: TOKEN_BOOLEAN,
    TOKEN_SYMBOL: TOKEN_SYMBOL,
    TOKEN_SPECIAL: TOKEN_SPECIAL
};
})();
(function() {
var lexer = modules["lexer"];
var nodes = modules["nodes"];
var Object = modules["object"];
var lib = modules["lib"];

var Parser = Object.extend({
    init: function (tokens) {
        this.tokens = tokens;
        this.peeked = null;
        this.breakOnBlocks = null;
        this.dropLeadingWhitespace = false;

        this.extensions = [];
    },

    nextToken: function (withWhitespace) {
        var tok;

        if(this.peeked) {
            if(!withWhitespace && this.peeked.type == lexer.TOKEN_WHITESPACE) {
                this.peeked = null;
            }
            else {
                tok = this.peeked;
                this.peeked = null;
                return tok;
            }
        }

        tok = this.tokens.nextToken();

        if(!withWhitespace) {
            while(tok && tok.type == lexer.TOKEN_WHITESPACE) {
                tok = this.tokens.nextToken();
            }
        }

        return tok;
    },

    peekToken: function () {
        this.peeked = this.peeked || this.nextToken();
        return this.peeked;
    },

    pushToken: function(tok) {
        if(this.peeked) {
            throw new Error("pushToken: can only push one token on between reads");
        }
        this.peeked = tok;
    },

    fail: function (msg, lineno, colno) {
        if((lineno === undefined || colno === undefined) && this.peekToken()) {
            var tok = this.peekToken();
            lineno = tok.lineno;
            colno = tok.colno;
        }
        if (lineno !== undefined) lineno += 1;
        if (colno !== undefined) colno += 1;

        throw new lib.TemplateError(msg, lineno, colno);
    },

    skip: function(type) {
        var tok = this.nextToken();
        if(!tok || tok.type != type) {
            this.pushToken(tok);
            return false;
        }
        return true;
    },

    expect: function(type) {
        var tok = this.nextToken();
        if(tok.type !== type) {
            this.fail('expected ' + type + ', got ' + tok.type,
                      tok.lineno,
                      tok.colno);
        }
        return tok;
    },

    skipValue: function(type, val) {
        var tok = this.nextToken();
        if(!tok || tok.type != type || tok.value != val) {
            this.pushToken(tok);
            return false;
        }
        return true;
    },

    skipWhitespace: function () {
        return this.skip(lexer.TOKEN_WHITESPACE);
    },

    skipSymbol: function(val) {
        return this.skipValue(lexer.TOKEN_SYMBOL, val);
    },

    advanceAfterBlockEnd: function(name) {
        if(!name) {
            var tok = this.peekToken();

            if(!tok) {
                this.fail('unexpected end of file');
            }

            if(tok.type != lexer.TOKEN_SYMBOL) {
                this.fail("advanceAfterBlockEnd: expected symbol token or " +
                          "explicit name to be passed");
            }

            name = this.nextToken().value;
        }

        var tok = this.nextToken();

        if(tok && tok.type == lexer.TOKEN_BLOCK_END) {
            if(tok.value.charAt(0) === '-') {
                this.dropLeadingWhitespace = true;
            }
        }
        else {
            this.fail("expected block end in " + name + " statement");
        }
    },

    advanceAfterVariableEnd: function() {
        if(!this.skip(lexer.TOKEN_VARIABLE_END)) {
            this.fail("expected variable end");
        }
    },

    parseFor: function() {
        var forTok = this.peekToken();
        var node;
        var endBlock;

        if(this.skipSymbol('for')) {
            node = new nodes.For(forTok.lineno, forTok.colno);
            endBlock = 'endfor';
        }
        else if(this.skipSymbol('asyncEach')) {
            node = new nodes.AsyncEach(forTok.lineno, forTok.colno);
            endBlock = 'endeach';
        }
        else if(this.skipSymbol('asyncAll')) {
            node = new nodes.AsyncAll(forTok.lineno, forTok.colno);
            endBlock = 'endall';
        }
        else {
            this.fail("parseFor: expected for{Async}", forTok.lineno, forTok.colno);
        }

        node.name = this.parsePrimary();

        if(!(node.name instanceof nodes.Symbol)) {
            this.fail('parseFor: variable name expected for loop');
        }

        var type = this.peekToken().type;
        if(type == lexer.TOKEN_COMMA) {
            // key/value iteration
            var key = node.name;
            node.name = new nodes.Array(key.lineno, key.colno);
            node.name.addChild(key);

            while(this.skip(lexer.TOKEN_COMMA)) {
                var prim = this.parsePrimary();
                node.name.addChild(prim);
            }
        }

        if(!this.skipSymbol('in')) {
            this.fail('parseFor: expected "in" keyword for loop',
                      forTok.lineno,
                      forTok.colno);
        }

        node.arr = this.parseExpression();
        this.advanceAfterBlockEnd(forTok.value);

        node.body = this.parseUntilBlocks(endBlock);
        this.advanceAfterBlockEnd();

        return node;
    },

    parseMacro: function() {
        var macroTok = this.peekToken();
        if(!this.skipSymbol('macro')) {
            this.fail("expected macro");
        }

        var name = this.parsePrimary(true);
        var args = this.parseSignature();
        var node = new nodes.Macro(macroTok.lineno,
                                   macroTok.colno,
                                   name,
                                   args);

        this.advanceAfterBlockEnd(macroTok.value);
        node.body = this.parseUntilBlocks('endmacro');
        this.advanceAfterBlockEnd();

        return node;
    },

    parseImport: function() {
        var importTok = this.peekToken();
        if(!this.skipSymbol('import')) {
            this.fail("parseImport: expected import",
                      importTok.lineno,
                      importTok.colno);
        }

        var template = this.parseExpression();

        if(!this.skipSymbol('as')) {
            this.fail('parseImport: expected "as" keyword',
                            importTok.lineno,
                            importTok.colno);
        }

        var target = this.parsePrimary();
        var node = new nodes.Import(importTok.lineno,
                                    importTok.colno,
                                    template,
                                    target);
        this.advanceAfterBlockEnd(importTok.value);

        return node;
    },

    parseFrom: function() {
        var fromTok = this.peekToken();
        if(!this.skipSymbol('from')) {
            this.fail("parseFrom: expected from");
        }

        var template = this.parsePrimary();
        var node = new nodes.FromImport(fromTok.lineno,
                                        fromTok.colno,
                                        template,
                                        new nodes.NodeList());

        if(!this.skipSymbol('import')) {
            this.fail("parseFrom: expected import",
                            fromTok.lineno,
                            fromTok.colno);
        }

        var names = node.names;

        while(1) {
            var nextTok = this.peekToken();
            if(nextTok.type == lexer.TOKEN_BLOCK_END) {
                if(!names.children.length) {
                    this.fail('parseFrom: Expected at least one import name',
                              fromTok.lineno,
                              fromTok.colno);
                }

                // Since we are manually advancing past the block end,
                // need to keep track of whitespace control (normally
                // this is done in `advanceAfterBlockEnd`
                if(nextTok.value.charAt(0) == '-') {
                    this.dropLeadingWhitespace = true;
                }

                this.nextToken();
                break;
            }

            if(names.children.length > 0 && !this.skip(lexer.TOKEN_COMMA)) {
                this.fail('parseFrom: expected comma',
                                fromTok.lineno,
                                fromTok.colno);
            }

            var name = this.parsePrimary();
            if(name.value.charAt(0) == '_') {
                this.fail('parseFrom: names starting with an underscore ' +
                          'cannot be imported',
                          name.lineno,
                          name.colno);
            }

            if(this.skipSymbol('as')) {
                var alias = this.parsePrimary();
                names.addChild(new nodes.Pair(name.lineno,
                                              name.colno,
                                              name,
                                              alias));
            }
            else {
                names.addChild(name);
            }
        }

        return node;
    },

    parseBlock: function() {
        var tag = this.peekToken();
        if(!this.skipSymbol('block')) {
            this.fail('parseBlock: expected block', tag.lineno, tag.colno);
        }

        var node = new nodes.Block(tag.lineno, tag.colno);

        node.name = this.parsePrimary();
        if(!(node.name instanceof nodes.Symbol)) {
            this.fail('parseBlock: variable name expected',
                      tag.lineno,
                      tag.colno);
        }

        this.advanceAfterBlockEnd(tag.value);

        node.body = this.parseUntilBlocks('endblock');

        if(!this.peekToken()) {
            this.fail('parseBlock: expected endblock, got end of file');
        }

        this.advanceAfterBlockEnd();

        return node;
    },

    parseTemplateRef: function(tagName, nodeType) {
        var tag = this.peekToken();
        if(!this.skipSymbol(tagName)) {
            this.fail('parseTemplateRef: expected '+ tagName);
        }

        var node = new nodeType(tag.lineno, tag.colno);
        node.template = this.parseExpression();

        this.advanceAfterBlockEnd(tag.value);
        return node;
    },

    parseExtends: function() {
        return this.parseTemplateRef('extends', nodes.Extends);
    },

    parseInclude: function() {
        return this.parseTemplateRef('include', nodes.Include);
    },

    parseIf: function() {
        var tag = this.peekToken();
        var node;

        if(this.skipSymbol('if') || this.skipSymbol('elif')) {
            node = new nodes.If(tag.lineno, tag.colno);
        }
        else if(this.skipSymbol('ifAsync')) {
            node = new nodes.IfAsync(tag.lineno, tag.colno);
        }
        else {
            this.fail("parseIf: expected if or elif",
                      tag.lineno,
                      tag.colno);
        }

        node.cond = this.parseExpression();
        this.advanceAfterBlockEnd(tag.value);

        node.body = this.parseUntilBlocks('elif', 'else', 'endif');
        var tok = this.peekToken();

        switch(tok && tok.value) {
        case "elif":
            node.else_ = this.parseIf();
            break;
        case "else":
            this.advanceAfterBlockEnd();
            node.else_ = this.parseUntilBlocks("endif");
            this.advanceAfterBlockEnd();
            break;
        case "endif":
            node.else_ = null;
            this.advanceAfterBlockEnd();
            break;
        default:
            this.fail('parseIf: expected endif, else, or endif, ' +
                      'got end of file');
        }

        return node;
    },

    parseSet: function() {
        var tag = this.peekToken();
        if(!this.skipSymbol('set')) {
            this.fail('parseSet: expected set', tag.lineno, tag.colno);
        }

        var node = new nodes.Set(tag.lineno, tag.colno, []);

        var target;
        while((target = this.parsePrimary())) {
            node.targets.push(target);

            if(!this.skip(lexer.TOKEN_COMMA)) {
                break;
            }
        }

        if(!this.skipValue(lexer.TOKEN_OPERATOR, '=')) {
            this.fail('parseSet: expected = in set tag',
                      tag.lineno,
                      tag.colno);
        }

        node.value = this.parseExpression();
        this.advanceAfterBlockEnd(tag.value);

        return node;
    },

    parseStatement: function () {
        var tok = this.peekToken();
        var node;

        if(tok.type != lexer.TOKEN_SYMBOL) {
            this.fail('tag name expected', tok.lineno, tok.colno);
        }

        if(this.breakOnBlocks &&
           this.breakOnBlocks.indexOf(tok.value) !== -1) {
            return null;
        }

        switch(tok.value) {
        case 'raw': return this.parseRaw();
        case 'if':
        case 'ifAsync':
            return this.parseIf();
        case 'for':
        case 'asyncEach':
        case 'asyncAll':
            return this.parseFor();
        case 'block': return this.parseBlock();
        case 'extends': return this.parseExtends();
        case 'include': return this.parseInclude();
        case 'set': return this.parseSet();
        case 'macro': return this.parseMacro();
        case 'import': return this.parseImport();
        case 'from': return this.parseFrom();
        default:
            if (this.extensions.length) {
                for (var i = 0; i < this.extensions.length; i++) {
                    var ext = this.extensions[i];
                    if ((ext.tags || []).indexOf(tok.value) !== -1) {
                        return ext.parse(this, nodes, lexer);
                    }
                }
            }
            this.fail('unknown block tag: ' + tok.value, tok.lineno, tok.colno);
        }

        return node;
    },

    parseRaw: function() {
        this.advanceAfterBlockEnd();
        var str = '';
        var begun = this.peekToken();

        while(1) {
            // Passing true gives us all the whitespace tokens as
            // well, which are usually ignored.
            var tok = this.nextToken(true);

            if(!tok) {
                this.fail("expected endraw, got end of file");
            }

            if(tok.type == lexer.TOKEN_BLOCK_START) {
                // We need to look for the `endraw` block statement,
                // which involves a lookahead so carefully keep track
                // of whitespace
                var ws = null;
                var name = this.nextToken(true);

                if(name.type == lexer.TOKEN_WHITESPACE) {
                    ws = name;
                    name = this.nextToken();
                }

                if(name.type == lexer.TOKEN_SYMBOL &&
                   name.value == 'endraw') {
                    this.advanceAfterBlockEnd(name.value);
                    break;
                }
                else {
                    str += tok.value;
                    if(ws) {
                        str += ws.value;
                    }
                    str += name.value;
                }
            }
            else if(tok.type === lexer.TOKEN_STRING) {
                str += '"' + tok.value + '"';
            }
            else {
                str += tok.value;
            }
        }


        var output = new nodes.Output(
            begun.lineno,
            begun.colno,
            [new nodes.TemplateData(begun.lineno, begun.colno, str)]
        );

        return output;
    },

    parsePostfix: function(node) {
        var tok = this.peekToken();

        while(tok) {
            if(tok.type == lexer.TOKEN_LEFT_PAREN) {
                // Function call
                node = new nodes.FunCall(tok.lineno,
                                         tok.colno,
                                         node,
                                         this.parseSignature());
            }
            else if(tok.type == lexer.TOKEN_LEFT_BRACKET) {
                // Reference
                var lookup = this.parseAggregate();
                if(lookup.children.length > 1) {
                    this.fail('invalid index');
                }

                node =  new nodes.LookupVal(tok.lineno,
                                            tok.colno,
                                            node,
                                            lookup.children[0]);
            }
            else if(tok.type == lexer.TOKEN_OPERATOR && tok.value == '.') {
                // Reference
                this.nextToken();
                var val = this.nextToken();

                if(val.type != lexer.TOKEN_SYMBOL) {
                    this.fail('expected name as lookup value, got ' + val.value,
                              val.lineno,
                              val.colno);
                }

                // Make a literal string because it's not a variable
                // reference
                var lookup = new nodes.Literal(val.lineno,
                                               val.colno,
                                               val.value);

                node =  new nodes.LookupVal(tok.lineno,
                                            tok.colno,
                                            node,
                                            lookup);
            }
            else {
                break;
            }

            tok = this.peekToken();
        }

        return node;
    },

    parseExpression: function() {
        var node = this.parseInlineIf();
        return node;
    },

    parseInlineIf: function() {
        var node = this.parseOr();
        if(this.skipSymbol('if')) {
            var cond_node = this.parseOr();
            var body_node = node;
            node = new nodes.InlineIf(node.lineno, node.colno);
            node.body = body_node;
            node.cond = cond_node;
            if(this.skipSymbol('else')) {
                node.else_ = this.parseOr();
            } else {
                node.else_ = null;
            }
        }

        return node;
    },

    parseOr: function() {
        var node = this.parseAnd();
        while(this.skipSymbol('or')) {
            var node2 = this.parseAnd();
            node = new nodes.Or(node.lineno,
                                node.colno,
                                node,
                                node2);
        }
        return node;
    },

    parseAnd: function() {
        var node = this.parseNot();
        while(this.skipSymbol('and')) {
            var node2 = this.parseNot();
            node = new nodes.And(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parseNot: function() {
        var tok = this.peekToken();
        if(this.skipSymbol('not')) {
            return new nodes.Not(tok.lineno,
                                 tok.colno,
                                 this.parseNot());
        }
        return this.parseCompare();
    },

    parseCompare: function() {
        var compareOps = ['==', '!=', '<', '>', '<=', '>='];
        var expr = this.parseAdd();
        var ops = [];

        while(1) {
            var tok = this.nextToken();

            if(!tok) {
                break;
            }
            else if(compareOps.indexOf(tok.value) !== -1) {
                ops.push(new nodes.CompareOperand(tok.lineno,
                                                  tok.colno,
                                                  this.parseAdd(),
                                                  tok.value));
            }
            else if(tok.type == lexer.TOKEN_SYMBOL &&
                    tok.value == 'in') {
                ops.push(new nodes.CompareOperand(tok.lineno,
                                                  tok.colno,
                                                  this.parseAdd(),
                                                  'in'));
            }
            else if(tok.type == lexer.TOKEN_SYMBOL &&
                    tok.value == 'not' &&
                    this.skipSymbol('in')) {
                ops.push(new nodes.CompareOperand(tok.lineno,
                                                  tok.colno,
                                                  this.parseAdd(),
                                                  'notin'));
            }
            else {
                this.pushToken(tok);
                break;
            }
        }

        if(ops.length) {
            return new nodes.Compare(ops[0].lineno,
                                     ops[0].colno,
                                     expr,
                                     ops);
        }
        else {
            return expr;
        }
    },

    parseAdd: function() {
        var node = this.parseSub();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '+')) {
            var node2 = this.parseSub();
            node = new nodes.Add(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parseSub: function() {
        var node = this.parseMul();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '-')) {
            var node2 = this.parseMul();
            node = new nodes.Sub(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parseMul: function() {
        var node = this.parseDiv();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '*')) {
            var node2 = this.parseDiv();
            node = new nodes.Mul(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parseDiv: function() {
        var node = this.parseFloorDiv();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '/')) {
            var node2 = this.parseFloorDiv();
            node = new nodes.Div(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parseFloorDiv: function() {
        var node = this.parseMod();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '//')) {
            var node2 = this.parseMod();
            node = new nodes.FloorDiv(node.lineno,
                                      node.colno,
                                      node,
                                      node2);
        }
        return node;
    },

    parseMod: function() {
        var node = this.parsePow();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '%')) {
            var node2 = this.parsePow();
            node = new nodes.Mod(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parsePow: function() {
        var node = this.parseUnary();
        while(this.skipValue(lexer.TOKEN_OPERATOR, '**')) {
            var node2 = this.parseUnary();
            node = new nodes.Pow(node.lineno,
                                 node.colno,
                                 node,
                                 node2);
        }
        return node;
    },

    parseUnary: function(noFilters) {
        var tok = this.peekToken();
        var node;

        if(this.skipValue(lexer.TOKEN_OPERATOR, '-')) {
            node = new nodes.Neg(tok.lineno,
                                 tok.colno,
                                 this.parseUnary(true));
        }
        else if(this.skipValue(lexer.TOKEN_OPERATOR, '+')) {
            node = new nodes.Pos(tok.lineno,
                                 tok.colno,
                                 this.parseUnary(true));
        }
        else {
            node = this.parsePrimary();
        }

        if(!noFilters) {
            node = this.parseFilter(node);
        }

        return node;
    },

    parsePrimary: function (noPostfix) {
        var tok = this.nextToken();
        var val = null;
        var node = null;

        if(!tok) {
            this.fail('expected expression, got end of file');
        }
        else if(tok.type == lexer.TOKEN_STRING) {
            val = tok.value;
        }
        else if(tok.type == lexer.TOKEN_INT) {
            val = parseInt(tok.value, 10);
        }
        else if(tok.type == lexer.TOKEN_FLOAT) {
            val = parseFloat(tok.value);
        }
        else if(tok.type == lexer.TOKEN_BOOLEAN) {
            if(tok.value == "true") {
                val = true;
            }
            else if(tok.value == "false") {
                val = false;
            }
            else {
                this.fail("invalid boolean: " + tok.val,
                          tok.lineno,
                          tok.colno);
            }
        }

        if(val !== null) {
            node = new nodes.Literal(tok.lineno, tok.colno, val);
        }
        else if(tok.type == lexer.TOKEN_SYMBOL) {
            node = new nodes.Symbol(tok.lineno, tok.colno, tok.value);

            if(!noPostfix) {
                node = this.parsePostfix(node);
            }
        }
        else {
            // See if it's an aggregate type, we need to push the
            // current delimiter token back on
            this.pushToken(tok);
            node = this.parseAggregate();
        }

        if(node) {
            return node;
        }
        else {
            this.fail('unexpected token: ' + tok.value,
                      tok.lineno,
                      tok.colno);
        }
    },

    parseFilter: function(node) {
        while(this.skip(lexer.TOKEN_PIPE)) {
            var tok = this.expect(lexer.TOKEN_SYMBOL);
            var name = tok.value;

            while(this.skipValue(lexer.TOKEN_OPERATOR, '.')) {
                name += '.' + this.expect(lexer.TOKEN_SYMBOL).value;
            }

            node = new nodes.Filter(
                tok.lineno,
                tok.colno,
                new nodes.Symbol(tok.lineno,
                                 tok.colno,
                                 name),
                new nodes.NodeList(
                    tok.lineno,
                    tok.colno,
                    [node])
            );

            if(this.peekToken().type == lexer.TOKEN_LEFT_PAREN) {
                // Get a FunCall node and add the parameters to the
                // filter
                var call = this.parsePostfix(node);
                node.args.children = node.args.children.concat(call.args.children);
            }
        }

        return node;
    },

    parseAggregate: function() {
        var tok = this.nextToken();
        var node;

        switch(tok.type) {
        case lexer.TOKEN_LEFT_PAREN:
            node = new nodes.Group(tok.lineno, tok.colno); break;
        case lexer.TOKEN_LEFT_BRACKET:
            node = new nodes.Array(tok.lineno, tok.colno); break;
        case lexer.TOKEN_LEFT_CURLY:
            node = new nodes.Dict(tok.lineno, tok.colno); break;
        default:
            return null;
        }

        while(1) {
            var type = this.peekToken().type;
            if(type == lexer.TOKEN_RIGHT_PAREN ||
               type == lexer.TOKEN_RIGHT_BRACKET ||
               type == lexer.TOKEN_RIGHT_CURLY) {
                this.nextToken();
                break;
            }

            if(node.children.length > 0) {
                if(!this.skip(lexer.TOKEN_COMMA)) {
                    this.fail("parseAggregate: expected comma after expression",
                              tok.lineno,
                              tok.colno);
                }
            }

            if(node instanceof nodes.Dict) {
                // TODO: check for errors
                var key = this.parsePrimary();

                // We expect a key/value pair for dicts, separated by a
                // colon
                if(!this.skip(lexer.TOKEN_COLON)) {
                    this.fail("parseAggregate: expected colon after dict key",
                        tok.lineno,
                        tok.colno);
                }

                // TODO: check for errors
                var value = this.parseExpression();
                node.addChild(new nodes.Pair(key.lineno,
                                             key.colno,
                                             key,
                                             value));
            }
            else {
                // TODO: check for errors
                var expr = this.parseExpression();
                node.addChild(expr);
            }
        }

        return node;
    },

    parseSignature: function(tolerant, noParens) {
        var tok = this.peekToken();
        if(!noParens && tok.type != lexer.TOKEN_LEFT_PAREN) {
            if(tolerant) {
                return null;
            }
            else {
                this.fail('expected arguments', tok.lineno, tok.colno);
            }
        }

        if(tok.type == lexer.TOKEN_LEFT_PAREN) {
            tok = this.nextToken();
        }

        var args = new nodes.NodeList(tok.lineno, tok.colno);
        var kwargs = new nodes.KeywordArgs(tok.lineno, tok.colno);
        var kwnames = [];
        var checkComma = false;

        while(1) {
            tok = this.peekToken();
            if(!noParens && tok.type == lexer.TOKEN_RIGHT_PAREN) {
                this.nextToken();
                break;
            }
            else if(noParens && tok.type == lexer.TOKEN_BLOCK_END) {
                break;
            }

            if(checkComma && !this.skip(lexer.TOKEN_COMMA)) {
                this.fail("parseSignature: expected comma after expression",
                          tok.lineno,
                          tok.colno);
            }
            else {
                var arg = this.parseExpression();

                if(this.skipValue(lexer.TOKEN_OPERATOR, '=')) {
                    kwargs.addChild(
                        new nodes.Pair(arg.lineno,
                                       arg.colno,
                                       arg,
                                       this.parseExpression())
                    );
                }
                else {
                    args.addChild(arg);
                }
            }

            checkComma = true;
        }

        if(kwargs.children.length) {
            args.addChild(kwargs);
        }

        return args;
    },

    parseUntilBlocks: function(/* blockNames */) {
        var prev = this.breakOnBlocks;
        this.breakOnBlocks = lib.toArray(arguments);

        var ret = this.parse();

        this.breakOnBlocks = prev;
        return ret;
    },

    parseNodes: function () {
        var tok;
        var buf = [];

        while((tok = this.nextToken())) {
            if(tok.type == lexer.TOKEN_DATA) {
                var data = tok.value;
                var nextToken = this.peekToken();
                var nextVal = nextToken && nextToken.value;

                // If the last token has "-" we need to trim the
                // leading whitespace of the data. This is marked with
                // the `dropLeadingWhitespace` variable.
                if(this.dropLeadingWhitespace) {
                    // TODO: this could be optimized (don't use regex)
                    data = data.replace(/^\s*/, '');
                    this.dropLeadingWhitespace = false;
                }

                // Same for the succeding block start token
                if(nextToken &&
                   nextToken.type == lexer.TOKEN_BLOCK_START &&
                   nextVal.charAt(nextVal.length - 1) == '-') {
                    // TODO: this could be optimized (don't use regex)
                    data = data.replace(/\s*$/, '');
                }

                buf.push(new nodes.Output(tok.lineno,
                                          tok.colno,
                                          [new nodes.TemplateData(tok.lineno,
                                                                  tok.colno,
                                                                  data)]));
            }
            else if(tok.type == lexer.TOKEN_BLOCK_START) {
                var n = this.parseStatement();
                if(!n) {
                    break;
                }
                buf.push(n);
            }
            else if(tok.type == lexer.TOKEN_VARIABLE_START) {
                var e = this.parseExpression();
                this.advanceAfterVariableEnd();
                buf.push(new nodes.Output(tok.lineno, tok.colno, [e]));
            }
            else if(tok.type != lexer.TOKEN_COMMENT) {
                // Ignore comments, otherwise this should be an error
                this.fail("Unexpected token at top-level: " +
                                tok.type, tok.lineno, tok.colno);
            }
        }

        return buf;
    },

    parse: function() {
        return new nodes.NodeList(0, 0, this.parseNodes());
    },

    parseAsRoot: function() {
        return new nodes.Root(0, 0, this.parseNodes());
    }
});

// var util = modules["util"];

// var l = lexer.lex('{%- if x -%}\n hello {% endif %}');
// var t;
// while((t = l.nextToken())) {
//     console.log(util.inspect(t));
// }

// var p = new Parser(lexer.lex('hello {% foo %} {{ "hi" | bar }} {% endfoo %} end'));
// p.extensions = [new FooExtension()];
// var n = p.parseAsRoot();
// nodes.printNodes(n);

modules['parser'] = {
    parse: function(src, extensions) {
        var p = new Parser(lexer.lex(src));
        if (extensions !== undefined) {
            p.extensions = extensions;
        }
        return p.parseAsRoot();
    }
};
})();
(function() {
var nodes = modules["nodes"];

var sym = 0;
function gensym() {
    return 'hole_' + sym++;
}

// copy-on-write version of map
function mapCOW(arr, func) {
    var res = null;

    for(var i=0; i<arr.length; i++) {
        var item = func(arr[i]);

        if(item !== arr[i]) {
            if(!res) {
                res = arr.slice();
            }

            res[i] = item;
        }
    }

    return res || arr;
}

function walk(ast, func, depthFirst) {
    if(!(ast instanceof nodes.Node)) {
        return ast;
    }

    if(!depthFirst) {
        var astT = func(ast);

        if(astT && astT !== ast) {
            return astT;
        }
    }

    if(ast instanceof nodes.NodeList) {
        var children = mapCOW(ast.children, function(node) {
            return walk(node, func, depthFirst);
        });

        if(children !== ast.children) {
            ast = new nodes[ast.typename](ast.lineno, ast.colno, children);
        }
    }
    else if(ast instanceof nodes.CallExtension) {
        var args = walk(ast.args, func, depthFirst);

        var contentArgs = mapCOW(ast.contentArgs, function(node) {
            return walk(node, func, depthFirst);
        });

        if(args !== ast.args || contentArgs !== ast.contentArgs) {
            ast = new nodes[ast.typename](ast.extName,
                                          ast.prop,
                                          args,
                                          contentArgs);
        }
    }
    else {
        var props = ast.fields.map(function(field) {
            return ast[field];
        });

        var propsT = mapCOW(props, function(prop) {
            return walk(prop, func, depthFirst);
        });

        if(propsT !== props) {
            ast = new nodes[ast.typename](ast.lineno, ast.colno);

            propsT.forEach(function(prop, i) {
                ast[ast.fields[i]] = prop;
            });
        }
    }

    return depthFirst ? (func(ast) || ast) : ast;
}

function depthWalk(ast, func) {
    return walk(ast, func, true);
}

function _liftFilters(node, asyncFilters, prop) {
    var children = [];

    var walked = depthWalk(prop ? node[prop] : node, function(node) {
        if(node instanceof nodes.Block) {
            return node;
        }
        else if((node instanceof nodes.Filter &&
                 asyncFilters.indexOf(node.name.value) !== -1) ||
                node instanceof nodes.CallExtensionAsync) {
            var symbol = new nodes.Symbol(node.lineno,
                                          node.colno,
                                          gensym());

            children.push(new nodes.FilterAsync(node.lineno,
                                                node.colno,
                                                node.name,
                                                node.args,
                                                symbol));
            return symbol;
        }
    });

    if(prop) {
        node[prop] = walked;
    }
    else {
        node = walked;
    }

    if(children.length) {
        children.push(node);

        return new nodes.NodeList(
            node.lineno,
            node.colno,
            children
        );
    }
    else {
        return node;
    }
}

function liftFilters(ast, asyncFilters) {
    return depthWalk(ast, function(node) {
        if(node instanceof nodes.Output) {
            return _liftFilters(node, asyncFilters);
        }
        else if(node instanceof nodes.For) {
            return _liftFilters(node, asyncFilters, 'arr');
        }
        else if(node instanceof nodes.If) {
            return _liftFilters(node, asyncFilters, 'cond');
        }
        else if(node instanceof nodes.CallExtension) {
            return _liftFilters(node, asyncFilters, 'args');
        }
    });
}

function liftSuper(ast) {
    return walk(ast, function(blockNode) {
        if(!(blockNode instanceof nodes.Block)) {
            return;
        }

        var hasSuper = false;
        var symbol = gensym();

        blockNode.body = walk(blockNode.body, function(node) {
            if(node instanceof nodes.FunCall &&
               node.name.value == 'super') {
                hasSuper = true;
                return new nodes.Symbol(node.lineno, node.colno, symbol);
            }
        });

        if(hasSuper) {
            blockNode.body.children.unshift(new nodes.Super(
                0, 0, blockNode.name, new nodes.Symbol(0, 0, symbol)
            ));
        }
    });
}

function convertStatements(ast) {
    return depthWalk(ast, function(node) {
        if(!(node instanceof nodes.If) &&
           !(node instanceof nodes.For)) {
            return;
        }

        var async = false;
        walk(node, function(node) {
            if(node instanceof nodes.FilterAsync ||
               node instanceof nodes.IfAsync ||
               node instanceof nodes.AsyncEach ||
               node instanceof nodes.AsyncAll ||
               node instanceof nodes.CallExtensionAsync) {
                async = true;
                // Stop iterating by returning the node
                return node;
            }
        });

        if(async) {
	        if(node instanceof nodes.If) {
                return new nodes.IfAsync(
                    node.lineno,
                    node.colno,
                    node.cond,
                    node.body,
                    node.else_
                );
            }
            else if(node instanceof nodes.For) {
                return new nodes.AsyncEach(
                    node.lineno,
                    node.colno,
                    node.arr,
                    node.name,
                    node.body
                );
            }
        }
    });
}

function cps(ast, asyncFilters) {
    return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
}

function transform(ast, asyncFilters, name) {
    return cps(ast, asyncFilters || []);
}

// var parser = modules["parser"];
// var src = 'hello {% foo %}{% endfoo %} end';
// var ast = transform(parser.parse(src, [new FooExtension()]), ['bar']);
// nodes.printNodes(ast);

modules['transformer'] = {
    transform: transform
};
})();
(function() {
var lib = modules["lib"];
var parser = modules["parser"];
var transformer = modules["transformer"];
var nodes = modules["nodes"];
var Object = modules["object"];
var Frame = modules["runtime"].Frame;

// These are all the same for now, but shouldn't be passed straight
// through
var compareOps = {
    '==': '==',
    '!=': '!=',
    '<': '<',
    '>': '>',
    '<=': '<=',
    '>=': '>='
};

// A common pattern is to emit binary operators
function binOpEmitter(str) {
    return function(node, frame) {
        this.compile(node.left, frame);
        this.emit(str);
        this.compile(node.right, frame);
    };
}

// Generate an array of strings
function quotedArray(arr) {
    return '[' +
        lib.map(arr, function(x) { return '"' + x + '"'; }) +
        ']';
}

var Compiler = Object.extend({
    init: function() {
        this.codebuf = [];
        this.lastId = 0;
        this.buffer = null;
        this.bufferStack = [];
        this.isChild = false;
        this.scopeClosers = '';
    },

    fail: function (msg, lineno, colno) {
        if (lineno !== undefined) lineno += 1;
        if (colno !== undefined) colno += 1;

        throw new lib.TemplateError(msg, lineno, colno);
    },

    pushBufferId: function(id) {
        this.bufferStack.push(this.buffer);
        this.buffer = id;
        this.emit('var ' + this.buffer + ' = "";');
    },

    popBufferId: function() {
        this.buffer = this.bufferStack.pop();
    },

    emit: function(code) {
        this.codebuf.push(code);
    },

    emitLine: function(code) {
        this.emit(code + "\n");
    },

    emitLines: function() {
        lib.each(lib.toArray(arguments), function(line) {
            this.emitLine(line);
        }, this);
    },

    emitFuncBegin: function(name) {
        this.buffer = 'output';
        this.scopeClosers = '';
        this.emitLine('function ' + name + '(env, context, frame, runtime, cb) {');
        this.emitLine('var lineno = null;');
        this.emitLine('var colno = null;');
        this.emitLine('var ' + this.buffer + ' = "";');
        this.emitLine('try {');
    },

    emitFuncEnd: function(noReturn) {
        if(!noReturn) {
            this.emitLine('cb(null, ' + this.buffer +');');
        }

        this.closeScopeLevels();
        this.emitLine('} catch (e) {');
        this.emitLine('  cb(runtime.handleError(e, lineno, colno));');
        this.emitLine('}');
        this.emitLine('}');
        this.buffer = null;
    },

    addScopeLevel: function() {
        this.scopeClosers += '})';
    },

    closeScopeLevels: function() {
        this.emitLine(this.scopeClosers + ';');
        this.scopeClosers = '';
    },

    withScopedSyntax: function(func) {
        var scopeClosers = this.scopeClosers;
        this.scopeClosers = '';

        func.call(this);

        this.closeScopeLevels();
        this.scopeClosers = scopeClosers;
    },

    makeCallback: function(res) {
        var err = this.tmpid();

        return 'function(' + err + (res ? ',' + res : '') + ') {\n' +
            'if(' + err + ') { cb(' + err + '); return; }';
    },

    tmpid: function() {
        this.lastId++;
        return 't_' + this.lastId;
    },

    _bufferAppend: function(func) {
        this.emit(this.buffer + ' += runtime.suppressValue(');
        func.call(this);
        this.emit(', env.autoesc);\n');
    },

    _compileChildren: function(node, frame) {
        var children = node.children;
        for(var i=0, l=children.length; i<l; i++) {
            this.compile(children[i], frame);
        }
    },

    _compileAggregate: function(node, frame, startChar, endChar) {
        if(startChar) {
            this.emit(startChar);
        }

        for(var i=0; i<node.children.length; i++) {
            if(i > 0) {
                this.emit(',');
            }

            this.compile(node.children[i], frame);
        }

        if(endChar) {
            this.emit(endChar);
        }
    },

    _compileExpression: function(node, frame) {
        // TODO: I'm not really sure if this type check is worth it or
        // not.
        this.assertType(
            node,
            nodes.Literal,
            nodes.Symbol,
            nodes.Group,
            nodes.Array,
            nodes.Dict,
            nodes.FunCall,
            nodes.Filter,
            nodes.LookupVal,
            nodes.Compare,
            nodes.InlineIf,
            nodes.And,
            nodes.Or,
            nodes.Not,
            nodes.Add,
            nodes.Sub,
            nodes.Mul,
            nodes.Div,
            nodes.FloorDiv,
            nodes.Mod,
            nodes.Pow,
            nodes.Neg,
            nodes.Pos,
            nodes.Compare,
            nodes.NodeList
        );
        this.compile(node, frame);
    },

    assertType: function(node /*, types */) {
        var types = lib.toArray(arguments).slice(1);
        var success = false;

        for(var i=0; i<types.length; i++) {
            if(node instanceof types[i]) {
                success = true;
            }
        }

        if(!success) {
            this.fail("assertType: invalid type: " + node.typename,
                      node.lineno,
                      node.colno);
        }
    },

    compileCallExtension: function(node, frame, async) {
        var name = node.extName;
        var args = node.args;
        var contentArgs = node.contentArgs;
        var autoescape = typeof node.autoescape === 'boolean' ? node.autoescape : true;
        var transformedArgs = [];

        if(!async) {
            this.emit(this.buffer + ' += runtime.suppressValue(');
        }

        this.emit('env.getExtension("' + node.extName + '")["' + node.prop + '"](');
        this.emit('context');

        if(args || contentArgs) {
            this.emit(',');
        }

        if(args) {
            if(!(args instanceof nodes.NodeList)) {
                this.fail('compileCallExtension: arguments must be a NodeList, ' +
                          'use `parser.parseSignature`');
            }

            lib.each(args.children, function(arg, i) {
                // Tag arguments are passed normally to the call. Note
                // that keyword arguments are turned into a single js
                // object as the last argument, if they exist.
                this._compileExpression(arg, frame);

                if(i != args.children.length - 1 || contentArgs.length) {
                    this.emit(',');
                }
            }, this);
        }

        if(contentArgs.length) {
            lib.each(contentArgs, function(arg, i) {
                if(i > 0) {
                    this.emit(',');
                }

                if(arg) {
                    var id = this.tmpid();

                    this.emitLine('function(cb) {');
                    this.emitLine('if(!cb) { cb = function(err) { if(err) { throw err; }}}');
                    this.pushBufferId(id);

                    this.withScopedSyntax(function() {
                        this.compile(arg, frame);
                        this.emitLine('cb(null, ' + id + ');');
                    });

                    this.popBufferId();
                    this.emitLine('return ' + id + ';');
                    this.emitLine('}');
                }
                else {
                    this.emit('null');
                }
            }, this);
        }

        if(async) {
            var res = this.tmpid();
            this.emitLine(', ' + this.makeCallback(res));
            this.emitLine(this.buffer + ' += runtime.suppressValue(' + res + ', ' + autoescape + ' && env.autoesc);');
            this.addScopeLevel();
        }
        else {
            this.emit(')');
            this.emit(', ' + autoescape + ' && env.autoesc);\n');
        }
    },

    compileCallExtensionAsync: function(node, frame) {
        this.compileCallExtension(node, frame, true);
    },

    compileNodeList: function(node, frame) {
        this._compileChildren(node, frame);
    },

    compileLiteral: function(node, frame) {
        if(typeof node.value == "string") {
            var val = node.value.replace(/\\/g, '\\\\');
            val = val.replace(/"/g, '\\"');
            val = val.replace(/\n/g, "\\n");
            val = val.replace(/\r/g, "\\r");
            val = val.replace(/\t/g, "\\t");
            this.emit('"' + val  + '"');
        }
        else {
            this.emit(node.value.toString());
        }
    },

    compileSymbol: function(node, frame) {
        var name = node.value;
        var v;

        if((v = frame.lookup(name))) {
            this.emit(v);
        }
        else {
            this.emit('runtime.contextOrFrameLookup(' +
                      'context, frame, "' + name + '")');
        }
    },

    compileGroup: function(node, frame) {
        this._compileAggregate(node, frame, '(', ')');
    },

    compileArray: function(node, frame) {
        this._compileAggregate(node, frame, '[', ']');
    },

    compileDict: function(node, frame) {
        this._compileAggregate(node, frame, '{', '}');
    },

    compilePair: function(node, frame) {
        var key = node.key;
        var val = node.value;

        if(key instanceof nodes.Symbol) {
            key = new nodes.Literal(key.lineno, key.colno, key.value);
        }
        else if(!(key instanceof nodes.Literal &&
                  typeof key.value == "string")) {
            this.fail("compilePair: Dict keys must be strings or names",
                      key.lineno,
                      key.colno);
        }

        this.compile(key, frame);
        this.emit(': ');
        this._compileExpression(val, frame);
    },

    compileInlineIf: function(node, frame) {
        this.emit('(');
        this.compile(node.cond, frame);
        this.emit('?');
        this.compile(node.body, frame);
        this.emit(':');
        if(node.else_ !== null)
            this.compile(node.else_, frame);
        else
            this.emit('""');
        this.emit(')');
    },

    compileOr: binOpEmitter(' || '),
    compileAnd: binOpEmitter(' && '),
    compileAdd: binOpEmitter(' + '),
    compileSub: binOpEmitter(' - '),
    compileMul: binOpEmitter(' * '),
    compileDiv: binOpEmitter(' / '),
    compileMod: binOpEmitter(' % '),

    compileNot: function(node, frame) {
        this.emit('!');
        this.compile(node.target, frame);
    },

    compileFloorDiv: function(node, frame) {
        this.emit('Math.floor(');
        this.compile(node.left, frame);
        this.emit(' / ');
        this.compile(node.right, frame);
        this.emit(')');
    },

    compilePow: function(node, frame) {
        this.emit('Math.pow(');
        this.compile(node.left, frame);
        this.emit(', ');
        this.compile(node.right, frame);
        this.emit(')');
    },

    compileNeg: function(node, frame) {
        this.emit('-');
        this.compile(node.target, frame);
    },

    compilePos: function(node, frame) {
        this.emit('+');
        this.compile(node.target, frame);
    },

    compileCompare: function(node, frame) {
        this.compile(node.expr, frame);

        for(var i=0; i<node.ops.length; i++) {
            var n = node.ops[i];
            this.emit(' ' + compareOps[n.type] + ' ');
            this.compile(n.expr, frame);
        }
    },

    compileLookupVal: function(node, frame) {
        this.emit('runtime.memberLookup((');
        this._compileExpression(node.target, frame);
        this.emit('),');
        this._compileExpression(node.val, frame);
        this.emit(', env.autoesc)');
    },

    _getNodeName: function(node) {
        switch (node.typename) {
            case 'Symbol':
                return node.value;
            case 'FunCall':
                return 'the return value of (' + this._getNodeName(node.name) + ')';
            case 'LookupVal':
                return this._getNodeName(node.target) + '["' +
                       this._getNodeName(node.val) + '"]';
            case 'Literal':
                return node.value.toString().substr(0, 10);
            default:
                return '--expression--';
        }
    },

    compileFunCall: function(node, frame) {
        // Keep track of line/col info at runtime by settings
        // variables within an expression. An expression in javascript
        // like (x, y, z) returns the last value, and x and y can be
        // anything
        this.emit('(lineno = ' + node.lineno +
                  ', colno = ' + node.colno + ', ');

        this.emit('runtime.callWrap(');
        // Compile it as normal.
        this._compileExpression(node.name, frame);

        // Output the name of what we're calling so we can get friendly errors
        // if the lookup fails.
        this.emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", ');

        this._compileAggregate(node.args, frame, '[', '])');

        this.emit(')');
    },

    compileFilter: function(node, frame) {
        var name = node.name;
        this.assertType(name, nodes.Symbol);

        this.emit('env.getFilter("' + name.value + '").call(context, ');
        this._compileAggregate(node.args, frame);
        this.emit(')');
    },

    compileFilterAsync: function(node, frame) {
        var name = node.name;
        this.assertType(name, nodes.Symbol);

        var symbol = node.symbol.value;
        frame.set(symbol, symbol);

        this.emit('env.getFilter("' + name.value + '").call(context, ');
        this._compileAggregate(node.args, frame);
        this.emitLine(', ' + this.makeCallback(symbol));

        this.addScopeLevel();
    },

    compileKeywordArgs: function(node, frame) {
        var names = [];

        lib.each(node.children, function(pair) {
            names.push(pair.key.value);
        });

        this.emit('runtime.makeKeywordArgs(');
        this.compileDict(node, frame);
        this.emit(')');
    },

    compileSet: function(node, frame) {
        var ids = [];

        // Lookup the variable names for each identifier and create
        // new ones if necessary
        lib.each(node.targets, function(target) {
            var name = target.value;
            var id = frame.lookup(name);

            if (id == null) {
                id = this.tmpid();

                // Note: This relies on js allowing scope across
                // blocks, in case this is created inside an `if`
                this.emitLine('var ' + id + ';');
            }

            ids.push(id);
        }, this);

        this.emit(ids.join(' = ') + ' = ');
        this._compileExpression(node.value, frame);
        this.emitLine(';');

        lib.each(node.targets, function(target, i) {
            var id = ids[i];
            var name = target.value;

            this.emitLine('frame.set("' + name + '", ' + id + ', true);'); 

            // We are running this for every var, but it's very
            // uncommon to assign to multiple vars anyway
            this.emitLine('if(!frame.parent) {');
            this.emitLine('context.setVariable("' + name + '", ' + id + ');');
            if(name.charAt(0) != '_') {
                this.emitLine('context.addExport("' + name + '");');
            }
            this.emitLine('}');
        }, this);
    },

    compileIf: function(node, frame, async) {
        this.emit('if(');
        this._compileExpression(node.cond, frame);
        this.emitLine(') {');

        this.withScopedSyntax(function() {
            this.compile(node.body, frame);

            if(async) {
                this.emit('cb()');
            }
        });

        if(node.else_) {
            this.emitLine('}\nelse {');

            this.withScopedSyntax(function() {
                this.compile(node.else_, frame);

                if(async) {
                    this.emit('cb()');
                }
            });
        } else if(async) {
            this.emitLine('}\nelse {');
            this.emit('cb()');
        }

        this.emitLine('}');
    },

    compileIfAsync: function(node, frame) {
        this.emit('(function(cb) {');
        this.compileIf(node, frame, true);
        this.emit('})(function() {');
        this.addScopeLevel();
    },

    scanLoop: function(node) {
        var loopUses = {};

        node.iterFields(function(field) {
            var lookups = field.findAll(nodes.LookupVal);

            lib.each(lookups, function(lookup) {
                if (lookup.target instanceof nodes.Symbol &&
                    lookup.target.value == 'loop' &&
                    lookup.val instanceof nodes.Literal) {
                    loopUses[lookup.val.value] = true;
                }
            });
        });

        return loopUses;
    },

    emitLoopBindings: function(node, loopUses, arr, i, len) {
        len = len || arr + '.length';

        var bindings = {
            index: i + ' + 1',
            index0: i,
            revindex: len + ' - ' + i,
            revindex0: len + ' - ' + i + ' - 1',
            first: i + ' === 0',
            last: i + ' === ' + len + ' - 1',
            length: len
        };

        for(var name in bindings) {
            if(name in loopUses) {
                this.emitLine('frame.set("loop.' + name + '", ' + bindings[name] + ');');
            }
        }
    },

    compileFor: function(node, frame) {
        // Some of this code is ugly, but it keeps the generated code
        // as fast as possible. ForAsync also shares some of this, but
        // not much.

        var i = this.tmpid();
        var len = this.tmpid();
        var arr = this.tmpid();
        var loopUses = this.scanLoop(node);
        frame = frame.push();

        this.emitLine('frame = frame.push();');

        this.emit('var ' + arr + ' = ');
        this._compileExpression(node.arr, frame);
        this.emitLine(';');

        this.emit('if(' + arr + ') {');

        // If multiple names are passed, we need to bind them
        // appropriately
        if(node.name instanceof nodes.Array) {
            this.emitLine('var ' + i + ';');

            // The object could be an arroy or object. Note that the
            // body of the loop is duplicated for each condition, but
            // we are optimizing for speed over size.
            this.emitLine('if(runtime.isArray(' + arr + ')) {'); {
                this.emitLine('for(' + i + '=0; ' + i + ' < ' + arr + '.length; '
                              + i + '++) {');

                // Bind each declared var
                for (var u=0; u < node.name.children.length; u++) {
                    var tid = this.tmpid();
                    this.emitLine('var ' + tid + ' = ' + arr + '[' + i + '][' + u + ']');
                    this.emitLine('frame.set("' + node.name.children[u].value
                                  + '", ' + arr + '[' + i + '][' + u + ']' + ');');
                    frame.set(node.name.children[u].value, tid);
                }

                this.emitLoopBindings(node, loopUses, arr, i);
                this.withScopedSyntax(function() {
                    this.compile(node.body, frame);
                });
                this.emitLine('}');
            }

            this.emitLine('} else {'); {
                // Iterate over the key/values of an object
                var key = node.name.children[0];
                var val = node.name.children[1];
                var k = this.tmpid();
                var v = this.tmpid();
                frame.set(key.value, k);
                frame.set(val.value, v);

                this.emitLine(i + ' = -1;');

                if(loopUses['revindex'] || loopUses['revindex0'] ||
                   loopUses['last'] || loopUses['length']) {
                    this.emitLine('var ' + len + ' = runtime.keys(' + arr + ').length;');
                }

                this.emitLine('for(var ' + k + ' in ' + arr + ') {');
                this.emitLine(i + '++;');
                this.emitLine('var ' + v + ' = ' + arr + '[' + k + '];');
                this.emitLine('frame.set("' + key.value + '", ' + k + ');');
                this.emitLine('frame.set("' + val.value + '", ' + v + ');');

                this.emitLoopBindings(node, loopUses, arr, i, len);
                this.withScopedSyntax(function() {
                    this.compile(node.body, frame);
                });
                this.emitLine('}');
            }

            this.emitLine('}');
        }
        else {
            // Generate a typical array iteration
            var v = this.tmpid();
            frame.set(node.name.value, v);

            this.emitLine('for(var ' + i + '=0; ' + i + ' < ' + arr + '.length; ' +
                          i + '++) {');
            this.emitLine('var ' + v + ' = ' + arr + '[' + i + '];');
            this.emitLine('frame.set("' + node.name.value + '", ' + v + ');');

            this.emitLoopBindings(node, loopUses, arr, i);

            this.withScopedSyntax(function() {
                this.compile(node.body, frame);
            });

            this.emitLine('}');
        }

        this.emitLine('}');
        this.emitLine('frame = frame.pop();');
    },

    _compileAsyncLoop: function(node, frame, parallel) {
        // This shares some code with the For tag, but not enough to
        // worry about. This iterates across an object asynchronously,
        // but not in parallel.

        var i = this.tmpid();
        var len = this.tmpid();
        var arr = this.tmpid();
        var loopUses = this.scanLoop(node);
        var asyncMethod = parallel ? 'asyncAll' : 'asyncEach';
        frame = frame.push();

        this.emitLine('frame = frame.push();');

        this.emit('var ' + arr + ' = ');
        this._compileExpression(node.arr, frame);
        this.emitLine(';');

        if(node.name instanceof nodes.Array) {
            this.emit('runtime.' + asyncMethod + '(' + arr + ', ' +
                      node.name.children.length + ', function(');

            lib.each(node.name.children, function(name) {
                this.emit(name.value + ',');
            }, this);

            this.emit(i + ',' + len + ',next) {');

            lib.each(node.name.children, function(name) {
                var id = name.value;
                frame.set(id, id);
                this.emitLine('frame.set("' + id + '", ' + id + ');');
            }, this);
        }
        else {
            var id = node.name.value;
            this.emitLine('runtime.' + asyncMethod + '(' + arr + ', 1, function(' + id + ', ' + i + ', ' + len + ',next) {');
            this.emitLine('frame.set("' + id + '", ' + id + ');');
            frame.set(id, id);
        }

        this.emitLoopBindings(node, loopUses, arr, i, len);

        this.withScopedSyntax(function() {
            var buf;
            if(parallel) {
                buf = this.tmpid();
                this.pushBufferId(buf);
            }

            this.compile(node.body, frame);
            this.emitLine('next(' + i + (buf ? ',' + buf : '') + ');');

            if(parallel) {
                this.popBufferId();
            }
        });

        var output = this.tmpid();
        this.emitLine('}, ' + this.makeCallback(output));
        this.addScopeLevel();

        if(parallel) {
            this.emitLine(this.buffer + ' += ' + output + ';');
        }

        this.emitLine('frame = frame.pop();');
    },

    compileAsyncEach: function(node, frame) {
        this._compileAsyncLoop(node, frame);
    },

    compileAsyncAll: function(node, frame) {
        this._compileAsyncLoop(node, frame, true);
    },

    _emitMacroBegin: function(node, frame) {
        var args = [];
        var kwargs = null;
        var funcId = 'macro_' + this.tmpid();

        // Type check the definition of the args
        lib.each(node.args.children, function(arg, i) {
            if(i === node.args.children.length - 1 &&
               arg instanceof nodes.Dict) {
                kwargs = arg;
            }
            else {
                this.assertType(arg, nodes.Symbol);
                args.push(arg);
            }
        }, this);

        var realNames = lib.map(args, function(n) { return 'l_' + n.value; });
        realNames.push('kwargs');

        // Quoted argument names
        var argNames = lib.map(args, function(n) { return '"' + n.value + '"'; });
        var kwargNames = lib.map((kwargs && kwargs.children) || [],
                                 function(n) { return '"' + n.key.value + '"'; });

        // We pass a function to makeMacro which destructures the
        // arguments so support setting positional args with keywords
        // args and passing keyword args as positional args
        // (essentially default values). See runtime.js.
        this.emitLines(
            'var ' + funcId + ' = runtime.makeMacro(',
            '[' + argNames.join(', ') + '], ',
            '[' + kwargNames.join(', ') + '], ',
            'function (' + realNames.join(', ') + ') {',
            'frame = frame.push();',
            'kwargs = kwargs || {};'
        );

        // Expose the arguments to the template. Don't need to use
        // random names because the function
        // will create a new run-time scope for us
        lib.each(args, function(arg) {
            this.emitLine('frame.set("' + arg.value + '", ' +
                          'l_' + arg.value + ');');
            frame.set(arg.value, 'l_' + arg.value);
        }, this);

        // Expose the keyword arguments
        if(kwargs) {
            lib.each(kwargs.children, function(pair) {
                var name = pair.key.value;
                this.emit('frame.set("' + name + '", ' +
                          'kwargs.hasOwnProperty("' + name + '") ? ' +
                          'kwargs["' + name + '"] : ');
                this._compileExpression(pair.value, frame);
                this.emitLine(');');
            }, this);
        }

        return funcId;
    },

    _emitMacroEnd: function(bufferId) {
        this.emitLine('frame = frame.pop();');
        this.emitLine('return new runtime.SafeString(' + bufferId + ');');
        this.emitLine('});');
    },

    compileMacro: function(node, frame) {
        frame = frame.push();
        var funcId = this._emitMacroBegin(node, frame);
        var id = this.tmpid();
        this.pushBufferId(id);

        this.withScopedSyntax(function() {
            this.compile(node.body, frame);
        });

        this._emitMacroEnd(id);
        this.popBufferId();

        // Expose the macro to the templates
        var name = node.name.value;
        frame = frame.pop();
        frame.set(name, funcId);

        if(frame.parent) {
            this.emitLine('frame.set("' + name + '", ' + funcId + ');');
        }
        else {
            if(node.name.value.charAt(0) != '_') {
                this.emitLine('context.addExport("' + name + '");');
            }
            this.emitLine('context.setVariable("' + name + '", ' + funcId + ');');
        }
    },

    compileImport: function(node, frame) {
        var id = this.tmpid();
        var target = node.target.value;

        this.emit('env.getTemplate(');
        this._compileExpression(node.template, frame);
        this.emitLine(', ' + this.makeCallback(id));
        this.addScopeLevel();

        this.emitLine(id + '.getExported(' + this.makeCallback(id));
        this.addScopeLevel();

        frame.set(target, id);

        if(frame.parent) {
            this.emitLine('frame.set("' + target + '", ' + id + ');');
        }
        else {
            this.emitLine('context.setVariable("' + target + '", ' + id + ');');
        }
    },

    compileFromImport: function(node, frame) {
        var importedId = this.tmpid();

        this.emit('env.getTemplate(');
        this._compileExpression(node.template, frame);
        this.emitLine(', ' + this.makeCallback(importedId));
        this.addScopeLevel();

        this.emitLine(importedId + '.getExported(' + this.makeCallback(importedId));
        this.addScopeLevel();

        lib.each(node.names.children, function(nameNode) {
            var name;
            var alias;
            var id = this.tmpid();

            if(nameNode instanceof nodes.Pair) {
                name = nameNode.key.value;
                alias = nameNode.value.value;
            }
            else {
                name = nameNode.value;
                alias = name;
            }

            this.emitLine('if(' + importedId + '.hasOwnProperty("' + name + '")) {');
            this.emitLine('var ' + id + ' = ' + importedId + '.' + name + ';');
            this.emitLine('} else {');
            this.emitLine('cb(new Error("cannot import \'' + name + '\'")); return;');
            this.emitLine('}');

            frame.set(alias, id);

            if(frame.parent) {
                this.emitLine('frame.set("' + alias + '", ' + id + ');');
            }
            else {
                this.emitLine('context.setVariable("' + alias + '", ' + id + ');');
            }
        }, this);
    },

    compileBlock: function(node, frame) {
        if(!this.isChild) {
            var id = this.tmpid();

            this.emitLine('context.getBlock("' + node.name.value + '")' +
                          '(env, context, frame, runtime, ' + this.makeCallback(id));
            this.emitLine(this.buffer + ' += ' + id + ';');
            this.addScopeLevel();
        }
    },

    compileSuper: function(node, frame) {
        var name = node.blockName.value;
        var id = node.symbol.value;

        this.emitLine('context.getSuper(env, ' +
                      '"' + name + '", ' +
                      'b_' + name + ', ' +
                      'frame, runtime, '+
                      this.makeCallback(id));
        this.emitLine(id + ' = runtime.markSafe(' + id + ');');
        this.addScopeLevel();
        frame.set(id, id);
    },

    compileExtends: function(node, frame) {
        if(this.isChild) {
            this.fail('compileExtends: cannot extend multiple times',
                      node.template.lineno,
                      node.template.colno);
        }

        var k = this.tmpid();

        this.emit('env.getTemplate(');
        this._compileExpression(node.template, frame);
        this.emitLine(', true, ' + this.makeCallback('parentTemplate'));

        this.emitLine('for(var ' + k + ' in parentTemplate.blocks) {');
        this.emitLine('context.addBlock(' + k +
                      ', parentTemplate.blocks[' + k + ']);');
        this.emitLine('}');

        this.addScopeLevel();
        this.isChild = true;
    },

    compileInclude: function(node, frame) {
        var id = this.tmpid();
        var id2 = this.tmpid();

        this.emit('env.getTemplate(');
        this._compileExpression(node.template, frame);
        this.emitLine(', ' + this.makeCallback(id));
        this.addScopeLevel();

        this.emitLine(id + '.render(' +
                      'context.getVariables(), frame.push(), ' + this.makeCallback(id2));
        this.emitLine(this.buffer + ' += ' + id2);
        this.addScopeLevel();
    },

    compileTemplateData: function(node, frame) {
        this.compileLiteral(node, frame);
    },

    compileOutput: function(node, frame) {
        var children = node.children;
        for(var i=0, l=children.length; i<l; i++) {
            // TemplateData is a special case because it is never
            // autoescaped, so simply output it for optimization
            if(children[i] instanceof nodes.TemplateData) {
                if(children[i].value) {
                    this.emit(this.buffer + ' += ');
                    this.compileLiteral(children[i], frame);
                    this.emitLine(';');
                }
            }
            else {
                this.emit(this.buffer + ' += runtime.suppressValue(');
                this.compile(children[i], frame);
                this.emit(', env.autoesc);\n');
            }
        }
    },

    compileRoot: function(node, frame) {
        if(frame) {
            this.fail("compileRoot: root node can't have frame");
        }

        frame = new Frame();

        this.emitFuncBegin('root');
        this._compileChildren(node, frame);
        if(this.isChild) {
            this.emitLine('parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);');
        }
        this.emitFuncEnd(this.isChild);

        // When compiling the blocks, they should all act as top-level code
        this.isChild = false;

        var blocks = node.findAll(nodes.Block);
        for(var i=0; i<blocks.length; i++) {
            var block = blocks[i];
            var name = block.name.value;

            this.emitFuncBegin('b_' + name);

            var tmpFrame = new Frame();
            this.compile(block.body, tmpFrame);
            this.emitFuncEnd();
        }

        this.emitLine('return {');
        for(var i=0; i<blocks.length; i++) {
            var block = blocks[i];
            var name = 'b_' + block.name.value;
            this.emitLine(name + ': ' + name + ',');
        }
        this.emitLine('root: root\n};');
    },

    compile: function (node, frame) {
        var _compile = this["compile" + node.typename];
        if(_compile) {
            _compile.call(this, node, frame);
        }
        else {
            this.fail("compile: Cannot compile node: " + node.typename,
                      node.lineno,
                      node.colno);
        }
    },

    getCode: function() {
        return this.codebuf.join('');
    }
});

// var c = new Compiler();
// var src = '{% macro foo() %}{% include "include.html" %}{% endmacro %} This is my template {{ foo() }}';
// var ast = transformer.transform(parser.parse(src));
//nodes.printNodes(ast);
// c.compile(ast);
// var tmpl = c.getCode();
// console.log(tmpl);

modules['compiler'] = {
    compile: function(src, asyncFilters, extensions, name) {
        var c = new Compiler();

        // Run the extension preprocessors against the source.
        if(extensions && extensions.length) {
            for(var i=0; i<extensions.length; i++) {
                if('preprocess' in extensions[i]) {
                    src = extensions[i].preprocess(src, name);
                }
            }
        }

        c.compile(transformer.transform(parser.parse(src, extensions),
                                        asyncFilters,
                                        name));
        return c.getCode();
    },

    Compiler: Compiler
};
})();
(function() {
var lib = modules["lib"];
var r = modules["runtime"];

var filters = {
    abs: function(n) {
        return Math.abs(n);
    },

    batch: function(arr, linecount, fill_with) {
        var res = [];
        var tmp = [];

        for(var i=0; i<arr.length; i++) {
            if(i % linecount === 0 && tmp.length) {
                res.push(tmp);
                tmp = [];
            }

            tmp.push(arr[i]);
        }

        if(tmp.length) {
            if(fill_with) {
                for(var i=tmp.length; i<linecount; i++) {
                    tmp.push(fill_with);
                }
            }

            res.push(tmp);
        }

        return res;
    },

    capitalize: function(str) {
        var ret = str.toLowerCase();
        return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
    },

    center: function(str, width) {
        width = width || 80;

        if(str.length >= width) {
            return str;
        }

        var spaces = width - str.length;
        var pre = lib.repeat(" ", spaces/2 - spaces % 2);
        var post = lib.repeat(" ", spaces/2);
        return r.copySafeness(str, pre + str + post);
    },

    'default': function(val, def) {
        return val ? val : def;
    },

    dictsort: function(val, case_sensitive, by) {
        if (!lib.isObject(val)) {
            throw new lib.TemplateError("dictsort filter: val must be an object");
        }

        var array = [];
        for (var k in val) {
            // deliberately include properties from the object's prototype
            array.push([k,val[k]]);
        }

        var si;
        if (by === undefined || by === "key") {
            si = 0;
        } else if (by === "value") {
            si = 1;
        } else {
            throw new lib.TemplateError(
                "dictsort filter: You can only sort by either key or value");
        }

        array.sort(function(t1, t2) {
            var a = t1[si];
            var b = t2[si];

            if (!case_sensitive) {
                if (lib.isString(a)) {
                    a = a.toUpperCase();
                }
                if (lib.isString(b)) {
                    b = b.toUpperCase();
                }
            }

            return a > b ? 1 : (a == b ? 0 : -1);
        });

        return array;
    },

    escape: function(str) {
        if(typeof str == 'string' ||
           str instanceof r.SafeString) {
            return lib.escape(str);
        }
        return str;
    },

    safe: function(str) {
        return r.markSafe(str);
    },

    first: function(arr) {
        return arr[0];
    },

    groupby: function(arr, attr) {
        return lib.groupBy(arr, attr);
    },

    indent: function(str, width, indentfirst) {
        width = width || 4;
        var res = '';
        var lines = str.split('\n');
        var sp = lib.repeat(' ', width);

        for(var i=0; i<lines.length; i++) {
            if(i == 0 && !indentfirst) {
                res += lines[i] + '\n';
            }
            else {
                res += sp + lines[i] + '\n';
            }
        }

        return r.copySafeness(str, res);
    },

    join: function(arr, del, attr) {
        del = del || '';

        if(attr) {
            arr = lib.map(arr, function(v) {
                return v[attr];
            });
        }

        return arr.join(del);
    },

    last: function(arr) {
        return arr[arr.length-1];
    },

    length: function(arr) {
        return arr !== undefined ? arr.length : 0;
    },

    list: function(val) {
        if(lib.isString(val)) {
            return val.split('');
        }
        else if(lib.isObject(val)) {
            var keys = [];

            if(Object.keys) {
                keys = Object.keys(val);
            }
            else {
                for(var k in val) {
                    keys.push(k);
                }
            }

            return lib.map(keys, function(k) {
                return { key: k,
                         value: val[k] };
            });
        }
        else {
            throw new lib.TemplateError("list filter: type not iterable");
        }
    },

    lower: function(str) {
        return str.toLowerCase();
    },

    random: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    replace: function(str, old, new_, maxCount) {
        var res = str;
        var last = res;
        var count = 1;
        res = res.replace(old, new_);

        while(last != res) {
            if(count >= maxCount) {
                break;
            }

            last = res;
            res = res.replace(old, new_);
            count++;
        }

        return r.copySafeness(str, res);
    },

    reverse: function(val) {
        var arr;
        if(lib.isString(val)) {
            arr = filters.list(val);
        }
        else {
            // Copy it
            arr = lib.map(val, function(v) { return v; });
        }

        arr.reverse();

        if(lib.isString(val)) {
            return r.copySafeness(val, arr.join(''));
        }
        return arr;
    },

    round: function(val, precision, method) {
        precision = precision || 0;
        var factor = Math.pow(10, precision);
        var rounder;

        if(method == 'ceil') {
            rounder = Math.ceil;
        }
        else if(method == 'floor') {
            rounder = Math.floor;
        }
        else {
            rounder = Math.round;
        }

        return rounder(val * factor) / factor;
    },

    slice: function(arr, slices, fillWith) {
        var sliceLength = Math.floor(arr.length / slices);
        var extra = arr.length % slices;
        var offset = 0;
        var res = [];

        for(var i=0; i<slices; i++) {
            var start = offset + i * sliceLength;
            if(i < extra) {
                offset++;
            }
            var end = offset + (i + 1) * sliceLength;

            var slice = arr.slice(start, end);
            if(fillWith && i >= extra) {
                slice.push(fillWith);
            }
            res.push(slice);
        }

        return res;
    },

    sort: function(arr, reverse, caseSens, attr) {
        // Copy it
        arr = lib.map(arr, function(v) { return v; });

        arr.sort(function(a, b) {
            var x, y;

            if(attr) {
                x = a[attr];
                y = b[attr];
            }
            else {
                x = a;
                y = b;
            }

            if(!caseSens && lib.isString(x) && lib.isString(y)) {
                x = x.toLowerCase();
                y = y.toLowerCase();
            }

            if(x < y) {
                return reverse ? 1 : -1;
            }
            else if(x > y) {
                return reverse ? -1: 1;
            }
            else {
                return 0;
            }
        });

        return arr;
    },

    string: function(obj) {
        return r.copySafeness(obj, obj);
    },

    title: function(str) {
        var words = str.split(' ');
        for(var i = 0; i < words.length; i++) {
            words[i] = filters.capitalize(words[i]);
        }
        return r.copySafeness(str, words.join(' '));
    },

    trim: function(str) {
        return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
    },

    truncate: function(input, length, killwords, end) {
        var orig = input;
        length = length || 255;

        if (input.length <= length)
            return input;

        if (killwords) {
            input = input.substring(0, length);
        } else {
            var idx = input.lastIndexOf(' ', length);
            if(idx === -1) {
                idx = length;
            }

            input = input.substring(0, idx);
        }

        input += (end !== undefined && end !== null) ? end : '...';
        return r.copySafeness(orig, input);
    },

    upper: function(str) {
        return str.toUpperCase();
    },

    urlencode: function(obj) {
        var enc = encodeURIComponent;
        if (lib.isString(obj)) {
            return enc(obj);
        } else {
            var parts;
            if (lib.isArray(obj)) {
                parts = obj.map(function(item) {
                    return enc(item[0]) + '=' + enc(item[1]);
                })
            } else {
                parts = [];
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        parts.push(enc(k) + '=' + enc(obj[k]));
                    }
                }
            }
            return parts.join('&');
        }
    },

    urlize: function(str, length, nofollow) {
        if (isNaN(length)) length = Infinity;

        var noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');

        // For the jinja regexp, see
        // https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
        var puncRE = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
        // from http://blog.gerv.net/2011/05/html5_email_address_regexp/
        var emailRE = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
        var httpHttpsRE = /^https?:\/\/.*$/;
        var wwwRE = /^www\./;
        var tldRE = /\.(?:org|net|com)(?:\:|\/|$)/;

        var words = str.split(/\s+/).filter(function(word) {
          // If the word has no length, bail. This can happen for str with
          // trailing whitespace.
          return word && word.length;
        }).map(function(word) {
          var matches = word.match(puncRE);

          var possibleUrl = matches && matches[1] || word;

          // url that starts with http or https
          if (httpHttpsRE.test(possibleUrl))
            return '<a href="' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

          // url that starts with www.
          if (wwwRE.test(possibleUrl))
            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

          // an email address of the form username@domain.tld
          if (emailRE.test(possibleUrl))
            return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + '</a>';

          // url that ends in .com, .org or .net that is not an email address
          if (tldRE.test(possibleUrl))
            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

          return possibleUrl;

        });

        return words.join(' ');
    },

    wordcount: function(str) {
        var words = (str) ? str.match(/\w+/g) : null;
        return (words) ? words.length : null;
    },

    'float': function(val, def) {
        var res = parseFloat(val);
        return isNaN(res) ? def : res;
    },

    'int': function(val, def) {
        var res = parseInt(val, 10);
        return isNaN(res) ? def : res;
    }
};

// Aliases
filters.d = filters['default'];
filters.e = filters.escape;

modules['filters'] = filters;
})();
(function() {

function cycler(items) {
    var index = -1;
    var current = null;

    return {
        reset: function() {
            index = -1;
            current = null;
        },

        next: function() {
            index++;
            if(index >= items.length) {
                index = 0;
            }

            current = items[index];
            return current;
        }
    };

}

function joiner(sep) {
    sep = sep || ',';
    var first = true;

    return function() {
        var val = first ? '' : sep;
        first = false;
        return val;
    };
}

var globals = {
    range: function(start, stop, step) {
        if(!stop) {
            stop = start;
            start = 0;
            step = 1;
        }
        else if(!step) {
            step = 1;
        }

        var arr = [];
        for(var i=start; i<stop; i+=step) {
            arr.push(i);
        }
        return arr;
    },

    // lipsum: function(n, html, min, max) {
    // },

    cycler: function() {
        return cycler(Array.prototype.slice.call(arguments));
    },

    joiner: function(sep) {
        return joiner(sep);
    }
}

modules['globals'] = globals;
})();
(function() {
var Obj = modules["object"];
var lib = modules["lib"];

var Loader = Obj.extend({
    on: function(name, func) {
        this.listeners = this.listeners || {};
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(func);
    },

    emit: function(name /*, arg1, arg2, ...*/) {
        var args = Array.prototype.slice.call(arguments, 1);

        if(this.listeners && this.listeners[name]) {
            lib.each(this.listeners[name], function(listener) {
                listener.apply(null, args);
            });
        }
    }
});

modules['loader'] = Loader;
})();
(function() {
var Loader = modules["loader"];

var WebLoader = Loader.extend({
    init: function(baseURL, neverUpdate) {
        // It's easy to use precompiled templates: just include them
        // before you configure nunjucks and this will automatically
        // pick it up and use it
        this.precompiled = window.nunjucksPrecompiled || {};

        this.baseURL = baseURL || '';
        this.neverUpdate = neverUpdate;
    },

    getSource: function(name) {
        if(this.precompiled[name]) {
            return {
                src: { type: "code",
                       obj: this.precompiled[name] },
                path: name
            };
        }
        else {
            var src = this.fetch(this.baseURL + '/' + name);
            if(!src) {
                return null;
            }

            return { src: src,
                     path: name,
                     noCache: !this.neverUpdate };
        }
    },

    fetch: function(url, callback) {
        // Only in the browser please
        var ajax;
        var loading = true;
        var src;

        if(window.XMLHttpRequest) { // Mozilla, Safari, ...
            ajax = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) { // IE 8 and older
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }

        ajax.onreadystatechange = function() {
            if(ajax.readyState === 4 && (ajax.status === 0 || ajax.status === 200) && loading) {
                loading = false;
                src = ajax.responseText;
            }
        };

        url += (url.indexOf('?') === -1 ? '?' : '&') + 's=' +
               (new Date().getTime());

        // Synchronous because this API shouldn't be used in
        // production (pre-load compiled templates instead)
        ajax.open('GET', url, false);
        ajax.send();

        return src;
    }
});

modules['web-loaders'] = {
    WebLoader: WebLoader
};
})();
(function() {
if(typeof window === 'undefined' || window !== this) {
    modules['loaders'] = modules["node-loaders"];
}
else {
    modules['loaders'] = modules["web-loaders"];
}
})();
(function() {
var path = modules["path"];
var lib = modules["lib"];
var Obj = modules["object"];
var lexer = modules["lexer"];
var compiler = modules["compiler"];
var builtin_filters = modules["filters"];
var builtin_loaders = modules["loaders"];
var runtime = modules["runtime"];
var globals = modules["globals"];
var Frame = runtime.Frame;

var Environment = Obj.extend({
    init: function(loaders, opts) {
        // The dev flag determines the trace that'll be shown on errors.
        // If set to true, returns the full trace from the error point,
        // otherwise will return trace starting from Template.render
        // (the full trace from within nunjucks may confuse developers using
        //  the library)
        // defaults to false
        opts = opts || {};
        this.dev = !!opts.dev;

        // The autoescape flag sets global autoescaping. If true,
        // every string variable will be escaped by default.
        // If false, strings can be manually escaped using the `escape` filter.
        // defaults to false
        this.autoesc = !!opts.autoescape;

        if(!loaders) {
            // The filesystem loader is only available client-side
            if(builtin_loaders.FileSystemLoader) {
                this.loaders = [new builtin_loaders.FileSystemLoader('views')];
            }
            else {
                this.loaders = [new builtin_loaders.WebLoader('/views')];
            }
        }
        else {
            this.loaders = lib.isArray(loaders) ? loaders : [loaders];
        }

        this.initCache();
        this.filters = {};
        this.asyncFilters = [];
        this.extensions = {};
        this.extensionsList = [];

        if(opts.tags) {
            lexer.setTags(opts.tags);
        }

        for(var name in builtin_filters) {
            this.addFilter(name, builtin_filters[name]);
        }
    },

    initCache: function() {
        // Caching and cache busting
        var cache = {};

        lib.each(this.loaders, function(loader) {
            if(typeof loader.on === 'function'){
                loader.on('update', function(template) {
                    cache[template] = null;
                });
            }
        });

        this.cache = cache;
    },

    addExtension: function(name, extension) {
        extension._name = name;
        this.extensions[name] = extension;
        this.extensionsList.push(extension);
    },

    getExtension: function(name) {
        return this.extensions[name];
    },

    addGlobal: function(name, value) {
        globals[name] = value;
    },

    addFilter: function(name, func, async) {
        var wrapped = func;

        if(async) {
            this.asyncFilters.push(name);
        }
        this.filters[name] = wrapped;
    },

    getFilter: function(name) {
        if(!this.filters[name]) {
            throw new Error('filter not found: ' + name);
        }
        return this.filters[name];
    },

    getTemplate: function(name, eagerCompile, cb) {
        if(name && name.raw) {
            // this fixes autoescape for templates referenced in symbols
            name = name.raw;
        }

        if(lib.isFunction(eagerCompile)) {
            cb = eagerCompile;
            eagerCompile = false;
        }

        if(typeof name !== 'string') {
            throw new Error('template names must be a string: ' + name);
        }

        var tmpl = this.cache[name];

        if(tmpl) {
            if(eagerCompile) {
                tmpl.compile();
            }

            if(cb) {
                cb(null, tmpl);
            }
            else {
                return tmpl;
            }
        } else {
            var syncResult;

            lib.asyncIter(this.loaders, function(loader, i, next, done) {
                function handle(src) {
                    if(src) {
                        done(src);
                    }
                    else {
                        next();
                    }
                }

                if(loader.async) {
                    loader.getSource(name, function(err, src) {
                        if(err) { throw err; }
                        handle(src);
                    });
                }
                else {
                    handle(loader.getSource(name));
                }
            }, function(info) {
                if(!info) {
                    var err = new Error('template not found: ' + name);
                    if(cb) {
                        cb(err);
                    }
                    else {
                        throw err;
                    }
                }
                else {
                    var tmpl = new Template(info.src, this,
                                            info.path, eagerCompile);

                    if(!info.noCache) {
                        this.cache[name] = tmpl;
                    }

                    if(cb) {
                        cb(null, tmpl);
                    }
                    else {
                        syncResult = tmpl;
                    }
                }
            }.bind(this));

            return syncResult;
        }
    },

    express: function(app) {
        var env = this;

        function NunjucksView(name, opts) {
            this.name          = name;
            this.path          = name;
            this.defaultEngine = opts.defaultEngine;
            this.ext           = path.extname(name);
            if (!this.ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
            if (!this.ext) this.name += (this.ext = ('.' !== this.defaultEngine[0] ? '.' : '') + this.defaultEngine);
        }

        NunjucksView.prototype.render = function(opts, cb) {
          env.render(this.name, opts, cb);
        };

        app.set('view', NunjucksView);
    },

    render: function(name, ctx, cb) {
        if(lib.isFunction(ctx)) {
            cb = ctx;
            ctx = null;
        }

        // We support a synchronous API to make it easier to migrate
        // existing code to async. This works because if you don't do
        // anything async work, the whole thing is actually run
        // synchronously.
        var syncResult = null;

        this.getTemplate(name, function(err, tmpl) {
            if(err && cb) {
                cb(err);
            }
            else if(err) {
                throw err;
            }
            else {
                tmpl.render(ctx, cb || function(err, res) {
                    if(err) { throw err; }
                    syncResult = res;
                });
            }
        });

        return syncResult;
    },

    renderString: function(src, ctx, cb) {
        var tmpl = new Template(src, this);
        return tmpl.render(ctx, cb);
    }
});

var Context = Obj.extend({
    init: function(ctx, blocks) {
        this.ctx = ctx;
        this.blocks = {};
        this.exported = [];

        for(var name in blocks) {
            this.addBlock(name, blocks[name]);
        }
    },

    lookup: function(name) {
        // This is one of the most called functions, so optimize for
        // the typical case where the name isn't in the globals
        if(name in globals && !(name in this.ctx)) {
            return globals[name];
        }
        else {
            return this.ctx[name];
        }
    },

    setVariable: function(name, val) {
        this.ctx[name] = val;
    },

    getVariables: function() {
        return this.ctx;
    },

    addBlock: function(name, block) {
        this.blocks[name] = this.blocks[name] || [];
        this.blocks[name].push(block);
    },

    getBlock: function(name) {
        if(!this.blocks[name]) {
            throw new Error('unknown block "' + name + '"');
        }

        return this.blocks[name][0];
    },

    getSuper: function(env, name, block, frame, runtime, cb) {
        var idx = (this.blocks[name] || []).indexOf(block);
        var blk = this.blocks[name][idx + 1];
        var context = this;

        if(idx == -1 || !blk) {
            throw new Error('no super block available for "' + name + '"');
        }

        blk(env, context, frame, runtime, cb);
    },

    addExport: function(name) {
        this.exported.push(name);
    },

    getExported: function() {
        var exported = {};
        for(var i=0; i<this.exported.length; i++) {
            var name = this.exported[i];
            exported[name] = this.ctx[name];
        }
        return exported;
    }
});

var Template = Obj.extend({
    init: function (src, env, path, eagerCompile) {
        this.env = env || new Environment();

        if(lib.isObject(src)) {
            switch(src.type) {
            case 'code': this.tmplProps = src.obj; break;
            case 'string': this.tmplStr = src.obj; break;
            }
        }
        else if(lib.isString(src)) {
            this.tmplStr = src;
        }
        else {
            throw new Error("src must be a string or an object describing " +
                            "the source");
        }

        this.path = path;

        if(eagerCompile) {
            lib.withPrettyErrors(this.path,
                                 this.env.dev,
                                 this._compile.bind(this));
        }
        else {
            this.compiled = false;
        }
    },

    render: function(ctx, frame, cb) {
        if (typeof ctx === 'function') {
            cb = ctx;
            ctx = {};
        }
        else if (typeof frame === 'function') {
            cb = frame;
            frame = null;
        }

        return lib.withPrettyErrors(this.path, this.env.dev, function() {
            this.compile();

            var context = new Context(ctx || {}, this.blocks);
            var syncResult = null;

            this.rootRenderFunc(this.env,
                                context,
                                frame || new Frame(),
                                runtime,
                                cb || function(err, res) {
                                    if(err) { throw err; }
                                    syncResult = res;
                                });

            return syncResult;
        }.bind(this));
    },

    getExported: function(cb) {
        this.compile();

        // Run the rootRenderFunc to populate the context with exported vars
        var context = new Context({}, this.blocks);
        this.rootRenderFunc(this.env,
                            context,
                            new Frame(),
                            runtime,
                            function() {
                                cb(null, context.getExported());
                            });
    },

    compile: function() {
        if(!this.compiled) {
            this._compile();
        }
    },

    _compile: function() {
        var props;

        if(this.tmplProps) {
            props = this.tmplProps;
        }
        else {
            var source = compiler.compile(this.tmplStr,
                                          this.env.asyncFilters,
                                          this.env.extensionsList,
                                          this.path);
            var func = new Function(source);
            props = func();
        }

        this.blocks = this._getBlocks(props);
        this.rootRenderFunc = props.root;
        this.compiled = true;
    },

    _getBlocks: function(props) {
        var blocks = {};

        for(var k in props) {
            if(k.slice(0, 2) == 'b_') {
                blocks[k.slice(2)] = props[k];
            }
        }

        return blocks;
    }
});

// test code
// var src = '{% macro foo() %}{% include "include.html" %}{% endmacro %}{{ foo() }}';
// var env = new Environment(new builtin_loaders.FileSystemLoader('../tests/templates', true), { dev: true });
// console.log(env.renderString(src, { name: 'poop' }));

modules['environment'] = {
    Environment: Environment,
    Template: Template
};
})();
var nunjucks;

var lib = modules["lib"];
var env = modules["environment"];
var compiler = modules["compiler"];
var parser = modules["parser"];
var lexer = modules["lexer"];
var runtime = modules["runtime"];
var Loader = modules["loader"];
var loaders = modules["loaders"];
var precompile = modules["precompile"];

nunjucks = {};
nunjucks.Environment = env.Environment;
nunjucks.Template = env.Template;

nunjucks.Loader = Loader;
nunjucks.FileSystemLoader = loaders.FileSystemLoader;
nunjucks.WebLoader = loaders.WebLoader;

nunjucks.compiler = compiler;
nunjucks.parser = parser;
nunjucks.lexer = lexer;
nunjucks.runtime = runtime;

// A single instance of an environment, since this is so commonly used

var e;
nunjucks.configure = function(templatesPath, opts) {
    opts = opts || {};
    if(lib.isObject(templatesPath)) {
        opts = templatesPath;
        templatesPath = null;
    }

    var noWatch = 'watch' in opts ? !opts.watch : false;
    var loader = loaders.FileSystemLoader || loaders.WebLoader;
    e = new env.Environment(new loader(templatesPath, noWatch), opts);

    if(opts && opts.express) {
        e.express(opts.express);
    }

    return e;
};

nunjucks.compile = function(src, env, path, eagerCompile) {
    if(!e) {
        nunjucks.configure();
    }
    return new nunjucks.Template(src, env, path, eagerCompile);
};

nunjucks.render = function(name, ctx, cb) {
    if(!e) {
        nunjucks.configure();
    }

    return e.render(name, ctx, cb);
};

nunjucks.renderString = function(src, ctx, cb) {
    if(!e) {
        nunjucks.configure();
    }

    return e.renderString(src, ctx, cb);
};

if(precompile) {
    nunjucks.precompile = precompile.precompile;
    nunjucks.precompileString = precompile.precompileString;
}

nunjucks.require = function(name) { return modules[name]; };

if(typeof define === 'function' && define.amd) {
    define(function() { return nunjucks; });
}
else {
    window.nunjucks = nunjucks;
    if(typeof module !== 'undefined') module.exports = nunjucks;
}

})();

},{}],17:[function(require,module,exports){
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  }
  else if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.analytics = factory();
  }
}(this, function() {

  // Make sure _gaq is on the global so we don't die trying to access it
  if(!this._gaq) {
    this._gaq = [];
  }

  // Make sure optimizely is on the global so we don't die trying to access it
  if(!this.optimizely) {
    this.optimizely = [];
  }

  // Use hostname for GA Category
  var _category = location.hostname,
      _redacted = "REDACTED (Potential Email Address)";

  /**
   * To Title Case 2.1 - http://individed.com/code/to-title-case/
   * Copyright 2008-2013 David Gouch. Licensed under the MIT License.
   * https://github.com/gouch/to-title-case
   */
  function toTitleCase(s){
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    s = trim(s);

    return s.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
      if (index > 0 &&
          index + match.length !== title.length &&
          match.search(smallWords) > -1 &&
          title.charAt(index - 2) !== ":" &&
          (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }

      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  }

  // GA strings need to have leading/trailing whitespace trimmed, and not all
  // browsers have String.prototoype.trim().
  function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
  }

  // See if s could be an email address. We don't want to send personal data like email.
  function mightBeEmail(s) {
    // There's no point trying to validate rfc822 fully, just look for ...@...
    return (/[^@]+@[^@]+/).test(s);
  }

  function warn(msg) {
    console.warn("[analytics] " + msg);
  }

  // Support both types of Google Analytics Event Tracking, see:
  // ga.js - https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
  // analytics.js - https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  function _gaEvent(options) {
    // If the new analytics.js API is present, fire this event using ga().
    if(typeof ga === "function") {
      // Transform the argument array to match the expected call signature for ga(), see:
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#overview
      var fieldObject = {
        'hitType': 'event',
        'eventCategory': _category,
        'eventAction': options.action
      };
      if(options.label) {
        fieldObject['eventLabel'] = options.label;
      }
      if(options.value || options.value === 0) {
        fieldObject['eventValue'] = options.value;
      }
      if(options.nonInteraction === true) {
        fieldObject['nonInteraction'] = 1;
      }
      ga('send', fieldObject);
    }

    // Also support the old API. Google suggests firing data at both to be the right thing.
    var eventArgs = ['_trackEvent', _category, options.action];
    if(options.label) {
      eventArgs[3] = options.label;
    }
    if(options.value || options.value === 0) {
      eventArgs[4] = options.value;
    }
    if(options.nonInteraction === true) {
      eventArgs[5] = true;
    }
    _gaq.push(eventArgs);
  }

  function event(action, options) {
    options = options || {};
    var eventOptions = {},
        label = options.label,
        value = options.value,
        // Support both forms to deal with typos between the 2 APIs
        nonInteraction = options.noninteraction || options.nonInteraction;

    if(!action) {
      warn("Expected `action` arg.");
      return;
    }
    if(mightBeEmail(action)) {
      warn("`action` arg looks like an email address, redacting.");
      action = _redacted;
    }
    eventOptions.action = toTitleCase(action);

    // label: An optional string to provide additional dimensions to the event data.
    if(label) {
      if(typeof label !== "string") {
        warn("Expected `label` arg to be a String.");
      } else {
        if(mightBeEmail(label)) {
          warn("`label` arg looks like an email address, redacting.");
          label = _redacted;
        }
        eventOptions.label = trim(label);
      }
    }

    // value: An optional integer that you can use to provide numerical data about
    // the user event.
    if(value || value === 0) {
      if(typeof value !== "number") {
        warn("Expected `value` arg to be a Number.");
      } else {
        // Force value to int
        eventOptions.value = value|0;
      }
    }

    // noninteraction: An optional boolean that when set to true, indicates that
    // the event hit will not be used in bounce-rate calculation.
    if(nonInteraction) {
      if(typeof nonInteraction !== "boolean") {
        warn("Expected `noninteraction` arg to be a Boolean.");
      } else {
        eventOptions.nonInteraction = nonInteraction === true;
      }
    }

    _gaEvent(eventOptions);
  }

  // Use a consistent prefix and check if arg starts with a forward slash
  function prefixVirtualPageview(s) {
    // Bail if s is already prefixed.
    if(/^\/virtual\//.test(s)) {
      return s;
    }
    // Make sure s has a leading / then add prefix and return
    s = s.replace(/^[/]?/, '/');
    return '/virtual' + s;
  }

  // Support both types of Google Analytics Tracking, see:
  // ga.js - https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._trackPageview
  // analytics.js - https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
  function _gaVirtualPageView(options) {
    // If the new analytics.js API is present, fire this event using ga().
    if(typeof ga === "function") {
      // Transform the argument array to match the expected call signature for ga():
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
      var fieldObject = {
        'hitType': 'pageview',
        'page': options.virtualPagePath
      };
      ga('send', fieldObject);
    }

    // Also support the old API. Google suggests firing data at both to be the right thing.
    var eventArgs = ['_trackPageview', options.virtualPagePath];
    _gaq.push(eventArgs);
  }

  function virtualPageview(virtualPagePath) {
    if(!virtualPagePath) {
      warn("Expected `virtualPagePath` arg.");
      return;
    }
    virtualPagePath = trim(virtualPagePath);

    var eventOptions = {};
    eventOptions.virtualPagePath = prefixVirtualPageview(virtualPagePath);

    _gaVirtualPageView(eventOptions);
  }


  function _optimizely(options) {
    var eventArgs = ['trackEvent', options.action];

    // check if we are giving this conversion financial value
    if (options.revenue) {
      var args = {
        revenue: options.revenue
      };
      eventArgs[2] = args;
    }

    optimizely.push(eventArgs);
  }

  function conversionGoal(action, options) {
    options = options || {};
    var eventOptions = {},
        valueInCents = options.valueInCents;

    if(!action) {
      warn("Expected `action` arg.");
      return;
    }
    eventOptions.action = trim(action);

    // valueInCents: An optional integer to track revenue - for example from fundraising appeal.
    if(valueInCents) {
      if((typeof valueInCents === 'number') && (valueInCents % 1 === 0)) {
        eventOptions.revenue = valueInCents;
      } else {
        warn("Expected `valueInCents` arg to be an integer.");
      }
    }

    _optimizely(eventOptions);
  }

  return {
    event: event,
    virtualPageview: virtualPageview,
    conversionGoal: conversionGoal
  };

}));

},{}],18:[function(require,module,exports){
var expressions = require('angular-expressions');
var EventEmitter = require('events').EventEmitter;

var nunjucks = require('nunjucks');
var url = require('url');
var util = require('util');
var wmLoginCore = require('../core');

function _each(baseEl, selector, cb) {
  if (!baseEl) {
    return;
  }
  var els = baseEl.querySelectorAll(selector);
  if (!els) {
    return;
  }

  for (var i = 0; i < els.length; i++) {
    cb(i, els[i]);
  }
}

var lang_data = {
  'en-US': require('../../locale/en_US/webmaker-login.json')
};
var template = new nunjucks.Environment();
template.addFilter('i18n', function (key) {
  return lang_data['en-US'][key].message;
});
var template_options = {
  lang: 'en-US'
};
expressions.filters.i18n = function (key) {
  return lang_data['en-US'][key].message;
};

var ui = {
  create: template.renderString("<div class=\"modal-header\">\n  <button ng-click=\"close()\" ng-hide=\"\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n  <h3 class=\"modal-title\" ng-hide=\"currentState === MODALSTATE.welcome\">\n    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n    <span class=\"modal-title-center\">{{ 'webmakerAuthCreateWelcome' | i18n }}</span>\n    <button\n      ng-show=\"currentState === MODALSTATE.inputEmail\"\n      href=\"#\" ng-click=\"submitEmail()\" ng-disabled=\"!user.email || form.user.$error.accountExists || form.user.$error.invalidEmail\" tabindex=\"3\" class=\"btn-link modal-title-right\">{{ 'Next' | i18n }}</button>\n    <button\n      ng-show=\"currentState === MODALSTATE.inputUsername\"\n      ng-disabled=\"!user.username || form.user.$error.invalidUsername || form.user.$error.usernameTaken || sendingRequest\" ng-click=\"submitUser()\" class=\"btn-link create-user modal-title-right\" tabindex=\"5\">{{ 'Sign up' | i18n }}</button>\n  </h3>\n  <h3 class=\"modal-title\" ng-show=\"currentState === MODALSTATE.welcome\">\n    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n    <span>{{ 'webmakerAuthWelcome' | i18n }}</span>\n    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-right\">{{ 'Done' | i18n }}</a>\n  </h3>\n</div>\n<div class=\"modal-body\">\n  <form class=\"form\" name=\"form.user\" novalidate>\n    <div ng-show=\"currentState === MODALSTATE.inputEmail\">\n      <div class=\"form-group\">\n        <label for=\"webmaker-login-email\">{{ 'Email' | i18n }}</label>\n        <input id=\"webmaker-login-email\" ng-model=\"user.email\" ng-keyup=\"validateEmail();\" type=\"text\" class=\"form-control\" name=\"email\" autocomplete=\"off\" autofocus tabindex=\"1\" required focus-on=\"create-user-email\">\n      </div>\n      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.agreeToTerms\" ng-bind-html=\"'webmakerAuthAgreeError' | i18n\"></div>\n      <div class=\"alert alert-warning\" ng-show=\"form.user.$error.accountExists\" bind-trusted-html=\"'WebmakerAccountExists' | i18n\"></div>\n      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidEmail\" ng-bind-html=\"'NotAnEmail' | i18n\"></div>\n      <div class=\"terms-checkbox checkbox\">\n        <input id=\"agree-to-terms\" ng-model=\"user.agree\" type=\"checkbox\" ng-disabled=\"form.user.$error.accountExists\" ng-change=\"agreeToTermsChanged();\" name=\"agree\" tabindex=\"2\">\n        <label for=\"agree-to-terms\" tabindex=\"2\">\n          <div><span></span></div>\n          <span ng-bind-html=\"'webmakerAuthAgreeToTerms' | i18n\"></span>\n        </label>\n      </div>\n      <div class=\"mailing-list-checkbox checkbox\">\n        <input id=\"subscribe-to-list\" ng-model=\"user.subscribeToList\" type=\"checkbox\" ng-disabled=\"form.user.$error.accountExists\" name=\"subscribeToList\" tabindex=\"2\">\n        <label for=\"subscribe-to-list\" tabindex=\"2\">\n          <div><span></span></div>\n          <span ng-bind-html=\"'webmakerAuthMailingList' | i18n\"></span>\n        </label>\n      </div>\n      <div class=\"cta-links clearfix\">\n        <button ng-click=\"submitEmail()\" ng-disabled=\"!user.email || form.user.$error.accountExists || form.user.$error.invalidEmail\" class=\"create-user btn btn-primary hidden-xs-login\" type=\"button\" tabindex=\"3\">{{ 'Sign up' | i18n }}</button>\n      </div>\n    </div>\n\n    <div ng-show=\"currentState === MODALSTATE.inputUsername\">\n      <div class=\"form-group\">\n        <label for=\"pre-username\">{{ 'webmakerAuthChooseUsername' | i18n }}</label>\n        <label for=\"username\" class=\"hidden-xs-login\">webmaker.org/user/</label>\n        <input ng-model=\"user.username\" name=\"username\" ng-change=\"validateUsername()\" class=\"form-control username\" autocomplete=\"off\" required autofocus tabindex=\"4\" focus-on=\"create-user-username\" maxlength=\"20\" minlength=\"1\">\n        <div class=\"visible-xs help-block text-center\">webmaker.org/user/<strong class=\"username-with-url\">{{user.username}}</strong></div>\n      </div>\n      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidUsername\" ng-bind-html=\"'webmakerAuthUsernameInvalid' | i18n\"></div>\n      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.serverError\" ng-bind-html=\"'webmakerAuthServerError' | i18n\"></div>\n      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.usernameTaken\" ng-bind-html=\"'webmakerAuthTakenError' | i18n\"></div>\n      <div ng-show=\"skippedEmail\" class=\"mailing-list-checkbox checkbox\">\n        <input id=\"subscribe-to-list\" ng-model=\"user.subscribeToList\" type=\"checkbox\" ng-disabled=\"form.user.$error.accountExists\" name=\"subscribeToList\" tabindex=\"2\">\n        <label for=\"subscribe-to-list\" tabindex=\"2\">\n          <div><span></span></div>\n          <span ng-bind-html=\"'webmakerAuthMailingList' | i18n\"></span>\n        </label>\n      </div>\n      <button ng-disabled=\"!user.username || form.user.$error.invalidUsername || form.user.$error.usernameTaken || sendingRequest\" ng-click=\"submitUser()\" class=\"create-user btn btn-primary hidden-xs-login\" type=\"button\" tabindex=\"5\">{{ 'webmakerAuthCreateAccount' | i18n }}</button>\n    </div>\n\n    <div ng-show=\"currentState === MODALSTATE.welcome\" class=\"welcome\">\n      <p class=\"subheadline\">{{ 'aboutWebmaker' | i18n }}</p>\n\n        <!-- Goggles -->\n        <div class=\"tool-desc\" ng-show=\"welcomeModalIdx === 0\">\n          <div class=\"icon\">\n            <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n            <svg width=\"276px\" height=\"210px\" viewBox=\"0 0 276 210\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n              <title>Goggles</title>\n              <desc>XRay Goggles.</desc>\n              <defs></defs>\n              <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n                <g id=\"Artboard-27\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-8.000000, -25.000000)\">\n                  <g id=\"goggles\" sketch:type=\"MSLayerGroup\" transform=\"translate(8.000000, 25.000000)\">\n                    <path d=\"M256.460878,100.757257 C254.300432,98.595 248.740338,93.6349115 244.461405,91.3416372 L87.2010811,2.31836283 C82.0372703,-0.216504425 74.6962297,-1.41238938 69.0606081,4.21300885 C63.4091351,9.83747788 64.2679054,16.7711947 66.8740541,21.7935398 L156.207608,178.545531 C158.362459,181.89531 163.757514,188.816947 165.933811,190.960619 C190.938851,215.872566 231.455838,215.88 256.460878,190.960619 C281.469649,166.057965 281.469649,125.658982 256.460878,100.757257\" id=\"Fill-1\" fill=\"#ECA5C0\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M206.411635,4.22137168 C200.776946,-1.41238938 193.033095,-0.216504425 188.474432,2.21336283 L32.3423514,90.5518142 C27.5645676,93.5884513 21.1746081,98.595 19.0113649,100.757257 C-5.99367568,125.658982 -5.99367568,166.057965 19.0113649,190.960619 C44.015473,215.872566 84.5389865,215.872566 109.525378,190.960619 C111.700743,188.816947 116.493446,182.464912 118.293041,180.08708 L208.316595,22.2302655 C211.235108,17.7031858 212.050986,9.83747788 206.411635,4.22137168\" id=\"Fill-2\" fill=\"#59B3D7\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M137.699757,146.04292 L187.347122,58.9867699 L137.736122,30.9025221 L88.0896892,58.9923451 L137.699757,146.04292\" id=\"Fill-3\" fill=\"#4E72A7\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M19.0113649,190.960619 C-5.99367568,166.057965 -5.99367568,125.658982 19.0113649,100.757257 C44.015473,75.8360177 84.5389865,75.8360177 109.525378,100.757257 C134.526689,125.658982 134.526689,166.057965 109.525378,190.960619 C84.5389865,215.872566 44.015473,215.872566 19.0113649,190.960619\" id=\"Fill-4\" fill=\"#369ECD\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M256.526149,190.960619 C231.520176,215.88 191.001324,215.872566 165.995351,190.960619 C140.994041,166.057965 140.994041,125.667345 165.995351,100.747965 C191.001324,75.8360177 231.520176,75.8360177 256.526149,100.757257 C281.532122,125.658982 281.532122,166.057965 256.526149,190.960619\" id=\"Fill-5\" fill=\"#E36D9E\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M235.671365,172.371903 C222.429892,185.550796 200.976486,185.550796 187.746203,172.371903 C174.501,159.16885 174.501,137.799027 187.746203,124.595044 C200.976486,111.409646 222.429892,111.409646 235.671365,124.612699 C248.903514,137.799027 248.903514,159.16885 235.671365,172.371903\" id=\"Fill-6\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M211.686405,130.685973 C197.874284,130.685973 186.669243,142.526814 186.669243,147.321504 C186.669243,148.542478 187.402135,149.697478 188.704743,150.735398 C189.952338,148.202389 191.521622,145.792035 193.651297,143.673451 C195.952541,141.379248 198.579203,139.622124 201.369041,138.337035 C195.774446,143.999602 195.790297,153.095575 201.451095,158.720973 C207.112824,164.37146 216.304743,164.37146 221.987919,158.720973 C227.658041,153.061195 227.658041,143.897389 221.987919,138.246903 C221.513311,137.773938 220.980892,137.392035 220.455,137.00177 C224.543716,138.231106 228.400257,140.452832 231.635797,143.673451 C233.390635,145.410133 234.738,147.370752 235.893284,149.405708 C236.381878,148.741327 236.7045,148.044425 236.7045,147.321504 C236.7045,142.526814 225.511581,130.685973 211.686405,130.685973 L211.686405,130.685973 Z M220.613514,144.661195 C220.613514,146.779779 218.886649,148.491372 216.75977,148.491372 C214.626365,148.491372 212.908824,146.779779 212.908824,144.661195 C212.908824,142.542611 214.626365,140.822655 216.75977,140.822655 C218.886649,140.822655 220.613514,142.542611 220.613514,144.661195 L220.613514,144.661195 Z\" id=\"Fill-7\" fill=\"#E36D9E\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M86.2761081,172.371903 C73.0467568,185.550796 51.5765676,185.550796 38.3490811,172.371903 C25.1048108,159.16885 25.1048108,137.799027 38.3490811,124.595044 C51.5765676,111.409646 73.0467568,111.409646 86.2761081,124.612699 C99.5073243,137.799027 99.5073243,159.16885 86.2761081,172.371903\" id=\"Fill-8\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M62.3051351,130.685973 C48.479027,130.685973 37.2861081,142.526814 37.2861081,147.321504 C37.2861081,148.542478 38.0031486,149.697478 39.2871081,150.735398 C40.5552162,148.202389 42.1384865,145.792035 44.2373919,143.673451 C46.5367703,141.38854 49.1615676,139.630487 51.9476757,138.347257 C46.3754595,144.014469 46.3978378,153.095575 52.0334595,158.720973 C57.7026486,164.37146 66.9085541,164.37146 72.5768108,158.720973 C78.2599865,153.061195 78.2599865,143.897389 72.5768108,138.246903 C72.0938108,137.765575 71.553,137.383673 71.0233784,136.984115 C75.134473,138.214381 79.0087297,140.440752 82.254527,143.673451 C83.9897838,145.410133 85.3362162,147.370752 86.5138784,149.405708 C86.981027,148.741327 87.3111081,148.044425 87.3111081,147.321504 C87.3111081,142.526814 76.1107297,130.685973 62.3051351,130.685973 L62.3051351,130.685973 Z M71.2163919,144.661195 C71.2163919,146.779779 69.4913919,148.491372 67.3645135,148.491372 C65.2478919,148.491372 63.5089054,146.779779 63.5089054,144.661195 C63.5089054,142.542611 65.2478919,140.822655 67.3645135,140.822655 C69.4913919,140.822655 71.2163919,142.542611 71.2163919,144.661195 L71.2163919,144.661195 Z\" id=\"Fill-9\" fill=\"#369ECD\" sketch:type=\"MSShapeGroup\"></path>\n                  </g>\n                </g>\n              </g>\n            </svg>\n          </div>\n          <h4>{{ 'XRay-Goggles' | i18n }}</h4>\n          <p>{{ 'AboutGoggles' | i18n }}</p>\n          <div class=\"clearfix\">\n            <a class=\"create-user btn btn-primary\" type=\"button\" href=\"https://goggles.webmaker.org\" autofocus>{{'TryGoggles' | i18n }}</a>\n            <a href=\"https://webmaker.org/explore\" class=\"explore-link\">{{ 'ExploreWebmaker' | i18n }}</a>\n          </div>\n        </div>\n\n        <!-- Resources -->\n        <div class=\"tool-desc\" ng-show=\"welcomeModalIdx === 1\">\n          <div class=\"icon\">\n            <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n            <svg width=\"269px\" height=\"212px\" viewBox=\"0 0 269 212\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n                <title>Webmaker Resources</title>\n                <desc></desc>\n                <defs></defs>\n                <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n                  <g id=\"resources-illustration\" sketch:type=\"MSLayerGroup\" transform=\"translate(1.000000, 1.000000)\">\n                      <path d=\"M156.358,204.482 C156.358,208.067 153.453,210.974 149.867,210.974 L6.357,210.974 C2.773,210.974 -0.133,208.067 -0.133,204.482 L-0.133,27.567 C-0.133,23.981 2.773,21.074 6.357,21.074 L149.867,21.074 C153.453,21.074 156.358,23.981 156.358,27.567 L156.358,204.482\" id=\"Fill-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M3,45.473 L152,45.473 L152,91.473 L3,91.473 L3,45.473 Z\" id=\"Fill-2\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M4,24.473 L154,24.473 L154,45.473 L4,45.473 L4,24.473 Z\" id=\"Fill-3\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M6.021,30.993 C6.021,29.197 7.477,27.741 9.273,27.741 C11.068,27.741 12.523,29.197 12.523,30.993 C12.523,32.789 11.068,34.244 9.273,34.244 C7.477,34.244 6.021,32.789 6.021,30.993\" id=\"Fill-4\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M14.395,30.993 C14.395,29.197 15.852,27.741 17.647,27.741 C19.443,27.741 20.898,29.197 20.898,30.993 C20.898,32.789 19.443,34.244 17.647,34.244 C15.852,34.244 14.395,32.789 14.395,30.993\" id=\"Fill-5\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M22.769,30.993 C22.769,29.197 24.225,27.741 26.02,27.741 C27.816,27.741 29.272,29.197 29.272,30.993 C29.272,32.789 27.816,34.244 26.02,34.244 C24.225,34.244 22.769,32.789 22.769,30.993\" id=\"Fill-6\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M49.98,118.367 L137.896,118.367 M49.98,133.901 L137.896,133.901\" id=\"Stroke-7\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M22.239,115.145 C22.239,111.583 25.125,108.697 28.687,108.697 C32.248,108.697 35.133,111.583 35.133,115.145 C35.133,118.706 32.248,121.592 28.687,121.592 C25.125,121.592 22.239,118.706 22.239,115.145\" id=\"Fill-8\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M28.687,131.554 C25.125,131.554 22.239,134.44 22.239,138.001 C22.239,141.563 25.125,144.449 28.687,144.449 C32.248,144.449 35.133,141.563 35.133,138.001 C35.133,134.44 32.248,131.554 28.687,131.554 L28.687,131.554 Z M28.687,133.313 C31.271,133.313 33.375,135.415 33.375,138.001 C33.375,140.587 31.271,142.691 28.687,142.691 C26.101,142.691 23.998,140.587 23.998,138.001 C23.998,135.415 26.101,133.313 28.687,133.313 L28.687,133.313 Z\" id=\"Fill-9\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M28.685,132.472 L28.685,118.076\" id=\"Stroke-10\" stroke=\"#739AB1\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M49.98,162.908 L137.896,162.908 M49.98,178.442 L137.896,178.442\" id=\"Stroke-11\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M22.239,159.685 C22.239,156.124 25.125,153.238 28.687,153.238 C32.248,153.238 35.133,156.124 35.133,159.685 C35.133,163.246 32.248,166.133 28.687,166.133 C25.125,166.133 22.239,163.246 22.239,159.685\" id=\"Fill-13\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M28.687,176.094 C25.125,176.094 22.239,178.981 22.239,182.542 C22.239,186.103 25.125,188.989 28.687,188.989 C32.248,188.989 35.133,186.103 35.133,182.542 C35.133,178.981 32.248,176.094 28.687,176.094 L28.687,176.094 Z M28.687,177.853 C31.271,177.853 33.375,179.956 33.375,182.542 C33.375,185.128 31.271,187.231 28.687,187.231 C26.101,187.231 23.998,185.128 23.998,182.542 C23.998,179.956 26.101,177.853 28.687,177.853 L28.687,177.853 Z\" id=\"Fill-14\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M28.685,177.013 L28.685,162.616\" id=\"Stroke-15\" stroke=\"#739AB1\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M150.202,32.43 C150.202,34.696 148.365,36.533 146.101,36.533 L64.628,36.533 C62.363,36.533 60.526,34.696 60.526,32.43 L60.526,31.844 C60.526,29.579 62.363,27.741 64.628,27.741 L146.101,27.741 C148.365,27.741 150.202,29.579 150.202,31.844 L150.202,32.43\" id=\"Fill-16\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M149.867,21.074 L6.357,21.074 C2.773,21.074 -0.133,23.981 -0.133,27.567 L-0.133,204.482 C-0.133,208.067 2.773,210.974 6.357,210.974 L149.867,210.974 C153.453,210.974 156.358,208.067 156.358,204.482 L156.358,27.567 C156.358,23.981 153.453,21.074 149.867,21.074 L149.867,21.074 Z M149.867,26.349 C150.538,26.349 151.083,26.895 151.083,27.567 L151.083,204.482 C151.083,205.153 150.538,205.698 149.867,205.698 L6.357,205.698 C5.687,205.698 5.142,205.153 5.142,204.482 L5.142,27.567 C5.142,26.895 5.687,26.349 6.357,26.349 L149.867,26.349 L149.867,26.349 Z\" id=\"Fill-17\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M212.625,183.381 C212.625,186.967 209.72,189.874 206.135,189.874 L62.624,189.874 C59.04,189.874 56.133,186.967 56.133,183.381 L56.133,6.466 C56.133,2.881 59.04,-0.026 62.624,-0.026 L206.135,-0.026 C209.72,-0.026 212.625,2.881 212.625,6.466 L212.625,183.381\" id=\"Fill-18\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M59,24.473 L208,24.473 L208,70.473 L59,70.473 L59,24.473 Z\" id=\"Fill-19\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M61,3.473 L210,3.473 L210,24.473 L61,24.473 L61,3.473 Z\" id=\"Fill-20\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M62.288,9.893 C62.288,8.098 63.744,6.641 65.54,6.641 C67.335,6.641 68.79,8.098 68.79,9.893 C68.79,11.689 67.335,13.144 65.54,13.144 C63.744,13.144 62.288,11.689 62.288,9.893\" id=\"Fill-21\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M70.662,9.893 C70.662,8.098 72.118,6.641 73.914,6.641 C75.709,6.641 77.165,8.098 77.165,9.893 C77.165,11.689 75.709,13.144 73.914,13.144 C72.118,13.144 70.662,11.689 70.662,9.893\" id=\"Fill-22\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M79.036,9.893 C79.036,8.098 80.492,6.641 82.287,6.641 C84.083,6.641 85.539,8.098 85.539,9.893 C85.539,11.689 84.083,13.144 82.287,13.144 C80.492,13.144 79.036,11.689 79.036,9.893\" id=\"Fill-23\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M106.246,97.268 L194.162,97.268 M106.246,112.801 L194.162,112.801\" id=\"Stroke-24\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M78.506,94.045 C78.506,90.484 81.392,87.598 84.954,87.598 C88.515,87.598 91.399,90.484 91.399,94.045 C91.399,97.606 88.515,100.492 84.954,100.492 C81.392,100.492 78.506,97.606 78.506,94.045\" id=\"Fill-25\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M84.954,110.453 C81.392,110.453 78.506,113.34 78.506,116.902 C78.506,120.463 81.392,123.349 84.954,123.349 C88.515,123.349 91.399,120.463 91.399,116.902 C91.399,113.34 88.515,110.453 84.954,110.453 L84.954,110.453 Z M84.954,112.212 C87.538,112.212 89.641,114.316 89.641,116.902 C89.641,119.488 87.538,121.59 84.954,121.59 C82.368,121.59 80.264,119.488 80.264,116.902 C80.264,114.316 82.368,112.212 84.954,112.212 L84.954,112.212 Z\" id=\"Fill-26\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M84.952,111.372 L84.952,96.976\" id=\"Stroke-27\" stroke=\"#FF6969\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M106.246,141.808 L194.162,141.808 M106.246,157.341 L194.162,157.341\" id=\"Stroke-28\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M78.506,138.585 C78.506,135.024 81.392,132.137 84.954,132.137 C88.515,132.137 91.399,135.024 91.399,138.585 C91.399,142.147 88.515,145.033 84.954,145.033 C81.392,145.033 78.506,142.147 78.506,138.585\" id=\"Fill-29\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M84.954,154.994 C81.392,154.994 78.506,157.88 78.506,161.442 C78.506,165.003 81.392,167.89 84.954,167.89 C88.515,167.89 91.399,165.003 91.399,161.442 C91.399,157.88 88.515,154.994 84.954,154.994 L84.954,154.994 Z M84.954,156.753 C87.538,156.753 89.641,158.856 89.641,161.442 C89.641,164.028 87.538,166.131 84.954,166.131 C82.368,166.131 80.264,164.028 80.264,161.442 C80.264,158.856 82.368,156.753 84.954,156.753 L84.954,156.753 Z\" id=\"Fill-30\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M84.952,155.912 L84.952,141.516\" id=\"Stroke-31\" stroke=\"#FF6969\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M206.469,11.33 C206.469,13.596 204.632,15.433 202.367,15.433 L120.895,15.433 C118.63,15.433 116.792,13.596 116.792,11.33 L116.792,10.744 C116.792,8.479 118.63,6.641 120.895,6.641 L202.367,6.641 C204.632,6.641 206.469,8.479 206.469,10.744 L206.469,11.33\" id=\"Fill-32\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M206.135,-0.026 L62.624,-0.026 C59.04,-0.026 56.133,2.881 56.133,6.466 L56.133,183.381 C56.133,186.967 59.04,189.874 62.624,189.874 L206.135,189.874 C209.72,189.874 212.625,186.967 212.625,183.381 L212.625,6.466 C212.625,2.881 209.72,-0.026 206.135,-0.026 L206.135,-0.026 Z M206.135,5.249 C206.805,5.249 207.35,5.795 207.35,6.466 L207.35,183.381 C207.35,184.053 206.805,184.599 206.135,184.599 L62.624,184.599 C61.954,184.599 61.408,184.053 61.408,183.381 L61.408,6.466 C61.408,5.795 61.954,5.249 62.624,5.249 L206.135,5.249 L206.135,5.249 Z\" id=\"Fill-33\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M267.134,204.482 C267.134,208.067 264.229,210.974 260.643,210.974 L117.132,210.974 C113.548,210.974 110.642,208.067 110.642,204.482 L110.642,27.567 C110.642,23.981 113.548,21.074 117.132,21.074 L260.643,21.074 C264.229,21.074 267.134,23.981 267.134,27.567 L267.134,204.482\" id=\"Fill-34\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M113,45.473 L263,45.473 L263,91.473 L113,91.473 L113,45.473 Z\" id=\"Fill-35\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M115,24.473 L264,24.473 L264,45.473 L115,45.473 L115,24.473 Z\" id=\"Fill-36\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M116.796,30.993 C116.796,29.197 118.252,27.741 120.048,27.741 C121.843,27.741 123.299,29.197 123.299,30.993 C123.299,32.789 121.843,34.244 120.048,34.244 C118.252,34.244 116.796,32.789 116.796,30.993\" id=\"Fill-37\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M125.17,30.993 C125.17,29.197 126.626,27.741 128.422,27.741 C130.218,27.741 131.673,29.197 131.673,30.993 C131.673,32.789 130.218,34.244 128.422,34.244 C126.626,34.244 125.17,32.789 125.17,30.993\" id=\"Fill-38\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M133.544,30.993 C133.544,29.197 135,27.741 136.795,27.741 C138.592,27.741 140.048,29.197 140.048,30.993 C140.048,32.789 138.592,34.244 136.795,34.244 C135,34.244 133.544,32.789 133.544,30.993\" id=\"Fill-39\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M160.754,118.367 L248.671,118.367 M160.754,133.901 L248.671,133.901\" id=\"Stroke-40\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M133.014,115.145 C133.014,111.583 135.9,108.697 139.462,108.697 C143.023,108.697 145.908,111.583 145.908,115.145 C145.908,118.706 143.023,121.592 139.462,121.592 C135.9,121.592 133.014,118.706 133.014,115.145\" id=\"Fill-41\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M139.462,131.554 C135.9,131.554 133.014,134.44 133.014,138.001 C133.014,141.563 135.9,144.449 139.462,144.449 C143.023,144.449 145.908,141.563 145.908,138.001 C145.908,134.44 143.023,131.554 139.462,131.554 L139.462,131.554 Z M139.462,133.313 C142.047,133.313 144.149,135.415 144.149,138.001 C144.149,140.587 142.047,142.691 139.462,142.691 C136.876,142.691 134.772,140.587 134.772,138.001 C134.772,135.415 136.876,133.313 139.462,133.313 L139.462,133.313 Z\" id=\"Fill-42\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M139.46,132.472 L139.46,118.076\" id=\"Stroke-43\" stroke=\"#00CEB8\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M160.754,162.908 L248.671,162.908 M160.754,178.442 L248.671,178.442\" id=\"Stroke-44\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M133.014,159.685 C133.014,156.124 135.9,153.238 139.462,153.238 C143.023,153.238 145.908,156.124 145.908,159.685 C145.908,163.246 143.023,166.133 139.462,166.133 C135.9,166.133 133.014,163.246 133.014,159.685\" id=\"Fill-46\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M139.462,176.094 C135.9,176.094 133.014,178.981 133.014,182.542 C133.014,186.103 135.9,188.989 139.462,188.989 C143.023,188.989 145.908,186.103 145.908,182.542 C145.908,178.981 143.023,176.094 139.462,176.094 L139.462,176.094 Z M139.462,177.853 C142.047,177.853 144.149,179.956 144.149,182.542 C144.149,185.128 142.047,187.231 139.462,187.231 C136.876,187.231 134.772,185.128 134.772,182.542 C134.772,179.956 136.876,177.853 139.462,177.853 L139.462,177.853 Z\" id=\"Fill-47\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M139.46,177.013 L139.46,162.616\" id=\"Stroke-48\" stroke=\"#00CEB8\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M260.978,32.43 C260.978,34.696 259.141,36.533 256.875,36.533 L175.403,36.533 C173.138,36.533 171.301,34.696 171.301,32.43 L171.301,31.844 C171.301,29.579 173.138,27.741 175.403,27.741 L256.875,27.741 C259.141,27.741 260.978,29.579 260.978,31.844 L260.978,32.43\" id=\"Fill-49\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n                      <path d=\"M260.643,21.074 L117.132,21.074 C113.548,21.074 110.642,23.981 110.642,27.567 L110.642,204.482 C110.642,208.067 113.548,210.974 117.132,210.974 L260.643,210.974 C264.229,210.974 267.134,208.067 267.134,204.482 L267.134,27.567 C267.134,23.981 264.229,21.074 260.643,21.074 L260.643,21.074 Z M260.643,26.349 C261.313,26.349 261.858,26.895 261.858,27.567 L261.858,204.482 C261.858,205.153 261.313,205.698 260.643,205.698 L117.132,205.698 C116.462,205.698 115.917,205.153 115.917,204.482 L115.917,27.567 C115.917,26.895 116.462,26.349 117.132,26.349 L260.643,26.349 L260.643,26.349 Z\" id=\"Fill-50\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n                  </g>\n                </g>\n            </svg>\n          </div>\n          <h4>{{ 'Resources' | i18n }}</h4>\n          <p>{{ 'AboutResources' | i18n }}</p>\n          <div class=\"clearfix\">\n            <a class=\"create-user btn btn-primary\" type=\"button\" href=\"https://webmaker.org/resources\" autofocus>{{'VisitResources' | i18n }}</a>\n            <a href=\"https://webmaker.org/explore\" class=\"explore-link\">{{ 'ExploreWebmaker' | i18n }}</a>\n          </div>\n        </div>\n\n        <!-- simplified CTA -->\n        <div class=\"tool-desc\" ng-show=\"simpleCTA\">\n          <div class=\"clearfix\">\n            <button class=\"create-user btn btn-primary\" type=\"button\" href=\"#\" ng-click=\"close()\">{{ 'Lets Go!' | i18n }}</button>\n            <a href=\"https://webmaker.org/explore\" class=\"explore-link\">{{ 'ExploreWebmaker' | i18n }}</a>\n          </div>\n        </div>\n    </div>\n  </form>\n</div>\n", template_options),
  login: template.renderString("<div class=\"modal-header\">\n  <button ng-click=\"close()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n  <h3 class=\"modal-title\" ng-show=\"currentState === MODALSTATE.enterUid || currentState === MODALSTATE.enterPassword\">\n    <button href=\"#\" ng-click=\"close()\" class=\"modal-title-left btn-link\">{{ 'Cancel' | i18n }}</button>\n    <span class=\"modal-title-center\">{{ 'Sign in to Webmaker' | i18n }}</span>\n    <button ng-show=\"currentState === MODALSTATE.enterUid\"\n      ng-disabled=\"sendingRequest\"\n      ng-click=\"submitUid()\"\n      class=\"modal-title-right btn-link\">{{ 'Next' | i18n }}</button>\n    <button ng-show=\"currentState === MODALSTATE.enterPassword\"\n      class=\"modal-title-right btn-link\"\n      ng-disabled=\"sendingRequest\"\n      ng-click=\"user.password && submitPassword()\" tabindex=\"9\">{{ 'Submit' | i18n }}</button>\n  </h3>\n  <h3 class=\"modal-title\" ng-show=\"currentState === MODALSTATE.checkEmail || currentState === MODALSTATE.resetRequestSent || currentState === MODALSTATE.enterKey\">\n    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n    <span class=\"modal-title-center\">{{ 'checkEmail' | i18n }}</span>\n    <button\n      ng-show=\"currentState === MODALSTATE.enterKey\"\n      ng-disabled=\"sendingRequest\"\n      ng-click=\"user.key && submitKey()\"\n      tabindex=\"7\"\n      class=\"submit-userid modal-title-right btn-link\">{{ 'Next' | i18n }}</button>\n    <a\n      class=\"modal-title-right\"\n      ng-show=\"currentState === MODALSTATE.checkEmail\"\n      ng-click=\"enterKey()\"\n      tabindex=\"4\">{{ 'Next' | i18n }}</a>\n    <a href=\"#\"\n      ng-show=\"currentState === MODALSTATE.resetRequestSent\"\n      ng-click=\"close()\" class=\"modal-title-right\">{{ 'Done' | i18n }}</a>\n  </h3>\n</div>\n<div class=\"modal-body\">\n  <form class=\"form\" name=\"form.user\" novalidate>\n    <div class=\"alert alert-success\" ng-show=\"passwordWasReset && currentState === MODALSTATE.enterUid\" ng-bind-html=\"'Password Reset Success' | i18n\"></div>\n    <div class=\"alert alert-danger\" ng-show=\"expiredLoginLink && currentState === MODALSTATE.enterUid\" ng-bind-html=\"'Expired Login Link' | i18n\"></div>\n    <div class=\"alert alert-danger\" ng-show=\"form.user.$error.resetRequestFailed\" ng-bind-html=\"'resetRequestFailed' | i18n\"></div>\n\n    <!-- Enter uid -->\n    <div ng-show=\"currentState === MODALSTATE.enterUid;\">\n      <div class=\"form-group\">\n        <label for=\"uid\">{{ 'EmailOrUsername' | i18n }}</label>\n        <input name=\"uid\" class=\"form-control\" ng-model=\"user.uid\" autocomplete=\"on\" required tabindex=\"1\" autofocus=\"true\" focus-on=\"login-uid\" ng-keyup=\"$event.keyCode === 13 && !sendingRequest && submitUid()\">\n      </div>\n      <div class=\"alert alert-warning\" ng-show=\"form.user.$error.noAccount\" bind-trusted-html=\"'No account found for your uid' | i18n\"></div>\n      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidUid\" ng-bind-html=\"'That does not look like an email address or username' | i18n\"></div>\n      <div class=\"cta-links clearfix\">\n        <button class=\"submit-userid btn btn-primary hidden-xs-login\" type=\"button\" ng-disabled=\"sendingRequest\" ng-click=\"submitUid()\" tabindex=\"2\">{{ 'Sign in' | i18n }}</button>\n        <div ng-hide=\"disablePersona\">\n          <p class=\"align-left\">{{ 'or' | i18n }}</p>\n          <button type=\"button\" wm-persona-login class=\"btn btn-link\" ng-disabled=\"sendingRequest\" ng-click=\"usePersona();\" tabindex=\"3\">{{ 'log in with Persona' | i18n }}</button>\n        </div>\n      </div>\n    </div>\n    <!-- end enter uid -->\n\n    <!-- checkEmail begins -->\n    <div class=\"checkEmail\" ng-show=\"currentState === MODALSTATE.checkEmail\">\n      <div class=\"mailIcon clearfix\">\n        <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n        <svg width=\"94px\" height=\"94px\" viewBox=\"0 0 94 94\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n            <title>Mail Icon</title>\n            <desc></desc>\n            <defs></defs>\n            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n              <g id=\"AC4\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-126.000000, -92.000000)\">\n                <g id=\"Mail-Icon\" sketch:type=\"MSLayerGroup\" transform=\"translate(126.000000, 92.000000)\">\n                    <circle id=\"Oval-1\" fill=\"#3FB58E\" sketch:type=\"MSShapeGroup\" cx=\"47\" cy=\"47\" r=\"47\"></circle>\n                    <rect id=\"Rectangle-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" x=\"18\" y=\"27\" width=\"59\" height=\"41\" rx=\"3\"></rect>\n                    <path d=\"M21.0069321,27 C19.3462494,27 17.9900756,28.3368135 17.9778938,29.9953973 C17.9778938,29.9953973 17.9712616,30.8538058 17.9707031,31.0256348 C17.9688241,31.6037734 44.3277476,50.7739169 44.3277476,50.7739169 C45.6547338,51.7409595 47.981989,52.0459954 49.4771883,51.3411914 C49.4771883,51.3411914 52.3180561,50.8603167 59.4023438,44.0800781 C61.1871084,42.3719134 77.0395508,31.2178814 77.0395508,30.1010742 C77.0395508,29.644898 77.0391066,29.9910722 77.0391066,29.9910722 C77.0175086,28.3391486 75.6568485,27 73.9930679,27 L21.0069321,27 Z\" id=\"Rectangle-95\" fill=\"#F3F3F3\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M17.7634277,31.0032813 L46.7917565,50.276875 L75.0556641,31.3201563 L46.5782176,55.1035938 L17.7634277,31.0032813 Z\" id=\"Path-1\" fill=\"#D8D8D8\" sketch:type=\"MSShapeGroup\"></path>\n                </g>\n              </g>\n            </g>\n        </svg>\n        <p>{{ 'tokenMessage' | i18n }}</p>\n      </div>\n      <div class=\"enter-key hidden-xs-login\">\n        <a ng-click=\"enterKey()\" tabindex=\"4\" ng-bind-html=\"'Enter key' | i18n\"></a>\n      </div>\n      <hr>\n      <footer class=\"help-footer\">\n        <p ng-bind-html=\"'trouble with email' | i18n\"></p>\n      </footer>\n    </div>\n    <!-- checkEmail ends -->\n\n    <!-- enterToken begins -->\n    <div class=\"enterToken\" ng-show=\"currentState === MODALSTATE.enterKey\">\n      <div class=\"email-container\">\n        <div class=\"mailIcon text-center\">\n          <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n          <svg width=\"94px\" height=\"94px\" viewBox=\"0 0 94 94\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n              <title>Mail Icon</title>\n              <desc></desc>\n              <defs></defs>\n              <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n                  <g id=\"AC4\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-126.000000, -92.000000)\">\n                      <g id=\"Mail-Icon\" sketch:type=\"MSLayerGroup\" transform=\"translate(126.000000, 92.000000)\">\n                          <circle id=\"Oval-1\" fill=\"#3FB58E\" sketch:type=\"MSShapeGroup\" cx=\"47\" cy=\"47\" r=\"47\"></circle>\n                          <rect id=\"Rectangle-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" x=\"18\" y=\"27\" width=\"59\" height=\"41\" rx=\"3\"></rect>\n                          <path d=\"M21.0069321,27 C19.3462494,27 17.9900756,28.3368135 17.9778938,29.9953973 C17.9778938,29.9953973 17.9712616,30.8538058 17.9707031,31.0256348 C17.9688241,31.6037734 44.3277476,50.7739169 44.3277476,50.7739169 C45.6547338,51.7409595 47.981989,52.0459954 49.4771883,51.3411914 C49.4771883,51.3411914 52.3180561,50.8603167 59.4023438,44.0800781 C61.1871084,42.3719134 77.0395508,31.2178814 77.0395508,30.1010742 C77.0395508,29.644898 77.0391066,29.9910722 77.0391066,29.9910722 C77.0175086,28.3391486 75.6568485,27 73.9930679,27 L21.0069321,27 Z\" id=\"Rectangle-95\" fill=\"#F3F3F3\" sketch:type=\"MSShapeGroup\"></path>\n                          <path d=\"M17.7634277,31.0032813 L46.7917565,50.276875 L75.0556641,31.3201563 L46.5782176,55.1035938 L17.7634277,31.0032813 Z\" id=\"Path-1\" fill=\"#D8D8D8\" sketch:type=\"MSShapeGroup\"></path>\n                      </g>\n                  </g>\n              </g>\n          </svg>\n        </div>\n        <div class=\"key-group\">\n          <div class=\"form-group\">\n            <label for=\"key\" ng-show=\"!verified\">{{ 'Visit Email' | i18n }}</label>\n            <label for=\"key\" ng-show=\"verified\">{{ 'Verified Visit Email' | i18n }}</label>\n            <input ng-model=\"user.key\" name=\"key\" class=\"form-control\" type=\"text\" required tabindex=\"6\" focus-on=\"enter-key\" ng-keyup=\"$event.keyCode === 13 && user.key && !sendingRequest && submitKey()\">\n          </div>\n          <div class=\"alert alert-danger\" ng-show=\"form.user.$error.tokenSendFailed\" ng-bind-html=\"'problem sending token' | i18n\"></div>\n          <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidKey\" ng-bind-html=\"'incorrectToken' | i18n\"></div>\n          <div class=\"remember-me-token checkbox\">\n            <input id=\"remember-me-token\" ng-model=\"user.rememberMe\" type=\"checkbox\" name=\"rememberMe\" tabindex=\"7\">\n            <label for=\"remember-me-token\" tabindex=\"7\">\n              <div><span></span></div>\n              <span ng-bind-html=\"'Remember me for one year' | i18n\"></span>\n            </label>\n          </div>\n          <button type=\"button\" class=\"hidden-xs-login submit-userid btn btn-primary\" type=\"button\" ng-disabled=\"sendingRequest\" ng-click=\"user.key && submitKey()\" tabindex=\"8\">{{ 'Submit' | i18n }}</button>\n        </div>\n      </div>\n      <hr>\n      <footer class=\"help-footer\">\n        <p ng-bind-html=\"'trouble with email' | i18n\"></p>\n      </footer>\n    </div>\n    <!-- enterToken ends -->\n\n    <div class=\"enterPassword\" ng-show=\"currentState === MODALSTATE.enterPassword\">\n      <div class=\"password-container\">\n        <div class=\"form-group\">\n          <label for=\"password\">{{ 'Password' | i18n }}</label>\n          <input type=\"password\" class=\"form-control\" required name=\"password\" ng-model=\"user.password\" tabindex=\"9\" focus-on=\"enter-password\" ng-keyup=\"$event.keyCode === 13 && user.password && !sendingRequest && submitPassword()\">\n        </div>\n        <div class=\"alert alert-danger\" ng-show=\"form.user.$error.passwordSigninFailed\" ng-bind-html=\"'passLoginFailed' | i18n\"></div>\n        <div class=\"remember-me-password checkbox\">\n          <input id=\"remember-me-password\" ng-model=\"user.rememberMe\" type=\"checkbox\" name=\"rememberMe\" tabindex=\"10\">\n          <label for=\"remember-me-password\" tabindex=\"10\">\n            <div><span></span></div>\n            <span ng-bind-html=\"'Remember me for one year' | i18n\"></span>\n          </label>\n        </div>\n        <div class=\"cta-links clearfix\">\n          <button type=\"button\" class=\"submit-password btn btn-primary hidden-xs-login\" type=\"button\" ng-disabled=\"sendingRequest\" ng-click=\"user.password && submitPassword()\" tabindex=\"11\">{{ 'Submit' | i18n }}</button>\n          <p><a ng-click=\"requestReset()\">{{ 'Forgot your password?' | i18n }}</a></p>\n        </div>\n      </div>\n      <hr>\n      <footer class=\"help-footer\">\n        <p class=\"switch-back\">{{ 'you can switch to webmaker login' | i18n }}</p>\n      </footer>\n    </div>\n\n    <div class=\"resetRequestSent\" ng-show=\"currentState === MODALSTATE.resetRequestSent\">\n      <div class=\"mailIcon clearfix\">\n        <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n        <svg width=\"94px\" height=\"94px\" viewBox=\"0 0 94 94\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n            <title>Mail Icon</title>\n            <desc></desc>\n            <defs></defs>\n            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n              <g id=\"AC4\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-126.000000, -92.000000)\">\n                <g id=\"Mail-Icon\" sketch:type=\"MSLayerGroup\" transform=\"translate(126.000000, 92.000000)\">\n                    <circle id=\"Oval-1\" fill=\"#3FB58E\" sketch:type=\"MSShapeGroup\" cx=\"47\" cy=\"47\" r=\"47\"></circle>\n                    <rect id=\"Rectangle-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" x=\"18\" y=\"27\" width=\"59\" height=\"41\" rx=\"3\"></rect>\n                    <path d=\"M21.0069321,27 C19.3462494,27 17.9900756,28.3368135 17.9778938,29.9953973 C17.9778938,29.9953973 17.9712616,30.8538058 17.9707031,31.0256348 C17.9688241,31.6037734 44.3277476,50.7739169 44.3277476,50.7739169 C45.6547338,51.7409595 47.981989,52.0459954 49.4771883,51.3411914 C49.4771883,51.3411914 52.3180561,50.8603167 59.4023438,44.0800781 C61.1871084,42.3719134 77.0395508,31.2178814 77.0395508,30.1010742 C77.0395508,29.644898 77.0391066,29.9910722 77.0391066,29.9910722 C77.0175086,28.3391486 75.6568485,27 73.9930679,27 L21.0069321,27 Z\" id=\"Rectangle-95\" fill=\"#F3F3F3\" sketch:type=\"MSShapeGroup\"></path>\n                    <path d=\"M17.7634277,31.0032813 L46.7917565,50.276875 L75.0556641,31.3201563 L46.5782176,55.1035938 L17.7634277,31.0032813 Z\" id=\"Path-1\" fill=\"#D8D8D8\" sketch:type=\"MSShapeGroup\"></path>\n                </g>\n              </g>\n            </g>\n        </svg>\n        <p>{{ 'resetMessage' | i18n }}</p>\n      </div>\n      <hr>\n        <footer class=\"help-footer\">\n          <p class=\"switch-back\">{{ 'you can switch to webmaker login' | i18n }}</p>\n        </footer>\n    </div>\n  </form>\n</div>\n", template_options),
  reset: template.renderString("<div class=\"modal-header\">\n  <button ng-click=\"close()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n  <h3 class=\"modal-title\">\n    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n    <span class=\"modal-title-center\">{{ 'Reset Password' | i18n }}</span>\n    <button ng-click=\"submitResetRequest()\" ng-disabled=\"sendingRequest || !password.value || !password.confirmValue || !passwordsMatch || form.password.$error.passwordsMustMatch\" class=\"modal-title-right btn-link\" type=\"button\" tabindex=\"3\">{{ 'Submit' | i18n }}</button>\n  </h3>\n</div>\n<div class=\"modal-body clearfix\">\n  <form class=\"form\" name=\"form.password\" novalidate>\n\n    <div class=\"alert alert-danger\" ng-show=\"form.password.$error.passwordsMustMatch\" ng-bind-html=\"'passwords do not match' | i18n\"></div>\n    <div class=\"alert alert-danger\" ng-show=\"form.password.$error.weakPassword\" ng-bind-html=\"'Password too weak' | i18n\"></div>\n    <div class=\"alert alert-danger\" ng-show=\"form.password.$error.serverError\" ng-bind-html=\"'error setting password' | i18n\"></div>\n\n    <div>\n      <div class=\"form-group\">\n        <p class=\"password-label\">{{ 'Minimum password requirements' | i18n }}</p>\n        <ul class=\"list-unstyled password-strength\">\n          <li id=\"eight-chars\" ng-class=\"{valid: eightCharsState === 'valid', invalid: eightCharsState === 'invalid', 'default': eightCharsState === 'default'}\">{{ 'At least 8 characters' | i18n }}</li>\n          <li id=\"one-each-case\" ng-class=\"{valid: oneEachCaseState === 'valid', invalid: oneEachCaseState === 'invalid', 'default': oneEachCaseState === 'default'}\">{{ 'At least 1 upper and lower case character' | i18n }}</li>\n          <li id=\"one-number\" ng-class=\"{valid: oneNumberState === 'valid', invalid: oneNumberState === 'invalid', 'default': oneNumberState === 'default'}\">{{ 'At least 1 number' | i18n }}</li>\n        </ul>\n      </div>\n      <div class=\"form-group half-width\">\n        <label for=\"value\">{{ 'Set a Password' | i18n }}</label>\n        <input ng-model=\"password.value\" ng-change=\"checkPasswordStrength(); checkPasswordsMatch(false);\" ng-blur=\"checkPasswordStrength(true); checkPasswordsMatch(true);\" type=\"password\" class=\"form-control\" name=\"value\" autocomplete=\"off\" autofocus=\"true\" tabindex=\"1\" required>\n      </div>\n      <div class=\"form-group half-width\">\n        <label for=\"confirmValue\">{{ 'Confirm your password' | i18n }}</label>\n        <input ng-model=\"password.confirmValue\" ng-change=\"checkPasswordsMatch(false)\" ng-blur=\"checkPasswordsMatch(true)\"  type=\"password\" class=\"form-control\" name=\"confirmValue\" autocomplete=\"off\" tabindex=\"2\" required>\n      </div>\n      <div class=\"cta-links clearfix\">\n        <button ng-click=\"submitResetRequest()\" ng-disabled=\"sendingRequest || !password.value || !password.confirmValue || !passwordsMatch || form.password.$error.passwordsMustMatch\" class=\"reset-password btn btn-primary hidden-xs-login\" type=\"button\" tabindex=\"3\">{{ 'Submit' | i18n }}</button>\n      </div>\n    </div>\n  </form>\n</div>\n", template_options),
  wrapper: "<div class=\"modal-backdrop fade in\"></div>\n<div class=\"modal fade in\" style=\"display: block\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\"></div>\n  </div>\n</div>\n"
};

var _create_modal_fragment = function (template) {
  var range = document.createRange();
  range.selectNode(document.body);
  var modal_fragment = range.createContextualFragment(ui.wrapper);
  modal_fragment.querySelector('.modal-content').appendChild(range.createContextualFragment(template));

  return modal_fragment;
};

var _translate_ng_html_expressions = function (modal_fragment) {
  var elements = modal_fragment.querySelectorAll('[ng-bind-html]');
  var i = 0;
  for (i = 0; i < elements.length; i++) {
    elements[i].innerHTML = expressions.compile(elements[i].getAttribute('ng-bind-html'))();
  }

  elements = modal_fragment.querySelectorAll('[bind-trusted-html]');
  for (i = 0; i < elements.length; i++) {
    elements[i].innerHTML = expressions.compile(elements[i].getAttribute('bind-trusted-html'))();
  }
};

var _run_expressions = function (modal, scope) {
  var elements = modal.querySelectorAll('[ng-hide],[ng-show],[ng-disabled],[ng-class]');
  var ng_class;

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute('ng-disabled')) {
      if (expressions.compile(elements[i].getAttribute('ng-disabled'))(scope)) {
        elements[i].setAttribute('disabled', true);
      } else {
        elements[i].removeAttribute('disabled');
      }
    }

    if (elements[i].getAttribute('ng-hide')) {
      if (expressions.compile(elements[i].getAttribute('ng-hide'))(scope)) {
        elements[i].classList.add('hide');
      } else {
        elements[i].classList.remove('hide');
      }
    }

    if (elements[i].getAttribute('ng-show')) {
      if (expressions.compile(elements[i].getAttribute('ng-show'))(scope)) {
        elements[i].classList.remove('hide');
      } else {
        elements[i].classList.add('hide');
      }
    }

    if (elements[i].getAttribute('ng-class')) {
      ng_class = expressions.compile(elements[i].getAttribute('ng-class'))(scope);
      /*jshint -W083 */
      Object.keys(ng_class).forEach(function (klass) {
        if (ng_class[klass]) {
          elements[i].classList.add(klass);
        } else {
          elements[i].classList.remove(klass);
        }
      });
      /*jshint +W083 */
    }
  }
};

var _open_modal = function (modal_fragment) {
  document.body.appendChild(modal_fragment);
};

var _close_modal = function () {
  document.body.removeChild(document.querySelector('body > div.modal-backdrop'));
  document.body.removeChild(document.querySelector('body > div.modal'));
};

var _attach_close = function (modal) {
  _each(modal, "[ng-click='close()']", function (i, el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      _close_modal();
    }, false);
  });
};

var WebmakerLogin = function WebmakerLogin(options) {
  var wmLogin = this.wmLogin = new wmLoginCore(options);
  this.showCTA = !! options.showCTA;
  this.disablePersona = !! options.disablePersona;
  EventEmitter.call(this);

  var query = url.parse(window.location.href, true).query;
  if (query.uid && query.resetCode) {
    this.request_password_reset(query.uid, query.resetCode);
  } else if (query.uid && query.token) {
    wmLogin.instantLogin(query.uid, query.token, query.validFor);
    wmLogin.on('signedIn', function (user) {
      this.emit('login', user);
    }.bind(this));
    wmLogin.on('signinFailed', function (uid) {
      console.log("Instant signin failed for uid %s", uid);
      this.login(uid, {
        expired: true
      });
    }.bind(this));
  }

  wmLogin.on('verified', function (user) {
    this.emit('verified', user);
  }.bind(this));

  wmLogin.on('error', function (err) {
    this.emit('error', err);
  }.bind(this));

  wmLogin.verify();
};

util.inherits(WebmakerLogin, EventEmitter);

WebmakerLogin.prototype.create = function (email_hint, username_hint, agreeToTerms_hint) {
  var controller = this.wmLogin.joinWebmaker(this.showCTA);
  var scope = {
    MODALSTATE: {
      inputEmail: 0,
      inputUsername: 1,
      welcome: 2
    },
    currentState: -1,
    form: {
      user: {
        $error: {}
      }
    },
    user: {},
    sendingRequest: false,
    welcomeModalIdx: -1
  };

  var modal_fragment = _create_modal_fragment(ui.create);
  _translate_ng_html_expressions(modal_fragment);

  var usernameWithUrl = modal_fragment.querySelector('.username-with-url');

  if (email_hint) {
    scope.user.email = email_hint;
    modal_fragment.querySelector('input[name="email"]').value = email_hint;
  }
  if (username_hint) {
    scope.user.username = username_hint;
    modal_fragment.querySelector('input[name="username"]').value = username_hint;
    usernameWithUrl.textContent = scope.user.username;
  }

  scope.user.agree = agreeToTerms_hint;

  controller.on('sendingRequest', function (state) {
    scope.sendingRequest = state;
    _run_expressions(modal, scope);
  });

  controller.on('displayEmailInput', function () {
    scope.currentState = scope.MODALSTATE.inputEmail;
    _run_expressions(modal, scope);
    modal.querySelector('input[focus-on="create-user-email"]').focus();
    if (scope.user.email !== undefined && controller.validateEmail(scope.user.email) && scope.user.agree !== undefined) {
      controller.submitEmail(scope.user.agree);
      if (scope.user.agree) {
        scope.skippedEmail = "true";
        controller.validateUsername(scope.user.username);
      }
    }
  });

  controller.on('displayUsernameInput', function () {
    scope.currentState = scope.MODALSTATE.inputUsername;
    _run_expressions(modal, scope);
    modal.querySelector('input[focus-on="create-user-username"]').focus();
  });

  controller.on('displayWelcome', function (user, showCTA) {
    this.emit('login', user);
    if (showCTA) {
      scope.welcomeModalIdx = Math.floor(Math.random() * 2);
    } else {
      scope.simpleCTA = true;
    }
    scope.currentState = scope.MODALSTATE.welcome;
    _run_expressions(modal, scope);
  }.bind(this));

  controller.on('displayAlert', function (alertId) {
    scope.form.user.$error[alertId] = true;
    _run_expressions(modal, scope);
  });

  controller.on('hideAlert', function (alertId) {
    scope.form.user.$error[alertId] = false;
    _run_expressions(modal, scope);
  });

  modal_fragment.querySelector('a[ng-click="switchToSignin();"]').addEventListener('click', function (event) {
    event.preventDefault();
    _close_modal();
    setTimeout(function () {
      this.login(scope.user.email);
    }.bind(this), 0);
  }.bind(this));

  modal_fragment.querySelector('input[name="email"]').addEventListener('keyup', function (e) {
    scope.user.email = e.target.value;

    if (e.target.value) {
      controller.validateEmail(scope.user.email);
    }
  });

  modal_fragment.querySelector('input[name="agree"]').addEventListener('change', function (e) {
    scope.user.agree = e.target.checked;
    controller.agreeToTermsChanged(scope.user.agree);
    _run_expressions(modal, scope);
  });

  modal_fragment.querySelector('input[name="subscribeToList"]').addEventListener('change', function (e) {
    scope.user.subscribeToList = e.target.checked;
  });

  _each(modal_fragment, 'button[ng-click="submitEmail()"]', function (i, el) {
    el.addEventListener('click', function (e) {
      controller.submitEmail(scope.user.agree);
    });
  });

  modal_fragment.querySelector('input[name="username"]').addEventListener('input', function (e) {
    scope.user.username = e.target.value;
    controller.validateUsername(scope.user.username);
    usernameWithUrl.textContent = scope.user.username;
  });

  _each(modal_fragment, 'button[ng-click="submitUser()"]', function (i, el) {
    el.addEventListener('click', function () {
      controller.submitUser(scope.user);
    });
  });

  _run_expressions(modal_fragment, scope);
  _open_modal(modal_fragment);

  var modal = document.querySelector('body > div.modal');
  _attach_close(modal);
  document.querySelector('body > div.modal > .modal-dialog').addEventListener("click", function (e) {
    e.stopPropagation();
  });
  document.querySelector('body > div.modal').addEventListener("click", function () {
    _close_modal();
  });

  controller.start();
};

WebmakerLogin.prototype.login = function (uid_hint, options) {
  options = options || {};
  var controller = this.wmLogin.signIn();
  var scope = {
    MODALSTATE: {
      enterUid: 0,
      checkEmail: 1,
      enterKey: 2,
      enterPassword: 3,
      resetRequestSent: 4
    },
    currentState: 0,
    form: {
      user: {
        $error: {}
      }
    },
    user: {},
    passwordWasReset: !! options.password_was_reset,
    expiredLoginLink: !! options.expired,
    sendingRequest: false,
    disablePersona: this.disablePersona
  };

  var modal_fragment = _create_modal_fragment(ui.login);
  _translate_ng_html_expressions(modal_fragment);

  if (uid_hint) {
    scope.user.uid = uid_hint;
    modal_fragment.querySelector('input[name="uid"]').value = uid_hint;
  }

  controller.on('sendingRequest', function (state) {
    scope.sendingRequest = state;
    _run_expressions(modal, scope);
  });

  controller.on('displayEnterUid', function () {
    scope.currentState = scope.MODALSTATE.enterUid;
    _run_expressions(modal, scope);
    modal.querySelector('input[focus-on="login-uid"]').focus();
  });

  controller.on('displayEnterPassword', function () {
    scope.currentState = scope.MODALSTATE.enterPassword;
    _run_expressions(modal, scope);
    modal.querySelector('input[focus-on="enter-password"]').focus();
  });

  controller.on('displayEnterKey', function (verified) {
    scope.verified = verified;
    scope.currentState = scope.MODALSTATE.enterKey;
    _run_expressions(modal, scope);
    modal.querySelector('input[focus-on="enter-key"]').focus();
  });

  controller.on('displayCheckEmail', function () {
    scope.currentState = scope.MODALSTATE.checkEmail;
    _run_expressions(modal, scope);
  });

  controller.on('displayResetSent', function () {
    scope.currentState = scope.MODALSTATE.resetRequestSent;
    _run_expressions(modal, scope);
  });

  controller.on('displayAlert', function (alertId) {
    scope.form.user.$error[alertId] = true;
    _run_expressions(modal, scope);
  });

  controller.on('hideAlert', function (alertId) {
    scope.form.user.$error[alertId] = false;
    _run_expressions(modal, scope);
  });

  controller.on('signedIn', function (user) {
    this.emit('login', user);
    _close_modal();
  }.bind(this));

  modal_fragment.querySelector('input[name="uid"]').addEventListener('input', function (e) {
    scope.user.uid = e.target.value;
    _run_expressions(modal, scope);
  });

  _each(modal_fragment, 'input[name="rememberMe"]', function (i, el) {
    el.addEventListener('change', function (e) {
      scope.user.rememberMe = e.target.checked;
      _run_expressions(modal, scope);
    });
  });

  _each(modal_fragment, 'button[ng-click="submitUid()"]', function (i, el) {
    el.addEventListener('click', function () {
      controller.submitUid(scope.user.uid, window.location.pathname);
    });
  });
  _each(modal_fragment, 'input[name="key"]', function (i, el) {
    el.addEventListener('input', function (e) {
      scope.user.key = e.target.value;
      _run_expressions(modal, scope);
    });
  });
  _each(modal_fragment, 'a[ng-click="enterKey()"]', function (i, el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      controller.displayEnterKey();
    });
  });

  _each(modal_fragment, 'button[ng-click="user.key && submitKey()"]', function (i, el) {
    el.addEventListener('click', function () {
      controller.verifyKey(scope.user.uid, scope.user.key, scope.user.rememberMe);
    });
  });

  modal_fragment.querySelector('input[name="password"]').addEventListener('input', function (e) {
    scope.user.password = e.target.value;
    _run_expressions(modal, scope);
  });

  _each(modal_fragment, 'button[ng-click="user.password && submitPassword()"]', function (i, el) {
    el.addEventListener('click', function () {
      controller.verifyPassword(scope.user.uid, scope.user.password, scope.user.rememberMe);
    });
  });

  modal_fragment.querySelector('a[ng-click="requestReset()"]').addEventListener('click', function (event) {
    event.preventDefault();
    controller.requestReset(scope.user.uid);
  });

  modal_fragment.querySelector('a[ng-click="switchToSignup();"]').addEventListener('click', function (event) {
    event.preventDefault();
    _close_modal();
    setTimeout(function () {
      var uid = scope.user.uid;
      var type = controller.getUidType(uid);
      var email = type === 'email' ? uid : '';
      var username = type === 'username' ? uid : '';

      this.create(email, username);
    }.bind(this), 0);
  }.bind(this));

  modal_fragment.querySelector('button[ng-click="usePersona();"]').addEventListener('click', function (event) {
    event.preventDefault();
    _close_modal();
    setTimeout(function () {
      this._persona_login();
    }.bind(this), 0);
  }.bind(this));

  modal_fragment.querySelector('input[ng-keyup="$event.keyCode === 13 && !sendingRequest && submitUid()"]').addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && !scope.sendingRequest) {
      controller.submitUid(scope.user.uid, window.location.pathname);
    }
  }.bind(this));

  modal_fragment.querySelector('input[ng-keyup="$event.keyCode === 13 && user.key && !sendingRequest && submitKey()"]').addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && scope.user.key && !scope.sendingRequest) {
      controller.verifyKey(scope.user.uid, scope.user.key, scope.user.rememberMe);
    }
  }.bind(this));

  modal_fragment.querySelector('input[ng-keyup="$event.keyCode === 13 && user.password && !sendingRequest && submitPassword()"]').addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && scope.user.password && !scope.sendingRequest) {
      controller.verifyPassword(scope.user.uid, scope.user.password, scope.user.rememberMe);
    }
  }.bind(this));

  _run_expressions(modal_fragment, scope);
  _open_modal(modal_fragment);
  var modal = document.querySelector('body > div.modal');
  _attach_close(modal);
  document.querySelector('body > div.modal > .modal-dialog').addEventListener("click", function (e) {
    e.stopPropagation();
  });
  document.querySelector('body > div.modal').addEventListener("click", function () {
    _close_modal();
  });

  controller.start();
};

WebmakerLogin.prototype._persona_login = function () {
  var controller = this.wmLogin.personaLogin();

  controller.on('signedIn', function (user) {
    this.emit('login', user);
  }.bind(this));

  controller.on('newUser', function (email) {
    this.create(email);
  }.bind(this));

  controller.authenticate();
};

WebmakerLogin.prototype.request_password_reset = function (uid, token) {
  var controller = this.wmLogin.resetPassword();
  var scope = {
    form: {
      password: {
        $error: {}
      }
    },
    password: {},
    sendingRequest: false
  };

  var modal_fragment = _create_modal_fragment(ui.reset);
  _translate_ng_html_expressions(modal_fragment);

  controller.on('sendingRequest', function (state) {
    scope.sendingRequest = state;
    _run_expressions(modal, scope);
  });

  controller.on('displayAlert', function (alertId) {
    scope.form.password.$error[alertId] = true;
    _run_expressions(modal, scope);
  });

  controller.on('hideAlert', function (alertId) {
    scope.form.password.$error[alertId] = false;
    _run_expressions(modal, scope);
  });

  controller.on('checkConfirmPassword', function (status) {
    scope.passwordsMatch = status;
    _run_expressions(modal, scope);
  });

  controller.on('passwordCheckResult', function (result, blur) {
    if (!result) {
      scope.eightCharsState = scope.oneEachCaseState = scope.oneNumberState = 'default';
      scope.isValidPassword = false;
      return;
    }

    scope.eightCharsState = !result.lengthValid ? 'invalid' : blur ? 'valid' : '';
    scope.oneEachCaseState = !result.caseValid ? 'invalid' : blur ? 'valid' : '';
    scope.oneNumberState = !result.digitValid ? 'invalid' : blur ? 'valid' : '';
    scope.isValidPassword = result.lengthValid && result.caseValid && result.digitValid;

    _run_expressions(modal, scope);
  });

  controller.on('resetSucceeded', function () {
    _close_modal();
    setTimeout(function () {
      this.login(uid, {
        password_was_reset: true
      });
    }.bind(this), 0);
  }.bind(this));

  modal_fragment.querySelector('input[name="value"]').addEventListener('input', function (e) {
    scope.password.value = e.target.value;
    controller.checkPasswordStrength(scope.password.value, false);
  });

  modal_fragment.querySelector('input[name="value"]').addEventListener('blur', function (e) {
    scope.password.value = e.target.value;
    controller.checkPasswordStrength(scope.password.value, true);
  });

  modal_fragment.querySelector('input[name="confirmValue"]').addEventListener('input', function (e) {
    scope.password.confirmValue = e.target.value;
    controller.passwordsMatch(scope.password.value, scope.password.confirmValue, false);
  });

  modal_fragment.querySelector('input[name="confirmValue"]').addEventListener('blur', function (e) {
    scope.password.confirmValue = e.target.value;
    controller.passwordsMatch(scope.password.value, scope.password.confirmValue, true);
  });

  modal_fragment.querySelector('button[ng-click="submitResetRequest()"]').addEventListener('click', function (e) {
    controller.submitResetRequest(uid, token, scope.password.value);
  });

  _run_expressions(modal_fragment, scope);
  _open_modal(modal_fragment);
  var modal = document.querySelector('body > div.modal');
  _attach_close(modal);
  document.querySelector('body > div.modal > .modal-dialog').addEventListener("click", function (e) {
    e.stopPropagation();
  });
  document.querySelector('body > div.modal').addEventListener("click", function () {
    _close_modal();
  });
};

WebmakerLogin.prototype.logout = function () {
  var controller = this.wmLogin.logout();

  controller.on('loggedOut', function () {
    this.emit('logout');
  }.bind(this));

  controller.logout();
};

window.WebmakerLogin = WebmakerLogin;
module.exports = WebmakerLogin;

},{"../../locale/en_US/webmaker-login.json":1,"../core":19,"angular-expressions":2,"events":6,"nunjucks":16,"url":13,"util":15}],19:[function(require,module,exports){
var state = require('./state');
var LoginAPI = require('./loginAPI');
var Emitter = require('./state/emitter');

module.exports = function WebmakerLoginCore(options) {
  var loginAPI = new LoginAPI(options);
  var emitter = new Emitter();

  function verify() {
    loginAPI.verify(function (err, resp, body) {
      if (err) {
        return emitter.emit('error', err);
      }

      try {
        body = JSON.parse(body);
      } catch (ex) {
        return emitter.emit('error', 'could not parse json from verify route');
      }

      emitter.emit('verified', body.user);
    });
  }

  window.addEventListener('focus', verify);

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    joinWebmaker: function (showCTA) {
      return new state.JoinController(loginAPI, !! showCTA);
    },
    signIn: function () {
      return new state.SignInController(loginAPI);
    },
    resetPassword: function () {
      return new state.ResetController(loginAPI);
    },
    personaLogin: function () {
      return new state.PersonaController(loginAPI);
    },
    logout: function () {
      return new state.LogoutController(loginAPI);
    },
    instantLogin: function (uid, password, validFor) {
      loginAPI.verifyKey(uid, password, validFor, function (err, resp, body) {
        if (err || resp.status !== 200 || !body.user) {
          return emitter.emit('signinFailed', uid);
        }

        emitter.emit('signedIn', body.user);
      });
    },
    verify: verify
  };
};

},{"./loginAPI":20,"./state":24,"./state/emitter":23}],20:[function(require,module,exports){
var request = require('browser-request');

module.exports = function LoginAPI(options) {
  options = options || {};
  options.paths = options.paths || {};

  var refferals = require('./referrals.js')();
  var loginUrls = require('./loginUrls.js')(options);

  var withCredentials = options.withCredentials === false ? false : true;
  var timeout = (options.timeout || 10) * 1000;
  var headers = {
    'X-CSRF-Token': options.csrfToken
  };
  var audience = options.audience || (window.location.protocol + '//' + window.location.host);

  function doRequest(uri, payload, callback) {
    request({
      method: 'post',
      uri: uri,
      timeout: timeout,
      withCredentials: withCredentials,
      headers: headers,
      json: payload
    }, callback);
  }

  function uidExists(uid, callback) {
    doRequest(loginUrls.uidExists, {
      uid: uid
    }, callback);
  }

  function checkUsername(username, callback) {
    doRequest(loginUrls.checkUsername, {
      username: username
    }, callback);
  }

  function createUser(user, callback) {
    user.referrer = refferals.refValue();
    doRequest(loginUrls.createUser, {
      user: user,
      audience: audience
    }, function () {
      refferals.clearReferrerCookie();
      callback.apply(null, arguments);
    });
  }

  function sendLoginKey(uid, path, callback) {
    doRequest(loginUrls.request, {
      uid: uid,
      path: path
    }, callback);
  }

  function verifyKey(uid, key, validFor, callback) {
    doRequest(loginUrls.authenticateToken, {
      uid: uid,
      token: key,
      validFor: validFor,
      user: {
        referrer: refferals.refValue()
      }
    }, function () {
      refferals.clearReferrerCookie();
      callback.apply(null, arguments);
    });
  }

  function verifyPassword(uid, password, validFor, callback) {
    doRequest(loginUrls.verifyPassword, {
      uid: uid,
      password: password,
      validFor: validFor,
      user: {
        referrer: refferals.refValue()
      }
    }, function () {
      refferals.clearReferrerCookie();
      callback.apply(null, arguments);
    });
  }

  function requestReset(uid, callback) {
    doRequest(loginUrls.requestResetCode, {
      uid: uid
    }, callback);
  }

  function resetPassword(uid, resetCode, password, callback) {
    doRequest(loginUrls.resetPassword, {
      uid: uid,
      resetCode: resetCode,
      newPassword: password
    }, callback);
  }

  function personaLogin(assertion, callback) {
    doRequest(loginUrls.authenticate, {
      assertion: assertion,
      audience: audience,
      user: {
        referrer: refferals.refValue()
      }
    }, callback);
  }

  function logout(callback) {
    doRequest(loginUrls.logout, null, callback);
  }

  function verify(callback) {
    doRequest(loginUrls.verify, null, callback);
  }

  return {
    uidExists: uidExists,
    checkUsername: checkUsername,
    createUser: createUser,
    sendLoginKey: sendLoginKey,
    verifyKey: verifyKey,
    verifyPassword: verifyPassword,
    requestReset: requestReset,
    resetPassword: resetPassword,
    personaLogin: personaLogin,
    logout: logout,
    verify: verify
  };
};

},{"./loginUrls.js":21,"./referrals.js":22,"browser-request":4}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"cookie-js":5}],23:[function(require,module,exports){
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

},{"events":6}],24:[function(require,module,exports){
module.exports = {
  JoinController: require('./join.js'),
  SignInController: require('./signin.js'),
  ResetController: require('./reset.js'),
  PersonaController: require('./persona.js'),
  LogoutController: require('./logout.js')
};

},{"./join.js":25,"./logout.js":26,"./persona.js":27,"./reset.js":28,"./signin.js":29}],25:[function(require,module,exports){
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

},{"../validation":30,"./emitter.js":23,"webmaker-analytics":17}],26:[function(require,module,exports){
var Emitter = require('./emitter.js');
var analytics = require('webmaker-analytics');

module.exports = function (loginAPI) {
  var emitter = new Emitter();

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
    logout: function () {
      loginAPI.logout(function (err, resp, body) {
        if (err || resp.status !== 200) {
          return emit('logoutFailed');
        }
        analytics.event('Webmaker Logout Clicked');
        emit('loggedOut');
      });
    }
  };
};

},{"./emitter.js":23,"webmaker-analytics":17}],27:[function(require,module,exports){
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

},{"./emitter.js":23,"webmaker-analytics":17}],28:[function(require,module,exports){
var Emitter = require('./emitter.js');
var validation = require('../validation');
var analytics = require('webmaker-analytics');

module.exports = function ResetController(loginApi) {
  var emitter = new Emitter();

  var RESET_ALERTS = {
    passwordsMustMatch: 'passwordsMustMatch',
    weakPassword: 'weakPassword',
    serverError: 'serverError'
  };

  var RESET_EVENTS = {
    sendingRequest: 'sendingRequest',
    displayAlert: 'displayAlert',
    hideAlert: 'hideAlert',
    resetSucceeded: 'resetSucceeded',
    passwordCheckResult: 'passwordCheckResult',
    checkConfirmPassword: 'checkConfirmPassword'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  function setRequestState(state) {
    emit(RESET_EVENTS.sendingRequest, state);
  }

  function displayAlert(alertId) {
    emit(RESET_EVENTS.displayAlert, alertId);
  }

  function hideAlert(alertId) {
    emit(RESET_EVENTS.hideAlert, alertId);
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    passwordsMatch: function (password, confimValue, blur) {
      if (validation.passwordsMatch(password, confimValue)) {
        hideAlert(RESET_ALERTS.passwordsMustMatch);
        emit(RESET_EVENTS.checkConfirmPassword, true);
      } else {
        if (blur) {
          displayAlert(RESET_ALERTS.passwordsMustMatch);
        }
        emit(RESET_EVENTS.checkConfirmPassword, false);
      }
    },
    checkPasswordStrength: function (password, blur) {
      emit(RESET_EVENTS.passwordCheckResult, validation.checkPasswordStrength(password), blur);
    },
    submitResetRequest: function (uid, resetCode, password) {
      hideAlert(RESET_ALERTS.serverError);
      hideAlert(RESET_ALERTS.weakPassword);
      setRequestState(true);
      loginApi.resetPassword(uid, resetCode, password, function (err, resp, body) {
        setRequestState(false);
        if (err || resp.status !== 200) {
          if (resp.status === 400) {
            return displayAlert(RESET_ALERTS.weakPassword);
          }
          return displayAlert(RESET_ALERTS.serverError);
        }

        analytics.event('Webmaker Password Reset Succeeded');

        emit(RESET_EVENTS.resetSucceeded);
      });
    }
  };
};

},{"../validation":30,"./emitter.js":23,"webmaker-analytics":17}],29:[function(require,module,exports){
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

},{"../validation":30,"./emitter.js":23,"webmaker-analytics":17}],30:[function(require,module,exports){
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

},{}]},{},[18]);
