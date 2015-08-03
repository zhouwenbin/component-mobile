define(
  'sf.b2c.mall.module.header', [
    'can',
    'zepto',
    'zepto.cookie',
    'store',
    'underscore',
    'fastclick',
    'sf.util',
    'sf.env.switcher',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.searchbox',
    'text!template_widget_header_ad',
    'sf.b2c.mall.api.minicart.getTotalCount', // 获得mini cart的数量接口
    'sf.b2c.mall.api.shopcart.addItemsToCart', // 添加购物车接口
    'sf.b2c.mall.api.shopcart.isShowCart',
    'sf.hybrid',
    'sf.b2c.mall.widget.cartnumber',
  ],

  function(can, $, $cookie, store, _, Fastclick, SFFn, SFSwitcher, SFConfig, SFComm, SFSearchBox,
    template_widget_header_ad, SFGetTotalCount, SFAddItemToCart, SFIsShowCart, SFHybrid, SFWidgetCartNumber) {

    Fastclick.attach(document.body);
    SFComm.register(3);

    var header = can.Control.extend({

      init: function() {
        // @deprecated 不需要把主体绑定到body上去
        // this.setup($('body'));

        var template = can.view.mustache(template_widget_header_ad);
        $('body').append(template({}));

        // －－－－－－－－－－－－－－－－－－－－－－
        // 对于头部是否显示，注册不同的环境逻辑分支
        var switcher = new SFSwitcher();

        // 一般环境显示头部
        switcher.register('web', _.bind(function() {
          // this.element.fadeIn();
          this.element.find('header').show();
          new SFSearchBox('#sf-b2c-mall-search-box', {
            showGate: true,
            existDom: "all"
          });
        }, this));

        // app环境内隐藏头部
        switcher.register('app', _.bind(function() {
          this.element.hide();
          // this.setShareBtn();
        }, this));

        // 根据逻辑环境进行执行
        switcher.go();
        // －－－－－－－－－－－－－－－－－－－－－－

        this.controlCart();

        // this.showAD();

        // @author Michael.Lee
        // 判断用户是否登陆，请求minicart
        this.updateCart();

        // @author Michael.Lee
        // 将更新购物车事件注册到window上
        // 其他地方添加需要更新mini购物车的时候调用can.trigger('updateCart')
        can.on.call(window, 'updateCart', _.bind(this.updateCart, this));

        // this.setCookie();
      },

      setCookie: function() {
        // alert("get:" + $.fn.cookie('_ruser2'));
        // alert(document.cookie);
        var params = can.deparam(window.location.search.substr(1));

        // if (params._src && !$.fn.cookie('_ruser')) {
        if (params._src && !$.fn.cookie('_ruser')) {
          $.fn.cookie('_ruser', params._src, {expires: 15, domain: '.sfht.com', path: '/'})
        }

        // alert("afterset:" + $.fn.cookie('_ruser'));
      },

      controlCart: function() {
        if (SFComm.prototype.checkUserLogin.call(this)) {
          var uinfo = $.fn.cookie('3_uinfo');
          var arr = [];
          if (uinfo) {
            arr = uinfo.split(',');
          }

          var flag = arr[4];

          // 如果判断开关关闭，使用dom操作不显示购物车
          if (typeof flag == 'undefined' || flag == '2') {
            $(".mini-cart-container-parent").hide();
          } else if (flag == '0') {
            // @todo 请求总开关进行判断
            var isShowCart = new SFIsShowCart();
            isShowCart
              .sendRequest()
              .done(function(data) {
                if (data.value) {
                  $(".mini-cart-container-parent").show();
                } else {
                  $(".mini-cart-container-parent").hide();
                }
              })

          } else {
            $(".mini-cart-container-parent").show();
          }
        } else {
          // @todo 暂时全局关闭购物车按钮
          var isShowCart = new SFIsShowCart();
          isShowCart
            .sendRequest()
            .done(function(data) {
              if (data.value) {
                $(".mini-cart-container-parent").show();
              } else {
                $(".mini-cart-container-parent").hide();
              }
            });
        }
      },

      /**
       * @author Michael.Lee
       * @description 用户点击购物车之后的动作变化
       * @param  {element}  $el   点击对象的jquery对象
       * @param  {event}    event 绑定在点击对象的event对象
       * @return
       */
      '.mini-cart-container-parent click': function($el, event) {
        event && event.preventDefault();

        var href = $el.attr('data-href');
        var hrefLogin = $el.attr('data-login');

        if (SFComm.prototype.checkUserLogin.call(this)) {
          window.location.href = href;
        } else {
          window.location.href = hrefLogin + '?from=' + encodeURIComponent(href);
        }
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
        var addItemToCart = new SFAddItemToCart({
          itemId: itemId,
          num: num || 1
        });

        // 添加购物车发送请求
        addItemToCart.sendRequest()
          .done(function(data) {
            if (data.isSuccess) {

              // 更新mini购物车
              can.trigger(window, 'updateCart');
            } else {

              var $el = $('<section class="tooltip center overflow-num"><div>' + data.resultMsg + '</div></section>');
              $(document.body).append($el);
              setTimeout(function() {
                $el.remove();
              }, 1000);

            }
          })
          .fail(function(data) {
            // @deprecated 接口变动，不再用errorCode作为判断错误依据
            // if (data == 15000800) {
            //   var $el = $('<section class="tooltip center overflow-num"><div>您的购物车已满，赶紧去买单哦～</div></section>');
            //   $(document.body).append($el);
            //   setTimeout(function() {
            //     $el.remove();
            //   }, 1000);
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
          this.element.find('.mini-cart').show();

          var success = function (data) {
            // @description 将返回数字显示在头部导航栏
            // 需要跳动的效果
            that.element.find('.mini-cart-num').text(data.value).show();
          };

          var error = function() {
            // 更新mini cart失败，不做任何显示
          };

          new SFWidgetCartNumber(success, error);

          // var getTotalCount = new SFGetTotalCount();
          // getTotalCount.sendRequest()
          //   .done(function(data) {
          //     // @description 将返回数字显示在头部导航栏
          //     // 需要跳动的效果
          //     that.element.find('.mini-cart-num').text(data.value).show();
          //   })
          //   .fail(function(data) {
          //     // 更新mini cart失败，不做任何显示
          //   });
        }
      },

      setShareBtn: function () {
        SFHybrid.sfnavigator.setRightButton('分享', null, function(){
          // var imgUrl = detailContentInfo.itemInfo.basicInfo.images[0].thumbImgUrl;

          // var hasURL = _.str.include(imgUrl, 'http://')
          // if (!hasURL) {
          //   imgUrl = 'http://img0.sfht.com/' + imgUrl;
          // }

          var message = {
            subject: document.title,
            description: $('meta[name=description]').attr('content'),
            url: window.location.href,
            imageUrl: 'http://img.sfht.com/sfhth5/1.1.86/img/luck.png'
          };

          SFHybrid.share(message)
            .done(function () {
              alert('感谢分享');
            })
            .fail(function () {

            })
        });
      },

      /**
       * @description 点击广告关闭按钮
       * @param  {can.$} $el   element的jquery对象
       * @param  {event} event event对象
       * @return
       */
      "#closebutton click": function($el, event) {
        event && event.stopPropagation();
        $(".banner-dialog").hide();
      },

      /**
       * @author zhangke
       * @description 用户点击返回之后的动作变化
       * @param  {element}  $el   点击对象的jquery对象
       * @param  {event}    event 绑定在点击对象的event对象
       * @return
       */
      '[data-header-id=back] click': function($el, event) {
        event && event.preventDefault();
        if (!document.referrer) {
          window.location.href = "http://m.sfht.com";
        } else {
          window.history.back();
        }
      },

      /**
       * @description 点击广告跳转具体页面
       * @param  {element}  $el   点击对象的jquery对象
       * @param  {event}    event 绑定在点击对象的event对象
       * @return
       */
      "#banner-dialog click": function($el, event) {
        if ($(event.target).attr('id') != $el.attr('id')) {
          return false;
        } else {
          window.location.href = "http://m.sfht.com/61.html";
        }
      },

      /**
       * @description 显示广告
       * @return
       */
      showAD: function() {
        if (this.needShowAd()) {
          $(".banner-dialog").show();
          store.set("lastadshowtime", new Date().getTime());
        }
      },

      /**
       * @description 判断显示广告的逻辑
       * @return
       */
      needShowAd: function() {

        // 如果在alipay的服务号则不需要展示
        if (SFFn.isMobile.AlipayChat()) {
          return false;
        }

        // 如果已经登录了 则不显示
        // if (store.get('csrfToken')) {
        //   return false;
        // }

        // 如果显示没超过一天 则不要显示广告
        if (store.get('lastadshowtime') && (new Date().getTime() - store.get('lastadshowtime') < 60 * 60 * 24 * 1000)) {
          return false;
        }

        var url = window.location.href;

        //URL补齐
        if (url == "http://m.sfht.com/") {
          url = url + "index.html";
        }

        // 如果不是详情页 首页和活动页 则不显示广告
        var isShowURL = /index|activity|detail/.test(url);
        if (!isShowURL) {
          return false;
        }

        return true;
      }
    });

    return new header('.sf-b2c-mall-header');

  });