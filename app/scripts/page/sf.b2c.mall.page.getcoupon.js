'use strict'

define('sf.b2c.mall.page.getcoupon', [
		'can',
		'zepto',
		'fastclick',
		'sf.b2c.mall.widget.message',
		'sf.b2c.mall.api.coupon.rcvCouponByMobile'
	],
	function(can, $, Fastclick, SFMessage, SFReceiveCoupon) {
		Fastclick.attach(document.body);

		var getcoupon = new can.Control.extend({

			init: function() {
				this.data = new can.Map({
					mobile: null
				});
				this.render(this.data);
			},

			render: function(element,data) {
				var html = can.view.template(this.getTemplates());
				this.element.append(html(data));
			},

			getTemplates:function(){
				return '';
			},

			'#btn-getcoupons click':function(element,event){

				var rcvCouponByMobile = new SFReceiveCoupon({
					bagId: this.itemObj.bagId,
          mobile: this.data.telephone,
          type: "CARD",
          receiveChannel: 'B2C',
          receiveWay: 'ZTLQ'
				});

				rcvCouponByMobile.sendRequest()
					.done(function(){

					})
					.fail(function(){
						
					})
			},

		});

		new getcoupon('.sf-b2c-mall-getcoupon');
	})