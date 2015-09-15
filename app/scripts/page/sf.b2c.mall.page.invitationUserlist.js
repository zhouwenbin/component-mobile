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
    'sf.helpers'
  ],

  function(can, $, Fastclick, $cookie, SFFn, SFFrameworkComm, template_center_invitationUserlist, SFgetRegstedList, moment, SFbridge, SFmessage, SFgetRegstedCount, SFLoading, SFheader, SFweixin, helpers) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    var loadingCtrl = new SFLoading();
    var pgIndex = 1;
    var totleALL,totleOther;
    var myInvitationUserlist = can.Control.extend({
      helpers: {
        // 'sf-time': function(time) {
        //   return moment(time).format('YYYY-MM-DD');
        // },
        'finishStatus': function(options) {
          var status = can.route.attr('status');
          if (status == 'UNFINISH') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
      },

      //itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = window.location.href;
          window.location.href = 'http://' + window.location.hostname + '/login.html?from=' + window.encodeURIComponent(url);
          return false;
        }
        this.render();
      },

      render: function() {

        loadingCtrl.hide();
        var that = this;
        if (SFFn.isMobile.WeChat()) {
          var _ruser = $.fn.cookie('userId') || null;
          var url = 'http://' + window.location.hostname + '/invitation-bag.html?' + $.param({
            _ruser: _ruser
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail('顺丰海淘给新人撒红包了，用来买国外好货，不拿白不拿', '顺丰海淘给新人派送20元红包，用来买国外好物，不拿白不拿', url, imgUrl);
        }
        var status = can.route.attr('status') || 'UNFINISH';
        var getRegstedList = new SFgetRegstedList({
          status: status,
          pgIndex: 1,
          pgSize: 20
        });
        getRegstedList.sendRequest()
          .done(function(data) {
            // totleOther =  data.totalCount;
            that.inToAccount(data);
            if(data.totalCount < 20){
              $('.getMoreAccount').hide();
            }
            if (status == 'UNFINISH' && data.totalCount == 0) {
              $('#partner-tips-box').hide();
              $('#partner-user-box').css('margin-top', '0');
            }
            // if(!$('partner-tab li').hasClass('active')){
            //   var totleLast = totleALL - totleOther
            //     $(this).text(totleLast)
            // }
          }).then(function() {
          that.loadSupplement(status);
        });
      },

      inToAccount: function(data) {
        this.options.data = new can.Map(data);
        this.options.data.attr({
          pgIndex: 1,
          pgSize: 20
        });
        var renderFn = can.view.mustache(template_center_invitationUserlist);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);
        var getRegstedCount = new SFgetRegstedCount();
        can.when(getRegstedCount.sendRequest()).done(function(data) {
          //totleALL = data.value;
          if (data.value) {
            $('#isHasaccount').show();
            $('#noHasaccount').hide();
          } else {
            $('#isHasaccount').hide();
            $('#noHasaccount').show();
          }
        }).fail(function(error) {
          console.error(error);
        });
        // this.initLoadDataEvent();
        loadingCtrl.hide();
      },

      '.getMoreAccount click': function() {
        var that = this;
        that.loadingData()
        // var renderData = this.options.data;
        // //节流阀
        // var loadingDatas = function() {
        //   if (pgIndex * renderData.pgSize > renderData.totalCount) {
        //     return;
        //   }
        //   var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
        //   var windowHeight = $(window).height(); //窗口的高度
        //   var dbHiht = $(".sf-b2c-mall-invitationUserlist").height(); //整个页面文件的高度

        //   if ((windowHeight + srollPos + 200) >= (dbHiht)) {

        //     that.loadingData();
        //   }
        // };

        //$(window).scroll(_.throttle(loadingDatas, 200));
        // setTimeout(function(){
        //   $(window).scroll(_.throttle(loadingDatas, 200));
        // },300);
      },

      loadingData: function(params) {
        loadingCtrl.show();
        var that = this;
        var status = can.route.attr('status') || 'UNFINISH';
        pgIndex = pgIndex + 1
        var getRegstedList = new SFgetRegstedList({
          status: status,
          pgIndex: pgIndex,
          pgSize: 20
        });
        can.when(getRegstedList.sendRequest()).done(function(data) {
          _.each(data.infos, function(item) {
            that.options.data.infos.push(item);
          });

          // that.options.data.attr("page", data.page);
          // that.itemObj.attr(data);
          // that.inToAccount(that.itemObj);
          // that.inToAccount(data);
          if(data.totalCount < pgIndex*20 || pgIndex*20 == data.totalCount){
            $('.getMoreAccount').hide();
          }
          if (status == 'UNFINISH' && data.totalCount == 0) {
            $('#partner-tips-box').hide();
            $('#partner-user-box').css('margin-top', '0');
          }
        }).fail(function(error) {
          console.error(error);
        }).always(function(){
          loadingCtrl.hide();
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
        pgIndex = 1;
        var status = can.route.attr('status');
        can.route.attr({
          status: 'UNFINISH'
        })
      },

      '#finishedList click': function(element, event) {
        pgIndex = 1;
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
          "subject": '顺丰海淘给新人撒红包了，用来买国外好货，不拿白不拿',
          "description": '顺丰海淘为了拉客也是拼了，买海外商品比国内商品还便宜',
          "imageUrl": 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg',
          "url": url
        };
        var success = function(data) {
          // var message = new SFmessage(null, {
          //   'tip': '分享成功',
          //   'type': 'success',
          //   'okFunction': function() {},
          // });
          console.log('success');
        };
        var error = function(data) {
          // var message = new SFmessage(null, {
          //   'tip': '分享失败',
          //   'type': 'error',
          //   'okFunction': function() {},
          // });
          console.log('error');
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
        } else {
          window.location.href = 'http://' + window.location.hostname + '/invitationAskfd.html';
        }
      },


    });
    new myInvitationUserlist('.sf-b2c-mall-invitationUserlist');
  });