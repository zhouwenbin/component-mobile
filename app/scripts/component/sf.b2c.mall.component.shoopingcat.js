'use strict';

define(
  'sf.b2c.mall.component.shoppingcart',

  [
    'can',
    'jquery',
    'underscore',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.shopcart.getCart',
    'sf.b2c.mall.api.shopcart.refreshCart',
    'sf.b2c.mall.api.shopcart.removeItemsInCart',
    'sf.b2c.mall.api.shopcart.updateItemNumInCart',
    'sf.b2c.mall.widget.message',
    'text!template_order_shoppingcart'
  ],

  function(can, $, _, SFFrameworkComm, SFFn, SFHelpers, SFConfig, SFShopcartGetCart, SFShopcartFreshCart, SFShopcartRemoveItem, SFShopcartUpdateNumInCart, SFMessage, template_order_shoppingcart) {
    // 在页面上使用fastclick
    Fastclick.attach(document.body);

    // 注册服务端的appid
    SFFrameworkComm.register(3);

    var PageShoppingCart = can.Control.extend({

      helpers: {

      },

      init: function() {
        this.render();
      },

      render: function() {
        // 调用requestFactory接入页面render逻辑
        this.requestFactory('goodsList');
      },

      requestFactory: function(tag) {
        var map = {
          'goodsList': function() {
            // @todo 获取数据

            // 绘制和渲染页面
            this.paint();
          }
        }

        var fn = map[tag];
        if (_.isFunction(fn)) {
          fn.call(this);
        }
      },

      paint: function(data) {
        var renderFn = can.mustache(template_order_shoppingcart);
        var html = renderFn(data, {}, this.helpers);

        this.element.html(html);
      }
    });

  });