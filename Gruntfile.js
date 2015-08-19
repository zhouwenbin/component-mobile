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
    oss: 'h5-oss',
    statics: 'h5-static',
    timestamp: Date.now()
  };

  var OSS_HOST = 'http://img.sfht.com/sfhth5';

  var cut = function (dest) {
    var map = ['order/', 'main/', 'center/', 'detail/'];
    for(var i in map){
      if (startsWith(dest, map[i])) {
        dest = dest.slice(0, map[i].length - 1);
      }
    }

    return dest;
  }

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
      oss: {
        files: [{
          dot: true,
          src: [
            '<%= config.oss %>/*'
          ]
        }]
      },
      statics: {
        files: [{
          dot: true,
          src: [
            '<%= config.statics %>/*'
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
        browsers: ['> 1%', 'last 10 versions', 'Firefox ESR', 'Opera 12.1']
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

            if (!config.hybrid && (block.dest == '../cordova.js' || block.dest == '/../cordova.js')) {
              return '';
            }

            if (config.hybrid && block.dest == '/scripts/sf.h5.base.js') {
              return ''
            }else if (!config.hybrid && block.dest == '/scripts/sf.h5.hybrid.base.js') {
              return '';
            }

            if (!config.hybrid && block.dest == '../cordova.js') {
              return '';
            }

            if (config.hybrid) {
              if (block.dest[0] == '/') {
                return '<script src="' + '.' + block.dest +'"></script>';
              }else if (block.dest[0] != './') {
                return '<script src="' + './' + block.dest +'"></script>';
              }else{
                return '<script src="' + block.dest +'"></script>';
              }

              block.dest = cut(dest);
            }

            if (config.version) {
              if (block.dest[0] != '/') {
                return '<script src="'+ OSS_HOST + '/' + config.version + '/' + block.dest +'"></script>';
              }else{
                return '<script src="'+ OSS_HOST + '/' + config.version +  block.dest +'"></script>';
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
            if (config.hybrid) {
              if (block.dest[0] == '/') {
                return '<link rel="stylesheet" href="' + '.' + block.dest +'">';
              }else if (block.dest[0] != './') {
                return '<link rel="stylesheet" href="' + './' + block.dest +'">';
              }else{
                return '<link rel="stylesheet" href="' + block.dest +'">';
              }

              block.dest = cut(dest);
            }

            if (config.version) {
              if (block.dest[0] !='/') {
                return '<link rel="stylesheet" href="'+ OSS_HOST + '/' + config.version + '/' + block.dest +'">';
              }else{
                return '<link rel="stylesheet" href="'+ OSS_HOST + '/' + config.version  + block.dest +'">';
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
          '*.html',
          'header/*.html',
          'footer/*.html'
        ],
        options:{
          process: function (content, srcpath) {
            if (config.version) {
              content = content.replace(/\{version\}/g, config.timestamp);
              content = content.replace(/img\/qrcode.png/g, OSS_HOST+ '/'+ config.version +'/img/qrcode.png');
            }
            return content;
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
          'img/*/{,*/}*.*',
          'img/*/*/{,*/}*.*',
          'img/*/*/*/{,*/}*.*',
        ]
      },

      icon: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>/static',
        dest: '<%= config.dist %>',
        src: [
          'img/icon.png',
          'img/coupon.png',
          'img/coupons.png',
          'img/coupons-c1.png',
          'img/coupons2.png',
          'img/sharepocket.jpg'
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
              return content.replace(/img\/recommend.jpg/g, OSS_HOST+ '/'+ config.version +'/img/recommend.jpg')
            }else{
              return content;
            }
          }
        }
      },

      styles: {
        expand: true,
        dot: true,
        cwd: '.tmp/concat/styles',
        dest: '<%= config.dist %>/styles/',
        src: '{,*/}*.css'
      }
    },

    compress: {
      oss: {
        options: {
          // archive: '<%=config.publish%>/oss.release.<%=config.version%>.tar'
          archive: '<%=config.oss%>/target/<%=config.oss%>.zip',
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
          // archive: '<%=config.publish%>/statics.release.<%=config.version%>.tar'
          archive: '<%=config.statics%>/target/<%=config.statics%>.zip',
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: ['templates/**', '*.html', 'header/*.html', 'footer/*.html','json/**', '*.ico'],
            dest: 'ROOT'
            // dest: 'statics.h5.<%=config.version%>'
          }
        ]
      },
      testv2: {
        options: {
          archive: '<%=config.statics%>/target/<%=config.statics%>.zip',
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: ['templates/**', '*.html', 'header/*.html', 'footer/*.html','json/**', 'scripts/**', 'styles/**', 'img/**'],
            dest: 'ROOT'
            // dest: 'statics.h5.<%=config.version%>'
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
            src: ['templates/**', '*.html', 'img/**', 'json/**', 'scripts/**', 'styles/**', 'header/*.html', 'footer/*.html','json/**'],
            dest: '<%=config.version%>'
          }
        ]
      },

      // hybrid:详情页
      hybrid_detail: {
        options: {
          archive: '<%=config.publish%>/detail.<%=config.version%>.zip',
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: [
              'scripts/require.min.js',
              'scripts/sf.h5.hybrid.base.js',
              'scripts/sf.b2c.mall.h5.page.detail.js',
              'scripts/sf.b2c.mall.h5.page.shoppingcart.js',
              'img/**',
              'styles/**',
              'detail.html',
              'shoppingcart.html'
            ],
            dest: 'detail'
          }
        ]
      },

      // center
      hybrid_center: {
        options: {
          archive: '<%=config.publish%>/center.<%=config.version%>.zip',
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: [
              'scripts/require.min.js',
              'scripts/sf.h5.hybrid.base.js',
              // 'scripts/sf.b2c.mall.h5.page.center.js',
              'scripts/sf.b2c.mall.h5.page.coupon.js',
              'scripts/sf.b2c.mall.h5.page.luckymoneyshare.js',
              'scripts/sf.b2c.mall.h5.page.luckymoneyaccept.js',
              // 'scripts/sf.b2c.mall.h5.page.recaddrmanage.js',
              'img/**',
              'styles/**',
              // 'center.html',
              'coupon.html',
              'luckymoneyaccept.html',
              'luckymoneyshare.html',
              // 'recaddrmanage.html'
            ],
            dest: 'center'
          }
        ]
      },

      // order
      hybrid_order: {
        options: {
          archive: '<%=config.publish%>/order.<%=config.version%>.zip',
        },
        files: [
          {
            expand: true,
            cwd: '<%=config.dist%>',
            src: [
              'scripts/require.min.js',
              'scripts/sf.h5.hybrid.base.js',
              'scripts/sf.b2c.mall.h5.page.order.js',
              'scripts/sf.b2c.mall.h5.page.gotopay.js',
              'scripts/sf.b2c.mall.h5.page.paysuccess.js',
              'scripts/sf.b2c.mall.h5.page.order.detail.js',
              'scripts/sf.b2c.mall.h5.page.order.list.js',
              'scripts/sf.b2c.mall.h5.page.mypoint.js',
              'scripts/sf.b2c.mall.h5.page.refundtax.js',
              'img/**',
              'styles/**',
              'order.html',
              'gotopay.html',
              'pay-success.html',
              'orderdetail.html',
              'orderlist.html',
              'mypoint.html',
              'refundtax.html'
            ],
            dest: 'order'
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
          optimize:'none',
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
          optimize: 'none',
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
          optimize: 'none',
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
      retrieve: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.retrieve.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            'sf.b2c.mall.component.retrieve',
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.retrieve'
          ],
          insertRequire: ['sf.b2c.mall.page.retrieve']
        }
      },
      process: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.process.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.process'
          ],
          insertRequire: ['sf.b2c.mall.page.process']
        }
      },
      activated: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.activated.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.activated'
          ],
          insertRequire: ['sf.b2c.mall.page.activated']
        }
      },
      nullactivated: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.nullactivated.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.nullactivated'
          ],
          insertRequire: ['sf.b2c.mall.page.nullactivated']
        }
      },
      gotopay: {
        options: {
          optimize: 'none',
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
          optimize: 'none',
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
          optimize: 'none',
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
      logincenter: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.logincenter.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.logincenter'
          ],
          insertRequire: ['sf.b2c.mall.page.logincenter']
        }
      },
      weixinlogintest: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.weixinlogintest.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.weixinlogintest'
          ],
          insertRequire: ['sf.b2c.mall.page.weixinlogintest']
        }
      },

      invitation: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.invitation.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.invitation'
          ],
          insertRequire: ['sf.b2c.mall.page.invitation']
        }
      },

      invitationshare: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.invitationshare.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.invitationshare'
          ],
          insertRequire: ['sf.b2c.mall.page.invitationshare']
        }
      },

      invitationbag: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.invitationbag.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.module.getcoupon',
            'sf.b2c.mall.page.invitationbag'
          ],
          insertRequire: ['sf.b2c.mall.page.invitationbag']
        }
      },

      bindalipay: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.bindalipay.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.bindalipay'
          ],
          insertRequire: ['sf.b2c.mall.page.bindalipay']
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
      paysuccess: {
        options: {
          optimize:'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.paysuccess.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
            'moment': '../bower_components/momentjs/min/moment.min'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.paysuccess',
            'sf.helpers'
          ],
          insertRequire: ['sf.b2c.mall.page.paysuccess']
        }
      },

      bridge: {
        options: {
          optimize:'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.bridge.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.bridge'
          ],
          insertRequire: ['sf.b2c.mall.page.bridge']
        }
      },
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
          optimize: 'none',
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
      },

        mypoint: {
            options: {
                optimize: 'none',
                preserveLicenseComments: false,
                baseUrl: './app/',
                out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.mypoint.js',
                mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
                paths: {
                    'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
                },
                include: [
                    "sf.b2c.mall.business.config",
                    'sf.b2c.mall.component.mypoint',
                    'sf.b2c.mall.page.mypoint'
                ],
                insertRequire: ['sf.b2c.mall.page.mypoint']
            }
        },
        pointexplain: {
            options: {
                optimize: 'none',
                preserveLicenseComments: false,
                baseUrl: './app/',
                out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.pointexplain.js',
                mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
                paths: {
                    'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
                },
                include: [
                    "sf.b2c.mall.business.config",
                    'sf.b2c.mall.page.pointexplain'
                ],
                insertRequire: ['sf.b2c.mall.page.pointexplain']
            }
        },

        ouba: {
            options: {
                optimize: 'none',
                preserveLicenseComments: false,
                baseUrl: './app/',
                out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.ouba.js',
                mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
                paths: {
                    'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
                },
                include: [
                    "sf.b2c.mall.business.config",
                    'sf.b2c.mall.page.ouba'
                ],
                insertRequire: ['sf.b2c.mall.page.ouba']
            }
        },

        81: {
            options: {
                optimize: 'none',
                preserveLicenseComments: false,
                baseUrl: './app/',
                out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.81.js',
                mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
                paths: {
                    'moment': '../bower_components/momentjs/min/moment.min',
                    'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
                },
                include: [
                    "sf.b2c.mall.business.config",
                    'sf.b2c.mall.page.81'
                ],
                insertRequire: ['sf.b2c.mall.page.81']
            }
        },

        signrule: {
            options: {
                optimize: 'none',
                preserveLicenseComments: false,
                baseUrl: './app/',
                out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.signrule.js',
                mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
                paths: {
                    'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
                },
                include: [
                    "sf.b2c.mall.business.config",
                    'sf.b2c.mall.page.signrule'
                ],
                insertRequire: ['sf.b2c.mall.page.signrule']
            }
        },
      slider: {
        options: {
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.slider.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.slider", "sf.b2c.mall.module.getcoupon"],
          insertRequire:  ['sf.b2c.mall.module.slider']
        }
      },

      getcoupon: {
        options: {
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.getcoupon.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.getcoupon"],
          insertRequire:  ['sf.b2c.mall.module.getcoupon']
        }
      },


      spike: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.spike.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.spike"],
          insertRequire:  ['sf.b2c.mall.module.spike']
        }
      },

      tab: {
        options: {
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.tab.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.tab"],
          insertRequire:  ['sf.b2c.mall.module.tab']
        }
      },

      price: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.price.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.price"],
          insertRequire:  ['sf.b2c.mall.module.price']
        }
      },

      exchangecode: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.exchangecode.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ['sf.b2c.mall.module.exchangecode'],
          insertRequire:  ['sf.b2c.mall.module.exchangecode']
        }
      },

      time: {
        options: {
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.time.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.time"],
          insertRequire:  ['sf.b2c.mall.module.time']
        }
      },

      timecount: {
        options: {
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.timecount.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.timecount"],
          insertRequire:  ['sf.b2c.mall.module.timecount']
        }
      },

      617: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.617.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.617"],
          insertRequire:  ['sf.b2c.mall.module.617']
        }
      },

      newpage: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.newpage.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.newpage"],
          insertRequire:  ['sf.b2c.mall.module.newpage']
        }
      },

      nataralSelect: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.nataralSelect.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.nataralSelect"],
          insertRequire:  ['sf.b2c.mall.module.nataralSelect']
        }
      },

      fixtab: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.fixtab.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.fixtab"],
          insertRequire:  ['sf.b2c.mall.module.fixtab']
        }
      },

      header: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.header.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.header","sf.b2c.mall.module.imagelazyload"],
          insertRequire:  ['sf.b2c.mall.module.header']
        }
      },

      footer: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.footer.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.footer"],
          insertRequire:  ['sf.b2c.mall.module.footer']
        }
      },

      sso: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl:        './app/',
          out:            './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.module.sso.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include:        ["sf.b2c.mall.module.sso"],
          insertRequire:  ['sf.b2c.mall.module.sso']
        }
      },

      coupon: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.coupon.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.coupon'
          ],
          insertRequire: ['sf.b2c.mall.page.coupon']
        }
      },

      luckymoneyshare: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.luckymoneyshare.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.luckymoneyshare'
          ],
          insertRequire: ['sf.b2c.mall.page.luckymoneyshare']
        }
      },

      luckymoneyaccept: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.luckymoneyaccept.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.luckymoneyaccept'
          ],
          insertRequire: ['sf.b2c.mall.page.luckymoneyaccept']
        }
      },

      receivedividents: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.receivedividents.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.receivedividents'
          ],
          insertRequire: ['sf.b2c.mall.page.receivedividents']
        }
      },

      setpassword: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.setpassword.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.setpassword'
          ],
          insertRequire: ['sf.b2c.mall.page.setpassword']
        }
      },

      bindaccount: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.bindaccount.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.bindaccount'
          ],
          insertRequire: ['sf.b2c.mall.page.bindaccount']
        }
      },
      searchwarrior: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.searchwarrior.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.searchwarrior'
          ],
          insertRequire: ['sf.b2c.mall.page.searchwarrior']
        }
      },
      searchwarriorali: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.getalipaycoupon.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.getalipaycoupon'
          ],
          insertRequire: ['sf.b2c.mall.page.getalipaycoupon']
        }
      },

      searchwarriorshare: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.searchwarriorshare.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.searchwarriorshare'
          ],
          insertRequire: ['sf.b2c.mall.page.searchwarriorshare']
        }
      },

      naturalcoupon: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.naturalcoupon.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.naturalcoupon'
          ],
          insertRequire: ['sf.b2c.mall.page.naturalcoupon']
        }
      },

      taiwantravellergift: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.taiwantravellergift.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.taiwantravellergift'
          ],
          insertRequire: ['sf.b2c.mall.page.taiwantravellergift']
        }
      },

      taiwantravellercard: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.taiwantravellercard.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.taiwantravellercard'
          ],
          insertRequire: ['sf.b2c.mall.page.taiwantravellercard']
        }
      },

      taiwantravellerfoodeat: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.taiwantravellerfoodeat.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.taiwantravellerfoodeat'
          ],
          insertRequire: ['sf.b2c.mall.page.taiwantravellerfoodeat']
        }
      },

      520: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.520.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.520'
          ],
          insertRequire: ['sf.b2c.mall.page.520']
        }
      },

      detailmix: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.detailmix.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.detailmix'
          ],
          insertRequire: ['sf.b2c.mall.page.detailmix']
        }
      },

      refundtax: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.refundtax.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.refundtax'
          ],
          insertRequire: ['sf.b2c.mall.page.refundtax']
        }
      },

      shoppingcart: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.shoppingcart.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.shoppingcart'
          ],
          insertRequire: ['sf.b2c.mall.page.shoppingcart']
        }
      },

      search: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.search.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.search'
          ],
          insertRequire: ['sf.b2c.mall.page.search']
        }
      },

      searchgate: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.searchgate.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.categorynavigatelist'
          ],
          insertRequire: ['sf.b2c.mall.page.categorynavigatelist']
        }
      },

      shop: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.shop.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.shop'
          ],
          insertRequire: ['sf.b2c.mall.page.shop']
        }
      },

      freshactive: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.freshactive.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.freshactive'
          ],
          insertRequire: ['sf.b2c.mall.page.freshactive']
        }
      },

      aboutus: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.aboutus.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.aboutus'
          ],
          insertRequire: ['sf.b2c.mall.page.aboutus']
        }
      },

      categorynavigatelist: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.categorynavigatelist.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.categorynavigatelist'
          ],
          insertRequire: ['sf.b2c.mall.page.categorynavigatelist']
        }
      },

      app: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.app.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.app'
          ],
          insertRequire: ['sf.b2c.mall.page.app']
        }
      },

      japanpre: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.japanpre.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'touch': '../bower_components/zeptojs/src/touch',
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.japanpre'
          ],
          insertRequire: ['sf.b2c.mall.page.japanpre']
        }
      },

      promoterorder: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.promoterorder.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.promoterorder'
          ],
          insertRequire: ['sf.b2c.mall.page.promoterorder']
        }
      },


      tmlg: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.h5.page.tmlg.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            'moment': '../bower_components/momentjs/min/moment.min',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            "sf.b2c.mall.business.config",
            'sf.b2c.mall.page.tmlg'
          ],
          insertRequire: ['sf.b2c.mall.page.tmlg']
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

  grunt.registerTask('hybrid', function (module, version) {

    var map = {
      all: ['compress:hybrid_detail', 'compress:hybrid_order', 'compress:hybrid_center'],
      detail: ['compress:hybrid_detail'],
      order: ['compress:hybrid_order'],
      center: ['compress:hybrid_center']
    }

    config.version = version;
    config.hybrid = true;
    config.target = 'hybrid';

    var base = [
      'clean:dist',
      // 'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'requirejs',
      'cssmin',
      'uglify',
      'copy:dist',
      'copy:html',
      // 'copy:image',
      'copy:icon',
      'copy:templates',
      // 'copy:scripts',
      'usemin',
      // 'htmlmin',
      // 'copy:styles',
      'clean:publish'
    ]

    var array = base.concat(map[module] || []);
    grunt.task.run(array);
  });


  grunt.registerTask('build', function (target) {
    config.target = target;

    if (config.target) {
      grunt.task.run([
        'clean:dist',
        // 'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs',
        // 'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        // 'htmlmin',
        'copy:styles',
        'clean:extra',
        'clean:publish',
        'compress:test'
      ]);
    }else{
      grunt.fail.fatal('缺少环境参数!');
    }
  });

  grunt.registerTask('test', function () {
      config.target = 'prd';

      grunt.task.run([
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        // 'autoprefixer',
        'concat',
        'requirejs',
        // 'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        // 'htmlmin',
        'copy:styles',
        'clean:extra',
        'clean:publish',
        'clean:oss',
        'clean:statics',
        'compress:testv2'
        // 'compress:oss',
        // 'compress:statics'
      ]);
  })

  grunt.registerTask('release', function (version) {
    config.version = version;

    if (config.version) {
      config.target = 'prd';

      grunt.task.run([
        'clean:dist',
        // 'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs',
        // 'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        // 'htmlmin',
        'copy:styles',
        'clean:extra',
        'clean:publish',
        'clean:oss',
        'clean:statics',
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
