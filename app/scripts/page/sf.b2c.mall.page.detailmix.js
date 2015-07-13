'use strict';

define(
  'sf.b2c.mall.page.detailmix', [
    'can',
    'zepto',
    'underscore',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.business.config',
    'text!template_detail_mix',
    'sf.b2c.mall.api.product.findMixDiscountProducts',
    'sf.b2c.mall.api.shopcart.addItemsToCart'
  ],

  function(can, $, _, Fastclick, SFFrameworkComm, SFFn, SFHelpers, SFConfig, template_detail_mix, SFFindMixDiscountProducts, SFAddItemToCart) {
    // 在页面上使用fastclick
    Fastclick.attach(document.body);

    // 注册服务端的appid
    SFFrameworkComm.register(3);

    var pageDetailMix = can.Control.extend({

      helpers: {
        'isShowTotalSavePrice': function(totalSavePrice, options) {
          if (totalSavePrice() > 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        //原价大于活动价，才展示活动价
        'sf-show-originPrice': function(originPrice, sellingPrice, options) {
          if (originPrice() > sellingPrice()) {
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
        var that = this;
        //http://m.sfht.com/detail-mix.html?itemid=1&activityId=100353
        var param = can.deparam(window.location.search.substr(1));
        var findMixDiscountProducts = new SFFindMixDiscountProducts({
          'itemId': param.itemid,
          'activityId': param.activityId
        });
        findMixDiscountProducts.sendRequest()
          .done(function(data) {

            var totalSellingPrice = 0;
            var totalOriginPrice = 0;

            //找到主商品
            var mainProductItem = _.find(data.value, function(item) {
              return item.isMixDiscountMasterItem == true
            });
            //剩余搭配商品
            var mixProductItems = _.reject(data.value, function(item) {
              return item.isMixDiscountMasterItem == true
            });
            //将主商品放在第一位
            mixProductItems.splice(0, 0, mainProductItem);
            that.options.data = new can.Map();
            //获取总原价和总活动价
            _.each(data.value, function(item) {
              totalSellingPrice += item.sellingPrice;
              totalOriginPrice += item.originPrice;
            });
            that.options.data.attr({
              goods: mixProductItems,
              totalcount: 4,
              totalSavePrice: totalOriginPrice - totalSellingPrice,
              totalSellingPrice: totalSellingPrice,
              totalOriginPrice: totalOriginPrice
            });

            var renderFn = can.mustache(template_detail_mix);
            var html = renderFn(that.options.data, that.helpers);
            $('body').append(html);
          })
      },
      //单选按钮选中取消
      '.icon49 click': function($element, event) {
        event && event.preventDefault();
        var mixDiscount = $element.closest('li').data('mixDiscount');
        var originPrice = mixDiscount.originPrice; //原价
        var sellingPrice = mixDiscount.sellingPrice; //活动价
        if ($element.attr('data-isSelected') == '1') {
          $element.closest('li').removeClass('active');
          $element.attr('data-isSelected', 0);
          this.options.data.attr({
            totalSellingPrice: this.options.data.attr('totalSellingPrice') - sellingPrice,
            totalOriginPrice: this.options.data.attr('totalOriginPrice') - originPrice
          });
        } else {
          $element.attr('data-isSelected', 1);
          $element.closest('li').addClass('active');
          this.options.data.attr({
            totalSellingPrice: this.options.data.attr('totalSellingPrice') + sellingPrice,
            totalOriginPrice: this.options.data.attr('totalOriginPrice') + originPrice
          });
        }
        var totalSavePrice = this.options.data.attr('totalOriginPrice') - this.options.data.attr('totalSellingPrice');
        this.options.data.attr('totalSavePrice', totalSavePrice);
        var len = $('span[data-isSelected="1"]').length;
        this.options.data.attr('totalcount', len);
      },
      //获取搭配商品中选中商品的itemid和num和mainItemId,加入购物车
      getMixProductItem: function() {
        var param = can.deparam(window.location.search.substr(1));
        var checkedItem = can.$('span[data-isSelected="1"]');
        var arr = [];
        _.each(checkedItem,function(el) {
          arr.push({
            itemId:can.$(el).closest('li').data('mixDiscount').itemId,
            num: 1,
            mainItemId: param.itemid
          });
        });
        return arr;
      },
      //获取搭配商品中选中商品的itemid和num，去支付页
      getSelectMixProduct: function() {
        var checkedItem = can.$('span[data-isSelected="1"]');
        var arr = [];
        _.each(checkedItem, function(el) {
          arr.push({
            itemId: can.$(el).closest('li').data('mixDiscount').itemId
          });
        });
        return arr;
      },
      //搭配折扣立即购买
      '#mix-products-buy click': function(element, event) {
        event && event.preventDefault();
        var param = can.deparam(window.location.search.substr(1));
        var result = JSON.stringify(this.getSelectMixProduct());

        var gotoUrl = 'http://m.sfht.com/order.html' + '?mixproduct=' + result;

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html' + '?from=' + gotoUrl;
        }else{
          window.location.href = gotoUrl;
        }

        

      },
      //搭配折扣加入购物车
      '#mix-products-add click': function(element, event) {
        event && event.preventDefault();
        var that = this;
        var param = can.deparam(window.location.search.substr(1));
        var mixArr = this.getMixProductItem();
        var itemsStr = JSON.stringify(mixArr);
        var addItemToCart = new SFAddItemToCart({
          items: itemsStr
        });

        if (!SFFrameworkComm.prototype.checkUserLogin.call(that)) {
          window.location.href = 'http://m.sfht.com/login.html' + '?from=' + encodeURIComponent(window.location.href);
        } else {
          addItemToCart.sendRequest()
            .done(function(data) {
              window.location.href = "http://m.sfht.com/shoppingcart.html";
            }).fail(function() {

            })
        }


      }

    });

    new pageDetailMix('body');

  });