'use strict';

define(
  'sf.b2c.mall.page.welfareDetails', [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.api.task.getShareBuyDetail',
    'text!template_welfare_details',
    'sf.b2c.mall.widget.loading',
    "sf.bridge",
    'sf.helpers',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.api.coupon.rcvCouponByMobile',
    'moment'
  ],

  function(can, $, SFFrameworkComm, SFFn, SFgetShareBuyDetail, template_welfare_details, SFLoading, SFbridge, SFHelpers, SFmessage, SFReceiveCoupon, moment) {
    SFFrameworkComm.register(3);
    var loadingCtrl = new SFLoading();
    can.route.ready();

    var welfareDetails = can.Control.extend({
      helpers: {
        'sf-uni': function(description) {
          return decodeURIComponent(description())
        }
      },

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.itemObj.getShareBuyDetail = [];
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
        if (ifHasIsId == 'isTaskId') {
          $('#isToShare').css('display', 'none');
          can.route.attr('couponId', data.couponId);
        } else {
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
        var sFgetShareBuyDetail = new SFgetShareBuyDetail({
          taskId: taskId
        });
        can.when(sFgetShareBuyDetail.sendRequest()).done(function(data) {
          that.itemObj.attr(data);
          that.stepCates(that.itemObj);
        }).fail(function(error) {
          console.error(error);
        });
      },
      //android shrare
      '.toShareBtn1 click': function($element, event) {
        var ifHasIsId = can.route.attr('isTaskId');
        var taskId = can.route.attr('taskId');
        var url = 'http://' + window.location.hostname + window.location.pathname + '#!&' + $.param({
          taskId: taskId
        });
        if (ifHasIsId != 'isTaskId') {
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            window.location.href = "http://m.sfht.com/login.html?from=" + window.encodeURIComponent(url);
            return false;
          }
        }
        var version = can.route.attr('version');
        version = version ? version  : '1.4.0';
        var verArr = version.split('.');
        var verInt = verArr[0] + verArr[1] + verArr[2];
        if(SFFn.isMobile.APP()){
          if (SFFn.isMobile.iOS() && verInt >= 140 ) {
            // $('.welFare-mask').show();
            // $('.welFareShare').addClass('animationTop');
            this.iosBridge();
          }else if(SFFn.isMobile.iOS() && verInt < 140 ){
            setTimeout(function() {
              var message = new SFmessage(null, {
                'tip': '当前版本不支持该活动，请下载新版本',
                'type': 'success',
                'okFunction': function() {
                    window.location.href = "https://itunes.apple.com/us/app/hai-tao-fa-xian/id983956499?mt=8";
                },
              });
              $('#ok').addClass('addWelFareBtn').text('马上下载');
            }, 300);
          };

          if (SFFn.isMobile.Android() && verInt >= 135 ) {
            $('.welFare-mask').show();
            $('.welFareShare').addClass('animationTop');
          }else if(SFFn.isMobile.Android() && verInt < 135 ){
            setTimeout(function() {
              var message = new SFmessage(null, {
                'tip': '当前版本不支持该活动，请下载新版本',
                'type': 'success',
                'okFunction': function() {},
              });
              $('#ok').addClass('addWelFareBtn');
            }, 300);
          };

        }
      },

      iosBridge: function(){
        var taskId = can.route.attr('taskId');
        var url = 'http://' + window.location.hostname + window.location.pathname + '#!&' + $.param({
          taskId: taskId
        });
        var pic = $('.imageBig').attr('data-samllPic');
        var subject = $('.imageBig').attr('data-subject');
        var desc = $('.imageBig').attr('data-desc');
        var urlId = url + '&isTaskId=isTaskId';
        var params = {
          "subject": subject,
          "description": desc,
          "imageUrl": pic,
          "url": urlId
        };
        var success = function(data) {
          setTimeout(function() {
            var message = new SFmessage(null, {
              'tip': data.text,
              'type': 'success',
              'okFunction': function() {
                if (data.buttonLink) {
                  window.location.href = data.buttonLink;
                }
              },
            });
            $('#messagedialog').addClass('addWelFareStyle');
            if (data.buttonText) {
              $('#ok').text(data.buttonText);
            }
          }, 300);
        };
        var error = function(data) {
          console.log('data.error');
        };
        window.bridge.run('SocialSharing', 'share', params, success, error);
      },

      '.shareViaWechat click': function($element, event) {
        var taskId = can.route.attr('taskId');
        var url = 'http://' + window.location.hostname + window.location.pathname + '#!&' + $.param({
          taskId: taskId
        });
        var pic = $('.imageBig').attr('data-samllPic');
        var subject = $('.imageBig').attr('data-subject');
        var desc = $('.imageBig').attr('data-desc');
        var urlId = url + '&isTaskId=isTaskId';
        var params = [{
          "subject": subject,
          "description": desc,
          "imageUrl": pic,
          "url": urlId
        },1];
        var success = function(data) {
          var b = data[0];
          $('.welFare-mask').hide();
          $('.welFareShare').removeClass('animationTop');
          setTimeout(function() {
            var message = new SFmessage(null, {
              'tip': b.text,
              'type': 'success',
              'okFunction': function() {
                if (b.buttonLink) {
                  window.location.href = b.buttonLink;
                }
              },
            });
            $('#messagedialog').addClass('addWelFareStyle');
            if (b.buttonText) {
              $('#ok').text(b.buttonText);
            }
          }, 300);
        };
        var error = function(data) {
          $('.welFare-mask').hide();
          $('.welFareShare').removeClass('animationTop');
          console.log('data.error');
        };
        window.bridge.run('SocialSharing', 'shareViaWechat', params, success, error);
      },

      '.welFare-mask click': function($element ,event){
        $('.welFare-mask').hide();
        $('.welFareShare').removeClass('animationTop');
      },

      '.toShareBtn2 click': function($element, event) {
        event && event.preventDefault();
        var itemId = $('.imageBig').attr('data-itemId');
        var url = 'http://' + window.location.hostname + '/detail/' + itemId + '.html';
        var couponId = can.route.attr('couponId');
        var mobile = $('.mobileNum').val();
        var that = this;
        if (!/^1[0-9]{10}$/.test(mobile)) {
          var message = new SFmessage(null, {
            'tip': '你填写的手机号格式有误,请重新填写',
            'type': 'success',
            'okFunction': function() {},
          });
        } else {
          var rcvCouponByMobile = new SFReceiveCoupon({
            bagId: couponId,
            mobile: mobile,
            type: "CARD",
            receiveChannel: 'B2C_H5',
            receiveWay: 'FLS'
          });
          rcvCouponByMobile.sendRequest()
            .done(function(data) {
              console.log(data);
              var getImage = '<img class="stepImage" src="http://img0.sfht.com/img/af94081093b7e45b80fa1628b6bbcb10.jpg">'
              if (data.cardInfo.status == 'UNUSED') {
                var reduceCost = data.cardInfo.reduceCost / 100;
                setTimeout(function() {
                  var message = new SFmessage(null, {
                    'tip': '<p class="couponTitle">恭喜你获得' + reduceCost + '元' + data.cardInfo.title + '</p><p class="couponDate">有效期：' + moment(data.cardInfo.startTime).format('YYYY:MM:DD') + '-' + moment(data.cardInfo.endTime).format('YYYY:MM:DD') + '</p>',
                    'type': 'success',
                    'okFunction': function() {
                      window.location.href = url;
                    },
                  });
                  $('#messagedialog').addClass('addWelFareStyle');
                  $(getImage).insertBefore('.addWelFareStyle .center h2');
                  $('#ok').addClass('addWelFareBtn').text('用掉它');
                }, 300);
              } else {
                setTimeout(function() {
                  var message = new SFmessage(null, {
                    'tip': '你未能领取成功',
                    'type': 'success',
                    'okFunction': function() {},
                  });
                  $('#ok').addClass('addWelFareBtn');
                }, 300);
              }
            })
            .fail(function(errorCode) {
              if (_.isNumber(errorCode)) {
                var codeMap = {
                  '11000020': '卡券id不存在',
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
      },

      '.welFareToRule click':function($element , event){
        var taskId = can.route.attr('taskId');
        var url = "http://m.sfht.com/welfare-rule.html#!&"+$.param({
          taskId: taskId
        });
        window.location.href = url;
      }

    });
    new welfareDetails('body');
  });