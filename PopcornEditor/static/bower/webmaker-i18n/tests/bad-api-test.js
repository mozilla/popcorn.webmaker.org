var should = require('should'),
    fs = require("fs"),
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
    var i18n = require("../");

describe("Bad API Tests", function (done) {
  it("Setup addLocaleObject() before middleware()", function () {
    should(function () {
      i18n.addLocaleObject({'en-US': { "myName": "Ali Al Dallal"}}, function(err, res) {
        if(res) {
          i18n.getStrings("en-US").should.have.property('myName');
        }
      });
    }).throw ();
  });
});
