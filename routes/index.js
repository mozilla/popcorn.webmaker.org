'use strict';

var metrics = require( "../lib/metrics" ),
    utilities = require( "../lib/utilities" );

module.exports = function routesCtor( app, Project, filter, sanitizer,
                                      stores, makeapiConfig ) {

  var makeClient = require( "makeapi" ).makeAPI( makeapiConfig );

  // Strip away project data, email, etc.
  function pruneSearchResults( results ) {
    return results.map( function( result ) {
      return {
        id: result.id,
        name: result.name,
        description: result.description,
        author: result.author,
        remixedFrom: result.remixedFrom,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        // Add URLs for embed, embed shell
        // XXX Using result.email is wrong, need to add a new column
        publishUrl: utilities.embedShellURL( result.email, result.id ),
        iframeUrl: utilities.embedURL( result.email, result.id ),
        thumbnail: result.thumbnail
      };
    });
  }

  // Setup common recently* API routes--code is identical, save the name.
  [ 'recentlyCreated',
    'recentlyUpdated',
    'recentlyRemixed'
  ].forEach( function( name ) {
    var endPoint = '/api/projects/' + name + '/:limit?',
        projectMethod = 'find' + name[ 0 ].toUpperCase() + name.slice( 1 );

    app.get( endPoint,
      filter.isStorageAvailable,
      filter.crossOriginAccessible,
      function( req, res ) {
        Project[ projectMethod ]( { limit: req.params.limit }, function( err, projects ) {
          if ( err ) {
            res.jsonp( { error: err }, 500 );
          }
          res.jsonp( { status: 'okay', results: pruneSearchResults( projects ) } );
        });
      }
    );
  });

  app.get( '/api/project/:id/remixes',
    filter.isStorageAvailable,
    filter.crossOriginAccessible,
    function( req, res ) {
      Project.findRemixes( { id: req.params.id }, function( err, projects ) {
        if ( err ) {
          res.jsonp( { error: err }, 500 );
        }
        res.jsonp( { error: 'okay', results: pruneSearchResults( projects ) } );
      });
  });

  app.get( '/api/project/:id?',
    filter.isLoggedIn, filter.isStorageAvailable,
    function( req, res ) {

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
      projectJSON.publishUrl = utilities.embedShellURL( req.session.username, doc.id );
      projectJSON.iframeUrl = utilities.embedURL( req.session.username, doc.id );
      projectJSON.makeid = doc.makeid;
      if ( doc.remixedFrom || doc.remixedFrom === 0 ) {
        projectJSON.remixedFrom = doc.remixedFrom;
        // TODO should be loading something from the document
        projectJSON.remixedFromUrl = utilities.embedURL( doc.email, doc.remixedFrom );
      }

      makeClient.id( doc.makeid ).then(function( err, make ) {
        if ( err ) {
          res.json( 500, { error: err } );
        }
        projectJSON.tags = make[ 0 ].rawTags;
        res.json( projectJSON );
      });
    });
  });

  // We have a separate remix API for unsecured and sanitized access to projects
  app.get( '/api/remix/:id',
    filter.isStorageAvailable,
    function( req, res ) {
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
      projectJSON.remixedFromUrl = utils.generatePublishUrl( project.id );

      res.json( projectJSON );
      metrics.increment( 'user.remix' );
    });
  });

  app.post( '/api/delete/:id?',
    filter.isLoggedIn, filter.isStorageAvailable,
    function( req, res ) {

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
      var embedShell = utilities.generateIdString( id ),
          embedDoc = embedShell + "_";

      // If we can't delete the file, it's already gone, ignore errors.
      // Fire-and-forget.
      stores.publish.remove( embedShell );
      stores.publish.remove( embedDoc );

      res.json( { error: 'okay' }, 200 );
      metrics.increment( 'project.delete' );
    });
  });

  app.post( '/api/project/:id?',
    filter.isLoggedIn, filter.isStorageAvailable,
    function( req, res ) {

    var projectData = req.body;

    if ( req.body.id ) {

      Project.update( { email: req.session.email, id: req.body.id, data: projectData },
                      function( err, doc ) {
        if ( err ) {
          res.json( { error: err }, 500 );
          return;
        }

        res.json( { error: 'okay', project: doc } );
        metrics.increment( 'project.save' );
      });
    } else {

      Project.create( { email: req.session.email, data: projectData }, function( err, doc ) {
        if ( err ) {
          res.json( { error: err }, 500 );
          metrics.increment( 'error.save' );
          return;
        }

        // Send back the newly added row's ID
        res.json( { error: 'okay', projectId: doc.id } );
        metrics.increment( 'project.create' );
        if ( doc.remixedFrom ) {
          metrics.increment( 'project.remix' );
        }
      });
    }
  });

  var routes = {
    api: require( "./api" ),
    pages: require( "./pages" )
  };

  return routes;
};
