'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.product.detailcontent',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.component.nav',
    'sf.env.switcher',
    'sf.hybrid'
  ],

  function(can, $, SFFrameworkComm, DetailContent, SFHeader, SFNav, SFSwitcher, SFHybrid) {
    SFFrameworkComm.register(3);

    var SFContent = can.Control.extend({

      init: function(element, options) {
        this.render();
        this.supplement();
      },

      render: function() {
        new DetailContent('.sf-b2c-mall-detail-content');
      },

      supplement: function() {

      }
    });

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {

      // 显示蒙层
      $('.loadingDIV').show();

      new SFContent('#content');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
          document.addEventListener('resume', this.onResume, false);
        },

        onResume: function () {
          // 粗暴的重刷页面获取新数据
          window.location.reload();
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          SFHybrid.setNetworkListener();
          SFHybrid.isLogin().done(function () {
            new SFContent('#content');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－

  });