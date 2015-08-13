define(
  'sf.b2c.mall.module.imagelazyload', [
    'can',
    'zepto',
    'underscore',
    'lazyload'
  ],

  function(can, $, _, lazyload) {
      lazyload.init({
          callback: function(element, op) {
            if(op === 'load') {
              element.classList.add('lazyloaded');
            } else {
              element.classList.remove('lazyloaded');
            }
          }
      })
  });