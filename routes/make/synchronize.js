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
      email: req.session.user.email,
      contentType: "application/x-popcorn",
      locale: req.localeInfo.locale || "en_US",
      url: utils.embedShellURL( project.author, project.id ),
      contenturl: utils.embedURL( project.author, project.id ),
      thumbnail: project.thumbnail,
      description: project.description,
      remixedFrom: req.remixedMakeId,
      tags: req.makeTags,
      remixurl: res.app.locals.config.app_hostname + "/editor/" + project.id + "/remix",
      editurl: res.app.locals.config.app_hostname + "/editor/" + project.id + "/edit",
      published: false
    }, function( error, make ) {
      if ( error ) {
        return next( utils.error( 500, error.toString() ) );
      }

      if (!make) {
        return next( utils.error( 500, "Failed to create make" ) );
      }

      project.updateAttributes({ makeid: make._id })
      .error( function() {
        return next( utils.error( 500, "Failed to add Make ID" ) );
      })
      .success( function( projectUpdateResult ) {
        res.json({
          status: "okay",
          project: projectUpdateResult,
          publishUrl: req.publishUrl,
          iframeUrl: req.iframeUrl
        });
      });
    });
  } else {
    makeClient.update( project.makeid, {
      title: project.name,
      author: project.author,
      url: utils.embedShellURL( project.author, project.id ),
      contenturl: utils.embedURL( project.author, project.id ),
      contentType: "application/x-popcorn",
      thumbnail: project.thumbnail,
      description: project.description,
      email: req.session.user.email,
      tags: req.makeTags,
      remixurl: res.app.locals.config.app_hostname + "/editor/" + project.id + "/remix",
      editurl: res.app.locals.config.app_hostname + "/editor/" + project.id + "/edit",
      published: false
    }, function( error ) {
      if ( error ) {
        return next( utils.error( 500, error.toString() ) );
      }
      res.json({
        status: "okay",
        project: project,
        publishUrl: req.publishUrl,
        iframeUrl: req.iframeUrl
      });
    });
  }
};
