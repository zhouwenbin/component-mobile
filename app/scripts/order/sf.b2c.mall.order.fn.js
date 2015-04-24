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
          'payType': data.payType,
          'extInfo': data.extInfo
        });

        // 如果已经请求过了，则做缓存处理，防止第二次重复请求时候prepay_id没了
        if (SFUtil.isMobile.WeChat() && data.payResult) {
          that.onBridgeReady(data.payResult);
          return false;
        }

        requestPayV2
          .sendRequest()
          .done(function(data) {
            if (SFUtil.isMobile.WeChat()) {
              var payResult = that.buildData(data.postBody);
              that.onBridgeReady(payResult);

              if (callback && _.isFunction(callback.success)) {
                callback.success(payResult);
              }

            } else {
              window.location.href = data.url + '?' + data.postBody;
              if (callback && _.isFunction(callback.success)) {
                callback.success();
              }
            }

            // if (SFUtil.isMobile.WeChat()) {
            //   store.set("alipayurl", data.url + '?' + data.postBody);
            //   window.location.href = SFConfig.setting.link.alipayframe;
            // } else {
            //   window.location.href = data.url + '?' + data.postBody;
            // }

          })
          .fail(function(error) {
            //var errorText = that.payErrorMap[error.toString()] || '支付失败';
            if (callback && _.isFunction(callback.error)) {
              callback.error();
            }
          });
      },

      buildData: function(str) {
        var result = {};

        var strArr = str.split("&");
        for (var i = 0; i < strArr.length; i++) {
          var item = strArr[i].split("=");
          if (item.length > 1) {
            if (item[0] == 'package') {
              item[1] = item[1].replace("%3D", "=");
              result[item[0]] = item[1];
            } else {
              result[item[0]] = item[1];
            }

          }
        }
        return result;
      },

      onBridgeReady: function(data) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data,
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      }
    }

  })