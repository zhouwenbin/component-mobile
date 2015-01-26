'use strict';

define(
  [
    'can',
    'jquery',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.selectreceiveaddr',
    'sf.b2c.mall.order.iteminfo'
  ],

  function(can, $, SFFrameworkComm, SelectReceiveAddr, ItemInfo) {
    SFFrameworkComm.register(1);

    var order = can.Control.extend({

      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html';
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