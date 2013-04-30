module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    recess: {
      dist: {
        options: {
          noOverQualifying: false,
          noIDs: false,
          strictPropertyOrder: false
        },
        src: [
          "public/css/*.less"
        ]
      }
    },
    jshint: {
      files: [
        "Gruntfile.js",
        "app.js",
        "lib/**/*.js",
        "package.json",
        "public/js/*.js",
        "routes/**/*.js"
      ]
    }
  });

  grunt.loadNpmTasks( "grunt-recess" );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "recess", "jshint" ]);
};
