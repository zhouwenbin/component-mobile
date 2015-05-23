define(
  'sf.b2c.mall.module.header', [
    'can',
    'zepto',
    'store',
    'underscore',
    'fastclick',
    'sf.util',
    'sf.env.switcher',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm',
    'text!template_widget_header_ad',
    'sf.b2c.mall.api.minicart.getTotalCount', // 获得mini cart的数量接口
    'sf.b2c.mall.api.shopcart.addItemToCart' // 添加购物车接口
  ],

  function(can, $, store, _, Fastclick, SFFn, SFSwitcher, SFConfig, SFComm, template_widget_header_ad, SFGetTotalCount, SFAddItemToCart) {

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
          this.element.show();
        }, this));

        // app环境内隐藏头部
        switcher.register('app', _.bind(function() {
          this.element.hide();
        }, this));

        // 根据逻辑环境进行执行
        switcher.go();
        // －－－－－－－－－－－－－－－－－－－－－－

        this.showAD();

        // @author Michael.Lee
        // 判断用户是否登陆，请求minicart
        this.updateCart();

        // @author Michael.Lee
        // 将更新购物车事件注册到window上
        // 其他地方添加需要更新mini购物车的时候调用can.trigger('updateCart')
        can.on.call(window, 'updateCart', _.bind(this.updateCart, this));
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
          window.location.href = hrefLogin;
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
            if (data.value) {
              // 更新mini购物车
              can.trigger(window, 'updateCart');
            }
          })
          .fail(function(data) {
            // @todo 添加失败提示
            var error = SFAddItemToCart.api.ERROR_CODE[data.code];

            if (error) {
              // @todo 需要确认是不是需要提交
            }
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

          var getTotalCount = new SFGetTotalCount();
          getTotalCount.sendRequest()
            .done(function(data) {
              // @description 将返回数字显示在头部导航栏
              // 需要跳动的效果
              that.element.find('.mini-cart-num').text(data.value);
            })
            .fail(function(data) {
              // 更新mini cart失败，不做任何显示
            });
        }
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
       * @description 点击广告跳转具体页面
       * @param  {element}  $el   点击对象的jquery对象
       * @param  {event}    event 绑定在点击对象的event对象
       * @return
       */
      "#banner-dialog click": function($el, event) {
        if ($(event.target).attr('id') != $el.attr('id')) {
          return false;
        } else {
          window.location.href = "http://m.sfht.com/520.html";
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
        if (store.get('csrfToken')) {
          return false;
        }

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