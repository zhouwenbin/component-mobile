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
  'sf.b2c.mall.business.config',
], function(can, $, SFHelpers, Fastclick, _, SFGetOrder, template_order_orderdetail, SFOrderFn, SFConfig) {

  var PREFIX = 'http://img0.sfht.com';

  return can.Control.extend({

    helpers: {
      'sf-image': SFOrderFn.helpers['sf-image'],
      'sf-index': SFOrderFn.helpers['sf-index'],
      'sf-pay-status': SFOrderFn.helpers['sf-pay-status'],
      'sf-payment-type': SFOrderFn.helpers['sf-payment-type'],

      'sf-show-paybtn': function(status, options) {
        if (status() == 'WAITPAY') {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },

      'sf-show-status-cancelled': function (status, options) {
        if (status() == 'OPERATION_CANCEL') {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },

      'sf-first': function (group, options) {
        var array = group();
        var first = array[0];
        if (first) {
          return options.fn(first);
        }else{
          return options.inverse(options.contexts || this);
        }
      },

      'sf-status-show-case': SFOrderFn.helpers['sf-status-show-case']
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
      var orderinfo = $element.closest(".orderinfo-b");
      orderinfo.toggleClass("active");

      if (orderinfo.hasClass('active')) {
        $(this).text('收起');
      } else {
        $(this).text('查看更多');
      }
    },

    '.gotopay click': function($element, event) {
      var url = SFConfig.setting.link.gotopay + '&' + $.param({
        "orderid": this.options.data.orderItem.orderId
      });

      // －－－－－－－－－－－－－－－－－－
      // 不同环境切换不同的支付页面
      var switcher = new SFSwitcher();

      switcher.register('wechat', function() {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90f1dcb866f3df60&redirect_uri=" + escape(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
      });

      switcher.register('web', function() {
        window.location.href = url;
      });

      switcher.go();
      // －－－－－－－－－－－－－－－－－－－
    },

    '.received click': function ($element, event) {
      event && event.preventDefault();

      var success = function () {
        window.location.reload();
      }

      var error = function () {
        // @todo 错误提示
      }

      SFOrderFn.orderConfirm(this.options.data.orderItem, success, error);
    }

  });

});