'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.selectreceiveaddr',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'sf.hybrid'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SelectReceiveAddr, SFWeixin, SFConfig, SFSwitcher, SFHybrid) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var SFOrder = can.Control.extend({

      init: function(element, options) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login;
          return false;
        }

        this.component = {};
        this.render();
      },

      render: function() {
        this.component.selectReceiveAddr = new SelectReceiveAddr('.sf-b2c-mall-order-selectReceiveAddress');
      },

      supplement: function() {
      }
    });

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new SFOrder('#order');
      new SFNav('.sf-b2c-mall-nav');
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
          SFHybrid.isLogin();
          new SFOrder('#order');
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });