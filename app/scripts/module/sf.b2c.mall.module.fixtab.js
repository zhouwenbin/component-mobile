'use strict';
define(
  'sf.b2c.mall.module.fixtab', [
    'can',
    'zepto',
  	'underscore'
  ],
  function(can, $, _) {

    var fixtab = can.Control.extend({
      init: function(element) {
        this.initFix();
        this.initSidelip();
      },
      initFix: function() {
        var that = this;

        var fixedFun = function(){
          var nataral_tab_position=$('.nataral-tab').position().top;
          if($(window).scrollTop()>nataral_tab_position){
            $('.nataral-tab ul').addClass('nataral-tab-fixed');
          }else{
            $('.nataral-tab ul').removeClass('nataral-tab-fixed');
          }
        };

        $(window).scroll(_.throttle(fixedFun, 200));
      },
      initSidelip: function() {
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
            $("html")[0].animate({scrollTop:nataral_pruduct_offset[index]},500);
            $("body")[0].animate({scrollTop:nataral_pruduct_offset[index]},500);
            return false;
          })
      }
    })
    new fixtab();
  }
)