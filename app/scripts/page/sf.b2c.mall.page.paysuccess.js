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

        var params = can.deparam(window.location.search.substr(1));

        var getOrder = new SFGetOrder({
          "orderId": params.orderid
        });

        that.options.isCostCoupon = false;
        that.options.isPresentCoupon = false;
        that.options.links = SFConfig.setting.link;

        can.when(getOrder.sendRequest())
          .done(function(data, idcard) {
            //处理卡券信息
            if (data.orderItem.orderCouponItemList && data.orderItem.orderCouponItemList.length > 0) {
              for(var i = 0, tmpOrderCouponItem; tmpOrderCouponItem = data.orderItem.orderCouponItemList[i]; i++) {
                switch (tmpOrderCouponItem.orderAction)
                {
                  case "COST": {
                    that.options.isCostCoupon = true;
                    that.options.costCoupon = tmpOrderCouponItem;
                    break;
                  }
                  case "PRESENT": {
                    that.options.isPresentCoupon = true;
                    that.options.presentCoupon = tmpOrderCouponItem;
                    break;
                  }
                }
              }
            }
          })
          .fail(function(error) {
            console.error(error);
          })
          .always(function(){
            var html = can.view('templates/order/sf.b2c.mall.order.paysuccess.mustache', that.options);
            that.element.html(html);
          })
      }
    });
    new paysuccess('.sf-b2c-mall-order-paysuccess');

  })