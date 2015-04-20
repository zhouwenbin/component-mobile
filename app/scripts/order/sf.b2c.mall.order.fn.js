define(
  'sf.b2c.mall.order.fn',

  [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.business.config',
    'sf.util'
  ],

  function($, can, _, store, SFApiRequestPayV2, SFConfig, SFUtil) {

    var requestPayV2 = new SFApiRequestPayV2();

    return {
      payV2: function(data, callback) {
        var that = this;

        requestPayV2.setData({
          "orderId": data.orderid,
          'payType': that.getPayType()
        });

        requestPayV2
          .sendRequest()
          .done(function(data) {
            //window.location.href = data.url + '?' + data.postBody;
            if (callback && _.isFunction(callback.success)) {
              callback.success();
            }

            if (SFUtil.isMobile.WeChat()) {
              store.set("alipayurl", data.url + '?' + data.postBody);
              window.location.href = SFConfig.setting.link.alipayframe;
            } else {
              window.location.href = data.url + '?' + data.postBody;
            }

          })
          .fail(function(error) {
            //var errorText = that.payErrorMap[error.toString()] || '支付失败';
            if (callback && _.isFunction(callback.error)) {
              callback.error();
            }
          });
      },

      getPayType: function() {

        //如果是支付宝服务窗 则是alipay_intl_wap
        if (typeof window.AlipayJSBridge != "undefined"){
          return "alipay_intl_wap";
        }

        return 'alipay_forex_wap';
      }
    }

  })