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
    'sf.b2c.mall.api.b2cmall.getActivityInfo',
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
  function(can, $, Swipe, Fastclick,
    SFDetailcontentAdapter, SFGetItemInfo, SFGetProductHotData, SFGetSKUInfo, SFGetActivityInfo,
    SFFindRecommendProducts, SFGetWeChatJsApiSig, helpers, SFComm, SFLoading, SFConfig, SFMessage, SFWeixin, SFFn) {

    Fastclick.attach(document.body);

    var DEFAULT_INIT_TAG = 'init';
    var FILTER_ARRAY = [1962,1961,1954,1955,1956,1957,1958,1946,1947,1948,1949,1950,1951,1903,1904,1905,1906,1907,1908,96,97,98,99,100,1952,1953,1635,1636,1637,1638,1639,1626,1627,1628,1629,1630,,936,937,938,939,940,1789,1790,1791,1792,1793,1795,1794,1820,1821,1822,1823,1824,1825,1826,1827,101,102,103,104,105,106,107,108,1445,1448,1446,1447,1781,1782,1783,1784,1785,1786,1787,1788,1772,907,1780,1779,1773,1774,1775,1776,1777,1778,1168,1169,1170,1171,1172,1173];
    var NOTICE_WORD = '现顺丰保税仓正在升级中，5月19至25日期间您所下单的奶粉&纸尿裤商品将推迟至5月26日再发货，敬请谅解! ';
    var LIMITIED_DATE = '2015/5/26';

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

        'sf-showOriginPrice': function(isPromotion, activitySoldOut, sellingPrice, originPrice, options) {
          var oPrice = originPrice();
          var isPromotion = isPromotion();
          var activitySoldOut = activitySoldOut();
          if (isPromotion && !activitySoldOut && (sellingPrice() < oPrice || oPrice == 0)) {
            return options.fn(options.contexts || this);
          }
        },
        'sf-showSellingPrice': function(isPromotion, activitySoldOut, options) {
          var isPromotion = isPromotion();
          var activitySoldOut = activitySoldOut();
          if (isPromotion && !activitySoldOut) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        //促销展示
        'sf-showActivity': function(activityType, options) {
          if (activityType() != 'FLASH') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        //促销展示类型
        'sf-showActivityType': function(activityType, options) {
          if (activityType() == 'REDUCE') {
            return "满减";
          } else {
            return "满折";
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
          //alert("path error");
          return;
        }

        // @todo 需要在配置文件中修改
        this.detailUrl = 'http://m.sfht.com';
        this.mainUrl = SFConfig.setting.api.mainurl;
        this.adapter = new SFDetailcontentAdapter({});

        //如果tag为init，则要进行单独处理，防止刷新
        var tag = can.route.attr('tag');
        if (tag === DEFAULT_INIT_TAG) {
          this.initRender(DEFAULT_INIT_TAG);
        } else {
          can.route.attr('tag', DEFAULT_INIT_TAG);
        }
      },

      '{can.route} change': function() {
        var tag = can.route.attr('tag') || DEFAULT_INIT_TAG;

        this.initRender.call(this, tag, this.data);
      },

      renderMap: {
        'init': function(data) {
          this.render();
        },

        'gotobuy': function(data) {
          $('#firststep').hide();
          $('#secondstep').show();
        }
      },

      initRender: function(tag, data) {
        var params = can.deparam(window.location.search.substr(1));
        var fn = this.renderMap[tag];
        if (_.isFunction(fn)) {
          fn.call(this, data);
        }
      },

      /**
       * [render 渲染入口方法]
       */
      render: function() {
        var that = this;

        var getProductHotData = new SFGetProductHotData({
          'itemId': that.itemid
        });

        var findRecommendProducts = new SFFindRecommendProducts({
          'itemId': that.itemid,
          'size': 4
        });

        that.options.detailContentInfo = {};
        that.options.detailContentInfo.showFirstStep = true;
        that.options.detailContentInfo.showSecondStep = false;
        that.options.detailContentInfo.activityInfo = new can.Map({});
        that.options.detailContentInfo.priceInfo = new can.Map({});

        can.when(that.initGetItemInfo(that.itemid), that.initGetProductHotData(that.itemid), that.initFindRecommendProducts(that.itemid))
          .done(function() {
            document.title = that.options.detailContentInfo.itemInfo.basicInfo.title + ",顺丰海淘！";

            that.options.detailContentInfo = that.adapter.format(that.options.detailContentInfo);
            that.options.detailContentInfo.activityInfo = new can.Map(that.options.detailContentInfo.activityInfo || {});
            that.options.detailContentInfo.priceInfo = new can.Map(that.options.detailContentInfo.priceInfo || {});

            //存放起来用于微信的图片浏览和放大效果
            that.options.sliderImgs = [];
            _.each(that.options.detailContentInfo.itemInfo.basicInfo.images, function(item) {
              that.options.sliderImgs.push(item.bigImgUrl);
            });

            //that.options.detailContentInfo.priceInfo.attr("soldOut", true);
            var sellingPrice = that.options.detailContentInfo.priceInfo.attr('sellingPrice');
            var originPrice = that.options.detailContentInfo.priceInfo.attr('originPrice');

            if (sellingPrice == originPrice) {
              $('.originPrice').hide();
            }

            if (_.contains(FILTER_ARRAY, that.itemid) && Date.now() < new Date(LIMITIED_DATE)) {
              that.options.detailContentInfo.notice = NOTICE_WORD;
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
      initGetItemInfo: function(itemid) {
        var that = this;

        var getItemInfo = new SFGetItemInfo({
          'itemId': that.itemid
        });
        return getItemInfo.sendRequest()
          .done(function(itemInfoData) {
            that.adapter.formatItemInfo(that.detailUrl, that.options.detailContentInfo, itemInfoData);
          });
      },
      initGetProductHotData: function(itemid) {
        var that = this;

        var getProductHotData = new SFGetProductHotData({
          'itemId': that.itemid
        });
        return getProductHotData.sendRequest()
          .done(function(priceData) {
            that.initActivityInfo(that.itemid);
            that.adapter.formatPrice(that.options.detailContentInfo, priceData);
          });
      },
      initFindRecommendProducts: function(itemid) {
        var that = this;

        var findRecommendProducts = new SFFindRecommendProducts({
          'itemId': itemid,
          'size': 4
        });
        return findRecommendProducts.sendRequest()
          .done(function(recommendProducts) {
            that.adapter.formatRecommendProducts(that.detailUrl, that.options.detailContentInfo, recommendProducts);
          });
      },
      initActivityInfo: function(itemid) {
        var that = this;

        var getActivityInfo = new SFGetActivityInfo({
          'itemId': itemid
        });

        return getActivityInfo
          .sendRequest()
          .done(function(data) {

            if (data && data.value && data.value.length > 0) {
              _.each(data.value, function(element, index, list) {
                //处理活动规则，翻译成html
                element.rulesHtml = "";
                if (element.promotionRules) {
                  for (var index = 0, tempRule; tempRule = element.promotionRules[index]; index++) {
                    element.rulesHtml += "<li>" + (index + 1) + "." + tempRule.ruleDesc + "</li>";
                  }
                }

                //处理活动链接
                element.h5ActivityLink = element.h5ActivityLink || "javascript:void(0);";

                that.options.detailContentInfo.priceInfo = new can.Map(that.options.detailContentInfo.priceInfo || {});
                that.options.detailContentInfo.activityInfo = new can.Map(that.options.detailContentInfo.activityInfo || {});

                //处理限时促销
                if (element.activityType == "FLASH") {
                  that.options.detailContentInfo.priceInfo.attr("activityTitle", element.activityTitle);
                  that.options.detailContentInfo.priceInfo.attr("h5ActivityLink", element.h5ActivityLink);
                } else {
                  that.options.detailContentInfo.activityInfo.attr("isShow", true)
                }
              });
            }

            that.options.detailContentInfo.activityInfo.attr("datas", data.value);
          });
      },
      /**
       * [weixinShare 微信分享]
       * @param  {[type]} detailContentInfo [description]
       * @return {[type]}                   [description]
       */
      weixinShare: function(itemid, detailContentInfo) {
        var title = detailContentInfo.itemInfo.basicInfo.title;
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
            //确保只渲染一次
            if ($.trim($('#detail')[0].innerHTML) == "") {
              that.isRendered = that.renderDetail();
            }

            $('#specAndBrandInfo').hide();
            $('#recommendProducts').hide();
            $('#detail').show();
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
        $('#detail').css("min-height", window.screen.height - $("#tabHeader").height() - $(".buy").height()).html(template(this.options.detailContentInfo));
        return true;
      },

      addCDN4img: function(detail) {
        //进行缩放
        var description = this.options.detailContentInfo.itemInfo.basicInfo.description;
        description = String(description).replace(/.jpg/g, '.jpg@640w_80Q_1x.jpg')
          .replace(/.bmp/gi, '.bmp@640w_80Q_1x.bmp')
          .replace(/.jpeg/gi, '.jpeg@640w_80Q_1x.jpeg')
          .replace(/.gif/gi, '.gif@640w_80Q_1x.gif')
          .replace(/.png/gi, '.png@640w_80Q_1x.png');

        // 提取详情页图片用于微信图片浏览和放大
        // this.options.descImgs = [];
        // var reg = /<img\s+.*?src=(?:'(.+?)'|"(.+?)")\s*.*?(?:>|\/>)/igm;

        // var match;
        // while (match = reg.exec(description)) {
        //   this.options.descImgs.push(match[2].split("@640w_80Q_1x.")[0]);
        // }

        this.options.detailContentInfo.itemInfo.basicInfo.attr("description", description);
      },

      "#detail click": function(element) {
        var target = event.srcElement || event.target;

        // 微信环境
        if (target.nodeName == 'IMG') {

          var src = target.src.replace(/\s+/g, '').split("@640w_80Q_1x.")[0];

          if (window.WeixinJSBridge) {

            var imgs = [src];
            WeixinJSBridge.invoke('imagePreview', {
              'current': src,
              'urls': imgs
            });

          }
        }
      },

      "#slider click": function(element) {

        var target = event.srcElement || event.target;

        // 微信环境
        if (target.nodeName == 'IMG') {

          var src = target.src.replace(/\s+/g, '').split("@375h_375w_80Q_1x.")[0];

          if (window.WeixinJSBridge) {

            var imgs = this.options.sliderImgs;
            WeixinJSBridge.invoke('imagePreview', {
              'current': src,
              'urls': imgs
            });
          }
        }
      },

      /**
       * [detailTemplate 详情模板]
       * @return {[type]} [description]
       */
      detailTemplate: function() {
        return '{{&itemInfo.basicInfo.description}}' + '<div id="viewPCDetailArea"><button class="btn btn-normal btn-big" id="viewPCDetail">查看电脑版商品详情</button>' + '<h3 class="table-r1">（ 查看电脑版商品详情，可能会消耗较多流量 ）</h3></div>';
      },

      "#viewPCDetail click": function() {
        var template = can.view.mustache(this.detailTemplate());

        var description = this.options.detailContentInfo.itemInfo.basicInfo.description;
        description = String(description).replace(/.jpg@640w_80Q_1x/gi, '')
          .replace(/.bmp@640w_80Q_1x/gi, '')
          .replace(/.jpeg@640w_80Q_1x/gi, '')
          .replace(/.gif@640w_80Q_1x/gi, '')
          .replace(/.png@640w_80Q_1x/gi, '');

        this.options.detailContentInfo.itemInfo.basicInfo.attr("description", description);

        $('#detail').html(template(this.options.detailContentInfo));

        $('#viewPCDetailArea').hide();
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

        if (element.hasClass('btn-disable')) {
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
        if (priceInfo.currentStock >= 0 && amount > priceInfo.currentStock) {
          // this.options.detailContentInfo.input.attr("error", '商品库存' + priceInfo.currentStock + '件！');
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
        can.route.attr('tag', 'gotobuy');
        element.hide();
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
        // $('.loadingDIV').show();

        var type = "";
        if (element.hasClass("disable") || element.hasClass("active")) {
          // $('.loadingDIV').hide();
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

      //促销活动对话框事件
      ".coupon-discount-more click": function(element, event) {
        var uls = element.siblings("ul").find(" .coupon-discount-list ul");
        if (element.find("a").text() == "更多优惠") {
          element.find("a").text("收起");
          uls.show();
        } else {
          element.find("a").text("更多优惠");
          uls.hide();
        }
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
            getProductHotData.sendRequest(),
            that.initActivityInfo(newItemid))
          .done(function(skuInfoData, priceData) {

            $('#showrestrictiontipsspan').hide();

            if (priceData.currentStock >= 0 && priceData.limitBuy > 0) {
              priceData.limitBuy = _.min([priceData.limitBuy, priceData.currentStock]);
            }

            that.options.detailContentInfo.itemInfo.attr("basicInfo", new can.Map(skuInfoData));
            that.options.detailContentInfo.attr("priceInfo", priceData);
            that.adapter.reSetSelectedAndCanSelectedSpec(newItemid, priceData, that.detailUrl, that.options.detailContentInfo, gotoItemSpec);
            // $('.loadingDIV').hide();
          })
          .fail(function(error) {
            // $('.loadingDIV').hide();
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