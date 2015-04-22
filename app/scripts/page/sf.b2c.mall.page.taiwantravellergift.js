'use strict';

define(
  'sf.b2c.mall.page.taiwantravellergift', [
    'zepto',
    'can',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.weixin',
    'sf.b2c.mall.taiwantraveller.getgift',
    'sf.b2c.mall.widget.login'
  ],

  function($, can, store, SFFrameworkComm, SFReqLoginAuth, SFWeixin, SFTaiwantravellerGetGift, SFWeChatLogin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var gift = can.Control.extend({
      init: function(element) {
        var params = can.deparam(window.location.search.substr(1));
        var bagid = params.bagid;

        var taiwantravellerGetGift = new SFTaiwantravellerGetGift(element, {
          "bagid": bagid
        });
      }

    });

    new gift('.haitao-b2c-h5-taiwan-traveller-gift');
  });