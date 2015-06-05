'use strict';
define(
  [
    'can',
    'zepto',
    'store',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.helpers',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.coupon.getUserCouponList',
    'sf.b2c.mall.api.coupon.receiveExCode',
    'text!template_center_coupon',
    'sf.env.switcher',
    'sf.hybrid'
  ],
  function(can, $, store, Fastclick, SFFrameworkComm, helpers, SFConfig, SFGetUserCouponList, SFReceiveExCode,
    template_center_coupon, SFSwitcher, SFHybrid) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var coupon = can.Control.extend({
      itemObj: new can.Map({
        unUsed: {
          count: 0,
          items: []
        },
        thirdparty: {
          isShow: false,
          count: 0,
          items: []
        },
        used: {
          count: 0,
          items: []
        },
        expired: {
          count: 0,
          items: []
        },
        cancel: {
          count: 0,
          items: []
        },
        totalCount: 0
      }),

      init: function() {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        }

        this.render();
      },

      render: function() {
        var that = this;
        can.when(that.initCoupons())
          .then(function() {
            that.itemObj.attr("totalCount", 1);
            // var html = can.view(template_center_coupon, that.itemObj);
            var renderFn = can.mustache(template_center_coupon);
            var html = renderFn(that.itemObj);
            that.element.html(html);
          })
          .always(function() {
            $('.loadingDIV').hide();
          });
      },

      initCoupons: function() {
        var that = this;
        var getUserCouponList = new SFGetUserCouponList({});
        getUserCouponList.sendRequest()
          .done(function(data) {
            that.itemObj.attr("totalCount", data.totalCount || 0);
            var couponStatusMap = {
              "UNUSED": function() {
                that.itemObj.unUsed.count++;
                that.itemObj.unUsed.items.push(tmpCoupon);
              },
              "USED": function() {
                that.itemObj.used.count++;
                that.itemObj.used.items.push(tmpCoupon);
              },
              "CANCELED": function() {
                that.itemObj.cancel.count++;
                that.itemObj.cancel.items.push(tmpCoupon);
              },
              "EXPIRED": function() {
                that.itemObj.expired.count++;
                that.itemObj.expired.items.push(tmpCoupon);
              }
            }

            var thirdpartyMap = {
              "EXT_MOVIETICKET": function() {
                if (tmpCoupon.customUrl != null && tmpCoupon.customUrl != "") {
                  tmpCoupon.showButton = true;
                }
                that.itemObj.thirdparty.count++;
                that.itemObj.thirdparty.items.push(tmpCoupon);
              },

              "EXT_TAXICOUPON": function() {
                if (tmpCoupon.customUrl != null && tmpCoupon.customUrl != "") {
                  tmpCoupon.showButton = true;
                }
                that.itemObj.thirdparty.count++;
                that.itemObj.thirdparty.items.push(tmpCoupon);
              }
            }

            var pushCoupon = function(couponType, status) {
              var fn;

              if (couponType == "EXT_MOVIETICKET" || couponType == "EXT_TAXICOUPON") {
                fn = thirdpartyMap[couponType];
              } else {
                fn = couponStatusMap[status];
              }

              if (_.isFunction(fn)) {
                return fn.call(this)
              }
            }
            if (data.items) {
              for (var i = 0, tmpCoupon; tmpCoupon = data.items[i]; i++) {
                pushCoupon(tmpCoupon.couponType, tmpCoupon.status);
              }
            }
          });
      },

      //优惠券兑换相关事件
      '#inputCouponCode click': function(targetElement) {
        $("#couponCodeDialog").show();
      },
      '.dialog .icon15, .dialog1 .btn-normal click': function(targetElement) {
        targetElement.parents(".dialog").hide();
      },
      '#couponCodeDialog input input': function(targetElement) {
        if (targetElement.val().length > 0) {
          $("#couponCodeDialog button").removeClass("btn-disable").addClass("btn-danger");
        } else {
          $("#couponCodeDialog button").addClass("btn-disable").removeClass("btn-danger");
        }
      },
      '#couponCodeDialog .btn-danger click': function(targetElement) {
        var exCode = $('#couponCodeDialog input').val();
        can.when(this.receiveCouponExCode(exCode))
          .done(function() {});
      },
      '#couponCodeDialog input focus': function(targetElement) {
        $("#couponCodeDialog .text-error").text("");
      },


      receiveCouponExCode: function(exCode) {
        var that = this;
        var receiveExCode = new SFReceiveExCode({
          exCode: exCode
        });
        receiveExCode.sendRequest()
          .done(function(userCouponInfo) {
            can.when(that.initCoupons())
              .then(function() {
                $("#selectCoupon option[data-code='" + exCode + "']").first().attr('selected', 'true');
                $("#selectCoupon").trigger("change");
                $("#couponCodeDialogSuccess").show();
                $("#couponCodeDialog").hide();
              });
          })
          .fail(function(error) {
            var errorMap = {
              11000160: "请输入有效的兑换码",
              11000170: "兑换码已使用",
              11000200: "兑换码已过期",
              11000209: "请输入正确的兑换码",
              11000220: "本账户超过兑换次数限制"
            };
            $("#couponCodeDialog .text-error").text(errorMap[error] ? errorMap[error] : '请输入有效的兑换码！');
          })
          .always(function() {});
      }
    });

    // new coupon('.sf-b2c-mall-coupon');

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new coupon('.sf-b2c-mall-coupon');
      new SFNav('.sf-b2c-mall-nav');
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
          new coupon('.sf-b2c-mall-coupon');
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－

  });