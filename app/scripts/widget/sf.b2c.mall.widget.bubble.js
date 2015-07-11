'use strict';

define(
  'sf.b2c.mall.widget.bubble',

  [
    'zepto',
    'can',
    'sf.b2c.mall.business.config'
  ],

  function($, can, SFConfig) {
    return can.Control.extend({

      init: function(element, options) {
      	this.show(options.message, options.tick);
      },

      show: function(message, tick) {
        var $el = $('<section class="tooltip center overflow-num"><div>' + message + '</div></section>');
	      $(document.body).append($el);
	      setTimeout(function() {
	        $el.remove();
	      }, tick || 10000);
      },

      hide: function() {
      	$(".tooltip").remove();
      }
    });
  })