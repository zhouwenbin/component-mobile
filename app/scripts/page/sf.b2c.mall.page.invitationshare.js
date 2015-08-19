'use strict';

define(
  'sf.b2c.mall.page.invitationshare', [
    'can',
    'zepto',
    'zepto.cookie',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.center.invitationcontent',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.module.header',
    'text!template_center_invitationshare',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, cookie, Fastclick, SFFrameworkComm, SFWeixin, SFFn, SFInvitationcontent, SFBusiness, SFNav, SFHeader, template_center_invitationshare, SFSwitcher, SFHybrid, SFLoading) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var myInvitation = can.Control.extend({

      helpers: {
        isWeChatOrApp: function(options) {
          if (SFFn.isMobile.WeChat() || SFFn.isMobile.APP()) {
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

        SFWeixin.shareInvitation(
          "［雷锋来了］他奋力抢到了一波现金红包撒向了朋友圈，赶紧来抢！",
          "［雷锋来了］他奋力抢到了一波现金红包撒向了朋友圈，赶紧来抢！", this.data.bagid, $.fn.cookie('userId'));

        var renderFn = can.mustache(template_center_invitationshare);
        this.options.html = renderFn(this.data, this.helpers);
        this.element.html(this.options.html);

        new SFNav('.sf-b2c-mall-nav');
      },

      "#gotoinvitation click": function() {
        window.location.href = "http://m.sfht.com/invitation.html"
      },

      "#sharebutton click": function(element, event) {
        if (SFFn.isMobile.APP()) {
          var title = '［雷锋来了］他奋力抢到了一波现金红包撒向了朋友圈，赶紧来抢！';
          var desp = '［雷锋来了］他奋力抢到了一波现金红包撒向了朋友圈，赶紧来抢！';
          var shareUrl = "http://m.sfht.com/invitation-bag.html?_ruser=" + $.fn.cookie('userId') + "&bagid=" + this.data.bagid;
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';

          SFHybrid.h5share(title, desp, imgUrl, shareUrl);
        } else {
          $("body,html").scrollTop(0);
          $("#sharearea").show();
        }
      },

      "#sharearea click": function() {
        $("#sharearea").hide();
      }
    });

    var switcher = new SFSwitcher();
    var loadingCtrl = new SFLoading();

    switcher.register('web', function() {
      loadingCtrl.show();
      new myInvitation('.sf-b2c-mall-invitationshare');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('onlineapp', function () {
      loadingCtrl.show();
      new myInvitation('.sf-b2c-mall-invitationshare');
    });

    switcher.go();

  });