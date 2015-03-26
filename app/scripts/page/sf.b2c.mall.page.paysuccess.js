'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.api.order.getOrder'
  ],
  function(can, $, Fastclick, SFWeixin, SFFrameworkComm, SFConfig, helpers, SFGetOrder) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var paysuccess = can.Control.extend({
      init: function() {
        this.render();
      },
      render: function() {
        var that = this;
        var itemObj = {
          isCostCoupon: false,
          isPresentCoupon: false,
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

        can.when(getOrder.sendRequest()
          .done(function(data) {
          itemObj.isPaySuccess = data.orderItem.paymentStatus === "PAYED";

          //处理卡券信息
          if (data.orderItem.orderCouponItemList && data.orderItem.orderCouponItemList.length > 0) {
            for(var i = 0, tmpOrderCouponItem; tmpOrderCouponItem = data.orderItem.orderCouponItemList[i]; i++) {
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
            }
          }
            })
          .fail(function(error) {
            console.error(error);
          })
        )
        .always(function(){
          that.renderHtml(that.element, itemObj);
        })
      },
      renderHtml: function(element, itemObj) {
        var html = can.view('templates/order/sf.b2c.mall.order.paysuccess.mustache', itemObj);
        element.html(html);
      }
    });
    new paysuccess('.sf-b2c-mall-order-paysuccess');

  })