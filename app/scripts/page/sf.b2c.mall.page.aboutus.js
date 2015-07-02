define(
  'sf.b2c.mall.page.aboutus',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.module.header'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var aboutusPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        this.render();
      },

      /**
       * [render 渲染]
       */
      render: function() {
        var that = this;
      }

    });

    new aboutusPage();
  })
