'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.recaddrmanage',
    'sf.weixin',
    'sf.b2c.mall.business.config'
  ],

  function(can, $, SFFrameworkComm, SFRecaddrmanage, SFWeixin, SFConfig) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var content = can.Control.extend({

      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
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