'use strict';

define(
  'sf.b2c.mall.page.invitationbag', [
    'can',
    'zepto',
    'fastclick',
    'sf.weixin',
    'sf.b2c.mall.api.coupon.hasReceivedCp',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'text!template_center_invitationbag'
  ],

  function(can, $, Fastclick, SFWeixin, SFHasReceivedCp, SFFrameworkComm, SFInvitationcontent, SFBusiness, SFNav, SFHeader, template_center_invitationbag) {

    SFFrameworkComm.register(3);
    var bagid = 230;

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
        var that = this;

        this.data = {};
        this.data.bagid = bagid;

        SFWeixin.shareInvitation("［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", "［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", this.data.bagid);

        can.when(that.initHasReceivedCp(bagid))
          .then(function() {


            var renderFn = can.mustache(template_center_invitationbag);
            that.options.html = renderFn(that.data, that.helpers);
            that.element.html(that.options.html);

            requirejs(['sf.b2c.mall.module.getcoupon']);
            new SFNav('.sf-b2c-mall-nav');
          });
      },

      initHasReceivedCp: function(bagId) {
        var that = this;
        var params = {
          "bagId": bagId,
          "bagType": "CARD"
        };

        var hasReceivedCp = new SFHasReceivedCp(params);

        return hasReceivedCp.sendRequest()
          .done(function(boolResp) {
            that.data.isHasReceived = boolResp.value;
          })
      }
    });

    new myInvitation('.sf-b2c-mall-invitationbag');
  });