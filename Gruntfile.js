// Generated on 2015-02-03 using
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

  var generator = require('./apigen');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    publish: 'publish',
    timestamp: Date.now()
  };

  var OSS_HOST = 'http://img.sfht.com/sfhth5';

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
      server: '.tmp',
      publish:{
        files: [{
          dot: true,
          src: [
            '<%= config.publish %>/*'
          ]
        }]
      },
      extra: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/index.html'
          ]
        }]
      }
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
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
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
        '<%= config.app %>/*.html',
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/img',
          '<%= config.dist %>/scripts',
          '<%= config.dist %>/styles'
        ],
        blockReplacements: {
          js: function (block) {
            if (config.version) {
              if (block.dest[0] != '/') {
                return '<script src="'+ OSS_HOST + '/' + config.version + '/' + block.dest +'"></script>';
              }else{
                return '<script src="'+ OSS_HOST + config.version + '/' + block.dest +'"></script>';
              }
            }else{
              if (block.dest[0] != '/') {
                return '<script src="' + '/' + block.dest +'"></script>';
              }else{
                return '<script src="' + block.dest +'"></script>';
              }
            }
          },
          css: function (block) {
            if (config.version) {
              if (block.dest[0] !='/') {
                return '<link rel="stylesheet" href="'+ OSS_HOST + '/' + config.version + '/' + block.dest +'">';
              }else{
                return '<link rel="stylesheet" href="'+ OSS_HOST + config.version + '/' + block.dest +'">';
              }
            }else{
              if (block.dest[0] != '/') {
                return '<link rel="stylesheet" href="'+ '/' + block.dest +'">';
              }else{
                return '<link rel="stylesheet" href="'+ block.dest +'">';
              }
            }
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
          removeOptionalTags: true,
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
          timestamp: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',

            // 不需要static中的html
            // '{,*/}*.html',

            'json/{,*/}*.json',
            // 'templates/{,*/}*.mustache',
            // '*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },

      html: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
        src: [
          '*.html'
        ],
        options:{
          process: function (content, srcpath) {
            return content.replace(/\{version\}/g, config.timestamp);
          }
        }
      },

      image: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>/static',
        dest: '<%= config.dist %>',
        src: [
          'img/{,*/}*.*',
        ]
      },

      // @todo需要修改，自动笔变化图片
      templates: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
        src: [
          'templates/{,*/}*.mustache'
        ],
        options:{
          process: function (content, srcpath) {
            if (config.version) {
              return content.replace(/img\/recommend.jpg/g, OSS_HOST+'/img/recommend.jpg')
            }else{
              return content;
            }
          }
        }
      },

      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    compress: {
      oss: {
        options: {
          archive: '<%=config.publish%>/oss.release.<%=config.version%>.tar'
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: ['scripts/**', 'styles/**', 'img/**'],
            dest: '<%=config.version%>'
          }
        ]
      },
      statics: {
        options: {
          archive: '<%=config.publish%>/statics.release.<%=config.version%>.tar'
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: ['templates/**', '*.html', 'json/**'],
            dest: 'statics.<%=config.version%>'
          }
        ]
      },
      test: {
        options: {
          archive: '<%=config.publish%>/statics.<%=config.target%>.<%=config.timestamp%>.tar'
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: ['templates/**', '*.html', 'img/**', 'json/**', 'scripts/**', 'styles/**'],
            dest: '<%=config.version%>'
          }
        ]
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

    // @todo 需要修改，自动找到并配置requirejs
    requirejs: {
      main: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/sf.b2c.mall.h5.page.main.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            'sf.b2c.mall.component.price',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.main'
          ],
          insertRequire: ['sf.b2c.mall.page.main']
        }
      },
      detail: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.detail.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'fastclick': '../bower_components/fastclick/lib/fastclick'
          },
          include: [
            'sf.b2c.mall.product.detailcontent',
            'sf.b2c.mall.adapter.detailcontent',
            "sf.b2c.mall.business.config",
            'sf.helpers',
            'sf.b2c.mall.widget.loading',
            'sf.b2c.mall.page.detail'
          ],
          insertRequire: ['sf.b2c.mall.page.detail']
        }
      },
      order: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.order.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'fastclick': '../bower_components/fastclick/lib/fastclick'
          },
          include: [
            'sf.b2c.mall.order.selectreceiveaddr',
            'sf.b2c.mall.order.iteminfo',
            "sf.b2c.mall.business.config",
            'sf.helpers',
            'sf.b2c.mall.adapter.address.list',
            'sf.b2c.mall.component.addreditor',
            'sf.b2c.mall.adapter.order',
            'sf.b2c.mall.adapter.regions',
            'sf.b2c.mall.order.fn',
            'sf.b2c.mall.widget.loading',
            'sf.b2c.mall.page.order'
          ],
          insertRequire: ['sf.b2c.mall.page.order']
        }
      },
      login: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.login.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            'sf.b2c.mall.component.login',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.login'
          ],
          insertRequire: ['sf.b2c.mall.page.login']
        }
      },
      register: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.register.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            'sf.b2c.mall.component.register',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.register'
          ],
          insertRequire: ['sf.b2c.mall.page.register']
        }
      },
      gotopay: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.gotopay.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            'sf.helpers',
            'moment',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.order.fn',
            'sf.b2c.mall.widget.loading',
            'sf.b2c.mall.page.gotopay'
          ],
          insertRequire: ['sf.b2c.mall.page.gotopay']
        }
      },
      orderlist: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.order.list.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            'sf.b2c.mall.order.orderlistcontent',
            'moment',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.order.fn',
            'sf.b2c.mall.widget.message',
            'sf.b2c.mall.page.orderlist'
          ],
          insertRequire: ['sf.b2c.mall.page.orderlist']
        }
      },
      orderdetail: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.order.detail.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            'sf.b2c.mall.order.orderdetailcontent',
            'sf.helpers',
            'moment',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.order.fn',
            'sf.b2c.mall.page.orderdetail'
          ],
          insertRequire: ['sf.b2c.mall.page.orderdetail']
        }
      },
      center: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.center.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.center'
          ],
          insertRequire: ['sf.b2c.mall.page.center']
        }
      },
      weixincenter: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.weixincenter.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.weixincenter'
          ],
          insertRequire: ['sf.b2c.mall.page.weixincenter']
        }
      },
      alipayframe: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.alipayframe.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.alipayframe'
          ],
          insertRequire: ['sf.b2c.mall.page.alipayframe']
        }
      },
      // paysuccess: {
      //   options: {
      //     preserveLicenseComments: false,
      //     baseUrl: './app/',
      //     out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.alipayframe.min.js',
      //     mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js"
      //   }
      // },
      // agreement: {
      //   options: {
      //     preserveLicenseComments: false,
      //     baseUrl: './app/',
      //     out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.agreement.min.js',
      //     mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js"
      //   }
      // },
      recaddrmanage: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.recaddrmanage.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.component.recaddrmanage',
            'sf.b2c.mall.page.recaddrmanage',
            'sf.b2c.mall.adapter.regions',
            'sf.b2c.mall.adapter.address.list'
          ],
          insertRequire: ['sf.b2c.mall.page.recaddrmanage']
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

  grunt.registerTask('create', function () {
    var done = this.async();
    generator.autogen(grunt, done);
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

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });


  grunt.registerTask('build', function (target) {
    config.target = target;

    if (config.target) {
      grunt.task.run([
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs',
        'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        'htmlmin',
        'clean:extra',
        'clean:publish',
        'compress:test'
      ]);
    }else{
      grunt.fail.fatal('缺少环境参数!');
    }
  });

  grunt.registerTask('release', function (version) {
    config.version = version;

    if (config.version) {
      config.target = 'prd';

      grunt.task.run([
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs',
        'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        'htmlmin',
        'clean:extra',
        'clean:publish',
        'compress:oss',
        'compress:statics'
      ]);
    }else{
      grunt.fail.fatal('缺少版本号!');
    }
  })

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
