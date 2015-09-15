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

    'sf.b2c.mall.api.shake.queryShakeResult',
    'sf.b2c.mall.api.shake.startShake',
    'sf.b2c.mall.api.shake.finishShake',

    'text!template_shake',
    'text!template_shake_end'
  ],
  function (can, $, $cookie, Faskclick, _, store, moment, SFFrameworkComm, SFConfig, shake, bridge, SFLoading, shakeQueryApi, shakeStarApi, shakeFinishApi, shakeTpl, shakeEndTpl) {
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
            return a() ? 'hide' : '';
          },
          'sf-isCanReceiveCoupon': function(a, options){
            //alert(a());
            return a() ? '' : 'hide';
          }
        },
        init: function(){
          shakeThis = this;
          this.options.ownData = {};    //用于存放js计算或获取的数据
          this.options.serverData = new can.Map({});  //用于存放从服务器获取的数据
          //console.log(shakeThis);
          //判断是否登陆
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
            return false;
          }

          //alert(location.search);
          //显示蒙层
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

          shakeQuery = new shakeQueryApi({
            date: options.ownData.formatDate,
            userId: options.ownData.cookieInfo ? options.ownData.cookieInfo : $.fn.cookie('userId')
          });
          shakeQuery.sendRequest()
            .done(function(data){
              //alert(JSON.stringify(data));
              options.serverData.attr('queryData',{
                isReceiveCoupon: data.isReceiveCoupon,  //是否领券,true是领了
                //isReceiveCoupon: true,
                maxFightingCapacity: data.maxFightingCapacity,  //当前最大战斗力
                maxImpact: data.maxImpact,    //当天最大影响力
                imageUrl: data.imageUrl,   //图片链接
                couponTitle: data.couponTitle,   //优惠券标题
                couponDateString: data.couponDateString,   //优惠券日期
                couponUrl: data.couponUrl,     //优惠券链接
                couponCondition: data.couponCondition //优惠券使用条件
              });
              //alert(JSON.stringify(options.serverData.queryData));
              //console.log(options);
             // console.log(shakeTpl);
              html = shakeTp(options.serverData, _this.helpers);
              //alert(html);
              $(dom).append(html);
            })
            .fail(function(err){
              alert(err);
              alert('查询失败');
            });

          loadingCtrl.hide();
          this.shakeControl();
          //测试
          //var tpl = can.mustache(shakeTmp),
          //  data = new can.Map({
          //    a: 'xxx'
          //  }),
          //  html = tpl(data, _this.helpers);
          //_this.elements.append(html);


        },
        shakeControl: function(){
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
            shakeStar,
            gps,
            clock = true,
            clockFun = function(){
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
              //alert(JSON.stringify(_this.options.location));
              //alert(_this.options.locationType);
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
                  alert(err);
                  alert('网络不稳定，请在哟');

                });

              window.bridge.run('SFLocation', 'stop', null, clockFun, clockFun);
            },
            gpsError = function(data){
              console.log(data);
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
            maxFightVal = store.get('maxFightVal') || 0,
          //初始化借口
            shakeFinish,
            finishHtml = '',
            finishTp = can.mustache(shakeEndTpl)
            ;
          for (var i = yaoArrLen; i > 0; i--){
            total += Math.abs(yaoArr[i-1]);
          }
          options.ownData.fighting = ((total / yaoArrLen) * 1000).toFixed(2);
          //$('#store').empty().append(fighting);
          if ( options.ownData.fighting > maxFightVal ){
            store.set('maxFightVal', options.ownData.fighting);
          }
          //alert(typeof Number(fighting));
          shakeFinish = new shakeFinishApi({
            location: JSON.stringify(options.ownData.location),
            locationType: options.ownData.locationType,
            item: options.ownData.itemId,
            fightingCapacity: Number(options.ownData.fighting)
          });
          //alert(options.ownData.itemId);

          shakeFinish
            .sendRequest()
            .done(function(data){
              alert(JSON.stringify(data));

              options.serverData.attr('finishData', {
                canReceiveCoupon: data.canReceiveCoupon,   //是否可以领券 true是可以领
                impact: data.impact,     //影响力
                fightingCapacity: options.ownData.fighting,
                couponRank: data.couponRank,  //优惠券等级
                couponId: data.couponId,     //如果可以领券，此为领券ID
                text: '文案'
              });

              //alert(options.serverData.finishData.fightingCapacity);
              if ( $(dom).find('#shakend').length === 1 ){
                if (options.serverData.attr('finishData').canReceiveCoupon){
                  $(dom).find('.shaked-btns').removeClass('hide');
                }
                options.serverData.attr('finishData', {
                  canReceiveCoupon: true,
                  //canReceiveCoupon: data.canReceiveCoupon,   //是否可以领券 true是可以领
                  impact: data.impact,     //影响力
                  fightingCapacity: options.ownData.fighting,
                  couponRank: data.couponRank,  //优惠券等级
                  couponId: data.couponId,     //如果可以领券，此为领券ID
                  text: '文案'
                });
                //options.serverData.finishData.attr('')
                return false;
              }
              //alert(JSON.stringify(options.serverData.finishData));
              finishHtml = finishTp(options.serverData, _this.helpers);
              $(dom).find('#shaking').addClass('hide');
              //alert($(dom).find('#shaking').html());
              $(dom).append(finishHtml);

            })
            .fail(function(err){
              alert(err);
              alert('结束失败');
            });
        },
        //注册交互时间
        '.shaked-btns a.btn-yellow click': function(){
          //放弃重摇
          $(this.element).find('.shaked-btns').addClass('hide');
          return false;
        },
        '.shaked-btns a.btn-red click': function(){
          //请求优惠券
          var _thia = this;

          $()



          $(this.element).find('.shaked-btns.to-buy').removeClass('hide');
          return false;
        }
    });
    new shakeActivity('#sh-b2c-mall-shake');
});