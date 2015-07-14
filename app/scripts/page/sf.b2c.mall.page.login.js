'use strict';

define(
  'sf.b2c.mall.page.login',

  [
    'zepto',
    'can',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.login',
    'sf.weixin'
  ],

  function ($, can, SFFrameworkComm, SFLogin, SFWeixin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var login = can.Control.extend({


      init:function(){

        this.component = {};
        this.render();
      },

      render:function(){
        new SFLogin('body');
      }

    });

    new login('body');
  });