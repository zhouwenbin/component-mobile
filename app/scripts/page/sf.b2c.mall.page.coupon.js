'use strict';
define(
  [
	'can',
	'zepto',
	'store',
	'fastclick',
	'sf.b2c.mall.framework.comm',
	'sf.weixin',
	'sf.b2c.mall.business.config',
	'sf.b2c.mall.api.coupon.getUserCouponList'
  ],
  function(can,$,store,Fastclick,SFFrameworkComm,SFWeixin,SFConfig,SFGetUserCouponList){
  	Fastclick.attach(document.body);
  	SFFrameworkComm.register(3);
  	SFWeixin.shareIndex();

  	var coupon = new can.Control.extend({

      init:function(){

      	this.render();
      },

      render:function(){
      	var getUserCouponList = new SFGetUserCouponList();
      	getUserCouponList.sendRequest()
      	  .done(function(data){
      	  	
      	  })
      	  .fail(function(error){

      	  })
      }
  	});

  	new coupon('.sf-b2c-mall-coupon');

  })

