'use strict';

define("sf.b2c.mall.taiwantraveller.getgift", [
    'can',
    'zepto',
    'sf.b2c.mall.api.coupon.hasReceived',
    'sf.weixin',
    'sf.b2c.mall.api.coupon.receiveCoupon'
  ],
  function(can, $, SFHasReceived, SFWeixin, SFReceiveCoupon) {

    return can.Control.extend({

      init: function(element, options) {
        this.render(element);
      },

      render: function(element) {
        var that = this;

        var receiveCoupon = new SFReceiveCoupon({
          "type": "CARD",
          "bagId": this.options.bagid,
          "receiveChannel": 'B2C',
          "receiveWay": 'ZTLQ'
        });

        receiveCoupon
          .sendRequest()
          .done(function(data) {
            that.renderHtml(element, {});
          })
          .fail(function(error) {
            // 已经领过了
            if (error === 11000100) {
              that.renderHtml(element, {});
            } else {
              console.error(error);
            }
          })
      },

      renderHtml: function(element, data) {
        var html = can.view('templates/taiwantraveller/sf.b2c.mall.taiwantraveller.getgift.mustache', data);
        element.html(html);
      },

      "#simcard click": function() {
        window.location.href = "http://m.sfht.com/taiwantravellercard.html";
      },

      "#foodeat click": function() {
        window.location.href = "http://m.sfht.com/taiwantravellerfoodeat.html";
      },

      "#share click": function() {

      }
    });
  })