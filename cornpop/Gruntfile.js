module.exports = function( grunt ) {

  var jsHintOptions = grunt.file.readJSON( ".jshintrc" );

  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      options: jsHintOptions,
      files: [
        "Gruntfile.js",
        "server.js",
        "lib/**/*.js",
        "package.json",
        "public/src/**/*.js",
        "!public/src/editor/google-analytics.js",
        "public/templates/**/*.js",
        "routes/**/*.js"
      ]
    },
    cssjanus: {
      "public/css/super-scrollbar-rtl.less": "public/css/super-scrollbar-ltr.less",
      "public/css/tray-status-bar-rtl.less": "public/css/tray-status-bar-ltr.less",
      "public/css/tray-rtl.less": "public/css/tray-ltr.less",
      "public/css/tray-timeline-rtl.less": "public/css/tray-timeline-ltr.less",
      "public/css/sequencer-rtl.less": "public/css/sequencer-ltr.less",
      options: {
        swapLtrRtlInUrl: true,
        swapLeftRightInUrl: false,
        generateExactDuplicates: false
      }
    },
    "string-replace": {
      dist: {
        files: {
          "public/css/super-scrollbar-rtl.less": "public/css/super-scrollbar-rtl.less",
          "public/css/tray-status-bar-rtl.less": "public/css/tray-status-bar-rtl.less",
          "public/css/tray-rtl.less": "public/css/tray-rtl.less",
          "public/css/tray-timeline-rtl.less": "public/css/tray-timeline-rtl.less",
          "public/css/sequencer-rtl.less": "public/css/sequencer-rtl.less"
        },
        options: {
          replacements: [{
            pattern: "ltr",
            replacement: "rtl"
          }]
        }
      }
    },
    lesslint: {
      src: [
        "public/css/butter.ui.less",
        "public/css/embed.less"
      ],
      options: {
        csslint: {
          "adjoining-classes": false,
          "box-model": false,
          "box-sizing": false,
          "bulletproof-font-face": false,
          "compatible-vendor-prefixes": false,
          "duplicate-background-images": false,
          "fallback-colors": false,
          "floats": false,
          "font-sizes": false,
          "ids": false,
          "important": false,
          "outline-none": false,
          "overqualified-elements": false,
          "qualified-headings": false,
          "regex-selectors": false,
          "star-property-hack": false,
          "underscore-property-hack": false,
          "universal-selector": false,
          "unique-headings": false,
          "unqualified-attributes": false,
          "vendor-prefix": false,
          "zero-units": false
        }
      }
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-cssjanus" );
  grunt.loadNpmTasks( "grunt-string-replace" );
  grunt.loadNpmTasks( "grunt-lesslint" );

  grunt.registerTask( "default", [ "jshint", "lesslint" ] );
  grunt.registerTask( "build", [ "cssjanus", "string-replace" ]);


};

