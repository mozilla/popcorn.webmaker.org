module.exports = function( Project, makeConfig ) {
  var utils = require( "../../lib/utilities" ),
      makeClient = require( "makeapi" ).makeAPI( makeConfig );

  return function( req, res ) {
    Project.find( { email: req.session.email, id: req.params.id }, function( err, doc ) {
      if ( err ) {
        res.json( { error: err }, 500 );
        return;
      }

      if ( !doc ) {
        res.json( { error: "project not found" }, 404 );
        return;
      }
      var projectJSON = JSON.parse( doc.data );

      projectJSON.name = doc.name;
      projectJSON.projectID = doc.id;
      projectJSON.description = doc.description;
      projectJSON.template = doc.template;
      projectJSON.publishUrl = utils.embedShellURL( req.session.username, doc.id );
      projectJSON.iframeUrl = utils.embedURL( req.session.username, doc.id );
      projectJSON.makeid = doc.makeid;
      if ( doc.remixedFrom || doc.remixedFrom === 0 ) {
        projectJSON.remixedFrom = doc.remixedFrom;
        // TODO should be loading something from the document
        projectJSON.remixedFromUrl = utils.embedURL( doc.email, doc.remixedFrom );
      }

      makeClient.id( doc.makeid ).then(function( err, make ) {
        if ( err ) {
          res.json( 500, { error: err } );
        }
        projectJSON.tags = make[ 0 ].rawTags;
        res.json( projectJSON );
      });
    });
  };
};

