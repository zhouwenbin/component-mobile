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
    'sf.shake'
  ],
  function (can, $, Faskclick, _, store, SFFrameworkComm, SFConfig, shake) {
    'use strict';
    Faskclick.attach(document.body);

    //console.log(shake)
    var shakeActivity = can.Control.extend({
      init: function(){
        //if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
        //  window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
        //  return false;
        //}
        this.render();
      },
      render: function(){
        var dom = this.element,
          title = '<h4>只是测试</h4>';
        $(dom).append(title);
        this.shakeControl();
      },
      shakeControl: function(){
        var _this = this;
        if (shake.isSupport()){
          shake.init(this.shakeStar, this.shakeEnd, this.shakeIng, 'Yao_arr');
          shake.init({
            'storeId': 'Yao_arr',
            'starFun': _this.shakeStar,
            'endFun': _this.shakeEnd,
            'ingFun': _this.shakeIng
          });
        }
      },
      shakeStar: function(){
        $('#sh-b2c-mall-shake').append('---->开始摇<br>');
      },
      shakeIng: function(){
        $('#sh-b2c-mall-shake').append('----一直在摇----<br>');
      },
      shakeEnd: function(){
        $('#sh-b2c-mall-shake').append('结束摇-----><br><br>');
        var yaoArr = store.get('Yao_arr'),
          yaoArrLen = yaoArr.length,
          total = 0,
          fighting,
          maxFightVal = store.get('maxFightVal') || 0;
        for (var i = yaoArrLen; i > 0; i--){
          total += Math.abs(parseInt(yaoArr[i-1]));
        }
        fighting = parseInt(total / yaoArrLen) * 100;
        $('#store').empty().append(fighting);
        if ( fighting > maxFightVal ){
          store.set('maxFightVal', fighting);
        }

      }
    });
    new shakeActivity('#sh-b2c-mall-shake');
});