'use strict';

define('sf.b2c.mall.product.detailcontent', [
    'can',
    'zepto',
    'swipe',
    'fastclick',
    'sf.b2c.mall.adapter.detailcontent',
    'sf.b2c.mall.api.b2cmall.getItemInfo',
    'sf.b2c.mall.api.b2cmall.getProductHotData',
    'sf.b2c.mall.api.b2cmall.getSkuInfo',
    'sf.b2c.mall.api.product.findRecommendProducts',
    'sf.b2c.mall.api.user.getWeChatJsApiSig',
    'sf.helpers',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.widget.message',
    'sf.weixin',
    'sf.util'
  ],
  function(can, $, Swipe, Fastclick, SFDetailcontentAdapter, SFGetItemInfo, SFGetProductHotData, SFGetSKUInfo, SFFindRecommendProducts, SFGetWeChatJsApiSig, helpers, SFComm, SFLoading, SFConfig, SFMessage, SFWeixin, SFFn) {
    Fastclick.attach(document.body);
    return can.Control.extend({

      helpers: {
        'sf-showCurrentStock': function(currentStock, options) {
          if (currentStock() != 0 && currentStock() != -1 && currentStock() != -2) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-canBuy': function(isSoldOut, options) {
          if (!isSoldOut()) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        'sf-showXSTM': function(productShape, options) {
          if (productShape() == "XSTM") {
            return options.fn(options.contexts || this);
          }
        },

        'sf-showJSHT': function(productShape, options) {
          if (productShape() == "JSHT") {
            return options.fn(options.contexts || this);
          }
        },

        'sf-showOriginPrice': function(sellingPrice, originPrice,options) {
          var oPrice = originPrice();
          if (sellingPrice() < oPrice || oPrice == 0) {
            return options.fn(options.contexts || this);
          }
        }
      },

      /**
       * 初始化控件
       * @param  {DOM} element 容器element
       * @param  {Object} options 传递的参数
       */
      init: function(element, options) {

        // this.loading = new SFLoading();
        // this.loading.show();

        //解析路由，取出itemid
        //example: /detail/1.html
        var pathname = window.location.pathname;
        var pathArr = /\d+/g.exec(pathname);

        if (typeof pathArr != 'undefined' && null != pathArr && pathArr.length > 0) {
          this.itemid = pathArr[0];
        } else {
          alert("path error");
          return;
        }

        // @todo 需要在配置文件中修改
        this.detailUrl = 'http://m.sfht.com';
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
          'itemId': that.itemid
        });

        var getProductHotData = new SFGetProductHotData({
          'itemId': that.itemid
        });

        var findRecommendProducts = new SFFindRecommendProducts({
          'itemId': that.itemid,
          'size': 4
        });

        can.when(getItemInfo.sendRequest(),
            getProductHotData.sendRequest(),
            findRecommendProducts.sendRequest())
          .done(function(itemInfoData, priceData, recommendProducts) {

            that.options.detailContentInfo = {};
            that.options.detailContentInfo.showFirstStep = true;
            that.options.detailContentInfo.showSecondStep = false;
            that.adapter.formatItemInfo(that.detailUrl, that.options.detailContentInfo, itemInfoData);
            that.adapter.formatPrice(that.options.detailContentInfo, priceData);
            that.adapter.formatRecommendProducts(that.detailUrl, that.options.detailContentInfo, recommendProducts);

            that.options.detailContentInfo = that.adapter.format(that.options.detailContentInfo);

            //that.options.detailContentInfo.priceInfo.attr("soldOut", true);
            var sellingPrice = that.options.detailContentInfo.priceInfo.attr('sellingPrice');
            var originPrice = that.options.detailContentInfo.priceInfo.attr('originPrice');

            if(sellingPrice == originPrice){
              $('.originPrice').hide();
            }
            var html = can.view('/templates/product/sf.b2c.mall.product.detailcontent.mustache', that.options.detailContentInfo, that.helpers);
            that.element.html(html);

            //滚动效果
            new Swipe($('#slider')[0], {
              startSlide: 0,
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
            //第一个选中
            $('.swipe-dot span').eq(0).addClass('active');

            $('#gotobuy').click(function() {
              that.gotobuyClick($(this));
              that.bindSelectSpecButton();
            })

            $('#detailTab').click(function() {
              that.switchTab($(this), 'detailTab');
            })

            $('#itemInfoTab').click(function() {
              that.switchTab($(this), 'itemInfoTab');
            })

            //微信分享
            that.weixinShare(that.itemid, that.options.detailContentInfo);

            $('.loadingDIV').hide();

            $(document).ready(function() {
              if (SFFn.isMobile.Android()) {
                that.fixedTab();
              }
            });

          })
          .fail(function(error) {
            console.error(error);
            $('.loadingDIV').hide();
          })
      },

      /**
       * [weixinShare 微信分享]
       * @param  {[type]} detailContentInfo [description]
       * @return {[type]}                   [description]
       */
      weixinShare: function(itemid, detailContentInfo) {
        var title = "别再淘宝啦！快来顺丰海淘，挑海外好货，一起提升B格！";
        var desc = "[" + detailContentInfo.itemInfo.basicInfo.brand + "]" + detailContentInfo.itemInfo.basicInfo.title;
        var link = "http://m.sfht.com/detail/" + itemid + ".html";
        var imgUrl = detailContentInfo.itemInfo.basicInfo.images[0].thumbImgUrl;

        var hasURL = _.str.include(imgUrl, 'http://')
        if (!hasURL) {
          imgUrl = 'http://img0.sfht.com/' + imgUrl;
        }

        SFWeixin.shareDetail(title, desc, link, imgUrl)
      },

      /**
       * [fixedTab 粘性布局]
       * @return {[type]} [description]
       */
      fixedTab: function() {
        var top = 0;
        $(window).on('touchmove scroll', _.throttle(function(event) {
          if ($('#tabHeader').hasClass('fixed')) {
            if ($(window).scrollTop() <= top) {
              $("#tabHeader").removeClass('fixed');
            }
          } else {
            var tmpTop = $('#tabHeader').offset().top;
            if ($(window).scrollTop() >= tmpTop) {
              top = tmpTop;
              $('#tabHeader').addClass('fixed');
            }
          }
        }, 100))
      },

      /**
       * [switchTab 切换tab]
       * @param  {[type]} tab [description]
       * @return {[type]}     [description]
       */
      switchTab: function(element, tab) {
        if (element.hasClass('active')) {
          return false;
        }
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
        this.addCDN4img();
        $('#detail').css("height", window.screen.height - $("#tabHeader").height() - $(".buy").height()).html(template(this.options.detailContentInfo));
        return true;
      },

      addCDN4img: function(detail) {
        // var detail = "<img src='2.jpg'><img src='1.bmp'><img src='2.jpg'><img src='1.BMP'>";
        var description = this.options.detailContentInfo.itemInfo.basicInfo.description;
        description = String(description).replace(/.jpg/g, '.jpg@375h_375w_80Q_1x.jpg')
          .replace(/.bmp/gi, '.bmp@375h_375w_80Q_1x.bmp')
          .replace(/.jpeg/gi, '.jpeg@375h_375w_80Q_1x.jpeg')
          .replace(/.gif/gi, '.gif@375h_375w_80Q_1x.gif')
          .replace(/.png/gi, '.png@375h_375w_80Q_1x.png');

        this.options.detailContentInfo.itemInfo.basicInfo.attr("description", description);
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

        $('.specbuttons').click(function() {
          that.specbuttonsClick($(this));
        })

        $('#reduceNum').click(function() {
          that.reduceNumClick($(this));
        })

        $('#addNum').click(function() {
          that.addNumClick($(this));
        })

        $('#inputNum').blur(function() {
          that.dealBuyNumByInput($(this));
        })

        $('#inputNum').keyup(function() {
          that.dealBuyNumByInput($(this));
        })

        $('#inputNum').keydown(function() {
          that.options.detailContentInfo.input.attr("error", "");
        })

        $('#buyEnter').click(function() {
          that.buyEnter($(this));
        })
      },

      /**
       * [buyEnter 构面确认按钮事件]
       * @return {[type]} [description]
       */
      buyEnter: function(element) {

        if (element.hasClass('btn-disable')){
          return false;
        }

        var priceInfo = this.options.detailContentInfo.priceInfo;

        var input = this.options.detailContentInfo.input;

        //校验是否售空
        if (priceInfo.soldOut) {
          this.options.detailContentInfo.input.attr("error", '商品已经售空！');
          return false;
        }



        var amount = parseInt(input.attr("buyNum"));

        //检验库存
        if (priceInfo.currentStock >=0 && amount > priceInfo.currentStock) {
          this.options.detailContentInfo.input.attr("error", '商品库存' + priceInfo.currentStock + '件！');
          return false;
        }

        // 校验个数是否超过限购
        if (priceInfo.limitBuy > 0 && amount > priceInfo.limitBuy) {
          this.options.detailContentInfo.input.attr("error", '商品限购' + priceInfo.limitBuy + '件！');
          return false;
        }

        var amount = this.options.detailContentInfo.input.buyNum;
        if (amount < 1 || isNaN(amount)) {
          this.options.detailContentInfo.input.attr("buyNum", 1);

          this.options.detailContentInfo.input.attr("error", "请输入正确的购买数量！");

          return false;
        }

        var gotoUrl = 'http://m.sfht.com/order.html' + '?' + $.param({
          "itemid": this.itemid,
          "amount": this.options.detailContentInfo.input.buyNum
        });

        if (!SFComm.prototype.checkUserLogin.call(this)) {
          window.location.href = 'http://m.sfht.com/login.html?from=' + escape(gotoUrl);
          return false;
        }

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
          input.attr('buyNum', 1);
        }
        if (priceInfo.limitBuy > 0 && amount > priceInfo.limitBuy) {
          priceInfo.attr("limitBuy", priceInfo.limitBuy);
          input.attr("showRestrictionTips", true);
          $('#showrestrictiontipsspan').show();
          element.val(priceInfo.limitBuy);
          input.attr('buyNum', priceInfo.limitBuy);
          return false;
        }

        //input.attr('buyNum', amount);
        input.attr("showRestrictionTips", false);
        $('#showrestrictiontipsspan').hide();
      },

      /**
       * @description event:数量增加，限制是accountRestriction
       * @param  {Dom} element 触发事件的元素
       * @param  {Event} event   事件对象
       */
      addNumClick: function(element) {
        this.options.detailContentInfo.input.attr("error", "");

        var priceInfo = this.options.detailContentInfo.priceInfo;
        var input = this.options.detailContentInfo.input;

        if (priceInfo.soldOut) {
          return false;
        }

        var amount = parseInt(input.attr("buyNum"));
        if (priceInfo.limitBuy > 0 && amount > priceInfo.limitBuy - 1) {
          priceInfo.attr("limitBuy", priceInfo.limitBuy);
          input.attr("showRestrictionTips", true);
          $('#showrestrictiontipsspan').show();
          input.attr('buyNum', priceInfo.limitBuy);
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
        this.options.detailContentInfo.input.attr("error", "");

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
        $('.loadingDIV').show();

        var type = "";
        if (element.hasClass("disable") || element.hasClass("active")) {
          $('.loadingDIV').hide();
          return false;
        }

        if (element.hasClass("dashed")) {
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
                  spec.attr("canSelected", "active");
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

        var saleSkuSpecTuple = this.getSKUBySpecs(this.options.detailContentInfo.itemInfo.saleSkuSpecTupleList, gotoItemSpec.join(","), element, type);
        var skuId = saleSkuSpecTuple.skuSpecTuple.skuId;
        var newItemid = saleSkuSpecTuple.itemId;
        this.itemid = newItemid;

        var that = this;
        var getSKUInfo = new SFGetSKUInfo({
          'skuId': skuId
        });

        var getProductHotData = new SFGetProductHotData({
          'itemId': newItemid
        });

        can.when(getSKUInfo.sendRequest(),
            getProductHotData.sendRequest())
          .done(function(skuInfoData, priceData) {

            $('#showrestrictiontipsspan').hide();

            if (priceData.currentStock >= 0 && priceData.limitBuy > 0) {
              priceData.limitBuy = _.min([priceData.limitBuy, priceData.currentStock]);
            }

            that.options.detailContentInfo.itemInfo.attr("basicInfo", new can.Map(skuInfoData));
            that.options.detailContentInfo.attr("priceInfo", priceData);
            that.adapter.reSetSelectedAndCanSelectedSpec(newItemid, priceData, that.detailUrl, that.options.detailContentInfo, gotoItemSpec);
            $('.loadingDIV').hide();
          })
          .fail(function(error){
            $('.loadingDIV').hide();
          })
      },

      getSKUBySpecs: function(saleSkuSpecTupleList, gotoItemSpec, element, type) {
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

        return saleSkuSpecTuple;
      }

    });
  })
