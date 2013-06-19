var utils = require( "./utilities" );

module.exports.loadOwnProject = function( Project ) {
  return function( req, res, next, id ) {
    Project.find({ id: id, email: req.session.email }, function( err, project ) {
      if ( err ) {
        next( utils.error( 500, err ));
      }
      if ( !project ) {
        next( utils.error( 404 ));
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
      }
      if ( !project ) {
        next( utils.error( 404 ));
      }

      res.locals.project = project;
      next();
    });
  };
};
