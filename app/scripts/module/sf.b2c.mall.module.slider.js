/**
 * Created by 魏志强 on 2014/12/26.
 */
define(
  'sf.b2c.mall.module.slider', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, Fastclick,SFFrameworkComm, SFConfig) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var main = can.Control.extend({

      init: function() {
        this.render();


      },
      // renderMap: {
      //   'slide': function () {
      //     var $el = this.element.find('.sf-b2c-mall-main-slider.serverRendered');

      //     var that = this;
      //     if ($el.length === 0) {
      //       var request = new SFApiGetBanner();
      //       can.when(request.sendRequest())
      //         .done(function (data) {
      //           var arr = [];
      //           _.each(data.value, function(value, key, list){
      //             arr.push({
      //               imgUrl: value.imgUrl,
      //               url: value.link
      //             });
      //           });
      //           that.component.slide = new SFSlide('.sf-b2c-mall-main-slider', {imgs: arr});
      //         })
      //         .fail(function () {

      //         })
      //     }else{
      //       that.component.slide = new SFSlide('.sf-b2c-mall-main-slider');
      //     }
      //   }
      // },

      render: function() {
        //new SFSlide('.cms-module-slider');
      }
    })

    new main('body');
  })