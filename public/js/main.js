define(['jquery', 'base/webmaker', 'base/mediaGallery'],
  function ($, webmaker, mediaGallery) {
  'use strict';

  var $body = $('body');

  webmaker.init({
    page: $body[0].id,
    makeURL: $body.data('endpoint')
  });

  mediaGallery.init(webmaker);
});
