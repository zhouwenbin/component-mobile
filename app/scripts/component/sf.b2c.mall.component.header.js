'use strict';

define(

  'sf.b2c.mall.component.header',

  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.minicart.getTotalCount', // 获得mini cart的数量接口
    'sf.b2c.mall.api.shopcart.addItemToCart', // 添加购物车接口
    'text!template_component_header'
  ],

  function(can, $, Fastclick, SFComm, SFGetTotalCount, SFAddItemToCart, template_component_header) {

    // 将fastclick添加到document.body上
    Fastclick.attach(document.body);

    // 注册appid
    SFComm.register(3);

    var SFHeader = can.Control.extend({

      /**
       * @description 初始化方法
       * @return
       */
      init: function() {
        this.render();

        // @author Michael.Lee
        // 将更新购物车事件注册到window上
        // 其他地方添加需要更新mini购物车的时候调用can.trigger('updateCart')
        can.on.call(window, 'updateCart', _.bind(this.updateCart, this));

      },

      /**
       * @description 主渲染
       * @return
       */
      render: function() {
        var renderFn = can.mustache(template_component_header);
        var html = renderFn({});

        this.element.html(html);
      },

      /**
       * @description 补充渲染
       * @return
       */
      supplement: function() {
        // 判断用户是否登陆，请求minicart
        this.updateCart();
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

        var href = $el.attr('href');
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

    });

  }

);