'use strict';

define('sf.b2c.mall.order.orderdetailcontent', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.api.order.getOrder',
    'sf.b2c.mall.api.order.cancelOrder',
    'sf.b2c.mall.api.user.updateReceiverInfo',
    'sf.b2c.mall.api.user.getIDCardUrlList',
    'sf.b2c.mall.api.sc.getUserRoutes',
    'sf.b2c.mall.api.user.getRecvInfo',
    'sf.b2c.mall.api.order.confirmReceive',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.order.fn',
    'sf.b2c.mall.widget.message',
    'moment'
  ],
  function(can, $, Fastclick, SFGetOrder, SFCancelOrder, SFUpdateReceiverInfo, SFGetIDCardUrlList, SFGetUserRoutes, SFGetRecvInfo, SFConfirmReceive, loading, FrameworkComm, SFConfig, Utils, helpers, SFOrderFn, SFMessage, moment) {
    Fastclick.attach(document.body);


    return can.Control.extend({

      /**
       * [defaults 定义默认值]
       */
      defaults: {
        'steps': ['SUBMITED', 'AUDITING', 'WAIT_SHIPPING', 'SHIPPING', 'COMPLETED']
      },

      /**
       * 初始化
       * @param  {DOM} element 容器element
       * @param  {Object} options 传递的参数
       */
      init: function(element, options) {
        this.component = {};
        this.render();
      },

      /**
       * [render 执行渲染]
       * @param  {[type]} data 数据
       */
      render: function(data) {
        var that = this;

        var params = can.deparam(window.location.search.substr(1));

        var getOrder = new SFGetOrder({
          "orderId": params.orderid
        });

        var getRecvInfo = new SFGetRecvInfo({
          "recId": params.recid
        });

        var getUserRoutes = new SFGetUserRoutes({
          'bizId': params.orderid
        });

        this.options.userRoutes = new Array();
        var orderData;
        can.when(getOrder.sendRequest(),getRecvInfo.sendRequest())
          .done(function(data,idcard){

            that.options.orderId = data.orderId;
            that.options.recId = data.orderItem.rcvrId;
            that.options.gmtCreate = data.orderItem.gmtCreate;

            that.options.status = that.statsMap[data.orderItem.orderStatus];
            that.options.operationHTML = that.optionHTML[that.nextStepMap[data.orderItem.orderStatus]];

            that.options.needShowTips = false;
            if (data.orderItem.rcvrState == 0 || data.orderItem.rcvrState == 1 || data.orderItem.rcvrState == 3) {
              that.options.needShowTips = true;
              that.options.uploadIDCardTips = '该笔订单需要上传收货人身份信息，请<a href="javascript:void(0)" id="contactMe">联系客服</a>';
            }

            that.options.receiveInfo = data.orderItem.orderAddressItem;
            that.options.receiveInfo.certNo = idcard.credtNum;

            orderData = data ;
            return getUserRoutes.sendRequest();
          })
          .then(function(routesList){

            //构建路由数据
            that.buildUserRoutes(orderData, routesList);

            
            that.options.productList = orderData.orderItem.orderGoodsItemList;

            _.each(that.options.productList, function(item) {
              item.totalPrice = item.price * item.quantity;
              if (typeof that.options.productList[0].spec !== "undefined") {
                item.spec = that.options.productList[0].spec.split(',').join("</li><li>");
              }
              if (item.imageUrl == "" || item.imageUrl == null) {
                item.imageUrl = "http://m.sfht.com/static/img/no.png";
              } else {
                item.imageUrl = JSON.parse(item.imageUrl)[0];
              }
            });

            that.options.allTotalPrice = that.options.productList[0].totalPrice;
            that.options.showShouldPayPrice = that.canShowShouldPayPrice(orderData);

            //是否是宁波保税，是得话才展示税额
            that.options.showTax = that.options.productList[0].bonded;
            that.options.shouldPayPrice = that.options.allTotalPrice;

            if (orderData.orderItem.orderStatus == 'SUBMITED') {
              that.options.showPayButton = true;
            }

            that.options.firstRoute = that.options.userRoutes[that.options.userRoutes.length - 1]

            var html = can.view('templates/order/sf.b2c.mall.order.orderdetail.mustache', that.options);
            that.element.html(html);

            //页面初始化布局
            $('#orderdetail').show();
            $('#buy').show();
            $('#userRoutes').hide();
            $('.loadingDIV').hide();
            
          })
          .fail(function(error){
            console.error(error);
            $('.loadingDIV').hide();
          })

        
      },

      canShowShouldPayPrice: function(data) {
        var cancelArr = new Array();
        cancelArr.push('AUTO_CANCEL');
        cancelArr.push('USER_CANCEL');
        cancelArr.push('OPERATION_CANCEL');
        //判断浏览器是否支持indexOf方法，如果不支持执行下面方法
        if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
              if (this[i] === obj) {
                return i;
              }
            }
            return -1;
          }
        }

        return (cancelArr.indexOf(data.orderItem.orderStatus) === -1);
      },

      /**
       * [buildUserRoutes 构建路由]
       * @param  {[type]} data       [description]
       * @param  {[type]} routesList [description]
       * @return {[type]}            [description]
       */
      buildUserRoutes: function(data, routesList) {
        var that = this;
        that.options.traceList = data.orderActionTraceItemList;

        //加入订单状态
        _.each(that.options.traceList, function(trace) {
          trace.operator = that.operatorMap[trace.operator] || '系统';
          trace.description = that.statusDescription[trace.status];

          if (trace.status != 'COMPLETED' && trace.status != 'AUTO_COMPLETED') {
            that.options.userRoutes.push(trace);
          }
        })

        //合并路由
        if (routesList && routesList.value) {
          _.each(routesList.value, function(route) {
            if (typeof route.carrierCode != 'undefined' && route.carrierCode == 'SF') {
              that.options.userRoutes.push({
                "gmtHappened": moment(route.eventTime).format('YYYY/MM/DD HH:mm:ss'),
                "description": (typeof route.position != 'undefined' ? route.position : "") + " " + route.remark,
                "operator": "系统"
              });
            }
          })
        }

        //增加剩下的
        _.each(that.options.traceList, function(trace) {
          if (trace.status == 'COMPLETED' || trace.status == 'AUTO_COMPLETED') {
            that.options.userRoutes.push(trace);
          }
        })

        that.options.userRoutes.reverse();
      },

      /**
       * [viewUserRoutes 查看路由]
       * @return {[type]} [description]
       */
      "#viewUserRoutes click": function() {
        $('#orderdetail').hide();
        $('#buy').hide();
        $('#userRoutes').show();
      },

      /**
       * [viewOrderDetail 查看订单详情]
       * @return {[type]} [description]
       */
      "#viewOrderDetail click": function() {
        $('#orderdetail').show();
        $('#buy').show();
        $('#userRoutes').hide();
      },

      /**
       * [contactMeClick 联系客服]
       * @return {[type]} [description]
       */
      "#contactMe click": function() {
        $('.dialog-phone').show();
        $('#closeContactMe').click(function() {
          $('.dialog-phone').hide();
        })
      },

      cardStatusMap: {
        1: "<span class='label label-disabled'>身份证照片正在审核</span>",
        2: "<span class='label label-success'>身份证照片已审核</span>",
        3: "<span class='label label-error'>身份证照片审核不通过，请重新上传</span>"
      },

      cardTipsMap: {
        0: "<span class='label label-error'>尊敬的客户，该笔订单清关时需要上传收货人的身份证照片，为了您更快的收到商品，请尽快上传收货人的身份证照片。</span>",
        1: "<span class='label label-error'>尊敬的客户，您上传的身份证照片正在审核中，请耐心等待。</span>",
        3: "<span class='label label-error'>尊敬的客户，您上传的身份证照片审核不通过，请重新上传！为了您更快的收到商品，请尽快上传正确的身份证照片。</span>"
      },

      statusDescription: {
        'SUBMITED': '您的订单已提交，请尽快完成支付',
        'AUTO_CANCEL': '超时未支付，订单自动取消',
        'USER_CANCEL': '用户取消订单成功',
        'AUDITING': '您的订单已付款成功，正在等待顺丰审核',
        'OPERATION_CANCEL': '订单取消成功',
        'BUYING': '您的订单已经审核通过，不能修改。订单进入顺丰海外采购阶段',
        // 'BUYING_EXCEPTION': '采购异常',
        'WAIT_SHIPPING': '您的订单已经审核通过，不能修改，订单正在等待仓库发货',
        'SHIPPING': '您的订单已经分配给顺丰海外仓，正在等待出库操作',
        // 'LOGISTICS_EXCEPTION': '物流异常',
        'SHIPPED': '您的订单已从顺丰海外仓出库完成，正在进行跨境物流配送',
        'COMPLETED': '您已确认收货，订单已完成',
        'AUTO_COMPLETED': '系统确认订单已签收超过7天，订单自动完成'
      },

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

      operatorMap: {
        "USER": "用户"
      },

      optionHTML: {
        "CANCELORDER": '<a href="javascript:void(0)" id="cancelorder">取消订单</a>',
        "RECEIVED": '<a href="#" class="btn btn-normal received">确认签收</a>'
      },

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
      },

      stepMap: {
        'SUBMITED': '<li class="active"><div><h3>提交订单</h3><p></p>2014/12/23 11:34:23<p></p></div><span></span><div class="line"></div></li>',
        'AUDITING': '<li><div><h3>付款成功</h3></div><span></span><div class="line"></div></li>',
        'BUYING': '<li><div><h3>采购中</h3></div><span></span><div class="line"></div></li>',
        'SHIPPING': '<li><div><h3>商品出库</h3></div><span></span><div class="line"></div></li>',
        'COMPLETED': '<li><div><h3>订单完成</h3></div><span></span><div class="line"></div></li>'
      },

      nextStepMap: {
        'SUBMITED': 'CANCELORDER',
        'SHIPPED': 'RECEIVED'
      },

      currentStepTipsMap: {
        'SUBMITED': '尊敬的客户，我们还未收到该订单的款项，请您尽快付款。<br />' +
          '该订单会为您保留2小时（从下单时间算起），2小时后系统将自动取消未付款的订单。',
        'AUTO_CANCEL': '尊敬的客户，由于我们2小时内未收到您的订单款项，订单已被自动取消。<br />' +
          '订单取消规则：订单会为您保留2小时（从下单时间算起），2小时后系统将自动取消未付款的订单。',
        'USER_CANCEL': '尊敬的客户，您的订单已成功取消，期待您再次使用顺丰海淘。',
        'AUDITING': '尊敬的客户，您的订单正在等待顺丰海淘运营审核。',
        'OPERATION_CANCEL': '尊敬的客户，您的订单已被运营取消，期待您再次使用顺丰海淘。',
        'BUYING': '尊敬的客户，您的订单已经审核通过，不能修改。<br />' +
          '订单正在进行境外采购，请等待采购结果。',
        'WAIT_SHIPPING': '尊敬的客户，您的订单已经通过系统审核，不能修改。<br />' +
          '订单正在等待仓库发货。',
        'SHIPPING': '尊敬的客户，您的订单正在顺丰海外仓进行出库操作。<br />' +
          '网上订单已被打印，目前订单正在等待海外仓库人员进行出库处理。',
        'SHIPPED': '尊敬的客户，您的订单已从顺丰海外仓出库完成，正在进行跨境物流配送。',
        'COMPLETED': '尊敬的客户，您的订单已经完成，感谢您在顺丰海淘购物。',
        'AUTO_COMPLETED': '尊敬的用户，您的订单已经签收超过7天，已自动完成。期待您再次使用顺丰海淘'
      },

      "#cancelorder click": function(element, event) {
        var that = this;

        var message = new SFMessage(null, {
          'tip': '确认要取消该订单？',
          'type': 'confirm',
          'okFunction': _.bind(that.cancelOrder, that, element)
        });

        return false;
      },

      cancelOrder: function(element) {
        var that = this;
        var orderid = element.parent('div#operationarea').eq(0).attr('data-orderid');
        var cancelOrder = new SFCancelOrder({
          "orderId": orderid
        });

        cancelOrder
          .sendRequest()
          .done(function(data) {
            new SFMessage(null, {
              'tip': '订单取消成功！',
              'type': 'success'
            });
            that.render();
          })
          .fail(function(error) {
            new SFMessage(null, {
              'tip': '订单取消失败！',
              'type': 'error'
            });
          })
      },

      ".received click": function(element, event) {
        var that = this;

        var message = new SFMessage(null, {
          'tip': '确认要签收该订单？',
          'type': 'confirm',
          'okFunction': _.bind(that.received, that, element)
        });

        return false;
      },

      received: function(element) {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var confirmReceive = new SFConfirmReceive({
          "subOrderId": params.suborderid
        });
        confirmReceive
          .sendRequest()
          .done(function(data) {

            var message = new SFMessage(null, {
              'tip': '确认签收成功！',
              'type': 'success'
            });

            that.render();
          })
          .fail(function(error) {

            var message = new SFMessage(null, {
              'tip': '确认签收失败！',
              'type': 'error'
            });

          })
      },

      '#gotopay click': function(element, event) {
        event && event.preventDefault();
        var that = this;
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

        var params = can.deparam(window.location.search.substr(1));
        SFOrderFn.payV2({
          orderid: params.orderid
        }, callback)
      }

    });
  })