var utils = require( "../../lib/utilities" ),
    makeClient = require( "../../lib/makeapi" );

module.exports = function( req, res, next ) {
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
      locale: req.localeInfo.locale || "en_US",
      url: utils.embedShellURL( project.author, project.id ),
      contenturl: utils.embedURL( project.author, project.id ),
      thumbnail: project.thumbnail,
      description: project.description,
      remixedFrom: req.remixedMakeId,
      isListed: true,
      tags: req.makeTags
    }, function( error, make ) {
      if ( error ) {
        return next( utils.error( 500, error.toString() ) );
      }

      project.updateAttributes({ makeid: make._id })
      .error( function() {
        return next( utils.error( 500, "Failed to add Make ID" ) );
      })
      .success( function( projectUpdateResult ) {
        res.json( { error: "okay", project: projectUpdateResult } );
      });
    });
  } else {
    makeClient.update( project.makeid, {
      maker: project.email,
      make: {
        title: project.name,
        author: project.author,
        url: utils.embedShellURL( project.author, project.id ),
        contenturl: utils.embedURL( project.author, project.id ),
        contentType: "application/x-popcorn",
        thumbnail: project.thumbnail,
        description: project.description,
        email: project.email,
        isListed: true,
        tags: req.makeTags
      }
    }, function( error ) {
      if ( error ) {
        return next( utils.error( 500, error.toString() ) );
      }

      res.json( { error: "okay", project: project } );
    });
  }
};
