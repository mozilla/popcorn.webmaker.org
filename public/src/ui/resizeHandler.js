define([], function() {

  return function() {
    var container = document.querySelector( ".video-container" ),
        baseFontSize = 14,
        baseContainerWidth = 560;

    container.style.fontSize = ( baseFontSize * ( container.offsetWidth / baseContainerWidth ) ) + "px";
  };
});
