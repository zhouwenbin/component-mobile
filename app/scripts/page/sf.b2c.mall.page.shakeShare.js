define(
  'sf.b2c.mall.page.shakeShare',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.shake.queryShakeResult',

    'text!template_shake_share'
  ],
  function (can, $, Faskclick, SFConfig, SFLoad, SFFrameworkComm, queryShakeApi, shakeShareTpl) {
    //注册环境是h5
    SFFrameworkComm.register(3);
    //console.log($.fn.cookie('userId'));
    Faskclick.attach(document.body);
    var loadingCtrl = new SFLoad(),
      shakeShare = can.Control.extend({
        helpers: {},
        init: function(){
          this.options.userData = {};
          this.options.serverData = new can.Map({});
          this.render();
        },
        render: function(){
          var _this = this,
            dom = _this.element,
            options = _this.options,
            shareTpl = can.mustache(shakeShareTpl),
            html = '',
            Share;
          options.userData.userId = can.route.attr('userId');
          options.userData.date = can.route.attr('date');
          options.userData.itemId = can.route.attr('itemId');
          //console.log(options);
          Share = new queryShakeApi({
            date: options.userData.date,
            userId: options.userData.userId ? options.userData.userId : 0,
            itemId: options.userData.itemId ? options.userData.itemId : 0,
            couponId: options.userData.couponId ? options.userData.couponId : 0
          });
          Share
            .sendRequest()
            .done(function(data){
              options.serverData.attr('shareData', {
                isReceiveCoupon: data.isReceiveCoupon,  //是否领券,true是领了
                //isReceiveCoupon: true,
                maxFightingCapacity: data.maxFightingCapacity,  //当前最大战斗力
                maxImpact: data.maxImpact,    //当天最大影响力
                imageUrl: data.itemImage,   //图片链接
                couponTitle: data.couponTitle,   //优惠券标题
                couponDateString: data.couponDateString,   //优惠券日期
                couponUrl: data.couponUrl,     //优惠券链接
                couponCondition: data.couponCondition, //优惠券使用条件
                link: '摇啊摇',
                itemSellPriceAfterCoupon: data.itemSellPriceAfterCoupon / 100
              });

              html = shareTpl(options.serverData);
              //console.log(html);
              $(dom).append(html);
              //console.log(data);

            })
            .fail(function(err){
              alert('网络不稳定，请重试');
            });


        },
        '#toYao click': function(){
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
        }
      });

    new shakeShare('#sh-b2c-mall-shake-share')
  });