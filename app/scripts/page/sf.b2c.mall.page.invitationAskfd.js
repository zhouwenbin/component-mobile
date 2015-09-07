'use strict';

define(
  'sf.b2c.mall.page.invitationAskfd', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.widget.message',
    'sf.weixin',
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFmessage, SFweixin){

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var myInvitationAskfd = can.Control.extend({

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function(element, options) {
        this.render();
      },
      render: function() {
        var that = this;
        if(SFFn.isMobile.WeChat()){
          var url = window.location.href;
          var userid = $.fn.cookie('userId');
          SFWeixin.shareDetail('顺丰海淘的老友计，很有意思，进来看看吧','顺丰海淘客户把好东西分享给新伙伴就可以赚现金',286,userid)
        }
      },

      sfBridge: function() {
        var ruser = can.route.attr('_ruser');
        var url = 'http://' + window.location.hostname + '/invitation-bag.html#!&' + $.param({
          _ruser: ruser
        });
        var params = {
          "subject": '顺丰海淘给新人派送20元红包，用来买国外好货，不拿白不拿',
          "description": '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20',
          "imageUrl": 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg',
          "url": url
        };
        var success = function(data) {
          var message = new SFmessage(null, {
            'tip': '分享成功',
            'type': 'success',
            'okFunction': function() {},
          });
        };
        var error = function(data) {
          var message = new SFmessage(null, {
            'tip': '分享失败',
            'type': 'error',
            'okFunction': function() {},
          });
        };
        window.bridge.run('SocialSharing', 'share', params, success, error);
      },

      isToShareFn: function(element, event) {
        var version = can.route.attr('version');
        version = version ? version : '1.4.0';
        var verArr = version.split('.');
        var verInt = verArr[0] + verArr[1] + verArr[2];
        if (SFFn.isMobile.APP()) {
          if (SFFn.isMobile.iOS() && verInt >= 140) {
            this.sfBridge();
          } else if (SFFn.isMobile.iOS() && verInt < 140) {
            var message = new SFmessage(null, {
              'tip': '当前版本不支持该活动，请下载新版本',
              'type': 'success',
              'okFunction': function() {}
            });
          };

          if (SFFn.isMobile.Android() && verInt >= 135) {
            this.sfBridge();
          } else if (SFFn.isMobile.Android() && verInt < 135) {
            var message = new SFmessage(null, {
              'tip': '当前版本不支持该活动，请下载新版本',
              'type': 'success',
              'okFunction': function() {},
            });
          };
        } else {
          var that = this;
          that.openApp('sfht://');
          if (SFFn.isMobile.WeChat()) {
            $("#noSuccessBtn").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m");
          } else if (SFFn.isMobile.iOS()) {
            $("#noSuccessBtn").attr("href", "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8");
          } else if (SFFn.isMobile.Android()) {
            $("#noSuccessBtn").attr("href", "http://dl.sfht.com/app/sfht_sfhaitao.apk");
          }

          setTimeout(function(){
            window.location.href='http://' + window.location.hostname + '/app.html';
          }, 600);
        }
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

      '#invitationAskfdBtn click': function(element,event){
          this.isToShareFn();
      },

    });
    new myInvitationAskfd('body');

  });