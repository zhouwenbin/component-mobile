//绑定账号js
'use strict'

define(
  'sf.b2c.mall.component.bindaccount', [
    'zepto',
    'can',
    'store',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.api.user.partnerBind'
  ],
  function($, can, store, Fastclick, SFConfig, SFFn, SFPartnerBind) {

    Fastclick.attach(document.body);

    var DEFAULT_BIND_ERROR_MAP = {
      '1000350': '验证临时token失败,请重新登录',
      '1000020': '手机号已存在，<a href="login.html">立即登录</a>',
      '1000360': '第三方账户已绑定海淘账户'
    }

    var ERROR_NO_INPUT_USERNAME = '请输入您的常用手机号';
    var ERROR_INPUT_USERNAME = '手机号输入有误，请重新输入';


    return can.Control.extend({

      init: function() {
        var params = can.deparam(window.location.search.substr(1));
        this.data = new can.Map({
          username: null
        });

        this.render(this.data);

      },

      render: function(data) {
        var template = can.view.mustache(this.bindAccountTemplate());
        this.element.append(template(data));
      },

      bindAccountTemplate: function() {
        return '<section class="login">' +
          '<form action="">' +
          '<ol>' +
          '<li>' +
          '<input type="text" class="input" id="user-name" placeholder="手机号／邮箱" can-value="username"/>' +
          '<span class="text-error" id="username-error-tips" style="display:none"></span>' +
          '</li>' +
          '<li><button class="btn btn-success btn-big" id="bindaccount">确定</button></li>' +
          '</ol>' +
          '</form>' +
          '</section>';
      },
      '#bindaccount click': function(element, event) {
        event && event.preventDefault();
        var telNum = this.data.attr('username');
        var isTelNum = /^1\d{10}$/.test(telNum);
        if (!telNum) {
          $('#username-error-tips').text(ERROR_NO_INPUT_USERNAME).show();
          return false;
        } else if (!isTelNum) {
          $('#username-error-tips').text(ERROR_INPUT_USERNAME).show();
          return false;
        }

        var partnerBind = new SFPartnerBind({
          'tempToken': store.get('tempToken'),
          'type': 'MOBILE',
          'accountId': telNum
        });
        partnerBind.sendRequest()
          .done(function(data) {
            store.set('csrfToken', data.csrfToken);
            store.remove('tempToken');
            var params = can.deparam(window.location.search.substr(1));
            setTimeout(function() {
              window.location.href = params.from || "index.html";
            }, 2000);
          }).fail(function(errorCode) {
            if (_.isNumber(errorCode)) {
                var defaultText = '绑定失败';
                var errorText = DEFAULT_BIND_ERROR_MAP[errorCode.toString()] || defaultText;
                if (errorCode === 1000020) {
                  $('#username-error-tips').html(errorText).show();
                } else {
                  $('#username-error-tips').html(errorText).show();
                }
              }
          })

      }
    });
  })