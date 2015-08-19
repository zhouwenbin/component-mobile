'use strict';

define('sf.b2c.mall.order.orderdetailcontent', [
  'can',
  'zepto',
  'sf.helpers',
  'fastclick',
  'underscore',
  'moment',
  'sf.b2c.mall.api.order.getOrderV2',
  'text!template_order_orderdetail',
  'sf.b2c.mall.order.fn',
  'sf.b2c.mall.business.config',
  'sf.env.switcher',
  'sf.b2c.mall.widget.message',
  'sf.hybrid',
  'sf.b2c.mall.widget.loading',
  'sf.mediav',
  'sf.b2c.mall.api.finance.getRefundTax'
], function(can, $, SFHelpers, Fastclick, _, moment, SFGetOrder, template_order_orderdetail,
  SFOrderFn, SFConfig, SFSwitcher, SFMessage, SFHybrid, SFLoading, SFMediav, SFGetRefundTax) {

  Fastclick.attach(document.body);

  var loadingCtrl = new SFLoading();

  var PREFIX = 'http://img0.sfht.com';

  can.route.ready();

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

      'sf-show-status-cancelled': function(status, options) {
        if (status() == 'OPERATION_CANCEL') {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },

      'sf-first': function(group, options) {
        var array = group();
        if (array.length > 0) {
          var first = array[0];
          if (first) {
            return options.fn(first);
          } else {
            return options.inverse(options.contexts || this);
          }
        } else {
          return options.inverse(options.contexts || this);
        }
      },

      'sf-is-not-pay': function(paymentStatus, options) {
        if (paymentStatus() == 'WAITPAY') {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },

      'sf-reverse': function(array, options) {
        var group = array().attr();
        return options.fn({
          group: group
        });
      },

      'sf-timmer': function(pay, order, options) {
        if (pay() == 'WAITPAY' && order() == 'SUBMITED') {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },
      //是否展示秒杀活动标示
      'isShowSeckill': function(goodsType, options) {
        if (goodsType() == "SECKILL") {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },
      //退税
      'sf-show-refundtax': function(transporterName, status, options) {
        var status = status();
        if (transporterName() == 'ETK' && (status == "CONSIGNED" || status == 'COMPLETED' || status == 'AUTO_COMPLETED' || status == 'RECEIPTED')) {
          return options.fn(options.contexts || this);
        } else {
          return options.inverse(options.contexts || this);
        }
      },
      'refundTaxStatus': function(refundTax, stateText, options) {
        var refundTax = refundTax();
        if (refundTax.state == stateText) {
          return options.fn(options.contexts || this);
        }
      },
      'sf-refundtax': function(refundTax, options) {
        var refundTax = refundTax();
        if (typeof refundTax == 'undefined') {
          return options.inverse(options.contexts || this);
        } else {
          if (typeof refundTax.state !== 'undefined') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },
      'sf-status-show-case': SFOrderFn.helpers['sf-status-show-case'],
      'sf-package-status': SFOrderFn.helpers['sf-package-status'],
      'sf-coupon-type': SFOrderFn.helpers['sf-coupon-type']
    },

    init: function() {
      this.render();
    },

    render: function() {
      // 从url的search中获取参数
      var params = can.deparam(window.location.search.substr(1));
      params = _.extend(params, can.route.attr());
      this.request(params);

      this.setBackButton();
    },
    renderHtml: function() {
      var renderFn = can.mustache(template_order_orderdetail);
      var html = renderFn(this.options.data, this.helpers);
      this.element.html(html);
    },
    request: function(params) {
      loadingCtrl.hide();

      this.getOrder = new SFGetOrder({
        orderId: params.orderid
      });

      this.getOrder.sendRequest().done(_.bind(this.paint, this));
    },

    paint: function(data) {
      this.serverTime = this.getOrder.getServerTime();

      this.options.data = new can.Map(data);
      this.options.data.attr("totalPoint", data.presentIntegral);
      var that = this;
      //this.options.data.attr("pointPrice", (data.orderItem.totalPrice- data.orderItem.discount-data.couponReducePrice-data.totalPrice));
      _.each(data.orderItem.orderCouponItemList, function(item) {
        if (item.couponType == "INTRGAL" && item.orderAction == "COST") {
          that.options.data.attr("pointPrice", item.price);
        }
      });
      //       this.options.data.totalPoint =data.presentIntegral;
      if (typeof this.options.data.attr("pointPrice") == "undefined" || this.options.data.attr("pointPrice") == "") {
        this.options.data.attr("pointPrice", "0");
      }
      if (typeof this.options.data.attr("totalPoint") == "undefined" || this.options.data.attr("totalPoint") == "") {
        this.options.data.attr("totalPoint", "0");
      }

      //退税
      var orderPackageItemList = this.options.data.orderItem.orderPackageItemList;
      if (orderPackageItemList && orderPackageItemList.length > 0) {
        _.each(orderPackageItemList, function(packItem) {
          if (packItem && packItem.transporterName == 'ETK' && (packItem.status == "CONSIGNED" || packItem.status == 'COMPLETED' || packItem.status == 'AUTO_COMPLETED' || packItem.status == 'RECEIPTED')) {
            var getRefundTax = new SFGetRefundTax({
              bizId: packItem.packageNo
            });
            getRefundTax.sendRequest()
              .done(function(data) {
                packItem.attr('refundtax', data);
              })
              .fail(function(error) {

              })
              .always(function() {
                that.renderHtml();
              });
          } else {
            that.renderHtml();
          }
        });
      } else {
        this.renderHtml();
      }

      this.timmer();

      var params = can.route.attr();
      this.dispatch(params);

      loadingCtrl.hide();
      this.watchDetail.call(this, data);
    },

    watchDetail: function(data) {
      var uinfo = $.fn.cookie('3_uinfo');
      var arr = [];
      if (uinfo) {
        arr = uinfo.split(',');
      }

      var name = arr[0];
      SFMediav.watchOrderDetail({
        name: name
      }, {
        id: (new Date()).valueOf(),
        amount: data.totalPrice
      });
    },

    // 倒计时
    timmer: function() {
      var that = this;
      if (this.options.data.orderItem.paymentStatus == 'WAITPAY' && this.options.data.orderItem.orderStatus == 'SUBMITED') {
        this.drawTime();
        setInterval(function() {
          that.drawTime.call(that);
        }, 1000)
      }
    },

    drawTime: function() {
      var date = new Date();
      var goodsType = this.options.data.orderItem.orderPackageItemList[0].orderGoodsItemList[0].goodsType;
      if (goodsType == 'SECKILL') {
        var time = moment.duration(this.options.data.orderItem.gmtCreate + 15 * 60 * 1000 - this.serverTime);
      } else {
        var time = moment.duration(this.options.data.orderItem.gmtCreate + 2 * 60 * 60 * 1000 - this.serverTime);

      }

      var timeStr = null;

      if (time._data.hours && time._data.hours > 0) {
        timeStr = time._data.hours + '小时' + time._data.minutes + '分钟' + time._data.seconds + '秒'
      } else if (time._data.minutes && time._data.minutes > 0) {
        timeStr = time._data.minutes + '分钟' + time._data.seconds + '秒'
      } else if (time._data.seconds && time._data.seconds > 0) {
        timeStr = time._data.seconds + '秒'
      } else {
        timeStr = '0秒'
      }

      this.element.find('#pay-timmer').text(timeStr);
      // this.options.data.orderItem.attr('gmtCreate', this.options.data.orderItem.gmtCreate - 1000);
      this.serverTime = this.serverTime + 1000;
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

    '{can.route} change': function() {
      var params = can.route.attr();
      this.dispatch(params)
    },

    dispatch: function(params) {
      if (params.packageNo || params.packageNo == '0') {
        this.element.find('.orderdetail').hide();

        var that = this;
        setTimeout(function() {
          that.element.find('.logistics-' + params.packageNo).show().scrollTop();
        }, 0);

      } else {
        this.element.find('.orderdetail').show();
        this.element.find('.logistics').hide();
      }
    },

    setBackButton: function() {
      var switcher = new SFSwitcher();

      switcher.register('web', function() {

      });

      switcher.register('app', function() {
        SFHybrid.sfnavigator.setLeftButton(function() {
          var params = can.route.attr();
          if (params.packageNo || params.packageNo == '0') {
            SFHybrid.sfnavigator.popToIdentifier('history');
          } else {
            SFHybrid.sfnavigator.popToIdentifier();
          }
        });
      });

      switcher.go();
    },

    '.gotopay click': function($element, event) {
      var goodsType = this.options.data.orderItem.orderPackageItemList[0].orderGoodsItemList[0].goodsType;

      if (goodsType == 'SECKILL') {
        var url = SFConfig.setting.link.gotopay + '&' + $.param({
          "orderid": this.options.data.orderItem.orderId,
          "showordersuccess": true,
          "goodsType": goodsType
        });
      } else {
        var url = SFConfig.setting.link.gotopay + '&' + $.param({
          "orderid": this.options.data.orderItem.orderId,
          "showordersuccess": true
        });
      }

      // －－－－－－－－－－－－－－－－－－
      // 不同环境切换不同的支付页面
      var switcher = new SFSwitcher();

      switcher.register('wechat', function() {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90f1dcb866f3df60&redirect_uri=" + escape(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
      });

      switcher.register('web', function() {
        window.location.href = url;
      });

      switcher.register('app', function() {
        SFHybrid.notification.post('NotificationOrderRefresh', function() {});
        window.location.href = url;
      });


      switcher.go();
      // －－－－－－－－－－－－－－－－－－－
    },

    '.ordercancel click': function($element, event) {
      event && event.preventDefault();

      var that = this;
      var message = new SFMessage(null, {
        'tip': '确认要取消该订单？',
        'type': 'confirm',
        'okFunction': function() {
          var success = function() {

            var switcher = new SFSwitcher();

            switcher.register('app', function() {
              SFHybrid.notification.post('NotificationOrderRefresh', function() {});
            });

            switcher.go();

            window.location.reload();
          };

          var error = function() {
            // @todo 错误提示
          }

          SFOrderFn.orderCancel(that.options.data.orderItem, success, error);
        }
      });
    },

    '.received click': function($element, event) {
      event && event.preventDefault();

      var that = this;
      var message = new SFMessage(null, {
        'tip': '确认收货？',
        'type': 'confirm',
        'okFunction': function() {
          var success = function() {

            var switcher = new SFSwitcher();

            switcher.register('app', function() {
              SFHybrid.notification.post('NotificationOrderRefresh', function() {});
            });

            switcher.go();

            window.location.reload();
          }

          var error = function() {
            // @todo 错误提示
          }

          SFOrderFn.orderConfirm(that.options.data.orderItem, success, error);
        }
      });
    }
  });
});