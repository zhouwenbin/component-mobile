'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.order.fn'
  ],

  function(can, $, SFFrameworkComm, SFRequestPayV2, SFOrderFn) {
    SFFrameworkComm.register(1);

    var order = can.Control.extend({

      init: function(element, options) {
        var params = can.deparam(window.location.search.substr(1));

        this.options.orderid = params.orderid;
        this.options.recid = params.recid;
        this.options.alltotalamount = params.amount;
        this.render();

        var that = this;
        $('#gotopayBtn').tap(function() {
          that.gotopayBtnClick($(this));
        })
      },

      render: function() {
        var html = can.view('/templates/order/sf.b2c.mall.order.gotopay.mustache');
        this.element.html(html);
      },

      payErrorMap: {
        '3000001': '支付金额非法',
        '3000002': '支付状态不允许支付',
        '3000007': '用户订单不正确'
      },

      gotopayBtnClick: function() {debu
        var that = this;
        var callback = {
          error: function(errorText) {

            var message = new SFMessage(null, {
              'tip': '订单支付失败！',
              'type': 'error'
            });

            var template = can.view.mustache(that.payerrorTemplate());
            $('#gotopayDIV').html(template());
          }
        }

        var that = this;
        SFOrderFn.payV2({
          orderid: that.options.orderid
        }, callback);
      }
    });

    new order('#order');
  });