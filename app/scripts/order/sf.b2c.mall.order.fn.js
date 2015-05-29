define(
  'sf.b2c.mall.order.fn',

  [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.api.order.cancelOrder',
    'sf.b2c.mall.api.order.confirmReceive',
    'sf.b2c.mall.api.order.deleteOrder',
    'sf.b2c.mall.business.config',
    'sf.util'
  ],

  function($, can, _, store, SFApiRequestPayV2, SFApiCancelOrder, SFConfirmReceive, SFDeleteOrder, SFConfig, SFUtil) {

    var requestPayV2 = new SFApiRequestPayV2();
    var cancelOrder = new SFApiCancelOrder();
    var confirmReceive = new SFConfirmReceive();
    var deleteOrder = new SFDeleteOrder();

    var PREFIX = 'http://img0.sfht.com';
    var EMPTY_IMG = 'http://img0.sfht.com';//@todo 增加一个备用图片地址

    return {

      helpers: {
        /**
         * @description 从string中获取图片地址
         * @param  {function} imgs  图片地址源
         * @return {string}         图片地址
         */
        'sf-image': function(imgs) {
          var array = eval(imgs());
          if (_.isArray(array)) {
            var url = array[0].replace(/.jpg/g, '.jpg@63h_63w.jpg');
            if (/^http/.test(url)) {
              return url;
            } else {
              // 单独处理 '/spu/68e30153-ea6e-48f3-825b-788fb18e8552.jpg@63h_63w.jpg'
              return PREFIX + url;
            }
          } else {
            return EMPTY_IMG
          }
        },

        'sf-good-count': function(items) {
          var count = 0;
          var array = items().attr();
          _.each(array, function(item) {
            count = item.orderGoodsItemList.length + count;
          });
          return count;
        },

        'sf-index': function(index) {
          return index() + 1;
        },

        'sf-order-show': function(status, allows, options) {
          var array = allows.split(',');
          if (_.contains(array, status())) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-order-status': function(status) {
          var statusMap = {
            'SUBMITED': '已提交',
            'AUTO_CANCEL': '自动取消',
            'USER_CANCEL': '用户取消',
            'AUDITING': '待审核',
            'OPERATION_CANCEL': '运营取消',
            'BUYING': '采购中',
            'BUYING_EXCEPTION': '采购异常',
            'WAIT_SHIPPING': '待发货',
            'SHIPPING': '正在出库',
            'LOGISTICS_EXCEPTION': '物流异常',
            'SHIPPED': '已发货',
            'CONSIGNED': '已出库',
            'RECEIPTED': '已签收',
            'COMPLETED': '已完成',
            'AUTO_COMPLETED': '自动完成',
            'CLOSED': '关闭'
          };

          return statusMap[status()];
        },

        'sf-pay-status': function(paymentStatus) {
          var paymentStatusMap = {
            'WAITPAY': '待支付',
            'PAYING': '支付中',
            'PAYED': '已支付',
            'PAYFAILURE': '支付失败',
            'PAYBACKING': '退款中',
            'REFUNDED': '已退款',
            'REFUND_FAILED': '退款失败'
          };

          return paymentStatusMap[paymentStatus()];
        },

        'sf-payment-type': function(payType) {
          var map = {
            'alipay': '支付宝',
            'tenpay_forex': '财付通',
            'tenpay_forex_wxsm': '微信支付',
            'lianlianpay': '快捷支付'
          }

          return map[payType()];
        },

        'sf-status-show-case': function(status, target, options) {
          var map = {
            'SUBMITED': ['NEEDPAY', 'CANCEL', 'INFO'],
            'AUTO_CANCEL': ['INFO', 'DELETE'],
            'USER_CANCEL': ['INFO', 'DELETE'],
            'AUDITING': ['CANCEL', 'INFO'],
            'OPERATION_CANCEL': ['INFO', 'DELETE'],
            'BUYING': ['INFO'],
            'BUYING_EXCEPTION': ['INFO'],
            'WAIT_SHIPPING': ['INFO'],
            'SHIPPING': ['ROUTE', 'INFO'],
            'LOGISTICS_EXCEPTION': ['ROUTE', 'INFO'],
            'SHIPPED': ['INFO', 'ROUTE', 'RECEIVED'],
            'CONSIGNED': ['INFO', 'ROUTE', 'RECEIVED'],
            'COMPLETED': ['INFO', 'ROUTE', 'REPAY'],
            'RECEIPTED': ['INFO', 'ROUTE', 'RECEIVED'],
            'CLOSED': ['INFO', 'DELETE', 'REPAY'],
            'AUTO_COMPLETED': ['INFO', 'ROUTE', 'REPAY']
          }

          var array = map[status()];
          if (array && _.contains(array, target)) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }

      },

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
      },

      orderConfirm: function(params, success, error) {
        confirmReceive.setData({
          subOrderId: params.orderId
        });

        confirmReceive.sendRequest().done(success).fail(error);
      },

      orderDelete: function(params, success, error) {
        deleteOrder.setData({
          orderId: params.orderId
        });

        deleteOrder.sendRequest().done(success).fail(error);
      }
    }
  });