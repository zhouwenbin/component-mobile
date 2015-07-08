'use strict';

define(
  'sf.b2c.mall.page.detailmxi', [
    'can',
    'zepto',
    'underscore',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.business.config',
    'text!template_detail_mix',
    'sf.b2c.mall.api.product.findMixDiscountProducts'
  ],

  function(can, $, _, Fastclick, SFFrameworkComm, SFFn, SFHelpers, SFConfig, template_detail_mix, SFFindMixDiscountProducts) {
    // 在页面上使用fastclick
    Fastclick.attach(document.body);

    // 注册服务端的appid
    SFFrameworkComm.register(3);

    var pageDetailMix = can.Control.extend({

      init: function() {
        this.render();
      },

      render: function() {
        var that = this;
        var param =
          var params = can.deparam(window.location.search.substr(1));
        var findMixDiscountProducts = new SFFindMixDiscountProducts({
          'itemId': param.itemid,
          'activityId': param.activityId
        });
        findMixDiscountProducts.sendRequest()
          .done(function(data) {
            that.options.data = new can.Map(data);
            var html = can.view(template_detail_mix);
            $('body').append(html(that.options.data));
          })
      },

      //获取搭配商品中选中商品的itemid和num和mainItemId
      getMixProductItem: function() {
        var itemid = $(".sf-b2c-mall-detail-content").eq(0).attr('data-itemid');
        var checkedItem = $('input[data-isSelected="1"]');
        var arr = [];
        $.each(checkedItem, function(index, val) {
          arr.push({
            itemId: $(val).closest('li').data('mixDiscount').itemId,
            num: 1,
            mainItemId: itemid
          });
        });
        return arr;
      },
      //获取搭配商品中选中商品的itemid和num
      getSelectMixProduct: function() {
        var itemid = $(".sf-b2c-mall-detail-content").eq(0).attr('data-itemid');
        var checkedItem = $('input[data-isSelected="1"]');
        var arr = [];
        $.each(checkedItem, function(index, val) {
          arr.push({
            itemId: $(val).closest('li').data('mixDiscount').itemId
          });
        });
        return arr;
      },
      //搭配折扣立即购买
      '#mix-products-buy click': function(element, event) {
        event && event.preventDefault();
        var itemid = $(".sf-b2c-mall-detail-content").eq(0).attr('data-itemid');
        var mainArr = [{
          itemId: itemid
        }];
        var result = JSON.stringify(mainArr.concat(this.getSelectMixProduct()));

        var gotoUrl = 'http://www.sfht.com/order.html' + '?mixproduct=' + result;

        if (!SFComm.prototype.checkUserLogin.call(this)) {
          this.header.showLogin(gotoUrl);
          return false;
        }

        window.location.href = gotoUrl;

      },
      //搭配折扣加入购物车
      '#mix-products-add click': function(element, event) {
        event && event.preventDefault();
        var that = this;
        var itemid = $(".sf-b2c-mall-detail-content").eq(0).attr('data-itemid');
        var mainArr = [{
          itemId: itemid,
          num: 1,
          mainItemId: itemid
        }];
        var mixArr = this.getMixProductItem();
        var itemsStr = JSON.stringify(mainArr.concat(mixArr));
        var addItemToCart = new SFAddItemToCart({
          items: itemsStr
        });
        if (!SFComm.prototype.checkUserLogin.call(that)) {
          can.trigger(window, 'showLogin', [window.location.href]);
        } else {
          addItemToCart.sendRequest()
            .done(function(data) {
              window.location.href = "http://www.sfht.com/shoppingcart.html";
            }).fail(function() {

            })
        }
      }

    });

    new pageDetailMix();

  });