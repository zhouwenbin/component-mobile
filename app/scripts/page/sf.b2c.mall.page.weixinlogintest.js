'use strict';

define(
  'sf.b2c.mall.page.weixinlogintest',
  [
    'zepto',
    'can',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.weixin',
    'sf.b2c.mall.widget.wechatlogin'
  ],

  function ($, can, store, SFFrameworkComm, SFReqLoginAuth, SFWeixin, SFWeChatLogin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var login = can.Control.extend({
      init:function(){
        var params = can.deparam(window.location.search.substr(1));
        var gotoUrl = params.from;
        window.location.href = 'http://m.sfht.com/register.html?from=' + escape(gotoUrl);

        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": "wechat_svm",
          "redirectUrl": "http://m.sfht.com/logincenter.html"
        });
      }

    });

    new login('body');
  });