var http = require( "http" ),
    hood = require( "hood" ),
    utils = require( "./utilities" ),
    metrics = require( "./metrics" ),
    multiparty = require( "multiparty" );

module.exports.csp = function( options ) {
  var policy = {
    headers: [
      "Content-Security-Policy-Report-Only"
    ],
    policy: {
      "connect-src": [ "'self'",
                       options.audiourEndpoint ],
      "default-src": [ "'none'" ],
      "frame-src": [ "https://login.persona.org",
                     "https://sketchfab.com",
                     "https://w.soundcloud.com",
                     "https://player.vimeo.com",
                     "https://www.youtube.com" ],
      "font-src": [ "'self'",
                    "https://themes.googleusercontent.com",
                    "https://www.mozilla.org" ],
      "img-src": [ "*" ],
      "media-src": [ "*" ],
      "object-src": [ "https://p.jwpcdn.com" ],
      "script-src": [ "'self'",
                      "https://archive.org",
                      "https://api.flickr.com",
                      "https://maps.google.com",
                      "https://maps.gstatic.com",
                      "https://jwpsrv.com",
                      "https://p.jwpcdn.com",
                      "https://login.persona.org",
                      "https://cdn.optimizely.com",
                      "https://api.soundcloud.com",
                      "https://connect.soundcloud.com",
                      "https://w.soundcloud.com",
                      "https://vimeo.com",
                      "https://youtube.com",
                      "https://gdata.youtube.com",
                      "https://s.ytimg.com",
                      "https://www.youtube.com",
                      options.hubbleEndpint ],
      "style-src": [ "'self'",
                     "'unsafe-inline'",
                     "https://fonts.googleapis.com" ]
    }
  };

  return hood.csp( policy );
};

module.exports.errorHandler = function( err, req, res ) {
  if (typeof err === "string") {
    console.error("You're passing a string into next(). Go fix this: %s", err);
  }

  var error = {
    message: err.message,
    status: http.STATUS_CODES[err.status] ? err.status : 500
  };

  res.status( error.status );

  res.format({
    "text/html": function() {
      res.render( "error.html", { status: error.status, message: error.message } );
    },
    "application/json": function() {
      res.json( { status: error.status, message: error.message } );
    },
    "default": function() {
      res.send( error.message );
    }
  });
};

module.exports.loadOwnProject = function( Project ) {
  return function( req, res, next, id ) {
    Project.find({ id: id, email: req.session.email }, function( err, project ) {
      if ( err ) {
        metrics.increment( "project.load.error" );
        next( utils.error( 500, err ));
        return;
      }
      if ( !project ) {
        metrics.increment( "project.load.error" );
        next( utils.error( 404 ));
        return;
      }

      res.locals.project = project;
      next();
    });
  };
};

module.exports.loadAnyProject = function( Project ) {
  return function( req, res, next, id ) {
    Project.find({ id: id }, function( err, project ) {
      if ( err ) {
        metrics.increment( "project.load.error" );
        next( utils.error( 500, err ));
        return;
      }
      if ( !project ) {
        metrics.increment( "project.load.error" );
        next( utils.error( 404 ));
        return;
      }

      res.locals.project = project;
      next();
    });
  };
};

module.exports.processForm = function( req, res, next ) {
  var form = new multiparty.Form();

  form.parse( req, function( err, fields, files ) {
    if ( err ) {
      return next( utils.error( 500, err ) );
    }

    req.body = fields;
    req.files = files;
    next();
  });
};

module.exports.crossOrigin = function( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "*" );
  next();
};
