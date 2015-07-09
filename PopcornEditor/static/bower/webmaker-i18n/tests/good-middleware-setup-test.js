var i18n = require("../");
var should = require('should');
var _ = require("lodash"),
path = require("path"),
translationPath = path.join(__dirname, '../example/locale'),
middlewareOptions = {
  default_lang: 'en-US',
  supported_languages: ['en-US', 'en-CA'],
  translation_directory: translationPath,
  mappings: {
    'en': 'en-US'
  }
},
localOptions = {};

describe("with good invocation of the middleware", function (done) {

  it("should not throw when passed default options data", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      i18n.middleware(localOptions);
    }).not.throw ();
  });

  it("should not throw when passed default options without default_lang", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      delete localOptions.default_lang;
      i18n.middleware(localOptions);
    }).not.throw ();
  });

  it("should not throw when passed default options without mappings", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      delete localOptions.mappings;
      i18n.middleware(localOptions);
    }).not.throw ();
  });

  it("should not throw when passed default options with 'en-CA' as default_lang", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      localOptions.default_lang = 'en-CA';
      i18n.middleware(localOptions);
    }).not.throw ();
  });

  it("should not throw when passed default options with '*' enabled in supported_languages", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      localOptions.supported_languages = ['*'];
      i18n.middleware(localOptions);
    }).not.throw ();
  });
});
