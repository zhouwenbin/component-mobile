define(
  'sf.b2c.mall.module.imagelazyload', [
    'can',
    'zepto',
    'underscore',
    'lazyload'
  ],

  function(can, $, _,lazyload) {
      $("img.imgLazyload").show().lazyload({
          placeholder : "http://img.sfht.com/sfht/1.1.7/img/loading.gif",
           // 设置下张图片到达前200px加载,逐个加载
           // threshold : 200,
          //插件等图像完全加载和调用show()，当有图片有在窗口范围内的,逐个加载
          effect : "fadeIn"
      });
  });