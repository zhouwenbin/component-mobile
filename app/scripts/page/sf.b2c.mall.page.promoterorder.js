define(
  'sf.b2c.mall.page.promoterorder',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.search',
    'sf.b2c.mall.component.searchbox'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness,
           SFSearch, SFSearchBox) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var promoterorderPage = can.Control.extend({

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
      }

    });

    new promoterorderPage();
  })
