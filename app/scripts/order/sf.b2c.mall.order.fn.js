define(
  'sf.b2c.mall.order.fn',

  [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.api.order.cancelOrder',
    'sf.b2c.mall.business.config',
    'sf.util'
  ],

  function($, can, _, store, SFApiRequestPayV2, SFApiCancelOrder, SFConfig, SFUtil) {

    var requestPayV2 = new SFApiRequestPayV2();
    var cancelOrder = new SFApiCancelOrder();

    return {
      orderCancel: function(params, success, error) {
        cancelOrder.setData({
          orderId: params.orderId
        });

        cancelOrder.sendRequest().done(success).fail(error);
      },

      payV2: function(dataParam, callback) {
        var that = this;

        if (SFUtil.isMobile.WeChat() && dataParam.payType == "wechat_intl_mp") {
          requestPayV2.setData({
            "orderId": dataParam.orderid,
            'payType': dataParam.payType,
            'extInfo': dataParam.extInfo
          });

          // 如果已经请求过了，则做缓存处理，防止第二次重复请求时候prepay_id没了
          if (dataParam.payResult) {
            that.onBridgeReady(dataParam.payResult, dataParam.orderid);
            return false;
          }
        } else {
          requestPayV2.setData({
            "orderId": dataParam.orderid,
            'payType': dataParam.payType
          });
        }

        requestPayV2
          .sendRequest()
          .done(function(data) {
            if (SFUtil.isMobile.WeChat() && dataParam.payType == "wechat_intl_mp") {
              var payResult = that.buildData(data.postBody);
              that.onBridgeReady(payResult, dataParam.orderid);

              if (callback && _.isFunction(callback.success)) {
                callback.success(payResult);
              }

              // $("#gotopayBtn").text("立即支付");

            } else {

              //微信环境，要嵌套iframe
              if (SFUtil.isMobile.WeChat()) {
                store.set("alipayurl", data.url + '?' + data.postBody);
                window.location.href = SFConfig.setting.link.alipayframe;
              } else {
                window.location.href = data.url + '?' + data.postBody;
              }

              if (callback && _.isFunction(callback.success)) {
                callback.success();
              }
            }

          })
          .fail(function(error) {
            // $("#gotopayBtn").text("立即支付");
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

      onBridgeReady: function(data, orderid) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data,
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              window.location.href = "http://m.sfht.com/pay-success.html?orderid=" + orderid;
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
              window.location.href = "http://m.sfht.com/orderlist.html";
            }
          }
        );
      }
    }

  })