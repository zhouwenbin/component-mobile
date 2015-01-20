'use strict';

define('sf.b2c.mall.product.detailcontent', [
    'can',
    'zepto',
    'swipe',
    'sf.b2c.mall.adapter.detailcontent',
    'sf.b2c.mall.api.b2cmall.getItemInfo',
    'sf.b2c.mall.api.b2cmall.getProductHotData',
    'sf.b2c.mall.api.b2cmall.getSkuInfo',
    'sf.b2c.mall.api.product.findRecommendProducts',
    'sf.helpers',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, Swipe, SFDetailcontentAdapter, SFGetItemInfo, SFGetProductHotData, SFGetSKUInfo, SFFindRecommendProducts, helpers, SFComm, SFConfig, SFMessage) {
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
            that.options.detailContentInfo.showFirstStep = true;
            that.options.detailContentInfo.showSecondStep = false;
            that.adapter.formatItemInfo(that.options.detailContentInfo, itemInfoData);
            that.adapter.formatPrice(that.options.detailContentInfo, priceData);
            that.adapter.formatRecommendProducts(that.options.detailContentInfo, recommendProducts);

            that.options.detailContentInfo = that.adapter.format(that.options.detailContentInfo);

            var html = can.view('templates/product/sf.b2c.mall.product.detailcontent.mustache', that.options.detailContentInfo, that.helpers);
            that.element.html(html);

            //滚动效果
            new Swipe($('#slider')[0], {
              startSlide: 1,
              speed: 400,
              auto: 0,
              continuous: true,
              disableScroll: false,
              stopPropagation: false,
              callback: function(index, elem) {
                $('.swipe-dot span').eq(index).addClass('active').siblings().removeClass('active');
              },
              transitionEnd: function(index, elem) {}
            });

            $('#gotobuy').tap(function() {
              that.gotobuyClick($(this));
              that.bindSelectSpecButton();
            })

            $('#detailTab').tap(function() {
              that.switchTab('detailTab');
            })

            $('#itemInfoTab').tap(function() {
              that.switchTab('itemInfoTab');
            })

          })
          .fail(function(error) {
            console.error(error);
          })
      },

      /**
       * [switchTab 切换tab]
       * @param  {[type]} tab [description]
       * @return {[type]}     [description]
       */
      switchTab: function(tab) {
        //tab
        $("#detailTab").toggleClass("active");
        $('#itemInfoTab').toggleClass("active");

        var that = this;

        var map = {
          'detailTab': function() {
            $('#specAndBrandInfo').hide();
            $('#recommendProducts').hide();
            $('#detail').show();

            //确保只渲染一次
            if (!that.isRendered) {
              that.isRendered = that.renderDetail();
            }
          },

          'itemInfoTab': function() {
            $('#specAndBrandInfo').show();
            $('#recommendProducts').show();
            $('#detail').hide();
          }
        }

        map[tab].apply(this);
      },

      /**
       * [renderDetail 渲染详情]
       * @return {[type]} [description]
       */
      renderDetail: function() {
        var template = can.view.mustache(this.detailTemplate());
        $('#detail').html(template(this.options.detailContentInfo));
        return true;
      },

      /**
       * [detailTemplate 详情模板]
       * @return {[type]} [description]
       */
      detailTemplate: function() {
        return '{{&itemInfo.basicInfo.description}}';
      },

      /**
       * [bindSelectSpecButton 绑定相关事件]
       * @return {[type]} [description]
       */
      bindSelectSpecButton: function() {
        var that = this;

        $('.specbuttons').tap(function() {
          that.specbuttonsClick($(this));
        })

        $('#reduceNum').tap(function() {
          that.reduceNumClick($(this));
        })

        $('#addNum').tap(function() {
          that.addNumClick($(this));
        })

        $('#inputNum').blur(function() {
          that.dealBuyNumByInput($(this));
        })

        $('#inputNum').keyup(function() {
          that.dealBuyNumByInput($(this));
        })

        $('#buyEnter').tap(function() {
          that.buyEnter($(this));
        })
      },

      /**
       * [buyEnter 构面确认按钮事件]
       * @return {[type]} [description]
       */
      buyEnter: function(element) {
        var amount = this.options.detailContentInfo.input.buyNum;
        if (amount < 1 || isNaN(amount)) {
          this.options.detailContentInfo.input.attr("buyNum", 1);
          // var message = new SFMessage(null, {
          //   'tip': '请输入正确的购买数量！',
          //   'type': 'error'
          // });

          return false;
        }

        var gotoUrl = 'http://www.sfht.com/order.html' + '?' + $.param({
          "itemid": $('.sf-b2c-mall-detail-content').eq(0).attr('data-itemid'),
          "saleid": $('.sf-b2c-mall-detail-content').eq(0).attr('data-saleid'),
          "amount": this.options.detailContentInfo.input.buyNum
        });

        // if (!SFComm.prototype.checkUserLogin.call(this)) {
        //   this.header.showLogin(gotoUrl);
        //   return false;
        // }

        window.location.href = gotoUrl;
      },

      /**
       * [gotobuyClick 点击购买按钮]
       * @param  {[type]} element [description]
       * @return {[type]}         [description]
       */
      gotobuyClick: function(element) {
        element.hide();
        this.options.detailContentInfo.attr("showFirstStep", false);
        this.options.detailContentInfo.attr("showSecondStep", true);
      },

      /**
       * [description 购买数量手工输入]
       * @param  {[type]} element
       * @return {[type]}
       */
      dealBuyNumByInput: function(element) {
        var priceInfo = this.options.detailContentInfo.priceInfo;
        var input = this.options.detailContentInfo.input;

        if (priceInfo.soldOut) {
          return false;
        }

        var amount = element[0].value;
        if (amount < 1 || isNaN(amount)) {
          element.val(1);
        }
        if (priceInfo.limitBuy > 0 && amount > priceInfo.limitBuy) {
          input.attr("showRestrictionTips", true);
          $('#showrestrictiontipsspan').show();
          element.val(priceInfo.limitBuy);
          return false;
        }

        input.attr('buyNum', amount);
        input.attr("showRestrictionTips", false);
        $('#showrestrictiontipsspan').hide();
      },

      /**
       * @description event:数量增加，限制是accountRestriction
       * @param  {Dom} element 触发事件的元素
       * @param  {Event} event   事件对象
       */
      addNumClick: function(element) {

        var priceInfo = this.options.detailContentInfo.priceInfo;
        var input = this.options.detailContentInfo.input;

        if (priceInfo.soldOut) {
          return false;
        }

        var amount = parseInt(input.attr("buyNum"));
        if (priceInfo.limitBuy > 0 && amount > priceInfo.limitBuy - 1) {
          input.attr("showRestrictionTips", true);
          $('#showrestrictiontipsspan').show();
          input.attr("addDisable", "disable");
          return false;
        }

        input.attr("reduceDisable", "");
        input.attr('buyNum', amount + 1);
        return false;
      },

      /**
       * @description event:数量减少，限制最小是1
       * @param  {Dom} element 触发事件的元素
       * @param  {Event} event   事件对象
       */
      reduceNumClick: function(element) {

        var priceInfo = this.options.detailContentInfo.priceInfo;
        var input = this.options.detailContentInfo.input;

        input.attr("showRestrictionTips", false);
        $('#showrestrictiontipsspan').hide();

        if (input.buyNum > 1) {
          input.attr('buyNum', --input.buyNum);
        } else {
          input.attr("reduceDisable", "disable");
        }

        input.attr("addDisable", "");
        return false;
      },

      /**
       * [specbuttonsClick 选择规格]
       * @param  {[type]} element [description]
       * @return {[type]}         [description]
       */
      specbuttonsClick: function(element) {
        var type = "";
        if (element.hasClass("disable") || element.hasClass("btn-danger")) {
          return false;
        }

        if (element.hasClass("btn-dashed")) {
          type = "dashed";
        }

        //获得数据信息
        var orderId = $(element[0].parentElement).eq(0).attr('data-specidorder');
        var specId = element.eq(0).attr('data-specid');

        if (typeof specId == 'undefined') {
          return false;
        }

        _.each(this.options.detailContentInfo.itemInfo.specGroups, function(group) {

          if (group.specIdOrder == orderId) {
            //修改选择状态  如果之前选中的 则要修改为未选中状态
            _.each(group.specs, function(spec) {
              if (spec.selected) {
                spec.attr("selected", "");
              }
            })
          } else {
            //修改选择状态
            _.each(group.specs, function(spec) {
              if (spec.specId == specId) {
                spec.attr("selected", "active");
                spec.attr("canSelected", "");
              } else {
                if (spec.selected) {
                  spec.attr("canSelected", "");
                  spec.attr("selected", "");
                }
              }
            })
          }
        })

        //去获得最新的sku信息
        this.gotoNewItem(element, type);

        return false;
      },

      /**
       * [gotoNewItem description]
       * @return {[type]}
       */
      gotoNewItem: function(element, type) {
        //获得选中的表示列表
        var gotoItemSpec = new String(element.eq(0).attr('data-compose')).split(",");

        var skuId = this.getSKUIdBySpecs(this.options.detailContentInfo.itemInfo.saleSkuSpecTupleList, gotoItemSpec.join(","), element, type);

        var that = this;
        var getSKUInfo = new SFGetSKUInfo({
          'skuId': skuId
        });
        getSKUInfo
          .sendRequest()
          .fail(function(error) {
            console.error(error);
          })
          .done(function(skuInfoData) {
            that.options.detailContentInfo.itemInfo.attr("basicInfo", new can.Map(skuInfoData));
            that.adapter.reSetSelectedAndCanSelectedSpec(that.options.detailContentInfo, gotoItemSpec);
          })
      },

      getSKUIdBySpecs: function(saleSkuSpecTupleList, gotoItemSpec, element, type) {
        var saleSkuSpecTuple;
        if (type == 'dashed') {
          saleSkuSpecTuple = _.find(saleSkuSpecTupleList, function(saleSkuSpecTuple) {
            return saleSkuSpecTuple.skuSpecTuple.specIds.join(",") == $(element).eq(0).attr('data-compose');
          })
        } else {
          saleSkuSpecTuple = _.find(saleSkuSpecTupleList, function(saleSkuSpecTuple) {
            return saleSkuSpecTuple.skuSpecTuple.specIds.join(",") == gotoItemSpec;
          });
        }

        return saleSkuSpecTuple.skuSpecTuple.skuId;
      }

    });
  })