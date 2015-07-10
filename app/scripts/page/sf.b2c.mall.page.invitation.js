'use strict';

define(
  'sf.b2c.mall.page.invitation', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFConfig,
    SFInvitationcontent, SFNav, SFHeader, SFBusiness, SFSwitcher, SFHybrid, SFLoading) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var myInvitation = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {
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
        this.invitationcontent = new SFInvitationcontent('.sf-b2c-mall-invitation');
      }
    });



    var switcher = new SFSwitcher();
    var loadingCtrl = new SFLoading();

    switcher.register('web', function() {
      loadingCtrl.show();
      new myInvitation('.sf-b2c-mall-invitation');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('onlineapp', function () {
      loadingCtrl.show();
      new myInvitation('.sf-b2c-mall-invitation');
    });

    switcher.go();

  });