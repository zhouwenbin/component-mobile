// Generated on 2014-12-11 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    target: 'dev',
    base: null
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      extra: {
        files:[{
          dot: true,
          src: [
            '<%= config.dist %>/base',
            '<%= config.dist %>/com',
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          reporter: 'Spec',
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/index.html',
        '<%= config.app %>/detail.html',
        '<%= config.app %>/order.html',
        '<%= config.app %>/login.html',
        '<%= config.app %>/register.html',
        '<%= config.app %>/gotopay.html'
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ],
        blockReplacements: {
          js: function (block) {
            if(block.dest === 'base'){
              block.dest = config.base.dest;
              block.src = config.base.src
            }else if (block.dest === 'com') {
              block.dest = config.com;
              block.src = config.com
            }

            return '<script src="'+block.dest+'"></script>';
          }
        }
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: false,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'img/{,*/}*',

            // '{,*/}*.html',
            // 'index.html',
            'index.html',
            'detail.html',
            'order.html',
            'login.html',
            'register.html',
            'gotopay.html',

            'json/*.json',

            'styles/fonts/{,*/}*.*',
            '<%= config.base.dest %>',
            '<%= config.com %>',
            'templates/**/*.mustache'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          src: '<%= config.app %>/scripts/vendor/Uploader.swf',
          dest: '<%= config.dist %>/scripts/Uploader.swf'
        }, {
          src: '<%= config.app %>/css/browser.css',
          dest: '<%= config.dist %>/css/browser.css'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    strip:{
      main: {
        src: '<%= config.dist %>/scripts/**/*.js',
        options: {
          inline: true
        }
      }
    },

    requirejs: {
      main: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.page.main.min.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          include: [
            'sf.b2c.mall.page.main'
          ],
          insertRequire: ['sf.b2c.mall.page.main']
        }
      },
      detail: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.page.detail.min.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment':'../bower_components/momentjs/min/moment.min',
            'fastclick': '../bower_components/fastclick/lib/fastclick'
          },
          include: [
            'sf.b2c.mall.product.detailcontent',
            'sf.b2c.mall.adapter.detailcontent',
            'sf.helpers',
            'sf.b2c.mall.page.detail'
          ],
          insertRequire: ['sf.b2c.mall.page.detail']
        }
      },
      order: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.page.order.min.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment':'../bower_components/momentjs/min/moment.min',
            'fastclick': '../bower_components/fastclick/lib/fastclick'
          },
          include: [
            'sf.b2c.mall.order.selectreceiveaddr',
            'sf.b2c.mall.order.iteminfo',
            'sf.helpers',
            'sf.b2c.mall.adapter.address.list',
            'sf.b2c.mall.component.addreditor',
            'sf.b2c.mall.adapter.order',
            'sf.b2c.mall.adapter.regions',
            'sf.b2c.mall.order.fn',
            'sf.b2c.mall.page.order'
          ],
          insertRequire: ['sf.b2c.mall.page.order']
        }
      },
      login: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.page.login.min.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          include: [
            'sf.b2c.mall.component.login',
            'sf.b2c.mall.page.login'
          ],
          insertRequire: ['sf.b2c.mall.page.login']
        }
      },
      register: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.page.register.min.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          include: [
            'sf.b2c.mall.component.register',
            'sf.b2c.mall.page.register'
          ],
          insertRequire: ['sf.b2c.mall.page.register']
        }
      },
      gotopay: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.page.gotopay.min.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment':'../bower_components/momentjs/min/moment.min'
          },
          include: [
            'sf.helpers',
            'moment',
            'sf.b2c.mall.order.fn',
            'sf.b2c.mall.page.gotopay'
          ],
          insertRequire: ['sf.b2c.mall.page.gotopay']
        }
      }

    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    if (target === 'browser') {
      grunt.task.run([
        // 'jshint',
        'connect:test',
        'watch'
      ]);
    }else{
      grunt.task.run([
        'connect:test',
        'mocha'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', function(target){
    grunt.file.recurse('app/scripts/base', function callback(abspath, rootdir, subdir, filename) {
      var arr = filename.split('.')
      if (arr[2] == 'com') {
        config.com = 'scripts/base/'+filename
      }

      if (filename.indexOf(target) > -1 && arr[2] == target) {
        config.target = target;
        config.base = {
          dest: 'scripts/base/'+filename,
          src: 'scripts/base/'+filename
        }

        grunt.task.run([
          'clean:dist',
          'useminPrepare',
          'concurrent:dist',
          'autoprefixer',
          'concat',
          'cssmin',
          'uglify',
          'copy:dist',
          'requirejs:main',
          'requirejs:detail',
          'requirejs:order',
          'requirejs:login',
          'requirejs:register',
          'requirejs:gotopay',

          'usemin',
          // 'htmlmin',
          'strip:main',
          'clean:extra'
        ]);
      }
    })
  })

  // grunt.registerTask('build', [
  //   'clean:dist',
  //   'wiredep',
  //   'useminPrepare',
  //   'concurrent:dist',
  //   'autoprefixer',
  //   'concat',
  //   'cssmin',
  //   'uglify',
  //   'copy:dist',
  //   'requirejs:preheat',
  //   'rev',
  //   'usemin',
  //   'htmlmin'
  // ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
