define(['jquery'],
  function ($) {
  'use strict';

  var $body = $('body');

  var LIMIT = 30;

  var mainGallery = document.querySelector( ".main-gallery" ),
      $mainGallery = $( mainGallery ),
      $makeTemplate = $body.find( ".make" ),
      $makeBackTemplate = $body.find( ".make-back" ),
      $eventBackTemplate = $body.find( ".event-back" );

  var packery = new Packery( mainGallery, {
      itemSelector: '.make',
      gutter: '.gutter-sizer',
      columnWidth: '.grid-sizer'
  });

  function createMakeBack ( data, $el ) {
    var $backTemplate = $makeBackTemplate.clone( true ).css( "display", "" );
    var $placeSpan = $('.place', $backTemplate);
    $placeSpan.text ('PLACE');
    var j = $('<span>');
    var $authorSpan = $('.author', $backTemplate);
    $authorSpan.text( data.author );
    var $descSpan = $('.description', $backTemplate);
    $descSpan.text( data.description );
    $el.append($backTemplate);
  }

  function createEventBack ( data, $el ) {
    var $backTemplate = $eventBackTemplate.clone( true ).css( "display", "" );
    var $eventSpan = $( '.event-title', $backTemplate );
    $eventSpan.text( data.title );
    var $dateSpan = $('.date', $backTemplate);
    $dateSpan.text('DATE');
    var $placeSpan = $('.place', $backTemplate);
    $placeSpan.text('PLACE');
    var $descSpan = $('.description', $backTemplate);
    $descSpan.text( data.description );
    var $organizerSpan = $('.organizer', $backTemplate);
    $organizerSpan.text( 'MOZILLA' );
    $el.append($backTemplate);
  }

  function searchCallback( data ) {
    var $makeContainer = $makeTemplate.clone( true ).css( "display", "" ),
        makeContainer = $makeContainer[ 0 ];

    // create front Element & populate
    var $frontEl = $('<div>').addClass('front');
    var $img = $( '<img>' ).attr( 'src', data.thumbnail );
    $frontEl.append( $img );

    // create back element & populate
    var $backEl = $('<div>').addClass('back');

    switch (data.tags.makeType) {
      case 'popcorn':
        $makeContainer.addClass('make-popcorn');
        createMakeBack( data, $backEl);
        break;

      case 'thimble':
        $makeContainer.addClass('make-thimble make-w2');
        createMakeBack( data, $backEl);
        break;

      case 'challenge':
        $makeContainer.addClass('make-challenge');
        createMakeBack( data, $backEl);
        break;

      case 'event':
        $makeContainer.addClass('make-event make-h2');
        createEventBack( data, $backEl);
        break;

      case 'kit':
        $makeContainer.addClass('make-kit');
        createMakeBack( data, $backEl);
        break;

      case 'demo':
        $makeContainer.addClass('make-demo');
        createMakeBack( data, $backEl);
        break;
    }

    // add front & back elements to flip container
    var $flip = $('<div>').addClass('flipContainer');
    $flip.append( $frontEl );
    $flip.append( $backEl );

    // add flip container & link to make container
    var $a = $(  '<a>' ).attr( 'href', data.url );
    $a.append( $flip );
    $makeContainer.append( $a );

    // add to gallery & packery
    $mainGallery.append( $makeContainer );
    packery.appended( makeContainer );

    // re-layout
    packery.layout();
  }

  var self = {
    init: function (wm) {
      wm.doSearch( "featured", LIMIT, searchCallback);

      // set up mouse over handlers
      $makeTemplate.mouseenter(function(e){
        $( '.flipContainer', this ).toggleClass('flip');
      });

      $makeTemplate.mouseleave(function(e){
        $( '.flipContainer', this ).toggleClass('flip');
      });
    }
  };

  return self;
});
