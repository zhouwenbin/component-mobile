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
      }
    })
    new fixtab();
  }
)