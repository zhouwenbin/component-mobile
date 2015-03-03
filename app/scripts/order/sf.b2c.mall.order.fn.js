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
        requestPayV2.setData({
          "orderId": data.orderid,
          'payType': 'alipay_forex_wap'
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
      }
    }

  })