var async = require( "async" ),
    metrics = require( "../../lib/metrics" ),
    s3 = require( "../../lib/s3" ),
    sanitizer = require( "../../lib/sanitizer" ),
    utilities = require( "../../lib/utilities" );

module.exports = function( req, res ) {
  var description = res.locals.project.description || "Created with Popcorn Maker - part of the Mozilla Webmaker initiative",
      idBase36 = utilities.generateIdString( res.locals.project.id ),
      iframeUrl = utilities.embedURL( res.locals.project.author, idBase36 ),
      projectData = JSON.parse( res.locals.project.data, sanitizer.escapeHTMLinJSON ),
      publishUrl = utilities.embedShellURL( res.locals.project.author, idBase36 ),
      projectUrl = "/editor/" + res.locals.project.id;

  var mediaUrl = projectData.media[ 0 ].url,
      attribURL = Array.isArray( mediaUrl ) ? mediaUrl[ 0 ] : mediaUrl;

  async.parallel([
    function( asyncCallback ) {
      res.render( "embed.html", {
        id: res.locals.project.id,
        author: res.locals.project.author,
        title: res.locals.project.name,
        description: description,
        mediaSrc: attribURL,
        embedShellSrc: publishUrl,
        projectUrl: projectUrl,
        popcorn: utilities.generatePopcornString( projectData ),
        thumbnail: res.locals.project.thumbnail
      }, function( err, html ) {
        var sanitized = sanitizer.compressHTMLEntities( html );

        s3.put( utilities.embedPath( res.locals.project.author, idBase36 ), {
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
    },
    function( asyncCallback ) {
      res.render( "embed-shell.html", {
         author: res.locals.project.author,
         projectName: res.locals.project.name,
         description: description,
         embedShellSrc: publishUrl,
         embedSrc: iframeUrl,
         thumbnail: res.locals.project.thumbnail,
         projectUrl: projectUrl,
         makeID: res.locals.project.makeid
       }, function( err, html ) {
        var sanitized = sanitizer.compressHTMLEntities( html );

        s3.put( utilities.embedShellPath( res.locals.project.author, idBase36 ), {
          "x-amz-acl": "public-read",
          "Content-Length": Buffer.byteLength( sanitized, "utf8" ),
          "Content-Type": "text/html; charset=UTF-8"
        }).on( "error",
          asyncCallback
        ).on( "response", function( s3res ) {
          if ( s3res.statusCode !== 200 ) {
            return asyncCallback( "S3.writeEmbedShell returned HTTP " + s3res.statusCode );
          }

          asyncCallback();
        }).end( sanitized );
      });
    },
    function( asyncCallback ) {
      res.render( "redirect.html", {
        target: projectUrl + "/edit"
      }, function( err, html ) {
        s3.put( utilities.embedPath( res.locals.project.author, idBase36 ) + "/edit", {
          "x-amz-acl": "public-read",
          "Content-Length": Buffer.byteLength( html, "utf8" ),
          "Content-Type": "text/html; charset=UTF-8"
        }).on( "error",
          asyncCallback
        ).on( "response", function( s3res ) {
          if ( s3res.statusCode !== 200 ) {
            return asyncCallback( "S3.writeEmbed/edit redirect returned HTTP " + s3res.statusCode );
          }

          asyncCallback();
        }).end( html );
      });
    },
    function( asyncCallback ) {
      res.render( "redirect.html", {
        target: projectUrl + "/remix"
      }, function( err, html ) {
        s3.put( utilities.embedPath( res.locals.project.author, idBase36 ) + "/remix", {
          "x-amz-acl": "public-read",
          "Content-Length": Buffer.byteLength( html, "utf8" ),
          "Content-Type": "text/html; charset=UTF-8"
        }).on( "error",
          asyncCallback
        ).on( "response", function( s3res ) {
          if ( s3res.statusCode !== 200 ) {
            return asyncCallback( "S3.writeEmbed/remix redirect returned HTTP " + s3res.statusCode );
          }

          asyncCallback();
        }).end( html );
      });
    },
    function( asyncCallback ) {
      res.render( "redirect.html", {
        target: projectUrl + "/edit"
      }, function( err, html ) {
        s3.put( utilities.embedShellPath( res.locals.project.author, idBase36 ) + "/edit", {
          "x-amz-acl": "public-read",
          "Content-Length": Buffer.byteLength( html, "utf8" ),
          "Content-Type": "text/html; charset=UTF-8"
        }).on( "error",
          asyncCallback
        ).on( "response", function( s3res ) {
          if ( s3res.statusCode !== 200 ) {
            return asyncCallback( "S3.writeEmbed/edit redirect returned HTTP " + s3res.statusCode );
          }

          asyncCallback();
        }).end( html );
      });
    },
    function( asyncCallback ) {
      res.render( "redirect.html", {
        target: projectUrl + "/remix"
      }, function( err, html ) {
        s3.put( utilities.embedShellPath( res.locals.project.author, idBase36 ) + "/remix", {
          "x-amz-acl": "public-read",
          "Content-Length": Buffer.byteLength( html, "utf8" ),
          "Content-Type": "text/html; charset=UTF-8"
        }).on( "error",
          asyncCallback
        ).on( "response", function( s3res ) {
          if ( s3res.statusCode !== 200 ) {
            return asyncCallback( "S3.writeEmbed/remix redirect returned HTTP " + s3res.statusCode );
          }

          asyncCallback();
        }).end( html );
      });
    },
  ], function( err, results ) {
    if ( err ) {
      return res.json({ error: err }, 500);
    }

    res.json({
      error: "okay",
      publishUrl: publishUrl,
      iframeUrl: iframeUrl
    });
    metrics.increment( "project.publish" );
  });
};
