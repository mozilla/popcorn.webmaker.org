module.exports = function( req, res, next ) {
  var utils = require( "../../lib/utilities" ),
      metrics = require( "../../lib/metrics" ),
      s3 = require( "../../lib/s3" ),
      async = require( "async" );

  var project = res.locals.project;

  if ( !project ) {
    return next( utils.error( 404, "project not found" ) );
  }

  project.destroy()
  .success(function() {
    // Delete published projects, too
    var iframeUrl = utils.embedPath( project.author, project.id ),
        iframeUrlEdit = iframeUrl + "/edit",
        iframeUrlRemix = iframeUrl + "/remix",
        publishUrl = utils.embedShellPath( project.author, project.id ),
        publishUrlEdit = publishUrl + "/edit",
        publishUrlRemix = publishUrl + "/remix";

    function removeUrl( path, asyncCallback ) {
      s3.del( path )
      .on( "error", asyncCallback )
      .on( "response", function( s3res ) {
        if ( s3res.statusCode === 204 ) {
          return asyncCallback();
        }

        asyncCallback( "S3.removeEmbed returned HTTP " + s3res.statusCode );
      }).end();
    }

    async.map([
      iframeUrl,
      iframeUrlEdit,
      iframeUrlRemix,
      publishUrl,
      publishUrlEdit,
      publishUrlRemix
    ], removeUrl, function( err ) {
      if ( err ) {
        return next( utils.error( 500, err.toString() ) );
      }

      metrics.increment( "project.delete.success" );
      res.json( { status: "okay" }, 200 );
    });
  })
  .error(function( err ) {
    metrics.increment( "project.s3.delete.error" );
    next( utils.error( 500, err.toString() ) );
  });
};
