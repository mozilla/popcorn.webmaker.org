var metrics = require( "../../lib/metrics" ),
    escapeHTML = require( "../../lib/sanitizer" ).escapeHTML;

function sanitizeProjectData( projectData ) {
  projectData.name = escapeHTML( projectData.name || "" );
  projectData.description = escapeHTML( projectData.description || "" );
  return projectData;
}

module.exports = function( Project ) {

  return function( req, res, next ) {

    function onUpdate( err, doc ) {
      if ( err ) {
        metrics.increment( "project.update.error" );
        res.json( 500, { error: err } );
        return;
      }

      req.project = doc;
      req.makeTags = projectData.tags;
      metrics.increment( "project.update.success" );
      next();
    }
    function onCreate( err, doc ) {
      if ( err ) {
        res.json( 500, { error: err } );
        metrics.increment( "project.create.error" );
        return;
      }
      req.body.id = doc.id;
      req.project = doc;
      req.remixedMakeId = projectData.makeid;
      req.makeTags = projectData.tags;
      metrics.increment( "project.create.success" );
      if ( doc.remixedFrom ) {
        metrics.increment( "project.remix.success" );
      }
      next();
    }

    // Sanitize project name (i.e., title) and description.
    var projectData = sanitizeProjectData( req.body );

    if ( req.body.id ) {

      Project.find( { userid: req.session.user.id, id: req.body.id }, function( err, doc ) {
        if ( err ) {
          metrics.increment( "project.find.error" );
          res.json( 500, { error: err } );
          return;
        }
        if ( doc ) {
          Project.update( { userid: req.session.user.id, id: req.body.id, data: projectData }, onUpdate );
        } else {
          Project.create( { userid: req.session.user.id, data: projectData }, onCreate );
        }
      });
    } else {
      Project.create( { userid: req.session.user.id, data: projectData }, onCreate );
    }
  };
};

