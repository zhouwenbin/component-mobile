'use strict';

define(
  'sf.b2c.mall.page.scrape',

  [
    'zepto',
    'can',
    'underscore',
    'store',
    'moment',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.coupon.isProCardRcved',
    'sf.b2c.mall.api.coupon.randomRcvCard',
    'sf.b2c.mall.api.b2cmall.getItemInfo',
    'sf.b2c.mall.module.header',
    'sf.bridge',
    'sf.env.switcher'
  ],

  function($, can, _, store, moment, SFFrameworkComm, SFCouponIsProCardRcved, SFCouponRandomRcvCard, SFB2cMallGetItemInfo, SFHeader, SFBridge, SFSwitcher) {
    SFFrameworkComm.register(3);

    var NO_CHANCE = '今天已经没有机会了，明天再来';
    var LIMIT_TIME = 3;
    var ACTIVITY_NAME = '刮刮乐';

    var SFPage = can.Control.extend({

      init: function() {

        var switcher = new SFSwitcher();

        var empty = function(){}
        switcher.register('app', function () {
          window.bridge.run('SFNavigation', 'disablePullRefresh', null, empty, empty);
        });

        switcher.register('web', empty);
        switcher.go();

        // 在app中设置UserId
        this.setUserIdInApp();

        this.requestUserListForPrice();

        this.prepare();

        if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          this.setUI();
        }else{
          window.location.href = '/login.html?from='+encodeURIComponent(window.location.href);
        }
      },

      getUserTimes: function () {
        var userId = $.fn.cookie('userId');
        return store.get(moment(Date.now()).format('YYYY_MM_DD_')+userId + '_times') || 0;
      },

      setUserTimes: function (times) {
        var userId = $.fn.cookie('userId');
        store.set(moment(Date.now()).format('YYYY_MM_DD_')+userId + '_times', times);
      },

      setUI: function () {
        this.times = this.getUserTimes();
        var times = LIMIT_TIME - this.getUserTimes();
        if (times > 0) {
          this.result = this.setResultImage('noresult');
          $('.scrape-num').text(times);
        }else{
          $('.scrape-times-inner').text(NO_CHANCE);
          this.result = this.setResultImage('nochange');
        }
      },

      getItemid: function (url) {
        var pathname = url;
        var pathArr = /\d+/g.exec(pathname);

        if (typeof pathArr != 'undefined' && null != pathArr && pathArr.length > 0) {
          return pathArr[0];
        } else {
          return;
        }
      },

      setUserIdInApp: function () {
        var _aid = $.fn.cookie('_aid') || '3';

        var cookieInfo = can.route.attr('cookieInfo');
        if (cookieInfo) {
          var arr = cookieInfo.split(',')

          $.fn.cookie(_aid + '_uinfo', cookieInfo);
          $.fn.cookie('userId', arr[3]);
        }
      },

      setResultImage: function (key) {
        var map = {
          'success': function () {

            var params = {};

            var success = function (data) {
              if (data && data.cardInfo) {
                params.startTime = moment(data.cardInfo.startTime).format('YYYY-MM-DD');
                params.endTime = moment(data.cardInfo.endTime).format('YYYY-MM-DD');
                params.title = data.cardInfo.title;
                params.url = data.cardInfo.customUrl;
                params.itemid = this.getItemid(data.cardInfo.customUrl);
              }
            }

            var anotherRequest = function () {
              return this.requestHotData(params.itemid);
            }

            var paint = function (data) {
              params.imgUrl = data.skuInfo.images[0].thumbImgUrl;
              params.ptitle = data.skuInfo.title;

              var templateText = '<div class="scrape-goods"><div class="scrape-goods-c1"><img src="{{imgUrl}}"></div><div class="scrape-goods-c2"><p class="scrape-ticket-goods">{{ptitle}}</p><p class="scrape-ticket">{{title}}</p><p class ="scrape-ticket-times">有效期{{startTime}}至{{endTime}}</p></div></div><div class="scrape-btn-box"><a href="{{url}}" class="btn">马上使用</a></div>';
              var render = can.view.mustache(templateText);

              $('#noresult').remove();
              $('.scrape-box').append(render(params))
            }

            this.requestGetUserPrice()
              .done(_.bind(success, this))
              .then(_.bind(anotherRequest, this))
              .done(_.bind(paint, this))

            return 'success';
          },

          'fail': function () {
            $('#noresult').remove();
            if ($('.scrape-box .scrape-ticket-none-bg').length == 0 ) {
              $('.scrape-box').append('<div class="scrape-ticket-none-bg"><span class="icon center"></span></div><div class="scrape-btn-box"><a href="javascript:window.location.reload(true)" class="btn">再刮一次</a></div>').addClass('scrape-ticket-none')
            }
            return 'fail';
          },

          'nochange': function () {
            $('#noresult').remove();
            if ($('.scrape-box .scrape-ticket-none-bg').length == 0 ) {
              $('.scrape-box').append('<div class="scrape-ticket-none-bg"><span class="icon center"></span></div><div class="scrape-btn-box"><a href="/index.html" class="btn">返回首页</a></div>').addClass('scrape-ticket-none')
            }
            return 'nochange';
          },

          'noresult': function () {
            $('#noresult').remove();
            if ($('.scrape-box')) {
              $('.scrape-box').append('<div id="noresult"><div class="scrape-ticket-none-bg"><h2 style="text-align: center;font-size: 50px;padding: 40px 0;">系统开小差了...</h2></div><div class="scrape-btn-box"><a href="javascript:window.location.reload(true)" class="btn">再刮一次</a></div></div>')
            }
            return 'nochange';
          }
        }

        var fn = map[key];

        if (_.isFunction(fn)) {
          return fn.call(this);
        }

      },

      setResult: function () {

        var success = function (data) {
          var isSetPrice = this.getPriceResult(data.value);
          this.result = isSetPrice ? this.setResultImage('success') :  this.setResultImage('fail');
        };

        var fail = function(){};

        this.requestIsUserGetPrice()
          .done(_.bind(success, this))
          .fail(fail)
      },

      getPriceResult: function (isGetPrice) {
        var time = this.times;
        if (isGetPrice) {
          return false;
        }else if (time == (LIMIT_TIME - 1) && !isGetPrice) {
          return true;
        }else{
          return Math.random() < 0.5;
        }
      },

      /**
       * @todo  更新.scrape-winner-list下用户获奖信息
       */
      requestUserListForPrice: function () {
        // 更新.scrape-winner-list下用户获奖信息
      },

      requestHotData: function (itemid) {
        var def = can.Deferred();

        var request = new SFB2cMallGetItemInfo({itemId: itemid});
        request.sendRequest()
          .done(function (data) {
            def.resolve(data);
          })
          .fail(function () {
            def.reject();
          })

        return def;
      },

      /**
       * @todo  获取用户是否获奖的信息
       */
      requestIsUserGetPrice: function () {
        // 获取用户是否获奖的信息,并且设置背后图片
        var def = can.Deferred();

        var request = new SFCouponIsProCardRcved({proName: ACTIVITY_NAME});
        request.sendRequest()
          .done(function (data) {
            def.resolve(data);
          })
          .fail(function () {
            def.reject();
          })

        return def;
      },

      requestGetUserPrice: function () {
        var def = can.Deferred();
        var request = new SFCouponRandomRcvCard({proName: ACTIVITY_NAME});
        request.sendRequest()
          .done(function (data) {
            def.resolve(data);
          })
          .fail(function () {
            def.reject();
          })

        return def;
      },

      prepare: function() {
        var startlock = true;

        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');

        var width = $('.scrape-box').width();
        var height = $('.scrape-box').height();

        ctx.fillStyle = 'transparent';

        var initialize = function() {
          ctx.fillStyle = '#DCDCDC';//'gray'
          ctx.fillRect(0, 0, width * 2, height * 2);

          var image = new Image()
          image.onload = function () {
            // 会出现透视问题
            // ctx.drawImage(image, (width - 244*2 - 30*2)/2, (height - 52*2 - 60 * 2)/2)
          }
          image.src = "http://img.sfht.com/sfhth5/1.1.363/img/scrape/sracpe-text.png"

          ctx.globalCompositeOperation = 'destination-out';
        }

        initialize();

        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;

        var mousedown = false;
        var starttime = null;

        function eventDown(e) {
          e.preventDefault();
          mousedown = true;

          if (startlock) {
            starttime = Date.now();
            startlock = !startlock;
            var times = this.times;
            this.setUserTimes(++times);
            this.setResult();

            setTimeout(function() {
              $('canvas').hide();
            }, 5000);
          }
        }

        function eventUp(e) {
          e.preventDefault();
          mousedown = false;
        }

        function eventMove(e) {
          e.preventDefault();

          if (mousedown) {

            var step = e.changedTouches[e.changedTouches.length - 1];
            var posx = step.pageX - 30;
            var posy = step.pageY - offsetY + 10;

            ctx.beginPath()
            ctx.arc(posx / 2, posy / 2, 15, 0, Math.PI * 2);
            ctx.fill();
          };
        }
        canvas.addEventListener('touchstart', _.bind(eventDown, this));
        canvas.addEventListener('touchend', _.bind(eventUp, this));
        canvas.addEventListener('touchmove', _.bind(eventMove, this));
      }
    });

    new SFPage('body');
  });