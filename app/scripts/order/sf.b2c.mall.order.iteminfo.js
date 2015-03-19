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
    itemObj: {},
    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
      var params = can.deparam(window.location.search.substr(1));
      this.options.itemid = params.itemid;
      this.options.amount = params.amount;

      var that = this;
      var itemObj = this.itemObj;
      var getItemSummary = new SFGetItemSummary({
        "itemId":this.options.itemid
      });
      var prceInfo = new SFGetProductHotData({
        'itemId': this.options.itemid
      });

      can.when(getItemSummary.sendRequest(), prceInfo.sendRequest())
        .done(function(iteminfo, priceinfo) {
          itemObj.singlePrice = priceinfo.sellingPrice;
          itemObj.amount = that.options.amount;

          itemObj.totalPrice = priceinfo.sellingPrice * that.options.amount;
          itemObj.allTotalPrice = itemObj.totalPrice;
          itemObj.shouldPay = itemObj.totalPrice;

          //是否是宁波保税，是得话才展示税额
          itemObj.showTax = iteminfo.bonded;
          itemObj.itemName = iteminfo.title;

          if(typeof iteminfo.image !== 'undefined'){
            itemObj.picUrl = iteminfo.image.thumbImgUrl;
          }

          if(typeof iteminfo.specs != "undefined"){
            var result = new Array();
            _.each(iteminfo.specs,function(item){
              result.push(item.specName + "：" +item.spec.specValue);
            });
            itemObj.spec ="<li>" + result.join('</li><li>') + "</li>";
          }

          that.options.allTotalPrice = itemObj.allTotalPrice;
          that.options.sellingPrice = priceinfo.sellingPrice;
        })
        .fail(function(error) {
          console.error(error);
        })
        .then(function(){
          var queryOrderCoupon = new SFQueryOrderCoupon({
            "items": JSON.stringify([{
              "itemId": that.options.itemid,
              "num": that.options.amount,
              "price": that.itemObj.singlePrice
            }]),
            'system': "B2C_H5"
          });
          return queryOrderCoupon.sendRequest();
        })
        .done(function(orderCoupon) {
          itemObj.isShowCouponArea = true;
          itemObj.orderCoupon = orderCoupon;
          itemObj.orderCoupon.isHaveAvaliable = orderCoupon.avaliableAmount != 0;
          itemObj.orderCoupon.isHaveDisable = orderCoupon.disableAmount != 0;
          itemObj.orderCoupon.useQuantity = 0;
          itemObj.orderCoupon.discountPrice = 0;
          itemObj.orderCoupon.selectCoupons = [];
        })
        .fail(function (error) {
          console.error(error);
        })
        .always(function() {
          that.itemObj = new can.Map(itemObj);
          that.itemObj.bind("orderCoupon.discountPrice", function(ev, newVal, oldVal) {
            that.itemObj.attr("shouldPay", that.itemObj.shouldPay + oldVal - newVal);
          });
          var html = can.view('templates/order/sf.b2c.mall.order.iteminfo.mustache', that.itemObj);
          that.element.html(html);

          var tmpCouponHtmls;
          for(var i = 0, tmpAc; tmpAc = that.itemObj.orderCoupon.avaliableCoupons[i]; i++) {
            tmpCouponHtmls += "<option value=" + tmpAc.couponCode + " data-price=" + tmpAc.price + ">" + tmpAc.couponDescription + "</option>";
          }
          $("#selectCoupon").append(tmpCouponHtmls);

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
      "4000400": "很抱歉，商品信息发生变化，请重新下单",
      "4000500": "订单商品库存不足",
      "4000600": "订单商品超过限额",
      "4000700": "很抱歉，商品信息发生变化，请重新下单",
      "4002700": "很抱歉，商品信息发生变化，请重新下单"
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
    }
  });
})