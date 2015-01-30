'use strict';

define(
  [
    'can',
    'zepto',
    'jweixin',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderlistcontent',
    'sf.b2c.mall.widget.message',
    'sf.weixin'
  ],

  function(can, $, jweixin, SFWeixin, util, SFFrameworkComm, SFOrderListContent, SFMessage) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var orderList = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html?from=' + escape(window.location.pathname);
          return false;
        }

        this.render();
      },

      /**
       * [render 执行渲染]
       */
      render: function() {
        // 列表区域
        this.orderListComponent = new SFOrderListContent('.sf-b2c-mall-order-orderlist');
      }
    });

    new orderList('#orderList');
  });