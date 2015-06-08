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
    'sf.hybrid'
  ],

  function(can, $, _, Fastclick, SFFrameworkComm, SFFn, SFHelpers, SFConfig, SFShoppingCart, SFHeaderModule, SFSwitcher, SFHybrid) {
    // 在页面上使用fastclick
    Fastclick.attach(document.body);

    // 注册服务端的appid
    SFFrameworkComm.register(3);

    var PageShoppingCart = can.Control.extend({

      init: function() {
        this.render();
      },

      render: function() {
        var shoopingCart = new SFShoppingCart('.sf-h5-shoppingcart');
      }
    });

    // new PageShoppingCart();

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new PageShoppingCart();
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
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
    // －－－－－－－－－－－－－－－－－－－－－－

  });