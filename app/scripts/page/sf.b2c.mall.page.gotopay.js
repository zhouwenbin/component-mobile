'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.order.fn',
    'sf.b2c.mall.widget.message'
  ],

  function(can, $, SFFrameworkComm, SFRequestPayV2, SFLoading, SFOrderFn, SFMessage) {
    SFFrameworkComm.register(3);

    var gotopay = can.Control.extend({

      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html';
          return false;
        }

        var params = can.deparam(window.location.search.substr(1));

        this.options.orderid = params.orderid;
        this.options.recid = params.recid;
        this.options.alltotalamount = params.amount;
        this.render();

        var that = this;
        $('#gotopayBtn').tap(function() {
          that.gotopayBtnClick($(this));
        })

        $('.loadingDIV').hide();
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

      gotopayBtnClick: function() {
        var that = this;
        var callback = {
          error: function(errorText) {

            var message = new SFMessage(null, {
              'tip': '订单支付失败！',
              'type': 'error'
            });

            // var template = can.view.mustache(that.payerrorTemplate());
            // $('#gotopayDIV').html(template());
          }
        }

        var that = this;
        SFOrderFn.payV2({
          orderid: that.options.orderid
        }, callback);
      }
    });

    new gotopay('.sf-b2c-mall-gotopay');
  });