requirejs.config({
  // Paths are aliases to other modules
  paths: {
    // Core
    "popcorn.core": "../static/bower/popcorn-js/popcorn",
    "popcorn.ie8": "../static/bower/popcorn-js/ie8/popcorn.ie8",

    // Wrappers
    "popcorn._MediaElementProto": "../static/bower/popcorn-js/wrappers/common/popcorn._MediaElementProto",
    "popcorn.HTMLMediaElement": "../static/bower/popcorn-js/wrappers/html5/popcorn.HTMLMediaElement",
    "popcorn.HTMLNullVideoElement": "../static/bower/popcorn-js/wrappers/null/popcorn.HTMLNullVideoElement",
    "popcorn.HTMLSoundCloudAudioElement": "../static/bower/popcorn-js/wrappers/soundcloud/popcorn.HTMLSoundCloudAudioElement",
    "popcorn.HTMLVimeoVideoElement": "../static/bower/popcorn-js/wrappers/vimeo/popcorn.HTMLVimeoVideoElement",
    "popcorn.HTMLYouTubeVideoElement": "../static/bower/popcorn-js/wrappers/youtube/popcorn.HTMLYouTubeVideoElement",
    "popcorn.HTMLJWPlayerVideoElement": "../static/bower/popcorn-js/wrappers/jwplayer/popcorn.HTMLJWPlayerVideoElement",

    // Players
    "popcorn.player": "../static/bower/popcorn-js/modules/player/popcorn.player",

    // Plugins
    "popcorn.googlemap": "../src/plugins/googlemap/popcorn.googlemap",
    "popcorn.image": "../src/plugins/image/popcorn.image",
    "popcorn.loopPlugin": "../src/plugins/loopPlugin/popcorn.loopPlugin",
    "popcorn.pausePlugin": "../src/plugins/pausePlugin/popcorn.pausePlugin",
    "popcorn.popup": "../src/plugins/popup/popcorn.popup",
    "popcorn.sequencer": "../src/plugins/sequencer/popcorn.sequencer",
    "popcorn.sketchfab": "../src/plugins/sketchfab/popcorn.sketchfab",
    "popcorn.skip": "../src/plugins/skip/popcorn.skip",
    "popcorn.text": "../src/plugins/text/popcorn.text",
    "popcorn.wikipedia": "../src/plugins/wikipedia/popcorn.wikipedia",
    "popcorn.deprecated": "../src/util/deprecated",

    // RequireJS
    "text": "../external/require/text",
    "json": "../external/require/json",
    "l10n": "../external/require/l10n",

    // Our other APIs
    "analytics": "../static/bower/webmaker-analytics/analytics",
    "farbtastic": "../static/bower/farbtastic/farbtastic",
    "jquery": "../static/bower/jquery/dist/jquery.min",
    "jquery-ui": "../static/bower/jquery-ui/ui/jquery-ui",
    "localized": "../static/bower/webmaker-i18n/localized",
    "languages": "../static/bower/webmaker-language-picker/js/languages",
    "list": "../static/bower/listjs/dist/list.min",
    "fuzzySearch": "../static/bower/list.fuzzysearch.js/dist/list.fuzzysearch.min",
    "selectize": "../static/bower/selectize/dist/js/standalone/selectize.min",
    "make-api": "../external/make-api",
    "sketchfab-iframe": "../external/sketchfab/sketchfab-iframe",
    "WebmakerUI": "../static/bower/webmaker-ui/ui",
    "webmaker-ui-fragments": "../static/bower/webmaker-ui/webmaker-ui-fragments",
    "eventEmitter": "../static/bower/eventEmitter",
    "ua-parser": "../static/bower/ua-parser-js/src/ua-parser.min"
  },
  // shim config defines dependencies between non-AMD modules, which is all of the Popcorn code
  shim: {
    // Core
    "popcorn.core": [ "popcorn.ie8" ],

    // Wrappers
    "popcorn._MediaElementProto": [ "popcorn.core" ],
    "popcorn.HTMLMediaElement": [ "popcorn.core" ],
    "popcorn.HTMLNullVideoElement": [ "popcorn.core", "popcorn._MediaElementProto" ],
    "popcorn.HTMLSoundCloudAudioElement": [ "popcorn.core", "popcorn._MediaElementProto" ],
    "popcorn.HTMLVimeoVideoElement": [ "popcorn.core", "popcorn._MediaElementProto" ],
    "popcorn.HTMLYouTubeVideoElement": [ "popcorn.core", "popcorn._MediaElementProto" ],
    "popcorn.HTMLJWPlayerVideoElement": [ "popcorn.core", "popcorn._MediaElementProto" ],

    // Players
    "popcorn.player": [ "popcorn.core" ],

    // Plugins
    "popcorn.googlemap": [ "popcorn.core" ],
    "popcorn.image": [ "popcorn.core" ],
    "popcorn.loopPlugin": [ "popcorn.core" ],
    "popcorn.pausePlugin": [ "popcorn.core" ],
    "popcorn.popup": [ "popcorn.core"],
    "popcorn.sequencer": [ "popcorn.core", "popcorn.player" ],
    "popcorn.skip": [ "popcorn.core" ],
    "popcorn.text": [ "popcorn.core" ],
    "popcorn.wikipedia": [ "popcorn.core" ],
    "popcorn.sketchfab": [ "popcorn.core", "sketchfab-iframe" ],
    "popcorn.deprecated": [ "popcorn.core" ],

    // Our other APIs
    "jquery-ui": [ "jquery" ],
    "farbtastic": [ "jquery" ]
  }
});

define([
  // We must list all of the popcorn files that get used
  // shim config will handle dependency order
  "popcorn.googlemap",
  "popcorn.image",
  "popcorn.loopPlugin",
  "popcorn.pausePlugin",
  "popcorn.popup",
  "popcorn.sequencer",
  "popcorn.sketchfab",
  "popcorn.skip",
  "popcorn.text",
  "popcorn.wikipedia",
  "popcorn.deprecated",
  "popcorn.HTMLMediaElement",
  "popcorn.HTMLNullVideoElement",
  "popcorn.HTMLSoundCloudAudioElement",
  "popcorn.HTMLVimeoVideoElement",
  "popcorn.HTMLYouTubeVideoElement",
  "popcorn.HTMLJWPlayerVideoElement"
], function() {
  return {};
});
