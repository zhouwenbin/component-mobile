'use strict';

define(
  'sf.b2c.mall.page.taiwantravellergift', [
    'zepto',
    'can',
    'store',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.weixin',
    'sf.b2c.mall.taiwantraveller.getgift',
    'sf.b2c.mall.widget.login'
  ],

  function($, can, store, Fastclick, SFFrameworkComm, SFReqLoginAuth, SFWeixin, SFTaiwantravellerGetGift, SFWeChatLogin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    Fastclick.attach(document.body);

    var gift = can.Control.extend({
      init: function(element) {
        var params = can.deparam(window.location.search.substr(1));
        var bagid = params.bagid;

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
           window.location.href = 'http://m.sfht.com/login.html?from=' + escape(window.location.href);
          return false;
        }

        var taiwantravellerGetGift = new SFTaiwantravellerGetGift(element, {
          "bagid": bagid
        });
      }

    });

    new gift('.haitao-b2c-h5-taiwan-traveller-gift');
  });