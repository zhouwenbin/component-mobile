define(
  'sf.b2c.mall.page.searchgate',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.searchbox'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness,
           SFSearchBox) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var searchPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        //删除header中原汁原味信息
        //$(".header-c3").remove();
        this.render();
      },

      /**
       * [render 渲染]
       */
      render: function() {
        var that = this;
        new SFSearchBox('#sf-b2c-mall-search-box', {
          showGate: false,
          existDom: ".sf-b2c-mall-footer"
        });
      }

    });

    new searchPage('#sf-b2c-mall-search');
  })