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
    'text!template_order_orderlist'
  ],
  function(can, $, SFGetOrderList, OrderFn, SFHelpers, SFFn, SFMessage, SFConfig, SFSwitcher, template_order_orderlist) {

    var DEFAULT_PAGE_NUM = 1;
    var DEFAULT_PAGE_SIZE = 50;
    var EMPTY_IMG = "http://m.sfht.com/static/img/no.png";
    var PREFIX = 'http://img0.sfht.com';
    var DEFAULT_STATUS = 'all';

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
          if (_.isArray(array)) {
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
            count = item.orderGoodsItemList.length + count;
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
          }
        }

      },

      init: function() {
        this.render();
      },

      render: function() {
        this.request({
          pageNum: 1,
          pageSize: 50
        });
      },

      request: function(cparams) {
        var that = this;

        var params = {
          query: JSON.stringify({
            status: cparams.status,
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
        var renderFn = can.view.mustache(template_order_orderlist);

        this.options.data = new can.Map(data);
        this.options.data.attr('status', this.orderStatusMap[can.route.attr('status') || DEFAULT_STATUS]);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);

        can.$('.loadingDIV').hide();
      },

      '{can.route} change': function() {
        var params = can.route.attr();
        this.request(params);
      },

      '.status-list li click': function($element, event) {
        var status = $element.attr('data-status');
        can.route.attr('status', status);
      },

      '.gotopay click': function($element, event) {
        event && event.preventDefault();

        var order = $element.closest('li').data('order');
        var url = SFConfig.setting.link.gotopay + '&' + $.param({
          "orderid": order.orderId
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

        var success = function() {
          window.location.reload();
        };

        var error = function() {
          // @todo 错误提示
        }

        OrderFn.orderCancel(order, success, error);
      },

      '.status-list li a click': function($element, event) {
        event && event.preventDefault();

        var status = $element.attr('data-status');
        can.route.attr('status', status);

        return false;
      }

    });
  });