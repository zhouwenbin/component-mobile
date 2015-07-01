'use strict';

define(
  'sf.b2c.mall.page.invitationbag', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.business.config',
    'text!template_center_invitationbag'
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFInvitationcontent, SFBusiness, template_center_invitationbag) {

    SFFrameworkComm.register(3);

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
        var params = can.deparam(window.location.search.substr(1));

        this.data = {};
        this.data.bagid = params.bagid;

        var renderFn = can.mustache(template_center_invitationshare);
        this.options.html = renderFn(this.data, this.helpers);
        this.element.html(this.options.html);
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

    new myInvitation('.sf-b2c-mall-invitationbag');
  });