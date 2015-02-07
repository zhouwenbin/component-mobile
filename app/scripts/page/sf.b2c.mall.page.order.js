'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.selectreceiveaddr',
    'sf.b2c.mall.order.iteminfo',
    'sf.weixin',
    'sf.b2c.mall.business.config'
  ],

  function(can, $, SFFrameworkComm, SelectReceiveAddr, ItemInfo, SFWeixin, SFConfig) {

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

        new ItemInfo('.sf-b2c-mall-order-itemInfo', {
          selectReceiveAddr: this.component.selectReceiveAddr
        });
      },

      supplement: function() {

      }
    });

    new order('#order');
  });