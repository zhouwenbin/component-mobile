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

    var LIMITED_PRICE = 1000;

    var PageShoppingCart = can.Control.extend({

      helpers: {

        /**
         * @description 商品情况是否属于可购买
         * @param  {array} goodList   商品列表
         * @param  {string} type      类型avail|disable
         * @param  {object} options
         * @return {function} 是否展示
         */
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

        /**
         * @description 显示商品图片
         * @param  {array} images 商品图片列表
         * @return {string}       图片地址
         */
        'sf-show-img': function(images) {
          var array = images();
          if (_.isArray(array) && array.length > 0) {
            return array[0];
          }
        },

        /**
         * @description 通过活动价格/是否可食用活动价格/商品价格，来计算销售价格
         * @param  {function} canUseActivityPrice 是否使用活动价格
         * @param  {function} activityPrice       活动价格
         * @param  {function} price               商品价格
         * @return {int} 商品价格
         */
        'sf-selling-price': function(canUseActivityPrice, activityPrice, price) {
          if (canUseActivityPrice()) {
            return activityPrice() / 100;
          } else {
            return price() / 100;
          }
        },

        /**
         * @description 如果价格超过海关上线提示用户
         * @param  {function} totalFee 总价格信息
         * @return {function} 是否展示
         */
        'sf-is-over-limit': function(totalFee) {
          if (totalFee() < LIMITED_PRICE) {
            return options.inverse(options.contexts || this);
          } else {
            return options.fn(options.contexts || this);
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

          'removeitem': function(items) {
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

      getItemIds: function(items) {

      },

      getItemInfo: function(item) {
        return {
          itemId: item.itemId,
          num: item.quantity
        };
      },

      /**
       * @description 购物车item数量减1
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return boolean
       */
      '.minus-num click': function($element, event) {
        // 从上层dom中获取good信息
        var good = $element.closet('li').data('good');

        if (good.quantity > 0) {
          good.quantity = good.quantity - 1;
          this.requestFactory('updatenum', good);
        }

        return false;
      },

      /**
       * @description 购物车item数量加1
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return boolean
       */
      '.plus-num click': function($element, event) {
        // 从上层dom中获取good信息
        var good = $element.closet('li').data('good');

        if (good.quantity + 1 < good.limitQuantity) {
          good.quantity = good.quantity + 1;
          this.requestFactory('updatenum', good);
        } else {
          this.showAlert($element, good);
        }

        return false;
      },

      /**
       * @description 购物车item数量变化
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return boolean
       */
      '.input-num change': function($element, event) {
        var ask = $element.val();
        var good = $element.closet('li').data('good');

        if (ask < good.limitQuantity) {
          this.requestFactory('updatenum', good);
        } else {
          $element.val(1);
          this.showAlert($element, good);
        }

        return false;
      },

      showAlert: function($element, good) {
        // 如果用户增加的数量大于限购数量，显示错误提示
        var word = '';
        _.each(good.limitDescList, function(value, key, list) {
          word = word + value.desc + ' '
        });

        $element.closet('.text-error').text(word);
      },

      paint: function(data) {
        var renderFn = can.mustache(template_order_shoppingcart);
        var html = renderFn(data, {}, this.helpers);

        this.element.html(html);
      }
    });

  });