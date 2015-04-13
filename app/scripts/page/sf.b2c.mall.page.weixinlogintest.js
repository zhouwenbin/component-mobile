'use strict';

define(
  'sf.b2c.mall.page.weixinlogintest',
<<<<<<< HEAD

=======
>>>>>>> 6544889a84edabbf818c24d64d22efa1a14e70c7
  [
    'zepto',
    'can',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.reqLoginAuth',
<<<<<<< HEAD
    'sf.weixin'
  ],

  function ($, can, store, SFFrameworkComm, SFReqLoginAuth, SFWeixin) {
=======
    'sf.weixin',
    'sf.b2c.mall.widget.wechatlogin'
  ],

  function ($, can, store, SFFrameworkComm, SFReqLoginAuth, SFWeixin, SFWeChatLogin) {
>>>>>>> 6544889a84edabbf818c24d64d22efa1a14e70c7

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var login = can.Control.extend({
<<<<<<< HEAD


      init:function(){
=======
      init:function(){
        var params = can.deparam(window.location.search.substr(1));
        var gotoUrl = params.from;
        window.location.href = 'http://m.sfht.com/register.html?from=' + escape(gotoUrl);

>>>>>>> 6544889a84edabbf818c24d64d22efa1a14e70c7
        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": "wechat_svm",
          "redirectUrl": "http://m.sfht.com/weixincenter.html"
        });
<<<<<<< HEAD

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
=======
>>>>>>> 6544889a84edabbf818c24d64d22efa1a14e70c7
      }

    });

    new login('body');
  });