define(
	'sf.b2c.mall.module.617', [
		'can',
		'zepto',
		'underscore',
		'fastclick',
		'sf.b2c.mall.business.config',
		'sf.b2c.mall.framework.comm'
	],

	function(can, $, _, Fastclick, SFConfig, SFFrameworkComm) {
		Fastclick.attach(document.body);
		SFFrameworkComm.register(3);

		var modActivity = can.Control.extend({
			init: function() {
				//如果是支付宝服务窗，不展示领券模块
				if (navigator.userAgent.match(/AlipayClient/i)) {
					$('.m617-r1').hide();
					$('#alipayenter').show();
				}
				//根据当前时间自动切换时间轴
				var time = new Date();
				var day = time.getDate(); //获取当前几号
				var hour = time.getHours() + 1;
				//如果当时日期等于17号，开始判断
				if (day == 17 && hour <= 14 && hour > 10) {
					$('.m617-tab-h li').eq(1).addClass('active').siblings().removeClass('active');
					$('.m617-tab-b').eq(1).addClass('active').siblings().removeClass('active');
				}
				if (day == 17 && hour <= 15 && hour > 14) {
					$('.m617-tab-h li').eq(2).addClass('active').siblings().removeClass('active');
					$('.m617-tab-b').eq(2).addClass('active').siblings().removeClass('active');
				}
				if (day == 17 && hour <= 16 && hour > 15) {
					$('.m617-tab-h li').eq(3).addClass('active').siblings().removeClass('active');
					$('.m617-tab-b').eq(3).addClass('active').siblings().removeClass('active');
				}
				if (day == 17 && hour <= 21 && hour > 16) {
					$('.m617-tab-h li').eq(4).addClass('active').siblings().removeClass('active');
					$('.m617-tab-b').eq(4).addClass('active').siblings().removeClass('active');
				}
				if (day == 17 && hour > 21) {
					$('.m617-tab-h li').eq(5).addClass('active').siblings().removeClass('active');
					$('.m617-tab-b').eq(5).addClass('active').siblings().removeClass('active');
				}
			},
			//导航条

			'#fixed-nav li click': function(element, event) {
				event && event.preventDefault();
				var nav1 = $('#h5buying_1_1').position().top;
				var nav2 = $('#h5buying_1_2').position().top;
				var nav3 = $('#h5buying_1_9').position().top;
				var nav4 = $('#h5buying_1_7').position().top;
				var nav5 = 0;
				var heightMap = {
					0: nav1,
					1: nav2,
					2: nav3,
					3: nav4,
					4: nav5
				};
				var index = $('#fixed-nav li').index($(element));
				$("body").animate({
					scrollTop: heightMap[index]
				}, 1000);
			},
			'.m617-banner click': function(element, event) {
				event && event.preventDefault();
				window.open("http://m.sfht.com/617gl.html");
			},

			'.m617-tab-h li click': function(element, event) {
				event && event.preventDefault();
				$(element).addClass('active').siblings().removeClass('active');
				var index = $('.m617-tab-h li').index($(element));
				$('.m617-tab-b').eq(index).addClass('active').siblings().removeClass('active');
				return false;
			}

		})

		new modActivity('body');
	});