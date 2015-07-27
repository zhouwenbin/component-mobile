'use strict';

define(
  'sf.b2c.mall.page.mypoint', [
    'can',
    'zepto',
    'fastclick',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.component.mypoint',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, Fastclick, util, SFFrameworkComm, SFMessage, SFNav, SFHeader,  SFConfig, SFSwitcher, SFHybrid, SFPoint, SFLoading) {

    SFFrameworkComm.register(3);
    Fastclick.attach(document.body);

    var loadingCtrl = new SFLoading();

    var myPoint = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        }

        new SFPoint('#mypoint');
      }
    });


    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {

      // 显示蒙层
      loadingCtrl.show();

      new SFPoint('#mypoint');
      //new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
          // document.addEventListener('resume', this.onResume, false);
        },

        onResume: function() {
          // 粗暴的重刷页面获取新数据
          window.location.reload();
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          SFHybrid.setNetworkListener();
          SFHybrid.isLogin().done(function() {
            new SFPoint('#mypoint');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });
