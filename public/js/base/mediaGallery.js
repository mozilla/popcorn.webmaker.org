define(['jquery'],
  function ($) {
  'use strict';

  var $body = $( 'body' );

  var LIMIT_DESKTOP = 30;
  var LIMIT_MOBILE = 3;

  var $mainGallery = $('.main-gallery'),
      mainGallery = $mainGallery[0],
      $makeTemplate = $body.find( 'div.make' ),
      $makeBackTemplate = $body.find( 'div.make-back' ),
      $eventBackTemplate = $body.find( 'div.event-back' ),
      packery = new Packery(mainGallery, {
        itemSelector: 'div.make',
        gutter: '.gutter-sizer',
        columnWidth: '.grid-sizer'
      });

  function createMakeBack( data, $el ) {
    var $backTemplate = $makeBackTemplate.clone( true ),
        $placeSpan = $('.place', $backTemplate),
        $authorSpan = $('.author', $backTemplate),
        $authorSpan = $('.author', $backTemplate),
        $descSpan = $('.description', $backTemplate);

    $placeSpan.text( 'PLACE' );
    $authorSpan.text( data.author );
    $descSpan.text( data.description );
    $el.append( $backTemplate );
  }

  function createEventBack( data, $el ) {
    var $backTemplate = $eventBackTemplate.clone( true ),
        $eventSpan = $('.event-title', $backTemplate),
        $dateSpan = $('.date', $backTemplate),
        $placeSpan = $('.place', $backTemplate),
        $descSpan = $('.description', $backTemplate),
        $organizerSpan = $('.organizer', $backTemplate);

    $eventSpan.text( data.title );
    $dateSpan.text( 'DATE' );
    $placeSpan.text( 'PLACE' );
    $descSpan.text( data.description );
    $organizerSpan.text( 'MOZILLA' );
    $el.append( $backTemplate );
  }

  function searchCallback( data ) {
    var $makeContainer = $makeTemplate.clone( true ),
        makeContainer = $makeContainer[0];

    // create front Element & populate
    var $frontEl = $('<div class="front"><img src="' + data.thumbnail + '"></img></div>');

    // create back element & populate
    var $backEl = $('<div class="back"></div>');

    switch ( data.tags.makeType ) {
      case 'popcorn':
        $makeContainer.addClass( 'make-popcorn' );
        break;

      case 'thimble':
        $makeContainer.addClass( 'make-thimble make-w2' );
        break;

      case 'challenge':
        $makeContainer.addClass( 'make-challenge' );
        break;

      case 'event':
        $makeContainer.addClass( 'make-event make-h2' );
        break;

      case 'kit':
        $makeContainer.addClass( 'make-kit' );
        break;

      case 'demo':
        $makeContainer.addClass( 'make-demo' );
        break;
    }

    if (data.tags.makeType) {
      createMakeBack( data, $backEl );
    }

    // add front & back elements to flip container
    var $flip = $('<div class="flipContainer"></div>');
    $flip.append($frontEl).append( $backEl );

    // add flip container & link to make container
    var $a = $('<a href="' + data.url + '"></a>');
    $makeContainer.append( $a.append( $flip ) );

    // add to gallery & packery
    $mainGallery.append( $makeContainer );
    packery.appended( makeContainer );
    packery.layout();
  }

  // set up mouse over handlers
  $makeTemplate.on('mouseenter focusin, mouseleave focusout', function ( e ) {
    $('.flipContainer', this).toggleClass( 'flip' );
  });

  var self = {
    init: function ( wm ) {
      var limit = LIMIT_DESKTOP;

      // Detect whether we are in mobile dimensions or not.
      if ($body.find( '.mobile' ).css( 'display' ) === 'none') {
        limit = LIMIT_MOBILE;
      }

      wm.doSearch( 'featured', limit, searchCallback );
    }
  };

  return self;
});
