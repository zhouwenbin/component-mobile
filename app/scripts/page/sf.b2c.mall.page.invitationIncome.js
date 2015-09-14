'use strict';

define(
  'sf.b2c.mall.page.invitationIncome', [
    'can',
    'zepto',
    'fastclick',
    'sf.util',
    'sf.helpers',
    'sf.b2c.mall.framework.comm',
    'text!template_center_invitationIncome',
    'sf.b2c.mall.api.user.getCashActTransList',
    'sf.b2c.mall.api.user.getLatestCashProfit',
    'moment',
    'chart',
    "sf.bridge",
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.module.header',
    'sf.weixin',
    'zepto.cookie',
  ],

  function(can, $, Fastclick, SFFn, helpers, SFFrameworkComm, template_center_invitationIncome, SFgetCashActTransList, SFgetLatestCashProfit, moment, chart, SFbridge, SFmessage, SFLoading, SFheader, SFweixin, $cookie ) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);
    var loadingCtrl = new SFLoading();
    var pgIndex = 1;
    var myInvitationIncome = can.Control.extend({
       helpers: {
        // 'sf-time': function(time, options) {
        //   return moment(time).format('YYYY-MM-DD');
        // },

        isIncome: function(income, options) {
          var income = parseInt(income());
          if (income > 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.options.hasHeight = [];
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = window.location.href;
          window.location.href = 'http://' + window.location.hostname + '/login.html?from=' + window.encodeURIComponent(url);
          return false;
        }
        this.render();

      },

      render: function() {
        var that = this;
        loadingCtrl.show();
        if (SFFn.isMobile.WeChat()) {
          var _ruser = $.fn.cookie('userId') || null;
          var url = 'http://' + window.location.hostname + '/invitation-bag.html?' + $.param({
            _ruser: _ruser
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail('顺丰海淘给新人撒红包了，用来买国外好货，不拿白不拿', '顺丰海淘为了拉客也是拼了，买海外商品比国内商品还便宜', url, imgUrl);
        }
        var getCashActTransList = new SFgetCashActTransList({
          pgIndex: 1,
          pgSize: 20
        });
        can.when(getCashActTransList.sendRequest()).done(function(infoList) {
          that.itemObj.infoList = infoList.infos;
          that.inToAccount(infoList);
          if(infoList.totalCount < 20){
            $('.getMoreAccount').hide();
          }
        }).fail(function(error) {
          console.error(error);
        }).then(function() {
          $('.invite-account-b').hide();
        })
      },

      inToAccount: function(data) {
        this.options.data = new can.Map(data);
        this.options.data.attr({
          pgIndex: 1,
          pgSize: 20
        });
        var renderFn = can.view.mustache(template_center_invitationIncome);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);
        // this.initLoadDataEvent();
        loadingCtrl.hide();
      },

      '.getMoreAccount click': function() {
        var that = this;
        that.loadingData()
      },
      // initLoadDataEvent: function() {
      //   var that = this;
      //   var renderData = this.options.data;
      //   //节流阀
      //   var loadingDatas = function() {
      //     if (pgIndex * renderData.pgSize > renderData.totalCount) {
      //       return;
      //     }
      //     var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
      //     var windowHeight = $(window).height(); //窗口的高度
      //     var dbHiht = $(".sf-b2c-mall-invitationIncome").height(); //整个页面文件的高度

      //     if ((windowHeight + srollPos + 200) >= (dbHiht)) {
      //       that.loadingData();
      //     }
      //   };

      //   $(window).scroll(_.throttle(loadingDatas, 200));
      // },

      loadingData: function(params) {
        loadingCtrl.show();
        var that = this;
        pgIndex = pgIndex + 1;
        var getCashActTransList = new SFgetCashActTransList({
          pgIndex: pgIndex,
          pgSize: 20
        });
        can.when(getCashActTransList.sendRequest()).done(function(data) {
          //console.log(infoList.infos);
          if(data.totalCount < pgIndex*20 || pgIndex*20 == data.totalCount){
            $('.getMoreAccount').hide();
          }
           _.each(data.infos, function(item) {
            that.options.data.infos.push(item);
          });
        }).fail(function(error) {
          console.error(error);
        }).always(function(){
          loadingCtrl.hide();
        })
      },

      supplement: function() {
        if (this.itemObj.infoList && this.itemObj.infoList.length > 0) {
          this.renderChart();
        } else {
          $('#canvas').hide();
          $('#noAnyserven').show();
        }
      },

      renderChart: function() {
        var that = this;
        var labels = [];
        var data = [];
        var dataMap = {};

        //var hasHeight = [];
        var getLatestCashProfit = new SFgetLatestCashProfit({days:7});
        can.when(getLatestCashProfit.sendRequest()).done(function(items) {
             that.itemObj.attr('cashProfits',items.cashProfits);
          }).fail(function(error) {
          console.error(error);
        });


        var timevs = setInterval(function(){

          if (that.options.hasHeight.length){
            if ( that.options.hasHeight[that.options.hasHeight.length-1].scale.endPoint > 0 ){
              clearInterval(timevs);
              return;
            }
          }

          _.each(that.itemObj.attr('cashProfits'), function(item) {
              item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
              var month = parseInt(item.date.substring(5, 7), 10);
              var day = item.date.substring(8, 10);
              if (month < 10) {
                month = '0' + month;
              }
              var label = month + '.' + day;
              dataMap[label] = item.cashProfit / 100
          });
           _.map(dataMap, function(num, key) {
            labels.push(key);
            data.push(num);
          });

          var lineChartData = {
            labels: labels,
            datasets: [{
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: data
            }]
          }
          var ctx = document.getElementById("canvas").getContext("2d");
          window.myLine = new Chart(ctx).Line(lineChartData, {
            responsive: true
          });
          that.options.hasHeight.push(window.myLine);
        },1000);

      },

      '#tabMyIncome click': function(element, event) {
        pgIndex = 1;
        var that = this;
        var liArray = $('.partner-income-box li');
        if (element.hasClass('serverDay')) {
          element.removeClass('serverDay').text('切换至近7日收益');
          $('#incomeDetitle').text('收益明细');
          $('.partner-income-box').show();
          $('.invite-account-b').css('display', 'none');
          window.myLine = null;
        } else {
          element.addClass('serverDay').text('切换至收益明细');
          $('#incomeDetitle').text('近7日收益'); 
          $('.invite-account-b').css('display', 'block');
          $('.partner-income-box').hide();
          if (that.options.hasHeight.length){
            if ( that.options.hasHeight[that.options.hasHeight.length-1].scale.endPoint > 0 ){
              return;
            }
          }
          that.supplement();
        }
      },

      serverDay: function(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
          if (mon > 1) {
            mon = mon - 1;
          } else {
            year = year - 1;
            mon = 12;
          }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        var s = (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
      },

      sfBridge: function() {
        var url = 'http://' + window.location.hostname + '/invitation-bag.html';
        var params = {
          "subject": '顺丰海淘给新人撒红包了，用来买国外好货，不拿白不拿',
          "description": '顺丰海淘给新人撒红包了，用来买国外好货，不拿白不拿',
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

      isToShareFn: function(element, event) {
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

      '#toAskfriend1 click': function(element, event) {
        this.isToShareFn();
      },

      '#toAskfriend2 click': function(element, event) {
        this.isToShareFn();
      },

    });
    new myInvitationIncome('.sf-b2c-mall-invitationIncome');
  });