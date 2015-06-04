'use strict';

define(
  [
    'can',
    'zepto',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'text!template_order_alipayframe'
  ],
  function(can, $, store, SFFrameworkComm, SFWeixin, SFConfig, template_order_alipayframe) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {

        if (window.addEventListener) {
          window.addEventListener("message", this.handMessage, false);
        } else {
          window.attachEvent("onmessage", this.handMessage);
        }

        this.render();
      },

      handMessage: function(event) {
        event = event || window.event;
        window.location.href = event.data;
      },

      /**
       * [render 渲染]
       */
      render: function() {
        this.options.src = store.get("alipayurl");
        if (!this.options.src) {
          //alert("alipayurl error");
        }
        var html = can.view(template_order_alipayframe, this.options);
        this.element.html(html);
      }
    });

    new center('.sf-b2c-mall-alipayframe');
  })