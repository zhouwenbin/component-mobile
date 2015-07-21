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
    'sf.hybrid',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.widget.loading'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SelectReceiveAddr, SFWeixin, SFConfig,
    SFSwitcher, SFHybrid, SFNav, SFLoading) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var loadingCtrl = new SFLoading();

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

      // 显示蒙层
      loadingCtrl.show();

      new SFOrder('#order');
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
            new SFOrder('#order');
          });

          var callback = function () {
            window.location.reload();
          }

          SFHybrid.notification.add('NotificationAddressDidDelete', callback);
          SFHybrid.notification.add('NotificationAddressDidEdit', callback);
          SFHybrid.notification.add('NotificationAddressDidAdd', callback);
          SFHybrid.notification.add('NotificationAddressDidSetDefault', callback);
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });