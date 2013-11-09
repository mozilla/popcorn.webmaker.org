var utils = require( "./utilities" ),
    metrics = require( "./metrics" ),
    multiparty = require( "multiparty" );

module.exports.errorHandler = function( err, req, res ) {
  res.status( err.status );

  res.format({
    "text/html": function() {
      res.render( "error.html", err );
    },
    "application/json": function() {
      res.json( { status: err.status, message: err.message } );
    },
    "default": function() {
      res.send( err.message );
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
