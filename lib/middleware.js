var http = require( "http" ),
    utils = require( "./utilities" ),
    metrics = require( "./metrics" ),
    multiparty = require( "multiparty" );

module.exports.errorHandler = function( err, req, res ) {
  if (typeof err === "string") {
    console.error("You're passing a string into next(). Go fix this: %s", err);
  }

  var error = {
    message: err.toString(),
    status: http.STATUS_CODES[err.status] ? err.status : 500
  };

  res.status( error.status );

  res.format({
    "text/html": function() {
      res.render( "error.html", error );
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
