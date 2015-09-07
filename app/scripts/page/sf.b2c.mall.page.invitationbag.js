'use strict';

define(
  'sf.b2c.mall.page.invitationbag', [
    'can',
    'zepto',
    'fastclick',
    'sf.util',
    'store',
    'sf.b2c.mall.api.coupon.hasReceivedCp',
    'sf.b2c.mall.framework.comm',
    'text!template_center_invitationbag',
    'sf.b2c.mall.widget.login',
    'sf.b2c.mall.api.user.partnerLogin',
    'sf.b2c.mall.api.user.ptnBindAndRcvCp'
  ],

  function(can, $, Fastclick, SFFn, store, SFHasReceivedCp, SFFrameworkComm, template_center_invitationbag, SFWeChatLogin, SFPartnerLogin, SFptnBindAndRcvCp) {

    SFFrameworkComm.register(3);
    var bagid = 286;

    var myInvitation = can.Control.extend({

      init: function(element, options) {

        this.render();
      },

      render: function() {
        var that = this;
        this.data = {};
        var renderFn = can.mustache(template_center_invitationbag);
        that.options.html = renderFn(that.data, that.helpers);
        that.element.html(that.options.html);
        if (SFFn.isMobile.WeChat()) {
          var url = window.location.href;
          var userid = $.fn.cookie('userId');
          SFWeixin.shareDetail('顺丰海淘的老友计，很有意思，进来看看吧', '顺丰海淘客户把好东西分享给新伙伴就可以赚现金', 286, userid)
        }
      },

      initHasReceivedCp: function(bagId) {
        var that = this;
        var params = {
          "bagId": bagId,
          "bagType": "CARD"
        };
        var hasReceivedCp = new SFHasReceivedCp(params);
        return hasReceivedCp.sendRequest()
          .done(function(boolResp) {
            that.data.isHasReceived = boolResp.value;
          })
      },

      '#getRedpackBtn click': function(element, event) {
        var wechatLogin = new SFWeChatLogin();
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          if (SFFn.isMobile.WeChat()) {
            wechatLogin.login(window.location.href);
          }
        } else {
          if (SFFn.isMobile.WeChat()) {
            var params = can.deparam(window.location.search.substr(1));
            var srcUid = can.route.attr('_ruser');
            var authResp = "code=" + params.code;
            var partnerLogin = new SFPartnerLogin({
              "partnerId": 'wechat_svm',
              "srcUid": srcUid,
              "authResp": authResp
            });
            partnerLogin.sendRequest().done(function(data) {
              if (data.tempToken) {
                store.set('tempToken', data.tempToken);
                var srcUid = srcUid;
                window.location.href = 'http://' + window.location.hostname + '/invitation-bagNext.html&#!' + $.param({
                  tempToken: data.tempToken || null,
                  srcUid: srcUid
                });
              } else {
                $('#hasGetpack').show();
              }
            });
          } else {
            $('#hasGetpack').show();
          }
        }
      },

      '#closePopGetinfo click': function(element, event) {
        $('#hasGetpack').hide();
      },

      '#noSuccessBtn click': function(element, event) {
        //window.location.href = 'http://' + window.location.hostname + '/app.html';
        var that = this;
        that.openApp('sfht://');
        if (SFFn.isMobile.WeChat()) {
          $("#noSuccessBtn").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m");
        } else if (SFFn.isMobile.iOS()) {
          $("#noSuccessBtn").attr("href", "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8");
        } else if (SFFn.isMobile.Android()) {
          $("#noSuccessBtn").attr("href", "http://dl.sfht.com/app/sfht_sfhaitao.apk");
        }

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