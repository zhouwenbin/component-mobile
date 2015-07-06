'use strict';

define(
  'sf.b2c.mall.page.invitation', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFInvitationcontent, SFNav, SFHeader, SFBusiness, SFSwitcher, SFHybrid, SFLoading) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var myInvitation = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {
        this.render();
      },

      /**
       * [render 执行渲染]
       */
      render: function() {
        // 列表区域
        this.invitationcontent = new SFInvitationcontent('.sf-b2c-mall-invitation');
      }
    });

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {

      // 显示蒙层
      loadingCtrl.show();

      new myInvitation('.sf-b2c-mall-invitation');
      new SFNav('.sf-b2c-mall-nav');
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
            new myInvitation('.sf-b2c-mall-invitation');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－

  });