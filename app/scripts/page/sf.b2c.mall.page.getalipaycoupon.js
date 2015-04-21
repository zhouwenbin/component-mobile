'use strict'

define('sf.b2c.mall.page.getalipaycoupon', [
		'can',
		'zepto',
		'fastclick',
		'sf.b2c.mall.widget.message',
		'sf.b2c.mall.framework.comm',
		'sf.b2c.mall.api.coupon.rcvCouponByMobile'
	],
	function(can, $, Fastclick, SFMessage, SFFrameworkComm, SFReceiveCoupon) {

		Fastclick.attach(document.body);
		SFFrameworkComm.register(3);
		var getcoupon = can.Control.extend({

			init: function(element, options) {
				this.data = new can.Map({
					mobile: null
				});
				this.render(this.data);
			},

			render: function(data) {
				var html = can.view.mustache(this.getCouponTemplates());
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

			getSucceedTemplates: function(mobile) {
				return '<section class="getcoupon-succeed">' +
					'<p>'+ mobile +'</p>' +
					'<div><a href="index.html"></a></div>' +
					'</section>'
			},

			'.btn-getcoupons click': function(element, event) {
				event && event.preventDefault();
				var mobile = this.data.attr('mobile');
				if(!/^1[0-9]{10}$/.test(mobile)){
					return false;
				}
				var that = this;
				var rcvCouponByMobile = new SFReceiveCoupon({
					bagId: 86,
					mobile: mobile,
					type: "CARD",
					receiveChannel: 'B2C',
					receiveWay: 'ZTLQ'
				});

				rcvCouponByMobile.sendRequest()
					.done(function(data) {
						$('.sf-b2c-mall-getcoupon').html(that.getSucceedTemplates(mobile));
					})
					.fail(function(errorCode) {
						if (_.isNumber(errorCode)) {
							var codeMap = {
								'11000020':'卡券id不存在',
								'11000030': '卡券已作废',
								'11000050': '卡券已领完',
								'11000100': '用户已领过该券',
								'11000130': '卡包不存在',
								'11000140': '卡包已作废'
							}
							var defaultText = '领取失败';
							var errorText = codeMap[errorCode.toString()] || defaultText;
							new SFMessage(null, {
								'tip': errorText,
								'type': 'error'
							});
							return;
						}

					})
			}

		});

		new getcoupon('.sf-b2c-mall-getcoupon');
	})