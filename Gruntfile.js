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
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "jshint" ] );
};
