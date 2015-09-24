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
    'sf.env.switcher',
    'sf.weixin'
  ],

  function($, can, _, store, moment, SFFrameworkComm, SFCouponIsProCardRcved, SFCouponRandomRcvCard, SFB2cMallGetItemInfo, SFHeader, SFBridge, SFSwitcher, SFWeixin) {
    SFFrameworkComm.register(3);

    var NO_CHANCE = '今天已经没有机会了，明天再来';
    var LIMIT_TIME = 3;
    var ACTIVITY_NAME = '刮刮乐';

    var SFPage = can.Control.extend({

      /**
       * 初始化动作
       */
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
          this.setRightBtnShareFn();
          this.setUI();
        }else{
          window.location.href = '/login.html?from='+encodeURIComponent(window.location.href);
        }
      },

      /**
       * 获取用户已经刮了的次数
       * @return {int} 次数
       */
      getUserTimes: function () {
        var userId = $.fn.cookie('userId');
        return store.get(moment(Date.now()).format('YYYY_MM_DD_')+userId + '_times') || 0;
      },

      /**
       * 设置用户已经刮过的次数
       * @param {int} times 次数
       */
      setUserTimes: function (times) {
        var userId = $.fn.cookie('userId');
        store.set(moment(Date.now()).format('YYYY_MM_DD_')+userId + '_times', times);
      },

      /**
       * 设置初始化UI
       */
      setUI: function () {
        this.times = this.getUserTimes();
        var times = LIMIT_TIME - this.getUserTimes();
        if (times > 0) {
          this.result = this.setResultImage('noresult');
          $('.scrape-num').text(times);
        }else{
          $('.scrape-times-inner').text(NO_CHANCE);
          $('canvas').hide();
          this.result = this.setResultImage('nochange');
        }
      },

      /**
       * 从customUrl中获取商品ItemID
       * @param  {String} url customUrl
       * @return {String}     ItemID
       */
      getItemid: function (url) {
        var pathname = url;
        var pathArr = /\d+/g.exec(pathname);

        if (typeof pathArr != 'undefined' && null != pathArr && pathArr.length > 0) {
          return pathArr[0];
        } else {
          return;
        }
      },

      /**
       * 在APP中设置用户ID
       */
      setUserIdInApp: function () {
        var _aid = $.fn.cookie('_aid') || '3';

        var cookieInfo = can.route.attr('cookieInfo');
        if (cookieInfo) {
          var arr = cookieInfo.split(',')

          $.fn.cookie(_aid + '_uinfo', cookieInfo);
          $.fn.cookie('userId', arr[3]);
        }
      },

      /**
       * @todo 设置在APP右上角的分享按钮，还未使用
       */
      setRightBtnShareFn: function () {

        var params = {
          "subject":  '每天刮一刮，每天拿个奖，每天心情乐一乐',
          "description": '每天刮一刮，每天拿个奖，每天心情乐一乐',
          "imageUrl": 'http://img0.sfht.com/cmsres/20150924/f2eedb82-7489-4e4f-8318-c45afee10a1d.png',
          "url": window.location.host + window.location.pathname
        };

        var empty = function(){};

        var shareInApp = function () {
          window.bridge.run('SocialSharing', 'share', params, empty, empty);
        };

        var shareInWeixin = function () {
          SFWeixin.shareDetail(params.subject, params.description, params.url, params.imageUrl, empty);
        }

        // 设置在app和微信中的分享
        var switcher = new SFSwitcher();

        switcher.register('app', function () {
          window.bridge.run('SFNavigation', 'setRightButton', '分享', shareInApp, empty);
        });

        switcher.register('web', empty);

        switcher.register('wechat', shareInWeixin);

        switcher.go();
      },

      /**
       * 根据不同的状态设置不同的结果页面
       * @param {String} key 状态
       */
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

              if (params.itemid) {
                this.requestHotData(params.itemid).done(_.bind(paintProductCoupon, this));
              }else{
                paintCoupon()
              }
            }

            var anotherRequest = function () {
              return this.requestHotData(params.itemid);
            }

            var paintProductCoupon = function (data) {
              params.imgUrl = data.skuInfo.images[0].thumbImgUrl;
              params.ptitle = data.skuInfo.title;

              var templateText = '<div class="scrape-goods"><div class="scrape-goods-c1"><img src="{{imgUrl}}"></div><div class="scrape-goods-c2"><p class="scrape-ticket-goods">{{ptitle}}</p><p class="scrape-ticket">{{title}}</p><p class ="scrape-ticket-times">有效期{{startTime}}至{{endTime}}</p></div></div><div class="scrape-btn-box"><a href="{{url}}" class="btn">马上使用</a></div>';
              var render = can.view.mustache(templateText);

              $('#noresult').remove();
              $('.scrape-box').append(render(params)).addClass('scrape-ticket-box');
            }

            var paintCoupon = function () {
              var templateText = '<div class="scrape-gift" style="text-align: center;"><h2 class="scrape-ticket">{{title}}</h2><p class="scrape-ticket-tips">*部分特价商品除外</p><p class="scrape-ticket-times">有效期{{startTime}}至{{endTime}}</p></div><div class="scrape-btn-box"><a href="/index.html" class="btn">马上使用</a></div>';
              var render = can.view.mustache(templateText);

              $('#noresult').remove();
              $('.scrape-box').append(render(params))
            };

            this.requestGetUserPrice()
              .done(_.bind(success, this))

            return 'success';
          },

          'fail': function () {
            $('#noresult').remove();
            if ($('.scrape-box .scrape-ticket-none-bg').length == 0 ) {
              $('.scrape-box').append('<div class="scrape-ticket-none-bg"><span class="icon center"></span></div><div class="scrape-ticket-alert">运气不佳，再刮一次</div><div class="scrape-btn-box"><a href="javascript:window.location.reload(true)" class="btn">再刮一次</a></div>').addClass('scrape-ticket-none')
            }
            return 'fail';
          },

          'nochange': function () {
            $('#noresult').remove();
            if ($('.scrape-box .scrape-ticket-none-bg').length == 0 ) {
              $('.scrape-box').append('<div class="scrape-ticket-none-bg"><span class="icon center"></span></div><div class="scrape-ticket-alert">今天机会已用完，明天不见不散～</div><div class="scrape-btn-box"><a href="/index.html" class="btn">返回首页</a></div>').addClass('scrape-ticket-none')
            }
            return 'nochange';
          },

          'noresult': function () {
            $('#noresult').remove();
            if ($('.scrape-box')) {
              $('.scrape-box').append('<div id="noresult"><div class="scrape-ticket-none-bg"><h2 style="text-align: center;font-size: 50px;padding: 40px 0;">系统开小差了...</h2></div><div class="scrape-btn-box"><a href="javascript:window.location.reload(true)" class="btn">再刮一次</a></div></div>')
            }
            return 'noresult';
          }
        }

        var fn = map[key];

        if (_.isFunction(fn)) {
          return fn.call(this);
        }

      },

      /**
       * 设置刮刮乐的结果
       */
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

      /**
       * 三次中保证用户可以有一次中奖，并进行随机算法
       * @param  {Boolean} isGetPrice 用户是否已经获奖
       * @return {Boolean}            是否给用户发优惠券
       */
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
       * @todo  ［ajax]更新.scrape-winner-list下用户获奖信息
       */
      requestUserListForPrice: function () {
        // 更新.scrape-winner-list下用户获奖信息
        // 后台没有接口取消
      },

      /**
       * [ajax]请求商品券的商品信息
       * @param  {int} itemid 商品id
       */
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
       * @todo  [ajax]获取用户是否获奖的信息
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

      /**
       * [ajax]获取用户当前活动的优惠券
       */
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

      /**
       * 用户开始刮之前做好准备工作，初始化canvas，设置canvas覆盖在结果面板之上
       */
      prepare: function() {
        var startlock = true;

        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');

        var width = $('.scrape-box').width();
        var height = $('.scrape-box').height();

        ctx.fillStyle = 'transparent';

        // 原计划是实用图片覆盖在上面，由于在使用中出现透视问题，暂时取消绘制图片
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