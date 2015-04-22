'use strict';

define("sf.b2c.mall.taiwantraveller.getgift", [
    'can',
    'zepto',
    'sf.b2c.mall.api.coupon.hasReceived',
    'sf.b2c.mall.api.user.getUserCode',
    'sf.b2c.mall.api.coupon.receiveCoupon'
  ],
  function(can, $, SFHasReceived, SFGetUserCode, SFReceiveCoupon) {

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
            debugger;
            var html = can.view('templates/taiwantraveller/sf.b2c.mall.taiwantraveller.getgift.mustache', data);
            element.html(html);
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      ".simcard click": function(){
        var SFGetUserCode = new SFGetUserCode({"codeType": ""});
      },

      ".foodeat click": function(){

      },

      ".share click": function(){

      }
    });
  })