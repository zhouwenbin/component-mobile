'use strict';

define("sf.b2c.mall.luckymoney.users",
  [
    'can',
    'zepto',
    'sf.b2c.mall.api.coupon.getShareBagCpList'
  ],
  function(can, $, SFGetShareBagCpList) {
    return can.Control.extend({
      itemObj:  new can.Map({
        userCouponInfo: {}
      }),
      init: function(element, options) {
        this.render();
      },
      render: function() {
        var that = this;

        can.when(that.initShareBagCpList(that.options.shareBagId))
          .always(function() {
            //that.renderHtml(that.element, that.itemObj);
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
            });
          })
          .fail(function(error) {
            console.error(error);
          });
      },
      renderHtml: function(element, itemObj) {
        var html =  can.view('templates/luckymoney/sf.b2c.mall.luckymoney.users.mustache', itemObj);
        element.html(html);
      }
    });
  })