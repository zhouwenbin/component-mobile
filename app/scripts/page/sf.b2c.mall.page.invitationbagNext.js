'use strict';

define(
  'sf.b2c.mall.page.invitationbagNext', [
    'can',
    'zepto',
    'sf.util',
    'store',
    'zepto.cookie',
    'sf.b2c.mall.api.coupon.hasReceivedCp',
    'sf.b2c.mall.framework.comm',
    'text!template_center_invitationbagNext',
    'sf.b2c.mall.api.user.checkUserExist',
    'sf.b2c.mall.api.user.checkSmsCode',
    'sf.b2c.mall.api.user.downSmsCode',
    'sf.b2c.mall.api.user.ptnBindAndRcvCp',
    'sf.b2c.mall.api.user.setPassword',
    'sf.b2c.mall.api.user.mobileRegstAndRcvCp',
    'sf.b2c.mall.widget.message',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'md5',
  ],

  function(can, $, SFFn, store, $cookie, SFHasReceivedCp, SFFrameworkComm, template_center_invitationbagNext, SFcheckUserExist, SFcheckSmsCode, SFdownSmsCode, SFptnBindAndRcvCp, SFsetPassword, SFmobileRegstAndRcvCp, SFmessage, SFweixin, SFBizConf, md5) {

    SFFrameworkComm.register(3);
    var bagid = 286;

    var myInvitation = can.Control.extend({
      helpers: {

        isWechart: function(options) {
          var tempToken = store.get('tempToken') || can.route.attr('tempToken');
          if (SFFn.isMobile.WeChat() && tempToken) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

      },

      init: function(element, options) {

        this.render();
      },

      render: function() {
        var that = this;
        this.data = {};
        this.data.bagid = bagid;
        var renderFn = can.mustache(template_center_invitationbagNext);
        that.options.html = renderFn(that.data, that.helpers);
        that.element.html(that.options.html);
        var srcUid = can.route.attr('srcUid') || $.fn.cookie('userId') || null;
        if (!srcUid) {
          window.location.href = 'http://' + window.location.hostname + '/';
        }
        if (SFFn.isMobile.WeChat()) {
          var url = 'http://' + window.location.hostname + '/invitation-bag.html?' + $.param({
            _ruser: srcUid
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail('顺丰海淘给新人撒红包了，用来买国外好货，不拿白不拿', '顺丰海淘为了拉客也是拼了，买海外商品比国内商品还便宜', url, imgUrl);
        }
        if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://' + window.location.hostname + '/invitation-bag.html?' + $.param({
            _ruser: srcUid
          });;
        }

      },

      '#getCode click': function(element, event) {
        var Reg = /^1\d{10}$/;
        var mobile = $('#getMbile').val();
        if (element.hasClass('disabled')) {
          event && event.preventDefault();
        } else {
          if (!Reg.test(mobile)) {
            if (mobile == '') {
              $('#text-error1').show().text('手机号不能为空');
            } else {
              $('#text-error1').show().text('手机号格式错误');
            }
          } else {
            var params = {
              accountId: mobile,
              type: 'MOBILE',
              tempToken: store.get('tempToken')
            };
            var checkUserExist = new SFcheckUserExist(params);
            checkUserExist.sendRequest()
              .done(function(data) {
                if (data.value) {
                  $('#text-error1').show().text('手机号已被注册')
                } else {
                  $('#text-error1').hide();
                  var countdown = 60;

                  function setTimeOutBtn(element) {
                    if (countdown == 0) {
                      element.find('.text-error').css('color', '#ff5b54').text('获取验证码');
                      countdown = 60;
                      clearInterval(tims);
                      element.removeClass('disabled');
                    } else {
                      element.addClass('disabled');
                      element.find('.text-error').css('color', '#dddddd').text(+countdown + 's后重新获取');
                      countdown--;
                    }
                  };
                  var tims = setInterval(function() {
                    setTimeOutBtn(element);
                  }, 1000);
                  var downSmsCode = new SFdownSmsCode({
                    mobile: mobile,
                    askType: 'BINDING'
                  });
                  downSmsCode.sendRequest().done(function(data) {
                    if (!data) {
                      $('#text-error2').show().text('验证码获取失败')
                    }
                  })
                    .fail(function(error) {
                      console.log(error);
                    });
                }
              })
              .fail(function(error) {
                if (error === 1000340) {
                  $('#text-error1').show().text('用户已注册')
                } else if (error === 1000380) {
                  $('#text-error1').show().text('用户已注册')
                }
              });
          }
        }
      },

      '#getCodeRegBtn click': function(element, event) {
        var Reg = /^1\d{10}$/;
        var mobile = $('#getMbile').val();
        if (element.hasClass('disabled')) {
          event && event.preventDefault();
        } else {
          if (!Reg.test(mobile)) {
            if (mobile == '') {
              $('#text-error1').show().text('手机号不能为空');
            } else {
              $('#text-error1').show().text('手机号格式错误');
            }
          } else {
            var countdown = 60;

            function setTimeOutBtn(element) {
              if (countdown == 0) {
                element.find('.text-error').css('color', '#ff5b54').text('获取验证码');
                countdown = 60;
                clearInterval(tims);
                element.removeClass('disabled');
              } else {
                element.addClass('disabled');
                element.find('.text-error').css('color', '#dddddd').text(+countdown + 's后重新获取');
                countdown--;
              }
            };
            var tims = setInterval(function() {
              setTimeOutBtn(element);
            }, 1000);
            var params = {
              accountId: mobile,
              type: 'MOBILE',
              tempToken: store.get('tempToken')
            };
            var checkUserExist = new SFcheckUserExist(params);
            checkUserExist.sendRequest()
              .done(function(data) {
                if (data.value) {
                  $('#text-error1').show().text('手机号已被注册')
                } else {
                  $('#text-error1').hide();
                  var downSmsCode = new SFdownSmsCode({
                    mobile: mobile,
                    askType: 'REGISTER'
                  });
                  downSmsCode.sendRequest().done(function(data) {
                    if (!data) {
                      $('#text-error2').show().text('验证码获取失败')
                    }
                  })
                    .fail(function(error) {
                      console.log(error);
                    });
                }
              })
              .fail(function(error) {
                if (error === 1000340) {
                  $('#text-error1').show().text('用户已注册')
                } else if (error === 1000380) {
                  $('#text-error1').show().text('用户已注册')
                }
              });
          }
        }
      },

      '#closePopGetinfo click': function(element, event) {
        $('#hasGetpack').hide();
      },

      '#ditectGetBtn click': function(element, event) {
        var mobile = $('#getMbile').val();
        var codeNum = $('#codeNum').val();
        var tempToken = store.get('tempToken') || can.route.attr('tempToken');
        if (codeNum == '') {
          $('#text-error2').show().text('验证码不能为空')
        }
        var params = {
          mobile: mobile,
          smsCode: codeNum,
          askType: 'BINDING'
        };
        var checkSmsCode = new SFcheckSmsCode(params);
        checkSmsCode.sendRequest().done(function(data) {
          if (data.value) {
            var srcUid = can.route.attr('srcUid')
            var params = {
              tempToken: tempToken,
              type: 'MOBILE',
              accountId: mobile,
              smsCode: codeNum,
              srcUid: srcUid,
              bagType: 'CARD',
              bagId: 286,
              envDesc: 'WeChat'
            };
            var ptnBindAndRcvCp = new SFptnBindAndRcvCp(params);
            ptnBindAndRcvCp.sendRequest().done(function(data) {
              store.set('csrfToken', data.csrfToken);
              if (data.hasCoupon) {
                $('#toSuccessSet').show();
              }
            })
              .fail(function(error) {
                if (error == 1000020) {
                  $('#text-error1').show().text('手机已注册');
                } else if (error == 1000240) {
                  $('#text-error2').show().text('验证码错误');
                } else if (error == 1000250) {
                  $('#text-error2').show().text('验证码已过期');
                } else if (error == 1000350) {
                  $('#text-error1').show().text('临时token失败');
                } else if (error == 1000360) {
                  $('#text-error1').show().text('手机已注册');
                } else if (error == 1000380) {
                  $('#text-error1').show().text('手机已注册');
                } else if (error == 1000410) {
                  $('#text-error2').show().text('请输入短信验证码');
                } else if (error == 1000480) {
                  $('#text-error2').show().text('账户被冻结');
                }
              });
          } else {
            $('#text-error2').show().text('验证码错误');
          }
        })
          .fail(function(error) {
            if (error === 1000230) {
              $('#text-error1').show().text('请输入正确的手机号')
            } else if (error === 1000250) {
              $('#text-error2').show().text('验证码已过期')
            }
          });

      },

      '.input focus': function(element) {
        element.closest('li').find('.text-errorme').hide();
        $('#setWrongFont').hide();
      },

      '#commitSubmit2 click': function(element, event) {
        var setPassword = $('#setPassword').val();
        if (setPassword == '') {
          $('#setWrongFont').show().text('密码不能设置为空')
        } else {
          var reg = /^[A-Za-z0-9]+$/;
          if (!reg.test(setPassword) || setPassword.length < 6 || setPassword.length > 18) {
            $('#setWrongFont').show().text('密码必须为6-18位数字字母组合');
          } else {
            var sfsetpassword = new SFsetPassword({
              pswd: md5(setPassword + SFBizConf.setting.md5_key)
            });
            sfsetpassword.sendRequest().done(function(data) {
              if (data.value) {
                window.location.href = 'http://' + window.location.hostname + '/'
              } else {
                $('#setWrongFont').show().text('密码设置失败请重新设置');
              }
            });
          }
        }
      },

      '#closeSuccessSet click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/'
      },

      '#closeBtn click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/'
      },

      '#noDitectGetBtn click': function(element, event) {
        var Reg = /^1\d{10}$/;
        var mobile = $('#getMbile').val();
        var codeNum = $('#codeNum').val();
        if (!Reg.test(mobile)) {
          if (mobile == '') {
            $('#text-error1').show().text('手机号不能为空');
          } else {
            $('#text-error1').show().text('手机号格式错误');
          }
        }
        if (codeNum == '') {
          $('#text-error2').show().text('验证码不能为空')
        }
        if (SFFn.isMobile.QQ()) {
          var envDesc = 'QQ';
        } else if (SFFn.isMobile.Opera()) {
          var envDesc = 'Opera';
        } else if (SFFn.isMobile.BlackBerry()) {
          var envDesc = 'BlackBerry';
        } else if (SFFn.isMobile.Windows()) {
          var envDesc = 'Windows';
        } else if (SFFn.isMobile.Firefox()) {
          var envDesc = 'Firefox';
        } else if (SFFn.isMobile.Android()) {
          var envDesc = 'Android';
        } else if (SFFn.isMobile.iOS()) {
          var envDesc = 'iOS';
        }
        var password = $('#getPassword').val();
        var srcUid = can.route.attr('srcUid');
        var params = {
          mobile: mobile,
          smsCode: codeNum,
          askType: 'REGISTER'
        };
        var checkSmsCode = new SFcheckSmsCode(params);
        checkSmsCode.sendRequest().done(function(data) {
          if (data.value) {
            if (password == '') {
              $('#text-error3').show().text('密码不能设置为空')
            } else {
              var reg = /^[A-Za-z0-9]+$/;
              if (!reg.test(password) || password.length < 6 || password.length > 18) {
                $('#text-error3').show().text('密码必须为6-18位数字字母组合');
              } else {
                var params = {
                  mobile: mobile,
                  smsCode: codeNum,
                  password: md5(password + SFBizConf.setting.md5_key),
                  srcUid: srcUid,
                  bagType: 'CARD',
                  bagId: 286,
                  envDesc: envDesc
                };
                var mobileRegstAndRcvCp = new SFmobileRegstAndRcvCp(params);
                mobileRegstAndRcvCp.sendRequest().done(function(data) {
                  store.set('csrfToken', data.csrfToken);
                  if (data.hasCoupon) {
                    $('#ohSuccessSet').show();
                  }
                })
                .fail(function(error) {
                  if (error === 1000020) {
                    $('#text-error1').show().text('手机已注册')
                  } else if (error === 1000230) {
                    $('#text-error1').show().text('手机号错误')
                  } else if (error === 1000240) {
                    $('#text-error2').show().text('验证码错误')
                  } else if (error === 1000250) {
                    $('#text-error2').show().text('验证码已过期')
                  } else if (error === 1000340) {
                    $('#text-error2').show().text('手机已注册')
                  }
                });
              }
            }
          } else {
            $('#text-error2').show().text('验证码错误');
          }
        })
          .fail(function(error) {
            if (error === 1000230) {
              $('#text-error1').show().text('请输入正确的手机号')
            } else if (error === 1000250) {
              $('#text-error2').show().text('验证码已过期')
            }
          });

      },

      '#goTohome click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/'
      },

      '#goHomeTitle click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/';
      },

    });

    new myInvitation('.sf-b2c-mall-invitationbagNext');
  });