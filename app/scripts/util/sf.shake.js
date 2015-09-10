/**
 * sf.shake.js
 * 判断手机是否被摇动
 * Created 2015-09-10 09:17.
 */
define(
  'sf.shake',
  ['store'],
  function (store) {
    'use strict';
    var shake = shake || {};
    shake = {
      isSupport: function () {
        //判断当前设备是否支持js摇晃检测
        return window.DeviceMotionEvent;
      },
      init: function (obj) {
        //alert(123);
        this.listenShake(obj.starFun, obj.endFun, obj.ingFun, obj.storeId);
      },
      listenShake: function (star, end, ing, id) {
        var _this = this,
          speed = 25,
          x = 0,
          y = 0,
          z = 0,
          lastX = 0,
          lastY = 0,
          lastZ = 0,
          arrYao = [],
          yaoLen = 'xxx',
          isEnd = false,
          timerStar,
          timerEnd,
          deviceMotion,
          yaoData;
        deviceMotion = function () {
          var acceleration = event.accelerationIncludingGravity;
          x = acceleration.x;
          y = acceleration.y;
          z = acceleration.z;
          if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed){
            arrYao.push(lastX + lastY + lastZ); //记录持续摇动状态
          }
          lastX = x;
          lastY = y;
          lastZ = z;
        };
        window.addEventListener('devicemotion', deviceMotion, false);
        timerStar = setInterval(function () {
          if (arrYao.length !== 0){
            if (arrYao.length === 1){
              _this.shakeStar(star);
              isEnd = true;
              clearInterval(timerStar);
            }
            //if (yaoLen === arrYao.length){
            //  //arrYao = []; //摇动结束，清空上次摇动记录
            //  _this.shakeEnd(end);
            //  clearInterval(timer);
            //}else{
            //  if (ing){
            //    //如果有持续摇动的方法，则执行之。
            //    _this.shakeIng(ing);
            //  }
            //}
          }

        }, 10);
        timerEnd = setInterval(function () {
          if ( isEnd ){
            if ( yaoLen === arrYao.length ){
              store.set(id, arrYao);
              _this.shakeEnd(star, end, ing, id);
              //window.removeEventListener('devicemotion', deviceMotion);
              clearInterval(timerEnd);

            }else {
              _this.shakeIng(ing);
            }
          }
          yaoLen = arrYao.length;
        }, 100);
        //return yaoData;
      },
      shakeStar: function (callback) {
        //摇晃开始回调
        //alert(callback);
        callback();
      },
      shakeIng: function (callback) {
        //摇晃中暂时不做任何处理
        callback();

      },
      shakeEnd: function (star, end, ing, id) {
        //摇晃结束回调
        //alert(callback);
        end();
        //return arrY;
        var _this = this;
        setTimeout(function () {
          _this.listenShake(star, end, ing, id);
        }, 5000);
      }
    };

    return shake;
  });
