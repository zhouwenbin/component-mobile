define(
  'sf.b2c.mall.page.app',
  [
    'can',
    'zepto',
    'zepto.cookie',
    // 'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'zepto.fullpage',
    'store',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.receiveCoupon'
    // 'animate'
  ],
  function(can, $, $cookie, SFFrameworkComm, SFFn, Fullpage, store, SFConfig, SFMessage, SFReceiveCoupon) {
    // Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var appPage = can.Control.extend({
      /**
       * [init 初始化]
       */
      init: function() {

        if (window.clipboardData) {
          var _src = $.fn.cookie('_src');
          window.clipboardData.setData("_src", _src);
        }

        this.initFullPage();
        this.render();
        var that = this;
        //$("#openAddLink").click();

        // that.openApp('sfht://');


        // if (SFFn.isMobile.WeChat()) {
        //   $("#downloadAppBtn").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m");
        // } else if (SFFn.isMobile.iOS()) {
        //   $("#downloadAppBtn").attr("href", "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8");
        // } else if (SFFn.isMobile.Android()) {
        //   $("#downloadAppBtn").attr("href", "http://img.sfht.com/ios/sfht_sfhaitao.apk");
        // }

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

    var getCoupon =can.Control.extend({
      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        var that = this;

        if(SFFn.isMobile.APP()){
          $('#ifIsApp').text('App可签到领积分，下单抵用直减');
        }

        $("[data-name='cms-fill-coupon']").click(function(targetElement) {
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            new SFMessage(null, {
              'tip': '抱歉！需要登录后才可以领取优惠券！',
              'type': 'success',
              'okFunction': function(){
                window.location.href = "http://m.sfht.com/login.html?from=" + escape(window.location.href);
              }
            });
            return false;
          }

          var params = {
            bagId: $(targetElement.target).data('cms-couponbagid'),
            type: $(targetElement.target).data('cms-coupontype')
          }
          var needSms = $(targetElement.target).data('needsms');
          var smsCon = $(targetElement.target).data('smscon');
          if (needSms) {
            params.needSms = needSms;
          }
          if (smsCon) {
            params.smsCon = smsCon;
          }

          that.receiveCpCodeData(params);
        });

        return false;
      },

      errorMap: {
        "11000020": "卡券不存在",
        "11000030": "卡券已作废",
        "11000050": "卡券已领完",
        "11000100": "您已领过该券",
        "11000130": "卡包不存在",
        "11000140": "卡包已作废"
      },

      download: function () {
      
        if (SFFn.isMobile.WeChat()) {

          window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m";
          // $("#downloadAppBtn").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m");
        } else if (SFFn.isMobile.iOS()) {

          window.location.href = "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8";
          // $("#downloadAppBtn").attr("href", "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8");
        } else if (SFFn.isMobile.Android()) {

          window.location.href = "http://dl.sfht.com/app/sfht_sfhaitao.apk";
          // $("#downloadAppBtn").attr("href", "http://img.sfht.com/ios/sfht_sfhaitao.apk");
        }
        if (SFFn.isMobile.APP()){
          window.location.href = "http://m.sfht.com/index.html";
        }

      },

      receiveCpCodeData: function(params) {
        params.receiveChannel = 'B2C';
        params.receiveWay = 'ZTLQ';
        var that = this;
        var receiveCouponData = new SFReceiveCoupon(params);
        return can.when(receiveCouponData.sendRequest())
          .done(function(userCouponInfo) {
            new SFMessage(null, {
              'tip': '领取成功！',
              'type': 'success'
            });

            that.download();
          })
          .fail(function(error) {
            new SFMessage(null, {
              'tip': that.errorMap[error] || '网络不给力',
              'type': 'error',
              'okFunction': function(){
                that.download();
              }
            });
          });
      }
    });

    new appPage();
    new getCoupon();
  })
