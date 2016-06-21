module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gruntfile: {
            src: 'Gruntfile.js'
        },
        watch: {
            gruntfile: {
                files: ['src/**/*', 'tests/*'],
                tasks: ['default']
            }
        },
        version: {
            options: {
              prefix: 'mindoc</a>\\sv'
            },
            src: ['src/mindoc-pandoc.html']
        },
        concat: {
            jsSrc: {
                options: {
                    banner: "// # mindoc.js\n\n// GitHub: [https://bitfragment.github.io/mindoc](https://bitfragment.github.io/mindoc)\n\n",
                },
                // src: 'src/js/*.js', // If order doesn't matter
                src: [                 // If order matters
                    'src/js/moduleBegin.js',
                    'src/js/pandoc.js',
                    'src/js/dom.js',
                    'src/js/nav.js',
                    'src/js/main.js',
                    'src/js/moduleEnd.js',
                    'src/js/load.js'
                    ],
                dest: 'build/mindoc.js'
            }
        },
        inline: {
            dist: {
                options: {
                    cssmin: true,
                    uglify: true
                },
                src:  'src/mindoc-pandoc.html',
                dest: 'dist/mindoc-pandoc.html'
            }
        },
        panda: {
          options: {
            pandocOptions: [
              '--template=dist/mindoc-pandoc.html',
              '--to=html5', // Example output HTML in dist/ should be HTML5
              '--section-divs',
              '--smart',
              '--variable=lang:en',
              '--variable=description:<%= pkg.description %>'
              ]
          },
          main: {
            src:  'src/mindoc.md',
            dest: 'dist/mindoc.html'
          },
          ghpages: { // Create ./index.html for GitHub Pages
            src:  'src/mindoc.md',
            dest: './index.html'
          },
          blank: {
            src:  'src/mindoc-blank.md',
            dest: 'dist/mindoc-blank.html'
          }
        },
        docco: {
            all: {
                src: ['build/mindoc.js'],
                options: {
                    output: 'docs/',
                    layout: 'linear'
                }
            }
        }

    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-panda');
    grunt.loadNpmTasks('grunt-docco');

    // Default task
    grunt.registerTask('default',
                       [
                       'version',
                       'concat',
                       'inline',
                       'panda',
                       'docco'
                       ]);

};
