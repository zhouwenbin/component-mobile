'use strict';

define('sf.b2c.mall.order.orderlistcontent', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.api.order.getOrderList',
    'sf.b2c.mall.api.order.requestPayV2',
    'sf.b2c.mall.order.fn',
    'sf.helpers',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, Fastclick, SFGetOrderList, SFRequestPayV2, SFOrderFn, helpers, SFMessage, SFConfig) {

    Fastclick.attach(document.body);

    return can.Control.extend({

      /**
       * 初始化
       * @param  {DOM} element 容器element
       * @param  {Object} options 传递的参数
       */
      init: function(element, options) {
        this.render();
      },

      /**
       * [render 渲染]
       * @param  {[type]} data 数据
       */
      render: function(data) {
        var that = this;

        var params = {
          "query": JSON.stringify({
            "status": null,
            "receiverName": that.options.searchValue,
            "orderId": that.options.searchValue,
            "pageNum": 1,
            "pageSize": 100
          })
        }

        var getOrderList = new SFGetOrderList(params);
        getOrderList
          .sendRequest()
          .done(function(data) {

            that.options.notCompletedOrderList = [];
            that.options.completedOrderList = [];

            if (data.orders) {
              _.each(data.orders, function(order) {

                //“待审核”“采购中”“待发货”“正在出库”“已发货”
                if (order.orderStatus == 'SUBMITED' || order.orderStatus == 'AUDITING' || order.orderStatus == 'BUYING' || order.orderStatus == 'WAIT_SHIPPING' || order.orderStatus == 'SHIPPING' || order.orderStatus == 'SHIPPED') {
                  that.options.notCompletedOrderList.push(order);
                } else {
                  that.options.completedOrderList.push(order);
                }

                if (typeof order.orderGoodsItemList[0] !== 'undefined') {
                  order.goodsName = order.orderGoodsItemList[0].goodsName;
                  if (order.orderGoodsItemList[0].imageUrl == "" || null == order.orderGoodsItemList[0].imageUrl) {
                    order.imageUrl = "http://m.sfht.com/static/img/no.png";
                  } else {
                    order.imageUrl = JSON.parse(order.orderGoodsItemList[0].imageUrl)[0];
                  }
                  // if (typeof order.orderGoodsItemList[0].spec !== 'undefined') {
                  //   order.spec = order.orderGoodsItemList[0].spec.split(',').join("&nbsp;/&nbsp;");
                  // }
                  order.optionHMTL = that.getOptionHTML(that.optionMap[order.orderStatus]);
                  order.orderStatus = that.statsMap[order.orderStatus];
                }
              })

              that.options.notCompletedLength = that.options.notCompletedOrderList.length;

              that.options.notCompletedOrderListIsNotEmpty = (that.options.notCompletedOrderList.length > 0);
              that.options.completedOrderListIsNotEmpty = (that.options.completedOrderList.length > 0);

              var html = can.view('templates/order/sf.b2c.mall.order.orderlist.mustache'+'?v='+SFConfig.setting.ver, that.options);
              that.element.html(html);

              // $('.gotoPay').tap(function() {
              //   that.gotoPayClick($(this));
              // })

              // $('.viewOrder').tap(function() {
              //   that.viewOrderClick($(this));
              // })
            } else {
              that.options.notCompletedLength = 0;
              that.options.notCompletedOrderListIsNotEmpty = false;
              that.options.completedOrderListIsNotEmpty = false;

              var html = can.view('templates/order/sf.b2c.mall.order.orderlist.mustache'+'?v='+SFConfig.setting.ver, that.options);
              that.element.html(html);
            }

            // $('#notCompleteOrderListTabhead').tap(function() {
            //   that.switchTab($(this), 'notCompletedTab');
            // })

            // $('#completeOrderListTabhead').tap(function() {
            //   that.switchTab($(this), 'completedTab');
            // })

            if (that.options.notCompletedOrderList.length == 0 && that.options.completedOrderList.length > 0) {
              that.switchTab(can.$('#completeOrderListTabhead'), 'completedTab');
            } else {
              can.$('#completedTab').hide();
              can.$('#notCompletedTab').show();
            }

            can.$('.loadingDIV').hide();

          })
          .fail(function(error) {
            console.error(error);
            can.$('.loadingDIV').hide();
          })
      },

      '#notCompleteOrderListTabhead click': function (element, event) {
        this.switchTab(element, 'notCompletedTab');
      },

      '#completeOrderListTabhead click': function (element, event) {
        this.switchTab(element, 'completedTab');
      },

      /**
       * [switchTab 切换tab]
       * @param  {[type]} tab [description]
       * @return {[type]}     [description]
       */
      switchTab: function(element, tab) {
        if (element.hasClass('active')) {
          return false;
        }
        //tab
        can.$("#notCompleteOrderListTabhead").toggleClass("active");
        can.$('#completeOrderListTabhead').toggleClass("active");

        var that = this;

        var map = {
          'completedTab': function() {
            $('#notCompletedTab').hide();
            $('#completedTab').show();
          },

          'notCompletedTab': function() {
            $('#completedTab').hide();
            $('#notCompletedTab').show();
          }
        }

        map[tab].apply(this);
      },

      /**
       * [getOptionHTML 获得操作Html拼接]
       * @param  {[type]} operationsArr 操作数组
       * @return {[type]} 拼接html
       */
      getOptionHTML: function(operationsArr) {
        var that = this;
        var result = [];
        _.each(operationsArr, function(option) {
          if (that.optionHTML[option]) {
            result.push(that.optionHTML[option]);
          }
        })

        return result.join("");
      },

      /**
       * [optionMap 状态下允许执行的操作]
       */
      optionMap: {
        'SUBMITED': ['NEEDPAY'],
        'AUTO_CANCEL': [],
        'USER_CANCEL': [],
        'AUDITING': [],
        'OPERATION_CANCEL': [],
        'BUYING': [],
        'BUYING_EXCEPTION': [],
        'WAIT_SHIPPING': [],
        'SHIPPING': [],
        'LOGISTICS_EXCEPTION': [],
        'SHIPPED': [],
        'COMPLETED': [],
        'AUTO_COMPLETED': []
      },

      /**
       * [optionHTML 操作对应的html]
       */
      optionHTML: {
        "NEEDPAY": '<a href="#" class="btn btn-normal active gotoPay">去支付</a>',
        "INFO": '<a href="#" class="btn btn-normal viewOrder">查看订单</a>',
        "CANCEL": '<a href="#" class="link btn-normal cancelOrder">取消订单</a>',
        "RECEIVED": '<a href="#" class="btn btn-normal received">确认签收</a>'
      },

      '.gotoPay click': function(element, event) {
        event && event.preventDefault();

        var that = this;
        var orderId = element.parent('div#operationarea').eq(0).attr('data-orderid');

        var callback = {
          error: function() {
            var message = new SFMessage(null, {
              'tip': '支付失败！',
              'type': 'error',
              'okFunction': function() {
                that.render();
              }
            });
          }
        }

        SFOrderFn.payV2({
          orderid: orderId
        }, callback);

        return false;
      },

      '.viewOrder click': function(element, event) {
        var orderid = element.eq(0).attr('data-orderid');
        var suborderid = element.eq(0).attr('data-suborderid');
        var recid = element.eq(0).attr('data-recid');

        window.location.href = SFConfig.setting.link.orderdetail + "&orderid=" + orderid + "&suborderid=" + suborderid + "&recid=" + recid;
      },

      errorMap: {
        //"4000100": 'order unkown error！',
        "4000800": '订单状态不能取消！'
      },

      receiveDErrorMap: {
        //'4000100': 'order unkown error！',
        '4000900': '子订单状态不符合确认操作！'
      },

      /**
       * [statsMap 状态对应界面词汇]
       * @type {Object}
       */
      statsMap: {
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
      }

    });
  })