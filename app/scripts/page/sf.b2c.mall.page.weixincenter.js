'use strict';
/**
 * [description 微信登录转发中心， 实现代码解耦]
 */
define(
  [
    'can',
    'zepto',
    'store',
    'sf.b2c.mall.api.user.partnerLogin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, store, SFPartnerLogin, SFFrameworkComm, SFConfig) {

    SFFrameworkComm.register(3);

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        var params = can.deparam(window.location.search.substr(1));
        var code = params.code;
        var redirectUrl = params.redirectUrl;

        var partnerLogin = new SFPartnerLogin({
          "partnerId": "wechat_svm",
          "authResp": "code=" + code
        });

        partnerLogin
          .sendRequest()
          .done(function(loginData) {
            alert(loginData.csrfToken);
            if (loginData.csrfToken) {
              store.set('type', 'WEIXIN');
              store.set('nickname', '海淘会员');
              can.route.attr({
                'tag': 'success',
                'csrfToken': loginData.csrfToken
              });

              window.location.href = redirectUrl || SFConfig.setting.link.index;
            } else {
              window.location.href = SFConfig.setting.link.index;
            }
          })
          .fail(function(error) {
            alert(error);
            //window.location.href = SFConfig.setting.link.index;
          })
      }
    });

    new center('.sf-b2c-mall-weixincenter');
  });
