'use strict';
define(
  [
	'can',
	'zepto',
	'store',
	'fastclick',
	'sf.b2c.mall.framework.comm',
	'sf.weixin',
    'sf.helpers',
	'sf.b2c.mall.business.config',
	'sf.b2c.mall.api.coupon.getUserCouponList'
  ],
  function(can, $, store, Fastclick, SFFrameworkComm, SFWeixin, helpers, SFConfig, SFGetUserCouponList){
  	Fastclick.attach(document.body);
  	SFFrameworkComm.register(3);
  	SFWeixin.shareIndex();

  	var coupon = can.Control.extend({

      init:function(){
      	this.render();
      },

      render:function(){
        var that = this;
      	var getUserCouponList = new SFGetUserCouponList("");
      	getUserCouponList.sendRequest()
      	  .done(function(data){
            var options = {
              unUsed : {
                count: 0,
                items: []
              },
              used : {
                count: 0,
                items: []
              },
              expired : {
                count: 0,
                items: []
              },
              cancel : {
                count: 0,
                items: []
              },
              totalCount: data.totalCount
            };

            var couponStatusMap = {
              "UNUSED" : function() {
                options.unUsed.count++;
                options.unUsed.items.push(tmpCoupon);
              },
              "USED" : function() {
                options.used.count++;
                options.used.items.push(tmpCoupon);
              },
              "CANCELED" : function() {
                options.cancel.count++;
                options.cancel.items.push(tmpCoupon);
              },
              "EXPIRED" : function() {
                options.expired.count++;
                options.expired.items.push(tmpCoupon);
              }
            }
            var pushCoupon = function(tag) {
              var fn = couponStatusMap[tag];
              if (_.isFunction(fn)) {
                return fn.call(this)
              }
            }
            if (data.items) {
              for (var i = 0, tmpCoupon; tmpCoupon = data.items[i]; i++) {
                pushCoupon(tmpCoupon.status);
              }
            }

            var html = can.view('templates/center/sf.b2c.mall.center.coupon.mustache', options);
            that.element.html(html);
      	  })
      	  .fail(function(error){
            console.error(error);
      	  })
          .always(function() {
            $('.loadingDIV').hide();
          })
      }
  	});

  	new coupon('.sf-b2c-mall-coupon');

  })

