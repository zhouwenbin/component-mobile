'use strict';

define(
  'sf.b2c.mall.page.bridge',

  [
    "sf.bridge"
  ],

  function () {

    setTimeout(function() {
      var params = {
        "subject": '哈哈哈哈',
        "description": '哈哈哈哈哈',
        "imageUrl": 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/icon/10256.png',
        "url": 'https://www.baidu.com/'
      }

      var success =function () {
        alert('success')
      }

      var error = function () {
        alert('error')
      }

      window.bridge.run('SocialSharing', 'share', params, success, error)
    }, 2000);

  });