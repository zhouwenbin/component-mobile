'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.api.order.getOrder'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFConfig, helpers, SFGetOrder) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var paysuccess = can.Control.extend({
      helpers: {
        ismobile: function(mobile, options) {
          if (mobile() == 'mobile') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        isWeChat: function(options) {
          if (SFFn.isMobile.WeChat()) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        isAlipay: function(options) {
          if (SFFn.isMobile.AlipayChat()) {
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
        var itemObj = {
          isCostCoupon: false,
          isPresentCoupon: false,
          isGiftBag: false,
          isShareBag: false,
          isShareBagAndCoupon: false,
          links: SFConfig.setting.link,
          isPaySuccess: true
        };

        var params = can.deparam(window.location.search.substr(1));

        if (!params.orderid) {
          itemObj.isPaySuccess = false;
          that.renderHtml(that.element, itemObj);
        }

        var getOrder = new SFGetOrder({
          "orderId": params.orderid
        });

        getOrder.sendRequest()
          .done(function(data) {
            itemObj.isPaySuccess = data.orderItem.paymentStatus === "PAYED";

            var couponTypeMap = {
              "CASH" : function() {
                switch (tmpOrderCouponItem.orderAction)
                {
                  case "COST": {
                    itemObj.isCostCoupon = true;
                    itemObj.costCoupon = tmpOrderCouponItem;
                    break;
                  }
                  case "PRESENT": {
                    itemObj.isPresentCoupon = true;
                    itemObj.presentCoupon = tmpOrderCouponItem;
                    break;
                  }
                }
              },
              "GIFTBAG" : function() {
                itemObj.isGiftBag = true;
                itemObj.giftBag = tmpOrderCouponItem;
              },
              "SHAREBAG" : function() {
                itemObj.isShareBag = true;
                itemObj.shareBag = tmpOrderCouponItem;
              }
            }
            var couponTypeHandle = function(tag) {
              var fn = couponTypeMap[tag];
              if (_.isFunction(fn)) {
                return fn.call(this)
              }
            }
            //处理卡券信息
            if (data.orderItem.orderCouponItemList && data.orderItem.orderCouponItemList.length > 0) {
              for(var i = 0, tmpOrderCouponItem; tmpOrderCouponItem = data.orderItem.orderCouponItemList[i]; i++) {
                couponTypeHandle(tmpOrderCouponItem.couponType);
              }
            }
          })
          .fail(function(error) {
            console.error(error);
          })
          .always(function(){
            itemObj.isShareBagAndCoupon = itemObj.isShareBag && (itemObj.isPresentCoupon || itemObj.isGiftBag);
            that.renderHtml(that.element, itemObj);
          })
      },
      renderHtml: function(element, itemObj) {
        var html = can.view('templates/order/sf.b2c.mall.order.paysuccess.mustache', itemObj, this.helpers);
        element.html(html);
      }
    });
    new paysuccess('.sf-b2c-mall-order-paysuccess');
  })