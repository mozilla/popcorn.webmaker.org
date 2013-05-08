define(['jquery'],
  function ($) {
  'use strict';

  var countLarge = 2,
      countMedium = 8,
      LIMIT_DESKTOP = 20,
      LIMIT_MOBILE = 6;

  var $body = $( 'body' ),
      $mainGallery = $('.main-gallery'),
      mainGallery = $mainGallery[0],
      $makeTemplate = $body.find( 'div.make' ),
      $makeBackTemplate = $body.find( 'div.make-back' ),
      $eventBackTemplate = $body.find( 'div.event-back' ),
      isMobile = false,
      packery = new Packery(mainGallery, {
        itemSelector: 'div.make',
        gutter: '.gutter-sizer'
      });

  // Detect whether we are in mobile dimensions or not.
  if ($body.find( '.mobile' ).css( 'display' ) === 'none') {
    isMobile = true;
  }

  function createMakeBack( data, $el ) {
    var $backTemplate = $makeBackTemplate.clone( true ),
        $placeSpan = $('.place', $backTemplate),
        $titleSpan = $('.title', $backTemplate),
        $dateSpan = $('.date', $backTemplate),
        $authorSpan = $('.author', $backTemplate),
        $descSpan = $('.description', $backTemplate),
        createdDate = new Date( data.createdAt );

    $titleSpan.text( data.title );
    $dateSpan = $('.date', $backTemplate),
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
    $dateSpan.text( date.createdAt );
    $placeSpan.text( 'PLACE' );
    $descSpan.text( data.description );
    $organizerSpan.text( 'MOZILLA' );
    $el.append( $backTemplate );
  }

  function searchCallback( data ) {
    var $makeContainer = $makeTemplate.clone( true ),
        makeContainer = $makeContainer[0],
        randSize = 'large';

    if (!isMobile) {
      if (countLarge > 0) {
        randSize = 'large';
        countLarge --;
      } else if (countMedium > 0) {
        randSize = 'medium';
        countMedium --;
      } else {
        randSize = 'small';
      }
    }

    // create front Element & populate
    var $frontEl = $('<div class="front"><img src="' + data.thumbnail + '" alt="' + data.title + '"></div>');

    // create back element & populate
    var $backEl = $('<div class="back"></div>');

    switch ( data.tags.makeType ) {
      case 'popcorn':
        $makeContainer.addClass( 'popcorn' );
        break;

      case 'thimble':
        $makeContainer.addClass( 'thimble' );
        break;

      case 'challenge':
        $makeContainer.addClass( 'challenge' );
        break;

      case 'event':
        $makeContainer.addClass( 'event' );
        break;

      case 'kit':
        $makeContainer.addClass( 'kit' );
        break;

      case 'demo':
        $makeContainer.addClass( 'make-demo' );
        break;
    }

    $makeContainer.addClass(randSize);
    createMakeBack( data, $backEl );

    // add front & back elements to flip container
    var $flip = $('<div class="flipContainer"></div>');

    $flip.append($frontEl).append( $backEl );

    // add flip container & link to make container
    var $a = $('<a href="' + data.url + '"></a>');
    $makeContainer.append( $a.append( $flip ) );

    // add to gallery & packery
    $mainGallery.append( $makeContainer );
    packery.appended( makeContainer );
  }

  // set up mouse over handlers
  $makeTemplate.on('mouseenter focusin, mouseleave focusout', function ( e ) {
    $('.flipContainer', this).toggleClass( 'flip' );
  });

  var self = {
    init: function ( wm ) {
      var limit = LIMIT_DESKTOP;

      // Detect whether we are in mobile dimensions or not.
      if (isMobile) {
        limit = LIMIT_MOBILE;
      }

      // Handles all packery-related content loading.
      switch ($body[0].id) {
        case 'index':
          var $stickyBanner = $('<div class="make internal" id="banner-join">Join the Webmaker Revolution!</div>');
          $mainGallery.append( $stickyBanner );

          wm.doSearch( 'featured', limit, searchCallback );
          packery.stamp( $stickyBanner[0] );
          packery.layout();
          break;

        case 'teach':
          // TODO: teach page search
          break;
      }
    }
  };

  return self;
});
