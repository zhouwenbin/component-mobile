'use strict';

define(
  'sf.b2c.mall.page.invitationbag', [
    'can',
    'zepto',
    'fastclick',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'text!template_center_invitationbag'
  ],

  function(can, $, Fastclick, SFWeixin, SFFrameworkComm, SFInvitationcontent, SFBusiness, SFNav, SFHeader, template_center_invitationbag) {

    SFFrameworkComm.register(3);
    var bagid = 245;

    var myInvitation = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFBusiness.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        }

        this.render();
      },

      /**
       * [render 执行渲染]
       */
      render: function() {
        // 列表区域
        this.data = {};
        this.data.bagid = bagid;

        SFWeixin.shareInvitation("［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", "［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", this.data.bagid);

        var renderFn = can.mustache(template_center_invitationbag);
        this.options.html = renderFn(this.data, this.helpers);
        this.element.html(this.options.html);

        requirejs(['sf.b2c.mall.module.getcoupon']);
        new SFNav('.sf-b2c-mall-nav');
      }
    });

    new myInvitation('.sf-b2c-mall-invitationbag');
  });