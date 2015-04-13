define(
  'sf.b2c.mall.module.header', [
    'can',
    'zepto',
    'store',
    'underscore',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm'
  ],

  function(can, $,store, _, Fastclick, SFConfig, SFFrameworkComm,SFPartnerLogin) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var header = can.Control.extend({

      init: function() {
        this.render();
      },

      render: function() {
        //@note 判断是否登录，登录不做任何操作，没有登录解析url传回服务端
        var authResp = can.deparam(window.location.search.substr(1));
        // var arr = [];
        // for (var resp in authResp) {
        //   arr.push(resp + '=' + decodeURIComponent(authResp[resp]));
        // }
        var partnerLogin = new SFPartnerLogin({
          'partnerId': store.get('alipay-or-weixin'),
          // 'authResp': arr.join('&')
          'authResp': decodeURIComponent($.param(authResp))
        });
        partnerLogin.sendRequest()
          .done(function(data) {
            if (data.tempToken) {
              store.set('tempToken', data.tempToken);
              window.location.href = 'bindaccount.html';
            } else {
              store.set('csrfToken', data.csrfToken);
            }
          }).fail(function(errorCode) {})

      }

    });

    new header();

  });