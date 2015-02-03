'use strict';

define(
  [
    'can',
    'zepto',
    'store',
    'sf.b2c.mall.framework.comm'
  ],
  function(can, $, store, SFFrameworkComm) {

    SFFrameworkComm.register(3);

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
          alert("alipayurl error");
        }
        var html = can.view('/templates/order/sf.b2c.mall.order.alipayframe.mustache', this.options);
        this.element.html(html);
      }
    });

    new center('.sf-b2c-mall-alipayframe');
  })