'use strict';

define('sf.b2c.mall.component.register', [
    'zepto',
    'can',
    'md5',
    'underscore',
    'store',
    'fastclick',
    'sf.b2c.mall.api.user.downSmsCode',
    'sf.b2c.mall.api.user.mobileRegister',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.api.promotion.receivePro',
    'sf.b2c.mall.api.coupon.receiveCoupon',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.user.checkUserExist',
    'text!template_component_register_fillinfo'
  ],

  function($, can, md5, _, store, Fastclick, SFApiUserDownSmsCode, SFApiUserMobileRegister, SFReqLoginAuth, SFBizConf,
    SFFn, SFReceivePro, SFReceiveCoupon, SFMessage, SFCheckUserExist, template_component_register_fillinfo) {

    Fastclick.attach(document.body);

    var DEFAULT_FILLINFO_TAG = 'fillinfo';

    var DEFAULT_DOWN_SMS_ERROR_MAP = {
      '1000010': '未找到手机用户',
      '1000020': '手机号已存在，<a href="' + SFBizConf.setting.link.login + '">立即登录</a>',
      '1000070': '参数错误',
      '1000230': '手机号错误，请输入正确的手机号',
      '1000270': '短信请求太过频繁,请稍后重试',
      '1000290': '短信请求太多'
    }

    var DEFAULT_MOBILE_ACTIVATE_ERROR_MAP = {
      '1000020': '手机号已存在，<a href="' + SFBizConf.setting.link.login + '">立即登录</a>',
      '1000230': '手机号错误，请输入正确的手机号',
      '1000240': '手机验证码错误',
      '1000250': '验证码输入有误，请重新输入'
    }

    var ERROR_NO_INPUT_MOBILE = '请输入您的手机号码';
    var ERROR_INPUT_MOBILE = '您的手机号码格式有误';
    var ERROR_NO_MOBILE_CHECKCODE = '请输入验证码';
    var ERROR_MOBILE_CHECKCODE = '短信验证码输入有误，请重新输入';
    var ERROR_NO_PASSWORD = '请设置登录密码';
    var ERROR_PASSWORD = '密码请设置6-18位字母、数字或标点符号';
    var ERROR_EMAIL = '邮箱格式有误';
    var ERROR_NO_EMAIL = '请输入您的常用邮箱地址';
    var ERROR_NO_EMAIL_CODE = '请输入右侧图片中信息';
    var ERROR_EMAIL_CODE = '验证码输入有误，请重新输入';
    var ERROR_NO_SET_PWD = '账户未设置密码，点此<a href="setpassword.html?tel={{tel}}">设置密码</a>';

    can.route.ready();

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
          }
        }
      },

      init: function(element, event) {
        this.component = {};
        this.component.sms = new SFApiUserDownSmsCode();
        this.component.mobileRegister = new SFApiUserMobileRegister();

        this.data = new can.Map({
          mobile: true,
          mail: false,
          timmer: 2
        });

        var tag = can.route.attr('tag') || DEFAULT_FILLINFO_TAG

        this.render(tag, this.data);

        // var that = this;
        // $('#mobile-code-btn').tap(function() {
        //   that.mobileCodeSendClick();
        // })

        // $('#mobile-register-btn').tap(function() {
        //   that.mobileRegisterClick();
        // })

        // $('.weixinlogin').tap(function() {
        //   that.weixinLoginAuth();
        // })
      },

      /**
       * [weixinLogin 微信登陆]
       * @return {[type]} [description]
       */
      // weixinLoginAuth: function() {
      //   var reqLoginAuth = new SFReqLoginAuth({
      //     "partnerId": "wechat_open"
      //   });

      //   reqLoginAuth
      //     .sendRequest()
      //     .done(function(data) {
      //       window.location.href = data.loginAuthLink;
      //     })
      //     .fail(function(error) {
      //       console.error(error);
      //     })
      // },

      '{can.route} change': function() {
        var tag = can.route.attr('tag') || DEFAULT_FILLINFO_TAG;
        this.render.call(this, tag, this.data);
      },

      renderMap: {
        'fillinfo': function(data) {
          // var html = can.view(template_component_register_fillinfo, data, this.helpers);
          var renderFn = can.mustache(template_component_register_fillinfo);
          var html = renderFn(data, this.helpers);
          this.element.html(html)
          console.log(this.element.find('.register'))
          this.element.find('.register').show('slow');
        }
      },

      render: function(tag, data) {
        var params = can.deparam(window.location.search.substr(1));
        var fn = this.renderMap[tag];
        if (_.isFunction(fn)) {
          if (SFFn.isMobile.any() || params.platform) {
            data.attr('platform', params.platform || (SFFn.isMobile.any() ? 'mobile' : null));
          }
          fn.call(this, data);
        }
      },

      gotoFromPage: function() {
        var that = this;

        // @todo调用onRegistered 回调
        if (_.isFunction(that.options.onRegistered)) {
          that.options.onRegistered();
        }

        //注册成功后转跳到对应页面
        var params = can.deparam(window.location.search.substr(1));
        var gotoUrl = params.from;
        window.location.href = gotoUrl || "index.html";
      },

      checkMobile: function(mobile) {
        var that = this;
        var isTelNum = /^1\d{10}$/.test(mobile);
        //@note 手机号码输完11位时，验证该账号是否有密码
        if (isTelNum) {
          var checkUserExist = new SFCheckUserExist({
            'accountId': mobile,
            'type': 'MOBILE'
          });
          checkUserExist.sendRequest()
            .fail(function(errorCode) {
              if (errorCode == 1000340) {
                var fn = can.view.mustache(ERROR_NO_SET_PWD);
                $('#input-mobile-error').html(fn({
                  tel: mobile
                })).show();
                return false;
              };
            })
        };
        if (!mobile) {
          this.element.find('#input-mobile-error').text(ERROR_NO_INPUT_MOBILE).show();
          return false;
        } else if (!/^1[0-9]{10}$/.test(mobile)) {
          this.element.find('#input-mobile-error').text(ERROR_INPUT_MOBILE).show();
          return false;
        } else {
          return true;
        }
      },

      checkCode: function(code) {
        if (!code) {
          this.element.find('#mobile-code-error').text(ERROR_NO_MOBILE_CHECKCODE).show();
          return false;
        } else if (!/^[0-9]{6}$/.test(code)) {
          this.element.find('#mobile-code-error').text(ERROR_MOBILE_CHECKCODE).show();
          return false;
        } else {
          return true;
        }
      },

      checkPassword: function(password, tag) {
        if (!password) {
          this.element.find(tag).text(ERROR_NO_PASSWORD).show();
          return false;
        } else if (!/^[0-9a-zA-Z~!@#\$%\^&\*\(\)_+=-\|~`,./<>\[\]\{\}]{6,18}$/.test(password)) {
          this.element.find(tag).text(ERROR_PASSWORD).show();
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

      '#changePwdType click': function($element, event) {
        $element.toggleClass("active");

        if ($element.hasClass('active')) {
          $("#input-password")[0].type = 'text';
        } else {
          $("#input-password")[0].type = 'password';
        }
      },

      '#input-mobile blur': function($element, event) {
        var mobile = $element.val();
        this.checkMobile.call(this, mobile);
      },

      '#input-mobile focus': function($element, event) {
        this.element.find('#input-mobile-error').hide()
      },

      '#mobile-code-btn click': function($element, event) {
        event && event.preventDefault();

        var mobile = this.element.find('#input-mobile').val();
        if (this.checkMobile.call(this, mobile)) {
          // 发起请求发送号码

          var that = this;
          this.component.sms.setData({
            mobile: mobile,
            askType: 'REGISTER'
          });
          this.component.sms.sendRequest()
            .done(function(data) {
              // @todo 开始倒计时
              that.countdown.call(that, 60);
              that.element.find('#mobile-code-error').hide();
            })
            .fail(function(errorCode) {
              if (_.isNumber(errorCode)) {
                var defaultText = '短信请求发送失败';
                var errorText = DEFAULT_DOWN_SMS_ERROR_MAP[errorCode.toString()] || defaultText;
                if (errorCode === 1000020) {
                  that.element.find('#input-mobile-error').html(errorText).show();
                } else {
                  that.element.find('#mobile-code-error').html(errorText).show();
                }
              }
            })
        }
      },

      'input focus': function($element, event) {
        this.element.find('#input-mobile-error').hide();
      },

      '#input-mobile-code focus': function($element, event) {
        this.element.find('#mobile-code-error').hide();
      },

      '#input-mobile-code blur': function($element, event) {
        var code = this.element.find('#input-mobile-code').val();
        this.checkCode.call(this, code);
      },

      '#input-password blur': function($element, event) {
        var password = $element.val();
        if (password) {
          $element.val(password);
        } else {
          //$('#pwd-default-text').show();
        }
        this.checkPassword.call(this, password, '#password-error');
      },


      '#input-password focus': function($element, event) {
        $('#pwd-default-text').hide();
        this.element.find('#password-error').hide();
      },

      errorMap: {
        "11000020": "卡券不存在",
        "11000030": "卡券已作废",
        "11000050": "卡券已领完",
        "11000100": "您已领过该券",
        "11000130": "卡包不存在",
        "11000140": "卡包已作废"
      },

      receiveCoupon: function(params) {

        var params = {};
        params.bagId = '236';
        params.type = 'CARD';
        params.receiveChannel = 'B2C';
        params.receiveWay = 'ZTLQ';
        var that = this;
        var receiveCouponData = new SFReceiveCoupon(params);
        return can.when(receiveCouponData.sendRequest())
          .done(function(userCouponInfo) {
            new SFMessage(null, {
              'tip': '50元优惠券已发放至您的账户，请注意查收。',
              'type': 'success'
            });
          })
          .fail(function(error) {
            new SFMessage(null, {
              'tip': that.errorMap[error] || '领取失败',
              'type': 'error'
            });
          });
      },

      '#mobile-register-btn click': function($element, event) {
        event && event.preventDefault();

        // 发起请求注册

        var that = this;
        var mobile = this.element.find('#input-mobile').val();
        var code = this.element.find('#input-mobile-code').val();
        var password = this.element.find('#input-password').val();

        if (this.checkMobile.call(this, mobile) && this.checkCode(code) && this.checkPassword(password, '#password-error')) {
          this.component.mobileRegister.setData({
            mobile: mobile,
            smsCode: code,
            password: md5(password + SFBizConf.setting.md5_key)
          });

          this.component.mobileRegister.sendRequest()
            .done(function(data) {
              if (data.csrfToken) {
                store.set('type', 'MOBILE');
                store.set('nickname', mobile);

                // 注册送优惠券
                // var receivePro = new SFReceivePro({
                //   "channel": "B2C_H5",
                //   "event": "REGISTER_USER_SUCCESS"
                // });

                // receivePro.sendRequest()
                //   .done(function(proInfo) {
                //     if (proInfo.couponInfos) {
                //       var message = new SFMessage(null, {
                //         'tip': '礼包领取成功，请至我的优惠券查看！',
                //         'type': 'success'
                //       });
                //     }
                //   })
                //   .fail(function(errorCode) {
                //     console.error(errorCode);
                //   });
                //
                // var currentServerTime = that.component.mobileRegister.getServerTime();
                // if (currentServerTime > 1432828800000 && currentServerTime < 1433087999000) {
                //   var message = new SFMessage(null, {
                //     'tip': '新人礼10元打车券将在6月1日发放至您的账户，请注意查收。',
                //     'type': 'success'
                //   });
                // }
                that.receiveCoupon();
                // 注册送优惠券

                SFFn.dotCode();

                that.gotoFromPage()
                  // setTimeout(function(){that.gotoFromPage();},1000);
              }
            })
            .fail(function(errorCode) {
              if (_.isNumber(errorCode)) {
                var defaultText = '注册失败';
                var errorText = DEFAULT_MOBILE_ACTIVATE_ERROR_MAP[errorCode.toString()] || defaultText;
                if (errorCode == 1000020) {
                  that.element.find('#input-mobile-error').html(errorText).show();
                } else if (errorCode == 1000250) {
                  that.element.find('#mobile-code-error').html(errorText).show();
                } else {
                  that.element.find('#mobile-register-error').html(errorText).show();
                }
              }
            })
        }
      }
    });

  });