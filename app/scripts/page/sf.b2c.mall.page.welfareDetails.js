'use strict';

define(
  'sf.b2c.mall.page.welfareDetails',
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.share.shareUrl',
    'sf.b2c.mall.api.task.getShareBuyDetail',
    'text!template_welfare_details',
    'sf.b2c.mall.widget.loading',
    "sf.bridge",
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.rcvCouponByMobile'
  ],

  function(can, $, SFFrameworkComm, SFshareUrl, SFgetShareBuyDetail, template_welfare_details, SFLoading, SFbridge, SFmessage, SFReceiveCoupon) {
      SFFrameworkComm.register(3);
      var loadingCtrl = new SFLoading();
      can.route.ready();

      var welfareDetails = can.Control.extend({
        helpers: {
          'sf-uni': function(description){
            return decodeURIComponent(description())
          }
        },

        itemObj: new can.Map({}),
        '{can.route} change': function() {
          this.render();
        },

        init: function() {
          this.itemObj.getShareBuyDetail =[];
          this.render();
        },

        render: function() {
          this.request();
          this.initLoadDataEvent();
        },

        request: function(cparams) {
          loadingCtrl.show();
        },

        stepCates: function(data) {
          var renderFn = can.view.mustache(template_welfare_details);
          var html = renderFn(data, this.helpers);
          this.element.html(html);
          var taskId = can.route.attr('taskId');
          var ifHasIsId = can.route.attr('isTaskId');
          if(ifHasIsId == 'isTaskId'){
           $('#isToShare').css('display', 'none');
           can.route.attr('couponId',data.couponId);
          }else{
            $('#isShare').css('display', 'none');
          }
          loadingCtrl.hide();
        },

        initLoadDataEvent: function() {
          this.loadingData();
          loadingCtrl.hide();
        },

        loadingData: function(cparams) {
          var that = this;
          var taskId = can.route.attr('taskId');
          var sFgetShareBuyDetail =new SFgetShareBuyDetail({taskId:taskId});
          can.when(sFgetShareBuyDetail.sendRequest()).done(function(data) {
            that.itemObj.attr(data);
            that.stepCates(that.itemObj);
          }) .fail(function(error) {
            console.error(error);
          });
        },

        '.toShareBtn1 click': function($element, event) {
          var ifHasIsId = can.route.attr('isTaskId');
          var taskId = can.route.attr('taskId');
          var url = 'http://' + window.location.hostname + window.location.pathname+ '#!'+ $.param({taskId: taskId});
          if(ifHasIsId != 'isTaskId'){
            if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
              window.location.href ="http://m.sfht.com/login.html?from="+window.encodeURIComponent(url);
              return false;
            }
          }
          var pic = $('.imageBig').attr('data-samllPic');
          var urlId = url+'&isTaskId=isTaskId';

          var params = {
              "subject": 'fulishe',
              "description": 'fulishe',
              "imageUrl": 'http://img0.sfht.com/app/SFHT_1024.png',
              "url": urlId
          }
          var success =function (data) {
            alert('123');
            alert('success:'+data);
            alert(JSON.stringify(data))
            var url = urlId;
            var target = 'WeChat';
            var sFshareUrl =new SFshareUrl({url:url,target:target});
            alert('urlId:'+url);
            can.when(sFshareUrl.sendRequest()).done(function(data) {
              alert('Share-data:'+url);
              setTimeout(function(){
                var message = new SFmessage(null, {
                  'tip': data.text,
                  'type': 'success',
                  'okFunction': function() {
                      window.location.href= data.buttonLink;
                  },
                });
                $('#ok').text(data.buttonText);
              },10);
            }) .fail(function(error) {
              console.error(error);
            });
          };
          var error = function (data) {
            alert('data.error');
            alert(JSON.stringify(data))
          };
          window.bridge.run('SocialSharing', 'share', params, success, error)
        },

        '.toShareBtn2 click': function($element, event) {
            event && event.preventDefault();
            var couponId =  can.route.attr('couponId');
            var mobile = $('.mobileNum').val();
            var that = this;
            if(!/^1[0-9]{10}$/.test(mobile)){
              var message = new SFmessage(null, {
                    'tip': '你填写的手机号格式有误,请重新填写',
                    'type': 'success',
                    'okFunction': function() {},
                });
            }else{
                var rcvCouponByMobile = new SFReceiveCoupon({
                  bagId: couponId,
                  mobile: mobile,
                  type: "CARD",
                  receiveChannel: 'B2C_H5',
                  receiveWay: 'FLS'
                });
                rcvCouponByMobile.sendRequest()
                  .done(function(data) {
                    alert('isTaskId'+data);
                    var message = new SFmessage(null, {
                        'tip': data.text,
                        'type': 'success',
                        'okFunction': function() {},
                    });
                  })
                  .fail(function(errorCode) {
                    if (_.isNumber(errorCode)) {
                      var codeMap = {
                        '11000020':'卡券id不存在',
                        '11000030': '卡券已作废',
                        '11000050': '卡券已领完',
                        '11000100': '用户已领过该券',
                        '11000130': '卡包不存在',
                        '11000140': '卡包已作废'
                      }
                      var defaultText = '领取失败';
                      var errorText = codeMap[errorCode.toString()] || defaultText;
                      new SFmessage(null, {
                        'tip': errorText,
                        'type': 'error'
                      });
                      return;
                    }
                  })
            }
          }

       });
      new welfareDetails('body');
  });