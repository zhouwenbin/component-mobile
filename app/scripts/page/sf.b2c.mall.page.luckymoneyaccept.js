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

    var luckymoneyaccept = can.Control.extend({
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

        var id = params.state;
        var code = params.code;

        SFWeixin.shareLuckMoney("顺丰海淘红包", "顺丰海淘红包", id);

      },
      renderHtml: function(element, itemObj) {
        var html = can.view('templates/order/sf.b2c.mall.luckymoney.accept.mustache', itemObj);
        element.html(html);
      }
    });
    new luckymoneyaccept('.sf-b2c-mall-order-luckymoneyaccept');

  })