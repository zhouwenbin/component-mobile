'use strict';

define(
  'sf.b2c.mall.page.scrape',

  [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.framework.comm'
  ],

  function($, can, _, store, SFFrameworkComm) {
    SFFrameworkComm.register(3);

    var NO_CHANCE = '今天你已经没有机会了，明天再来吧';
    var LIMIT_TIME = 3;

    var SFPage = can.Control.extend({

      init: function() {

        this.requestUserListForPrice();

        this.prepare();

        if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          this.setTimeUI();
        }else{
          window.location.href = '/login.html?from='+encodeURIComponent(window.location.href);
        }
      },

      getUserTimes: function () {
        var userId = $.fn.cookie('userId');
        return store.get(userId + '_times') || 0;
      },

      setUserTimes: function (times) {
        var userId = $.fn.cookie('userId');
        store.set(userId + '_times', times);
      },

      setTimeUI: function () {
        var times = LIMIT_TIME - this.getUserTimes();
        if (times > 0) {
          $('.scrape-num').text(times);
        }else{
          $('.scrape-times-inner').text(NO_CHANCE);
          this.setResultImage('nochange');
        }
      },

      setResultImage: function (key) {
        var map = {
          'success': function () {

          },

          'fail': function () {

          },

          'nochange': function () {
            $('.scrape-box').append('<div class="scrape-ticket-none-bg"><span class="icon center"></span></div>').addClass('scrape-ticket-none')
          }
        }

        var fn = map[key];

        if (_.isFunction(fn)) {
          fn();
        }

      },

      getPriceResult: function (isGetPrice) {
        var time = getUserTimes();
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
        // 更新.scrape-winner-list下信息
      },

      /**
       * @todo  获取用户是否获奖的信息
       */
      requestIsUserGetPrice: function () {
        // 获取用户是否获奖的信息,并且设置背后图片
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
          image.src = "static/img/scrape/sracpe-text.png"
          ctx.drawImage(image, 0, 0);

          ctx.globalCompositeOperation = 'destination-out';
        }

        initialize();

        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;

        var mousedown = false;

        function eventDown(e) {
          e.preventDefault();
          mousedown = true;

          if (startlock) {
            startlock = !startlock;
            var times = this.getUserTimes();
            this.setUserTimes(++times);
            this.requestIsUserGetPrice();
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
            var posy = step.pageY - offsetY || 0;

            ctx.beginPath()
            ctx.arc(posx / 2, posy / 2, 10, 0, Math.PI * 2);
            ctx.fill();

          };
        }

        canvas.addEventListener('touchstart', _.bind(eventDown, this));
        canvas.addEventListener('touchend', _.bind(eventUp, this));
        canvas.addEventListener('touchmove', _.bind(eventMove, this));
      }
    })


  })