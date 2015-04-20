'use strict'

define('sf.b2c.mall.page.getalipaycoupon', [
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

			render: function(element, data) {
				var html = can.view.template(this.getCouponTemplates());
				this.element.append(html(data));
			},

			getCouponTemplates: function() {
				return '<section class="getcoupon">' +
					'<form action="">' +
					'<div>' +
					'<input type="text" class="getcoupon-tel input" can-value="mobile">' +
					'</div>' +
					'<div>' +
					'<button class="btn-getcoupons"></button>' +
					'</div>' +
					'</form>' +
					'</section>'
			},

			getSucceedTemplates: function() {
				return '<section class="getcoupon-succeed">' +
					'<p>18321810200</p>' +
					'<div><a href="index.html"></a></div>' +
					'</section>'
			},

			'#btn-getcoupons click': function(element, event) {

				var rcvCouponByMobile = new SFReceiveCoupon({
					bagId: this.itemObj.bagId,
					mobile: this.data.telephone,
					type: "CARD",
					receiveChannel: 'B2C',
					receiveWay: 'ZTLQ'
				});

				rcvCouponByMobile.sendRequest()
					.done(function(data) {

					})
					.fail(function() {

					})
			},

		});

		new getcoupon('.sf-b2c-mall-getcoupon');
	})