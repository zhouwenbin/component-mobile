/*
 * author:zhangke
 * description:领取卡券卡包
 */

'use strict';

define('sf.b2c.mall.component.getcoupon', [
    'can',
    'zepto',
    'store',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.receiveCpCode'
  ],

  function(can, $, store, Fastclick, SFFrameworkComm, SFWeixin, SFConfig, SFMessage, SFReceiveCpCode) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();


    var getCoupon =can.Control.extend({
      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        var that = this;

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        };

        $("[role=getCoupon]").click(function(targetElement) {
          var cardId = $(targetElement.target).data('cardId');
          var cardboxId = $(targetElement.target).data('cardboxId');
          if (cardId) {
            can.when(that.receiveCpCodeData(cardId));
          } else {

          }
        });

        return false;
      },

      errorMap: {
        "11000020": "卡券id不存在",
        "11000030": "卡券已作废",
        "11000040": "目前不再卡券发放有效期内",
        "11000050": "卡券已领完",
        "11000100": "您已领过该券"
      },

      receiveCpCodeData: function(cardId) {
        var that = this;
        var receiveCpCodeData = new SFReceiveCpCode({
          'receiveChannel': 'B2C',
          'receiceWay': 'ZTLQ',
          'cardId': cardId
        });
        var receiveCpCodeData = receiveCpCodeData.sendRequest();
        receiveCpCodeData.done(function(userCouponInfo) {
            new SFMessage(null, {
              'tip': '领取成功！',
              'type': 'success'
            });
          })
          .fail(function(error) {
            new SFMessage(null, {
              'tip': that.errorMap[error] || '领取失败',
              'type': 'error'
            });
          });
        return receiveCpCodeData;
      }
    });

    new getCoupon();
  });
