'use strict';

define(
  'sf.b2c.mall.page.nullactivated',
  [
    'zepto',
    'can',
    'fastclick',
    'md5',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.sendActivateMail',
    'sf.b2c.mall.api.user.sendResetPwdLink',
    'sf.b2c.mall.business.config'
  ],
  function ($, can, Fastclick, md5, SFFrameworkComm, SFApiUserSendActivateMail, SFApiUserSendResetPwdLink, SFBizConf) {

    Fastclick.attach(document.body);

    SFFrameworkComm.register(3);

    var DEFAULT_ERROR = '邮箱激活失败'
    var ERROR_REGISTER_MAP = {
      '1000020': '很抱歉，您的邮箱已注册',
      '1000120': '很抱歉，您的邮箱验证链接已失效'||'链接已过期',
      '1000130': '很抱歉，您的邮箱验证链接已失效'||'签名验证失败',
      '1000140': '发送验证邮箱的频率较高，请过2分钟再试'||'密码修改间隔太短'
    }
    var ERROR_RESEND_MAP = {
      '1000020':   '账户已注册',
      '1000050':   '邮箱地址错误',
      '1000070':   '参数错误',
      '1000100':   '验证码错误',
      '1000160':   '发送验证邮箱的频率较高，请过2分钟再试'
    }

    var ERROR_RESEND_RESET_LINK_MAP = {
      '1000010':   '未找到用户',
      '1000050':   '邮箱地址错误',
      '1000070':   '参数错误',
      '1000100':   '验证码错误',
      '1000110':   '账户尚未激活',
      '1000160':   '发送验证邮箱的频率较高，请过2分钟再试'
    }

    var DEFAULT_RESEND_SUCCESS = '验证邮件已重新发送，请注意查收。';
    var DEFAULT_RESEND_RESET_LINK_SUCCESS = '密码重置邮件已重新发送，请注意查收';


    var PageNullActivated = can.Control.extend({
      init: function () {
        this.component = {};
        this.component.sendActivateMail = new SFApiUserSendActivateMail();
        this.component.sendResetPwdLink = new SFApiUserSendResetPwdLink();
        this.paint();
      },

      paint: function () {

        var params = can.deparam(window.location.search.substr(1));
        this.data = new can.Map({
          errorCode: params.er,
          errorText: ERROR_REGISTER_MAP[params.er] || DEFAULT_ERROR,
          email: params.mailId,
          msg: null,
          msgType: null
        });
        this.render(this.data);
      },

      render: function (data) {
        var template = this.template(data.errorCode);
        if (_.isFunction(template)) {
          var templateFn = can.view.mustache(template());
          this.element.find('.sf-b2c-mall-content').html(templateFn(data));
        }
      },

      existedTemplate: function () {
        return '<div class="box">' +
          '<h1 style="text-align: center; margin:10px 0 20px 0;">{{errorText}}</h1>'+
          '<div style="text-align: center;"><a href="javascript:void(0);" class="btn btn-success" id="resend" style="margin-right: 20px;">重新发送</a><a href="index.html" class="text-success">返回首页</a></div>'+
          '{{#msg}}<div style="text-align: center;margin-top: 20px;">{{msg}}</div>{{/msg}}' +
          '</div>';
      },

      expiredTemplate: function () {
        return '<div class="box">' +
          '<h1 style="text-align: center; margin:10px 0 20px 0;">{{errorText}}</h1>'+
          '<div style="text-align: center;"><a href="javascript:void(0);" class="btn btn-success" id="resend" style="margin-right: 20px;">重新发送</a><a href="index.html" class="text-success">返回首页</a></div>'+
          '{{#msg}}<div style="text-align: center;margin-top: 20px;">{{msg}}</div>{{/msg}}' +
          '</div>';
      },

      template: function(errorCode){
        var map = {
          '1000020': this.existedTemplate,
          '1000120': this.expiredTemplate,
          '1000130': this.expiredTemplate,
          '1000140': this.expiredTemplate
        }

        return map[errorCode];
      },

      '#resend click': function ($element, event) {
        event && event.preventDefault();

        var params = can.deparam(window.location.search.substr(1));
        var map = {
          'register': this.sendActivateMail,
          'retrieve': this.sendResetLink
        }

        var fn = map[params.type];
        if (_.isFunction(fn)) {
          fn.call(this);
        }
      },

      sendResetLink: function () {
        var that = this;
        this.component.sendResetPwdLink.setData({
          mailId: this.data.attr('email'),
          from: 'RESEND'
        });

        this.component.sendResetPwdLink.sendRequest()
          .done(function (data) {
            that.data.attr('msg', DEFAULT_RESEND_RESET_LINK_SUCCESS);
            that.data.attr('msgType', 'icon26-2');
          })
          .fail(function (errorCode) {
            if (_.isNumber(errorCode)) {
              var errorText = ERROR_RESEND_RESET_LINK_MAP[errorCode.toString()];
              that.data.attr('msg', errorText);
              that.data.attr('msgType', 'icon26');
            }
          })
      },

      sendActivateMail: function () {
        var that = this;
        this.component.sendActivateMail.setData({
          mailId: this.data.attr('email'),
          from: 'RESEND'
        });

        this.component.sendActivateMail.sendRequest()
          .done(function (data) {
            that.data.attr('msg', DEFAULT_RESEND_SUCCESS);
            that.data.attr('msgType', 'icon26-2');
          })
          .fail(function (errorCode) {
            if (_.isNumber(errorCode)) {
              var errorText = ERROR_RESEND_MAP[errorCode.toString()];
              that.data.attr('msg', errorText);
              that.data.attr('msgType', 'icon26');
            }
          })
      }

    });

    var pageNullMailactivated = new PageNullActivated('body');
  });
