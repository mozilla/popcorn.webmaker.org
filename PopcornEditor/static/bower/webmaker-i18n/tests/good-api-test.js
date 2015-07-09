
var i18n = require("../");
var should = require('should');
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
localOptions = {},
request = require("superagent"),
fs = require("fs"),
server = require('./server')(i18n);

describe("API Tests", function () {

  before(function (done) {
    i18n.middleware(middlewareOptions);
    server.listen(8000, done);
  });
  after(function (done) {
    server.close(done);
  });

  it("getStrings() should return translated object for the specified languages", function () {
    should(function () {
      i18n.getStrings('en-CA').should.be.an.instanceOf(Object)
        .and.not.empty;
    }).not.throw ();
  });

  it("stringsRoute() should return json object when request url: (http://localhost:8000/strings/en-US)", function (done) {
    should(function () {
      request.get("http://localhost:8000/strings/en-US", function (res) {
        res.body.should.be.an.instanceof(Object).and.not.empty;
        done();
      });
    }).not.throw ();
  });

  it("getLocales() should return list of locales in array format", function () {
    should(function () {
      i18n.getLocales().should.be.an.instanceOf(Array)
        .and.include('en_US', 'en')
        .and.not.include('en-US');
    }).not.throw ();
  });

  it("getLanguages() should return list of languages in array format", function () {
    should(function () {
      i18n.getLanguages().should.be.an.instanceOf(Array)
        .and.include('en-US', 'en')
        .and.not.include('en_US');
    }).not.throw ();
  });

  it("getSupportLanguages() should list of languages in an array format based on the lang-Countries", function () {
    should(function () {
      i18n.getSupportLanguages().should.be.an.instanceOf(Array)
        .and.include('en-US')
        .and.not.include('en');
    }).not.throw ();
  });

  it("Named: format('%(a)s %(b)s', {a: 'Hello', b: 'World'}) without boolean set and should return 'Hello World'", function () {
    should(function () {
      i18n.format('%(a)s %(b)s', {
        a: 'Hello',
        b: 'World'
      })
        .should.eql("Hello World");
    }).not.throw ();
  });

  it("Named: format('%(a)s %(b)s', {a: 'Hello', b: 'World'}, true) with boolean set and should return 'Hello World'", function () {
    should(function () {
      i18n.format('%(a)s %(b)s', {
        a: 'Hello',
        b: 'World'
      }, true)
        .should.eql("Hello World");
    }).not.throw ();
  });

  it("Positional: format('%s %s', ['Hello', 'World']) should return 'Hello World'", function () {
    should(function () {
      i18n.format("%s %s", ["Hello", "World"])
        .should.eql("Hello World");
    }).not.throw ();
  });

  it("languageFrom() should return language code en_US => en-US", function () {
    should(function () {
      i18n.languageFrom('en_US').should.eql('en-US');
    }).not.throw ();
  });

  it("localeFrom() should return locale code en-US => en_US", function () {
    should(function () {
      i18n.localeFrom('en-US').should.eql('en_US');
    }).not.throw ();
  });

  it("languageNameFor('en-US') and languageNameFor('th-TH') should return native language name", function () {
    should(function () {
      i18n.languageNameFor('en-US').should.eql('English (US)');
      i18n.languageNameFor('th-TH').should.eql('ภาษาไทย');
    }).not.throw ();
  });

  it("languageEnglishName('en-US') and languageEnglishName('th-TH') should return English language name", function () {
    should(function () {
      i18n.languageEnglishName('en-US').should.eql('English (US)');
      i18n.languageEnglishName('th-TH').should.eql('Thai');
    }).not.throw ();
  });

  it("langToMomentJSLang('en-US') and langToMomentJSLang('th-TH') should return moment language code 'en-US' => 'en'", function () {
    should(function () {
      i18n.langToMomentJSLang('en-US').should.eql('en');
      i18n.langToMomentJSLang('th-TH').should.eql('th');
    }).not.throw ();
  });

  it("addLocaleObject({ 'en-US': { keys:'somevalue'}}, cb)", function () {
    should(function () {
      i18n.addLocaleObject({'en-US': { "myName": "Ali Al Dallal"}}, function(err, res) {
        if(res) {
          i18n.getStrings("en-US").should.have.property('myName');
        }
      });
    }).not.throw ();
  });

  it("readLangDir(pathToDir, langList) should return a clean list of supported_languages", function () {
    should(function () {
      var list = ['en_US', 'en_CA', '.DS_Store'];
      var pathToDir = path.join(__dirname, "../example/locale");
      var pathToDsStore = path.join(pathToDir, '.DS_Store');
      fs.writeFile(pathToDsStore, "something", 'utf-8', function () {
        list = i18n.readLangDir(pathToDir, list);
        list.should.eql(['en-US', 'en-CA']);
        fs.unlinkSync(pathToDsStore);
      });
    }).not.throw ();
  });

});
