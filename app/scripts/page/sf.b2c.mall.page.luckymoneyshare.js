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
    'sf.b2c.mall.api.coupon.getShareBagInfo',
    'sf.b2c.mall.luckymoney.users',
    'text!template_luckymoney_share'
  ],
  function(can, $, Fastclick, SFWeixin, SFFrameworkComm, SFConfig, helpers, SFGetOrderShareBagInfo, SFLuckyMoneyUsers, template_luckymoney_share) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var luckymoneyshare = can.Control.extend({
      itemObj:  new can.Map({
        isShowMask: false
      }),

      init: function() {
        this.render();
      },
      render: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var id = params.id;

        can.when(that.initOrderShareBagInfo(id))
          .always(function() {
            that.renderHtml(that.element, that.itemObj);
            var sfLuckyMoneyUsers = new SFLuckyMoneyUsers(".users", {shareBagId: id});
            that.itemObj.attr("userCouponInfo", sfLuckyMoneyUsers.itemObj.userCouponInfo);
            $('.loadingDIV').hide();
          });
      },
      initOrderShareBagInfo: function(shareBagId) {
        var that = this;
        var getOrderShareBagInfo = new SFGetOrderShareBagInfo({
          "shareBagId": shareBagId
        });


        return getOrderShareBagInfo.sendRequest()
          .done(function(cardBagInfo) {
            SFWeixin.shareLuckyMoney(cardBagInfo.title, cardBagInfo.useInstruction, cardBagInfo.bagCodeId);

            //处理卡券规则
            cardBagInfo.useInstructions = cardBagInfo.useInstruction.split("\n");
            that.itemObj.attr({
              cardBagInfo: cardBagInfo
            })
          })
          .fail(function(error) {
            console.error(error);
          });
      },
      renderHtml: function(element, itemObj) {
        var html = can.view(template_luckymoney_share, itemObj);
        element.html(html);
      },
      "#shareBtn click": function() {
        this.itemObj.attr("isShowMask", true);
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      }
    });
    new luckymoneyshare('.sf-b2c-mall-luckyMoney-share');
  })