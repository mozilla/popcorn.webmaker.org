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
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-cssjanus" );
  grunt.loadNpmTasks( "grunt-string-replace" );

  grunt.registerTask( "default", [ "jshint" ] );
  grunt.registerTask( "build", [ "cssjanus", "string-replace" ]);

};
