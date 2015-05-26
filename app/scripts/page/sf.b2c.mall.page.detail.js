'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.product.detailcontent',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.component.nav'
  ],

  function(can, $, SFFrameworkComm, DetailContent, SFHeader, SFNav) {
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

    new content('#content');
  });