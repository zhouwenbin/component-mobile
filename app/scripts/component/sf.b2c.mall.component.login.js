'use strict';

define('sf.b2c.mall.component.login', [
    'zepto',
    'can',
    'md5',
    'store',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.user.webLogin',
    'sf.b2c.mall.api.user.needVfCode',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.widget.wechatlogin',
    'sf.b2c.mall.api.user.checkUserExist' //@noto 检查第三方账号绑定的手机号是否有登录密码
  ],

  function($, can, md5, store, Fastclick,
           SFConfig, SFLogin, SFNeedVfCode, SFReqLoginAuth, SFFrameworkComm,
           SFFn, SFWeChatLogin,SFCheckUserExist) {

    SFFrameworkComm.register(3);

    Fastclick.attach(document.body);

    var DEFAULT_CAPTCHA_LINK = 'http://checkcode.sfht.com/captcha/';
    var DEFAULT_CAPTCHA_ID = 'haitaob2c';
    var DEFAULT_CAPTCHA_HASH = '5f602a27181573d36e6c9d773ce70977';

    var ERROR_NO_INPUT_USERNAME = '请输入顺丰海淘帐号';
    var ERROR_INPUT_USERNAME = '账户有误，请重新输入';
    var ERROR_NO_INPUT_PWD = '请输入密码';
    var ERROR_INPUT_PWD = '密码有误，请重新输入';
    var ERROR_NO_INPUT_VERCODE = '请输入验证码';
    var ERROR_INPUT_VERCODE = '您的验证码输入有误，请重新输入';
    var ERROR_NO_PASSWORD = '账户未设置密码，点此<a href="setpassword.html">设置密码</a>';

    return can.Control.extend({

      helpers: {
        ismobile: function(mobile, options) {
          if (mobile() == 'mobile') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        isWeChat: function(options) {
          if (SFFn.isMobile.WeChat()) {
            return options.fn(options.contexts || this);
          }else{
            return options.inverse(options.contexts || this);
          }
        }
      },

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.component = {};
        this.component.login = new SFLogin();
        this.component.needVfCode = new SFNeedVfCode();

        var params = can.deparam(window.location.search.substr(1));

        this.data = new can.Map({
          username: null,
          password: null,
          verifiedCode: null,
          isNeedVerifiedCode: false,
          verifiedCodeUrl: null,
          autologin: false,
          sessionId: null,
          platform: params.platform || (SFFn.isMobile.any() ? 'mobile' : null)
        })

        this.render(this.data);
        this.getVerifiedCode();

        var that = this;
      },

      '#toRegist click': function (element, event) {
        var params = can.deparam(window.location.search.substr(1));
        var gotoUrl = params.from;
        window.location.href = 'http://m.sfht.com/register.html?from=' + escape(gotoUrl);
      },

      /**
       * [weixinLogin 微信登陆]
       * @return {[type]} [description]
       */
      '.weixinlogin click': function(element, event) {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var gotoUrl = params.from || "index.html";

        var wechatLogin = new SFWeChatLogin();
        wechatLogin.login(gotoUrl);
      },
      //@note 支付宝登录
      '.alipaylogin click':function(element, event){
        var reqLoginAuth = new SFReqLoginAuth({
          "partnerId": "alipay_qklg",
          "redirectUrl": "http://m.sfht.com/index.html"
        });

        reqLoginAuth
          .sendRequest()
          .done(function(data) {
            store.set('alipay-or-weixin','alipay_qklg');
            window.location.href = data.loginAuthLink;           
            return false;
          })
          .fail(function(error) {
            console.error(error);
          })
      },
      /**
       * @description 渲染页面
       * @param  {can.Map} data 输入的观察者对象
       */
      render: function(data) {
        var html = can.view('templates/component/sf.b2c.mall.component.login.mustache', data, this.helpers);
        this.element.append(html);
      },

      '#verified-code-btn click': function () {
        this.getVerifiedCode();
      },

      /**
       * @description 验证码更换
       * @param  {String}
       * @return {String}
       */
      getVerifiedCode: function() {
        var sessionId = md5(Date().valueOf() + window.parseInt(Math.random() * 10000));
        this.data.attr('sessionId', sessionId);
        var verifiedCodeUrl = DEFAULT_CAPTCHA_LINK + '?' + can.param({
          id: DEFAULT_CAPTCHA_ID,
          hash: DEFAULT_CAPTCHA_HASH,
          sessionID: sessionId
        });

        this.data.attr('verifiedCodeUrl', verifiedCodeUrl);
      },

      /**
       * @description 用户名验证
       * @param  {String}
       * @return {String}
       */
      checkUserName: function(username) {
        var that = this;
        var username = can.$.trim(username);
        var isTelNum = /^1\d{10}$/.test(username);
        var isEmail = /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(username);
        //@note 手机号码输完11位时，验证该账号是否有密码
        if (isTelNum) {
          var checkUserExist = new SFCheckUserExist({
            'accountId':username,
            'type':'MOBILE'
          });
          checkUserExist.sendRequest()
            .fail(function(errorCode){
              if (errorCode == 1000340) {
                that.element.find('#username-error-tips').html(ERROR_NO_PASSWORD).show();
                return false;
              };
            })
        };
        if (!username) {
          this.element.find('#username-error-tips').text(ERROR_NO_INPUT_USERNAME).show();
          return false;
        } else if (username.length > 30) {
          this.element.find('#username-error-tips').text(ERROR_INPUT_USERNAME).show();
          return false;
        } else if (!isTelNum && !isEmail) {
          this.element.find('#username-error-tips').text(ERROR_INPUT_USERNAME).show();
          return false;
        } else {
          return true;
        }
      },
      /**
       * @description 密码验证
       * @param  {String}
       * @return {String}
       */
      checkPwd: function(password) {
        var password = can.$.trim(password);
        var isPwd = /^[0-9a-zA-Z~!@#\$%\^&\*\(\)_+=-\|~`,./<>\[\]\{\}]{6,18}$/.test(password)
        if (!password) {
          this.element.find('#pwd-error-tips').text(ERROR_NO_INPUT_PWD).show();
          return false;
        } else if (password.length > 30 || !isPwd) {
          this.element.find('#pwd-error-tips').text(ERROR_INPUT_PWD).show();
          return false;
        } else {
          return true;
        }
      },
      /**
       * @description 验证码验证
       * @param  {String}
       * @return {String}
       */
      checkVerCode: function(code) {
        var code = can.$.trim(code);
        var isCode = /^\d{6}$/.test(code);
        if (!code) {
          this.element.find('#code-error-tips').text(ERROR_NO_INPUT_VERCODE).show();
          return false;
        } else if (code.length > 30 || !isCode) {
          this.element.find('#code-error-tips').text(ERROR_INPUT_VERCODE).show();
          return false;
        } else {
          return true;
        }
      },
      /**
       * @description 是否需要显示验证码
       * @param  {String}
       * @return {String}
       */
      isNeedVerCode: function() {
        var username = this.data.attr('username');
        var that = this;
        this.component.needVfCode.setData({
          accountId: username
        });
        this.component.needVfCode.sendRequest()
          .done(function(data) {
            if (data.value == true) {
              that.data.attr('isNeedVerifiedCode', true);
              $('#verified-code-btn').click(function() {
                that.getVerifiedCode();
              })
            } else {
              that.data.attr('isNeedVerifiedCode', false);
            }
          })
          .fail(function(error) {
            //console.error(error);
          })
      },
      /**
       * @description 通过正则表达式检查账号类型
       * @param  {String} account 账号
       * @return {String} 返回MAIL或者MOBILE
       */
      checkTypeOfAccount: function(account) {
        var account = can.$.trim(account);

        // 检查账号的类型返回MOBILE或者MAIL
        var isTelNum = /^1\d{10}$/.test(account);
        var isEmail = /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(account);
        if (isTelNum) {
          return 'MOBILE';
        }
        if (isEmail) {
          return 'MAIL';
        }
      },

      /**
       * @description 获得焦点之后对账号输入内容做检查
       * @param  {dom} element jquery dom对象
       * @param  {event} event event对象
       */
      '#user-name keyup': function(element, event) {
        event && event.preventDefault();
        this.element.find('#username-error-tips').hide();
      },

      /**
       * @description 获得焦点之后对密码输入内容做检查
       * @param  {dom} element jquery dom对象
       * @param  {event} event event对象
       */
      '#user-pwd keyup': function(element, event) {
        event && event.preventDefault();
        this.element.find('#pwd-error-tips').hide();
      },
      /**
       * @description 失去焦点之后对账号输入内容做检查
       * @param  {dom} element jquery dom对象
       * @param  {event} event event对象
       */
      '#user-name blur': function(element, event) {
        event && event.preventDefault();

        var username = this.data.attr('username');

        this.checkUserName.call(this, username);
        this.isNeedVerCode();
      },

      /**
       * @description 失去焦点之后对密码输入内容做检查
       * @param  {dom} element jquery dom对象
       * @param  {event} event event对象
       */
      '#user-pwd blur': function(element, event) {
        event && event.preventDefault();
        var password = this.data.attr('password');
        this.checkPwd.call(this, password);

      },

      '#user-name focus': function(element, event) {
        can.$('#username-error-tips').hide();
      },

      '#user-pwd focus': function(element, event) {
        can.$('#pwd-error-tips').hide();
      },

      '#verified-code focus': function(element, event) {
        can.$('#code-error-tips').hide();
      },

      sendRequest: function(element) {

        var that = this;
        // @todo 发起登录请求

        document.domain = window.location.host;
        this.component.login.sendRequest()
          .done(function(data) {
            if (data.userId) {
              that.data.attr('autologin');

              store.set('type', that.checkTypeOfAccount(that.data.attr('username')));
              store.set('nickname', that.data.attr('username'));

              // deparam过程 -- 从url中获取需要请求的sku参数
              var params = can.deparam(window.location.search.substr(1));
              setTimeout(function() {
                window.location.href = params.from || "index.html";
              }, 2000);
            }
          })
          .fail(function(error) {

            element.text("登录");

            var map = {
              '-140': '账户名或登录密码错误，请重新输入',
              '1000010': '账户未注册，立即注册',
              '1000030': '账户名或登录密码错误，请重新输入',
              '1000070': '账户名或登录密码错误，请重新输入',
              '1000100': '验证码错误',
              '1000110': '账户尚未激活',
              '1000300': '密码输入超过三次'
            };

            var errorText = map[error.toString()];
            if (error === 1000100) {
              $('#code-error-tips').text(errorText).show();
            } else if (error === 1000300) {
              that.data.attr('isNeedVerifiedCode', true);
              $('#verified-code-btn').click(function() {
                that.getVerifiedCode();
              })
              $('#username-error-tips').text('账户名或登录密码错误，请重新输入').show();
            } else {
              $('#username-error-tips').text(errorText).show();
            }
          })
      },
      /**
       * @description 用户点击注册按钮之后回调
       * @param  {dom} element jquery dom对象
       * @param  {event} event event对象
       */
      '#gotoLogin click': function(element, event) {
        event && event.preventDefault();

        var that = this;

        can.$('#user-name').blur();
        can.$('#user-pwd').blur();
        can.$('#verified-code').blur();

        var username = can.$('#user-name').val();
        var password = can.$('#user-pwd').val();
        var verCode = can.$('#verified-code').val();

        can.$('#username-error-tips').hide();
        can.$('#pwd-error-tips').hide();
        can.$('#code-error-tips').hide();
        // @todo 检查用户名和密码是否符合规范

        element.text("登录中");

        // 设置登录请求信息
        if (this.data.attr('isNeedVerifiedCode')) {
          if (this.checkUserName.call(this, username) && this.checkPwd.call(this, password) && this.checkVerCode.call(this, verCode)) {
            var vfCode = can.param({
              id: DEFAULT_CAPTCHA_ID,
              hash: DEFAULT_CAPTCHA_HASH,
              sessionID: this.data.sessionId,
              answer: this.data.attr('verifiedCode')
            });

            this.component.login.setData({
              accountId: can.$.trim(this.data.attr('username')),
              type: that.checkTypeOfAccount(that.data.attr('username')),
              password: md5(this.data.attr('password') + SFConfig.setting.md5_key),
              vfCode: vfCode
            });
            that.sendRequest(element);
            that.getVerifiedCode();
          } else {
            element.text("登录");
          }
        } else {
          if (this.checkUserName.call(this, username) && this.checkPwd.call(this, password)) {
            this.component.login.setData({
              accountId: can.$.trim(this.data.attr('username')),
              type: that.checkTypeOfAccount(that.data.attr('username')),
              password: md5(this.data.attr('password') + SFConfig.setting.md5_key)
            });
            that.sendRequest(element);

          } else {
            element.text("登录");
          }
        }
      }
    });
  });
