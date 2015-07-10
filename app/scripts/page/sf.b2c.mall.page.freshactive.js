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

            if(data.voteTotalNum.length  == 1) {
              data.voteTotalNum = "000000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length  == 2){
              data.voteTotalNum = "00000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length  == 3){
              data.voteTotalNum = "0000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length  == 4){
              data.voteTotalNum = "000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length  == 5){
              data.voteTotalNum = "00" + data.voteTotalNum;
            } else if (data.voteTotalNum.length  == 6){
              data.voteTotalNum = "0" + data.voteTotalNum;
            }

            $("#votenum").text(data.voteTotalNum);

            // var i = 0;
            // var interval = setInterval(function(){
            //     if (i <= data.voteTotalNum) {
            //       $("#votenum").text(i);
            //       i = i + 100;
            //     } else {
            //       clearInterval(interval)
            //     }

            // }, 0.1);
          })
          .fail(function(error) {
            console.error(error)
          })

        $("#sharefriend").click(function(){
          $("body,html").scrollTop(0);
          $("#sharearea").show();
        })

        $(".mask").click(function(){
          $("#sharearea").hide();
        })
      }

    });

    new fresh(".sf-b2c-mall-fresh");
  });