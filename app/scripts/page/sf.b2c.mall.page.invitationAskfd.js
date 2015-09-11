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
    "sf.bridge",
    'sf.b2c.mall.module.header',
    'zepto.cookie',
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFmessage, SFweixin, SFbridge ,SFheader, $cookie){

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
        if(!SFFrameworkComm.prototype.checkUserLogin.call(this) && !SFFn.isMobile.WeChat()){
          var url = window.location.href;
          window.location.href = 'http://' + window.location.hostname + '/login.html?from=' + window.encodeURIComponent(url);
          return false;
        }
        if(SFFn.isMobile.WeChat()){
          var _ruser = $.fn.cookie('userId') || null;
          var url = 'http://' + window.location.hostname + '/invitation-bag.html?' + $.param({
            _ruser: _ruser
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail(
              '顺丰海淘给新人派送20元红包，用来买国外好货，不拿白不拿',
              '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20',
              url,
              imgUrl
          );
        }
      },

      sfBridge: function() {
        var url = 'http://' + window.location.hostname + '/invitation-bag.html';
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
        }else if(SFFn.isMobile.WeChat()){
          $('#shareZindex').show();
          $('#maskIdiv').show();
        }else {
          var that = this;
          that.openApp('sfht://');

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
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = window.location.href;
          window.location.href = 'http://' + window.location.hostname + '/login.html?from=' + window.encodeURIComponent(url);
          return false;
        };
        this.isToShareFn();
      },

      '#maskIdiv click': function(element,event){
        $('#shareZindex').hide();
        $('#maskIdiv').hide();
      },

    });
    new myInvitationAskfd('body');

  });