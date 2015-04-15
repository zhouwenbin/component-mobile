'use strict';

define(
  'sf.b2c.mall.widget.login', [
    'zepto',
    'can',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.user.reqLoginAuth'
  ],

  function($, can,store, SFFrameworkComm, SFConfig,
    SFReqLoginAuth) {
    return can.Control.extend({
      link: SFConfig.setting.link,
      init: function() {},

      //微信登录
      login: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.processReqLoginAuth("tag=wechat_svm&redirectUrl=" + redirectUrl, "wechat_svm");
      },

      //微信登陆
      tmplLogin: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.processReqLoginAuth("tag=wechat_svm&tmpl=true&redirectUrl=" + redirectUrl, "wechat_svm");
      },

      alipayLogin: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.processReqLoginAuth("tag=alipay_qklg&redirectUrl=" + redirectUrl, "alipay_qklg");
      },

      processReqLoginAuth: function(redirectUrl, partnerId) {
        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": partnerId,
          "redirectUrl": "http://m.sfht.com/logincenter.html?" + redirectUrl
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