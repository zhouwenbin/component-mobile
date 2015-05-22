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

    var LIMITED_PRICE = 1000 * 100;

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


        'sf-is-over-limit': function(totalNum, limitGoodsNum, options) {
          if (totalNum() < limitGoodsNum()) {
            return options.inverse(options.contexts || this);
          } else {
            return options.fn(options.contexts || this);
          }
        },

        'sf-is-over-pay': function(total, limit, options) {
          if (total() < limit()) {
            return options.inverse(options.contexts || this);
          } else {
            return options.fn(options.contexts || this);
          }
        },

        /**
         * @description 是否允许付款
         * @param  {array} groups  不同goods的分组列表
         * @return {function} 是否展示
         */
        'sf-is-allow-pay': function(groups, fee, options) {
          var isAllow = false;
          var array = groups();

          // 如果没有任何商品选中，不允许提交
          _.each(array, function(item) {
            _.each(item.goodItemList, function(good) {
              isAllow = isAllow || good.isSelected;
              if (isAllow) break;
            });
          });

          // 如果超过支付限额，不允许提交
          if (fee.actualTotalFee > LIMITED_PRICE) isAllow = false;

          if (isAllow) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
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
            var params = this.getItemInfo(item);

            updatenum.sendRequest().done(_.bind(this.paint, this));
          },

          'removeitem': function(items) {
            var removeitem = new SFShopcartRemoveItem();
            var params = {
              itemIds: JSON.stringify(this.getItemIds(items))
            }

            removeitem.sendRequest(params).done(_.bind(this.paint, this));
          },

          'refreshcart': function(items) {
            var refreshCart = new SFShopcartFreshCart();
            var params = {
              goods: JSON.stringify(this.getItemsSelectd(items))
            }

            refreshCart.sendRequest(params).done(_.bind(this.paint, this));
          }

        }

        var fn = map[tag];
        if (_.isFunction(fn)) {
          fn.apply(this, cparams);
        }
      },

      getItemsSelectd: function(items) {
        var array = [];
        _.each(items, function(item) {
          array.push({
            isSelected: item.isSelected,
            itemId: item.itemId
          });
        });

        return array;
      },

      getItemIds: function(items) {
        var array = [];
        _.each(items, function(item) {
          array.push(item.itemId);
        });

        return array;
      },

      getItemInfo: function(item) {
        return {
          itemId: item.itemId,
          num: item.quantity
        };
      },

      /**
       * @description 删除购物车item
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return
       */
      '.remove-item-btn click': function($element, event) {
        // 从上层dom中获取good信息
        var good = $element.closet('li').data('good');
        this.requestFactory('removeitem', [good]);
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

      /**
       * @description 选中或者不选商品
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return boolean
       */
      '.select-item click': function($element, event) {
        var good = $element.closet('li').data('good');
        good.isSelected = good.isSelected == 0 ? 1 : 0;
        this.requestFactory('refreshcart', [good]);
      },

      /**
       * @description 全选功能
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return boolean
       */
      '.select-all-items click': function($element, event) {
        var array = [];
        var isSelectedAll = true;
        $('li').each(function(index, element) {
          var good = $(this).data('good');
          isSelectedAll = isSelectedAll && good.isSelected;
          array.push(good);
        });

        if (isSelectedAll) {
          _.each(array, function(item, index) {
            array[index].isSelected＝ 0;
          });
        } else {
          _.each(array, function(item, index) {
            array[index].isSelected＝ 1;
          });
        }

        this.requestFactory('updatenum', array);
      },

      'li swipeLeft': function() {
        $(this).css({
          left: -61
        });
      },

      'li swipeRight': function() {
        $(this).css({
          left: 0
        });
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
        $('.overflow-num').fadeIn('slow');
      }
    });

  });