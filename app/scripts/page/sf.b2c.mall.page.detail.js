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

    var content = can.Control.extend({

      init: function(element, options) {
        this.render();
        this.supplement();
      },

      render: function() {
        new DetailContent('.sf-b2c-mall-detail-content');
        new SFNav('.sf-b2c-mall-nav');
      },

      supplement: function() {

      }
    });

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var swticher = new SFSwitcher();

    switcher.register('web', function() {
      new content('#content');
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

          SFHybrid.setNetworkListener()
          new content('#content');
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－

  });