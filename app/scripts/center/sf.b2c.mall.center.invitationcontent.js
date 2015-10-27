'use strict';

define('sf.b2c.mall.center.invitationcontent', [
    'can',
    'zepto',
    'fastclick',
    'moment',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.user.getUserInfo',
    'text!template_center_invitationcontent',
    'sf.b2c.mall.api.user.getCashActInfo',
    'sf.b2c.mall.api.user.rqCash',
    "sf.b2c.mall.api.user.getRegstedCount",
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.module.header'
  ],
  function(can, $, Fastclick, moment, SFFrameworkComm, SFMessage, SFGetUserInfo, template_center_invitationcontent, SFGetCashActInfo, SFRqCash, SFgetRegstedCount, SFLoading ,SFheader) {

    Fastclick.attach(document.body);

    var loadingCtrl = new SFLoading();

    return can.Control.extend({

      helpers: {

        isLogin: function(options) {
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        hasBindAccount: function(bindAliAct, options) {
          if (bindAliAct != "" && bindAliAct != null) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        hasIncome: function(infoList, options) {
          if (infoList && infoList.length > 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'toFix2-price': function(price) {
          return (price / 100).toFixed(2).toString();
        },

      },

      init: function(element, options) {
        this.render();
      },

      render: function() {
        this.data = {};
        var that = this;
        loadingCtrl.show();
        var getCashActInfo = new SFGetCashActInfo();
        var getRegstedCount = new SFgetRegstedCount();
        can.when(getCashActInfo.sendRequest(), getRegstedCount.sendRequest())
          .done(function(mainInfo, getRegstedCount) {
            that.data = _.extend(that.data, mainInfo);
            var totle = getRegstedCount.value;
            var renderFn = can.mustache(template_center_invitationcontent);
            that.options.html = renderFn(that.data, that.helpers);
            that.element.html(that.options.html);
            $('#hasMyTottle').text('（' + totle + '）');
          })
          .fail(function(error) {
            console.error(error);
          })
          loadingCtrl.hide();
      },

      '#mustTologin click': function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
      },

      '.mBinkPayaccount click': function(element, event) {
        var url = 'http://' + window.location.hostname + '/bindalipay.html?from=' + encodeURIComponent(window.location.href);
        window.location.href = url;
      },

      '#getmoney click': function(element, event) {
        var that = this;

        if (!this.data.bindAliAct) {
          window.location.href = 'http://' + window.location.hostname + '/bindalipay.html?from=' + encodeURIComponent(window.location.href);
        } else {
          if (this.data.actBalance < 5000) {
            var message = new SFMessage(null, {
              'tip': '您的账户余额少于50元，无法提现！',
              'type': 'error'
            });
          } else {
            var rqCash = new SFRqCash();
            rqCash.sendRequest()
              .done(function(data) {
                if (data.value) {
                  var message = new SFMessage(null, {
                    'tip': '提现成功，提现金额约3个工作日内到账。',
                    'type': 'success',
                    'okFunction': _.bind(function() {
                      window.location.reload();
                    })
                  });
                }
              })
              .fail(function(error) {
                console.error(error);
                var message = new SFMessage(null, {
                  'tip': that.errorMap[error] || '提现失败！',
                  'type': 'error'
                });
              })
          }
        }
      },

      errorMap: {
        1000420: '尚未绑定支付宝账户',
        1000430: '未达到提现金额限制',
        1000450: '请耐心等待，目前小章鱼正在整理上一天的提现哟，目前暂停提现预计2:00恢复，为了您的身体着想睡饱了再来提现吧：）'
      },

      '#toInvitationUserlist click': function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
        window.location.href = 'http://' + window.location.hostname + '/invitationUserlist.html#!&status=UNFINISH';
      },

      '#toInvitationIncome click': function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
        window.location.href = 'http://' + window.location.hostname + '/invitationIncome.html';
      },

      '#invitationGetfmy click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/invitationGetfmy.html';
      },

      '#invitationQa click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/invitationQa.html';
      },

      '#invitationAskfd click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/invitationAskfd.html';
      },

      '#invitationRule click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/helpcenter-invitation.html';
      }

    });
  })