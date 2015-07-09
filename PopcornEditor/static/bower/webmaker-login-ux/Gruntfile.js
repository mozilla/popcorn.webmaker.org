module.exports = function (grunt) {
  require('jit-grunt')(grunt, {
    browserify: 'grunt-browserify',
    jshint: 'grunt-contrib-jshint',
    express: 'grunt-express-server',
    less: 'grunt-contrib-less'
  });

  var jshintConfig = grunt.file.readJSON('.jshintrc');

  var allJS = [
    'src/**/*.js',
    'Gruntfile.js'
  ];

  grunt.initConfig({
    html2js: {
      options: {
        base: 'templates',
        indentString: ' '
      },
      ngWebmakerLogin: {
        src: ['templates/**/*.html'],
        dest: 'dist/templates/ngWebmakerLogin.templates.js'
      },
    },
    less: {
      production: {
        files: {
          "dist/css/webmakerLogin.css": "src/less/webmakerLogin.less"
        }
      }
    },
    browserify: {
      angular: {
        src: ['src/adapters/angular.js'],
        dest: 'dist/ngWebmakerLogin.js'
      },
      plain: {
        src: ['src/adapters/plain.js'],
        dest: 'dist/webmakerLogin.js',
        options: {
          transform: ['brfs']
        }
      }
    },
    jshint: {
      files: allJS,
      options: jshintConfig
    },
    jsbeautifier: {
      modify: {
        src: allJS,
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: allJS,
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },
    uglify: {
      angularAdapter: {
        options: {
          mangle: false
        },
        files: {
          'dist/min/ngWebmakerLogin.min.js': ['dist/ngWebmakerLogin.js'],
          'dist/min/ngWebmakerLogin.templates.min.js': ['dist/templates/ngWebmakerLogin.templates.js']
        }
      },
      plainJsAdapter: {
        options: {
          mangle: false
        },
        files: {
          'dist/min/webmakerLogin.min.js': ['dist/webmakerLogin.js']
        }
      }
    },

    express: {
      dev: {
        options: {
          script: 'test/server.js',
          node_env: 'DEV',
          port: ''
        }
      }
    },

    watch: {
      src: {
        files: ['src/**/*', "test/**/*", "locale/**/*", "templates/**/*"],
        tasks: ['build', 'express'],
        options: {
          spawn: false
        }
      }
    },
  });

  grunt.registerTask('clean', [
    'jsbeautifier:modify'
  ]);

  grunt.registerTask('validate', [
    'jsbeautifier:verify',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'browserify',
    'html2js',
    'less',
    'uglify'
  ]);

  grunt.registerTask('dev', [
    'build',
    'express',
    'watch',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
