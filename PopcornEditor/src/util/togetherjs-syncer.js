/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

/*globals TogetherJS*/
define( [ "core/media", "core/track", "core/trackevent", "util/sanitizer" ],
        function( Media, Track, TrackEvent, Sanitizer ) {

  // TogetherJSSyncer listens for particular Popcorn events that other Popcorns
  // connected through TogetherJS need to know about, i.e. ones where we need to
  // sync data, and dispatches them to TogetherJS. It also tracks events that
  // originated on remote Popcorn instances, so as to not send the event back to
  // the originator in a loop.
  function TogetherJSSyncer( butter ) {

    var _fromRemoteQueue = [];

    // Check if the passed event type has been triggered from a remote source
    // i.e. the event was received via a "TogetherJS.hub.on(...)" call.
    function triggeredFromRemote( type ) {
      if ( _fromRemoteQueue.length > 0 &&
           type === _fromRemoteQueue[ _fromRemoteQueue.length - 1 ] ) {
        _fromRemoteQueue.pop();
        return true;
      }
      return false;
    }

    // Dispatch the event to TogetherJS so that that other Popcorns connected to
    // the hub can sync with us.
    function dispatchToTogetherJS( e ) {
      if ( !TogetherJS.running || triggeredFromRemote( e.type ) ) {
        return;
      }
      TogetherJS.send({
        type: e.type,
        data: e.data.json ? e.data.json : undefined,
        target: e.target.json ? e.target.json : undefined
      });
    }

    // Popcorn is ready to do things (this happens on page load) so send a
    // "hello" to everyone so that we can sync up with them.
    butter.listen( "ready", function() {
      if ( TogetherJS.running ) {
        TogetherJS.send({
          type: "hello"
        });
      }
    });

    [ "trackadded",
      "trackremoved",
      "trackeventadded",
      "trackeventremoved",
      "trackeventupdated",
      "mediadurationchanged"
    ].forEach( function( syncedEvent ) {
      butter.listen( syncedEvent, dispatchToTogetherJS );
    });

    // Someone has joined the TogetherJS session so let's send our project state
    // so that they can sync up with us.
    TogetherJS.hub.on( "hello", function() {
      TogetherJS.send({
        type: "ahoy",
        data: butter.project.export()
      });
    });

    // If we already have a track with the id in question then don't sync data,
    // otherwise create a new track.
    function maybeAddTrack( trackJson, media, id ) {
      var track = butter.getTrackById( trackJson.id );
      if ( track ) {
        return;
      }
      track = new Track( { id: id } );
      _fromRemoteQueue.push( "trackadded" );
      var maybeOrderedTrack = media.getTrackByOrder( trackJson.order );
      if ( maybeOrderedTrack ) {
        media.insertTrackBefore( maybeOrderedTrack, track );
      } else {
        media.addTrack( track );
      }
      return track;
    }

    // If we already have a track event with the id in question then don't sync
    // the data, otherwise create a new track event.
    function maybeAddTrackEvent( trackEventJson, track, id ) {
      var trackEvent = track.getTrackEventById( trackEventJson.id );
      if ( trackEvent ) {
        return;
      }
      _fromRemoteQueue.push( "trackeventadded" );
      track.addTrackEvent({
        id: id,
        popcornOptions: trackEventJson.popcornOptions,
        type: trackEventJson.type,
        defaults: butter.pluginDefaults[ trackEventJson.type ]
      });
    }

    // We just sent a "hello" and received confirmation of the connection, sync
    // the projects.
    TogetherJS.hub.on( "ahoy", function( e ) {
      var projectJson = JSON.parse( e.data );

      if ( !projectJson ) {
        throw "Couldn't get requested media to sync on 'ahoy'.";
      }

      if ( projectJson.name ) {
        butter.project.name = Sanitizer.reconstituteHTML( projectJson.name );
      }

      if ( projectJson.template ) {
        butter.project.template = projectJson.template;
      }

      if ( projectJson.isRemix ) {
        butter.project.isRemix = projectJson.isRemix;
      }

      if ( projectJson.description ) {
        butter.project.description = projectJson.description;
      }

      if ( projectJson.tags ) {
        butter.project.tags = projectJson.tags;
      }

      if ( projectJson.thumbnail ) {
        butter.project.thumbnail = projectJson.thumbnail;
      }

      if ( projectJson.background ) {
        butter.project.background = projectJson.background;
      }

      if ( projectJson.remixedFrom ) {
        butter.project.remixedFrom = projectJson.remixedFrom;
      }

      // We're always going to have one media object so just get that.
      var mediaJson = projectJson.media[ 0 ],
          media = butter.getMediaById( mediaJson.id );
      if ( !media ) {
        throw "Couldn't get requested media to sync on 'ahoy'.";
      }

      for ( var i = 0; i < mediaJson.tracks.length; i++ ) {
        var trackJson = mediaJson.tracks[ i ],
            track = butter.getTrackById( trackJson.id );
        if ( !track ) {
          track = maybeAddTrack( trackJson, media, trackJson.id | 0 );
        }
        for ( var x = 0; x < trackJson.trackEvents.length; x++) {
          var id = trackJson.trackEvents[ x ].id.replace( "TrackEvent", "" ) | 0;
          maybeAddTrackEvent( trackJson.trackEvents[ x ], track, id );
        }
      }
    });

    // The functions below listen for changes from remote Popcorn instances and
    // handle them appropriately.
    // ************************************************************************

    TogetherJS.hub.on( "trackadded", function( e ) {
      if ( !e.sameUrl ) {
        return;
      }
      var media = butter.getMediaById( e.target.id );
      if ( !media ) {
        throw "Couldn't get requested media to sync track on 'trackadded'.";
      }
      maybeAddTrack( e.data, media, e.data.id | 0 );
    });

    TogetherJS.hub.on( "trackremoved", function( e ) {
      if ( !e.sameUrl ) {
        return;
      }
      var media = butter.getMediaById( e.target.id ),
          track = butter.getTrackById( e.data.id );
      if ( track ) {
        _fromRemoteQueue.push( "trackremoved" );
        media.removeTrack( track );
      }
    });

    TogetherJS.hub.on( "trackeventadded", function( e ) {
      if ( !e.sameUrl ) {
        return;
      }
      var track = butter.getTrackById( e.data.track );
      if ( !track ) {
        throw "Couldn't get requested track event to sync on 'trackeventadded'.";
      }
      maybeAddTrackEvent( e.data, track,
                          e.data.id.replace( "TrackEvent", "" ) | 0 );
    });

    TogetherJS.hub.on( "trackeventremoved", function( e ) {
      if ( !e.sameUrl ) {
        return;
      }
      var track = butter.getTrackById( e.target.id ),
          trackEvent = track.getTrackEventById( e.data.id );
      if ( trackEvent ) {
        _fromRemoteQueue.push( "trackeventremoved" );
        track.removeTrackEvent( trackEvent );
      }
    });

    TogetherJS.hub.on( "trackeventupdated", function( e ) {
      if ( !e.sameUrl ) {
        return;
      }
      var track = butter.getTrackById( e.data.track ),
          trackEvent = track.getTrackEventById( e.data.id );
      if ( trackEvent ) {
        _fromRemoteQueue.push( "trackeventupdated" );
        trackEvent.update( e.data.popcornOptions );
      }
    });

    TogetherJS.hub.on( "mediadurationchanged", function( e ) {
      if ( !e.sameUrl ) {
        return;
      }
      var media = butter.getMediaById( e.target.id );
      if ( media ) {
        _fromRemoteQueue.push( "mediadurationchanged" );
        media.url = "#t=," + e.target.duration;
      }
    });

  }

  return TogetherJSSyncer;
});
