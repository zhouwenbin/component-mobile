'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderdetailcontent',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.nav'
  ],

  function(can, $, SFFrameworkComm, SFOrderDetailContent, SFWeixin, SFConfig, SFNav) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var order = can.Control.extend({

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

    new order('#order');
  });