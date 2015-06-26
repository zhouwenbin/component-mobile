define(
  'sf.b2c.mall.page.shop',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.component.search',
    'sf.b2c.mall.shop.detail',
    'sf.b2c.mall.module.header',
    'sf.b2c.mall.module.sso'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness,
           SFSearch, SFShopDetail, SFHeader, SFSso) {
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
        new SFShopDetail('#sf-b2c-mall-shop-detail');
        new SFSearch('#sf-b2c-mall-search', {
          filterCustom: {
            showStatInfo: false,
            brandName: "品牌",
            categoryName: "类目",
            secondCategoryName: "类目2",
            originName: ""
          }
        });
      }

    });

    new searchPage();
  })
