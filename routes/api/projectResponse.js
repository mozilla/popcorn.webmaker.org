var utils = require( "../../lib/utilities" ),
    makeClient = require( "../../lib/makeapi" ),
    metrics = require( "../../lib/metrics" );

module.exports = function( Project ) {
  return function( req, res, next ) {
    makeClient.id( res.locals.project.makeid ).then(function( err, make ) {
      var remixId;
      if ( err ) {
        metrics.increment( "project.load.error" );
        return res.json( 500, { error: err } );
      }

      if ( !make.length ) {
        metrics.increment( "project.make.load.error" );
        return res.json( 404, { error: "Make was not found" } );
      }
      req.projectJSON.tags = make[ 0 ].rawTags;

      if ( req.isRemix ) {
        remixId = req.projectJSON.remixedFrom;
      } else {
        remixId = res.locals.project.remixedFrom;
        req.projectJSON.published = make[ 0 ].published;
      }

      if ( remixId || remixId === 0 ) {
        Project.find({ id: remixId }, function( err, doc ) {
          if ( err ) {
            metrics.increment( "project.remixedFrom.removed" );
            return next( utils.error( 500, err ) );
          }

          if ( !doc ) {
            metrics.increment( "project.make.load.error" );
            return res.json( req.projectJSON );
          }

          req.projectJSON.remixedFrom = doc.id;
          req.projectJSON.remixedFromUrl = utils.embedShellURL( doc.author, doc.id );

          if ( req.isRemix ) {
            metrics.increment( "user.remix" );
          }

          res.json( req.projectJSON );
        });
        return;
      }

      res.json( req.projectJSON );
    });
  };
};
