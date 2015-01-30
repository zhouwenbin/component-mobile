'use strict';

define(
  [
    'can',
    'zepto',
    'store',
    'sf.b2c.mall.api.user.getUserInfo',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.widget.message',
    'sf.weixin'
  ],
  function(can, $, store, SFGetUserInfo, SFFrameworkComm, SFMessage, SFWeixin) {

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
              that.options.welcomeName = data.mailId;
            }

            if (typeof data.nick != 'undefined') {
              that.options.welcomeName = data.nick;
            }

            var html = can.view('/templates/center/sf.b2c.mall.center.content.mustache', that.options);
            that.element.html(html);

            $('.myorder').tap(function() {
              window.location.href = "/orderlist.html";
            })

            $('.exit').tap(function() {
              that.exitClick();
            })

            $('.contactMe').tap(function(){
              $('.dialog-phone').show();
              $('#closeContactMe').tap(function(){
                $('.dialog-phone').hide();
              })
            })

            $('.loadingDIV').hide();
          })
          .fail(function() {
            $('.loadingDIV').hide();
          })
      },

      maskMobile: function(str) {
        return str.substring(0, 3) + '****' + str.substring(7, 10)
      },

      exitClick: function() {
        var message = new SFMessage(null, {
          'tip': '确认要退出账户吗？',
          'type': 'confirm',
          'okFunction': function() {
            store.clear();
            window.location.href = "/index.html";
          }
        });
      }
    });

    new center('.sf-b2c-mall-center');
  })