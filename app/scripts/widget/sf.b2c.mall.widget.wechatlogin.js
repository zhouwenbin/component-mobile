'use strict';

define(
  'sf.b2c.mall.widget.wechatlogin',
  [
    'zepto',
    'can',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.user.reqLoginAuth'
  ],

  function($, can, SFFrameworkComm, SFConfig,
           SFReqLoginAuth) {
    return can.Control.extend({
      link: SFConfig.setting.link,
      init: function() {
      },

      login: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.getWeChatCode("redirectUrl=" + redirectUrl);
      },

      tmplLogin: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.getWeChatCode("tmpl=true&redirectUrl=" + redirectUrl);
      },

      getWeChatCode: function(redirectUrl) {
        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": "wechat_svm",
          "redirectUrl": "http://m.sfht.com/weixincenter.html?" + redirectUrl
        });

        reqLoginAuth
          .sendRequest()
          .done(function(data) {
            //alert(data.loginAuthLink);
            window.location.href = data.loginAuthLink;
          })
          .fail(function(error) {
            console.error(error);
          });
      }
    });
  })