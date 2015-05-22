'use strict';

define('sf.b2c.mall.component.nav', [
  'can',
  'zepto',
  'text',
  'text!template_component_nav'
], function(can, $, text, template_component_nav) {

  return can.Control.extend({

    init: function() {
      this.render()
    },

    render: function() {
      var renderFn = can.mustache(template_component_nav);
      var html = renderFn({});
      this.element.html(html);
    }

  });
});