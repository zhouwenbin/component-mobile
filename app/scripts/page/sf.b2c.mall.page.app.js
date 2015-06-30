define(
  'sf.b2c.mall.page.app',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var appPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        this.render();
        //$("#openAddLink").click();
        
        // $('iframe').attr('src', 'sfht://');

        if (SFFn.isMobile.WeChat()) {
          $("#downloadAppBtn").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.sfht.m");
        } else if (SFFn.isMobile.iOS()) {
          $("#downloadAppBtn").attr("href", "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8");
        } else if (SFFn.isMobile.Android()) {
          $("#downloadAppBtn").attr("href", "http://img.sfht.com/ios/sfht_sfhaitao.apk"); 
        }

        setTimeout(function(){
          if (SFFn.isMobile.iOS()) {
            //window.location.href = "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8";
            $("iframe").attr("src", 'https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8');
          } else if (SFFn.isMobile.Android()) {
            $("iframe").attr("src", 'http://img.sfht.com/ios/sfht_sfhaitao.apk');
          } else {

          }
          
        },600); 
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
