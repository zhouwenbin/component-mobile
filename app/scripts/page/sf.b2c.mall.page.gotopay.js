'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.order.fn',
    'sf.b2c.mall.widget.message',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.business.config'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFRequestPayV2, SFLoading, SFOrderFn, SFMessage, SFWeixin, SFUtil, SFConfig) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var gotopay = can.Control.extend({

      init: function(element, options) {

        this.options.data = new can.Map({});

        // 判断是否登陆
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login;
          return false;
        }

        var params = can.deparam(window.location.search.substr(1));

        this.options.orderid = params.orderid;
        this.options.recid = params.recid;
        this.options.alltotalamount = params.amount;
        this.options.code = params.code;

        this.options.data.attr("showordersuccess", params.showordersuccess);

        // 如果是在微信环境 只显示微信支付和支付宝，其他时候只展示支付宝
        if (SFUtil.isMobile.WeChat()) {
          this.options.data.attr("showWeixinPay", true);
        }

        this.render(this.options.data);

        var that = this;
        $('#gotopayBtn').click(function() {
          that.gotopayBtnClick($(this));
        })

        $('.loadingDIV').hide();
      },

      render: function(data) {
        var html = can.view('/templates/order/sf.b2c.mall.order.gotopay.mustache', data);
        this.element.html(html);
      },

      ".gotopaymethod click": function(element, event) {
        event && event.preventDefault();
        element.parent().find("li.gotopaymethod").removeClass("active");
        element.addClass("active");
        this.options.payType = element.eq(0).attr('data-payType');
      },

      payErrorMap: {
        '3000001': '支付金额非法',
        '3000002': '支付状态不允许支付',
        '3000007': '用户订单不正确'
      },

      /**
       * [getPayType 获得支付方式]
       * @return {[type]} [description]
       */
      getPayType: function() {
        var result = "";

        var paytypelist = $(".gotopaymethodlist").find("li");
        _.each(paytypelist, function(item) {
          if ($(item).hasClass("active")) {
            result = $(item).attr("data-payType");
          }
        })

        // 针对支付方式概要，做定制处理
        if (result == "weixinpay") {
          result = "wechat_intl_mp";
        } else if (result == "alipay") {

          //如果在支付宝服务窗中打开，则使用内卡，否则使用外卡
          if (typeof window.AlipayJSBridge != "undefined") {
            result = "alipay_intl_wap";
          } else {
            result = 'alipay_forex_wap';
          }

        }

        return result;
      },

      gotopayBtnClick: function() {
        $("#gotopayBtn").text("支付中");
        var that = this;

        var callback = {
          error: function(errorText) {
            var message = new SFMessage(null, {
              'tip': '订单支付失败！',
              'type': 'error'
            });
          },

          // 回调中设置值回来
          success: function(payResult) {
            that.payResult = payResult;
          }
        }

        var that = this;
        SFOrderFn.payV2({
          orderid: that.options.orderid,
          payType: that.getPayType(),
          payResult: that.payResult,
          extInfo: JSON.stringify({
            "code": that.options.code
          })
        }, callback);
      }
    });

    new gotopay('.sf-b2c-mall-gotopay');
  });