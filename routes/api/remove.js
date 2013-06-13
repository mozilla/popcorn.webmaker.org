module.exports = function( Project, metrics, stores ) {
  var utils = require( "../../lib/utilities" );

  return function( req, res ) {

    var id = parseInt( req.params.id, 10 );

    if ( isNaN( id ) ) {
      res.json( { error: "ID was not a number" }, 500 );
      return;
    }

    Project.delete( { email: req.session.email, id: req.params.id }, function( err ) {
      if ( err ) {
        res.json( { error: 'project not found' }, 404 );
        return;
      }

      // Delete published projects, too
      var embedShell = utils.generateIdString( id ),
          embedDoc = embedShell + "_";

      // If we can't delete the file, it's already gone, ignore errors.
      // Fire-and-forget.
      stores.publish.remove( embedShell );
      stores.publish.remove( embedDoc );

      res.json( { error: 'okay' }, 200 );
      metrics.increment( 'project.delete' );
    });
  };
};

