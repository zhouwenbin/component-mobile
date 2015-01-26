'use strict';

define(
  'sf.b2c.mall.page.login',

  [
    'jquery',
    'can',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.login'
  ],

  function ($, can, SFFrameworkComm, SFLogin) {
    SFFrameworkComm.register(3)

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