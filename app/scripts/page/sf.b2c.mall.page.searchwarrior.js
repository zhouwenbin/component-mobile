'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.widget.wechatlogin',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.receiveCoupon',
    'sf.b2c.mall.api.coupon.receiveShareCoupon',
    'sf.b2c.mall.api.coupon.getShareBagCpList',
    'sf.b2c.mall.api.coupon.getShareBagInfo',
    'sf.b2c.mall.api.coupon.hasReceived'
  ],
  function(can, $, Fastclick,
           SFWeixin, SFFrameworkComm, SFConfig, helpers,
           SFLoading, SFWeChatLogin, SFMessage,
           SFReceiveCoupon, SFReceiveShareCoupon, SFGetShareBagCpList, SFGetOrderShareBagInfo, SFHasReceived) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var searchwarrior = can.Control.extend({
      itemObj:  new can.Map({
        bagId: 83,
        bagCodeId: null,
        cardId: null,
        telephone: "",
        isEnable: false,
        errorMessage: "请输入手机号即可领取",
        userCouponInfo: null,
        fightingCapacity: 0,
        template: "templates/searchwarrior/sf.b2c.mall.searchwarrior.mustache"
      }),
      loading: new SFLoading(),

      init: function() {
        this.render();
      },
      render: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        //手动修改bagId
        var bagId = params.bagId;
        if (bagId) {
          this.itemObj.attr("bagId", bagId);
        }
        //如果红包code存在，这渲染领取情况
        var bagCodeId = params.bagCodeId;
        var cardId = params.cardId;
        if (bagCodeId && cardId) {
          this.itemObj.attr({
            "bagCodeId": bagCodeId,
            "cardId": cardId,
            "fightingCapacity": this.calculateFightingCapacity(cardId)
          });
          this.getShareBagCpList();
        }
        //强制登录
        if(!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var wechatLogin = new SFWeChatLogin();
          wechatLogin.checkoutWeChatLogin();
        } else {
          that.renderHtml();
          that.loading.hide();
          that.initSubmitBtnEvent();
        }
      },
      renderHtml: function() {
        var that = this;

        var html = can.view(this.itemObj.template, this.itemObj);
        this.element.html(html);

        this.itemObj.bind("telephone", function(ev, newVal, oldVal) {
          that.itemObj.attr("errorMessage", "手机号格式错误");
          if(!/^1\d{10}$/.test(newVal)) {
            that.itemObj.attr("isEnable", false);
          } else {
            that.itemObj.attr("isEnable", true);
          }
        });
      },
      initSubmitBtnEvent: function() {
        var that = this;
        $("#submitBtn").click(function() {
          if (!this.itemObj.isEnable) {
            return;
          }

          that.loading.show();
          if (that.itemObj.cardId) {
            that.receiveShareCoupon();
          } else {
            that.receiveCpCodeData();
          }
        });
      },
      receiveCpCodeData: function() {
        var that = this;
        var receiveCouponData = new SFReceiveCoupon({
          bagId: this.itemObj.bagId,
          type: "SHAREBAG",
          receiveChannel: 'B2C',
          receiveWay: 'ZTLQ'
        });
        return can.when(receiveCouponData.sendRequest())
          .done(function(userCouponInfo) {
            that.itemObj.attr("bagCodeId", userCouponInfo.bagInfo.bagCodeId);
            that.receiveShareCoupon();
          })
          .fail(function(error) {
            new SFMessage(null, {
              'tip': that.errorMap[error] || '查看战斗力失败！',
              'type': 'error'
            });
          })
          .always(function() {
            that.loading.hide();
          });
      },
      receiveShareCoupon: function() {
        var that = this;
        var receiveShareCoupon = new SFReceiveShareCoupon({
          'mobile': this.itemObj.telephone,
          'receiveChannel': 'B2C',
          'receiveWay': 'HBLQ',
          'shareBagId': this.itemObj.bagCodeId
        });
        receiveShareCoupon.sendRequest()
          .done(function(userCouponInfo) {
            that.itemObj.attr({
              isReceive: true,
              couponId: userCouponInfo.couponId,
              cardId: userCouponInfo.cardId,
              reduceCost:userCouponInfo.reduceCost
            });
            that.gotoSharePage();
          })
          .fail(function(error) {
            new SFMessage(null, {
              'tip': that.errorMap[error] || '查看战斗力失败！',
              'type': 'error'
            });
          });
      },
      getShareBagCpList: function() {
        var that = this;
        var getShareBagCpList = new SFGetShareBagCpList({
          "shareBagId": that.itemObj.bagCodeId
        });

        return getShareBagCpList.sendRequest()
          .done(function(userCouponInfo) {
            for(var i = 0, item; item = userCouponInfo.items[i]; i++) {
              item.fightingCapacity = that.calculateFightingCapacity(item.cardId);
            }

            that.itemObj.attr({
              userCouponInfo: userCouponInfo
            });
          })
          .fail(function(error) {
            console.error(error);
          });
      },

      initOrderShareBagInfo: function() {
        var that = this;
        var getOrderShareBagInfo = new SFGetOrderShareBagInfo({
          "shareBagId": this.itemObj.bagCodeId
        });

        return getOrderShareBagInfo.sendRequest()
          .done(function(cardBagInfo) {
            if (cardBagInfo.cardSurplusNum == 0) {
              //红包已领完
            }

            that.itemObj.attr("userCouponInfo", sfLuckyMoneyUsers.itemObj.userCouponInfo)
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      initHasReceivedInfo: function(shareBagId) {
        var that = this;
        var hasReceivedInfo = new SFHasReceived({
          "shareId": this.itemObj.bagCodeId
        });

        return hasReceivedInfo.sendRequest()
          .done(function(boolResp) {
            if (boolResp.value) {
            }
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      errorMap: {
        "11000020": "卡券不存在",
        "11000030": "卡券已作废",
        "11000050": "卡券已领完",
        "11000100": "您已领过该券",
        "11000130": "卡包不存在",
        "11000140": "卡包已作废"
      },
      gotoSharePage: function() {
        window.location.href =
          "http://m.sfht.com/searchwarriorshare.html?bagId=" + this.itemObj.bagId +
          "&bagCodeId=" + this.itemObj.bagCodeId +
          "&couponId=" + this.itemObj.couponId +
          "&reduceCost=" + this.itemObj.reduceCost;
      },
      calculateFightingCapacity: function(referenceSubstance) {
        return referenceSubstance * 100;
      }

    });
    new searchwarrior('.sf-b2c-mall-searchwarrior');
  })