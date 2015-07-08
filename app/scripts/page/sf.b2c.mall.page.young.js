'use strict';
define(
  [
    'can',
    'zepto',
    'store',
    'fastclick',
    'underscore',
    'md5',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.widget.message',
     'zepto.fullpage'
  ],
  function(can, $, store, Fastclick, _, md5, SFComm, SFConfig, SFFn, SFMessage, ZfullPage){
    Fastclick.attach(document.body);
    SFComm.register(3);

    var imgArray = {
        "0":[],
        "1":[],
        "2":[],
        "3":[],
        "4":[],
        "5":[],
        "6":[],
        "7":[],
        "8":[],
        "9":[],
        "10":[],
        "11":[]
    };

   var xingNan = 1000;
   var xiaoXiu = 3000;
   var banLuo = 10000;
   var mi = 30000;
    var young= can.Control.extend({

      /**
       * @description 初始化方法，当调用new时会执行init方法
       * @param  {Dom} element 当前dom元素
       * @param  {Map} options 传递的参数
       */
      init: function(element, options) {
          $('.wp-inner').fullpage();
          $(function(){
              $('.page1 .icon1').click(function(){
                  $('.page1').addClass('active');
                  $(this).hide();
              })
              var index = 0;
              $('.next').click(function(){
                  if(index<11){
                      $('.people>li').eq(11-index).addClass('active');
                      index++;
                  }
              })
              $('.prev').click(function(){
                  if(index>0){
                      $('.people>li').eq(12-index).removeClass('active');
                      index--;
                  }
              })
              $('.people').swipeRight(function(){
                  if(index<11){
                      $('.people>li').eq(11-index).addClass('active');
                      index++;
                  }
              })
              $('.people').swipeLeft(function(){
                  if(index>0){
                      $('.people>li').eq(12-index).removeClass('active');
                      index--;
                  }
              })
              $('.tab li').click(function(){
                  $(this).addClass('active').siblings().removeClass('active');

              })
              $('.page3 .a2').click(function(){
                  $('.dialog-phone').removeClass('hide');
              })
              $('.dialog-phone .btn').click(function(){
                  $('.dialog-phone').addClass('hide');
                  $('.dialog-success').removeClass('hide');
              })
              $('.dialog-success .btn').click(function(){
                  $('.dialog-success').addClass('hide');
              })
          })
      }
    });

    new young("body");
  });
