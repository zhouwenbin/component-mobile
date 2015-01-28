requirejs.config({
    baseUrl: ' /',
    paths: {
        // ----------------------------------------
        // Pre Define
        'can': 'http://www.google.com/bower_components/canjs/amd/can',
        'jquery': 'http://www.google.com/bower_components/jquery/dist/jquery',
        'underscore': 'http://www.google.com/bower_components/underscore/underscore-min',
        'jquery.cookie': 'http://www.google.com/bower_components/jquery.cookie/jquery.cookie',
        'md5': 'http://www.google.com/bower_components/blueimp-md5/js/md5.min',
        'underscore.string': 'http://www.google.com/bower_components/underscore.string/dist/underscore.string.min',
        'store': 'http://www.google.com/bower_components/store/dist/store',

        'sf.b2c.mall.api.sc.getUserRoutes': 'http://www.google.com/app/scripts/api/sc/sf.b2c.mall.api.sc.getUserRoutes',

        'sf.b2c.mall.api.order.submitOrder': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.submitOrder',
        'sf.b2c.mall.api.order.submitOrderV2': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.submitOrderV2',
        'sf.b2c.mall.api.order.cancelOrder': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.cancelOrder',
        'sf.b2c.mall.api.order.confirmReceive': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.confirmReceive',
        'sf.b2c.mall.api.order.getOrder': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.getOrder',
        'sf.b2c.mall.api.order.getOrderList': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.getOrderList',
        'sf.b2c.mall.api.order.getSubOrder': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.getSubOrder',
        'sf.b2c.mall.api.order.requestPay': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.requestPay',
        'sf.b2c.mall.api.order.requestPayV2': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.requestPayV2',
        'sf.b2c.mall.api.order.submitOrderForAllSys': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.submitOrderForAllSys',

        'sf.b2c.mall.api.products.getSKUBaseList': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.product.getSKUBaseList',
        'sf.b2c.mall.api.products.getSKUInfo': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.product.getSKUInfo',
        'sf.b2c.mall.api.products.getSPUInfo': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.product.getSPUInfo',
        'sf.b2c.mall.api.products.updateSkuSellStock': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.product.updateSkuSellStock',
        'sf.b2c.mall.api.products.getAllParents': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.products.getAllParents',
        'sf.b2c.mall.api.products.getCategories': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.products.getCategories',
        'sf.b2c.mall.api.products.search': 'http://www.google.com/app/scripts/api/products/sf.b2c.mall.api.products.search',

        'sf.b2c.mall.api.user.appLogin': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.appLogin',
        'sf.b2c.mall.api.user.changePassword': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.changePassword',
        'sf.b2c.mall.api.user.checkUserExist': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.checkUserExist',
        'sf.b2c.mall.api.user.checkVerifyCode': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.checkVerifyCode',
        'sf.b2c.mall.api.user.createRecAddress': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.createRecAddress',
        'sf.b2c.mall.api.user.createReceiverInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.createReceiverInfo',
        'sf.b2c.mall.api.user.delRecAddress': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.delRecAddress',
        'sf.b2c.mall.api.user.deviceRegister': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.deviceRegister',
        'sf.b2c.mall.api.user.getIDCardUrlList': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.getIDCardUrlList',
        'sf.b2c.mall.api.user.getInviteCodeList': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.getInviteCodeList',
        'sf.b2c.mall.api.user.getRecAddressList': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.getRecAddressList',
        'sf.b2c.mall.api.user.getUserInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.getUserInfo',
        'sf.b2c.mall.api.user.logout': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.logout',
        'sf.b2c.mall.api.user.mailRegister': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.mailRegister',
        'sf.b2c.mall.api.user.renewToken': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.renewToken',
        'sf.b2c.mall.api.user.resetPassword': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.resetPassword',
        'sf.b2c.mall.api.user.sendActivateMail': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.sendActivateMail',
        'sf.b2c.mall.api.user.sendResetPwdLink': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.sendResetPwdLink',
        'sf.b2c.mall.api.user.setDefaultAddr': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.setDefaultAddr',
        'sf.b2c.mall.api.user.upateUserInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.upateUserInfo',
        'sf.b2c.mall.api.user.updateRecAddress': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.updateRecAddress',
        'sf.b2c.mall.api.user.updateReceiverInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.updateReceiverInfo',
        'sf.b2c.mall.api.user.userActivate': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.userActivate',
        'sf.b2c.mall.api.user.webLogin': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.webLogin',
        'sf.b2c.mall.api.user.federatedLogin': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.federatedLogin',
        'sf.b2c.mall.api.user.checkLink': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.checkLink',
        'sf.b2c.mall.api.user.checkSmsCode': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.checkSmsCode',
        'sf.b2c.mall.api.user.downSmsCode': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.downSmsCode',
        'sf.b2c.mall.api.user.downMobileVfCode': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.downMobileVfCode',
        'sf.b2c.mall.api.user.mobileRegister': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.mobileRegister',
        'sf.b2c.mall.api.user.needVfCode': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.needVfCode',
        'sf.b2c.mall.api.user.updateUserInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.updateUserInfo',
        'sf.b2c.mall.api.user.delRecvInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.delRecvInfo',
        'sf.b2c.mall.api.user.getBirthInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.delRecvInfo',
        'sf.b2c.mall.api.user.setDefaultRecv': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.setDefaultRecv',
        'sf.b2c.mall.api.user.getRecvInfo': 'http://www.google.com/app/scripts/api/user/sf.b2c.mall.api.user.getRecvInfo',

        'sf.b2c.mall.api.b2cmall.getBanner': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getBanner',
        'sf.b2c.mall.api.b2cmall.getFastSaleInfoList': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getFastSaleInfoList',
        'sf.b2c.mall.api.b2cmall.getItemInfo': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getItemInfo',
        'sf.b2c.mall.api.b2cmall.getProductHotData': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getProductHotData',
        'sf.b2c.mall.api.b2cmall.getProductHotDataList': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getProductHotDataList',
        'sf.b2c.mall.api.b2cmall.getRecommendProducts': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getRecommendProducts',
        'sf.b2c.mall.api.b2cmall.getSkuInfo': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getSkuInfo',
        'sf.b2c.mall.api.b2cmall.getTimeLimitedSaleInfoList': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getTimeLimitedSaleInfoList',
        'sf.b2c.mall.api.product.findRecommendProducts': 'http://www.google.com/sf.b2c.mall.api.product.findRecommendProducts',
        'sf.b2c.mall.api.b2cmall.getItemSummary': 'http://www.google.com/app/scripts/api/b2cmall/sf.b2c.mall.api.b2cmall.getItemSummary',

        'sf.b2c.mall.business.config': 'http://www.google.com/app/scripts/config/sf.b2c.mall.business.<%= config.target %>.config',
        'sf.b2c.mall.api.security.type': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.api.security.type',
        'sf.b2c.mall.framework.adapter': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.adapter',
        'sf.b2c.mall.framework.comm': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.comm',
        'sf.b2c.mall.framework.multiple.comm': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.multiple.comm',
        'sf.b2c.mall.framework.view.controller': 'http://www.google.com/app/scripts/framework/sf.b2c.mall.framework.view.controller',
        'sf.b2c.mall.util.utils': 'http://www.google.com/app/scripts/util/sf.b2c.mall.util.utils',
        // --------------------------------------------
        'placeholders': 'bower_components/Placeholders/build/placeholders',
        'vendor.jquery.imagezoom': 'scripts/vendor/vendor.jquery.imagezoom.min',
        'moment': 'bower_components/momentjs/min/moment.min',
        'moment-zh-cn': 'bower_components/momentjs/locale/zh-cn',
        'fastclick': 'bower_components/fastclick/lib/fastclick',

        // 公共组件
        'zepto': 'scripts/vendor/zepto',
        'swipe': 'scripts/vendor/swipe',
        'sf.helpers': 'scripts/util/sf.helpers',
        'sf.util': 'scripts/util/sf.util.fn',
        'sf.b2c.mall.widget.message': 'scripts/widget/sf.b2c.mall.widget.message',
        'sf.b2c.mall.widget.loading': 'scripts/widget/sf.b2c.mall.widget.loading',

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
        'sf.b2c.mall.order.orderdetailcontent': 'scripts/order/sf.b2c.mall.order.orderdetailcontent'
    }
});