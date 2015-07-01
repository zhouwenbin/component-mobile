'use strict';

define(
  'sf.b2c.mall.page.invitation', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.business.config'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFInvitationcontent, SFNav, SFBusiness) {

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
        // 列表区域
        this.invitationcontent = new SFInvitationcontent('.sf-b2c-mall-invitation');
        new SFNav('.sf-b2c-mall-nav');
      }
    });

    new myInvitation('.sf-b2c-mall-invitation');
  });