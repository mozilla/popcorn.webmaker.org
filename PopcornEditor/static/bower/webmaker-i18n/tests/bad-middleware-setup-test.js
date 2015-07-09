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

describe("with bad invocation of the middleware", function (done) {
  it("should throw an error when no option passed", function () {
    should(function () {
      i18n.middleware();
    }).throw ();
  });

  it("should throw an error when only default_lang passed", function () {
    should(function () {
      i18n.middleware({
        default_lang: 'en-US'
      });
    }).throw ();
  });

  it("should throw an error when no path to translation_directory specified", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      delete localOptions.translation_directory;
      i18n.middleware(localOptions);
    }).throw ();
  });

  it("should throw an error when empty array of supported_languages passed", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      localOptions.supported_languages.length = 0;
      i18n.middleware(localOptions);
    }).throw ();
  });

  it("should throw an error when only path to translation_directory passed", function () {
    should(function () {
      i18n.middleware({
        translation_directory: translationPath
      });
    }).throw ();
  });

  it("should throw an error when unknown default_lang passed", function () {
    should(function () {
      _.merge(localOptions, middlewareOptions);
      localOptions.default_lang = 'unknown';
      i18n.middleware(localOptions);
    }).throw ();
  });
});
