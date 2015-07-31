define(
  'sf.b2c.mall.page.japanpre',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.national.japanpre'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness,
           SFJapanpre) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var japanPage = can.Control.extend({

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
        new SFJapanpre('#sf-b2c-mall-search');
      }

    });

    new japanPage();
  })
