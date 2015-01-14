'use strict';

define(
  [
    'can',
    'zepto',
    'underscore',
    'sf.b2c.mall.framework.comm'
  ],

  function(can, $, _, SFFrameworkComm) {

    var home = can.Control.extend({

      init: function(element, options) {debugger;

        var html = can.view('templates/sf.b2c.mall.test.mustache', {});
        this.element.html(html);
      }
    });

    new home('.sf-b2c-mall-test');
  });