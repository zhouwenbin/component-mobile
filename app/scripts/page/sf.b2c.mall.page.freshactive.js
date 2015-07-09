'use strict';
define(
  'sf.b2c.mall.page.freshactive',
  [
    'can',
    'zepto',
    'store',
    'fastclick',
    'underscore',
    'md5',
    'sf.helpers',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.user.getVoteNum'
  ],
  function(can, $, store, Fastclick, _, md5, helpers, SFComm, SFConfig, SFFn, SFMessage, SFGetVoteNum) {
    Fastclick.attach(document.body);
    SFComm.register(3);

    var fresh = can.Control.extend({

      /**
       * @description 初始化方法，当调用new时会执行init方法
       * @param  {Dom} element 当前dom元素
       * @param  {Map} options 传递的参数
       */
      init: function(element, options) {
        var getVoteNum = new SFGetVoteNum({
          "voteType": "XXMAN"
        });
        getVoteNum.sendRequest()
          .done(function(data) {
            $("#votenum").text(data.voteTotalNum);
          })
          .fail(function(error) {
            console.error(error)
          })
      }

    });

    new fresh(".sf-b2c-mall-fresh");
  });