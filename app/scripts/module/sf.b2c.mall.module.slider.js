/**
 * Created by 魏志强 on 2014/12/26.
 */
define(
  'sf.b2c.mall.module.slider', [
    'can',
    'zepto',
    'swiper',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.module.getcoupon'
  ],
  function(can, $, Swiper, Fastclick, SFFrameworkComm, SFConfig, getCoupon) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var main = can.Control.extend({

      init: function() {
        this.render();
      },


      render: function() {

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });

        // //滚动效果
        // new Swipe($('.cms-module-slider')[0], {
        //   startSlide: 0,
        //   speed: 400,
        //   auto: 5000,
        //   continuous: true,
        //   disableScroll: false,
        //   stopPropagation: false,
        //   callback: function(index, elem) {
        //     $('.swipe-dot span').eq(index).addClass('active').siblings().removeClass('active');
        //   },
        //   transitionEnd: function(index, elem) {}
        // });
        // //第一个选中
        // $('.swipe-dot span').eq(0).addClass('active');
      }
    })

    new main('body');
  })