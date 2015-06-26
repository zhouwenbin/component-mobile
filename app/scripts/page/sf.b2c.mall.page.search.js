define(
  'sf.b2c.mall.page.search',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.search',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.module.sso'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness,
           SFSearch, SFSso) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var searchPage = can.Control.extend({

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
        new SFSearch('#sf-b2c-mall-search');
      }

    });

    new searchPage('#sf-b2c-mall-search');
  })
