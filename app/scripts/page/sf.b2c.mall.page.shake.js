/**
 * sf.b2c.mall.page.shake.js
 * hybrid摇一摇
 * Created 2015-09-10 09:06.
 */
define(
  'sf.b2c.mall.page.shake',
  [
    'can',
    'zepto',
    'zepto.cookie',
    'fastclick',
    'underscore',
    'store',
    'moment',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.shake',
    'sf.bridge',
    'sf.b2c.mall.widget.loading',
    'sf.util',
    'sf.b2c.mall.widget.message',

    'sf.b2c.mall.api.shake.queryShakeResult',
    'sf.b2c.mall.api.shake.startShake',
    'sf.b2c.mall.api.shake.finishShake',
    'sf.b2c.mall.api.coupon.receiveCouponByYaoYiYao',

    'text!template_shake'
  ],
  function (can, $, $cookie, Faskclick, _, store, moment, SFFrameworkComm, SFConfig, shake, bridge, SFLoading, SFFn, SFmessage, shakeQueryApi, shakeStarApi, shakeFinishApi, YYYApi, shakeTpl) {
    'use strict';

    //注册环境是h5
    SFFrameworkComm.register(3);
    //console.log($.fn.cookie('userId'));
    Faskclick.attach(document.body);
    //console.log(shake)
    var loadingCtrl = new SFLoading(),
      shakeThis,
      shakeActivity = can.Control.extend({
        helpers: {
          'sf-isReceiveCoupon': function(a, options){
            //alert(a());
            return a() ? 'hide' : 'show';
          },
          'sf-notReceiveCoupon': function(a, options){
            return a() ? 'show' : 'hide';
          },
          'sf-isCanReceiveCoupon': function(a, b, options){
            //alert(a());
            var valA = a(),
              valV = b();
            if (valA){
              return 'show';
            }else{
              if (!valV){
                return 'show'
              }else{
                return 'hide';
              }
            }
            //return a() ? 'show' : 'hide';
          },
          'sf-isUsed': function(user, url, options){
            if (!user()){
              return 'href="'+ url() + '" class="btn-red"';
            }else {
              return 'class="btn-red grey"';
            }
          },
          'sf-isBuy': function(a, options){
            return a() ? 'show' : 'hide';
          },
          'sf-isOne': function(a, options){
            if ( a() === 0 ){
              return 'show';
            }else {
              return 'hide';
            }
            //return a() ? 'show' : 'hide';
          },
          'sf-noOne': function(a, options){
            if ( a() === 0 ){
              return 'hide';
            }else {
              return 'show';
            }
          }
        },
        init: function(){
          shakeThis = this;
          this.options.ownData = {};    //用于存放js计算或获取的数据
          this.options.serverData = new can.Map({});  //用于存放从服务器获取的数据
          //测试变量
          //this.options.ownData.num = 0;
          //console.log(shakeThis);
          //判断是否登陆
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            $(this.element).append('<div class="shaked-btns login-yao"><a class="btn-yellow" href="'+ SFConfig.setting.link.login + '&from=' + escape(window.location.href) +'">去登录</a></div>');
            window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.href);
            return false;
          }

          //alert(location.search);
          //显示蒙层
          $(this.element).empty();
          loadingCtrl.show();
          this.render();
        },
        render: function(){
          var _this = this,
            options = _this.options,
            dom = this.element,
            shakeTp = can.mustache(shakeTpl),
            html = '',
            nowTime = new Date(),
          //分解url参数
            href = window.location.href,
            hrefNum = href.indexOf('#!'),
            search = href.substring(hrefNum+3),
            searchArr = search.split('&'),
            searchVal = '',

            shakeQuery ;
          //alert(search);
          for (var i = searchArr.length - 1; i >=0; i--){
            searchVal = searchArr[i].split('=');
            if ( searchVal[0] === 'itemId' ){
              //存放itemId
              options.ownData.itemId = searchVal[1];
            }
            if ( searchVal[0] === 'title'){
              //存放title
              options.ownData.title = searchVal[1];
            }
            if (searchVal[0] === 'cookieInfo'){
              //存放用户cookie值，在app里
              options.ownData.cookieInfo = searchVal[1].split('%2C')[3];
            }
          }
          //初始化相关数据并储存到this.options
          //存放时间yy-mm-dd
          options.ownData.formatDate = moment(nowTime).format('YYYY-MM-DD');
          //存放用户id
          //options.ownData.userId =  $.fn.cookie('userId');
          //console.log(options);
          shakeQuery = new shakeQueryApi({
            date: options.ownData.formatDate,
            userId: options.ownData.cookieInfo ? options.ownData.cookieInfo : $.fn.cookie('userId'),
            //userId: 12345,
            couponId: options.ownData.couponId || 0,
            itemId: options.ownData.itemId
          });
          //alert(options.ownData.itemId);
          shakeQuery.sendRequest()
            .done(function(data){
              //alert(JSON.stringify(data));
              //console.log(data);
              options.serverData.attr('shakeData',{
                isReceiveCoupon: data.isReceiveCoupon,  //是否领券,true是领了
                //isReceiveCoupon: true,
                maxFightingCapacity: data.maxFightingCapacity.toFixed(0),  //当前最大战斗力
                maxImpact: data.maxImpact,    //当天最大影响力
                imageUrl: data.itemImage,   //图片链接
                couponTitle: data.couponTitle,   //优惠券标题
                couponDateString: data.couponDateString,   //优惠券日期
                couponUrl: data.couponUrl,     //优惠券链接
                couponCondition: data.couponCondition, //优惠券使用条件,
                //buyUrl: 'http://' + window.location.hostname + '/detail/'+ options.ownData.itemId + '.html',  //去购买url
                buyUrl: data.couponUrl,
                itemTitle: data.itemTitle,     //商品标题
                couponPrice: data.couponPrice,    //优惠券价格
                isUsed: data.isCouponAlreadyUsed,  //优惠券是否用过，true是用了 false是没用
                itemSellPriceAfterCoupon: data.itemSellPriceAfterCoupon / 100,
                ifOne: false,
                help: false,
                Yao: false
              });
              //console.log(options);
              //options.serverData.attr('shakeData.impact', '')
              //alert(JSON.stringify(options.serverData.queryData));
              //console.log(options);
             // console.log(shakeTpl);
              html = shakeTp(options.serverData, _this.helpers);
              //alert(html);
              $(dom).append(html);
              if (data.isReceiveCoupon){
                window.bridge.run('SFNavigation', 'setRightButton', '分享', function(){_this.sfBridge();}, function(){});
              }
            })
            .fail(function(err){
              //alert(err);
              alert('查询失败');
             // alert('xxx');
            });

          loadingCtrl.hide();
          _this.shakeControl();
          _this.isToShareFn();
          //测试
          //var tpl = can.mustache(shakeTmp),
          //  data = new can.Map({
          //    a: 'xxx'
          //  }),
          //  html = tpl(data, _this.helpers);
          //_this.elements.append(html);


        },
        shakeControl: function(){
          //alert('让他摇');
          //开启摇晃监控
          var _this = this;
          if (shake.isSupport()){
            //如果支持监控摇晃，初始化监控，并传入开始，结束方法
            shake.init({
              'storeId': 'Yao_arr',
              'starFun': _this.shakeStar,
              'endFun': _this.shakeEnd,
              'ingFun': _this.shakeIng
            });
          }
          //测试
          //_this.shakeEnd();
        },
        shakeStar: function(){
          //定义开始摇晃方法
          //alert(5);
          //alert(window.location.href);
          //alert(document.cookie);
          //$('#sh-b2c-mall-shake').append('---->开始摇!<br>');
          var _this = shakeThis,
            options = _this.options,
            //dom = _this.element,
            shakeStar,
            gps,
            clock = true,
            clockFun = function(err){
              //alert(err);
              clock = true;
            },
          //alert(_this);
            gpsSuccess = function(data){
              if (!clock){
                return;
              }
              clock = false;
              //alert(JSON.stringify(data));
              if (_.isArray(data)){
                options.ownData.locationType = 'GCJ';
                gps  = data[0];
              }else if (_.isObject(data)){
                options.ownData.locationType = 'WSG';
                gps = data;
              }
              options.ownData.location = {
                longitude: gps.longitude,
                latitude: gps.latitude
              };
              //alert(JSON.stringify(_this.options.ownData.location));
              //alert(_this.options.locationType);
              //隐藏多余的结束摇dom
              //$(_this.element).find('.shaked.help').addClass('hide');
              shakeStar = new shakeStarApi({
                location: JSON.stringify(options.ownData.location),
                locationType: options.ownData.locationType
              });
              //alert(JSON.stringify(options.ownData.location));
              //alert(options.ownData.locationType);
              shakeStar
                .sendRequest()
                .done(function(data){

                  //alert(JSON.stringify(data));
                  if (!data.value){
                    _this.shakeStar();
                    //alert(data);
                  }

                })
                .fail(function(err){
                  //alert(err);
                  alert('网络不稳定，请在摇');

                });

              window.bridge.run('SFLocation', 'stop', null, clockFun, clockFun);
            },
            gpsError = function(data){
              //console.log(data);
              window.bridge.run('SFLocation', 'stop', null, clockFun, clockFun);
            }
            ;

          //存放用户当前坐标

          //this.options.location = {
          //  longitude: 121.4267778396,  //经度
          //  latitude: 31.1960404553   //维度
          //};
          //this.options.locationType = 'WSG||GCJ'; //WSG是国际标准即IOS所用，GCJ是国标即Android所用
          //alert(window.bridge);
          window.bridge.run('SFLocation', 'start', {}, gpsSuccess, gpsError);

        },
        shakeIng: function(){
          //定义摇晃过程中方法
          //$('#sh-b2c-mall-shake').append('----一直在摇----<br>');
        },
        shakeEnd: function(){
          //定义摇晃结束时方法
          //window.bridge.run('SFShake', 'stop');
          //$('#sh-b2c-mall-shake').append('结束摇-----><br><br>');
          //统计本次摇晃战斗值，并比较若为当前最大存入本地储存
          var _this = shakeThis,
            dom = _this.element,
            options = _this.options,
            yaoArr = store.get('Yao_arr'),
            yaoArrLen = yaoArr.length,
            total = 0,
            coupon = Number(store.get('maxCoupon')) || 0,
            maxFightVal = store.get('maxFightVal') || 0,
          //初始化借口
            shakeFinish,
            ifOne = false,
            help = false
            ;
          for (var i = yaoArrLen; i > 0; i--){
            total += Math.abs(yaoArr[i-1]);
          }
          options.ownData.fighting = ((total / yaoArrLen) * 100).toFixed(0);
          //$('#store').empty().append(fighting);
          if ( options.ownData.fighting > maxFightVal ){
            store.set('maxFightVal', options.ownData.fighting);
          }
          //alert(typeof Number(fighting));
          $(dom).find('#matching').removeClass('hide');
          shakeFinish = new shakeFinishApi({
            location: JSON.stringify(options.ownData.location),
            locationType: options.ownData.locationType,
            item: options.ownData.itemId,
            fightingCapacity: Number(options.ownData.fighting)
          });
          //alert(options.ownData.itemId);


          setTimeout(function(){
            shakeFinish
              .sendRequest()
              .done(function(data){
                $(dom).find('#matching').addClass('hide');
                //alert('abc');
                //alert(JSON.stringify(data));
                //alert(options.ownData.num);

                //options.serverData.attr('shakeData', {
                //  canReceiveCoupon: data.canReceiveCoupon,   //是否可以领券 true是可以领
                //  impact: data.impact,     //影响力
                //  fightingCapacity: options.ownData.fighting,
                //  couponRank: data.couponRank,  //优惠券等级
                //  couponId: data.couponId,     //如果可以领券，此为领券ID
                //  text: '文案'
                //});

                if (data.impact  === 0){
                  ifOne = true;
                }else {
                  if (!data.canReceiveCoupon){
                    help = true;
                  }
                }
                //alert(help);
                //alert(data.canReceiveCoupon);
                options.serverData.attr('shakeData.Yao', true);
                options.serverData.attr('shakeData.impact', data.impact);
                options.serverData.attr('shakeData.fightingCapacity', options.ownData.fighting);
                options.serverData.attr('shakeData.ifOne', ifOne);
                options.serverData.attr('shakeData.help', help);

                if ( data.canReceiveCoupon ){
                  options.serverData.attr('shakeData.buyUrl', data.couponUrl);
                  options.serverData.attr('shakeData.canReceiveCoupon', data.canReceiveCoupon);
                  options.serverData.attr('shakeData.maxImpact', data.maxImpact);
                  options.serverData.attr('shakeData.maxFightingCapacity', data.maxFightingCapacity);
                  options.serverData.attr('shakeData.couponRank', data.couponRank);
                  options.serverData.attr('shakeData.text', data.text);
                  options.serverData.attr('shakeData.couponId', data.couponId);
                  options.serverData.attr('shakeData.itemImage', data.itemImage);
                  options.serverData.attr('shakeData.itemTitle', data.itemTitle);
                  options.serverData.attr('shakeData.couponTitle', data.couponTitle);
                  options.serverData.attr('shakeData.itemSellPriceAfterCoupon', data.itemSellPriceAfterCoupon / 100);
                  options.serverData.attr('shakeData.couponStartDate', data.couponStartDate);
                  options.serverData.attr('shakeData.couponUrl', data.couponUrl);
                  options.serverData.attr('shakeData.couponEndDate', data.couponEndDate);

                }
               // alert();
                options.serverData.attr('shakeData.buyUrl');
                //options.serverData.attr('shakeData.itemTitle', data.itemTitle);

                //alert(JSON.stringify(options.serverData.attr('shakeData')));
                //alert('执行1');
                //判断当前的券是否相对大
                if ( data.couponId >= coupon ){
                  store.set('maxCoupon', data.couponId);
                }
                //alert('执行2');
                $(dom).find('#shaking').addClass('hide');
                $(dom).find('#shakend').removeClass('hide');
                //alert(ifOne);
                //alert(help);
                //alert(options.serverData.attr('finishData'));
                //if (!ifOne || !help){
                //  if (options.serverData.attr('shakeData').canReceiveCoupon){
                //    $(dom).find('.shaked-btns').removeClass('hide');
                //  }
                //}

                //alert('执行3');
                //if (options.ownData.num > 0){
                //  //alert('ling');
                //  //options.serverData.attr('shakeData', {
                //  //  canReceiveCoupon: data.canReceiveCoupon,   //是否可以领券 true是可以领
                //  //  //canReceiveCoupon: true,
                //  //  impact: data.impact,     //影响力
                //  //  fightingCapacity: options.ownData.fighting,
                //  //  couponRank: data.couponRank,  //优惠券等级
                //  //  couponId: data.couponId,     //如果可以领券，此为领券ID
                //  //  text: '文案',
                //  //  isReceiveCoupon: true
                //  //});
                //  options.serverData.attr('shakeData.canReceiveCoupon', true);
                //}
                // alert('执行4');

                //可以分享了
                //options.ownData.num = 1;
                //alert(options.ownData.num);
                setTimeout(function(){
                  _this.shakeControl();
                }, 1000);
                //alert('执行bridge前');
                // _this.sfBridge();
                //alert('执行bridge后');


              })
              .fail(function(err){
                //alert(err);
                $(dom).find('#matching').addClass('hide');
                alert('结束失败');
                setTimeout(function(){
                  _this.shakeControl();
                }, 1000)
              });
          }, 3000);
        },
        //注册交互时间
        '#reYao click': function(){
          //放弃重摇
          window.bridge.run('SFNavigation', 'setRightButton', '', function(){}, function(){});
          var _this = this,
            dom = _this.element;
          //$(dom).find('.shaked-btns').addClass('hide');
          $(dom).find('#shakend').addClass('hide');
          $(dom).find('#shaking').removeClass('hide');
          return false;
        },
        '#helpFriend click': function(){
          //帮摇
          window.bridge.run('SFNavigation', 'setRightButton', '', function(){}, function(){});
          var _this = this,
            dom = _this.element;
          //$(dom).find('.shaked-btns').addClass('hide');
          $(dom).find('#shaking').removeClass('hide');
          $(dom).find('#shakend').addClass('hide');
          return false;
        },
        '#lookCoupon click':function(){
          //查看我的券
          var _this = this,
            options = _this.options;
          options.serverData.attr('shakeData.help', false);
          window.bridge.run('SFNavigation', 'setRightButton', '分享', function(){_this.sfBridge();}, function(){});
        },
        '#imReceive click': function(){
          //请求优惠券
          var _this = this,
            dom = _this.element,
            couponId = Number(store.get('maxCoupon')),
            options = _this.options,
            yCoupon = new YYYApi({
              couponId: couponId,
              receiveChannel: 'B2C',
              receiveWay: 'YYY',
              needSms: 0,
              smsCon: ''
            });
          //alert(store.get('maxCoupon'));
          //alert(JSON.stringify({
          //    couponId: couponId,da
          //    receiveChannel: 'B2C',
          //    receiveWay: 'YYY',
          //    needSms: 0,
          //    smsCon: '1'
          //));
          yCoupon
            .sendRequest()
            .done(function(data){
              //
              options.serverData.attr('shakeData.canReceiveCoupon', false);
              $(dom).find('#getCoupon')
                .removeClass('hide');
              setTimeout(function(){
                $(dom).find('#getCoupon').addClass('hide');
              }, 1000);
              window.bridge.run('SFNavigation', 'setRightButton', '分享', function(){_this.sfBridge();}, function(){});
              $(this.element).find('.shaked-btns.to-buy').removeClass('hide');
            })
            .fail(function(err){
              //alert(err);
              $(dom).find('#noCoupon').removeClass('hide');
              setTimeout(function(){
                $(dom).find('#noCoupon').addClass('hide');
              }, 1000);
            });
          //alert($(dom).find('.tooltip.center').html());

          return false;
        },
        sfBridge: function() {

          var _this = this,
            options = _this.options,
            url = 'http://' + window.location.hostname + '/shake-share.html#!'
                 + 'userId=' + options.ownData.cookieInfo
                 + '&date='+ options.ownData.formatDate
                 + '&itemId='+ options.ownData.itemId;
            alert(url);
            var params = {
              "subject": '摇一摇',
              "description": '摇啊摇',
              "imageUrl": 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg',
              "url": url
            },
            success = function(data) {
              // var message = new SFmessage(null, {
              //   'tip': '分享成功',
              //   'type': 'success',
              //   'okFunction': function() {},
              // });
              console.log('success');
            },
            error = function(data) {
              // var message = new SFmessage(null, {
              //   'tip': '分享失败',
              //   'type': 'error',
              //   'okFunction': function() {},
              // });
              console.log('error');
            };
          //alert(url);
          window.bridge.run('SocialSharing', 'share', params, success, error);
        },
        isToShareFn: function(element, event) {
          //判断app版本
          var version = can.route.attr('version');
          version = version ? version : '1.4.0';
          var verArr = version.split('.');
          var verInt = verArr[0] + verArr[1] + verArr[2];
          if (SFFn.isMobile.APP()) {
            if (SFFn.isMobile.iOS() && verInt >= 150) {
              alert(verInt);
              //this.sfBridge();
            } else if (SFFn.isMobile.iOS() && verInt < 150) {
              var message = new SFmessage(null, {
                'tip': '当前版本不支持该活动，请下载新版本',
                'type': 'success',
                'okFunction': function() {}
              });
            }

            if (SFFn.isMobile.Android() && verInt >= 140) {
              //this.sfBridge();
              alert(verInt);
            } else if (SFFn.isMobile.Android() && verInt < 140) {
              var message = new SFmessage(null, {
                'tip': '当前版本不支持该活动，请下载新版本',
                'type': 'success',
                'okFunction': function () {
                }
              });
            }
          }
        }
    });
    new shakeActivity('#sh-b2c-mall-shake');
});