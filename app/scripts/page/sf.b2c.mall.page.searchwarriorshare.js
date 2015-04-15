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

    var searchwarriorshare = can.Control.extend({
      itemObj:  new can.Map({
        warrior: {},
        price: 0
      }),
      loading: new SFLoading(),
      warriors: [],
      cardMap: {
        "260": 1
      },

      init: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var bagId = params.bagId;
        var bagCodeId = params.bagCodeId;
        var couponId = params.couponId;
        var cardId = params.cardId;
        this.itemObj.attr("price", params.price);

        var link = 'http://m.sfht.com/searchwarrior.html?' + window.location.search.substr(1);
        SFWeixin.shareDetail(
          '',
          '',
          link,
          'http://img.sfht.com/sfht/img/sharelog.png');
        that.itemObj.attr("isShowMask", true);

        can.when(this.initWarriors())
          .done(function() {
            that.calculateFightingCapacity(cardId);
            that.render();
          });
      },
      render: function() {
        var that = this;
        this.element.html(can.view("templates/searchwarrior/sf.b2c.mall.searchwarrior.share.mustache", this.itemObj));
        this.loading.hide();
      },

      calculateFightingCapacity: function(cardId) {
        this.itemObj.attr("warrior", this.warriors[this.cardMap[cardId]]);
      },

      initWarriors: function() {
        var that = this;
        return can.ajax({url: '/json/sf.b2c.mall.warriors.json'})
          .done(function(data){
            that.warriors = data;
          })
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      },
      "#shareBtn click": function() {
        this.itemObj.attr("isShowMask", true);
      }

    });
    new searchwarriorshare('.sf-b2c-mall-searchwarriorshare');
  });