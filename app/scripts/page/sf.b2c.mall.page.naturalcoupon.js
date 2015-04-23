'use strict';

define("sf.b2c.mall.page.naturalcoupon", [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.b2c.mall.api.coupon.receiveCoupon'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFWeixin, SFReceiveCoupon) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    Fastclick.attach(document.body);

    var naturalcoupon = can.Control.extend({

      init: function(element, options) {
        this.render(element);
      },

      render: function(element) {
        var that = this;

        var params = can.deparam(window.location.search.substr(1));
        var bagid = params.bagid;

        var receiveCoupon = new SFReceiveCoupon({
          "type": "CARD",//"GIFTBAG",
          "bagId": bagid,
          "receiveChannel": 'B2C',
          "receiveWay": 'ZTLQ'
        });

        receiveCoupon
          .sendRequest()
          .done(function(data) {
            debugger;
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

      /** 渲染 */
      renderHtml: function(element, data) {
        var html = can.view('templates/natural/sf.b2c.mall.natural.coupon.mustache', data);
        element.html(html);
      }
    });

    new naturalcoupon('.haitao-b2c-h5-natural-coupon');

  })