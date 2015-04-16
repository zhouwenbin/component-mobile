'use strict';

define(
  'sf.b2c.mall.page.setpassword',

  [
    'zepto',
    'can',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.setpassword',
    'sf.weixin'
  ],

  function ($, can, SFFrameworkComm, SFSetpassword,SFWeixin) {
    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var setpassword = can.Control.extend({


      init:function(){
        this.render();
      },

      render:function(){
        new SFSetpassword('body');
      }

    });

    new setpassword('body');
  });