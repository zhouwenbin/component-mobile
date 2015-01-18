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

      init: function(element, options) {
        debugger;

        var html = can.view('templates/sf.b2c.mall.test.mustache', {});
        this.element.html(html);

        $('#items li').swipe(function() {
          $('.delete').hide()
          $('.delete', this).show()
        })

        $('.delete').tap(function() {
          $(this).parent('li').remove()
        })

      }
    });

    new home('.sf-b2c-mall-test');
  });