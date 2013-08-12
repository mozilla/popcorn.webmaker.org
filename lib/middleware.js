var utils = require( "./utilities" ),
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

module.exports.finalizeProjectResponse = function( Project ) {
  var loginClient = require( "./loginapi" );

  return function( req, res, next ) {
    makeClient.id( res.locals.project.makeid ).then(function( err, make ) {
      if ( err || !make.length ) {
        return res.json( 500, { error: err } );
      }
      req.projectJSON.tags = make[ 0 ].rawTags;

      if ( res.locals.project.remixedFrom || res.locals.project.remixedFrom === 0 ) {
        Project.find({ id: res.locals.project.remixedFrom }, function( err, doc ) {
          if ( err ) {
            return next( utils.error( 500, err ) );
          }

          if ( !doc ) {
            return res.json( req.projectJSON );
          }

          req.projectJSON.remixedFrom = doc.id;

          loginClient.getUser( doc.email, function( err, user ) {
            if ( err || !user ) {
              // If there's an error, user doesn't exist on loginapi so we use popcorn.wmc.o
              // Or there could actually be an error of some sort.
              // TODO FIX THIS API
              req.projectJSON.remixedFromUrl = "http://popcorn.webmadecontent.org/" + doc.id.toString( 36 );
            } else {
              req.projectJSON.remixedFromUrl = utils.embedShellURL( user, doc.id );
            }

            if ( req.isRemix ) {
              metrics.increment( 'user.remix' );
            }

            res.json( req.projectJSON );
          });
        });
        return;
      }

      res.json( req.projectJSON );
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
      title: project.name,
      author: project.author,
      email: project.email,
      contentType: "application/x-popcorn",
      url: utils.embedShellURL( project.author, project.id ),
      thumbnail: project.thumbnail,
      description: project.description,
      remixedFrom: req.remixedMakeId,
      tags: req.makeTags
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

var layouts = [
  "/src/layouts/attribution.html",
  "/src/layouts/controls.html"
];

module.exports.setCORSForLayouts = function( req, res, next ) {
  if ( layouts.indexOf(req.path) !== -1 ) {
    res.set( "Access-Control-Allow-Origin", "*" );
  }
  next();
};
