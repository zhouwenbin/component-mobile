'use strict';

define(
  [
    'can',
    'zepto',
    'store',
    'fastclick',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.luckymoney.users',
    'sf.b2c.mall.api.coupon.getShareBagInfo',
    'sf.b2c.mall.api.coupon.receiveShareCoupon',
    'sf.b2c.mall.api.coupon.hasReceived',
    'sf.b2c.mall.widget.login',
    'text!template_luckymoney_accept',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.component.nav',
  ],
  function(can, $, store, Fastclick, SFWeixin,
           SFFrameworkComm, SFConfig, helpers, SFLuckyMoneyUsers,
           SFGetOrderShareBagInfo, SFReceiveShareCoupon, SFHasReceived, SFLogin,
           template_luckymoney_accept, SFSwitcher, SFHybrid, SFNav) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var luckymoneyaccept = can.Control.extend({
      itemObj:  new can.Map({
        isShowMask: false,
        isReceive: false,
        isEnable: false,
        isNull: false,
        errorMessage: "请输入手机号即可领取",
        telephone: "",
        receiveCoupon: {},
        whyNull: "已领完"
      }),

      init: function() {

        // 显示蒙层
        $('.loadingDIV').show();

        this.render();
      },
      render: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var id = params.id;
        var code = params.code;

        //微信登录
        if(SFFrameworkComm.prototype.checkUserLogin.call(this) || (store.get('tempToken') && store.get('tempTokenExpire') && !this.checkTempTokenExpire())) {
          that.initOrderShareBagInfo(id);
          that.initHasReceivedInfo(id);
        } else {
          var login = new SFLogin();
          login.tmplLogin();
        }
      },
      checkTempTokenExpire: function() {
        var expire = store.get('tempTokenExpire');
        var nowDate = new Date();
        if (nowDate.getTime() > expire) {
          return true;
        } else {
          return false;
        }
      },
      initOrderShareBagInfo: function(shareBagId) {
        var that = this;
        var getOrderShareBagInfo = new SFGetOrderShareBagInfo({
          "shareBagId": shareBagId
        });

        return getOrderShareBagInfo.sendRequest()
          .done(function(cardBagInfo) {
            if (cardBagInfo.cardSurplusNum == 0) {
              that.itemObj.attr({
                "isNull": true
              });
            }

            //处理卡券规则
            cardBagInfo.useInstructions = cardBagInfo.useInstruction.split("\n");

            SFWeixin.shareLuckyMoney(cardBagInfo.title, cardBagInfo.useInstruction, cardBagInfo.bagCodeId);
            that.itemObj.attr({
              cardBagInfo: cardBagInfo
            });
            that.itemObj.bind("telephone", function(ev, newVal, oldVal) {
              that.itemObj.attr("errorMessage", "手机号格式错误");
              if(!/^1\d{10}$/.test(newVal)) {
                that.itemObj.attr("isEnable", false);
              } else {
                that.itemObj.attr("isEnable", true);
              }
            });
            that.renderHtml(that.element, that.itemObj);
            var sfLuckyMoneyUsers = new SFLuckyMoneyUsers(".users", {shareBagId: shareBagId});
            that.itemObj.attr("userCouponInfo", sfLuckyMoneyUsers.itemObj.userCouponInfo)
          })
          .fail(function(error) {
            console.error(error);
          })
          .always(function() {
            $('.loadingDIV').hide();
          });
      },

      initHasReceivedInfo: function(shareBagId) {
        var that = this;
        var params = {
          "shareId": shareBagId
        };
        if (store.get('tempToken')) {
          params.tempToken = store.get('tempToken');
        }
        var hasReceivedInfo = new SFHasReceived(params);

        return hasReceivedInfo.sendRequest()
          .done(function(boolResp) {
            if (boolResp.value) {
              that.itemObj.attr({
                "isNull": true,
                "whyNull": "已领过"
              });
            }
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      renderHtml: function(element, itemObj) {
        // var html = can.view(template_luckymoney_accept, itemObj);
        var renderFn = can.mustache(template_luckymoney_accept);
        var html = renderFn(itemObj);
        element.html(html);
      },
      errorMap: {
        "-100": "已领完",
        11000020: "已领完", //不存在
        11000050: "已领完",
        11000100: "已领过",
        11000130: "已领完" //不存在
      },

      "#acceptShareBagBtn click": function(ele, event) {
        if (!this.itemObj.isEnable) {
          return;
        }
        var that = this;

        var receiveShareCoupon = new SFReceiveShareCoupon({
          'mobile': this.itemObj.telephone,
          'receiveChannel': 'B2C',
          'receiveWay': 'HBLQ',
          'shareBagId': this.itemObj.cardBagInfo.bagCodeId,
          tempToken: store.get('tempToken')
        });
        receiveShareCoupon.sendRequest()
          .done(function(userCouponInfo) {
            if (!userCouponInfo) {
              that.itemObj.attr("isNull", true);
              return;
            }
            that.itemObj.attr({
              isReceive: true,
              receiveCoupon: userCouponInfo
            });
          })
          .fail(function(error) {
            that.itemObj.attr({
              "isNull": true,
              "whyNull": that.errorMap[error]
            });
          });
      },
      "#shareBtn click": function() {
        this.itemObj.attr("isShowMask", true);
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      },
      "#telephone keyup":function(targetElement, event) {
        var that = this;
        var newVal = targetElement.val();
        that.itemObj.attr("errorMessage", "手机号格式错误");
        if(!/^1\d{10}$/.test(newVal)) {
          that.itemObj.attr("isEnable", false);
        } else {
          that.itemObj.attr("isEnable", true);
        }
      }
    });

    // new luckymoneyaccept('.sf-b2c-mall-luckymoney-accept');
    //

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new luckymoneyaccept('.sf-b2c-mall-luckymoney-accept');
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
          SFHybrid.isLogin().done(function () {
            new luckymoneyaccept('.sf-b2c-mall-luckymoney-accept');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  })