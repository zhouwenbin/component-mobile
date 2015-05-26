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
    'sf.b2c.mall.module.header'
  ],

  function(can, $, _, Fastclick, SFFrameworkComm, SFFn, SFHelpers, SFConfig, SFShoppingCart, SFHeaderModule) {
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

    new PageShoppingCart();

  });