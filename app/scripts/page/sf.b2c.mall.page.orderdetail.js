'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderdetailcontent',
    'sf.weixin'
  ],

  function(can, $, SFFrameworkComm, SFOrderDetailContent, SFWeixin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var order = can.Control.extend({

      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html?from=' + escape(window.location.pathname);
          return false;
        }

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