//绑定账号js
'use strict'

define(
  'sf.b2c.mall.component.bindaccount', [
    'zepto',
    'can',
    'store',
    'fastclick',
    'md5',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.api.user.partnerBind',
    'sf.b2c.mall.api.user.partnerBindByUPswd',
    'sf.b2c.mall.api.user.checkUserExist',
    'sf.b2c.mall.api.user.downSmsCode'
  ],
  function($, can, store, Fastclick, md5, SFBizConf, SFFn, SFPartnerBind, SFPartnerBindByUPswd, SFCheckUserExist, SFApiUserDownSmsCode) {

    Fastclick.attach(document.body);

    var ERROR_NO_INPUT_USERNAME = '请输入您的常用手机号';
    var ERROR_INPUT_USERNAME = '手机号输入有误，请重新输入';
    var ERROR_NO_INPUT_USERPWD = '请输入您的密码';
    var ERROR_NO_MOBILE_CHECKCODE = '请输入验证码';
    var ERROR_MOBILE_CHECKCODE = '短信验证码输入有误，请重新输入';

    var DEFAULT_DOWN_SMS_ERROR_MAP = {
      '1000010': '未找到手机用户',
      '1000020': '手机号已存在，<a href="i.login.html">立即登录</a>',
      '1000070': '参数错误',
      '1000230': '手机号错误，请输入正确的手机号',
      '1000270': '短信请求太过频繁,请稍后重试',
      '1000290': '短信请求太多'
    }

    var DEFAULT_BIND_ERROR_MAP = {
      '1000020': '手机账号已存在，<a href="login.html">立即登录</a>',
      '1000070': '参数错误',
      '1000350': '验证临时token失败,请重新登录',
      '1000360': '第三方账户已绑定海淘账户',
      '1000380': '已经绑定了同类的第三方账户'
    };

    return can.Control.extend({

      init: function() {

        this.component = {};
        this.component.sms = new SFApiUserDownSmsCode();
        this.component.partnerBind = new SFPartnerBind();
        this.component.partnerBindByUPswd = new SFPartnerBindByUPswd();

        this.data = new can.Map({
          username: null,
          isBindMobile: false
        });

        this.render(this.data);

        setTimeout(function() {
          this.checkusername()
        }, 500);
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
          '<h2 class="text-h2">还差一步，完善信息以便与您联系。</h2>' +
          '</li>' +
          '<li>' +
          '<input type="text" class="input" id="user-name" placeholder="手机号" can-value="username"/>' +
          '<span class="text-error" id="username-error-tips" style="display:none"></span>' +
          '</li>' +
          '{{#isBindMobile}}' +
          '<li class="login-r3"><div class="clearfix">' +
          '<button class="btn btn-normal success fr" id="mobile-code-btn">发送验证码</button>' +
          '<div class="login-r3c2">' +
          '<input type="text" class="input" id="input-mobile-code" placeholder="输入验证码">' +
          '</div></div>' +
          '<span class="text-error" id="mobile-code-error" style="display:none">短信验证码输入有误，请重新输入</span>' +
          '</li>' +
          '{{/isBindMobile}}' +
          '{{#showPassword}}' +
          '<li>' +
          '<input type="password" class="input" id="user-pwd" placeholder="请输入顺丰海淘登录密码" />' +
          '<span id="userpwd-error-tips" style="display:none" class="text-error"></span>' +
          '</li>' +
          '{{/showPassword}}' +
          '<li><button class="btn btn-success btn-big" id="bindaccount">确定</button></li>' +
          '</ol>' +
          '</form>' +
          '</section>';
      },
      checkMobile: function(mobile) {
        if (!mobile) {
          $('#username-error-tips').text(ERROR_NO_INPUT_USERNAME).show();
          return false;
        } else if (!/^1[0-9]{10}$/.test(mobile)) {
          $('#username-error-tips').text(ERROR_INPUT_USERNAME).show();
          return false;
        } else {
          return true;
        }
      },

      checkPwd: function(pwd) {
        if (!pwd) {
          $('#userpwd-error-tips').text(ERROR_NO_INPUT_USERPWD).show();
          return false;
        } else {
          return true;
        }
      },

      checkCode: function(code) {
        if (!code) {
          $('#mobile-code-error').text(ERROR_NO_MOBILE_CHECKCODE).show();
          return false;
        } else if (!/^[0-9]{6}$/.test(code)) {
          $('#mobile-code-error').text(ERROR_MOBILE_CHECKCODE).show();
          return false;
        } else {
          return true;
        }
      },

      countdown: function(time) {
        var that = this;
        setTimeout(function() {
          if (time > 0) {
            time--;
            that.element.find('#mobile-code-btn').text(time + '秒后可重新发送').removeClass('success');
            that.element.find('#mobile-code-btn').addClass('disable');
            that.countdown.call(that, time);
          } else {
            that.element.find('#mobile-code-btn').text('发送短信验证码').removeClass('disable');
            that.element.find('#mobile-code-btn').addClass('success');
          }
        }, 1000);
      },

      '#mobile-code-btn click': function($element, event) {
        event && event.preventDefault();

        var mobile = $('#user-name').val();
        if (this.checkMobile(mobile)) {
          // 发起请求发送号码

          var that = this;
          this.component.sms.setData({
            mobile: mobile,
            askType: 'BINDING'
          });

          this.component.sms.sendRequest()
            .done(function(data) {
              // @todo 开始倒计时
              that.countdown.call(that, 60);
              $('#mobile-code-error').hide();
            })
            .fail(function(errorCode) {
              if (_.isNumber(errorCode)) {
                var defaultText = '短信请求发送失败';
                var errorText = DEFAULT_DOWN_SMS_ERROR_MAP[errorCode.toString()] || defaultText;
                if (errorCode === 1000020) {
                  $('#mobile-code-error').html(errorText).show();
                } else {
                  $('#mobile-code-error').html(errorText).show();
                }
              }
            })
        }
      },

      '#user-name blur': function($element, event) {
        var mobile = $element.val();
        this.checkMobile(mobile);
      },

      '#user-name focus': function($element, event) {
        $('#username-error-tips').hide();
      },

      '#user-pwd blur': function($element, event) {
        var pwd = $element.val();
        this.checkPwd(pwd);
      },

      '#user-pwd focus': function($element, event) {
        $('#userpwd-error-tips').hide();
        $('#username-error-tips').hide();
      },

      checkusername: function() {
        alert("username");
        $('#username-error-tips').hide();

        var that = this;
        var mobile = $('#user-name').val();
        var errorValueMap = {
          "wechat_open": "微信",
          "alipay_qklg": "支付宝"
        };

        if (mobile.length == 11) {
          alert("mobile:" + mobile);
          var checkUserExist = new SFCheckUserExist({
            accountId: mobile,
            type: 'MOBILE',
            tempToken: store.get('tempToken')
          });
          checkUserExist.sendRequest()
            .done(function(data) {
              if (data.value == true) {
                that.data.attr('isBindMobile', false);
                that.data.attr('showPassword', true);
              } else {
                that.data.attr('isBindMobile', false);
                that.data.attr('showPassword', false);
              }
            })
            .fail(function(errorCode) {
              if (errorCode == 1000340) {
                that.data.attr('isBindMobile', true);
                that.data.attr('showPassword', false);
              } else if (errorCode == 1000380) {
                var params = can.deparam(window.location.search.substr(1));
                $('#username-error-tips').html('已经绑定了同类的第三方账户。').show();
              }
            })
        } else {
          that.data.attr('isBindMobile', false);
          that.data.attr('showPassword', false);
        }
      },

      //note 输完11位手机号码后验证是否存在，存在显示手机验证码
      // '#user-name keyup': function() {

      // },

      '#input-mobile-code focus': function($element, event) {
        $('#mobile-code-error').hide();
        $('#username-error-tips').hide();
      },

      '#input-mobile-code blur': function($element, event) {
        var code = $('#input-mobile-code').val();
        this.checkCode(code);
      },

      //绑定账号
      partnerBind: function() {
        this.component.partnerBind.sendRequest()
          .done(function(data) {
            store.set('csrfToken', data.csrfToken);
            store.remove('tempToken');
            var params = can.deparam(window.location.search.substr(1));
            var redirectUrl = window.decodeURIComponent(params.redirectUrl);

            window.location.href = redirectUrl || SFBizConf.setting.link.index;
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
      },

      //绑定账号
      partnerBindByUPswd: function() {
        this.component.partnerBindByUPswd.sendRequest()
          .done(function(data) {
            store.set('csrfToken', data.csrfToken);
            store.remove('tempToken');

            var params = can.deparam(window.location.search.substr(1));
            var redirectUrl = window.decodeURIComponent(params.redirectUrl);
            window.location.href = redirectUrl || SFBizConf.setting.link.index;

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
      },

      '#bindaccount click': function(element, event) {
        event && event.preventDefault();

        // 总体校验
        var mobile = $('#user-name').val();

        if (!this.checkMobile(mobile)) {
          return false;
        }

        // 执行分支
        if (this.data.attr('isBindMobile')) {
          // 验证码校验
          var code = $('#input-mobile-code').val();

          if (!this.checkCode(code)) {
            return false;
          }

          // 验证码绑定
          if (this.checkCode(code)) {
            this.component.partnerBind.setData({
              'tempToken': store.get('tempToken'),
              'type': 'MOBILE',
              'accountId': mobile,
              'smsCode': code
            });
            this.partnerBind();
          }
        } else {

          // 密码绑定
          if (this.data.attr('showPassword')) {

            // 校验密码
            var pwd = $('#user-pwd').val();

            if (!this.checkPwd(pwd)) {
              return false;
            }

            // 填充数据
            this.component.partnerBindByUPswd.setData({
              'tempToken': store.get('tempToken'),
              'type': 'MOBILE',
              'accountId': mobile,
              'passWord': md5(pwd + SFBizConf.setting.md5_key)
            });

            // 执行请求
            this.partnerBindByUPswd();

          } else {
            // 填充数据 直接绑定
            this.component.partnerBind.setData({
              'tempToken': store.get('tempToken'),
              'type': 'MOBILE',
              'accountId': mobile
            });
            this.partnerBind();
          }

        }
      }

    });
  })