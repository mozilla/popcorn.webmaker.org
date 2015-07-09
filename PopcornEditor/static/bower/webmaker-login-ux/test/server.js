var express = require('express'),
    nunjucks = require('nunjucks'),
    i18n = require('webmaker-i18n'),
    path = require('path');

var app = express(),
    nunjucksEnv = nunjucks.configure([__dirname], {
      autoescape: true,
      watch: false
    });

nunjucksEnv.addFilter('instantiate', function (input) {
  return nunjucks.renderString(input, this.getVariables());
});

nunjucksEnv.addFilter('localVar', function (input, localVar) {
  return nunjucks.renderString(input, localVar);
});

nunjucksEnv.addFilter('gettext', function (string) {
  return this.lookup('gettext')(string);
});

nunjucksEnv.express(app);

app.disable('x-powered-by');

app.use(express.logger('dev'));

app.use(express.compress());

app.use(express.json());
app.use(express.urlencoded());

app.use(i18n.middleware({
  supported_languages: ['en-US'],
  default_lang: 'en-US',
  mappings: require('webmaker-locale-mapping'),
  translation_directory: path.resolve(__dirname, '../locale')
}));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.get('/angular-config.js', function(req, res) {
  res.setHeader('Content-type', 'text/javascript');
  res.send('window.angularConfig = ' + JSON.stringify({
    csrf: 'thisisnotacsrftoken',
    lang: 'en-CA'
  }));
});

app.get('/', function(req, res) {
  res.render('test-angular.html');
});

app.get('/plain', function(req, res) {
  res.render('test-plain.html');
});

app.get('/strings/:lang?', i18n.stringsRoute('en-US'));

app.post('/verify', function(req,res) {
  res.json({
    status: 'No Session'
  });
});

app.post('/auth/v2/create', function(req, res) {
  if ( req.body.user.username === 'failCreate' ) {
    return res.json(500, {
      error: 'Error creating an account'
    });
  }

  res.json({
    user: {
      username: req.body.user.username,
      email: req.body.user.email
    },
    email: req.body.user.email
  });
});

app.post('/auth/v2/request', function(req, res) {
  var uid = req.body.uid;

  var validUids = [
    'user@webmaker.org',
    'fail@webmaker.org',
    'ratelimit@webmaker.org',
    'user',
    'fail',
    'ratelimit',
    'unverified'
  ];

  if ( uid === 'error@webmaker.org' || uid === 'error' ) {
    return res.json(500, {
      error: 'Server Error'
    });
  }


  if ( validUids.indexOf(uid) !== -1 ) {
    return res.json({
      status: 'Login Token Sent'
    });
  }

  res.json({
    error: 'User not found'
  });
});

app.post('/login', function(req, res) {
  res.json({
    status: "okay"
  });
});

app.post('/logout', function(req, res) {
  res.json({
    status: "okay"
  });
});

app.post('/authenticate', function(req, res) {

  return res.json({
    user: {
      email: 'user@webmaker.org',
      username: 'user'
    },
    email: 'user@webmaker.org'
  });
});

app.post('/auth/v2/uid-exists', function(req, res) {
  var uid = req.body.uid;
  var tokenUids = [
    'user@webmaker.org',
    'unverified@webmaker.org',
    'fail@webmaker.org',
    'ratelimit@webmaker.org',
    'unverified@webmaker.org',
    'user',
    'unverified',
    'fail',
    'ratelimit'
  ];

  var passUids = [
    'passfail',
    'pass',
    'passfail@webmaker.org',
    'pass@webmaker.org'
  ];

  if ( tokenUids.indexOf(uid) !== -1 ) {

    var isVerified = !(uid === 'unverified' || uid === 'unverified@webmaker.org');

    return res.json(200, {
      exists: true,
      usePasswordLogin: false,
      verified: isVerified
    });
  }

  if ( passUids.indexOf(uid) !== -1 ) {
    return res.json({
      exists: true,
      usePasswordLogin: true,
      verified: true
    });
  }

  res.json(200, {
    exists: false
  });
});

app.post('/auth/v2/authenticateToken', function(req, res) {
  var uid = req.body.uid;
  var token = req.body.token;

  var validUids = [
    'user@webmaker.org',
    'user',
    'unverified',
    'unverified@webmaker.org'
  ];

  if ( validUids.indexOf(uid) !== -1 && token === 'token' ) {
    return res.json({
      user: {
        email: 'user@webmaker.org',
        username: 'user'
      },
      email: 'user@webmaker.org'
    });
  }

  if ( uid === 'fail@webmaker.org' || uid === 'fail' ) {
    return res.json(500, {
      error: "Server Error"
    });
  }

  if ( uid === 'ratelimit@webmaker.org' || uid === 'ratelimit' ) {
    return res.json(429, {
      error: "rate limit exceeded"
    });
  }

  res.json(401,{
    error: "Unauthorized"
  });

});

app.post('/auth/v2/verify-password',function(req, res) {
  var uid = req.body.uid;
  var pass = req.body.password;
  if ( uid === 'pass' || uid === 'pass@webmaker.org' ) {
    if ( pass === 'topsecret' ) {
      return res.json(200, {
        user: {
          email: 'pass@webmaker.org',
          username: 'webmaker'
        }
      });
    }
  }
  if ( uid === 'passfail' || uid === 'passfail@webmaker.org' ) {
    return res.json(500, {
      status: "Oh snap!"
    });
  }
  return res.json(401,{
    status: 'unauthorized'
  });
});
app.post('/auth/v2/enable-passwords',function(req, res) {
  res.json(200, {
    status: 'success'
  });
});
app.post('/auth/v2/remove-password',function(req, res) {
  res.json(200, {
    status: 'success'
  });
});
app.post('/auth/v2/request-reset-code',function(req, res) {
  res.json(200, {
    status: 'sent'
  });
});
app.post('/auth/v2/reset-password',function(req, res) {
  res.json(200, {
    status: 'sent'
  });
});

app.listen(4321, function() {
  console.log( 'Test server listening: http://localhost:4321' );
});
