module.exports = function(grunt) {

    grunt.initConfig({
      // Build the site using grunt-includes
        includes: {
            build: {
            cwd: 'editor/build',
            src: [ '*.html' ],
            dest: 'editor/site/',
            options: {
                flatten: true,
                includePath: 'editor/includes/',
                banner: '<!-- Site built using grunt includes! -->\n'
            }
          }
        }
    });
  
    grunt.loadNpmTasks('grunt-includes');
  
    grunt.registerTask('default', ['includes']);
  };