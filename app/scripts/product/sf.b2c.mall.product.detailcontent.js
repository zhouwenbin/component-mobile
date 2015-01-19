'use strict';

define('sf.b2c.mall.product.detailcontent', [
    'can',
    'sf.b2c.mall.adapter.detailcontent',
    'sf.b2c.mall.api.b2cmall.getItemInfo',
    'sf.b2c.mall.api.b2cmall.getProductHotData',
    'sf.b2c.mall.api.b2cmall.getSkuInfo',
    'sf.b2c.mall.api.product.findRecommendProducts',
    'sf.helpers',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config'
  ],
  function(can, SFDetailcontentAdapter, SFGetItemInfo, SFGetProductHotData, SFGetSKUInfo, SFFindRecommendProducts, helpers, SFComm, SFConfig, SFMessage) {
    return can.Control.extend({

      helpers: {
        'sf-showCurrentStock': function(currentStock, options) {
          if (currentStock() != 0 && currentStock() != -1 && currentStock() != -2) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

      /**
       * 初始化控件
       * @param  {DOM} element 容器element
       * @param  {Object} options 传递的参数
       */
      init: function(element, options) {
        // this.detailUrl = SFConfig.setting.api.detailurl;

        // @todo 需要在配置文件中修改
        this.detailUrl = 'http://item.sfht.com';
        this.mainUrl = SFConfig.setting.api.mainurl;
        this.adapter = new SFDetailcontentAdapter({});

        this.render();
      },

      /**
       * [render 渲染入口方法]
       */
      render: function() {
        var that = this;

        var getItemInfo = new SFGetItemInfo({
          'itemId': 1
        });

        var getProductHotData = new SFGetProductHotData({
          'itemId': 1
        });

        var findRecommendProducts = new SFFindRecommendProducts({
          'itemId': 1,
          'size': 4
        });

        can.when(getItemInfo.sendRequest(),
            getProductHotData.sendRequest(),
            findRecommendProducts.sendRequest())
          .done(function(itemInfoData, priceData, recommendProducts) {
            that.options.detailContentInfo = {};
            that.adapter.formatItemInfo(that.options.detailContentInfo, itemInfoData);
            that.adapter.formatPrice(that.options.detailContentInfo, priceData);
            that.adapter.formatRecommendProducts(that.options.detailContentInfo, recommendProducts);

            that.options.detailContentInfo = that.adapter.format(that.options.detailContentInfo);

            var html = can.view('templates/product/sf.b2c.mall.product.detailcontent.mustache', that.options.detailContentInfo, that.helpers);
            that.element.html(html);
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      '#gotobuy click': function() {
        var amount = this.options.detailContentInfo.input.buyNum;
        if (amount < 1 || isNaN(amount)) {
          this.options.detailContentInfo.input.attr("buyNum", 1);
          var message = new SFMessage(null, {
            'tip': '请输入正确的购买数量！',
            'type': 'error'
          });

          return false;
        }

        var gotoUrl = 'http://www.sfht.com/order.html' + '?' + $.param({
          "itemid": $('.sf-b2c-mall-detail-content').eq(0).attr('data-itemid'),
          "saleid": $('.sf-b2c-mall-detail-content').eq(0).attr('data-saleid'),
          "amount": this.options.detailContentInfo.input.buyNum
        });

        if (!SFComm.prototype.checkUserLogin.call(this)) {
          this.header.showLogin(gotoUrl);
          return false;
        }

        window.location.href = gotoUrl;
      }

    });
  })