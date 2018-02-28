'use strict'

module.exports= function(grunt){

    require('time-grunt')(grunt);

    // it will load any other node modules needed
    require('jit-grunt')(grunt, {
       useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist:{
                files:{
                    'css/styles.css':'css/styles.scss'
                }
            }
        },

        watch: {
            files : 'css/*.scss',
            tasks: ['sass']
        },


        browserSync: {
            dev:{
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },

        copy: {
            html:{
               files:[{
                   expand: true,
                   dot: true,
                   cwd: './',
                   src: ['*.html'],
                   dest: 'dist'
               }]
            },
            fonts:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                },
                    // Temp take care of the imagemin task.
                    {
                        expand: true,
                        dot: true,
                        cwd: '',
                        src: ['img/*.*'],
                        dest: 'dist'
                    }
                ]
            }

        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        // This task temp doesn't work, the copy task temp take care of this issue
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutut.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        uglify: {
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/css/*.css',
                        'dist/js/*.js'
                    ]
                }]
            }
        },

        usemin: {
            html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
            options: {
                assetsDirs: [
                    'dist',
                    'dist/css',
                    'dist/js'
                ]
            }
        }



    });
    grunt.registerTask('css',['sass']);

    grunt.registerTask('default',['browserSync','watch']);

    grunt.registerTask('build', [
        'clean'
        , 'copy'
        /* Temp take out and replaced the imagemin task
        ,
        'imagemin'
         */
        , 'useminPrepare'
        , 'concat'
        , 'cssmin'
        , 'uglify'
        , 'filerev'
        , 'usemin'
    ]);


}