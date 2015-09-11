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
    'fastclick',
    'underscore',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.shake',
    'sf.b2c.mall.widget.loading'
  ],
  function (can, $, Faskclick, _, store, SFFrameworkComm, SFConfig, shake, SFLoading) {
    'use strict';
    Faskclick.attach(document.body);

    //console.log(shake)
    var loadingCtrl = new SFLoading(),
      shakeActivity = can.Control.extend({
      init: function(){
        //判断是否登陆
        //if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
        //  window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
        //  return false;
        //}
        //显示蒙层
        loadingCtrl.show();
        this.render();
      },
      render: function(){
        var location = window.location,
          urlSearch = location.search.substring(0);

        var dom = this.element,
          title = '<h4>只是测试</h4>';
        $(dom).append(title);
        loadingCtrl.hide();
        this.shakeControl();
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
      },
      shakeStar: function(){
        //定义开始摇晃方法
        $('#sh-b2c-mall-shake').append('---->开始摇<br>');
      },
      shakeIng: function(){
        //定义摇晃过程中方法
        $('#sh-b2c-mall-shake').append('----一直在摇----<br>');
      },
      shakeEnd: function(){
        //定义摇晃结束时方法
        $('#sh-b2c-mall-shake').append('结束摇-----><br><br>');
        //统计本次摇晃战斗值，并比较若为当前最大存入本地储存
        var yaoArr = store.get('Yao_arr'),
          yaoArrLen = yaoArr.length,
          total = 0,
          fighting,
          maxFightVal = store.get('maxFightVal') || 0;
        for (var i = yaoArrLen; i > 0; i--){
          total += Math.abs(yaoArr[i-1]);
        }
        fighting = ((total / yaoArrLen) * 1000).toFixed(2);
        $('#store').empty().append(fighting);
        if ( fighting > maxFightVal ){
          store.set('maxFightVal', fighting);
        }

      }
    });
    new shakeActivity('#sh-b2c-mall-shake');
});