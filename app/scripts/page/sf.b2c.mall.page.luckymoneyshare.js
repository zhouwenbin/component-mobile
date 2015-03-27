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
    'sf.b2c.mall.api.coupon.getShareBagCpList'
  ],
  function(can, $, Fastclick, SFWeixin, SFFrameworkComm, SFConfig, helpers, SFGetOrderShareBagInfo, SFGetShareBagCpList) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var luckymoneyshare = can.Control.extend({
      itemObj:  new can.Map({}),

      init: function() {
        this.render();
      },
      render: function() {
        var that = this;

        var params = can.deparam(window.location.search.substr(1));

        var id = params.id;
        var getOrderShareBagInfo = new SFGetOrderShareBagInfo({
          "shareBagId": id
        });

        can.when(that.initOrderShareBagInfo(id), that.initShareBagCpList(id))
          .always(function(cardBagInfo) {
            that.renderHtml(that.element, that.itemObj);
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
            SFWeixin.shareLuckyMoney(cardBagInfo.title, cardBagInfo.useInstruction, cardBagInfo.bagId);
            that.itemObj.attr({
              cardBagInfo: cardBagInfo
            })
          })
          .fail(function(error) {
            console.error(error);
          });
      },
      initShareBagCpList: function(shareBagId) {
        var that = this;
        var getShareBagCpList = new SFGetShareBagCpList({
          "shareBagId": shareBagId
        });

        return getShareBagCpList.sendRequest()
          .done(function(userCouponInfo) {
            that.itemObj.attr({
              userCouponInfo: userCouponInfo
            })
          })
          .fail(function(error) {
            console.error(error);
          });
      },
      renderHtml: function(element, itemObj) {
        var html = can.view('templates/luckymoney/sf.b2c.mall.luckymoney.share.mustache', itemObj);
        element.html(html);
      }
    });
    new luckymoneyshare('.sf-b2c-mall-luckyMoney-share');

  })