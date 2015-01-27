'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderdetailcontent'
  ],

  function(can, $, SFFrameworkComm, SFOrderDetailContent) {
    SFFrameworkComm.register(3);

    var order = can.Control.extend({

      init: function(element, options) {
        this.render();
      },

      render: function() {
        new SFOrderDetailContent('.sf-b2c-mall-orderdetail');
      },

      supplement: function() {

      }
    });

    new order('#order');
  });