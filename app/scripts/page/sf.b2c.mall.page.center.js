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
    'sf.weixin'
  ],
  function(can, $, store, Fastclick, SFGetUserInfo, SFFrameworkComm, SFMessage, SFLogout, SFWeixin) {

    Fastclick.attach(document.body);

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html?from=' + escape(window.location.pathname);
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

            var html = can.view('/templates/center/sf.b2c.mall.center.content.mustache', that.options);
            that.element.html(html);

            $('.loadingDIV').hide();
          })
          .fail(function(error) {
            $('.loadingDIV').hide();
          })
      },

      '.myorder click': function(element, event) {
        window.location.href = "/orderlist.html";
      },

      maskMobile: function(str) {
        return str.substring(0, 3) + '****' + str.substring(7, 10)
      },

      maskMail: function(str) {
        return str.replace(/([^@]{3})[^@]*?(@[\s\S]*)/, "$1...$2")
      },

      '.contactMe click': function(element, event) {
        can.$('.dialog-phone').show();
        can.$('#closeContactMe').click(function() {
          can.$('.dialog-phone').hide();
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
                    window.location.href = "/index.html";
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