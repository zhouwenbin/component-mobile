'use strict';

define(
  'sf.b2c.mall.page.invitationbag', [
    'can',
    'zepto',
    'sf.util',
    'store',
    'sf.b2c.mall.api.coupon.hasReceivedCp',
    'sf.b2c.mall.framework.comm',
    'text!template_center_invitationbag',
    'sf.b2c.mall.widget.login',
    'sf.b2c.mall.api.user.partnerLogin',
    'sf.b2c.mall.api.user.ptnBindAndRcvCp',
    'sf.b2c.mall.widget.message',
    'sf.weixin',
    'zepto.cookie',
  ],

  function(can, $, SFFn, store, SFHasReceivedCp, SFFrameworkComm, template_center_invitationbag, SFWeChatLogin, SFPartnerLogin, SFptnBindAndRcvCp, SFmessage, SFweixin , $cookie) {

    SFFrameworkComm.register(3);
    var bagid = 286;
    var myInvitation = can.Control.extend({

      init: function(element, options) {
        this.render();
      },

      render: function() {
        var that = this;
        that.data = {};
        var renderFn = can.mustache(template_center_invitationbag);
        that.options.html = renderFn(that.data, that.helpers);
        that.element.html(that.options.html);
        if(SFFn.isMobile.WeChat()){
          var params = can.deparam(window.location.search.substr(1));
          if (params.code) {
            var srcUid = params._ruser;
            var authResp = "code=" + params.code;
            var partnerLogin = new SFPartnerLogin({
              "partnerId": 'wechat_svm',
              "srcUid": srcUid,
              "authResp": authResp
            });
            partnerLogin.sendRequest().done(function(data) {
              if (data.tempToken) {
                var srcUid = params._ruser;
                store.set('tempToken', data.tempToken);
                window.location.href = 'http://' + window.location.hostname + '/invitation-bagNext.html#!&' + $.param({
                  tempToken: data.tempToken || null,
                  srcUid: srcUid
                });
              } else {
                 $('#hasGetpack').show();
              }
            })
            .fail(function(error) {
              console.log(error);
            });
          }
          var params = can.deparam(window.location.search.substr(1));
          var srcUid = params._ruser;
          var url = 'http://' + window.location.hostname + '/invitation-bag.html#!&' + $.param({
            srcUid: srcUid
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail('顺丰海淘给新人派送20元红包，用来买国外好物，不拿白不拿', '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20', url, imgUrl);
        }
      },

      '#getRedpackBtn click': function(element, event) {
        var wechatLogin = new SFWeChatLogin();
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this) && SFFn.isMobile.WeChat()) {
            wechatLogin.blogin(window.location.href);
        }else if(SFFrameworkComm.prototype.checkUserLogin.call(this) && SFFn.isMobile.WeChat()){
          $('#hasGetpack').show();
        }else if(SFFrameworkComm.prototype.checkUserLogin.call(this) && !SFFn.isMobile.WeChat()){
          $('#hasGetpack').show();
        }else if(!SFFrameworkComm.prototype.checkUserLogin.call(this) && !SFFn.isMobile.WeChat()) {
          var params = can.deparam(window.location.search.substr(1));
          var srcUid = params._ruser;
          window.location.href = 'http://' + window.location.hostname +'/invitation-bagNext.html#!&'+$.param({
            tempToken: null,
            srcUid: srcUid
          });
        }
      },

      '#closePopGetinfo click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/';
      },

      '#noSuccessBtn click': function(element, event) {
        var that = this;
        that.openApp('sfht://');

        setTimeout(function() {
          window.location.href = 'http://' + window.location.hostname + '/app.html';
        }, 600);
      },

      openApp: function(appUrl) {
        var u = navigator.userAgent ? navigator.userAgent.toLocaleLowerCase() : "";
        var isAndroid = (u.indexOf("android", 0) != -1) || (u.indexOf("adr", 0) != -1) ? 1 : 0,
          isChrome = isAndroid && u.indexOf("chrome", 0) != -1 && u.indexOf("nexus", 0) == -1;
        var ifr;
        if (document.getElementById("iframe_wakeup")) {
          ifr = document.getElementById("iframe_wakeup");
          ifr.setAttribute("src", appUrl)
        } else {
          ifr = document.createElement("iframe");
          ifr.id = "iframe_wakeup";
          ifr.style.cssText = "display:none;";
          ifr.setAttribute("src", appUrl)
        }
        document.getElementsByTagName("body")[0].appendChild(ifr);
        if (isChrome) {
          if (appUrl && appUrl.length > 0) {
            window.location.href = appUrl
          }
        }
      },

    });

    new myInvitation('.sf-b2c-mall-invitationbag');
  });