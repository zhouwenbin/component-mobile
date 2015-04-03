'use strict';

define(
  'sf.b2c.mall.page.weixinlogintest',

  [
    'zepto',
    'can',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.weixin'
  ],

  function ($, can, store, SFFrameworkComm, SFReqLoginAuth, SFWeixin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var login = can.Control.extend({


      init:function(){
        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": "wechat_svm",
          "redirectUrl": "http://m.sfht.com/weixincenter.html"
        });

        reqLoginAuth
          .sendRequest()
          .done(function(data) {

            var params = can.deparam(window.location.search.substr(1));
            var gotoUrl = params.from || "index.html";

            store.set('weixinto', gotoUrl);
            window.location.href = data.loginAuthLink;
            return false;
          })
          .fail(function(error) {
            console.error(error);
          })
      }

    });

    new login('body');
  });