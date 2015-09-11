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
    'moment',
    'chart',
    "sf.bridge",
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.module.header',
    'sf.weixin',
    'zepto.cookie',
  ],

  function(can, $, Fastclick, SFFn, helpers, SFFrameworkComm, template_center_invitationIncome, SFgetCashActTransList, moment, chart, SFbridge, SFmessage, SFLoading, SFheader, SFweixin, $cookie ) {

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
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = window.location.href;
          window.location.href = 'http://' + window.location.hostname + '/login.html?from=' + window.encodeURIComponent(url);
          return false;
        }
        this.render();
      },

      render: function() {
        var that = this;
        loadingCtrl.hide();
        if (SFFn.isMobile.WeChat()) {
          var _ruser = $.fn.cookie('userId') || null;
          var url = 'http://' + window.location.hostname + '/invitation-bag.html?' + $.param({
            _ruser: _ruser
          });
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail('顺丰海淘给新人派送20元红包，用来买国外好货，不拿白不拿', '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20', url, imgUrl);
        }
        var getCashActTransList = new SFgetCashActTransList({
          pgIndex: 1,
          pgSize: 20
        });
        can.when(getCashActTransList.sendRequest()).done(function(infoList) {
          that.itemObj.infoList = infoList.infos;
          that.inToAccount(infoList);
          console.log(infoList);
        }).fail(function(error) {
          console.error(error);
        }).then(function() {
          that.supplement();
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
        loadingCtrl.hide();
        this.initLoadDataEvent();
      },

      initLoadDataEvent: function() {
        var that = this;
        var renderData = this.options.data;
        //节流阀
        var loadingDatas = function() {
          if (pgIndex * renderData.pgSize > renderData.totalCount) {
            return;
          }
          var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
          var windowHeight = $(window).height(); //窗口的高度
          var dbHiht = $(".sf-b2c-mall-invitationIncome").height(); //整个页面文件的高度

          if ((windowHeight + srollPos + 200) >= (dbHiht)) {

            that.loadingData();
          }
        };

        $(window).scroll(_.throttle(loadingDatas, 200));
      },

      loadingData: function(params) {
        var that = this;
        pgIndex = pgIndex + 1;
        var getCashActTransList = new SFgetCashActTransList({
          pgIndex: pgIndex,
          pgSize: 20
        });
        can.when(getCashActTransList.sendRequest()).done(function(data) {
          //console.log(infoList.infos);
           _.each(data.infos, function(item) {
            that.options.data.infos.push(item);
          });
        }).fail(function(error) {
          console.error(error);
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
        var labels = [];
        var data = [];
        var needDay = this.serverDay(7);
        var needDaySt = this.serverDay(7).split('-');
        var needDaySd = needDaySt[2];
        var needDaySm = needDaySt[1];
        var dataMap = {};
        var day1 = this.serverDay(0);
        var day2 = this.serverDay(1);
        var day3 = this.serverDay(2);
        var day4 = this.serverDay(3);
        var day5 = this.serverDay(4);
        var day6 = this.serverDay(5);
        var day7 = this.serverDay(6);
        // 按天进行统计
        _.each(this.itemObj.infoList, function(item) {
          // if (monthDay == day1 || monthDay == day2 || monthDay == day3 || monthDay == day4 || monthDay == day5 || monthDay == day6 || monthDay == day7) {
          if (item.income > 0) {
            if (item.gmtOrder) {
              var gmtCreate = moment(item.gmtOrder).format('YYYY-MM-DD HH:mm:ss');
            } else {
              var gmtCreate = moment(item.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
            }
            var month = parseInt(gmtCreate.substring(5, 7), 10);
            var day = gmtCreate.substring(8, 10);
            if (month < 10) {
              month = '0' + month;
            }
            var monthDay = month + '-' + day;
            var label = month + '.' + day;
            if (monthDay == day1 || monthDay == day2 || monthDay == day3 || monthDay == day4 || monthDay == day5 || monthDay == day6 || monthDay == day7) {
              if (dataMap[label]) {
                dataMap[label] = dataMap[label] + item.income / 100;
              } else {
                dataMap[label] = item.income / 100
              }
            }
            // else if(monthDay != day1 || monthDay != day2 || monthDay != day3 || monthDay != day4 || monthDay != day5 || monthDay != day6 || monthDay != day7){
            //   $('#canvas').hide();
            //   $('#noAnyserven').show();
            // }
          }
          // } else {
          //   $('#canvas').hide();
          //   $('#noAnyserven').show();
          // }
        })

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
      },

      '#tabMyIncome click': function(element, event) {
        var liArray = $('.partner-income-box li');
        if (element.hasClass('serverDay')) {
          element.removeClass('serverDay').text('切换至近7日收益');
          $('#incomeDetitle').text('收益明细');
          $('.partner-income-box').show();
          $('.invite-account-b').hide();
        } else {
          element.addClass('serverDay').text('切换至收益明细');
          $('#incomeDetitle').text('近7日收益');
          $('.invite-account-b').show();
          $('.partner-income-box').hide();
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
          "subject": '顺丰海淘给新人派送20元红包，用来买国外好货，不拿白不拿',
          "description": '顺丰海淘为了拉客也是拼了，这个20元的新人红包很给力，满100立减20',
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