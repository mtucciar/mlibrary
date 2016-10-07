/**
 * Created by mtucciarone on 15/06/2015.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            app: {
                configFile: 'karma-app.conf.js',
                singleRun: true

            }
        },
        if_modified: {
            app: {
                dirs: {
                    'src': 'build-all'
                }
            }
        },
        jsdoc: {
            dist: {
                src: ['src/main/resources/app/app.module.js',
                    'src/main/resources/app/blocks',
                    'src/main/resources/app/core',
                    'src/main/resources/app/deidentify',
                    'src/main/resources/app/directives',
                    'src/main/resources/app/filters',
                    'src/main/resources/app/layout',
                    'src/main/resources/app/locate',
                    'src/main/resources/app/measurementResults',
                    'src/main/resources/app/review',
                    'src/main/resources/app/status',
                    'README.md'
                ],
                options: {
                    destination: 'doc',
                    template: "node_modules/ink-docstrap/template",
                    configure: "node_modules/ink-docstrap/template/jsdoc.conf.json",
                    recurse: true
                }
            }
        },
        ngAnnotate: {
            options: {
                remove: true,
                add: true,
                singleQuotes: true
            },
            app: {
                files: [{
                    expand: true,
                    src: ['src/main/resources/app/**/*.module.js', 'src/main/resources/app/**/*.route.js', 'src/main/resources/app/**/*.factory.js', 'src/main/resources/app/**/*.service.js', 'src/main/resources/app/**/*.api.js', 'src/main/resources/app/**/*.controller.js', 'src/main/resources/app/**/*.config.js', 'src/main/resources/app/**/config.js']
                }]
            }
        },
        concat: {
            app: {
                src: ['src/main/resources/app/app.module.js', 'src/main/resources/app/*/**/*.module.js', 'src/main/resources/app/*/**/*.js', '!src/main/resources/app/**/*.spec.js', '!src/main/resources/app/thirdparty/**/*.js', '!src/main/resources/app/content/**/*.js'],
                dest: 'bin/tmp/app/app.js'
            }
        },
        uglify: {
            app: {
                files: {
                    'bin/release/app/app.min.js': ['bin/tmp/app/app.js']
                },
                options: {
                    banner: '/*! <%= pkg.description %> - <%= pkg.website %> - <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
                    mangle: true,
                    beautify: true
                }
            }
        },
        cssmin: {
            app: {
                files: [{
                    src: ['src/main/resources/app/content/css/app.css'],
                    dest: 'bin/release/app/content/css/app.min.css'
                }]
            }
        },
        jshint: {
            app: {
                files: {
                    src: ['Gruntfile.js', 'src/main/resources/app/**/*.js', '!src/main/resources/app/thirdparty/**/*.js', '!src/main/resources/app/content/**/*.js']
                },
                options: {
                    expr: true,
                    globals: {
                        jQuery: true
                    }
                }
            }
        },
        plato: {
            app: {
                files: {
                    'bin/report/app': ['src/main/resources/app/**/*.js', '!src/main/resources/app/thirdparty/**/*', '!src/main/resources/app/content/**/*']
                }
            }
        },
        copy: {
            app: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'src/main/resources/app/',
                        src: ['**', '!**/*.js', 'thirdparty/**/*.js', 'content/help/**/*.js'],
                        dest: 'bin/release/app'
                    }
                ]
            }
        },
        clean: {
            temp: [
                'bin/temp/'
            ],
            app: [
                'bin/release/app/'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-if-modified');

    grunt.registerTask('build-mlibrary-dev-tests', ['clean:temp', 'clean:app', 'ngAnnotate:app', 'jshint:app', 'concat:app', 'uglify:app', 'cssmin:app', 'copy:app', 'karma']);
    grunt.registerTask('build-mlibrary-dev-notests', ['clean:temp', 'clean:app', 'ngAnnotate:app', 'jshint:app', 'concat:app', 'uglify:app', 'cssmin:app', 'copy:app']);
    grunt.registerTask('build-mlibrary-prod', ['concat:app', 'uglify:rm', 'cssmin:app', 'copy:app']);
};