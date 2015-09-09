'use strict';

define(
  'sf.b2c.mall.page.invitationUserlist', [
    'can',
    'zepto',
    'fastclick',
    'zepto.cookie',
    'sf.util',
    'sf.b2c.mall.framework.comm',
    'text!template_center_invitationUserlist',
    'sf.b2c.mall.api.user.getRegstedList',
    'moment',
    "sf.bridge",
    'sf.b2c.mall.widget.message',
    "sf.b2c.mall.api.user.getRegstedCount",
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.module.header',
    'sf.weixin',
    'zepto.cookie',
  ],

  function(can, $, Fastclick, $cookie, SFFn, SFFrameworkComm, template_center_invitationUserlist, SFgetRegstedList, moment, SFbridge, SFmessage, SFgetRegstedCount, SFLoading ,SFheader , SFweixin, $cookie) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    var loadingCtrl = new SFLoading();
    var pgIndex = 0;
    var myInvitationUserlist = can.Control.extend({
      helpers: {
        'sf-time': function(time, options) {
          return moment(time).format('YYYY-MM-DD');
        },
        'finishStatus': function(options) {
          var status = can.route.attr('status');
          if (status == 'UNFINISH') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
      },

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = window.location.href;
          window.location.href = 'http://' + window.location.hostname + '/login.html?from=' + window.encodeURIComponent(url);
          return false;
        }

        if(SFFn.isMobile.WeChat()){
          var _ruser = $.fn.cookie('userId') || null;
          var url = 'http://' + window.location.hostname + '/invitation-bag.html#!&' + $.param({
            _ruser: _ruser
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFWeixin.shareDetail('顺丰海淘给新人派送20元红包，用来买国外好货，不拿白不拿', '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20', url, imgUrl);
        }

        this.render();
      },

      render: function() {
        this.request();
        this.loadingData();
        loadingCtrl.hide();
      },

      request: function(params) {
        loadingCtrl.show();
      },

      inToAccount: function(data) {
        var renderFn = can.view.mustache(template_center_invitationUserlist);
        var html = renderFn(data, this.helpers);
        this.element.html(html);
        loadingCtrl.hide();
        var getRegstedCount = new SFgetRegstedCount();
        can.when(getRegstedCount.sendRequest()).done(function(data) {
          if(data.value){
            $('#isHasaccount').show();
            $('#noHasaccount').hide();
          }else{
            $('#isHasaccount').hide();
            $('#noHasaccount').show();
          }
        }).fail(function(error) {
          console.error(error);
        });
      },

      loadingData: function(params) {
        var that = this;
        var status = can.route.attr('status') || 'UNFINISH';
        pgIndex++;
        var getRegstedList = new SFgetRegstedList({
          status: status,
          pgIndex: pgIndex,
          pgSize: 20
        });
        can.when(getRegstedList.sendRequest()).done(function(data) {
          // that.itemObj.attr(data);
          // that.inToAccount(that.itemObj);
          that.inToAccount(data);
          if (status == 'UNFINISH' && data.totalCount == 0) {
            $('#partner-tips-box').hide();
            $('#partner-user-box').css('margin-top', '0');
          }
        }).fail(function(error) {
          console.error(error);
        }).then(function() {
          that.loadSupplement(status);
        });
      },

      loadSupplement: function(status) {
        if (status == 'UNFINISH') {
          var getRegstedList = new SFgetRegstedList({
            status: 'FINISHED'
          });
          can.when(getRegstedList.sendRequest()).done(function(data) {
            var otherNum = data.totalCount;
            if ( !! otherNum) {
              $('#finishedList .total').html(otherNum);
            }
          }).fail(function(error) {
            console.error(error);
          });
        } else if (status == 'FINISHED') {
          var getRegstedList = new SFgetRegstedList({
            status: 'UNFINISH'
          });
          can.when(getRegstedList.sendRequest()).done(function(status) {
            var otherNum = status.totalCount;
            if (!otherNum) {
              $('#partner-tips-box').hide();
              $('#partner-user-box').css('margin-top', '0');
            } else {
              $('#unfinishList .total').html(otherNum);
            }
          }).fail(function(error) {
            console.error(error);
          });
        };
      },

      '#unfinishList click': function(element, event) {
        var status = can.route.attr('status');
        can.route.attr({
          status: 'UNFINISH'
        })
      },

      '#finishedList click': function(element, event) {
        var status = can.route.attr('status');
        can.route.attr({
          status: 'FINISHED'
        })
      },

      '#goTohome click': function(element, event) {
        window.location.href = 'http://' + window.location.hostname + '/';
      },

      sfBridge: function() {
        var url = 'http://' + window.location.hostname + '/invitation-bag.html';
        var params = {
          "subject": '顺丰海淘给新人派送20元红包，用来买国外好物，不拿白不拿',
          "description": '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20',
          "imageUrl": 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg',
          "url": url
        };
        var success = function(data) {
          var message = new SFmessage(null, {
            'tip': '分享成功',
            'type': 'success',
            'okFunction': function() {},
          });
        };
        var error = function(data) {
          var message = new SFmessage(null, {
            'tip': '分享失败',
            'type': 'error',
            'okFunction': function() {},
          });
        };
        window.bridge.run('SocialSharing', 'share', params, success, error);
      },

      '#toAskfriend click': function(element, event) {
        var version = can.route.attr('version');
        version = version ? version : '1.4.0';
        var verArr = version.split('.');
        var verInt = verArr[0] + verArr[1] + verArr[2];
        if (SFFn.isMobile.APP()) {
          if (SFFn.isMobile.iOS() && verInt >= 140) {
            this.sfBridge();
          } else if (SFFn.isMobile.iOS() && verInt < 140) {
            var message = new SFmessage(null, {
              'tip': '当前版本不支持该活动，请下载新版本',
              'type': 'success',
              'okFunction': function() {}
            });
          };

          if (SFFn.isMobile.Android() && verInt >= 135) {
            this.sfBridge();
          } else if (SFFn.isMobile.Android() && verInt < 135) {
            var message = new SFmessage(null, {
              'tip': '当前版本不支持该活动，请下载新版本',
              'type': 'success',
              'okFunction': function() {},
            });
          };
        }else{
            window.location.href='http://' + window.location.hostname + '/invitationAskfd.html';
        }
      },


    });
    new myInvitationUserlist('.sf-b2c-mall-invitationUserlist');
  });