'use strict';
/**
 * [description 微信登录转发中心， 实现代码解耦]
 */
define(
	'sf.b2c.mall.page.logincenter',
  [
    'can',
    'zepto',
    'store',
    'sf.b2c.mall.api.user.partnerLogin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.module.header'
  ],
  function(can, $, store, SFPartnerLogin, SFFrameworkComm, SFConfig,SFHeader) {

    SFFrameworkComm.register(3);

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        var params = can.deparam(window.location.search.substr(1));
        var tag = params.tag;
        var redirectUrl = params.redirectUrl;

        var tmpl = params.tmpl;;
        var authResp;
        var type;
        if (tag == "wechat_svm") {
          type =  'WEIXIN';
          authResp = "code=" + params.code;
        } else if (tag == "alipay_qklg"){
          type =  'ALIPAY';

          delete params.tag;
          delete params.redirectUrl;

          authResp = window.decodeURIComponent($.param(params));
        }

        var partnerLogin = new SFPartnerLogin({
          "partnerId": tag,
          "authResp": authResp
        });

        partnerLogin
          .sendRequest()
          .done(function(loginData) {
            //alert(loginData.csrfToken);

            if (loginData.csrfToken) {
              store.set('type', type);
              store.set('nickname', '海淘会员');
              store.remove('tempToken');
              store.remove('tempTokenExpire');

              // 登录之后需要将csrfToken记录在localStorage中作为登录态度进行保存
              store.set('csrfToken', loginData.csrfToken);

              // ?不懂
              can.route.attr({
                'tag': 'success',
                'csrfToken': loginData.csrfToken
              });

              window.location.href = redirectUrl || SFConfig.setting.link.index;

            } else if (tmpl && loginData.tempToken){  //tmpl 为true时,tempToken存在但不进行账号绑定

              var nowDate = new Date();
              nowDate.setDate(nowDate.getDate()+1);
              store.set('tempTokenExpire', nowDate.getTime());
              store.set('type', type);
              store.set('nickname', '海淘会员');
              store.set('tempToken', loginData.tempToken);
              window.location.href = redirectUrl || SFConfig.setting.link.index;

            } else if(loginData.tempToken) {   // 处理账号绑定

              store.set('tempToken', loginData.tempToken);
              //处理微信账号绑定
              var header = new SFHeader();

            } else {

              window.location.href = SFConfig.setting.link.index;

            }
          })
          .fail(function(error) {
            //alert(error);
            window.location.href = SFConfig.setting.link.index;
          })
      }
    });

    new center('.sf-b2c-mall-weixincenter');
  });
