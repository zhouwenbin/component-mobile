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
  'sf.util',
  'sf.b2c.mall.widget.message',
  'sf.b2c.mall.business.config'
], function(can, $, SFGetProductHotData, SFGetItemSummary, SFSubmitOrderForAllSys, SFQueryOrderCoupon, SFGetRecAddressList, SFGetIDCardUrlList, SFSetDefaultAddr, SFSetDefaultRecv, helpers, SFUtil, SFMessage, SFConfig) {
  return can.Control.extend({
    itemObj: new can.Map({}),
    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
      var params = can.deparam(window.location.search.substr(1));
      this.itemObj.attr({
        itemid: params.itemid,
        amount: params.amount
      });

      var that = this;

      can.when(this.initItemSummary(), this.initProductHotData())
        .then(function() {
          return that.initCoupons();
        })
        .always(function() {
          var html = can.view('templates/order/sf.b2c.mall.order.iteminfo.mustache', that.itemObj);
          that.element.html(html);

          if (that.itemObj.orderCoupon && that.itemObj.orderCoupon.avaliableAmount) {
            //找到默认选择的优惠券
            var price = that.getDefautSelectCoupon(that.itemObj.orderCoupon).price;
            $("#selectCoupon option[data-price='" + price + "']").first().attr('selected', 'true');
            $("#selectCoupon").trigger("change");
          }

          $('.loadingDIV').hide();
          $("#submitOrder").click(function() {
            that.submitOrderClick($(this));
          });
        });
    },

    '#selectCoupon change': function(targetElement) {
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
      "4100906": "使用的优惠券金额超过商品总金额的30%",
      "4100907": "该商品不能使用此优惠券"
    },

    submitOrderClick: function(element, event) {
      var that = this;

      //防止重复提交
      if (element.hasClass("disable")) {
        return false;
      }

      element.addClass("disable");

      var selectAddr = that.options.selectReceiveAddr.getSelectedAddr();
      var isDetailInvalid = /[<>'"]/.test($.trim(selectAddr.detail));
      var isReceiverName = /先生|女士|小姐/.test($.trim(selectAddr.recName));
      //进行校验，不通过则把提交订单点亮
      if (typeof selectAddr == 'undefined' || selectAddr == false) {

        new SFMessage(null, {
          'tip': '请选择收货地址！',
          'type': 'error'
        });

        element.removeClass("disable");
        return false;
      } else if (isReceiverName) {
        new SFMessage(null, {
          'tip': '请您输入真实姓名。感谢您的配合!',
          'type': 'error'
        });

        element.removeClass("disable");
        return false;
      } else if (isDetailInvalid) {
        new SFMessage(null, {
          'tip': '亲，您的收货地址输入有误，不能含有< > \' \" 等特殊字符！',
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
              "itemId": that.itemObj.itemid,
              "num": that.itemObj.amount,
              "price": that.itemObj.sellingPrice
            }]),
            "sysType": that.getSysType(),
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

          var url = SFConfig.setting.link.gotopay + '&' +
            $.param({
              "orderid": message.value,
              "recid": selectAddr.recId,
              "showordersuccess": true
            });

          // 转跳到微信授权支付
          if (SFUtil.isMobile.WeChat()) {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90f1dcb866f3df60&redirect_uri=" + escape(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
          } else {
            window.location.href = url;
          }

        })
        .fail(function(error) {
          element.removeClass("disable");
          new SFMessage(null, {
            'tip': that.errorMap[error] || '下单失败',
            'type': 'error'
          });
        });
    },

    getSysType: function() {
      // alert(window.AlipayJSBridge);
      //如果是支付宝服务窗 则是FWC_H5
      if (typeof window.AlipayJSBridge != "undefined") {
        return "FWC_H5"
      } else {
        return 'B2C_H5'
      }
    },

    initProductHotData: function() {
      var that = this;
      var getProductHotData = new SFGetProductHotData({
        'itemId': that.itemObj.itemid
      });
      var getProductHotDataDefer = getProductHotData.sendRequest();
      getProductHotDataDefer.done(function(priceinfo) {
          that.itemObj.attr({
            "singlePrice": priceinfo.sellingPrice,
            "amount": that.itemObj.amount,
            "totalPrice": priceinfo.sellingPrice * that.itemObj.amount,
            "allTotalPrice": priceinfo.sellingPrice * that.itemObj.amount,
            "shouldPay": priceinfo.sellingPrice * that.itemObj.amount,
            "sellingPrice": priceinfo.sellingPrice
          });
        })
        .fail(function(error) {
          console.error(error);
        });
      return getProductHotDataDefer;
    },

    initItemSummary: function() {
      var that = this;
      var getItemSummary = new SFGetItemSummary({
        "itemId": that.itemObj.itemid
      });

      var getItemSummaryDefer = getItemSummary.sendRequest();
      getItemSummaryDefer.done(function(iteminfo) {
          var result = new Array();
          if (typeof iteminfo.specs != "undefined") {
            _.each(iteminfo.specs, function(item) {
              result.push(item.specName + "：" + item.spec.specValue);
            });
          }

          that.itemObj.attr({
            "showTax": iteminfo.bonded, //是否是宁波保税，是得话才展示税额
            "itemName": iteminfo.title,
            "picUrl": iteminfo.image && iteminfo.image.thumbImgUrl,
            "spec": result.length > 0 ? ("<li>" + result.join('</li><li>') + "</li>") : "",
            "skuId": iteminfo.skuId
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
    initCoupons: function() {
      var that = this;
      var queryOrderCoupon = new SFQueryOrderCoupon({
        "items": JSON.stringify([{
          "itemId": that.itemObj.itemid,
          "num": that.itemObj.amount,
          "price": that.itemObj.singlePrice,
          "skuId": that.itemObj.skuId
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
        .fail(function(error) {
          console.error(error);
        });
      return queryOrderCouponDefer;
    },
    /*
     * 找到默认选择的优惠券 面额最高的
     */
    getDefautSelectCoupon: function(orderCoupon) {
      //找到面额最高的
      var tmpPriceCoupon;
      var tmpPrice = 0;
      for (var i = 0, tmpCoupon; tmpCoupon = orderCoupon.avaliableCoupons[i]; i++) {
        if (tmpCoupon.price > tmpPrice) {
          tmpPrice = tmpCoupon.price;
          tmpPriceCoupon = tmpCoupon;
        }
      }

      return tmpPriceCoupon;
    }
  });
})