'use strict';

define('sf.b2c.mall.order.iteminfo', [
  'can',
  'zepto',
  'sf.b2c.mall.api.b2cmall.getProductHotData',
  'sf.b2c.mall.api.b2cmall.getItemSummary',
  'sf.b2c.mall.api.order.submitOrderForAllSys',
  'sf.b2c.mall.api.order.queryOrderCoupon',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.api.user.getIDCardUrlList',
  'sf.b2c.mall.api.user.setDefaultAddr',
  'sf.b2c.mall.api.user.setDefaultRecv',
  'sf.helpers',
  'sf.b2c.mall.widget.message',
  'sf.b2c.mall.business.config'
], function(can, $, SFGetProductHotData, SFGetItemSummary, SFSubmitOrderForAllSys, SFQueryOrderCoupon, SFGetRecAddressList, SFGetIDCardUrlList, SFSetDefaultAddr, SFSetDefaultRecv, helpers, SFMessage, SFConfig) {
  return can.Control.extend({
    itemObj: new can.Map({}),
    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
      var params = can.deparam(window.location.search.substr(1));
      options.itemid = params.itemid;
      options.amount = params.amount;

      var that = this;

      can.when(this.initItemSummary(options), this.initProductHotData(options))
        .then(function(){
          return that.initCoupons(options);
        })
        .always(function() {
          var html = can.view('templates/order/sf.b2c.mall.order.iteminfo.mustache', that.itemObj);
          that.element.html(html);

          if (that.itemObj.orderCoupon && that.itemObj.orderCoupon.avaliableAmount) {
            var tmpCouponHtmls;
            for(var i = 0, tmpAc; tmpAc = that.itemObj.orderCoupon.avaliableCoupons[i]; i++) {
              tmpCouponHtmls += "<option value=" + tmpAc.couponCode + " data-price=" + tmpAc.price + ">" + tmpAc.couponDescription + "</option>";
            }
            $("#selectCoupon").append(tmpCouponHtmls);
          }

          $('.loadingDIV').hide();
          $("#submitOrder").click(function() {
            that.submitOrderClick($(this));
          });
        });
    },

    '#selectCoupon change': function(targetElement){
      var selectedEle = $(targetElement[0][$(targetElement).get(0).selectedIndex]);
      var price = selectedEle.data("price");
      if (price != 0) {
        this.itemObj.attr("orderCoupon.useQuantity", 1);
        this.itemObj.orderCoupon.selectCoupons = [$(targetElement).val()];
      } else {
        this.itemObj.attr("orderCoupon.useQuantity", 0);
        this.itemObj.orderCoupon.selectCoupons = [];
      }
      this.itemObj.attr("orderCoupon.discountPrice", price);
    },

    errorMap: {
      //"4000100": "order unkown error",
      "4000200": "订单地址不存在",
      "4000400": "订单商品信息改变",
      "4000500": "订单商品库存不足",
      "4000600": "订单商品超过限额",
      "4000700": "订单商品金额改变",
      "4002700": "订单商品已下架",
      "4100901": "优惠券使用失败",
      "4100902": "优惠券不在可使用的时间范围内",
      "4100903": "优惠券不能在该渠道下使用",
      "4100904": "优惠券不能在该终端下使用",
      "4100905": "使用的优惠券不满足满减条件",
      "4100906": "使用的优惠券金额超过商品总金额的30%"
    },

    submitOrderClick: function(element, event) {
      var that = this;

      //防止重复提交
      if (element.hasClass("disable")){
        return false;
      }

      element.addClass("disable");

      var selectAddr = that.options.selectReceiveAddr.getSelectedAddr();

      //进行校验，不通过则把提交订单点亮
      if (typeof selectAddr == 'undefined' || selectAddr == false) {

        new SFMessage(null, {
          'tip': '请选择收货地址！',
          'type': 'error'
        });

        element.removeClass("disable");
        return false;
      }

      //实例化接口
      var setDefaultRecv = new SFSetDefaultRecv({
        "recId": selectAddr.recId
      });

      var setDefaultAddr = new SFSetDefaultAddr({
        "addrId": selectAddr.addrId
      });

      var params = {};

      can.when(setDefaultAddr.sendRequest(), setDefaultRecv.sendRequest())
        .done(function(addrDefault, personDefault) {

          params = {
            "address": JSON.stringify({
              "addrId": selectAddr.addrId,
              "nationName": selectAddr.nationName,
              "provinceName": selectAddr.provinceName,
              "cityName": selectAddr.cityName,
              "regionName": selectAddr.regionName,
              "detail": selectAddr.detail,
              "recName": selectAddr.recName,
              "mobile": selectAddr.cellphone,
              "telephone": selectAddr.cellphone,
              "zipCode": selectAddr.zipCode,
              "recId": selectAddr.recId
            }),
            "userMsg": "",
            "items": JSON.stringify([{
              "itemId": that.options.itemid,
              "num": that.options.amount,
              "price": that.options.sellingPrice
            }]),
            "sysType": 'B2C_H5',
            "couponCodes": JSON.stringify(that.itemObj.orderCoupon.selectCoupons)
          }
        })
        .fail(function(error) {
          element.removeClass("disable");
        })
        .then(function() {
          var submitOrderForAllSys = new SFSubmitOrderForAllSys(params);
          return submitOrderForAllSys.sendRequest();
        })
        .done(function(message) {
          window.location.href = SFConfig.setting.link.gotopay + '&' +
            $.param({
              "orderid": message.value,
              "recid": selectAddr.recId
            });
        })
        .fail(function(error) {
          element.removeClass("disable");
          new SFMessage(null, {
            'tip': that.errorMap[error] || '下单失败',
            'type': 'error'
          });
        });
    },

    initProductHotData: function(options) {
      var that = this;
      var getProductHotData = new SFGetProductHotData({
        'itemId': options.itemid
      });
      var getProductHotDataDefer = getProductHotData.sendRequest();
      getProductHotDataDefer.done(function(priceinfo) {
        that.itemObj.attr({
          "singlePrice": priceinfo.sellingPrice,
          "amount": options.amount,
          "totalPrice": priceinfo.sellingPrice * options.amount,
          "allTotalPrice": priceinfo.sellingPrice * options.amount,
          "shouldPay": priceinfo.sellingPrice * options.amount,
        });
        options.allTotalPrice = that.itemObj.allTotalPrice;
        options.sellingPrice = priceinfo.sellingPrice;
      })
      .fail(function(error) {
        console.error(error);
      });
      return getProductHotDataDefer;
    },

    initItemSummary: function(options) {
      var that = this;
      var getItemSummary = new SFGetItemSummary({
        "itemId":options.itemid
      });

      var getItemSummaryDefer = getItemSummary.sendRequest();
      getItemSummaryDefer.done(function(iteminfo){
        var result = new Array();
        if(typeof iteminfo.specs != "undefined"){
          _.each(iteminfo.specs,function(item){
            result.push(item.specName + "：" +item.spec.specValue);
          });
        }

        that.itemObj.attr({
          "showTax": iteminfo.bonded,    //是否是宁波保税，是得话才展示税额
          "itemName": iteminfo.title,
          "picUrl": iteminfo.image && iteminfo.image.thumbImgUrl,
          "spec": result.length > 0 ? ("<li>" + result.join('</li><li>') + "</li>") : ""
        });
      })
      .fail(function(error) {
        console.error(error);
      });

      return getItemSummaryDefer;
    },

    /*
     * author:zhangke
     */
    initCoupons: function(options) {
      var that = this;
      var queryOrderCoupon = new SFQueryOrderCoupon({
        "items": JSON.stringify([{
          "itemId": options.itemid,
          "num": options.amount,
          "price": this.itemObj.singlePrice
        }]),
        'system': "B2C_H5"
      });
      var queryOrderCouponDefer = queryOrderCoupon.sendRequest();
      queryOrderCouponDefer.done(function(orderCoupon) {
        that.itemObj.attr("isShowCouponArea", true);
        can.extend(orderCoupon, {
          isHaveAvaliable: orderCoupon.avaliableAmount != 0,
          isHaveDisable: orderCoupon.disableAmount != 0,
          useQuantity: 0,
          discountPrice: 0
        });
        that.itemObj.attr("orderCoupon", orderCoupon);
        that.itemObj.orderCoupon.selectCoupons = [];

        that.itemObj.bind("orderCoupon.discountPrice", function(ev, newVal, oldVal) {
          that.itemObj.attr("shouldPay", that.itemObj.shouldPay + oldVal - newVal);
        });
      })
      .fail(function (error) {
        console.error(error);
      });
      return queryOrderCouponDefer;
    }
  });
})