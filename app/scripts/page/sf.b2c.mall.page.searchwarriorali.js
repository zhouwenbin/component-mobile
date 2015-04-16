'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'store',
    'sf.util',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.widget.login',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.receiveCoupon',
    'sf.b2c.mall.api.coupon.receiveShareCoupon',
    'sf.b2c.mall.api.coupon.getShareBagCpList',
    'sf.b2c.mall.api.coupon.getShareBagInfo',
    'sf.b2c.mall.api.coupon.hasReceived'
  ],
  function(can, $, Fastclick, store, SFFn,
           SFWeixin, SFFrameworkComm, SFConfig, helpers,
           SFLoading, SFWeChatLogin, SFMessage,
           SFReceiveCoupon, SFReceiveShareCoupon, SFGetShareBagCpList, SFGetOrderShareBagInfo, SFHasReceived) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var searchwarrior = can.Control.extend({
      itemObj:  new can.Map({
        bagId: 9,
        bagCodeId: null,
        cardId: null,
        telephone: "",
        isEnable: false,
        cardIds: null,
        errorMessage: "请输入手机号即可领取",
        userCouponInfo: null,
        fightingCapacity: 0,
        template: "templates/searchwarrior/sf.b2c.mall.searchwarrior.mustache"
      }),
      isNull: false,
      loading: new SFLoading(),
      warriors: [],
      cardMap: {
        "49": 0,
        "50": 1,
        "51": 2,
        "52": 3,
        "53": 4,
        "54": 5,
        "55": 6,
        "56": 7,
        "57": 8,
        "58": 9,
        "59": 10,
        "60": 11,
        "61": 12,
        "62": 13,
        "63": 14,
        "64": 15,
        "65": 16,
        "66": 17,
        "67": 18,
        "68": 19,
        "69": 20,
        "70": 21,
        "71": 22,
        "72": 23,
        "73": 24,
        "74": 25,
        "75": 26,
        "76": 27,
        "77": 28,
        "78": 29
      },


      helpers: {
        ismobile: function(mobile, options) {
          if (mobile() == 'mobile') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        isWeChat: function(options) {
          if (SFFn.isMobile.WeChat()) {
            return options.fn(options.contexts || this);
          }else{
            return options.inverse(options.contexts || this);
          }
        },
        isAlipay: function(options) {
          if (SFFn.isMobile.AlipayChat()) {
            return options.fn(options.contexts || this);
          }else{
            return options.inverse(options.contexts || this);
          }
        }
      },

      init: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));

        var bagId = params.bagId;
        var bagCodeId = params.bagCodeId;
        var couponId = params.couponId;
        var cardId = params.cardId;
        var cardIds = params.cardIds;
        if (cardIds) {
          this.itemObj.attr("cardIds", params.cardIds);
          var tmpArr = cardIds.split(",");
          for(var i = 0, tmpItem; tmpItem = tmpArr[i]; i++) {
            this.cardMap[tmpItem] = i;
          }
        }
        this.itemObj.attr("price", params.price);

        //手动修改bagId
        if (bagId) {
          this.itemObj.attr("bagId", bagId);
        }

        can.when(this.initWarriors())
          .done(function() {

            //如果红包code存在，就渲染领取情况
            if (bagCodeId && cardId) {
              that.itemObj.attr({
                "bagCodeId": bagCodeId,
                "cardId": cardId,
                "warrior": that.calculateFightingCapacity(cardId),
                "template": "templates/searchwarrior/sf.b2c.mall.searchwarrior.accept.mustache"
              });
              that.getShareBagCpList();
            }

            that.render();
          });
      },
      render: function() {
        var that = this;

        //强制登录
        if(!SFFrameworkComm.prototype.checkUserLogin.call(this) && !store.get('tempToken')) {
          var wechatLogin = new SFWeChatLogin();

          if (SFFn.isMobile.AlipayChat()) {
            //wechatLogin.alipayTmplLogin();
          }else{
            wechatLogin.tmplLogin();
          }
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
          if (!that.itemObj.isEnable) {
            new SFMessage(null, {
              'tip': that.itemObj.errorMessage,
              'type': 'error'
            });
            return;
          }

          that.loading.show();
          if (that.itemObj.cardId && !that.isNull) {
            that.receiveShareCoupon();
          } else {
            that.receiveCpCodeData();
          }
        });
      },
      /**
       * 领红包
       * @returns {*}
       */
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
            that.loading.hide();
            new SFMessage(null, {
              'tip': that.errorMap[error] || '查看战斗力失败！',
              'type': 'error'
            });
          })
          .always(function() {
            that.loading.hide();
          });
      },
      /**
       * 领红包里的优惠券
       */
      receiveShareCoupon: function() {
        var that = this;
        var receiveShareCoupon = new SFReceiveShareCoupon({
          'mobile': this.itemObj.telephone,
          'receiveChannel': 'B2C',
          'receiveWay': 'HBLQ',
          'shareBagId': this.itemObj.bagCodeId,
          tempToken: store.get('tempToken')
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
      /**
       * 获取红包的领用情况
       * @returns {*}
       */
      getShareBagCpList: function() {
        var that = this;
        var getShareBagCpList = new SFGetShareBagCpList({
          "shareBagId": that.itemObj.bagCodeId
        });

        return getShareBagCpList.sendRequest()
          .done(function(userCouponInfo) {
            for(var i = 0, item; item = userCouponInfo.items[i]; i++) {
              item.warrior = that.calculateFightingCapacity(item.cardId);
            }

            that.itemObj.attr({
              userCouponInfo: userCouponInfo
            });
          })
          .fail(function(error) {
            console.error(error);
          });
      },
      /**
       * 获取红包的信息
       * @returns {*}
       */
      initOrderShareBagInfo: function() {
        var that = this;
        var getOrderShareBagInfo = new SFGetOrderShareBagInfo({
          "shareBagId": this.itemObj.bagCodeId
        });

        return getOrderShareBagInfo.sendRequest()
          .done(function(cardBagInfo) {
            if (cardBagInfo.cardSurplusNum == 0) {
              that.isNull = true;
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
        if (store.get('tempToken')) {
          params.tempToken = store.get('tempToken');
        }

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
          "&cardId=" + this.itemObj.cardId +
          "&price=" + this.itemObj.reduceCost +
          (this.itemObj.cardIds ? "&cardIds=" + this.itemObj.cardIds : "");

      },
      calculateFightingCapacity: function(cardId) {
        var warrior = this.warriors[this.cardMap[cardId]];
        var tempnum = "11111";
        warrior.fightArray = tempnum.split("1", warrior.fight);
        warrior.faceArray = tempnum.split("1", warrior.face);
        return warrior;
      },

      initWarriors: function() {
        var that = this;
        return can.ajax({url: '/json/sf.b2c.mall.warriors.json'})
          .done(function(data){
            that.warriors = data;
          })
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
    new searchwarrior('.sf-b2c-mall-searchwarrior');
  })