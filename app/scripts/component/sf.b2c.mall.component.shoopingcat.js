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
        'sf-cart-type': function(goodList, type, options) {
          var array = goodList();
          var map = {
            'avail': true,
            'disable': false
          }

          var goods = _.findWhere(array, {
            isValid: map[type]
          });

          if (goods.length > 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-show-img': function(images) {
          var array = images();
          if (_.isArray(array) && array.length > 0) {
            return array[0];
          }
        },

        'sf-selling-price': function(canUseActivityPrice activityPrice price) {
          if (canUseActivityPrice()) {
            return activityPrice() / 100;
          } else {
            return price() / 100;
          }
        }
      },

      init: function() {
        this.render();
      },

      render: function() {
        // 调用requestFactory接入页面render逻辑
        this.requestFactory('getcart');
      },

      requestFactory: function(tag, cparams) {
        var map = {
          'getcart': function() {
            // @todo 获取数据
            var getCart = new SFShopcartGetCart();
            getCart.sendRequest().done(_.bind(this.paint, this));
          },

          'updatenum': function(item) {
            var updatenum = new SFShopcartUpdateNumInCart();
            var params = this.getItemInfo(item)
          },

          'removeitem': function(list) {
            var removeitem = new SFShopcartRemoveItem();
            var params = {
              itemIds: JSON.stringify(this.getItemIds(list))
            }

            removeitem.sendRequest(params).done(_.bind(this.paint, this));
          },

          'refreshcart': function(items) {
            var refreshCart = new SFShopcartFreshCart();
            var params = {
              goods: JSON.stringify(this.getCartItems(items))
            }

            refreshCart.sendRequest(params).done(_.bind(this.paint, this));
          }

        }

        var fn = map[tag];
        if (_.isFunction(fn)) {
          fn.apply(this, cparams);
        }
      },

      getCartItems: function(items) {

      },

      getItemIds: function(itemList) {

      },

      getItemInfo: function(itemId) {

      },

      paint: function(data) {
        var renderFn = can.mustache(template_order_shoppingcart);
        var html = renderFn(data, {}, this.helpers);

        this.element.html(html);
      }
    });

  });