'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm'
  ],
  function(can, $, SFFrameworkComm) {
    SFFrameworkComm.register(3);

    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        this.render();
      },

      /**
       * [render 渲染]
       */
      render: function() {

        new SFReceiveperson('.sf-b2c-mall-center-personmanager');

        new SFReceiveaddr('.sf-b2c-mall-center-addressmanager');
      }
    });

    new center('.center');
  })