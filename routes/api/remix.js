module.exports = function( Project, metrics ) {
  var utils = require( "../../lib/utilities" ),
      sanitizer = require( "../../lib/sanitizer" );

  return function( req, res ) {
    Project.find( { id: req.params.id }, function( err, project ) {
      if ( err ) {
        res.json( { error: err }, 500 );
        return;
      }

      if ( !project ) {
        res.json( { error: 'project not found' }, 404 );
        metrics.increment( 'error.remix.project-not-found' );
        return;
      }

      var projectJSON = JSON.parse( project.data, sanitizer.reconstituteHTMLinJSON );
      projectJSON.name = "Remix of " + project.name;
      projectJSON.template = project.template;
      projectJSON.remixedFrom = project.id;
      projectJSON.makeid = project.makeid;
      projectJSON.remixedFromUrl = utils.embedShellURL( project.id );

      res.json( projectJSON );
      metrics.increment( 'user.remix' );
    });
  };
};

