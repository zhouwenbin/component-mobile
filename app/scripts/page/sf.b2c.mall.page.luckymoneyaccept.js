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
    'sf.b2c.mall.api.coupon.hasReceived'
  ],
  function(can, $, store, Fastclick, SFWeixin,
           SFFrameworkComm, SFConfig, helpers, SFLuckyMoneyUsers,
           SFGetOrderShareBagInfo, SFReceiveShareCoupon, SFHasReceived) {
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
        this.render();
      },
      render: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var id = params.id;
        var code = params.code;

        //微信登录
        if(!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var wechatLogin = new SFWeChatLogin();
          wechatLogin.login();
        } else {
          that.initOrderShareBagInfo(id);
          that.initHasReceivedInfo(id);
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
        var hasReceivedInfo = new SFHasReceived({
          "shareId": shareBagId
        });

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
        var html = can.view('templates/luckymoney/sf.b2c.mall.luckymoney.accept.mustache', itemObj);
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
          'shareBagId': this.itemObj.cardBagInfo.bagCodeId
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
      "#telephone focus": function() {
        //this.itemObj.attr("isEnable", true);
      },
      "#shareBtn click": function() {
        this.itemObj.attr("isShowMask", true);
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      }
    });

    new luckymoneyaccept('.sf-b2c-mall-luckymoney-accept');
  })