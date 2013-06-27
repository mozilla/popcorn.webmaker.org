var utils = require( "./utilities" ),
    makeClient = require( "./makeapi" );

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

module.exports.synchronizeMake = function( req, res, next ) {
  var project = req.project;

  if ( !project ) {
    return next( utils.error( 404, "No Project Found" ) );
  }

  if ( !project.makeid ) {
    makeClient.create({
      maker: project.email,
      make: {
        title: project.name,
        author: project.author,
        email: project.email,
        contentType: "application/x-popcorn",
        url: utils.embedShellURL( project.author, project.id ),
        thumbnail: project.thumbnail,
        description: project.description,
        remixedFrom: req.remixedMakeId
      }
    }, function( error, make ) {
      if ( error ) {
        return next( utils.error( 500, error.toString() ) );
      }

      project.updateAttributes({ makeid: make._id })
      .error( function( err ) {
        return next( utils.error( 500, "Failed to add Make ID" ) );
      })
      .success( function( projectUpdateResult ) {
        req.project = projectUpdateResult;
        next();
      });
    });
  } else {
    makeClient.update( project.makeid, {
      maker: project.email,
      make: {
        title: project.name,
        author: project.author,
        url: utils.embedShellURL( project.author, project.id ),
        contentType: "application/x-popcorn",
        thumbnail: project.thumbnail,
        description: project.description,
        email: project.email,
        tags: req.makeTags
      }
    }, function( err, make ) {
      if ( err ) {
        return next( utils.error( 500, err.toString() ) );
      }

      next();
    });
  }
};

module.exports.removeMake = function( req, res, next ) {
  makeClient.remove( res.locals.project.makeid, function( err ) {
    if ( err ) {
      return next( utils.error( 500, err.toString() ) );
    }

    next();
  });
};
