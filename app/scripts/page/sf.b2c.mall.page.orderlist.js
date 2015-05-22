'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'jweixin',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderlistcontent',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.component.nav',
    'sf.env.switcher',
    'sf.b2c.mall.business.config'
  ],

  function(can, $, Fastclick, jweixin, SFWeixin, util, SFFrameworkComm, SFOrderListContent, SFMessage, SFNav, SFSwitcher, SFConfig) {
    SFFrameworkComm.register(3);
    Fastclick.attach(document.body);
    SFWeixin.shareIndex();

    var orderList = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {

        setInterval(function() {
          window.parent.postMessage("orderlist.html", '*');
        }, 500)

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
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

        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          new SFNav('.sf-nav');
        });

        switcher.register('app', function () {
          // 不使用导航
        });

        switcher.go();
      }
    });

    new orderList('#orderList');
  });