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
    'sf.b2c.mall.component.searchbox',
    'sf.b2c.mall.module.imagelazyload'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness,
           SFSearch, SFSearchBox) {
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
        new SFSearchBox('#sf-b2c-mall-search-box', {
          showGate: true,
          existDom: "#sf-b2c-mall-search, .sf-b2c-mall-footer"
        });
        new SFSearch('#sf-b2c-mall-search');
      }

    });

    new searchPage();
  })
