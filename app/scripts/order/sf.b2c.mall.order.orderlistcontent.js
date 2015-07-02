'use strict';


/**
 * @author Michael.Lee (lichunmin@sf-express.com)
 * @description 订单列表业务component
 */
define('sf.b2c.mall.order.orderlistcontent', [
    'can',
    'zepto',
    'sf.b2c.mall.api.order.getOrderList',
    'sf.b2c.mall.order.fn',
    'sf.helpers',
    'sf.util',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'text!template_order_orderlist',
    'sf.b2c.mall.api.shopcart.addItemsToCart' // 添加购物车接口
  ],
  function(can, $, SFGetOrderList, OrderFn, SFHelpers, SFFn, SFMessage, SFConfig, SFSwitcher, template_order_orderlist, SFAddItemToCart) {

    var DEFAULT_PAGE_NUM = 1;
    var DEFAULT_PAGE_SIZE = 10;

    var EMPTY_IMG = "http://m.sfht.com/static/img/no.png";
    var PREFIX = 'http://img0.sfht.com';
    var DEFAULT_STATUS = '';
    var DEFAULT_ANIMATE_TIME = 3000;

    can.route.ready();

    return can.Control.extend({

      orderStatusMap: {
        'all': '',
        'submited': 'SUBMITED',
        'waitshipping': 'WAIT_SHIPPING',
        'shipping': 'SHIPPING'
      },

      helpers: {

        /**
         * @description 从string中获取图片地址
         * @param  {function} imgs  图片地址源
         * @return {string}         图片地址
         */
        'sf-image': function(imgs) {
          var array = eval(imgs());
          if (_.isArray(array) && array.length > 0) {
            var url = array[0].replace(/.jpg/g, '.jpg@63h_63w.jpg');
            if (/^http/.test(url)) {
              return url;
            } else {
              // 单独处理 '/spu/68e30153-ea6e-48f3-825b-788fb18e8552.jpg@63h_63w.jpg'
              return PREFIX + url;
            }
          } else {
            return EMPTY_IMG
          }
        },

        'sf-good-count': function(items) {
          var count = 0;
          var array = items().attr();
          _.each(array, function(item) {
            _.each(item.orderGoodsItemList, function(good){
              count = good.quantity + count;
            });
          });
          return count;
        },

        'sf-index': function(index) {
          return index() + 1;
        },

        'sf-order-show': function(status, allows, options) {
          var array = allows.split(',');
          if (_.contains(array, status())) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-order-status': function(status) {
          var statusMap = {
            'SUBMITED': '已提交',
            'AUTO_CANCEL': '自动取消',
            'USER_CANCEL': '用户取消',
            'AUDITING': '待审核',
            'OPERATION_CANCEL': '运营取消',
            'BUYING': '采购中',
            'BUYING_EXCEPTION': '采购异常',
            'WAIT_SHIPPING': '待发货',
            'SHIPPING': '正在出库',
            'LOGISTICS_EXCEPTION': '物流异常',
            'SHIPPED': '已发货',
            'COMPLETED': '已完成',
            'AUTO_COMPLETED': '自动完成'
          };

          return statusMap[status()];
        },

        'sf-is-active': function(status, cstatus) {
          if (status() == cstatus) {
            return 'active';
          }else if (!status() && cstatus == '') {
            return 'active';
          }
        },

        'sf-status-show-case': OrderFn.helpers['sf-status-show-case'],
        'sf-coupon-type': OrderFn.helpers['sf-coupon-type'],

        'sf-real-price': function(total, discount) {
          return (total() - discount()) / 100;
        },

        'sf-show-route': function(status, options) {
          if (status() != 'SUBMITED' 
            && status() != 'AUDITING' 
            && status() != 'AUTO_CANCEL' 
            && status() != 'USER_CANCEL' 
            && status() != 'OPERATION_CANCEL' 
            && status() != 'CLOSED') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        'sf-package-status': OrderFn.helpers['sf-package-status']
      },

      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.render();
      },

      render: function() {
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        this.request({
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          status: params.status
        });
      },

      request: function(cparams) {
        var that = this;

        var params = {
          query: JSON.stringify({
            status: cparams.status || DEFAULT_STATUS,
            receiverName: cparams.receiverName,
            orderId: cparams.orderId,
            pageNum: cparams.pageNum || DEFAULT_PAGE_NUM,
            pageSize: cparams.pageSize || DEFAULT_PAGE_SIZE
          })
        };

        can.$('.loadingDIV').show();
        var getOrderList = new SFGetOrderList(params);
        getOrderList.sendRequest().done(_.bind(this.paint, this));
      },

      paint: function(data) {
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());
        var renderFn = can.view.mustache(template_order_orderlist);

        data.supplement = {onLoadingData: false};
        this.options.data = new can.Map(data);
        this.options.data.attr('status', params.status || DEFAULT_STATUS);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);

        can.$('.loadingDIV').hide();
        this.initLoadDataEvent();
      },

      /**
       * @author zhangke
       * @description 初始化上拉加载数据事件
       */
      initLoadDataEvent: function() {
        var that = this;
        var renderData = this.options.data;
        //节流阀
        var loadingDatas = function(){
          if (renderData.page.pageNum * renderData.page.pageSize > renderData.page.totalNum) {
            return;
          }
          var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
          var windowHeight = $(window).height(); //窗口的高度
          var dbHiht = $(".sf-b2c-mall-order-orderlist").height(); //整个页面文件的高度

          if((windowHeight + srollPos + 200) >= (dbHiht)){

            that.loadingData();
          }
        };

        $(window).scroll(_.throttle(loadingDatas, 200));
      },

      loadingData: function(cparams) {

        var that = this;
        that.options.data.attr("supplement.onLoadingData", true);

        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        var params = {
          query: JSON.stringify({
            status: params.status,
            receiverName: "",
            orderId: params.orderId,
            pageNum: this.options.data.page.pageNum + 1,
            pageSize: this.options.data.page.pageSize
          })
        };

        var getOrderList = new SFGetOrderList(params);
        getOrderList.sendRequest().done(function(data) {
          that.options.data.attr("supplement.onLoadingData", false);
          
          _.each(data.orders, function(item) {
            that.options.data.orders.push(item);
          });

          that.options.data.attr("page", data.page);
        });
      },

      '.gotopay click': function($element, event) {
        event && event.preventDefault();

        var order = $element.closest('li').data('order');
        var url = SFConfig.setting.link.gotopay + '&' + $.param({
          "orderid": order.orderId,
          "showordersuccess": true
        });

        // －－－－－－－－－－－－－－－－－－
        // 不同环境切换不同的支付页面
        var switcher = new SFSwitcher();

        switcher.register('wechat', function() {
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90f1dcb866f3df60&redirect_uri=" + escape(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
        });

        switcher.register('web', function() {
          window.location.href = url;
        });

        switcher.go();
        // －－－－－－－－－－－－－－－－－－－

        return false;
      },

      '.ordercancel click': function($element, event) {
        event && event.preventDefault();
        var order = $element.closest('li').data('order');

        var message = new SFMessage(null, {
          'tip': '确认要取消该订单？',
          'type': 'confirm',
          'okFunction': function() {
            var success = function() {
              window.location.reload();
            };

            var error = function() {
              // @todo 错误提示
            }

            OrderFn.orderCancel(order, success, error);
          }
        });
      },

      '.delete click': function($element, event) {
        event && event.preventDefault();
        var order = $element.closest('li').data('order');

        var message = new SFMessage(null, {
          'tip': '确认要删除该订单？',
          'type': 'confirm',
          'okFunction': function() {
            var success = function() {
              window.location.reload();
            };

            var error = function() {
              // @todo 错误提示
            }

            OrderFn.orderDelete(order, success, error);
          }
        });
      },

      '.received click': function($element, event) {
        event && event.preventDefault();
        var order = $element.closest('li').data('order');

        var message = new SFMessage(null, {
          'tip': '确认收货？',
          'type': 'confirm',
          'okFunction': function() {
            var success = function() {
              window.location.reload();
            };

            var error = function() {
              // @todo 错误提示
            }

            OrderFn.orderConfirm(order, success, error);
          }
        });
      },

      '.status-list li a click': function($element, event) {
        event && event.preventDefault();

        var status = $element.attr('data-status');
        // can.route.attr('status', status);

        var params = can.deparam(window.location.search.substr(1));
        params.status = status;

        // window.location.search = '?' + $.param(params)
        // window.location = window.location.pathname + '?' + $.param(params)

        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          window.location = SFConfig.setting.link.orderlist + '?' + $.param(params)
        });

        switcher.register('app', function () {
          can.route.attr('status', status);
        });

        switcher.go();

        // return false;
      },

      '.rebuy click': function($element, event) {
        event && event.preventDefault();
        var order = $element.closest('li').data('order');

        var array = [];
        order.orderPackageItemList.each(function(packageInfo, index) {
          packageInfo.orderGoodsItemList.each(function(good, index) {
            array.push({
              itemId: good.itemId,
              num: good.quantity
            })
          })
        });

        this.addCart(array);
      },

      /**
       * @author Michael.Lee
       * @description 加入购物车
       */
      addCart: function(array) {
        var addItemToCart = new SFAddItemToCart({
          items: JSON.stringify(array)
        });

        // 添加购物车发送请求
        addItemToCart.sendRequest()
          .done(function(data) {
            if (data.isSuccess) {
              // can.trigger(window, 'updateCart');
              window.location.href = 'http://m.sfht.com/shoppingcart.html'
            }else{

              var $el = $('<section class="tooltip center overflow-num"><div>'+data.resultMsg+'</div></section>');
              $(document.body).append($el);
              setTimeout(function() {
                $el.remove();
              }, DEFAULT_ANIMATE_TIME);
            }
          })
          .fail(function(data) {
            // if (data == 15000800) {
            //   var $el = $('<section class="tooltip center overflow-num"><div>您的购物车已满，赶紧去买单哦～</div></section>');
            //   $(document.body).append($el);
            //   setTimeout(function() {
            //     $el.remove();
            //   }, 10000);
            // }
          })
      }

    });
  });