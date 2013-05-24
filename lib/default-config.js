// This is the default configuration for the Popcorn Maker server
// You shouldn't edit this file. Instead, look at the README for
// various configuration options

module.exports = {
  // hostname must match the address in your browser's URL bar
  // If it does not, then Persona sign-in will not work
  // Don't add any trailing slashes, just protocol://hostname[:port]
  "hostname": "http://localhost:8888",

  "OPTIMIZE_JS": false,
  "OPTIMIZE_CSS": false,

  // PORT is the port that the server will bind to
  // PORT is all caps because all the PaaS providers do it this way

  /*
      When running the server in development mode, it is key that URLs for
      MakeAPI and Login server are kept in sync with this value because of
      what is expected for WebFaker, a service used for easier development
      when RUN_WEBFAKER === true.

      E.G:

      if PORT === 8888

      MAKE_ENDPOINT = http://localhost:8889
      LOGIN_SERVER_URL_WITH_AUTH = http://<USERNAME>:<PASSWORD>@localhost:8890
   */

  "PORT": 8888,

  "MAKE_ENDPOINT": "http://localhost:8889",
  "MAKE_USERNAME": "popcorn.webmaker.org",
  "MAKE_PASSWORD": "password",

  "LOGIN_SERVER_URL_WITH_AUTH": "http://popcorn.webmaker.org:password@localhost:8890",

  "AUDIENCE": "http://webmaker.mofostaging.net",

  "USE_WEBFAKER": true,

  "logger" : {
    "format" : "dev"
  },
  "session" : {
    "key": "popcorn.sid",
    "secret": "thisisareallyreallylongsecrettoencryptcookies",
    "cookie": {
      "maxAge": 2419200000,
      "httpOnly": true,
    },
    "proxy": true
  },
  "staticMiddleware": {
    "maxAge": "0"
  },
  "dirs": {
    "wwwRoot": "public",
    "templates": "public/templates"
  },
  "publishStore": {
    "type": "local",
    "options": {
      "root": "./user_published",
      "namePrefix": "v",
      "nameSuffix": ".html"
    }
  },
  "feedbackStore": {
    "type": "local",
    "options": {
      "root": "./user_published",
      "namePrefix": "feedback",
      "nameSuffix": ".json"
    }
  },
  "crashStore": {
    "type": "local",
    "options": {
      "root": "./user_published",
      "namePrefix": "crash",
      "nameSuffix": ".json"
    }
  },
  "imageStore": {
    "type": "local",
    "options": {
      "root": "./user_published",
      "namePrefix": "images"
    }
  },
  "templates": {
    "basic": "{{templateBase}}basic/config.json"
  },
  "database": {
    "database": "popcorn",
    "username": null,
    "password": null,
    "options": {
      "logging": false,
      "dialect": "sqlite",
      "storage": "popcorn.sqlite",
      "define": {
        "charset": "utf8",
        "collate": "utf8_general_ci"
      }
    }
  }
};
