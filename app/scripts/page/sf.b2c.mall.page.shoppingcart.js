'use strict';

define(
  'sf.b2c.mall.page.shoppingcart',

  [
    'can',
    'zepto',
    'underscore',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.shoppingcart',
    'sf.b2c.mall.module.header',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.widget.loading',
  ],

  function(can, $, _, Fastclick, SFFrameworkComm, SFFn, SFHelpers, SFConfig,
    SFShoppingCart, SFHeaderModule, SFSwitcher, SFHybrid, SFLoading) {
    // 在页面上使用fastclick
    // Fastclick.attach(document.body);

    // 注册服务端的appid
    SFFrameworkComm.register(3);

    var loadingCtrl = new SFLoading();

    var PageShoppingCart = can.Control.extend({

      init: function() {
        loadingCtrl.show();
        this.render();
      },

      render: function() {
        var shoopingCart = new SFShoppingCart('.sf-h5-shoppingcart');
      }
    });

    // new PageShoppingCart();

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    $(function () {
      var switcher = new SFSwitcher();

      switcher.register('web', function() {
        // 显示蒙层
        new PageShoppingCart();
      });

      switcher.register('app', function() {
        var app = {
          initialize: function() {
            this.bindEvents();
          },

          bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener('resume', this.onResume, false);
          },

          onResume: function () {
            // 粗暴的重刷页面获取新数据
            window.location.reload();
          },

          onDeviceReady: function() {
            app.receivedEvent('deviceready');
          },

          receivedEvent: function(id) {
            SFHybrid.setNetworkListener();
            SFHybrid.isLogin().done(function () {
              new PageShoppingCart();
            });
          }
        };

        app.initialize();
      });

      switcher.go();
    })
    // －－－－－－－－－－－－－－－－－－－－－－

  });