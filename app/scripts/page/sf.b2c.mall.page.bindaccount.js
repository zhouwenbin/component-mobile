'use strict';

define(
  'sf.b2c.mall.page.bindaccount',

  [
    'zepto',
    'can',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.bindaccount',
    'sf.weixin'
  ],

  function ($, can, SFFrameworkComm, SFBindAccount,SFWeixin) {
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var bindalipay = can.Control.extend({

      init:function(){
        this.render();
      },

      render:function(){
        new SFBindAccount('body');
      }

    });

    new bindalipay('body');
  });