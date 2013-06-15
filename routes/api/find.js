var loginClient = require( "../../lib/loginapi" ),
    makeClient = require( "../../lib/makeapi" ),
    utils = require( "../../lib/utilities" );

module.exports = function( Project ) {

  return function( req, res ) {
    var projectJSON = JSON.parse( res.locals.project.data );

    projectJSON.name = res.locals.project.name;
    projectJSON.projectID = res.locals.project.id;
    projectJSON.description = res.locals.project.description;
    projectJSON.template = res.locals.project.template;
    projectJSON.publishUrl = utils.embedShellURL( req.session.username, res.locals.project.id );
    projectJSON.iframeUrl = utils.embedURL( req.session.username, res.locals.project.id );
    projectJSON.makeid = res.locals.project.makeid;

    makeClient.id( res.locals.project.makeid ).then(function( err, make ) {
      if ( err ) {
        return res.json( 500, { error: err } );
      }
      projectJSON.tags = make[ 0 ].rawTags;

      if ( res.locals.project.remixedFrom || res.locals.project.remixedFrom === 0 ) {
        Project.find({ id: res.locals.project.remixedFrom}, function( err, doc ) {
          if ( err ) {
            return res.json( 500, { error: err } );
          }

          if ( !doc ) {
            return res.json( projectJSON );
          }

          projectJSON.remixedFrom = doc.id;

          loginClient.getUser( doc.email, function( err, user ) {
            if ( err || !user ) {
              // If there's an error, user doesn't exist on loginapi so we use popcorn.wmc.o
              // Or there could actually be an error of some sort.
              // TODO FIX THIS API
              projectJSON.remixedFromUrl = "http://popcorn.webmadecontent.org/" + doc.id.toString( 36 );
            } else {
              projectJSON.remixedFromUrl = utils.embedShellURL( user, doc.id );
            }

            res.json( projectJSON );
          });
        });
        return;
      }

      res.json( projectJSON );
    });
  };
};
