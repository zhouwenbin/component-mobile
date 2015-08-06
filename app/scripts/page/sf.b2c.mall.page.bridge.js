'use strict';

define(
  'sf.b2c.mall.page.bridge',

  [
    "zepto",
    "sf.bridge"
  ],

  function ($) {

    // setTimeout(function() {
      // var params = {
      //   "subject": '哈哈哈哈',
      //   "description": '哈哈哈哈哈',
      //   "imageUrl": 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/icon/10256.png',
      //   "url": 'https://www.baidu.com/'
      // }

      var success =function (data) {
        alert('success')
        alert(JSON.stringify(data))
      }

      var error = function (data) {
        alert('error')
        alert(JSON.stringify(data))
      }

      $('#runner').on('click', function () {
        var plugin = $('#pluginName').val()
        var method = $('#methodName').val()

        var paramsStr = $('#params').val()
        var params = JSON.parse(paramsStr);

        window.bridge.run(plugin, method, params, success, error)
        // window.bridge.run('SocialSharing', 'share', params, success, error)
      });

      
    // }, 2000);

  });