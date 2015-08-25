'use strict';

define(
  'sf.b2c.mall.component.shoppingcart',

  [
    'can',
    'zepto',
    'touch',
    'underscore',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.order.fn',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.shopcart.getCart',
    'sf.b2c.mall.api.shopcart.refreshCart',
    'sf.b2c.mall.api.shopcart.removeItemsForCart',
    'sf.b2c.mall.api.shopcart.updateItemNumForCart',
    'sf.b2c.mall.widget.message',
    'text!template_order_shoppingcart',
    'sf.b2c.mall.api.shopcart.isShowCart',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.widget.cartnumber'
  ],

  function(can, $, touch, _, Fastclick, SFFrameworkComm, SFFn, SFHelpers, SFOrderFn, SFConfig, SFShopcartGetCart, SFShopcartFreshCart,
    SFShopcartRemoveItem, SFShopcartUpdateNumInCart, SFMessage, template_order_shoppingcart, SFIsShowCart, SFSwitcher, SFHybrid, SFLoading, SFWidgetCartNumber) {
    // 在页面上使用fastclick
    Fastclick.attach(document.body);

    // 注册服务端的appid
    SFFrameworkComm.register(3);

    var LIMITED_PRICE = 1000 * 100;
    var loadingCtrl = new SFLoading();

    return can.Control.extend({

      helpers: {

        'sf-is-login': function(options) {
          if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

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

          var isAllow = true;
          _.each(array, function(value, key, list) {
            isAllow = isAllow && map[type]
          });

          if (isAllow) {
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
          if (array.length > 0) {
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

        'sf-is-over-pay': function(total, limit, canOrder, options) {
          if (canOrder() == 1) {
            return options.inverse(options.contexts || this);
          } else {
            if (total() < limit()) {
              return options.inverse(options.contexts || this);
            } else {
              return options.fn(options.contexts || this);
            }
          }
        },

        'sf-select-all': function(groups, options) {
          var isSelectedAll = true;
          var array = groups();

          if (array.length == 0) {
            return options.inverse(options.contexts || this);
          }

          array.each(function(item) {
            item.goodItemList.each(function(good) {
              isSelectedAll = isSelectedAll && good.isSelected;
            })
          });

          if (isSelectedAll) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-is-empty': function(groups, options) {
          var array = groups();
          if (array.length > 0) {
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
        'sf-is-allow-pay': function(canOrder, options) {
          // var isAllow = false;
          // var array = groups();
          //canOrder=1 可下单，为0 不可下单
          var canOrder = canOrder();
          // 如果没有任何商品选中，不允许提交
          // _.each(array, function(item) {
          //   _.each(item.goodItemList, function(good) {
          //     isAllow = isAllow || good.isSelected;
          //   });
          // });

          // 如果超过支付限额，不允许提交
          // if (fee().actualTotalFee > LIMITED_PRICE) {
          //   isAllow = false;
          // }
          // if (canOrder === 0) {
          //   isAllow = false;
          // }

          if (canOrder === 1) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-is-show-origin': function(canUseActivityPrice, activityPrice, price, options) {
          if (canUseActivityPrice()) {

            if (price() > activityPrice()) {
              return options.fn(options.contexts || this);
            } else {
              return options.inverse(options.contexts || this);
            }

          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-is-avil-promotion': function(list, options) {
          var info = list();
          var isAllow = false;

          _.each(info, function(item) {
            isAllow = isAllow || item.useRuleDesc
          })

          if (isAllow) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-allow': function(canAddNum, options) {
          var isAllow = canAddNum();

          if (!isAllow) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        'sf-show-firstOrderTips': function(firstOrderInfos, options) {
          if (typeof firstOrderInfos() !== 'undefined' && firstOrderInfos().length > 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

      init: function() {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html?from=' + encodeURIComponent(window.location.href);
        }

        var switcher = new SFSwitcher();

        switcher.register('app', function() {

        });

        switcher.register('web', _.bind(function() {
          this.controlCart();
        }, this));

        switcher.go();

        this.render();
      },

      controlCart: function() {
        if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          this.getUserInfo(_.bind(function(uinfo) {

            var arr = [];
            if (uinfo) {
              arr = uinfo.split(',');
            }

            var flag = arr[4];

            // 如果判断开关关闭，使用dom操作不显示购物车
            if (typeof flag == 'undefined' || flag == '2') {
              window.location.href = 'http://m.sfht.com/index.html';
            } else if (flag == '0') {
              // 请求总开关进行判断
              this.requestIsShowCart();

            } else {
              $(".mini-cart-container-parent").show();
            }
          }, this));

        } else {
          this.requestIsShowCart();
        }
      },

      getUserInfo: function(callback) {

        var that = this;
        var switcher = new SFSwitcher();

        switcher.register('web', function() {
          var uinfo = $.fn.cookie('3_uinfo');
          callback.call(that, uinfo);
        });

        switcher.register('app', function() {
          SFHybrid.getTokenInfo()
            .done(function(data) {
              callback.call(that, data && data.cookie);
            })
            .fail(function() {

            });
        });

        switcher.go();

      },

      requestIsShowCart: function() {
        // @todo 暂时全局关闭购物车按钮
        var isShowCart = new SFIsShowCart();
        isShowCart
          .sendRequest()
          .done(function(data) {
            if (data.value) {} else {
              window.location.href = 'http://m.sfht.com/index.html';
            }
          });
      },

      render: function() {
        // 调用requestFactory接入页面render逻辑
        this.requestFactory('getcart');
      },

      requestError: function() {
        loadingCtrl.hide();
      },

      requestFactory: function(tag, cparams) {
        var map = {
          'getcart': function() {
            // @todo 获取数据
            var getCart = new SFShopcartGetCart();
            getCart.sendRequest().done(_.bind(this.paint, this)).fail(this.requestError);
          },

          'updatenum': function(item) {
            var updatenum = new SFShopcartUpdateNumInCart();
            var params = this.getItemInfo(item);

            updatenum.setData(params);
            updatenum.sendRequest().done(_.bind(this.paint, this)).fail(this.requestError);
          },

          'removeitem': function(items) {
            var removeitem = new SFShopcartRemoveItem();
            var params = {
              items: JSON.stringify(this.getItemIds(items))
            }

            removeitem.setData(params);
            removeitem.sendRequest(params).done(_.bind(this.paint, this)).fail(this.requestError);
          },

          'refreshcart': function(items) {
            var refreshCart = new SFShopcartFreshCart();
            var params = {
              goods: JSON.stringify(this.getItemsSelectd(items))
            }

            refreshCart.setData(params);
            refreshCart.sendRequest(params).done(_.bind(this.paint, this)).fail(this.requestError);
          }

        }

        var fn = map[tag];
        if (_.isFunction(fn)) {
          loadingCtrl.show();
          fn.call(this, cparams);
        }
      },

      getItemsSelectd: function(items) {
        var array = [];
        _.each(items, function(item) {
          array.push({
            isSelected: item.isSelected,
            itemId: item.itemId,
            mainItemId: item.groupKey || ''
          });
        });

        return array;
      },

      getItemIds: function(items) {

        var array = [];
        var obj = {
          itemId: items[0].itemId,
          mainItemId: items[0].groupKey || ''
        };
        array.push(obj);
        return array;
      },

      getItemInfo: function(item) {

        return {
          itemId: item.itemId,
          num: item.quantity,
          mainItemId: item.groupKey || ''
        };
      },

      /**
       * @description 删除购物车item
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return
       */
      'li .remove-item-btn click': function($element, event) {
        // 从上层dom中获取good信息
        var good = $element.closest('li').data('good');
        this.requestFactory('removeitem', [good]);
      },

      /**
       * @description 购物车item数量减1
       * @param  {object} $element 减号按钮对象
       * @param  {event}  event    事件对象
       * @return boolean
       */
      'li .minus-num click': function($element, event) {
        // 从上层dom中获取good信息
        var good = $element.closest('li').data('good');

        if (good.quantity - 1 > 0) {
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
      'li .plus-num click': function($element, event) {
        // 从上层dom中获取good信息
        var good = $element.closest('li').data('good');

        // if (good.quantity < good.limitQuantity) {
        good.quantity = good.quantity + 1;
        this.requestFactory('updatenum', good);
        // } else {
        //   this.showAlert($element, good);
        // }

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
        var good = $element.closest('li').data('good');

        if (ask == 0) {
          $element.val(1);
          this.showAlert($element, good);
        } else if (ask <= good.limitQuantity) {
          good.quantity = $element.val();
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
        var good = $element.closest('li').data('good');
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
        $('.sf-h5-avail-cart li').each(function(index, element) {
          var good = can.$(element).data('good');
          isSelectedAll = isSelectedAll && good.isSelected;
          array.push(good);
        });

        if (isSelectedAll) {
          _.each(array, function(item, index) {
            array[index].isSelected = 0;
          });
        } else {
          _.each(array, function(item, index) {
            array[index].isSelected = 1;
          });
        }

        this.requestFactory('refreshcart', array);
      },

      'li.single-goods swipeLeft': function($element) {
        $element.css({
          left: -61
        });
      },

      'li.single-goods swipeRight': function($element) {
        $element.css({
          left: 0
        });
      },

      '.gotopay click': function($element, event) {
        if ($element.hasClass('btn-disable')) {
          return false;
        }

        window.location.href = SFConfig.setting.link.order;
      },

      showAlert: function($element, good) {
        // 如果用户增加的数量大于限购数量，显示错误提示
        var word = '';
        _.each(good.limitDescList, function(value, key, list) {
          word = word + value.desc + ' '
        });

        $element.closest('.text-orange').text(word);
      },

      paint: function(data) {
        var singleScope = [];
        var partScopeGroups = [];
        var mainItem = [];
        //取出单个商品和组合商品
        _.each(data.scopeGroups, function(cartItem) {
          if (cartItem.scope == 'SINGLE') {
            singleScope.push(cartItem);
          } else {
            partScopeGroups.push(cartItem);
          }
        });
        //将主商品排在第一位
        _.each(partScopeGroups, function(partItem) {
          var found = _.find(partItem.goodItemList, function(goodsItem) {
            return goodsItem.itemId == goodsItem.mainItemId;
          });
          if (found) {
            mainItem.push(found);
            partItem.goodItemList = _.reject(partItem.goodItemList, function(goodsItem) {
              return goodsItem.itemId == goodsItem.mainItemId;
            });
            partItem.goodItemList.splice(0, 0, found);
          }
        })


        this.options.data = new can.Map(data);
        this.options.data.attr({
          singleScope: singleScope,
          partScopeGroups: partScopeGroups
        });

        _.each(this.options.data.attr('partScopeGroups'), function(partScopeItem) {
          partScopeItem.attr('firstGoodItem', partScopeItem.goodItemList[0]);
        });

        _.each(this.options.data.attr('partScopeGroups'), function(partScopeItem) {
          var total = 0;
          _.each(partScopeItem.goodItemList, function(items) {
            if (items.canUseActivityPrice == 1) {
              total += items.activityPrice;
            } else {
              total += items.price;
            }
            //console.log(total);
          });
          partScopeItem.firstGoodItem.attr('totalSavePrice', total);
        });

        var renderFn = can.mustache(template_order_shoppingcart);
        var html = renderFn(this.options.data, this.helpers);

        var switcher = new SFSwitcher();

        switcher.register('web', _.bind(function() {
          this.element.empty(html);
          this.element.append(html);

          can.trigger(window, 'updateCart');
          new SFWidgetCartNumber();
          loadingCtrl.hide();
        }, this));

        switcher.register('app', _.bind(function() {

          if (this.options.data.scopeGroups.length > 0 || SFFn.isMobile.Android()) {
            this.element.empty(html);
            this.element.append(html);
          }

          can.trigger(window, 'updateCart');
          new SFWidgetCartNumber();
          loadingCtrl.hide();
        }, this));

        switcher.go();

        // this.element.html(html);

        // can.trigger(window, 'updateCart');

        // new SFWidgetCartNumber();

        // $('.overflow-num').show();
        // loadingCtrl.hide();

        // setTimeout(function() {
        //   $('.overflow-num').hide();
        // }, 1000);
      }
    });

  });