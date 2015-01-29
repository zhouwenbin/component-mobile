'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.recaddrmanage'
  ],

  function(can, $, SFFrameworkComm, SFRecaddrmanage) {
    SFFrameworkComm.register(3);

    var content = can.Control.extend({

      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html?from=' + escape(window.location.pathname);
          return false;
        }

        this.render();
        this.supplement();
      },

      render: function() {
        new SFRecaddrmanage('.sf-b2c-mall-center-recaddrmanage');
      },

      supplement: function() {

      }
    });

    new content('#content');
  });