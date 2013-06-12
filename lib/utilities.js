var http = require( "http" ),
    s3 = require( "./s3" );

module.exports.embedPath = function( user, id ) {
  return "/" + user + "/popcorn/" + id + "_";
};

module.exports.embedURL = function( user, id ) {
  return s3.url( this.embedPath( user, id ));
};

module.exports.embedShellPath = function( user, id ) {
  return "/" + user + "/popcorn/" + id;
};

module.exports.embedShellURL = function( user, id ) {
  return s3.url( this.embedShellPath( user, id ));
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
    var mediaUrls = typeof currentMedia.url === "string" ? [ currentMedia.url ] : currentMedia.url;
    var mediaUrlsString = '[ "' + mediaUrls.join('", "') + '" ]';

    var mediaPopcornOptions = currentMedia.popcornOptions || {};
    // Force the Popcorn instance we generate to have an ID we can query.
    mediaPopcornOptions.id = "Butter-Generated";

    // src/embed.js initializes Popcorn by executing the global popcornDataFn()
    popcornString += '\nvar popcornDataFn = function(){';
    popcornString += '\nvar popcorn = Popcorn.smart("#' + currentMedia.target + '", ' +
                     mediaUrlsString + ', ' + JSON.stringify( mediaPopcornOptions ) + ');';
    currentMedia.tracks.forEach(function( currentTrack ) {
      currentTrack.trackEvents.forEach(function( currentTrackEvent ) {
        popcornString += '\npopcorn.' + currentTrackEvent.type + '(';
        popcornString += JSON.stringify( currentTrackEvent.popcornOptions, null, 2 );
        popcornString += ');';
      });
    });

    popcornString += '};\n';
  });

  popcornString += '</script>\n';

  return popcornString;
};
