'use strict';

define(
  'sf.b2c.mall.page.pointexplain',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.nav',
    'sf.b2c.mall.business.config',
    'sf.env.switcher'
  ],

  function(can, $, Fastclick,  SFFrameworkComm,
    SFNav, SFConfig, SFSwitcher) {

    SFFrameworkComm.register(3);
    Fastclick.attach(document.body);

    var pointexplain = can.Control.extend({

      /**
       * [init 初始化]
       * @param  {[type]} element 元素
       * @param  {[type]} options 选项
       */
      init: function(element, options) {

        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.pathname);
          return false;
        }

          var switcher = new SFSwitcher();

          switcher.register('web', function () {
              new SFNav('.sf-nav');
          });
      },

      /**
       * [render 执行渲染]
       */
      render: function() {
        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          new SFNav('.sf-nav');

            switcher.register('app', function () {
                // 不使用导航
            });
            switcher.go();
        });
      }
    });
  });