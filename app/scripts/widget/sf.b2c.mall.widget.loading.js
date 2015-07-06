'use strict';

define(
  'sf.b2c.mall.widget.loading',

  [
    'zepto',
    'can',
    'sf.b2c.mall.business.config',
    'text!template_widget_loading'
  ],

  function($, can, SFConfig, template_widget_loading) {
    return can.Control.extend({

      init: function() {
      },

      render: function() {
        this.setup($('body'));
        // var html = can.view(template_widget_loading, {});
        var renderFn = can.mustache(template_widget_loading);
        var html = renderFn({});
        $('body').append(html);
      },

      show: function() {
        if ($('.loadingDIV').length == 0) {
          this.render();
        }
      },

      hide: function() {
        $('.loadingDIV').remove();
      }
    });
  })