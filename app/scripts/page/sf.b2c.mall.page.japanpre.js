define(
  'sf.b2c.mall.page.japanpre',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.weixin',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFWeixin, SFBusiness) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var japanPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        SFWeixin.shareDetail(title, desc, link, imgUrl);

        var thumbList = $(".mjapan-video-pic-list");

        $(".japan-video-box").on("click", ".mjapan-before", function() {
          var left = getLeft();
          if (left === 0) {
            return;
          }
          thumbList.animate({
            left: left - 141
          })
          return false;
        })
        .on("click", ".mjapan-after", function() {

          var left = getLeft();
          if (left === 0) {
            return;
          }
          thumbList.animate({
            left: left + 141
          })
          return false;
        });

        $(".mjapan-video-pic-list").on("click", "li", function() {
          $(this).siblings(".active").removeClass("active");
          $(this).addClass("active");
          var videoLis = $(".mjapan-video-list li");

          var index = thumbList.find("li").index($(this));
          var hideDest;
          _.each(videoLis, function(item, index, list) {
            if ($(item).css("display") != "none") {
              hideDest = $(item);
            }
          })
        hideDest.hide();
        hideDest.find(".mjapan-video-box").hide();
        hideDest.find("video")[0].pause();
        var destination = $(".mjapan-video-list li").eq(index);
        destination.show();
        });


        var getLeft = function() {
        var left = thumbList.css("left");
          if (left == "auto") {
            left = 0;
          } else {
            left = left.substr(0, left.length - 2);
          }
          
          return Number.parseInt(left, 10);
        };
        $(".mjapan-video-list li").on("click", function() {
          $(this).find(".mjapan-video-box").show();
          $(this).find("video")[0].play();
        });


        
      }

    });

    new japanPage();
  })
