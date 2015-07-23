'use strict';
define(
'sf.b2c.mall.module.fixtab', [
  'can',
  'zepto',
  'underscore',
  'fastclick',
  'iscroll'
],
function(can, $, _,Fastclick,IScroll) {
  Fastclick.attach(document.body);
  var fixtab = can.Control.extend({
    init: function(element) {
      this.initFix();
      this.initSidelip();
      var tabNum=$('.nataral-tab li').length;
      if(tabNum>5){
        $('.nataral-tab-icon').show();
        $('.nataral-tab ul').css({
          'width':100 * Math.ceil(tabNum / 5) +'%'
        });
        new window.IScroll('.nataral-tab', { scrollX: true });
      }
      $('.nataral-tab-icon').click(function(){
        $(this).parents('.nataral-tab').toggleClass('active');
        if($('.nataral-tab').hasClass('active')){
          new window.IScroll('.nataral-tab', { scrollX: false });
        }else{
          new window.IScroll('.nataral-tab', { scrollX: true });
        }
      })
      
    },

    initFix: function() {
      var that = this;
      $(window).scroll(function(){
        var nataral_tab_position=$('.nataral-tab').position().top;
        if($(window).scrollTop()>nataral_tab_position){
          $('.nataral-tab').addClass('nataral-tab-fixed');
        }else{
          $('.nataral-tab').removeClass('nataral-tab-fixed');
        }
      })
        
    },

    "form:first submit": function(){
      $(window).scroll(_.throttle(fixedFun, 200));
    },

    initSidelip: function() {
      var i;
      var nav_height=$('.nataral-tab').height();
      var num=$('.nataral-tab li').length;


      var nataral_pruduct = [];

      _.each($(".nataral-tab a"), function(item) {
        nataral_pruduct.push($(item).attr("href"));
      });

      var nataral_pruduct_offset=[];
      for(i=0;i<num;i++){
        nataral_pruduct_offset[i]=$(nataral_pruduct[i]).offset().top-nav_height;
      }
      $(window).scroll(function(){
        var that = this;
        for(i=0;i<num;i++){
          if($(window).scrollTop()>nataral_pruduct_offset[i]-10){
            $('.nataral-tab li').eq(i).addClass('active').siblings().removeClass('active');
          }
        }
        if($(window).scrollTop()<nataral_pruduct_offset[0]){
          $('.nataral-tab li').removeClass('active');
        }
      })
      $('.nataral-tab li').click(function(){
        var index=$('.nataral-tab li').index(this);
      })
    }
  })
  new fixtab();
}
)