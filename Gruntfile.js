module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    recess: {
      dist: {
        options: {
          noIDs: false,
          noOverqualifying: false,
          noUniversalSelectors: false,
          zeroUnits: false,
          strictPropertyOrder: false
        },
        src: [
          "public/css/butter.ui.less",
          "public/css/embed.less",
          "public/css/transitions.less",
          "public/templates/assets/plugins/wikipedia/popcorn.wikipedia.less",
          "public/templates/assets/plugins/sketchfab/popcorn.sketchfab.less",
          "public/templates/basic/style.less",
          "public/templates/assets/css/jquery-ui/jquery.ui.butter.less",
          "public/css/controls.less"
        ]
      }
    },
    jshint: {
      options: {
        globals: {
          module: true,
          define: true,
          requirejs: true,
          require: true,
          console: true,
          Popcorn: true,
          Buffer: true
        },
        browser: true,
        node: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        latedef: true,
        newcap: true,
        noempty: true,
        es5: true,
        nonew: true,
        quotmark: "double",
        undef: true,
        unused: true,
        trailing: true
      },
      files: [
        "Gruntfile.js",
        "server.js",
        "lib/**/*.js",
        "package.json",
        "public/src/**/*.js",
        "public/templates/**/*.js",
        "routes/**/*.js"
      ]
    }
  });

  grunt.loadNpmTasks( "grunt-recess" );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "recess", "jshint" ] );
};
