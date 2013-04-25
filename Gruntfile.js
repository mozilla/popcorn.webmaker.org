module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    csslint: {
      strict: {
         options: {

         },
        src: [
          "public/css/*.css"
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

  grunt.loadNpmTasks( "grunt-contrib-csslint" );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "csslint", "jshint" ]);
};
