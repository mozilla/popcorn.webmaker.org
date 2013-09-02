var utils = require( "../../lib/utilities" ),
    loginClient = require( "../../lib/loginapi" ),
    makeClient = require( "../../lib/makeapi" ),
    metrics = require( "../../lib/metrics" );

module.exports = function( Project ) {
  return function( req, res, next ) {
    makeClient.id( res.locals.project.makeid ).then(function( err, make ) {
      if ( err ) {
        return res.json( 500, { error: err } );
      }

      if ( !make.length ) {
        return res.json( 404, { error: "Make was not found" } );
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