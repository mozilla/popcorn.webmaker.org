var http = require( "http" ),
    utils = require( "./utilities" ),
    metrics = require( "./metrics" ),
    multiparty = require( "multiparty" );

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
      res.render( "error.html", {
        status: error.status,
        message: error.message,
        errMessage: req.gettext ? req.gettext("Go back to the homepage") : "",
        foundAnError: req.gettext ? req.gettext("found an error") : "Oops, you've found an error"
      });
    },
    "application/json": function() {
      res.json( { status: error.status, message: error.message } );
    },
    "default": function() {
      res.send( error.message );
    }
  });

  utils.cleanUpTempFiles( utils.parseTempFiles( req ) );
};

module.exports.loadOwnProject = function( Project ) {
  return function( req, res, next, id ) {
    Project.find({ id: id, userid: req.session.user.id }, function( err, project ) {
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
