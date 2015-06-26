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
    'sf.util',
    'sf.b2c.mall.api.minicart.getTotalCount', // 获得mini cart的数量接口
    'sf.b2c.mall.api.shopcart.addItemsToCart', // 添加购物车接口
    'sf.b2c.mall.api.shopcart.isShowCart',
    'text!template_product_detailcontent',
    'sf.env.switcher',
    'sf.hybrid',
    'animate'
  ],
  function(can, $, Swipe, Fastclick,
    SFDetailcontentAdapter, SFGetItemInfo, SFGetProductHotData, SFGetSKUInfo, SFGetActivityInfo,
    SFFindRecommendProducts, SFGetWeChatJsApiSig, helpers, SFComm, SFLoading, SFConfig, SFMessage, SFWeixin,
    SFFn, SFGetTotalCount, SFAddItemToCart, SFIsShowCart, template_product_detailcontent, SFSwitcher, SFHybrid, animate) {

    Fastclick.attach(document.body);

    var DEFAULT_INIT_TAG = 'init';

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

        'sf-showOriginPrice': function(sellingPrice, originPrice, options) {
          var oPrice = originPrice();
          if (sellingPrice() < oPrice || oPrice == 0) {
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

        // @author Michael.Lee
        // －－－－－－－－－－－－－－－－－－－－－－－
        var that = this;
        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          var pathname = window.location.pathname;
          var pathArr = /\d+/g.exec(pathname);

          if (typeof pathArr != 'undefined' && null != pathArr && pathArr.length > 0) {
            that.itemid = pathArr[0];
          } else {
            //alert("path error");
            return;
          }
        });

        switcher.register('app', function () {
          var params = can.route.attr();
          that.itemid = params.itemId;
        });

        switcher.go();
        // －－－－－－－－－－－－－－－－－－－－－－－

        // @todo 需要在配置文件中修改
        this.detailUrl = 'http://m.sfht.com';
        this.mainUrl = SFConfig.setting.api.mainurl;
        this.adapter = new SFDetailcontentAdapter({});

        // @author Michael.Lee
        // 将更新购物车事件注册到window上
        // 其他地方添加需要更新mini购物车的时候调用can.trigger('updateCart')
        can.on.call(window, 'updateCart', _.bind(this.updateCart, this));

        //如果tag为init，则要进行单独处理，防止刷新
        var tag = can.route.attr('tag');
        this.initRender(tag || DEFAULT_INIT_TAG);
        // if (tag === DEFAULT_INIT_TAG) {
        //   this.initRender(DEFAULT_INIT_TAG);
        // } else {
        //   can.route.attr('tag', DEFAULT_INIT_TAG);
        // }
      },

      '{can.route} change': function() {
        var tag = can.route.attr('tag') || DEFAULT_INIT_TAG;

        this.initRender.call(this, tag, this.data);
      },

      /**
       * @author Michael.Lee
       * @description 添加购物车动作触发
       * @param  {element} el
       */
      '.addtocart click': function(el, event) {
        event && event.preventDefault();

        var itemId = el.closest('.cms-src-item').attr('data-cms-itemid');
        if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          // 用户如果如果登录

          this.addCart(itemId);
        } else {
          store.set('temp-action-addCart', {
            itemId: itemId
          });
          can.trigger(window, 'showLogin', [window.location.href]);
        }
      },

      /**
       * @author Michael.Lee
       * @description 用户点击购物车之后的动作变化
       * @param  {element}  $el   点击对象的jquery对象
       * @param  {event}    event 绑定在点击对象的event对象
       * @return
       */
      '.mini-cart-container click': function($el, event) {
        event && event.preventDefault();

        var href = $el.attr('data-href');
        var hrefLogin = $el.attr('data-login');

        if (SFComm.prototype.checkUserLogin.call(this)) {
          window.location.href = href;
        } else {
          window.location.href = hrefLogin + '?from='+window.location.href;
        }
      },

      controlCart: function() {
        if (SFComm.prototype.checkUserLogin.call(this)) {
          this.getUserInfo(_.bind(function(uinfo){

            var arr = [];
            if (uinfo) {
              arr = uinfo.split(',');
            }

            var flag = arr[4];

            // 如果判断开关关闭，使用dom操作不显示购物车
            if (typeof flag == 'undefined' || flag == '2') {
              $(".mini-cart-container").hide();
              $(".addcart").hide();
            }else if (flag == '0') {
              // 请求总开关进行判断
              this.requestIsShowCart();

            }else{
              $(".mini-cart-container").show();
              $(".addcart").show();
            }
          }, this));


        }else{
          this.requestIsShowCart();
        }
      },

      getUserInfo: function (callback) {

        var that = this;
        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          var uinfo = $.fn.cookie('3_uinfo');
          callback.call(that, uinfo);
        });

        switcher.register('app', function () {
          SFHybrid.getTokenInfo()
            .done(function (data) {
              callback.call(that, data && data.cookie);
            })
            .fail(function () {

            });
        });

        switcher.go();

      },

      requestIsShowCart: function () {
        var isShowCart = new SFIsShowCart();
        isShowCart
          .sendRequest()
          .done(function (data) {
            if (data.value) {
              $(".mini-cart-container").show();
              $(".addcart").show();
            }else{
              $(".mini-cart-container").hide();
              $(".addcart").hide();
            }
          });
      },

      /**
       * @author Michael.Lee
       * @description 检查有没有临时的添加购物车的任务需要执行
       * @return
       */
      checkTempActionAddCart: function() {
        var params = store.get('temp-action-addCart');

        if (params) {
          var itemId = params.itemId;
          var num = params.num || 1;

          if (itemId && num) {
            store.remove('temp-action-addCart');
            this.addCart(itemId, num);
          }
        }
      },

      /**
       * @author Michael.Lee
       * @description 加入购物车
       */
      addCart: function(itemId, num) {
        // can.route.attr({tag: 'init', target: 'empty'});
        // can.route.attr({tag: 'back', target: 'empty'});

        var addItemToCart = new SFAddItemToCart({
          items: JSON.stringify([{
            itemId: itemId,
            num: num || 1
          }])
        });

        // 添加购物车发送请求
        addItemToCart.sendRequest()
          .done(function(data) {
            if (data.isSuccess) {

              var carticon = $('.detail-cart-r a img').clone();
              var current=carticon.offset();
              $('.detail-cart-r a').append(carticon.css({
                'position': 'absolute',
                'top': current.top,
                'left': current.left + 30,
                'width': '60px',
                'height': '60px',
                'border-radius': '60px',
                'z-index': '1000'
              }));

              var target=$('.icon47').offset()
              var targetX=target.left,
                  targetY=target.top,
                  // current=carticon.offset(),
                  currentX=current.left,
                  currentY=current.top,
                  cart_num=$('.dot-error').text();
              carticon.appendTo(carticon.parent());
              carticon.animate({
                left:targetX-currentX-50,
                top:targetY-currentY,
                transform:'rotate(360deg) scale(0.1)',
                zIndex:1000,
                // display: 'none'
                visibility:'hidden'
              }, 2000, 'ease-out');



              setTimeout(function() {
                can.trigger(window, 'updateCart');
                carticon.remove();
                can.route.attr({tag: 'back', target: 'empty'});
              }, 1000);

              // var carticon = $('.detail-cart-r img');
              // var target=$('.icon47').offset()
              // var targetX=target.left,
              //     targetY=target.top,
              //     current=carticon.offset(),
              //     currentX=current.left,
              //     currentY=current.top,
              //     cart_num=$('.dot-error').text();
              // carticon.clone().appendTo(carticon.parent());
              // carticon.css({
              //   left:targetX-currentX-50,
              //   top:targetY-currentY,
              //   transform:'rotate(360deg) scale(0.1)',
              //   zIndex:1000,
              //   visibility:'hidden'
              // })

              // setTimeout(function() {
              //   can.route.attr({tag: 'back', target: 'empty'});

              //   // 更新mini购物车
              //   can.trigger(window, 'updateCart');
              // }, 1000);

              // $('#firststep').show();
              // $('#secondstep').hide();

              // can.route.attr({tag: 'init', target: 'empty'});
            }else{
              can.route.attr({tag: 'back', target: 'empty'});
              var $el = $('<section class="tooltip center overflow-num"><div>'+data.resultMsg+'</div></section>');
              $(document.body).append($el);
              setTimeout(function() {
                $el.remove();
              }, 10000);
            }
          })
          .fail(function(data) {
            // if (data == 15000800) {
            //   var $el = $('<section class="tooltip center overflow-num"><div>您的购物车已满，赶紧去买单哦～</div></section>');
            //   $(document.body).append($el);
            //   setTimeout(function() {
            //     $el.remove();
            //   }, 10000);
            // }
          })
      },

      /**
       * @author Michael.Lee
       * @description 更新导航栏购物车，调用接口刷新购物车数量
       */
      updateCart: function() {
        var that = this;

        // 如果用户已经登陆了，可以进行购物车更新
        // @todo 如果是白名单的用户可以看到购物车
        if (SFComm.prototype.checkUserLogin.call(this)) {
          this.element.find('.mini-cart-num').show();

          var getTotalCount = new SFGetTotalCount();
          getTotalCount.sendRequest()
            .done(function(data) {
              // @description 将返回数字显示在头部导航栏
              // 需要跳动的效果
              that.element.find('.mini-cart-num').text(data.value)
              that.element.find('.mini-cart-num').addClass('animated bounce');

              setTimeout(function() {
                that.element.find('.mini-cart-num').removeClass('animated bounce');
              }, 500);
            })
            .fail(function(data) {
              // 更新mini cart失败，不做任何显示
            });
        }
      },

      renderMap: {
        'init': function(data) {
          this.render();
        },

        'gotobuy': function(data) {
          if ($('#secondstep').length > 0) {
            $('#secondstep').show();
          }else{
            can.route.attr('tag', 'init');
          }
        },

        'back': function (data) {
          if ($('#secondstep').length > 0) {
            $('#secondstep').hide();
          }else{
            can.route.attr('tag', 'init');
          }
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

        can.when(that.initGetItemInfo(that.itemid), that.initGetProductHotData(that.itemid), that.initActivityInfo(that.itemid), that.initFindRecommendProducts(that.itemid))
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

            // @deprecated 不再需要展示notice
            //
            // if (_.contains(FILTER_ARRAY, that.itemid) && Date.now() < new Date(LIMITIED_DATE)) {
            //   that.options.detailContentInfo.attr({
            //     notice: NOTICE_WORD
            //   });
            // }

            var renderFn = can.mustache(template_product_detailcontent);
            var html = renderFn(that.options.detailContentInfo, that.helpers);
            // var html = can.view('/templates/product/sf.b2c.mall.product.detailcontent.mustache', that.options.detailContentInfo, that.helpers);
            that.element.html(html);

            that.controlCart();

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

            $('#detailTab').click(function() {
              that.switchTab($(this), 'detailTab');
            })

            $('#itemInfoTab').click(function() {
              that.switchTab($(this), 'itemInfoTab');
            })

            var switcher = new SFSwitcher();

            switcher.register('wechat', function () {
              //微信分享
              that.weixinShare(that.itemid, that.options.detailContentInfo);
            });

            switcher.register('app', function () {
              that.setShareBtn(that.itemid, that.options.detailContentInfo);
            });

            switcher.go();

            $('.loadingDIV').hide();

            $(document).ready(function() {
              if (SFFn.isMobile.Android()) {
                that.fixedTab();
              }
            });

            // @author Michael.Lee
            // 判断用户是否登陆，请求minicart
            that.updateCart();

          })
          .fail(function(error) {
            console.error(error);
            $('.loadingDIV').hide();
          })
      },

      '.addcart click': function() {
        if (SFComm.prototype.checkUserLogin.call(this)) {
          can.route.attr({
            tag: 'gotobuy',
            target: 'cart'
          });
        } else {
          window.location.href = 'http://m.sfht.com/login.html?from=' + encodeURIComponent(window.location.href);
        }
      },

      '.gotobuy click': function(element) {
        can.route.attr({
          tag: 'gotobuy',
          target: 'pay'
        });
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

        // $('.specbuttons').click(function() {
        //   that.specbuttonsClick($(this));
        // })

        // $('#reduceNum').click(function() {
        //   that.reduceNumClick($(this));
        // })

        // $('#addNum').click(function() {
        //   that.addNumClick($(this));
        // })

        // $('#inputNum').blur(function() {
        //   that.dealBuyNumByInput($(this));
        // })

        // $('#inputNum').keyup(function() {
        //   that.dealBuyNumByInput($(this));
        // })

        // $('#inputNum').keydown(function() {
        //   that.options.detailContentInfo.input.attr("error", "");
        // })
      },

      '#addNum click': function ($element) {
        this.addNumClick($element);
      },

      '#reduceNum click': function ($element) {
        this.reduceNumClick($element);
      },

      '.specbuttons click': function ($element) {
        this.specbuttonsClick($element);
      },

      '#inputNum blur': function ($element) {
        this.dealBuyNumByInput($element);
      },

      '#inputNum keyup': function ($element) {
        this.dealBuyNumByInput($element);
      },

      '#inputNum keydown': function ($element) {
        this.options.detailContentInfo.input.attr("error", "");
      },


      /**
       * [buyEnter 构面确认按钮事件]
       * @return
       */
      '#buyEnter click': function(element, event) {
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

        var params = can.route.attr();
        var map = {
          'pay': _.bind(function() {
            var gotoUrl = 'http://m.sfht.com/order.html' + '?' + $.param({
              "itemid": this.itemid,
              "amount": this.options.detailContentInfo.input.buyNum
            });

            if (!SFComm.prototype.checkUserLogin.call(this)) {
              window.location.href = 'http://m.sfht.com/login.html?from=' + escape(gotoUrl);
              return false;
            }

            window.location.href = gotoUrl;
          }, this),

          'cart': _.bind(function() {
            this.addCart(this.itemid, this.options.detailContentInfo.input.buyNum);
          }, this)
        }

        var fn = map[params.target];
        if (_.isFunction(fn)) {
          fn();
        }
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
        } else{
          input.attr('buyNum', amount);
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

      '#secondstep .mask click': function () {
        can.route.attr({tag: 'back', target: 'empty'});
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
      },

      setShareBtn: function (itemid, detailContentInfo) {
        SFHybrid.sfnavigator.setRightButton('分享', null, function(){
          var imgUrl = detailContentInfo.itemInfo.basicInfo.images[0].thumbImgUrl;

          var hasURL = _.str.include(imgUrl, 'http://')
          if (!hasURL) {
            imgUrl = 'http://img0.sfht.com/' + imgUrl;
          }

          var message = {
            subject: detailContentInfo.itemInfo.basicInfo.title,
            description: "[" + detailContentInfo.itemInfo.basicInfo.brand + "]" + detailContentInfo.itemInfo.basicInfo.title,
            url: "http://m.sfht.com/detail/" + itemid + ".html",
            imageUrl: imgUrl
          };

          SFHybrid.share(message)
            .done(function () {
              alert('感谢分享');
            })
            .fail(function () {

            })
        });
      }
    });
  })