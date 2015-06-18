'use strict';

define(
  'sf.b2c.mall.page.orderlist',

  [
    'can',
    'zepto',
    'fastclick',
    'jweixin',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.order.orderlistcontent',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'sf.hybrid'
  ],

  function(can, $, Fastclick, jweixin, SFWeixin, util, SFFrameworkComm, SFOrderListContent, SFMessage,
    SFNav, SFConfig, SFSwitcher, SFHybrid) {

    SFFrameworkComm.register(3);
    Fastclick.attach(document.body);
    SFWeixin.shareIndex();

    var SFOrderList = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {

        setInterval(function() {
          window.parent.postMessage("orderlist.html", '*');
        }, 500)

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
        this.orderListComponent = new SFOrderListContent('.sf-b2c-mall-order-orderlist');

        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          new SFNav('.sf-nav');
        });

        switcher.register('app', function () {
          // 不使用导航
        });

        switcher.go();
      }
    });

    // new orderList('#orderList');

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {

      // 显示蒙层
      $('.loadingDIV').show();

      new SFOrderList('#orderList');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          SFHybrid.sfnavigator.setLeftButton(function () {
            SFHybrid.sfnavigator.popToIdentifier('maintab');
          });

          SFHybrid.setNetworkListener();
          SFHybrid.isLogin().done(function () {
            new SFOrderList('#orderList');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });