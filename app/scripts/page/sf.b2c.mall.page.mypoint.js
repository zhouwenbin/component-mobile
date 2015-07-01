'use strict';

define(
  'sf.b2c.mall.page.mypoint',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.component.nav',
     'sf.b2c.mall.module.header',
    'sf.b2c.mall.business.config',
   'sf.b2c.mall.component.mypoint'
  ],

  function(can, $, Fastclick,  util, SFFrameworkComm, SFMessage,SFHeader, SFNav, SFConfig, SFPoint) {

      SFFrameworkComm.register(3);
      Fastclick.attach(document.body);

      var myPoint = can.Control.extend({

          /**
           * [init 初始化]
           * @param  {[type]} element 元素
           * @param  {[type]} options 选项
           */
          init: function (element, options) {
              if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
                  window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
                  return false;
              }

              new SFPoint('#mypoint');
          }

      });
      new myPoint("#mypoint");
  })