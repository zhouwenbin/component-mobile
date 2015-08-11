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
    'sf.b2c.mall.business.config',
    'text!template_order_gotopay',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.api.order.getOrderConfirmInfo'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFRequestPayV2, SFLoading, SFOrderFn,
    SFMessage, SFWeixin, SFUtil, SFConfig, template_order_gotopay, SFSwitcher, SFHybrid, SFNav, SFHeader, SFGetOrderConfirmInfo) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    can.route.ready();

    var loadingCtrl = new SFLoading();

    var SFGotoPay = can.Control.extend({

      helpers: {
        'showSecKillPayTime': function(goodsType, options) {
          if (goodsType() == 'SECKILL') {
            return "15分钟";
          } else {
            return "2小时";
          }
        },
        'sf-paytype-list': function(optionalPayTypeList, payType, options) {
          if (_.contains(optionalPayTypeList(), payType)) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        'sf-show-desc': function(discount, payType, options) {
          var discountInfo = JSON.parse(discount().value);
          if (typeof discountInfo[payType] !== 'undefined') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        'sf-totalprice': function(selectPayType, price, discount) {
          var discountInfo = JSON.parse(discount().value);
          if (typeof discountInfo != 'undefined' &&
            !can.isEmptyObject(discountInfo) &&
            typeof discountInfo[selectPayType()] != 'undefined'
          ) {
            if (price() - discountInfo[selectPayType()] <= 0) {
              return 0.01;
            } else {
              return (price() - discountInfo[selectPayType()]) / 100
            }
          } else {
            return price() / 100
          }
        },
        'sf-show-save': function(selectPayType, discount, options) {
          var discountInfo = JSON.parse(discount().value);
          if (typeof discountInfo[selectPayType()] !== 'undefined') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        'sf-totalsave': function(selectPayType, discount, options) {
          var discountInfo = JSON.parse(discount().value);
          return discountInfo[selectPayType()] / 100;
        },
        'sf-show-orderPrice': function(price, options) {
          var price = price();
          return price / 100;
        }
      },

      init: function(element, options) {

        var that = this;
        this.options.data = new can.Map({});

        // 判断是否登陆
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login;
          return false;
        }

        // 显示蒙层
        loadingCtrl.show();

        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        this.options.orderid = params.orderid;
        this.options.recid = params.recid;
        this.options.alltotalamount = params.amount;
        this.options.code = params.code;



        this.options.data.attr("showordersuccess", params.showordersuccess);
        this.options.data.attr("goodsType", params.goodsType);

        // 如果是在微信环境和APP下 显示微信支付和支付宝，其他时候只展示支付宝
        if (SFUtil.isMobile.WeChat() || (SFUtil.isMobile.APP() && SFHybrid.getInfo.getAppInfo() != '1.0.0')) {
          this.options.data.attr("showWeixinPay", true);
        }

        var getOrder = new SFGetOrderConfirmInfo({
          "orderId": params.orderid
        });
        getOrder.sendRequest()
          .done(function(data) {
            data.optionalPayTypeList = eval(data.optionalPayTypeList);
            that.options.data.attr(data);
            var discountInfo = _.keys(JSON.parse(data.discount.value));
            var array = _.intersection(discountInfo, data.optionalPayTypeList);

            if (array.length > 1) {
              if (that.options.data.attr("showWeixinPay")) {
                that.options.data.attr('selectPayType', array[1]);
              } else {
                that.options.data.attr('selectPayType', array[0]);
              }
            } else if (array.length == 1) {
              if (that.options.data.attr("showWeixinPay")) {
                that.options.data.attr('selectPayType', array[0]);
              } else {
                that.options.data.attr('selectPayType', data.optionalPayTypeList[0]);
              }
            } else {
              if (that.options.data.attr("showWeixinPay")) {
                that.options.data.attr('selectPayType', data.optionalPayTypeList[1]);
              } else {
                that.options.data.attr('selectPayType', data.optionalPayTypeList[0]);
              }
            }
            that.render(that.options.data);
          });
        //活动期间 微信要放到第一个位置
        if (this.options.data.attr("showWeixinPay") && new Date().getTime() > new Date(2015, 6, 27, 0, 0, 0).getTime() && new Date().getTime() < new Date(2015, 7, 3, 0, 0, 0).getTime()) {
          $('.gotopaymethodlist li').eq(0).appendTo('.gotopaymethodlist');
          // $("#weixintip").text("微信（7.27-8.2首次下单减2元）");
        }
        $('#gotopayBtn').click(function() {
          that.gotopayBtnClick($(this));
        })

        loadingCtrl.hide();
      },

      // activeWeixinpay: function() {
      //   var paytypelist = $(".gotopaymethodlist").find("li");
      //   _.each(paytypelist, function(item) {
      //     var result = $(item).attr("data-payType");
      //     if (result == 'weixinpay') {
      //       $(item).addClass("active");
      //     } else {
      //       $(item).removeClass("active");
      //     }
      //   })
      // },

      render: function(data) {
        // var html = can.view('/templates/order/sf.b2c.mall.order.gotopay.mustache', data);
        var renderFn = can.mustache(template_order_gotopay);
        var html = renderFn(data, this.helpers);
        this.element.html(html);
        var selectPayType = this.options.data.attr('selectPayType');

        //如果在微信环境中
        if (this.options.data.attr("showWeixinPay")) {
          $("[data-paytype=" + selectPayType + "]").addClass('active');
        } else {
          this.element.find('li.gotopaymethod').first().addClass('active');
        }
      },

      ".gotopaymethod click": function(element, event) {
        event && event.preventDefault();
        element.addClass("active").siblings('li').removeClass('active');
        // element.parent().find("li.gotopaymethod").removeClass("active");
        // element.addClass("active");
        this.options.data.attr('selectPayType', element.eq(0).attr('data-payType'));
        //this.options.payType = element.eq(0).attr('data-payType');
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
        var result = '';
        var paytypelist = $(".gotopaymethodlist").find("li");
        _.each(paytypelist, function(item) {
            if ($(item).hasClass("active")) {
              result = $(item).attr("data-payType");
            }
          })
          // 针对支付方式概要，做定制处理
          // if (result == "weixinpay") {
          //   result = "wechat_intl_mp";
          // } else if (result == "alipay") {

        //   //如果在支付宝服务窗中打开，则使用内卡，否则使用外卡
        //   if (typeof window.AlipayJSBridge != "undefined") {
        //     result = "alipay_intl_wap";
        //   } else {
        //     // h5和微信浏览器中的支付宝外卡收款 切到alipay_intl_wap 先保留分支
        //     // result = 'alipay_forex_wap';
        //     result = 'alipay_intl_wap';
        //   }

        // }

        return result;
      },

      /**
       * [getAppPayType 针对APP应用做的支付类型定制]
       * @return {[type]} [description]
       */
      getAppPayType: function() {
        var result = "";

        var paytypelist = $(".gotopaymethodlist").find("li");
        _.each(paytypelist, function(item) {
          if ($(item).hasClass("active")) {
            result = $(item).attr("data-payType");
          }
        })

        return result.toUpperCase();
      },

      gotopayBtnClick: function() {

        if ($("#gotopayBtn").hasClass('btn-disable')) {
          return false;
        }

        $("#gotopayBtn").addClass('btn-disable');

        // $("#gotopayBtn").add.text("支付中");
        var that = this;

        var callback = {
          error: function(errorText) {
            var message = new SFMessage(null, {
              'tip': '订单支付失败！',
              'type': 'error'
            });

            $("#gotopayBtn").removeClass('btn-disable');
          },

          // 回调中设置值回来
          success: function(payResult) {
            $("#gotopayBtn").removeClass('btn-disable');

            that.payResult = payResult;
          }
        }

        var that = this;

        var switcher = new SFSwitcher()

        switcher.register('app', function() {
          SFHybrid.pay(that.options.orderid, that.getAppPayType())
            .done(function() {
              SFHybrid.toast.dismiss();
              var link = SFConfig.setting.link.paysuccess;

              if (link.indexOf('?') > -1) {
                link = link + '&' + $.param({
                  orderid: that.options.orderid
                });
              } else {
                link = link + '?' + $.param({
                  orderid: that.options.orderid
                });
              }

              window.location.href = link;
            })
            .fail(function(errorInfo) {
              SFHybrid.toast.dismiss();

              var defaultMsg = '订单支付失败！';
              var map = {
                '4000': '订单支付失败！',
                '6001': '用户中途取消支付',
                '6002': '网络连接出错'
              }

              var msg = map[(errorInfo && errorInfo.code)] || defaultMsg;

              if (msg) {
                SFHybrid.toast.show(msg);
              }

              $("#gotopayBtn").removeClass('btn-disable');
            });
        })

        switcher.register('web', function() {
          SFOrderFn.payV2({
            orderid: that.options.orderid,
            payType: that.getPayType(),
            payResult: that.payResult,
            extInfo: JSON.stringify({
              "code": that.options.code
            })
          }, callback);
        });

        switcher.go();
      }
    });

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new SFGotoPay('.sf-b2c-mall-gotopay');
      //new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          SFHybrid.setNetworkListener();
          SFHybrid.isLogin();
          new SFGotoPay('.sf-b2c-mall-gotopay');
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });