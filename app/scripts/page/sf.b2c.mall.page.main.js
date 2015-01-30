'use strict';

define(
  [
    'can',
    'zepto',
    'swipe',
    'underscore',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.component.price',
    'sf.weixin'
  ],

  function(can, $, Swipe, _, SFFrameworkComm, ItemPrice, SFWeixin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var home = can.Control.extend({

      init: function(element, options) {
        this.render();
      },

      render: function() {
        new ItemPrice('.sf-b2c-mall-itemList');
        // new Header('.sf-b2c-mall-header', {
        //   onLogin: _.bind(this.onLogin, this)
        // });
        // new Footer('.sf-b2c-mall-footer');
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
        }
    });
    new home();
  });