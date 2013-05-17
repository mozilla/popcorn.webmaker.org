define(['jquery'],
  function ($) {
  'use strict';

  var makeURL,
      page,
      make;

  function getTags( tagList ) {
    var tag,
        obj = {};

    if ( !tagList ) {
      return obj;
    }

    for ( var i = 0; i < tagList.length; i++ ) {
      tag = tagList[ i ].split( ":" );
      if ( tag.length === 2 ) {
        obj[ tag[ 0 ] ] = tag[ 1 ];
      } else {
        obj[ tag[ 0 ] ] = true;
      }
    }
    return obj;
  }


  var self = {
    init: function( options ) {
      makeURL = options.makeURL;
      page = options.page;
      make = Make({ apiURL: makeURL });
    },

    doSearch: function( tags, limit, each ) {
      make
      .find({ tags: tags })
      .limit( limit )
      .sortByField( 'createdAt', 'desc' )
      .then( function( error, results ) {
        var result;
        for ( var i = 0; i < results.length; i++ ) {
          result = results[ i ];
          result.tags = getTags( result.tags );
          if ( each ) {
            each( result );
          }
        }
      });
    }
  };

  return self;
});
