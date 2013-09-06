var utils = require( "./utilities" ),
    loginClient = require( "./loginapi" ),
    makeClient = require( "./makeapi" ),
    metrics = require( "./metrics" );

module.exports.errorHandler = function(err, req, res) {
  res.status( err.status );

  res.format({
    "text/html": function() {
      res.render( 'error.html', err );
    },
    "application/json": function() {
      res.json( { status: err.status, message: err.message } );
    },
    "default": function() {
      res.send( err.message );
    },
  });
};

module.exports.loadOwnProject = function( Project ) {
  return function( req, res, next, id ) {
    Project.find({ id: id, email: req.session.email }, function( err, project ) {
      if ( err ) {
        next( utils.error( 500, err ));
        return;
      }
      if ( !project ) {
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
        next( utils.error( 500, err ));
        return;
      }
      if ( !project ) {
        next( utils.error( 404 ));
        return;
      }

      res.locals.project = project;
      next();
    });
  };
};

module.exports.crossOrigin = function( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "*" );
  next();
};
