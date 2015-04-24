'use strict';

define(
  'sf.b2c.mall.page.taiwantravellercard', [
    'zepto',
    'can',
    'store',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.reqLoginAuth',
    'sf.weixin',
    'sf.b2c.mall.api.user.getUserCode',
    'sf.b2c.mall.widget.login'
  ],

  function($, can, store, Fastclick, SFFrameworkComm, SFReqLoginAuth, SFWeixin, SFGetUserCode, SFWeChatLogin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    Fastclick.attach(document.body);

    var gift = can.Control.extend({

      /** 初始化 */
      init: function(element) {

        var that = this;

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
           window.location.href = 'http://m.sfht.com/login.html?from=' + escape(window.location.href);
          return false;
        }

        var getUserCode = new SFGetUserCode({
          "codeType": "SIM4TW"
        });

        getUserCode
          .sendRequest()
          .done(function(data) {
            var object = {};

            if (data.code) {
              object.code = data.code.split("").join("</li><li>");
            }

            that.render(element, object);
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      /** 渲染 */
      render: function(element, data) {
        var html = can.view('templates/taiwantraveller/sf.b2c.mall.taiwantraveller.getcard.mustache', data);
        element.html(html);
      }

    });

    new gift('.haitao-b2c-h5-taiwan-traveller-card');
  });