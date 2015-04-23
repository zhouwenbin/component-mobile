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

        // 如果是在微信环境 只显示微信支付
        if (SFUtil.isMobile.WeChat()) {
          this.options.data.attr("onlyWeixinPay", true);
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

        // 如果是微信环境是wechat_intl_mp，如果是支护宝环境是alipay_intl_wap，其他为alipay_forex_wap
        if (SFUtil.isMobile.WeChat()) {
          result = "wechat_intl_mp";
        } else if (typeof window.AlipayJSBridge != "undefined") {
          result = "alipay_intl_wap";
        } else {
          result = 'alipay_forex_wap';
        }

        return result;
      },

      gotopayBtnClick: function() {
        var that = this;

        var callback = {
          error: function(errorText) {
            var message = new SFMessage(null, {
              'tip': '订单支付失败！',
              'type': 'error'
            });
          }
        }

        var that = this;
        SFOrderFn.payV2({
          orderid: that.options.orderid,
          payType: that.getPayType(),
          extInfo: JSON.stringify({
            "code": that.options.code
          })
        }, callback);
      }
    });

    new gotopay('.sf-b2c-mall-gotopay');
  });