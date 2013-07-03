module.exports = function( Project, metrics, stores ) {
  var utils = require( "../../lib/utilities" );

  return function( req, res ) {

    var id = parseInt( req.params.id, 10 );

    if ( isNaN( id ) ) {
      res.json( 500, { error: "ID was not a number" } );
      return;
    }

    Project.delete( { email: req.session.email, id: req.params.id }, function( err ) {
      if ( err ) {
        res.json( 404, { error: 'project not found' } );
        return;
      }

      // Delete published projects, too
      var embedShell = utils.generateIdString( id ),
          embedDoc = embedShell + "_";

      // If we can't delete the file, it's already gone, ignore errors.
      // Fire-and-forget.
      stores.publish.remove( embedShell );
      stores.publish.remove( embedDoc );

      res.json( { error: 'okay' } );
      metrics.increment( 'project.delete' );
    });
  };
};

