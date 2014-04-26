
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            test: {
//                src: ['bundle.js'],
                options: {
                    specs: 'spec/spec-bundle.js'
                }
            }
        },
        // minify javascript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'grid.min.js': ['js/bundle.js']
                }
            }
        },
        // Grunt task for node-browserify
        watchify: {
            dev: {
                options: {
                    keepalive: true
                },
                src: './js/index.js',
                dest: 'js/bundle.js'
            },
            test: {
                src: './spec/*Spec.js',
                dest: 'spec/spec-bundle.js'
            }
            
        }    
    });


    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-watchify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['watchify:test','jasmine:test']);
    grunt.registerTask('watch', ['watchify:dev']);
};
