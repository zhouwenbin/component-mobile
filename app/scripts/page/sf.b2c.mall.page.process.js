'use strict';

define(
  'sf.b2c.mall.page.process',
  [
    'zepto',
    'can',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.checkLink',
    'sf.b2c.mall.business.config'
  ],
  function ($, can, Fastclick, SFFrameworkComm, SFApiUserChecklink) {
    Fastclick.attach(document.body);

    SFFrameworkComm.register(3);

    var ERROR_MAP = {
      '1000120' :  '链接已过期',
      '1000130' :  '签名验证失败'
    }

    can.route.ready();
    var PageRegisterCheckLink = can.Control.extend({
      init: function () {
        this.component = {}
        this.component.checklink = new SFApiUserChecklink();

        var params = can.deparam(window.location.search.substr(1));
        var tag = can.route.attr('tag');
        this.act(tag);
      },

      actionMap: {
        'confirminfo': function(){
          this.component.checklink.setData({
            linkContent: window.decodeURIComponent(window.location.search.substr(1))
          });

          this.component.checklink.sendRequest()
            .done(function (data) {
              if (data.value) {
                var params = can.deparam(window.location.search.substr(1));
                window.location.href = 'activated.html'+window.location.search;
              }
            })
            .fail(function (errorCode) {
              if (_.isNumber(errorCode)) {
                var params = can.deparam(window.location.search.substr(1));
                window.location.href = 'nullactivated.html'+ '?' + $.param({er: errorCode, mailId: params.mailId, type: 'register'});
              }
            })
        },

        'setpwd': function () {
          this.component.checklink.setData({
            linkContent:  window.decodeURIComponent(window.location.search.substr(1))
          });

          this.component.checklink.sendRequest()
            .done(function (data) {
              if (data.value) {
                var params = can.deparam(window.location.search.substr(1));
                window.location.href = 'retrieve.html' + window.location.search + window.location.hash;
              }
            })
            .fail(function (errorCode) {
              if (_.isNumber(errorCode)) {
                var params = can.deparam(window.location.search.substr(1));
                window.location.href = 'nullactivated.html'+ '?' + $.param({er: errorCode, mailId: params.mailId, type: 'retrieve'});
              }
            })
        }
      },

      act: function (tag) {
        var fn = this.actionMap[tag];
        fn.call(this);
      }
    });

    var pageloader = new PageRegisterCheckLink();
  });