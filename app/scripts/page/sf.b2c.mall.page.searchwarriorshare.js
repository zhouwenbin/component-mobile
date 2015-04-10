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
      }

    });
    new searchwarriorshare('.sf-b2c-mall-searchwarriorshare');
  });