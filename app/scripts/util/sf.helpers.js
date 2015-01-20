'use strict';

define('sf.helpers', ['zepto',
  'can',
  'underscore',
  'moment'
], function($, can, _, moment) {

  can.Mustache.registerHelper('sf.toggle', function(value) {
    return function(el) {
      new Toggle(el, {
        value: value
      });
    };
  });

  can.Mustache.registerHelper('sf.time', function(time) {
    if (_.isFunction(time)) {
      time = time();
    }

    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  });

  /**
   * @description sf.price
   * @param  {int} price Price
   */
  can.Mustache.registerHelper('sf.price', function(price) {

    var getValue = function(v) {
      if (_.isFunction(v)) {
        price = v();
      }
    };

    while (_.isFunction(price)) {
      getValue(price);
    }

    // return (price/100).toFixed(2).toString();
    return (price / 100).toString();
  });

  can.Mustache.registerHelper('sf.img', function(img, options) {
    if (_.isFunction(img)) {
      img = img();
    }

    var arr = [];
    if (_.isString(img)) {
      arr = img.split(',');
    } else if (_.isArray(img)) {
      arr = img;
    }

    //做线上兼容，如果有http了 就不要再加前缀
    var hasURL = _.str.include(arr[0], 'http://')
    if (hasURL){
      return arr[0];
    }

    return 'http://img0.sfht.com/' + arr[0];
  });

});