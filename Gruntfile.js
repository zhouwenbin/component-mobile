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

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    publish: 'publish',
    timestamp: Date.now()
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
            '<%= config.dist %>/index.html',
            '<%= config.dist %>/detail.html',
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
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
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

            'templates/{,*/}*.mustache',
            '*.html',
            'styles/fonts/{,*/}*.*'
          ]
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

    rename: {
      main: {
        files: [
          { src: '<%=config.dist%>/agreement.html', dest: '<%=config.dist%>/agreement.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/alipayframe.html', dest: '<%=config.dist%>/alipayframe.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/center.html', dest: '<%=config.dist%>/center.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/gotopay.html', dest: '<%=config.dist%>/gotopay.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/login.html', dest: '<%=config.dist%>/login.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/order.html', dest: '<%=config.dist%>/order.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/orderdetail.html', dest: '<%=config.dist%>/orderdetail.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/orderlist.html', dest: '<%=config.dist%>/orderlist.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/pay-success.html', dest: '<%=config.dist%>/pay-success.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/recaddrmanage.html', dest: '<%=config.dist%>/recaddrmanage.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/register.html', dest: '<%=config.dist%>/register.html?t=<%=config.timestamp%>'},
          { src: '<%=config.dist%>/weixincenter.html', dest: '<%=config.dist%>/weixincenter.html?t=<%=config.timestamp%>'}
        ]
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
            src: ['scripts/**', 'styles/**'],
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
            src: ['templates/**', '*.html?t=<%=config.timestamp%>'],
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
            src: ['templates/**', '*.html?t=<%=config.timestamp%>, scripts/**', 'styles/**'],
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

    requirejs: {
      detail: {
        options: {
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.detail.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.order.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.login.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.register.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.gotopay.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.order.list.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.order.detail.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.center.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.weixincenter.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.alipayframe.js',
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
          out: './<%= config.tmp %>/concat/scripts/sf.b2c.mall.page.recaddrmanage.js',
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
        'rev',
        'usemin',
        'htmlmin',
        'rename',
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
        'rev',
        'usemin',
        'htmlmin',
        'rename',
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
