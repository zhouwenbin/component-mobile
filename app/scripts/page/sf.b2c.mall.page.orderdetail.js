'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderdetailcontent',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.nav',
    'sf.env.switcher',
    'sf.hybrid'
  ],

  function(can, $, SFFrameworkComm, SFOrderDetailContent, SFWeixin, SFConfig, SFNav, SFSwitcher, SFHybrid) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var SFOrderDetail = can.Control.extend({

      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href =  SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        }

        this.render();
      },

      render: function() {
        new SFOrderDetailContent('.sf-b2c-mall-orderdetail');
        new SFNav('.sf-b2c-mall-nav');
      },

      supplement: function() {

      }
    });

    // new SFOrderDetail('#order');

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new SFOrderDetail('#order');
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
          new SFOrderDetail('#order');
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });