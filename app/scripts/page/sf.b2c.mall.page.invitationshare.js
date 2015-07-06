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

        SFWeixin.shareInvitation("［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", "［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", this.data.bagid, $.fn.cookie('userId'));

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
          var title = '［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？';
          var desp = '［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？';
          var shareUrl = "http://m.sfht.com/invitation-bag.html?_src=" + $.fn.cookie('userId') + "&bagid=" + this.data.bagid;
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

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();
    var loadingCtrl = new SFLoading();

    switcher.register('web', function() {

      // 显示蒙层
      loadingCtrl.show();

      new myInvitation('.sf-b2c-mall-invitationshare');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
          // document.addEventListener('resume', this.onResume, false);
        },

        onResume: function() {
          // 粗暴的重刷页面获取新数据
          window.location.reload();
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {
          SFHybrid.setNetworkListener();
          SFHybrid.isLogin().done(function() {
            new myInvitation('.sf-b2c-mall-invitationshare');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－

  });