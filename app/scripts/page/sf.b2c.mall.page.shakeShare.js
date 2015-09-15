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
            href = window.location.href,
            hrefNum = href.indexOf('#!'),
            search = href.substring(hrefNum+3),
            searchArr = search.split('&'),
            searchVal,
            shareTpl = can.mustache(shakeShareTpl),
            html = '',
            Share;
          for (var i = searchArr.length - 1; i >= 0; i--){
            searchVal = searchArr[i].split('=');
            if (searchVal[0] === 'userId'){
              options.userData.userId = searchVal[1];
            }
            if (searchVal[0] === 'date'){
              options.userData.date = searchVal[1];
            }
            if (searchVal[0] === 'itemId'){
              options.userData.itemId = searchVal[1];
            }
            if (searchVal[0] === 'couponId'){
              options.userData.couponId = searchVal[1];
            }
          }
          console.log(options);
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
                imageUrl: data.imageUrl,   //图片链接
                couponTitle: data.couponTitle,   //优惠券标题
                couponDateString: data.couponDateString,   //优惠券日期
                couponUrl: data.couponUrl,     //优惠券链接
                couponCondition: data.couponCondition, //优惠券使用条件
                link: '摇啊摇'
              });

              html = shareTpl(options.serverData);
              console.log(html);
              $(dom).append(html);
              console.log(data);

            })
            .fail(function(err){
              console.log(err)
            });


        }
      });

    new shakeShare('#sh-b2c-mall-shake-share')
  });