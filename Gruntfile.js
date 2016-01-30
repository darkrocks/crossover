module.exports = function (grunt) {
  // load plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autopolyfiller');

  // config
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/js/bundle.js': ['lib/client/app/app.js']
        }
      }
    },
    autopolyfiller: {

      js: {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        },
        files: {
          'build/js/polyfil.js': ['build/js/bundle.js']
        }
      }

    },
    copy: {
      main: {
        files: [
          {src: ['lib/client/index.html'], dest: 'build/index.html'},
          {expand: true, flatten: true, src: ['lib/client/app/**/*.html'], dest: 'build/templates/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['lib/client/fonts/*.*'], dest: 'build/fonts/', filter: 'isFile'},
        ]
      }
    },
    stylus: {
      compile: {
        options: {
          'include css': true,
          'compress': false
        },
        files: {
          'build/css/style.css': 'lib/client/css/style.styl'
        }
      }
    },
    uglify: {
      main: {
        files: {
          'build/js/bundle.min.js': ['build/js/bundle.js']
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['> 1%', 'IE 8']
          })
        ]
      },
      dist: {
        src: 'build/css/style.css'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', '!lib/client/scripts/*.js']
    },
    watch: {
      all: {
        files: 'lib/**/*',
        tasks: ['build'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'browserify', 'autopolyfiller:js', 'stylus:compile', 'postcss', 'copy:main']);
};
