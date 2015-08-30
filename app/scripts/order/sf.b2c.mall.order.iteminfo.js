'use strict';

define('sf.b2c.mall.order.iteminfo', [
    'text',
    'can',
    'zepto',
    'sf.b2c.mall.api.order.submitOrderForAllSys',
    'sf.b2c.mall.api.order.queryOrderCoupon',
    'sf.b2c.mall.api.order.orderRender',
    'sf.b2c.mall.api.coupon.receiveExCode',
    'sf.b2c.mall.api.user.getRecAddressList',
    'sf.b2c.mall.api.user.getIDCardUrlList',
    'sf.b2c.mall.api.payment.queryPtnAuthLink',
    'sf.helpers',
    'sf.util',
    'sf.env.switcher',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.widget.bubble',
    'sf.b2c.mall.business.config',
    'text!template_order_iteminfo',
    'sf.b2c.mall.widget.loading',
    'sf.mediav'
], function(text, can, $,
    SFSubmitOrderForAllSys, SFQueryOrderCoupon, SFOrderRender, SFReceiveExCode, SFGetRecAddressList, SFGetIDCardUrlList, SFQueryPtnAuthLink,
    helpers, SFUtil, SFSwitcher, SFMessage, SFBubble, SFConfig, template_order_iteminfo, SFLoading, SFMediav) {

    can.route.ready();

    var loadingCtrl = new SFLoading();

    return can.Control.extend({
        itemObj: new can.Map({}),

        helpers: {
            'sf-get-img': function(imgs) {
                if (imgs()) {
                    return imgs().thumbImgUrl;
                }
            },
            'isShowSeckill': function(goodsType, options) {
                if (goodsType() == "SECKILL") {
                    return options.fn(options.contexts || this);
                } else {
                    return options.inverse(options.contexts || this);
                }
            },
            //是否展示ETK标示
            'sf-show-etk': function(transporterName, options) {
                if (typeof transporterName() !== "undefined" && transporterName() == 'ETK') {
                    return options.fn(options.contexts || this);
                } else {
                    return options.inverse(options.contexts || this);
                }
            },
            'sf-show-firstOrderTips': function(activityDescription, options) {
                var activityDescription = activityDescription();
                if (activityDescription && activityDescription.value && JSON.parse(activityDescription.value)['FIRST_ORDER']) {
                    return options.fn(options.contexts || this);
                }
            }
        },

        /**
         * 初始化
         * @param  {DOM} element 容器element
         * @param  {Object} options 传递的参数
         */
        init: function(element, options) {
            var params = can.deparam(window.location.search.substr(1));

            params = _.extend(params, can.route.attr());

            this.itemObj.attr({
                itemid: params.itemid,
                amount: params.amount
            });

            var that = this;

            can.when(that.initOrderRender())
                .done(function() {
                    var renderFn = can.mustache(template_order_iteminfo);
                    var html = renderFn(that.itemObj, that.helpers);
                    that.element.html(html);

                    if (that.itemObj.orderCouponItem.avaliableAmount > 0) {
                        //找到默认选择的优惠券
                        var price = that.getDefautSelectCoupon(that.itemObj.orderCouponItem).price;
                        $("#selectCoupon option[data-price='" + price + "']").first().attr('selected', 'true');
                        $("#selectCoupon").trigger("change");
                    }

                    loadingCtrl.hide();
                    $("#submitOrder").click(function() {
                        that.submitOrderClick($(this));
                    });

                    that.watchIteminfo.call(that);
                });
        },
        //组合购买商品条目参数
        initItemsParam: function() {
            var paramsUrl = can.deparam(window.location.search.substr(1)),
                itemStr,
                result = [],
                mainItemId,
                mainProductPrice = this.itemObj.orderPackageItemList[0].orderGoodsItemList[0].price;

            if (paramsUrl.mixproduct) {
                mainItemId = JSON.parse(paramsUrl.mixproduct)[0].itemId;
                _.each(this.itemObj.orderPackageItemList, function(packageItem) {
                        _.each(packageItem.orderGoodsItemList, function(goodItem) {
                            result.push({
                                "itemId": goodItem.itemId,
                                "num": 1,
                                "price": goodItem.price,
                                "groupKey": "group:immediately"
                            });
                        })
                    })
                    //删掉数组中第一个商品
                result.splice(0, 1);
                var mixObj = [{
                    "itemId": mainItemId,
                    "num": 1,
                    "price": mainProductPrice,
                    "saleItemList": result
                }];
                itemStr = JSON.stringify(mixObj);
            } else {
                itemStr = JSON.stringify([{
                    "itemId": paramsUrl.itemid,
                    "num": paramsUrl.amount,
                    "price": mainProductPrice
                }]);
            }
            return itemStr;
        },
        watchIteminfo: function() {
            var uinfo = $.fn.cookie('3_uinfo');
            var arr = [];
            if (uinfo) {
                arr = uinfo.split(',');
            }

            var name = arr[0];

            var products = [];
            this.itemObj.orderPackageItemList.each(function(packageInfo, index) {
                packageInfo.orderGoodsItemList.each(function(value) {
                    products.push(value);
                });
            });
            SFMediav.watchShoppingCart({
                name: name
            }, products);
        },

        watchSubmit: function() {
            var uinfo = $.fn.cookie('3_uinfo');
            var arr = [];
            if (uinfo) {
                arr = uinfo.split(',');
            }

            var name = arr[0];

            var products = [];
            this.itemObj.orderPackageItemList.each(function(packageInfo, index) {
                packageInfo.orderGoodsItemList.each(function(value) {
                    products.push(value);
                });
            });
            SFMediav.watchOrderSubmit({
                name: name
            }, {
                amount: that.itemObj.orderFeeItem.actualTotalFee
            }, products);
        },

        '#selectCoupon change': function(targetElement) {
            var selectedEle = $(targetElement[0][$(targetElement).get(0).selectedIndex]);
            var price = selectedEle.data("price");
            // if (price != 0) {
            //     this.itemObj.orderCoupon.selectCoupons = [$(targetElement).val()];
            // } else {
            //     this.itemObj.attr("orderCoupon.useQuantity", 0);
            //     this.itemObj.orderCoupon.selectCoupons = [];
            // }
            // this.itemObj.attr("orderCoupon.discountPrice", price);
        },

        //优惠券兑换相关事件
        '#inputCouponCode click': function(targetElement) {
            $("#couponCodeDialog").show();
        },
        '.dialog .icon15, .dialog1 .btn-normal click': function(targetElement) {
            targetElement.parents(".dialog").hide();
        },
        '#couponCodeDialog input input': function(targetElement) {
            if (targetElement.val().length > 0) {
                $("#couponCodeDialog button").removeClass("btn-disable").addClass("btn-danger");
            } else {
                $("#couponCodeDialog button").addClass("btn-disable").removeClass("btn-danger");
            }
        },
        '#couponCodeDialog .btn-danger click': function(targetElement) {
            var exCode = $('#couponCodeDialog input').val();
            can.when(this.receiveCouponExCode(exCode))
                .done(function() {});
        },
        '#couponCodeDialog input focus': function(targetElement) {
            $("#couponCodeDialog .text-error").text("");
        },


        receiveCouponExCode: function(exCode) {
            //can.when(this.initCoupons());


            var that = this;
            var receiveExCode = new SFReceiveExCode({
                exCode: exCode
            });
            receiveExCode.sendRequest()
                .done(function(userCouponInfo) {
                    new SFBubble("", {
                        "message": "兑换成功!",
                        "tick": 3000
                    })
                    can.when(that.initCoupons())
                        .then(function() {
                            $("#selectCoupon option[data-code='" + exCode + "']").first().attr('selected', 'true');
                            $("#selectCoupon").trigger("change");
                            $("#couponCodeDialogSuccess").show();
                            $("#couponCodeDialog").hide();
                        });
                })
                .fail(function(error) {
                    var errorMap = {
                        11000160: "请输入有效的兑换码",
                        11000100: "您已经兑换过此券",
                        11000170: "兑换码已使用",
                        11000200: "兑换码已过期",
                        11000209: "请输入正确的兑换码",
                        11000220: "本账户超过兑换次数限制"
                    };
                    $("#couponCodeDialog .text-error").text(errorMap[error] ? errorMap[error] : '请输入有效的兑换码！');
                })
                .always(function() {});

        },

        /**
         * 初始化 OrderRender
         */
        initOrderRender: function() {
            var that = this;

            var params = can.deparam(window.location.search.substr(1));
            var selectAddr = that.options.selectReceiveAddr.getSelectedAddr();

            var itemStr;
            var result = [];
            var singleArr = [{
                "itemId": this.itemObj.itemid,
                "num": this.itemObj.amount
            }];
            if (params.mixproduct) {
                var mainItemId = JSON.parse(params.mixproduct)[0].itemId;
                $.each(JSON.parse(params.mixproduct), function(index, val) {
                    var obj = {
                        "itemId": val.itemId,
                        "num": 1,
                        "groupKey": 'group:immediately'
                    }
                    result.push(obj);
                });
                result.splice(0, 1);
                var mixObj = [{
                    "itemId": mainItemId,
                    "num": 1,
                    "groupKey": 'group:immediately',
                    "saleItemList": result
                }];
                itemStr = JSON.stringify(mixObj);
            } else {
                itemStr = JSON.stringify(singleArr);
            }

            var orderRender = new SFOrderRender({
                address: JSON.stringify({
                    "addrId": selectAddr.addrId,
                    "nationName": selectAddr.nationName,
                    "provinceName": selectAddr.provinceName,
                    "cityName": selectAddr.cityName,
                    "regionName": selectAddr.regionName,
                    "detail": selectAddr.detail,
                    "recName": selectAddr.recName,
                    "mobile": selectAddr.cellphone,
                    "telephone": selectAddr.cellphone,
                    "zipCode": selectAddr.zipCode,
                    "recId": selectAddr.recId,
                    certType: "ID",
                    certNo: selectAddr.credtNum2
                }),
                items: itemStr,
                sysType: that.getSysType(that.itemObj.saleid)
            });
            return orderRender.sendRequest()
                .done(function(orderRenderItem) {

                    that.itemObj.attr(orderRenderItem);
                    console.log(that.itemObj);

                })
                .fail();
        },

        errorMap: {
            "4000200": "订单地址不存在",
            "4000400": "订单商品信息改变",
            "4000401": "购买数量超过活动每人限购数量",
            "4000402": "折扣金额大于订单总金额",
            "4000403": "部分商品超出可购买数量，请重新提交订单", //"购买数量超过活动剩余库存",
            "4000404": "订单金额发生变化，请重新提交订", //"活动已经结束",
            "4000405": "折扣金额过大，超过订单总金额的30%",
            "4000500": "商品被抢光啦，看看其他商品吧", //"订单商品库存不足",
            "4000600": "订单商品超过限额",
            "4000700": "订单商品金额改变",
            "4002300": "购买的多个商品货源地不一致",
            "4002400": "购买的多个商品的商品形态不一致",
            "4002500": "购买的商品支付卡类型为空",
            "4002600": "购买的商品不在配送范围内",
            "4002700": "商品被抢光啦，看看其他商品吧", //"订单商品已下架",
            "4100901": "优惠券使用失败",
            "4100902": "优惠券不在可使用的时间范围内",
            "4100903": "优惠券不能在该渠道下使用",
            "4100904": "优惠券不能在该终端下使用",
            "4100905": "使用的优惠券不满足满减条件",
            "4100906": "使用的优惠券金额超过商品总金额的30%",
            "4100907": "该商品不能使用此优惠券",
            "4001641": "积分使用失败"
        },

        submitOrderClick: function(element, event) {
            var that = this;

            //防止重复提交
            if (element.hasClass("btn-disable")) {
                return false;
            }

            var selectAddr = that.options.selectReceiveAddr.getSelectedAddr();
            var isDetailInvalid = /[<>'"]/.test($.trim(selectAddr.detail));
            var isReceiverName = /先生|女士|小姐/.test($.trim(selectAddr.recName));
            //
            if (typeof selectAddr == 'undefined' || selectAddr == false) {

                new SFMessage(null, {
                    'tip': '请选择收货地址！',
                    'type': 'error'
                });
                return false;
            } else if (isReceiverName) {
                new SFMessage(null, {
                    'tip': '请您输入真实姓名。感谢您的配合!',
                    'type': 'error'
                });

                return false;
            } else if (isDetailInvalid) {
                new SFMessage(null, {
                    'tip': '亲，您的收货地址输入有误，不能含有< > \' \" 等特殊字符！',
                    'type': 'error'
                });

                return false;
            }
            //校验提交金额不能为负值
            if (that.itemObj.attr('orderFeeItem.actualTotalFee') < 0) {
                new SFMessage(null, {
                    'tip': '订单金额不能小于0！',
                    'type': 'error'
                });

                return false;
            }

            var params = {
                "address": JSON.stringify({
                    "addrId": selectAddr.addrId,
                    "nationName": selectAddr.nationName,
                    "provinceName": selectAddr.provinceName,
                    "cityName": selectAddr.cityName,
                    "regionName": selectAddr.regionName,
                    "detail": selectAddr.detail,
                    "recName": selectAddr.recName,
                    "mobile": selectAddr.cellphone,
                    "telephone": selectAddr.cellphone,
                    "zipCode": selectAddr.zipCode,
                    "recId": selectAddr.recId,
                    "certType": "ID",
                    "certNo": selectAddr.credtNum2
                }),
                "userMsg": "",
                "integral": $("#pointUsed").val(),
                "items": this.initItemsParam(),
                "sysType": that.getSysType(),
                "couponCodes": JSON.stringify(this.itemObj.orderCoupon.selectCoupons),
                "submitKey": this.itemObj.submitKey
            }

            if (this.itemObj.orderCoupon.selectCoupons && this.itemObj.orderCoupon.selectCoupons.length > 0) {
                params.couponCodes = JSON.stringify(this.itemObj.orderCoupon.selectCoupons);
            }
            var submitOrderForAllSys = new SFSubmitOrderForAllSys(params);
            can.when(submitOrderForAllSys.sendRequest())
                .done(function(message) {
                    var goodsType = that.itemObj.orderGoodsItemList[0].attr('goodsType');
                    if (goodsType == 'SECKILL') {
                        var url = SFConfig.setting.link.gotopay + '&' +
                            $.param({
                                "orderid": message.value,
                                "recid": selectAddr.recId,
                                "showordersuccess": true,
                                "goodsType": goodsType
                            });
                    } else {
                        var url = SFConfig.setting.link.gotopay + '&' +
                            $.param({
                                "orderid": message.value,
                                "recid": selectAddr.recId,
                                "showordersuccess": true
                            });
                    }

                    var switcher = new SFSwitcher();

                    // 转跳到微信授权支付
                    switcher.register('wechat', function() {
                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90f1dcb866f3df60&redirect_uri=" + escape(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

                        // var queryPtnAuthLink = new SFQueryPtnAuthLink({
                        //   "serviceType": "wechat_intl_mp",
                        //   "redirectUrl": escape(url)
                        // });

                        // queryPtnAuthLink
                        //   .sendRequest()
                        //   .done(function(data) {
                        //     window.location.href = data.loginAuthLink;
                        //   })
                        //   .fail(function(error) {
                        //     console.error(error);
                        //   })
                    });

                    switcher.register('web', function() {
                        window.location.href = url;
                    });

                    switcher.go();

                    that.watchSubmit.call(that);
                })
                .fail(function(error) {
                    element.removeClass("btn-disable");
                    // new SFMessage(null, {
                    //   'tip': that.errorMap[error] || '下单失败',
                    //   'type': 'error'
                    // });

                    var callback = function() {
                        if (error == '4000404') {
                            window.location.reload();
                        }
                    }

                    var message = new SFMessage(null, {
                        'tip': that.errorMap[error] || '下单失败',
                        'type': 'confirm',
                        'okFunction': callback
                    });

                });
        },

        getSysType: function() {
            // alert(window.AlipayJSBridge);
            //如果是支付宝服务窗 则是FWC_H5
            if (typeof window.AlipayJSBridge != "undefined") {
                return "FWC_H5"
            } else {
                return 'B2C_H5'
            }
        },

        /*
         * author:zhangke
         * desc: 获取可用优惠券列表
         */
        initCoupons: function() {
            var that = this;

            var queryOrderCoupon = new SFQueryOrderCoupon({
                "items": this.initItemsParam(),
                'system': "B2C_H5"
            });
            return queryOrderCoupon.sendRequest()
                .done(function(orderCoupon) {
                    that.itemObj.attr('orderCouponItem', orderCoupon);
                })
                .fail(function(error) {
                    console.error(error);
                });
        },
        /*
         * 找到默认选择的优惠券 面额最高的
         */
        getDefautSelectCoupon: function(orderCoupon) {
            //找到面额最高的
            var tmpPriceCoupon;
            var tmpPrice = 0;
            for (var i = 0, tmpCoupon; tmpCoupon = orderCoupon.avaliableCoupons[i]; i++) {
                if (tmpCoupon.price > tmpPrice) {
                    tmpPrice = tmpCoupon.price;
                    tmpPriceCoupon = tmpCoupon;
                }
            }

            return tmpPriceCoupon;
        },

        //积分格式校验
        '#pointUsed keyup': function(element, event) {
            var pointValue = 0;
            var rateValue = this.itemObj.attr('proportion');
            var shouldPay = this.itemObj.attr('orderFeeItem.actualTotalFee') - this.itemObj.attr('orderCoupon.discountPrice');
            if ($(".integral-use-r1 a.active").length > 0) {
                pointValue = $("#pointUsed").val();
                if (pointValue == null || pointValue == "") {
                    $("#pointToMoney").text("-￥0.0");
                } else if (!(/^[1-9]+[0-9]*$/.test(pointValue) || pointValue == 0)) {
                    $("#pointToMoney").text("输入的积分格式不正确");
                    pointValue = 0;
                }
                //处理输入的积分值大于拥有的积分值的情况
                else if (pointValue > parseInt(this.itemObj.attr("totalPoint"))) {
                    pointValue = parseInt(this.itemObj.attr("totalPoint"));
                    if (rateValue == 0) {
                        $("#pointToMoney").text("-￥" + "0");
                    } else {
                        //对于使用积分时，防止出现使用积分过多出现支付金额为负值的情况
                        if (shouldPay < 0) {
                            pointValue = 0;
                            $("#pointToMoney").text("-￥" + "0");
                        } else if (shouldPay / 100 * rateValue < parseInt(this.itemObj.attr("totalPoint"))) {
                            pointValue = shouldPay / 100 * rateValue;
                            $("#pointToMoney").text("-￥" + (shouldPay / 100));
                        } else {
                            $("#pointToMoney").text("-￥" + parseInt(this.itemObj.attr("totalPoint")) / rateValue);
                        }
                    }
                    $("#pointUsed").val(pointValue);
                }
                //处理输入的积分值小于积分总值的情况
                else {
                    if (rateValue == 0) {
                        $("#pointToMoney").text("-￥" + "0");
                    } else {
                        if (shouldPay < 0) {
                            pointValue = 0;
                            $("#pointToMoney").text("-￥" + "0");
                            $("#pointUsed").val(pointValue);
                        } else if (shouldPay / 100 * rateValue < pointValue) {
                            pointValue = shouldPay / 100 * rateValue;
                            $("#pointUsed").val(pointValue);
                            $("#pointToMoney").text("-￥" + (shouldPay / 100));
                        } else {
                            $("#pointToMoney").text("-￥" + pointValue / rateValue);
                        }
                    }
                }
            } else {
                $("#pointToMoney").text("-￥0.0");
                $("#pointUsed").val(0)
            }
            this.itemObj.attr('pointForUsed', pointValue);

            if (rateValue == 0) {
                this.itemObj.attr("pointForUsed", 0);
            } else {
                shouldPay = shouldPay - (pointValue * 100 / rateValue);
                this.itemObj.attr("pointForUsed", pointValue / rateValue);
            }

            this.itemObj.attr("orderFeeItem.shouldPay", shouldPay);

            this.itemObj.attr("getpoint", Math.floor(shouldPay / 100) * 100);
        },

        ".switch click": function(targetElement) {
            $(targetElement).toggleClass('active');
            $(".integral-use-r2").css("display", "block");
            if ($(".integral-use-r1 a.active").length < 1) {
                $(".integral-use-r2").css("display", "none");
                $("#pointToMoney").text("-￥0.0");
                this.itemObj.attr('pointForUsed', 0)
                $("#pointUsed").val(0);
            }

            var shouldPay = this.itemObj.attr('orderFeeItem.goodsTotalFee') - this.itemObj.attr('orderFeeItem.discount') - this.itemObj.attr('orderCoupon.discountPrice') - $("#pointUsed").val() * 100;
            this.itemObj.attr("orderFeeItem.shouldPay", shouldPay);
            this.itemObj.attr("getpoint", Math.floor(shouldPay / 100) * 100);
        }
    });
})