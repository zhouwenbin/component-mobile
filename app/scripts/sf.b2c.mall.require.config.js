requirejs.config({
    baseUrl: ' /',
    paths: {
        // ----------------------------------------
        // Pre Define
        'can': 'http://www.google.com/bower_components/canjs/amd/can',
        'zepto': 'http://www.google.com/zepto',
        // 'jquery': 'http://www.google.com/bower_components/jquery/dist/jquery',
        'underscore': 'http://www.google.com/bower_components/underscore/underscore-min',
        // 'jquery.cookie': 'http://www.google.com/bower_components/jquery.cookie/jquery.cookie',
        'fastclick': 'http://www.google.com/fastclick',
        'md5': 'http://www.google.com/bower_components/blueimp-md5/js/md5.min',
        'underscore.string': 'http://www.google.com/bower_components/underscore.string/dist/underscore.string.min',
        'store': 'http://www.google.com/bower_components/store/dist/store',

        'sf.b2c.mall.api.security.type': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.api.security.type',
        'sf.b2c.mall.framework.adapter': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.adapter',
        'sf.b2c.mall.framework.comm': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.comm',
        'sf.b2c.mall.framework.multiple.comm': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.multiple.comm',
        'sf.b2c.mall.framework.view.controller': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.view.controller',
        'sf.b2c.mall.util.utils': 'http://www.google.com/app/scripts/util/sf.b2c.mall.util.utils',

        'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.prd.config',

        'sf.b2c.mall.api.sc.getUserRoutes': 'scripts/api/sf.b2c.mall.api.sc.getUserRoutes',

        'sf.b2c.mall.api.order.submitOrder': 'scripts/api/sf.b2c.mall.api.order.submitOrder',
        'sf.b2c.mall.api.order.submitOrderV2': 'scripts/api/sf.b2c.mall.api.order.submitOrderV2',
        'sf.b2c.mall.api.order.cancelOrder': 'scripts/api/sf.b2c.mall.api.order.cancelOrder',
        'sf.b2c.mall.api.order.confirmReceive': 'scripts/api/sf.b2c.mall.api.order.confirmReceive',
        'sf.b2c.mall.api.order.getOrder': 'scripts/api/sf.b2c.mall.api.order.getOrder',
        'sf.b2c.mall.api.order.getOrderList': 'scripts/api/sf.b2c.mall.api.order.getOrderList',
        'sf.b2c.mall.api.order.getSubOrder': 'scripts/api/sf.b2c.mall.api.order.getSubOrder',
        'sf.b2c.mall.api.order.requestPay': 'scripts/api/sf.b2c.mall.api.order.requestPay',
        'sf.b2c.mall.api.order.requestPayV2': 'scripts/api/sf.b2c.mall.api.order.requestPayV2',
        'sf.b2c.mall.api.order.submitOrderForAllSys': 'scripts/api/sf.b2c.mall.api.order.submitOrderForAllSys',
        'sf.b2c.mall.api.order.queryOrderCoupon': 'scripts/api/sf.b2c.mall.api.order.queryOrderCoupon',

        'sf.b2c.mall.api.products.getSKUBaseList': 'scripts/api/sf.b2c.mall.api.product.getSKUBaseList',
        'sf.b2c.mall.api.products.getSKUInfo': 'scripts/api/sf.b2c.mall.api.product.getSKUInfo',
        'sf.b2c.mall.api.products.getSPUInfo': 'scripts/api/sf.b2c.mall.api.product.getSPUInfo',
        'sf.b2c.mall.api.products.updateSkuSellStock': 'scripts/api/sf.b2c.mall.api.product.updateSkuSellStock',
        'sf.b2c.mall.api.products.getAllParents': 'scripts/api/sf.b2c.mall.api.products.getAllParents',
        'sf.b2c.mall.api.products.getCategories': 'scripts/api/sf.b2c.mall.api.products.getCategories',
        'sf.b2c.mall.api.products.search': 'scripts/api/sf.b2c.mall.api.products.search',

        'sf.b2c.mall.api.user.appLogin': 'scripts/api/sf.b2c.mall.api.user.appLogin',
        'sf.b2c.mall.api.user.changePassword': 'scripts/api/sf.b2c.mall.api.user.changePassword',
        'sf.b2c.mall.api.user.checkUserExist': 'scripts/api/sf.b2c.mall.api.user.checkUserExist',
        'sf.b2c.mall.api.user.checkVerifyCode': 'scripts/api/sf.b2c.mall.api.user.checkVerifyCode',
        'sf.b2c.mall.api.user.createRecAddress': 'scripts/api/sf.b2c.mall.api.user.createRecAddress',
        'sf.b2c.mall.api.user.createReceiverInfo': 'scripts/api/sf.b2c.mall.api.user.createReceiverInfo',
        'sf.b2c.mall.api.user.delRecAddress': 'scripts/api/sf.b2c.mall.api.user.delRecAddress',
        'sf.b2c.mall.api.user.deviceRegister': 'scripts/api/sf.b2c.mall.api.user.deviceRegister',
        'sf.b2c.mall.api.user.getIDCardUrlList': 'scripts/api/sf.b2c.mall.api.user.getIDCardUrlList',
        'sf.b2c.mall.api.user.getInviteCodeList': 'scripts/api/sf.b2c.mall.api.user.getInviteCodeList',
        'sf.b2c.mall.api.user.getRecAddressList': 'scripts/api/sf.b2c.mall.api.user.getRecAddressList',
        'sf.b2c.mall.api.user.getUserInfo': 'scripts/api/sf.b2c.mall.api.user.getUserInfo',
        'sf.b2c.mall.api.user.logout': 'scripts/api/sf.b2c.mall.api.user.logout',
        'sf.b2c.mall.api.user.mailRegister': 'scripts/api/sf.b2c.mall.api.user.mailRegister',
        'sf.b2c.mall.api.user.renewToken': 'scripts/api/sf.b2c.mall.api.user.renewToken',
        'sf.b2c.mall.api.user.resetPassword': 'scripts/api/sf.b2c.mall.api.user.resetPassword',
        'sf.b2c.mall.api.user.sendActivateMail': 'scripts/api/sf.b2c.mall.api.user.sendActivateMail',
        'sf.b2c.mall.api.user.sendResetPwdLink': 'scripts/api/sf.b2c.mall.api.user.sendResetPwdLink',
        'sf.b2c.mall.api.user.setDefaultAddr': 'scripts/api/sf.b2c.mall.api.user.setDefaultAddr',
        'sf.b2c.mall.api.user.upateUserInfo': 'scripts/api/sf.b2c.mall.api.user.upateUserInfo',
        'sf.b2c.mall.api.user.updateRecAddress': 'scripts/api/sf.b2c.mall.api.user.updateRecAddress',
        'sf.b2c.mall.api.user.updateReceiverInfo': 'scripts/api/sf.b2c.mall.api.user.updateReceiverInfo',
        'sf.b2c.mall.api.user.userActivate': 'scripts/api/sf.b2c.mall.api.user.userActivate',
        'sf.b2c.mall.api.user.webLogin': 'scripts/api/sf.b2c.mall.api.user.webLogin',
        'sf.b2c.mall.api.user.federatedLogin': 'scripts/api/sf.b2c.mall.api.user.federatedLogin',
        'sf.b2c.mall.api.user.checkLink': 'scripts/api/sf.b2c.mall.api.user.checkLink',
        'sf.b2c.mall.api.user.checkSmsCode': 'scripts/api/sf.b2c.mall.api.user.checkSmsCode',
        'sf.b2c.mall.api.user.downSmsCode': 'scripts/api/sf.b2c.mall.api.user.downSmsCode',
        'sf.b2c.mall.api.user.downMobileVfCode': 'scripts/api/sf.b2c.mall.api.user.downMobileVfCode',
        'sf.b2c.mall.api.user.mobileRegister': 'scripts/api/sf.b2c.mall.api.user.mobileRegister',
        'sf.b2c.mall.api.user.needVfCode': 'scripts/api/sf.b2c.mall.api.user.needVfCode',
        'sf.b2c.mall.api.user.updateUserInfo': 'scripts/api/sf.b2c.mall.api.user.updateUserInfo',
        'sf.b2c.mall.api.user.delRecvInfo': 'scripts/api/sf.b2c.mall.api.user.delRecvInfo',
        'sf.b2c.mall.api.user.getBirthInfo': 'scripts/api/sf.b2c.mall.api.user.delRecvInfo',
        'sf.b2c.mall.api.user.setDefaultRecv': 'scripts/api/sf.b2c.mall.api.user.setDefaultRecv',
        'sf.b2c.mall.api.user.getRecvInfo': 'scripts/api/sf.b2c.mall.api.user.getRecvInfo',
        'sf.b2c.mall.api.user.partnerLogin': 'scripts/api/sf.b2c.mall.api.user.partnerLogin',
        'sf.b2c.mall.api.user.reqLoginAuth': 'scripts/api/sf.b2c.mall.api.user.reqLoginAuth',
        'sf.b2c.mall.api.user.getWeChatJsApiSig': 'scripts/api/sf.b2c.mall.api.user.getWeChatJsApiSig',

        'sf.b2c.mall.api.b2cmall.getBanner': 'scripts/api/sf.b2c.mall.api.b2cmall.getBanner',
        'sf.b2c.mall.api.b2cmall.getFastSaleInfoList': 'scripts/api/sf.b2c.mall.api.b2cmall.getFastSaleInfoList',
        'sf.b2c.mall.api.b2cmall.getItemInfo': 'scripts/api/sf.b2c.mall.api.b2cmall.getItemInfo',
        'sf.b2c.mall.api.b2cmall.getProductHotData': 'scripts/api/sf.b2c.mall.api.b2cmall.getProductHotData',
        'sf.b2c.mall.api.b2cmall.getProductHotDataList': 'scripts/api/sf.b2c.mall.api.b2cmall.getProductHotDataList',
        'sf.b2c.mall.api.b2cmall.getRecommendProducts': 'scripts/api/sf.b2c.mall.api.b2cmall.getRecommendProducts',
        'sf.b2c.mall.api.b2cmall.getSkuInfo': 'scripts/api/sf.b2c.mall.api.b2cmall.getSkuInfo',
        'sf.b2c.mall.api.b2cmall.getTimeLimitedSaleInfoList': 'scripts/api/sf.b2c.mall.api.b2cmall.getTimeLimitedSaleInfoList',
        'sf.b2c.mall.api.product.findRecommendProducts': 'scripts/api/sf.b2c.mall.api.product.findRecommendProducts',
        'sf.b2c.mall.api.b2cmall.getItemSummary': 'scripts/api/sf.b2c.mall.api.b2cmall.getItemSummary',

        'sf.b2c.mall.api.coupon.receiveCoupon': 'scripts/api/sf.b2c.mall.api.coupon.receiveCoupon',
        'sf.b2c.mall.api.coupon.receiveShareCoupon': 'scripts/api/sf.b2c.mall.api.coupon.receiveShareCoupon',
        'sf.b2c.mall.api.coupon.receiveCpCode': 'scripts/api/sf.b2c.mall.api.coupon.receiveCpCode',
        'sf.b2c.mall.api.coupon.getUserCouponList': 'scripts/api/sf.b2c.mall.api.coupon.getUserCouponList',
        'sf.b2c.mall.api.coupon.getShareBagCpList': 'scripts/api/sf.b2c.mall.api.coupon.getShareBagCpList',
        'sf.b2c.mall.api.coupon.getShareBagInfo': 'scripts/api/sf.b2c.mall.api.coupon.getShareBagInfo',

        // --------------------------------------------
        'placeholders': 'bower_components/Placeholders/build/placeholders',
        // 'vendor.jquery.imagezoom': 'scripts/vendor/vendor.jquery.imagezoom.min',
        'moment': 'bower_components/momentjs/min/moment.min',
        'moment-zh-cn': 'bower_components/momentjs/locale/zh-cn',
        // 'fastclick': 'bower_components/fastclick/lib/fastclick',

        // 公共组件
        // 'zepto': 'scripts/vendor/zepto',
        'swipe': 'scripts/vendor/swipe',
        'jweixin': 'scripts/vendor/jweixin-1.0.0',
        'sf.weixin': 'scripts/util/sf.weixin',
        'sf.helpers': 'scripts/util/sf.helpers',
        'sf.util': 'scripts/util/sf.util.fn',
        'sf.b2c.mall.widget.message': 'scripts/widget/sf.b2c.mall.widget.message',
        'sf.b2c.mall.widget.loading': 'scripts/widget/sf.b2c.mall.widget.loading',

        //公共模块
        'sf.b2c.mall.module.getcoupon': 'scripts/module/sf.b2c.mall.module.getcoupon',

        // 首页
        'sf.b2c.mall.page.main': 'scripts/page/sf.b2c.mall.page.main',
        'sf.b2c.mall.component.price': 'scripts/component/sf.b2c.mall.component.price',

        // 商品详情
        'sf.b2c.mall.page.detail': 'scripts/page/sf.b2c.mall.page.detail',
        'sf.b2c.mall.product.detailcontent': 'scripts/product/sf.b2c.mall.product.detailcontent',
        'sf.b2c.mall.adapter.detailcontent': 'scripts/adapter/sf.b2c.mall.adapter.detailcontent',

        // 订单
        'sf.b2c.mall.page.order': 'scripts/page/sf.b2c.mall.page.order',
        'sf.b2c.mall.order.fn': 'scripts/order/sf.b2c.mall.order.fn',
        'sf.b2c.mall.order.iteminfo': 'scripts/order/sf.b2c.mall.order.iteminfo',
        'sf.b2c.mall.order.selectreceiveaddr': 'scripts/order/sf.b2c.mall.order.selectreceiveaddr',
        'sf.b2c.mall.component.addreditor': 'scripts/component/sf.b2c.mall.component.addreditor',
        'sf.b2c.mall.adapter.address.list': 'scripts/adapter/sf.b2c.mall.adapter.address.list',
        'sf.b2c.mall.adapter.regions': 'scripts/adapter/sf.b2c.mall.adapter.regions',
        'sf.b2c.mall.adapter.order': 'scripts/adapter/sf.b2c.mall.adapter.order',

        // 登录
        'sf.b2c.mall.page.login': 'scripts/page/sf.b2c.mall.page.login',
        'sf.b2c.mall.component.login': 'scripts/component/sf.b2c.mall.component.login',

        // 注册
        'sf.b2c.mall.page.register': 'scripts/page/sf.b2c.mall.page.register',
        'sf.b2c.mall.component.register': 'scripts/component/sf.b2c.mall.component.register',

        // 去支付
        'sf.b2c.mall.page.gotopay': 'scripts/page/sf.b2c.mall.page.gotopay',

        // 订单列表
        'sf.b2c.mall.page.orderlist': 'scripts/page/sf.b2c.mall.page.orderlist',
        'sf.b2c.mall.order.orderlistcontent': 'scripts/order/sf.b2c.mall.order.orderlistcontent',

        // 订单详情
        'sf.b2c.mall.page.orderdetail': 'scripts/page/sf.b2c.mall.page.orderdetail',
        'sf.b2c.mall.order.orderdetailcontent': 'scripts/order/sf.b2c.mall.order.orderdetailcontent',

        // 个人中心
        'sf.b2c.mall.page.center': 'scripts/page/sf.b2c.mall.page.center',

        //优惠券
        'sf.b2c.mall.page.coupon': 'scripts/page/sf.b2c.mall.page.coupon',

        // 微信转跳中心
        'sf.b2c.mall.page.weixincenter': 'scripts/page/sf.b2c.mall.page.weixincenter',

        // alipay支付
        'sf.b2c.mall.page.alipayframe': 'scripts/page/sf.b2c.mall.page.alipayframe',

        // 支付成功
        'sf.b2c.mall.page.paysuccess': 'scripts/page/sf.b2c.mall.page.paysuccess',

        // 收货地址管理
        'sf.b2c.mall.page.recaddrmanage': 'scripts/page/sf.b2c.mall.page.recaddrmanage',
        'sf.b2c.mall.component.recaddrmanage': 'scripts/component/sf.b2c.mall.component.recaddrmanage',

        // 红包
      'sf.b2c.mall.page.luckymoneyshare': 'scripts/page/sf.b2c.mall.page.luckymoneyshare',
      'sf.b2c.mall.page.luckymoneyaccept': 'scripts/page/sf.b2c.mall.page.luckymoneyaccept',
      'sf.b2c.mall.luckymoney.users': 'scripts/luckymoney/sf.b2c.mall.luckymoney.users'
    }
});