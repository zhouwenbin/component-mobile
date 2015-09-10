define(
  'sf.b2c.mall.module.price', [
    'can',
    'zepto',
    'underscore',
    'fastclick',
    'sf.b2c.mall.api.b2cmall.getProductHotDataList', //获取商品数据接口
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.partnerLogin' //传参判断第三方账号是否绑定手机号码
  ],

  function(can, $, _, Fastclick, SFGetProductHotDataList, SFConfig, SFFrameworkComm) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var EMPTY_WORD = '已经抢光';
    var EMPTY_MARK = '<div class="mask"><span class="icon icon5 center">售完</span></div>';

    var SFPrice = can.Control.extend({

      /**
       * 初始化动作
       */
      init: function() {
        this.render();
      },

      /**
       * 渲染动作
       */
      render: function() {

        var that = this;
        var itemIds = this.getItemList();

        // 如果不存在itemid 直接返回
        if (!_.isArray(itemIds) || itemIds.length <= 0) {
          return false;
        }

        var callback =  function (data) {
          this.renderPrice(data);
        };

        var error = function (errorCode) {
          console.error(errorCode);
        };

        // 请求数据并进行渲染
        var getProductHotDataList = new SFGetProductHotDataList({
          itemIds: JSON.stringify(itemIds)
        });
        getProductHotDataList.sendRequest().done(_.bind(callback, this)).fail(error);
      },

      /**
       * 获取itemId调用fillPrice进行渲染
       * @param  {json}   data 服务端返回数据
       */
      renderPrice: function(data) {
        var that = this;

        _.each(data.value, function(value, key, list) {
          $("[data-cms-itemid='" + value.itemId +"']").each(function (index, element) {
            that.fillPrice($(element), value);
          });
        });
      },

      /**
       * 渲染产品价格
       * @param  {dom}    element 页面元素
       * @param  {json}   value   价格信息
       */
      fillPrice: function(element, value) {

        // 首先展示价格，以防其他错误不能展示价格
        var sellingPrice = value.sellingPrice / 100;
        element.find('.cms-fill-price').text(sellingPrice);

        // 如果原价低于卖价，则不展示折扣和原价
        if (value.sellingPrice >= value.referencePrice) {
          element.find('.cms-fill-discountparent').css({'display': 'none'});
          element.find('.cms-fill-referencepriceparent').css({'display': 'none'});
        } else {
          var referencePrice = value.referencePrice / 100;
          element.find('.cms-fill-referenceprice').text(referencePrice);

          var discount = (parseInt(value.sellingPrice, 10) * 10 / parseInt(value.referencePrice, 10)).toFixed(1);
          element.find('.cms-fill-discount').text(discount);
        }

        // 做售空处理
        if (value.soldOut) {
          element.find('.cms-fill-gotobuy').text(EMPTY_WORD);
          element.find(".cms-fill-status").append(EMPTY_MARK);

          element.find('.cms-fill-soldout').show();
        }

        // 原汁原味明星产品 折算价
        if (value.productShape == "YZYW") {
          // 当地折算价
          var calcPrice = "约" + value.currencySymbol + (value.localSellingPrice / 100)
          element.find('.cms-fill-localsellingprice').text(calcPrice);
          if (value.isStartGoods === true) {
            element.find('.cms-fill-label').show();
          }
        }
      },

      /**
       * 获取id列表
       * @return {array} itemid列表
       */
      getItemList: function() {
        var ids = [];

        this.element.find('.cms-src-item').each(function (index, element) {
          var id = $(element).attr('data-cms-itemid');
          if (!_.isEmpty(id)) {
            ids.push(window.parseInt(id));
          }
        })
        return _.uniq(ids);
      }
    })

    // 对所有需要进行价格渲染的模块进行初始化
    new SFPrice('.cms-module-fillprice');
  });