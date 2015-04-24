'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.selectreceiveaddr',
    'sf.weixin',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SelectReceiveAddr, SFWeixin, SFConfig) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var order = can.Control.extend({

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

    new order('#order');
  });