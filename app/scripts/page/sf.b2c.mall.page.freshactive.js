'use strict';
define(
  'sf.b2c.mall.page.freshactive', [
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
    'sf.b2c.mall.api.user.getVoteNum',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.component.mypoint',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.module.getcoupon'
  ],
  function(can, $, store, Fastclick, _, md5, helpers, SFComm, SFConfig, SFFn, SFMessage, SFGetVoteNum, SFSwitcher, SFHybrid, SFPoint, SFLoading, SFGetcoupon) {
    Fastclick.attach(document.body);
    SFComm.register(3);

    var fresh = can.Control.extend({

      /**
       * @description 初始化方法，当调用new时会执行init方法
       * @param  {Dom} element 当前dom元素
       * @param  {Map} options 传递的参数
       */
      init: function(element, options) {

        if (!SFFn.isMobile.WeChat()) {
          $("#sharefriend")[0].style.visibility = "hidden";
        }

        setInterval(function() {
          $("#votenum")[0].style.color = "#fff";
        }, 1000)

        var getVoteNum = new SFGetVoteNum({
          "voteType": "XXMAN"
        });
        getVoteNum.sendRequest()
          .done(function(data) {

            data.voteTotalNum = data.voteTotalNum.toString();

            if (data.voteTotalNum.length == 1) {
              data.voteTotalNum = "000000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length == 2) {
              data.voteTotalNum = "00000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length == 3) {
              data.voteTotalNum = "0000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length == 4) {
              data.voteTotalNum = "000" + data.voteTotalNum;
            } else if (data.voteTotalNum.length == 5) {
              data.voteTotalNum = "00" + data.voteTotalNum;
            } else if (data.voteTotalNum.length == 6) {
              data.voteTotalNum = "0" + data.voteTotalNum;
            }

            $("#votenum").html(data.voteTotalNum);

          })
          .fail(function(error) {
            console.error(error)
          })

        $("#sharefriend").click(function() {
          $("body,html").scrollTop(0);
          $("#sharearea").show();
        })

        $(".mask").click(function() {
          $("#sharearea").hide();
        })
      }

    });

    var switcher = new SFSwitcher();
    var loadingCtrl = new SFLoading();

    switcher.register('web', function() {
      // loadingCtrl.show();
      new fresh(".sf-b2c-mall-fresh");

      $("#gotoapp").click(function() {
        window.location.href = "http://m.sfht.com/app.html";
      })

      // loadingCtrl.hide();
    });

    switcher.register('onlineapp', function() {
      loadingCtrl.show();
      new fresh(".sf-b2c-mall-fresh");

      loadingCtrl.hide();
    });

    switcher.go();


  });