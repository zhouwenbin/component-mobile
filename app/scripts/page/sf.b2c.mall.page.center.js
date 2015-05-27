'use strict';

define(
  [
    'can',
    'zepto',
    'store',
    'fastclick',
    'sf.b2c.mall.api.user.getUserInfo',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.user.logout',
    'sf.weixin',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, store, Fastclick, SFGetUserInfo, SFFrameworkComm, SFMessage, SFLogout, SFWeixin, SFConfig) {

    Fastclick.attach(document.body);

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        }

        this.render();
      },

      /**
       * [render 渲染]
       */
      render: function() {
        var that = this;
        var getUserInfo = new SFGetUserInfo();
        getUserInfo
          .sendRequest()
          .done(function(data) {
            if (store.get('type') == 'MOBILE') {
              that.options.welcomeName = that.maskMobile(data.mobile);
            } else if (store.get('type') == 'MAIL') {
              that.options.welcomeName = that.maskMail(data.mailId);
            } else if (store.get('type') == 'WEIXIN') {
              that.options.welcomeName = store.get('nickname');
            }

            if (data.nick != '海淘用户') {
              that.options.welcomeName = data.nick;
            }


            var html = can.view('/templates/center/sf.b2c.mall.center.content.mustache', that.options);
            that.element.html(html);

            $('.loadingDIV').hide();
          })
          .fail(function(error) {
            $('.loadingDIV').hide();
          })
      },

      '.myorder click': function(element, event) {
        window.location.href = SFConfig.setting.link.orderlist;
      },

      '.mycoupon click': function(element, event) {
        window.location.href = SFConfig.setting.link.coupon;
      },

      '.myaddress click': function(element, event) {
        window.location.href = SFConfig.setting.link.recaddrmanage;
      },

      maskMobile: function(str) {
        if (typeof str == 'undefined') {
          return "";
        }

        return str.substring(0, 3) + '****' + str.substring(7, 11)
      },

      maskMail: function(str) {
        return str.replace(/([^@]{3})[^@]*?(@[\s\S]*)/, "$1...$2")
      },

      '.contactMe click': function(element, event) {
        can.$('.dialog').show();
        can.$('#closeContactMe').click(function() {
          can.$('.dialog').hide();
        })
      },

      '.exit click': function(element, event) {
        var message = new SFMessage(null, {
          'tip': '确认要退出账户吗？',
          'type': 'confirm',
          'okFunction': function() {
            var that = this;

            if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
              var logout = new SFLogout({});

              logout
                .sendRequest()
                .done(function(data) {
                  store.clear();

                  setTimeout(function() {
                    window.location.href =  SFConfig.setting.link.index;
                  }, 2000);

                })
                .fail(function() {})
            }
          }
        });
      }
    });

    new center('.sf-b2c-mall-center');
  })