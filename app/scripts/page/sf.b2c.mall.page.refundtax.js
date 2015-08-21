define(
	'sf.b2c.mall.page.refundtax', [
		'can',
		'zepto',
		'underscore',
		'fastclick',
		'sf.b2c.mall.framework.comm',
		'sf.util',
		'sf.b2c.mall.business.config',
		'sf.b2c.mall.api.finance.createRefundTax',
		'sf.b2c.mall.api.order.getOrderV2',
		'plupload',
		'sf.b2c.mall.widget.loading',
		'sf.env.switcher',
		'sf.hybrid'
	],
	function(can, $, _, Fastclick, SFFrameworkComm, SFFn, SFBizConf, SFCreateRefundTax, SFGetOrderV2, plupload, SFLoading, SFSwitcher, SFHybrid) {

		// 在页面上使用fastclick
		Fastclick.attach(document.body);

		var loadingCtrl = new SFLoading();

		// 注册服务端的appid
		SFFrameworkComm.register(3);

		var refundtax = can.Control.extend({


			init: function(options) {
				var that = this;

				if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
					window.location.href = 'http://m.sfht.com/login.html';
				}


				this.imgPrefix = "http://img0.sfht.com/";
				// this.imgPrefix = "http://testimg.sfht.com/";

				this.initPic();
				$('#errorNoPicTips').hide();
				$('#errorAlipayAccount').hide();
				$('#errorAlipayName').hide();
				// var params = can.deparam(window.location.search.substr(1));

				var params = null;

				if (SFFn.isMobile.APP()) {
					params = can.route.attr();
				}else{
					params = can.deparam(window.location.search.substr(1));
				}

				this.options = new can.Map({});
				var getOrder = new SFGetOrderV2({
					"orderId": params.orderid
				});

				getOrder.sendRequest()
					.done(function(data) {
						that.options.attr(data);
					}).fail(function(errorCode) {
						window.location.href = 'http://m.sfht.com/index.html';
					})

			},
			'#alipayaccount blur': function(element, event) {
				var alipayAccount = $(element).val();
				this.checkAlipayAccount(alipayAccount);
			},
			'#alipayname blur': function(element, event) {
				var alipayname = $(element).val();
				this.checkAlipayName(alipayname);
			},
			'#alipayaccount focus': function(element, event) {
				$('#errorAlipayAccount').hide();
			},
			'#alipayname focus': function(element, event) {
				$('#errorAlipayName').hide();
			},
			checkAlipayAccount: function(account) {
				var account = $.trim(account);
				var isTelNum = /^1\d{10}$/.test(account);
				var isMail = /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(account);
				if (account == '') {
					loadingCtrl.hide();
					$('#errorAlipayAccount').text('请输入支付宝账号').show();
					return false;
				} else if (!isTelNum && !isMail) {
					loadingCtrl.hide();
					$('#errorAlipayAccount').text('请输入正确的支付宝账号').show();
					return false;
				} else {
					$('#errorAlipayAccount').hide();
					return true;
				}
			},
			checkAlipayName: function(name) {
				var name = $.trim(name);
				if (name == '') {
					$('#errorAlipayName').show();
					loadingCtrl.hide();
					return false;
				} else {
					return true;
				}
			},
			'.btn-refer-tax click': function(element, event) {
				event && event.preventDefault();
				// 显示蒙层
				loadingCtrl.show();
				$('#errorNoPicTips').hide();
				$('#errorAlipayAccount').hide();
				$('#errorAlipayName').hide();
				if (this.getValue() == '') {
					loadingCtrl.hide();
					$('#errorNoPicTips').text('请上传缴税证明照片').show();
					return false;
				};
				var params = can.deparam(window.location.search.substr(1));
				var tag = params.tag;
				var alipayAccount = $('#alipayaccount').val();
				var alipayname = $('#alipayname').val();
				var buyerName = this.options.orderItem.orderAddressItem.receiveName;
				var buyerTelephone = this.options.orderItem.orderAddressItem.telephone;
				var bizId = this.options.orderItem.orderPackageItemList[tag].packageNo;
				var mailNo = this.options.orderItem.orderPackageItemList[tag].logisticsNo;
				if (this.checkAlipayAccount(alipayAccount) && this.checkAlipayName(alipayname)) {
					var params = null;

					if (SFFn.isMobile.APP()) {
						params = can.route.attr();
					}else{
						params = can.deparam(window.location.search.substr(1));
					}

					var createRefundTax = new SFCreateRefundTax({
						'bizId': bizId,
						'masterBizId': params.orderid,
						'mailNo': mailNo,
						'buyerName': buyerName,
						'buyerTelephone': buyerTelephone,
						'alipayAccount': $.trim(alipayAccount),
						'alipayUserName': $.trim(alipayname),
						'url': this.getValue()
					});

					createRefundTax.sendRequest()
						.done(function(data) {
							$('.dialog-refundtax').show();

							var switcher = new SFSwitcher();
							switcher.register('web', function() {
								setTimeout(function() {
									window.location.href = 'http://m.sfht.com/orderdetail.html?orderid=' + params.orderid
								}, 2000);
				      });

				      switcher.register('app', function() {

				      	SFHybrid.notification.post('NotificationOrderReturnTax');

				      	setTimeout(function() {
				      		SFHybrid.sfnavigator.pop();
				      	}, 2000);

				        // SFHybrid.sfnavigator.popToIdentifier('orderReturnTax');
				      });

				      switcher.go();

						}).fail(function(errorCode) {
							if (errorCode == '-140') {
								return false;
							};
							var map = {
								'12110000': '该订单已提交过退税申请'
							}
							$('#errorNoPicTips').text(map[errorCode]).show();
						}).always(function() {
							loadingCtrl.hide();
						})
				}else{
					loadingCtrl.hide();
				}
			},

			//初始化图片上传控件
			initPic: function() {
				// 如果没有照片，则可以上传图片
				var that = this;

				that.imgCount = 0;
				var filename = "1.jpg";

				var params = can.route.attr();
				var word = null;
				if (params.platform) {
					var _aid = params.appId;
					var _tk = params.token;

					word = $.param({_aid: _aid, _tk: _tk})
				}else{
					word = $.param({_aid: 3});
				}

				// 上传组件
				var plupload = new window.plupload.Uploader({
					runtimes: "gears,html5,flash",
					browse_button: "pickbutton", //THIRD_ORDER,如果是私有，需要在url上加上orderid
					file_data_name: 'CPRODUCT_IMG' + filename.substring(filename.lastIndexOf("."), filename.length),
					urlstream_upload: true,
					container: "img",
					max_file_size: "5mb",
					multipart_params: {
						fileVal: 'CPRODUCT_IMG' + filename.substring(filename.lastIndexOf("."), filename.length)
					},
					url: SFBizConf.setting.api.fileurl + "?"+ word,
					flash_swf_url: "../img/plupload.flash.swf?r=" + Math.random(),
					silverlight_xap_url: "../img/plupload.silverlight.xap",
					filters: [{
						title: "Image files",
						extensions: "jpg,jpeg,gif,png,bmp"
					}]
				});

				plupload.bind("Init", function() {
					$("input[name=imgs1]").val("");
					$("#pickbutton").show();
				});

				plupload.bind("FilesAdded", function(a, uploadingFiles) {
					$('#img-tax-box').find('img').remove();
					var imgList = $('#img-tax-box').find('img');
					var uploadBtn = $(".upload-btn");
					if (imgList.length + uploadingFiles.length > 1) {
						return false;
					}

					var itemHTML = '<img width="80" height="80" id="' + uploadingFiles[0].id + '" src="" alt="" />'
					$(itemHTML).appendTo($('#img-tax-box'));
				});

				plupload.bind("UploadFile", function() {});

				plupload.bind("Error", function(a, b) {
					var c = {
						e100: "\u51fa\u73b0\u901a\u7528\u9519\u8bef\u3002",
						e200: "\u51fa\u73b0Http\u9519\u8bef\u3002",
						e300: "\u51fa\u73b0IO\u9519\u8bef\u3002",
						e400: "\u51fa\u73b0\u5b89\u5168\u8ba4\u8bc1\u9519\u8bef\u3002",
						e500: "\u51fa\u73b0\u63a7\u4ef6\u521d\u59cb\u5316\u9519\u8bef\u3002",
						e600: "\u51fa\u73b0\u9009\u62e9\u6587\u4ef6\u5c3a\u5bf8\u4e0d\u7b26\u5408\u9519\u8bef\u3002",
						e601: "\u51fa\u73b0\u9009\u62e9\u6587\u4ef6\u7c7b\u578b\u4e0d\u5339\u914d\u9519\u8bef\u3002",
						e700: "\u51fa\u73b0\u9009\u62e9\u56fe\u7247\u683c\u5f0f\u4e0d\u5339\u914d\u9519\u8bef\u3002",
						e701: "\u51fa\u73b0\u9009\u62e9\u56fe\u7247\u5185\u5b58\u95ee\u9898\u3002",
						e702: "\u51fa\u73b0\u9009\u62e9\u56fe\u7247\u5c3a\u5bf8\u4e0d\u5339\u914d\u9519\u8bef\u3002"
					};
					var d = c["e" + (0 - b.code)];
					"" != a.runtime && (SFFn.tip("\u4e0a\u4f20\u6587\u4ef6" + d), $("#" + b.file.id).remove(), a.stop())
				});

				plupload.bind("QueueChanged", function(a) {
					plupload.start();
					loadingCtrl.show();
					$('#svg01').hide();
					$('#btn-refundtax-text').text('重新上传清晰缴纳证明照片');
				});

				plupload.bind("FileUploaded", function(a, file, result) {
					var response = result.response;
					if ("" != response) {
						var filename = JSON.parse(response).content[0]["CPRODUCT_IMG.jpg"];
						var imgURL = that.imgPrefix + filename;
						that.setValue(file.id, imgURL);
					} else {
						$("#" + file.id).remove();
						plupload.stop();
						$('#svg01').show();
						loadingCtrl.hide();
					};

					if (file.size <= 0) {
						$("#" + file.id).remove();
					};
				})

				plupload.init();
			},
			'#img-tax-box img click': function(element, event) {
				$('.dialog-big-img').html('');
				var src = $(element).attr('src');
				var imgHtml = '<img width="100%" height="100%" src="' + src + '" alt="" />'
				$('.mask').show();
				$('.dialog-big-img').append(imgHtml).show();
			},
			'.dialog-big-img click': function(element, event) {
				$(element).hide();
				$('.mask').hide();
			},
			/**
			 * [getValue 获得取值，供其他组件调用]
			 * @return {[type]} [description]
			 */
			getValue: function() {
				var value = $("input[name=imgs1]").val();
				return value;
			},

			setValue: function(id, imgURL) {
				$("#" + id).attr('src', '');
				$("input[name=imgs1]").attr("value", '');
				var imgIndex = "";
				var value = $("input[name=imgs1]").val();
				if ("" == value) {
					imgIndex = 1;
					$("input[name=imgs1]").attr("value", imgURL);
				}

				// 进行图片展示
				if (imgIndex != "") {
					$("#" + id).attr('src', imgURL);
					++this.imgCount;
					loadingCtrl.hide();
				}
			}
		});

		// －－－－－－－－－－－－－－－－－－－－－－
		// 启动分支逻辑
		var switcher = new SFSwitcher();

		switcher.register('web', function() {

			new refundtax('body');
			//new SFNav('.sf-b2c-mall-nav');
		});

		switcher.register('app', function() {
			var app = {
				initialize: function() {
					this.bindEvents();
				},

				bindEvents: function() {
					document.addEventListener('deviceready', this.onDeviceReady, false);
					// document.addEventListener('resume', this.onResume, false);
				},

				onResume: function() {
					// 粗暴的重刷页面获取新数据
					window.location.reload();
				},

				onDeviceReady: function() {
					app.receivedEvent('deviceready');
				},

				receivedEvent: function(id) {

					SFHybrid.setNetworkListener();
					SFHybrid.isLogin().done(function() {
						new refundtax('body');
					});

					var callback = function() {
						window.location.reload();
					}
				}
			};

			app.initialize();
		});

		switcher.go();
		// －－－－－－－－－－－－－－－－－－－－－－

	})