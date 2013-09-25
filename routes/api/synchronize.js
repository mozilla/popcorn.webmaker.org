var metrics = require( "../../lib/metrics" ),
    escapeHTML = require( "../../lib/sanitizer" ).escapeHTML;

function sanitizeProjectData( projectData ) {
  projectData.name = escapeHTML( projectData.name || '' );
  projectData.description = escapeHTML( projectData.description || '' );
  return projectData;
}

module.exports = function( Project ) {

  return function( req, res, next ) {

    // Sanitize project name (i.e., title) and description.
    var projectData = sanitizeProjectData( req.body );

    if ( req.body.id ) {

      Project.update( { email: req.session.email, id: req.body.id, data: projectData },
                      function( err, doc ) {
        if ( err ) {
          metrics.increment( 'project.update.error' );
          res.json( 500, { error: err } );
          return;
        }

        req.project = doc;
        req.makeTags = projectData.tags;
        metrics.increment( 'project.update.success' );
        next();
      });
    } else {

      Project.create( { email: req.session.email, data: projectData }, function( err, doc ) {
        if ( err ) {
          res.json( 500, { error: err } );
          metrics.increment( 'project.create.error' );
          return;
        }

        req.project = doc;
        req.remixedMakeId = projectData.makeid;
        req.makeTags = projectData.tags;
        metrics.increment( 'project.create.success' );
        if ( doc.remixedFrom ) {
          metrics.increment( 'project.remix.success' );
        }
        next();
      });
    }
  };
};

