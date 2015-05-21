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
    'sf.b2c.mall.business.config'
  ],
  function(can, $, SFGetOrderList, OrderFn, SFHelpers, SFFn, SFMessage, SFConfig) {

    return can.Control.extend({

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
            pageNum: cparams.pageNum,
            pageSize: cparams.pageSize
          })
        };

        var getOrderList = new SFGetOrderList(params);
        getOrderList.sendRequest().done(_.bind(this.paint, this));
      },

      paint: function(data) {

      }

    });

  });