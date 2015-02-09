'use strict';

define(
  'sf.b2c.mall.widget.loading',

  [
    'zepto',
    'can',
    'sf.b2c.mall.business.config'
  ],

  function($, can, SFConfig) {
    return can.Control.extend({

      init: function() {
      },

      render: function() {
        this.setup($('body'));
        var html = can.view('templates/widget/sf.b2c.mall.widget.loading.mustache', {});
        $('body').append(html);
      },

      show: function() {
        this.render();
      },

      hide: function() {
        $('.loadingDIV').remove();
      }
    });
  })