'use strict';

define(
  'sf.b2c.mall.page.invitation', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.center.invitationcontent'
  ],

  function(can, $, Fastclick, SFFrameworkComm,
    SFInvitationcontent ){

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var myInvitation = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {
        this.render();
      },

      /**
       * [render 执行渲染]
       */
      render: function() {
        this.invitationcontent = new SFInvitationcontent('.sf-b2c-mall-invitation');
      }
    });
    new myInvitation('.sf-b2c-mall-invitation');

  });