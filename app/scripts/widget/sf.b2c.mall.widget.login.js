'use strict';

define(
  'sf.b2c.mall.widget.login', [
    'zepto',
    'can',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.api.user.reqLoginAuth'
  ],

  function($, can,store, SFFrameworkComm, SFConfig,
    SFUtil, SFReqLoginAuth) {
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
        this.processReqLoginAuth("tag=wechat_svm&tmpl=true&redirectUrl=" + encodeURIComponent(redirectUrl), "wechat_svm");
      },

      alipayLogin: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.processReqLoginAuth("tag=alipay_qklg&redirectUrl=" + encodeURIComponent(redirectUrl), "alipay_qklg");
      },

      alipayTmplLogin: function(redirectUrl) {
        redirectUrl = redirectUrl || window.location.href;
        this.processReqLoginAuth("tag=alipay_qklg&tmpl=true&redirectUrl=" + encodeURIComponent(redirectUrl), "alipay_qklg");
      },

      processReqLoginAuth: function(redirectUrl, partnerId) {
        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": partnerId,
          "redirectUrl": "http://m.sfht.com/logincenter.html?" + redirectUrl
        });
        reqLoginAuth
          .sendRequest()
          .done(function(data) {
            window.location.href = data.loginAuthLink;

            //代码打点
            SFUtil.dotCode();
          })
          .fail(function(error) {
            console.error(error);
          });
      }
    });
  })