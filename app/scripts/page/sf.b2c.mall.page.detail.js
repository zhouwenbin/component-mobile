'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.product.detailcontent',
    'sf.b2c.mall.module.header'
  ],

  function(can, $, SFFrameworkComm, DetailContent, SFHeader) {
    SFFrameworkComm.register(3);

    var content = can.Control.extend({

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

    new content('#content');
  });