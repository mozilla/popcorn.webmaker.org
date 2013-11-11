define([], function() {

  return function() {
    var video = document.querySelector( ".video-container" ),
        wrapper = document.querySelector( ".wrapper" ),
        container,
        margin = 26,
        border = 15,
        marginOffset = margin * 2,
        borderOffset = border * 2;
        baseFontSize = 14,
        marginLeft = 24,
        baseVideoWidth = 560;

    // This means we're not in the editor...
    if ( !wrapper ) {
      margin = 0;
      border = 0;
      marginOffset = 0;
      borderOffset = 0;
      wrapper = video;
    }
    container = wrapper.parentNode;
console.log(container);

    wrapper.style.width = ( container.clientWidth - borderOffset - marginOffset ) + "px";
    wrapper.style.margin = margin + "px " + margin + "px";
    // If the current screen size does not fit the aspect ratios height,
    // we need to shrink the height to fit, thus shrink the width.
    if ( container.clientHeight < wrapper.offsetHeight + marginOffset ) {
      wrapper.style.margin = margin + "px auto";
      wrapper.style.width = ( 16 / 9 * ( container.clientHeight - borderOffset - marginOffset ) ) + "px";
    }

    video.style.fontSize = ( baseFontSize * ( video.offsetWidth / baseVideoWidth ) ) + "px";
  };
});
