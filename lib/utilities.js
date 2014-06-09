var async = require( "async" ),
    config = require( "./config" ),
    fs = require( "fs" ),
    http = require( "http" ),
    s3 = require( "./s3" ),
    url = require( "url" );

module.exports.cleanUpTempFiles = function( paths ) {
  paths = paths || [];

  async.eachSeries( paths, fs.unlink, function( err ) {
    if ( err ) {
      console.error( err );
    }
  });
};

module.exports.embedPath = function( user, id ) {
  return this.embedShellPath( user, id ) + "_";
};

module.exports.embedURL = function( user, id ) {
  if ( !config.USER_SUBDOMAIN ) {
    return s3.http( this.embedPath( user, id ) );
  }

  var parsedURL = url.parse( config.USER_SUBDOMAIN );

  return parsedURL.protocol + "//" + user.toLowerCase() + "." + parsedURL.host + "/popcorn/" + this.generateIdString( id ) + "_";
};

module.exports.embedShellPath = function( user, id ) {
  return "/" + user.toLowerCase() + "/popcorn/" + this.generateIdString( id );
};

module.exports.embedShellURL = function( user, id ) {
  if ( !config.USER_SUBDOMAIN ) {
    return s3.http( this.embedShellPath( user, id ) );
  }

  var parsedURL = url.parse( config.USER_SUBDOMAIN );

  return parsedURL.protocol + "//" + user.toLowerCase() + "." + parsedURL.host + "/popcorn/" + this.generateIdString( id );
};

module.exports.error = function( code, msg ) {
  var err = new Error( msg || http.STATUS_CODES[ code ]);
  err.status = code;
  return err;
};

module.exports.generateIdString = function( id ) {
  return id.toString( 36 );
};

module.exports.generatePopcornString = function( projectData ) {
  var popcornString = "<script>";

  projectData.media.forEach(function( currentMedia ) {
    // We expect a string (one url) or an array of url strings.
    // Turn a single url into an array of 1 string.
    var mediaUrls = typeof currentMedia.url === "string" ? [ currentMedia.url ] : currentMedia.url,
        mediaUrlsString = "[ '" + mediaUrls.join( "", "" ) + "' ]";

    var mediaPopcornOptions = currentMedia.popcornOptions || {};
    // Force the Popcorn instance we generate to have an ID we can query.
    mediaPopcornOptions.id = "Butter-Generated";

    // src/embed.js initializes Popcorn by executing the global popcornDataFn()
    popcornString += "\nvar popcornDataFn = function(){";
    popcornString += "\nvar popcorn = Popcorn.smart('#" + currentMedia.target + "', " +
                     mediaUrlsString + ", " + JSON.stringify( mediaPopcornOptions ) + ");";
    currentMedia.tracks.forEach(function( currentTrack ) {
      currentTrack.trackEvents.forEach(function( currentTrackEvent ) {
        popcornString += "\npopcorn." + currentTrackEvent.type + "(";
        popcornString += JSON.stringify( currentTrackEvent.popcornOptions, null, 2 );
        popcornString += ");";
      });
    });

    popcornString += "};\n";
  });

  popcornString += "</script>\n";

  return popcornString;
};

module.exports.parseTempFiles = function(req) {
  var paths = [];

  if ( req.files ) {
    paths = Object.keys( req.files ).map(function( field ) {
      return req.files[ field ].map(function( file ) {
        return file.path;
      });
    }).reduce(function( prev, curr ) {
      return prev.concat( curr );
    }, []);
  }

  return paths;
};

module.exports.pruneSearchResults = function( results ) {
  return results.map( function( result ) {
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      author: result.author,
      remixedFrom: result.remixedFrom,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      publishUrl: this.embedShellURL( result.author, result.id ),
      iframeUrl: this.embedURL( result.author, result.id ),
      thumbnail: result.thumbnail
    };
  });
};
