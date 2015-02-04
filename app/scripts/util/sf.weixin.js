'use strict';

define('sf.weixin', [
  'zepto',
  'can',
  'jweixin',
  'sf.b2c.mall.api.user.getWeChatJsApiSig'

], function($, can, jweixin, SFGetWeChatJsApiSig) {

  var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15);
  };

  var createTimestamp = function() {
    return parseInt(new Date().getTime() / 1000) + '';
  };

  var gethHostUrl = function() {
    // return window.location.origin + window.location.pathname;
    return window.location.href;
  };

  var configWeixin = function() {
    var noncestr = createNonceStr();
    var timestamp = createTimestamp();

    var ret = {
      "keyValuePairs": JSON.stringify([{
        "value": noncestr,
        "key": "noncestr"
      }, {
        "value": timestamp,
        "key": "timestamp"
      }, {
        "value": gethHostUrl(),
        "key": "url"
      }])
    };

    var getWeChatJsApiSig = new SFGetWeChatJsApiSig(ret);

    getWeChatJsApiSig
      .sendRequest()
      .done(function(data) {

        jweixin.config({
          "debug": false,
          "appId": 'wx16bba2e4d6560791',
          "timestamp": timestamp,
          "nonceStr": noncestr,
          "signature": data.value,
          "jsApiList": [
            'onMenuShareTimeline'
          ]
        });
      })
      .fail(function(error) {
        console.error(error);
      })

  };

  return {
    /** [shareIndex 分享首页] */
    shareIndex: function() {

      //进行微信设置
      configWeixin();

      // 定义微信分享的数据
      jweixin.ready(function() {
        jweixin.onMenuShareTimeline({
          title: '顺丰海淘--别再淘宝啦！快来顺丰海淘，挑海外好货，一起提升B格！',
          desc: '别再淘宝啦！快来顺丰海淘，挑海外好货，一起提升B格！',
          link: 'http://m.sfht.com/index.html',
          imgUrl: 'http://m.sfht.com/img/sharelog.png',
          trigger: function(res) {
            // alert('用户点击发送给朋友');
          },
          success: function(res) {
            alert('已分享');
          },
          cancel: function(res) {
            // alert('已取消');
          },
          fail: function(res) {
            alert(JSON.stringify(res));
          }
        });

        jweixin.showMenuItems({
          menuList: ['menuItem:share:timeline']
        });
      })
    },

    /**
     * [shareDetail 分享详情页]
     * @param  {[type]} title  [标题]
     * @param  {[type]} desc   [描述]
     * @param  {[type]} link   [链接]
     * @param  {[type]} imgUrl [图片链接]
     */
    shareDetail: function(title, desc, link, imgUrl) {
      var that = this;

      //进行微信设置
      configWeixin();

      // 定义微信分享的数据
      jweixin.ready(function() {
        jweixin.onMenuShareTimeline({
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl,
          trigger: function(res) {
            // alert('用户点击发送给朋友');
          },
          success: function(res) {
            alert('已分享');
          },
          cancel: function(res) {
            // alert('已取消');
          },
          fail: function(res) {
            alert(JSON.stringify(res));
          }
        });

        jweixin.showMenuItems({
          menuList: ['menuItem:share:timeline']
        });
      })
    }

  };

});