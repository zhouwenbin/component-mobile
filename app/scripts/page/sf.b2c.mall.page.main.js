'use strict';

define(
  [
    'can',
    'zepto',
    'underscore',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.price'
  ],

  function(can, $, _, SFFrameworkComm, ItemPrice) {
    SFFrameworkComm.register(3);
    var home = can.Control.extend({

      init: function(element, options) {
        this.render();
      },

      render: function() {
        new ItemPrice('.sf-b2c-mall-itemList');
        // new Header('.sf-b2c-mall-header', {
        //   onLogin: _.bind(this.onLogin, this)
        // });
        // new Footer('.sf-b2c-mall-footer');
        }
    });
    new home();
  });