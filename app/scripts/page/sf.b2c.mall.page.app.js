define(
  'sf.b2c.mall.page.app',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'zepto.fullpage'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, Fullpage) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var appPage = can.Control.extend({
      /**
       * [init 初始化]
       */
      init: function() {
        //this.initFullPage();
        this.render();
        var that = this;

        //$("#openAddLink").click();

        that.openApp('sfht://');


        if (SFFn.isMobile.WeChat()) {
          $("#downloadAppBtn").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m");
        } else if (SFFn.isMobile.iOS()) {
          $("#downloadAppBtn").attr("href", "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8");
        } else if (SFFn.isMobile.Android()) {
          $("#downloadAppBtn").attr("href", "http://img.sfht.com/ios/sfht_sfhaitao.apk");
        }

        // setTimeout(function(){
        //   if (SFFn.isMobile.iOS()) {
        //     //window.location.href = "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8";
        //     that.openApp('https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8');
        //     //$("iframe").attr("src", 'https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8');
        //   } else if (SFFn.isMobile.Android()) {
        //     that.openApp('http://img.sfht.com/ios/sfht_sfhaitao.apk');
        //     //$("iframe").attr("src", 'http://img.sfht.com/ios/sfht_sfhaitao.apk');
        //   }
        // }, 600);
      },

      initFullPage: function() {
        $('.wp-inner').fullpage({
          loop:true
        });
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

      /**
       * [render 渲染]
       */
      render: function() {
        var that = this;
      }

    });

    new appPage();
  })
