'use strict';

define('sf.b2c.mall.order.orderdetailcontent', [
  'can',
  'zepto',
  'sf.helpers',
  'fastclick',
  'underscore',
  'sf.b2c.mall.api.order.getOrder',
  'text!template_order_orderdetail',
  'sf.b2c.mall.order.fn',
], function(can, $, SFHelpers, Fastclick, _, SFGetOrder, template_order_orderdetail, SFOrderFn) {

  var PREFIX = 'http://img0.sfht.com';

  return can.Control.extend({

    helpers: {
      'sf-image': SFOrderFn.helpers['sf-image'],
      'sf-index': SFOrderFn.helpers['sf-index'],
      'sf-pay-status': SFOrderFn.helpers['sf-pay-status'],
      'sf-payment-type': SFOrderFn.helpers['sf-payment-type']
    },

    init: function() {
      this.render();
    },

    render: function() {
      // 从url的search中获取参数
      var params = can.deparam(window.location.search.substr(1));
      this.request(params);
    },

    request: function(params) {
      $('.loadingDIV').hide();

      var getOrder = new SFGetOrder({
        orderId: params.orderid
      });

      getOrder.sendRequest().done(_.bind(this.paint, this));
    },

    paint: function(data) {
      this.options.data = new can.Map(data);

      var renderFn = can.mustache(template_order_orderdetail);
      var html = renderFn(this.options.data, this.helpers);

      this.element.html(html);

      $('.loadingDIV').hide();
    },

    '#orderdetail-more click': function($element, event) {
      var parent = $(this).parents(".orderinfo-b");
      parent.toggleClass("active");
      if (parent.hasClass('active')) {
        $(this).text('收起');
      } else {
        $(this).text('查看更多');
      }
    }
  });

});