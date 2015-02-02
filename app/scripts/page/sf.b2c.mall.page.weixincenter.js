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
    'sf.b2c.mall.framework.comm'
  ],
  function(can, $, store, SFPartnerLogin, SFFrameworkComm) {

    SFFrameworkComm.register(3);

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        var params = can.deparam(window.location.search.substr(1))
        var code = params.code;

        var to = store.get('weixinto');

        var partnerLogin = new SFPartnerLogin({
          "partnerId": "wechat_open",
          "authResp": "code=" + code
        });

        partnerLogin
          .sendRequest()
          .done(function(loginData) {

            if (loginData.csrfToken) {
              store.set('type', 'WEIXIN');
              store.set('nickname', '海淘会员');
              can.route.attr({
                'tag': 'success',
                'csrfToken': loginData.csrfToken
              });

              window.location.href = to || "http://m.sfht.com/index.html";
            } else {
              window.location.href = "http://m.sfht.com/index.html";
            }
          })
          .fail(function(error) {
            console.error(error);
            window.location.href = "http://m.sfht.com/index.html";
          })
      }
    });

    new center('.sf-b2c-mall-weixincenter');
  })
