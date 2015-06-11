'use strict';

define('sf.b2c.mall.order.iteminfo', [
  'text',
  'can',
  'zepto',
  'sf.b2c.mall.api.order.submitOrderForAllSys',
  'sf.b2c.mall.api.order.queryOrderCoupon',
  'sf.b2c.mall.api.order.orderRender',
  'sf.b2c.mall.api.coupon.receiveExCode',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.api.user.getIDCardUrlList',
  'sf.b2c.mall.api.user.setDefaultAddr',
  'sf.b2c.mall.api.user.setDefaultRecv',
  'sf.b2c.mall.api.payment.queryPtnAuthLink',
  'sf.helpers',
  'sf.util',
  'sf.env.switcher',
  'sf.b2c.mall.widget.message',
  'sf.b2c.mall.business.config',
  'text!template_order_iteminfo'
], function(text, can, $, SFSubmitOrderForAllSys, SFQueryOrderCoupon, SFOrderRender, SFReceiveExCode, SFGetRecAddressList,
  SFGetIDCardUrlList, SFSetDefaultAddr, SFSetDefaultRecv, SFQueryPtnAuthLink, helpers, SFUtil, SFSwitcher, SFMessage, SFConfig, template_order_iteminfo) {

  can.route.ready();

  return can.Control.extend({
    itemObj: new can.Map({}),

    helpers: {
      'sf-get-img': function(imgs) {
        if (imgs()) {
          return imgs().thumbImgUrl;
        }
      }
    },

    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
      var params = can.deparam(window.location.search.substr(1));

      params = _.extend(params, can.route.attr());

      this.itemObj.attr({
        itemid: params.itemid,
        amount: params.amount
      });

      var that = this;

      can.when(that.initOrderRender())
        .done(function() {
          // var html = can.view('templates/order/sf.b2c.mall.order.iteminfo.mustache', that.itemObj, that.helpers);
          var renderFn = can.mustache(template_order_iteminfo);
          var html = renderFn(that.itemObj, that.helpers);
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

    //优惠券兑换相关事件
    '#inputCouponCode click': function(targetElement) {
      $("#couponCodeDialog").show();
    },
    '.dialog .icon15, .dialog1 .btn-normal click': function(targetElement) {
      targetElement.parents(".dialog").hide();
    },
    '#couponCodeDialog input input': function(targetElement) {
      if (targetElement.val().length > 0) {
        $("#couponCodeDialog button").removeClass("btn-disable").addClass("btn-danger");
      } else {
        $("#couponCodeDialog button").addClass("btn-disable").removeClass("btn-danger");
      }
    },
    '#couponCodeDialog .btn-danger click': function(targetElement) {
      var exCode = $('#couponCodeDialog input').val();
      can.when(this.receiveCouponExCode(exCode))
        .done(function() {});
    },
    '#couponCodeDialog input focus': function(targetElement) {
      $("#couponCodeDialog .text-error").text("");
    },


    receiveCouponExCode: function(exCode) {
      var that = this;
      var receiveExCode = new SFReceiveExCode({
        exCode: exCode
      });
      receiveExCode.sendRequest()
        .done(function(userCouponInfo) {
          can.when(that.initCoupons())
            .then(function() {
              $("#selectCoupon option[data-code='" + exCode + "']").first().attr('selected', 'true');
              $("#selectCoupon").trigger("change");
              $("#couponCodeDialogSuccess").show();
              $("#couponCodeDialog").hide();
            });
        })
        .fail(function(error) {
          var errorMap = {
            11000160: "请输入有效的兑换码",
            11000170: "兑换码已使用",
            11000200: "兑换码已过期",
            11000209: "请输入正确的兑换码",
            11000220: "本账户超过兑换次数限制"
          };
          $("#couponCodeDialog .text-error").text(errorMap[error] ? errorMap[error] : '请输入有效的兑换码！');
        })
        .always(function() {});
    },

    /**
     * 初始化 OrderRender
     */
    initOrderRender: function() {
      var that = this;
      var selectAddr = that.options.selectReceiveAddr.getSelectedAddr();
      var orderRender = new SFOrderRender({
        address: JSON.stringify({
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
          "recId": selectAddr.recId,
          certType: "ID",
          certNo: selectAddr.credtNum2
        }),
        items: JSON.stringify([{
          "itemId": that.itemObj.itemid,
          "num": that.itemObj.amount
        }]),
        sysType: that.getSysType(that.itemObj.saleid)
      });
      return orderRender.sendRequest()
        .done(function(orderRenderItem) {
          that.processFoundation(orderRenderItem);
          // that.processProducts(orderRenderItem.orderGoodsItemList);
          that.processPackages(orderRenderItem);
          that.processCoupons(orderRenderItem.orderCouponItem);
        })
        .fail();
    },

    /**
     * 加工基础信息
     * @param 数据
     */
    processFoundation: function(orderRenderItem) {
      this.itemObj.attr({
        submitKey: orderRenderItem.submitKey,
        flag: orderRenderItem.flag,
        errorDes: orderRenderItem.errorDes,
        orderFeeItem: can.extend(orderRenderItem.orderFeeItem, {
          shouldPay: orderRenderItem.orderFeeItem.actualTotalFee,
          actualTotalFee: orderRenderItem.orderFeeItem.actualTotalFee
        })
      });
    },

    processPackages: function(item) {
      this.itemObj.attr('orderPackageItemList', item.orderPackageItemList);
      this.itemObj.attr('invariableGoodsItemList', item.invariableGoodsItemList);
    },

    /**
     * @deprecated 接口字段发生变化不再使用
     * 加工商品信息
     * @param 商品列表
     */
    processProducts: function(orderGoodsItemList) {
      //@note 如果channels(渠道编号) = 'heike',
      //cookie中1_uinfo中没有heike，则该用户不能购买
      this.options.productChannels = orderGoodsItemList[0].channels[0];
      //是否是宁波保税，是得话才展示税额
      this.itemObj.attr("showTax", orderGoodsItemList[0].bonded);

      _.each(orderGoodsItemList, function(goodItem) {
        if (goodItem.specItemList) {
          var result = new Array();
          _.each(goodItem.specItemList, function(item) {
            result.push(item.specName + ":" + item.spec.specValue);
          });
          goodItem.spec = result.length > 0 ? ("<li>" + result.join('</li><li>') + "</li>") : "";
          goodItem.totalPrice = goodItem.price * goodItem.quantity;
        }
      });

      this.itemObj.attr("orderGoodsItemList", orderGoodsItemList);
    },
    /**
     * 加工优惠券信息
     * @param 优惠券
     */
    processCoupons: function(orderCoupon) {
      this.itemObj.attr("isShowCouponArea", true);
      can.extend(orderCoupon, {
        isHaveAvaliable: orderCoupon.avaliableAmount != 0,
        isHaveDisable: orderCoupon.disableAmount != 0,
        useQuantity: 0,
        discountPrice: 0,
        couponExCode: ""
      });
      this.itemObj.attr("orderCoupon", orderCoupon);
      this.itemObj.orderCoupon.selectCoupons = [];

      this.itemObj.unbind("orderCoupon.discountPrice");

      this.itemObj.bind("orderCoupon.discountPrice", function(ev, newVal, oldVal) {
        this.attr("orderFeeItem.shouldPay", this.attr("orderFeeItem.shouldPay") + oldVal - newVal);
        //this.attr("orderFeeItem.discount", this.attr("orderFeeItem.discount") - oldVal + newVal);
      });

    },

    errorMap: {
      //"4000100": "order unkown error",
      "4000200": "订单地址不存在",
      "4000400": "订单商品信息改变",
      "4000401": "购买数量超过活动每人限购数量",
      "4000402": "折扣金额大于订单总金额",
      "4000403": "部分商品超出可购买数量，请重新提交订单", //"购买数量超过活动剩余库存",
      "4000404": "订单金额发生变化，请重新提交订", //"活动已经结束",
      "4000405": "折扣金额过大，超过订单总金额的30%",
      "4000500": "部分商品超出可购买数量，请重新提交订单", //"订单商品库存不足",
      "4000600": "订单商品超过限额",
      "4000700": "订单商品金额改变",
      "4002300": "购买的多个商品货源地不一致",
      "4002400": "购买的多个商品的商品形态不一致",
      "4002500": "购买的商品支付卡类型为空",
      "4002600": "购买的商品不在配送范围内",
      "4002700": "部分商品超出可购买数量，请重新提交订单", //"订单商品已下架",
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
              "recId": selectAddr.recId,
              certType: "ID",
              certNo: selectAddr.credtNum2
            }),
            "userMsg": "",
            "items": JSON.stringify([{
              "itemId": that.itemObj.itemid,
              "num": that.itemObj.amount,
              "price": that.itemObj.orderFeeItem.actualTotalFee
            }]),
            "sysType": that.getSysType(),
            "couponCodes": JSON.stringify(that.itemObj.orderCoupon.selectCoupons),
            submitKey: that.itemObj.submitKey
          }
          if (that.itemObj.orderCoupon.selectCoupons && that.itemObj.orderCoupon.selectCoupons.length > 0) {
            params.couponCodes = JSON.stringify(that.itemObj.orderCoupon.selectCoupons);
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

          var switcher = new SFSwitcher();

          // 转跳到微信授权支付
          switcher.register('wechat', function() {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90f1dcb866f3df60&redirect_uri=" + escape(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

            // var queryPtnAuthLink = new SFQueryPtnAuthLink({
            //   "serviceType": "wechat_intl_mp",
            //   "redirectUrl": escape(url)
            // });

            // queryPtnAuthLink
            //   .sendRequest()
            //   .done(function(data) {
            //     window.location.href = data.loginAuthLink;
            //   })
            //   .fail(function(error) {
            //     console.error(error);
            //   })
          });

          switcher.register('web', function() {
            window.location.href = url;
          });

          switcher.go();

        })
        .fail(function(error) {
          element.removeClass("disable");
          // new SFMessage(null, {
          //   'tip': that.errorMap[error] || '下单失败',
          //   'type': 'error'
          // });

          var callback = function() {
            if (error == '4000404') {
              window.location.reload();
            }
          }

          var message = new SFMessage(null, {
            'tip': that.errorMap[error] || '下单失败',
            'type': 'confirm',
            'okFunction': callback
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

    /*
     * author:zhangke
     * desc: 获取可用优惠券列表
     */
    initCoupons: function() {
      var that = this;
      var queryOrderCoupon = new SFQueryOrderCoupon({
        "items": JSON.stringify([{
          "itemId": that.itemObj.itemid,
          "num": that.itemObj.amount,
          "price": that.itemObj.orderGoodsItemList[0].price,
          "skuId": that.itemObj.orderGoodsItemList[0].skuId
        }]),
        'system': "B2C_H5"
      });
      return queryOrderCoupon.sendRequest()
        .done(function(orderCoupon) {
          that.itemObj.attr("isShowCouponArea", true);
          that.itemObj.attr("orderFeeItem.shouldPay", that.itemObj.orderFeeItem.actualTotalFee);

          can.extend(orderCoupon, {
            isHaveAvaliable: orderCoupon.avaliableAmount != 0,
            isHaveDisable: orderCoupon.disableAmount != 0,
            useQuantity: 0,
            discountPrice: 0,
            couponExCode: ""
          });
          that.itemObj.attr("orderCoupon", orderCoupon);
          that.itemObj.orderCoupon.selectCoupons = [];

          /*
          that.itemObj.unbind("orderCoupon.discountPrice").bind("orderCoupon.discountPrice", function(ev, newVal, oldVal) {
            that.itemObj.attr("shouldPay", that.itemObj.shouldPay + oldVal - newVal);
          });
          */
        })
        .fail(function(error) {
          console.error(error);
        });
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