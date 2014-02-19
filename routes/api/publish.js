var async = require( "async" ),
    s3 = require( "../../lib/s3" ),
    config = require( "../../lib/config" ),
    sanitizer = require( "../../lib/sanitizer" ),
    utilities = require( "../../lib/utilities" );

module.exports = function( req, res, next ) {
  var description = req.project.description || req.gettext( "Created with Popcorn Maker - part of the Mozilla Webmaker initiative" ),
      iframeUrl = utilities.embedURL( req.session.user.username, req.project.id ),
      projectData = JSON.parse( req.project.data, sanitizer.escapeHTMLinJSON ),
      publishUrl = utilities.embedShellURL( req.session.user.username, req.project.id ),
      projectUrl = "/editor/" + req.project.id;

  async.parallel([
    function( asyncCallback ) {
      res.render( "embed.html", {
        id: req.project.id,
        author: req.project.author,
        title: req.project.name,
        webmakerURL: config.AUDIENCE,
        description: description,
        embedShellSrc: publishUrl,
        projectUrl: projectUrl,
        popcorn: utilities.generatePopcornString( projectData ),
        thumbnail: req.project.thumbnail,
        background: req.project.background
      }, function( err, html ) {
        var sanitized = sanitizer.compressHTMLEntities( html );

        s3.put( utilities.embedPath( req.session.user.username, req.project.id ), {
          "x-amz-acl": "public-read",
          "Content-Length": Buffer.byteLength( sanitized, "utf8" ),
          "Content-Type": "text/html; charset=UTF-8"
        }).on( "error",
          asyncCallback
        ).on( "response", function( s3res ) {
          if ( s3res.statusCode !== 200 ) {
            return asyncCallback( "S3.writeEmbed returned HTTP " + s3res.statusCode );
          }

          asyncCallback();
        }).end( sanitized );
      });
    }
  ], function( err ) {
    if ( err ) {
      return next( utilities.error( 500, err.toString() ) );
    }

    req.publishUrl = publishUrl;
    req.iframeUrl = iframeUrl;
    next();
  });
};
