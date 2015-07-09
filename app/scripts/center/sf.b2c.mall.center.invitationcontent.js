'use strict';

define('sf.b2c.mall.center.invitationcontent', [
    'can',
    'zepto',
    'zepto.cookie',
    'fastclick',
    'sf.helpers',
    'sf.util',
    'moment',
    'sf.weixin',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.user.getUserInfo',
    'text!template_center_invitationcontent',
    'chart',
    'sf.b2c.mall.api.user.getCashActInfo',
    'sf.b2c.mall.api.user.getCashActTransList',
    'sf.b2c.mall.api.user.rqCash',
    'sf.hybrid'
  ],
  function(can, $, cookie, Fastclick, helpers, SFFn, moment, SFWeixin, SFMessage, SFConfig, SFGetUserInfo, template_center_invitationcontent, chart, SFGetCashActInfo, SFGetCashActTransList, SFRqCash, SFHybrid) {

    Fastclick.attach(document.body);

    var bagid = "286";
    var userid = null;

    return can.Control.extend({

      helpers: {

        isWeChatOrApp: function(options) {
          if (SFFn.isMobile.WeChat() || SFFn.isMobile.APP()) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        isNegative: function(income, options) {
          if (parseInt(income, 10) < 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        hasBindAccount: function(bindAliAct, options) {
          if (bindAliAct != "" && bindAliAct != null) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        hasIncome: function(infoList, options) {
          if (infoList && infoList.length > 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

      init: function(element, options) {

        var that = this;

        var getUserInfo = new SFGetUserInfo();
        getUserInfo
          .sendRequest()
          .done(function(data) {
            userid = data.userId;
            SFWeixin.shareInvitation("［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", "［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？", bagid, userid);
          })
          .fail()

        this.render();
      },

      render: function() {
        this.data = {};
        var that = this;

        var getCashActInfo = new SFGetCashActInfo();
        var getCashActTransList = new SFGetCashActTransList({
          "pgIndex": 0,
          "pgSize": 100
        });

        can.when(getCashActInfo.sendRequest(), getCashActTransList.sendRequest())
          .done(function(mainInfo, infoList) {

            // var infoList = {
            //   "infos": [{
            //     "income": 3000,
            //     "reason": "abc",
            //     "gmtOrder": "2015-05-15 14:43:42",
            //     "gmtCreate": "2015-05-15 14:43:42"
            //   }, {
            //     "income": 5000,
            //     "reason": "abc",
            //     "gmtOrder": "2015-05-16 14:43:42",
            //     "gmtCreate": "2015-05-16 14:43:42"
            //   }, {
            //     "income": -1000,
            //     "reason": "abc",
            //     "gmtOrder": "2015-05-16 14:43:42",
            //     "gmtCreate": "2015-05-16 14:43:42"
            //   }]
            // }

            that.data = _.extend(that.data, mainInfo);
            that.data.infoList = infoList.infos;
            var renderFn = can.mustache(template_center_invitationcontent);
            that.options.html = renderFn(that.data, that.helpers);
            that.element.html(that.options.html);
            that.supplement();
          })
          .fail(function(error) {
            console.error(error);
          })
      },

      supplement: function() {
        if (this.data.infoList && this.data.infoList.length > 0) {
          this.renderChart();
        }
      },

      renderChart: function() {
        var labels = [];
        var data = [];

        var dataMap = {};
        // 按天进行统计
        _.each(this.data.infoList, function(item) {
          if (item.income > 0) {
            item.gmtCreate = moment(item.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
            var month = parseInt(item.gmtCreate.substring(5, 7), 10);
            var day = item.gmtCreate.substring(8, 10);
            var label = month + "月" + day + "日";

            if (dataMap[label]) {
              dataMap[label] = dataMap[label] + item.income / 100
            } else {
              dataMap[label] = item.income / 100
            }
          }
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

      '#modifyaccount click': function(element, event) {
        window.location.href = "http://m.sfht.com/bindalipay.html?from=" + escape(window.location.href);
      },

      '#getmoney click': function(element, event) {
        var that = this;

        if (!this.data.bindAliAct) {
          window.location.href = "http://m.sfht.com/bindalipay.html?from=" + escape(window.location.href);
        } else {
          if (this.data.actBalance < 5000) {
            var message = new SFMessage(null, {
              'tip': '您的账户余额少于50元，无法提现！',
              'type': 'error'
            });
          } else {
            var rqCash = new SFRqCash();
            rqCash.sendRequest()
              .done(function(data) {
                if (data.value) {
                  var message = new SFMessage(null, {
                    'tip': '提现成功！',
                    'type': 'success',
                    'okFunction': _.bind(function() {
                      window.location.reload();
                    })
                  });
                }
              })
              .fail(function(error) {
                console.error(error);
                var message = new SFMessage(null, {
                  'tip': that.errorMap[error] || '提现失败！',
                  'type': 'error'
                });
              })
          }
        }
      },

      "#viewrule click": function(element, event) {
        event && event.preventDefault();
        $(".m-dialog").show();
      },

      ".close click": function(element, event) {
        event && event.preventDefault();
        $(".m-dialog").hide();
      },

      '.m-dialog click': function(element, event) {
        event && event.preventDefault();
        $(".m-dialog").hide();
      },

      "#switchwiew click": function(element, event) {
        $('.invite-account-b').toggleClass('active');
      },

      "#sharebutton click": function(element, event) {
        if (SFFn.isMobile.APP()) {
          var title = '［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？';
          var desp = '［运气爆棚］他抢到了1000元现金红包，看看你的手气呢？';
          var shareUrl = "http://m.sfht.com/invitation-bag.html?_src=" + userid + "&bagid=" + bagid;
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';

          SFHybrid.h5share(title, desp, imgUrl, shareUrl);
        } else {
          $("body,html").scrollTop(0);
          $("#sharearea").show();
        }
      },

      "#sharearea click": function() {
        $("#sharearea").hide();
      },

      errorMap: {
        1000420: '尚未绑定支付宝账户',
        1000430: '未达到提现金额限制',
        1000450: '请耐心等待，目前小章鱼正在整理上一天的提现哟，目前暂停提现预计2:00恢复，为了您的身体着想睡饱了再来提现吧：）'
      },

      '#gotohome click': function() {
        window.location.href = "http://www.sfht.com";
      }

    });
  })