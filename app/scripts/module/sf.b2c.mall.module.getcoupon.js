/*
 * author:zhangke
 * description:领取卡券卡包
 */

'use strict';

define('sf.b2c.mall.module.getcoupon', [
    'can',
    'zepto',
    'store',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.receiveCoupon'
  ],

  function(can, $, store, Fastclick, SFFrameworkComm, SFConfig, SFMessage, SFReceiveCoupon) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);


    var getCoupon =can.Control.extend({
      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        var that = this;

        $("[role=getCoupon]").click(function(targetElement) {
          var params = {
            bagId: $(targetElement.target).data('bagId'),
            type: $(targetElement.target).data('type')
          }
          var needSms = $(targetElement.target).data('needSms');
          var smsCon = $(targetElement.target).data('smsCon');
          if (needSms) {
            params.needSms = needSms;
          }
          if (smsCon) {
            params.smsCon = smsCon;
          }

          that.receiveCpCodeData(params);
        });

        return false;
      },

      errorMap: {
        "11000020": "卡券不存在",
        "11000030": "卡券已作废",
        "11000050": "卡券已领完",
        "11000100": "您已领过该券",
        "11000130": "卡包不存在",
        "11000140": "卡包已作废"
      },

      receiveCpCodeData: function(params) {
        params.receiveChannel = 'B2C';
        params.receiceWay = 'ZTLQ';
        var that = this;
        var receiveCouponData = new SFReceiveCoupon(params);
        return receiveCouponData.sendRequest()
          .done(function(userCouponInfo) {
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
      }
    });

    new getCoupon();
  });
