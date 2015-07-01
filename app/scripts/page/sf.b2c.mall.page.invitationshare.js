'use strict';

define(
  'sf.b2c.mall.page.invitationshare', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'text!template_center_invitationshare'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFWeixin, SFFn, SFInvitationcontent, SFBusiness, SFNav, SFHeader, template_center_invitationshare) {

    SFFrameworkComm.register(3);

    var myInvitation = can.Control.extend({

      helpers: {
        isWeChat: function(options) {
          if (SFFn.isMobile.WeChat()) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

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
        var params = can.deparam(window.location.search.substr(1));

        this.data = {};
        this.data.bagid = params.bagid;

        SFWeixin.shareInvitation("［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", "［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", this.data.bagid);

        var renderFn = can.mustache(template_center_invitationshare);
        this.options.html = renderFn(this.data, this.helpers);
        this.element.html(this.options.html);

        new SFNav('.sf-b2c-mall-nav');
      },

      "#gotoinvitation click": function(){
        window.location.href = "http://m.sfht.com/invitation.html"
      },

      "#sharebutton click": function(element, event) {
        $("body,html").scrollTop(0);
        $("#sharearea").show();
      },

      "#sharearea click": function(){
        $("#sharearea").hide();
      }
    });

    new myInvitation('.sf-b2c-mall-invitationshare');
  });