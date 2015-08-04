'use strict';

define(
  'sf.b2c.mall.page.categorynavigatelist',

  [
    'can',
    'zepto',
    'fastclick',
    'jweixin',
    'sf.weixin',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.category.pagenavigatelistcontent',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.component.searchbox'
  ],

  function(can, $, Fastclick, jweixin, SFWeixin, util, SFFrameworkComm, SFCateListContent, SFMessage,
    SFNav, SFConfig, SFSwitcher, SFHybrid, SFLoading, SFSearchBox) {

    SFFrameworkComm.register(3);
    Fastclick.attach(document.body);
    SFWeixin.shareIndex();

    var loadingCtrl = new SFLoading();

    var SFCateList = can.Control.extend({

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
        this.cateListContent = new SFCateListContent('.sf-b2c-mall-cate-pagenavigatelist');

        new SFSearchBox('#sf-b2c-mall-search-box', {
          showGate: true,
          existDom: "all"
        });

        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          //new SFNav('.sf-nav');
        });

        switcher.register('app', function () {
          // 不使用导航
        });

        switcher.go();
      }
    });


    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {

      // 显示蒙层
      loadingCtrl.show();

      new SFCateList('#orderList');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          //this.bindEvents();
          new SFCateList('#cateList');
        },

        bindEvents: function() {
          //document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
          //app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          //SFHybrid.sfnavigator.setLeftButton(function () {
          //  SFHybrid.sfnavigator.popToIdentifier('maintab');
          //});
          //
          //SFHybrid.setNetworkListener();
          //SFHybrid.isLogin().done(function () {
          //  new SFCateList('#cateList');
          //});
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  });