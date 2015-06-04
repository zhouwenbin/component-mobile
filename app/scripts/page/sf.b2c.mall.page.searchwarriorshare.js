'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.util',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.widget.login',
    'sf.b2c.mall.widget.message',
    'text!template_searchwarrior_share'
  ],
  function(can, $, Fastclick, SFFn,
           SFWeixin, SFFrameworkComm, SFConfig, helpers,
           SFLoading, SFLogin, SFMessage, template_searchwarrior_share) {
      Fastclick.attach(document.body);
      SFFrameworkComm.register(3);

    var searchwarriorshare = can.Control.extend({
      itemObj:  new can.Map({
        warrior: {},
        price: 0,
        isShowMask: false
      }),
      loading: new SFLoading(),
      warriors: [],
      cardMap: {
          "49": 0,
          "50": 1,
          "51": 2,
          "52": 3,
          "53": 4,
          "54": 5,
          "55": 6,
          "56": 7,
          "57": 8,
          "58": 9,
          "59": 10,
          "60": 11,
          "61": 12,
          "62": 13,
          "63": 14,
          "64": 15,
          "65": 16,
          "66": 17,
          "67": 18,
          "68": 19,
          "69": 20,
          "70": 21,
          "71": 22,
          "72": 23,
          "73": 24,
          "74": 25,
          "75": 26,
          "76": 27,
          "77": 28,
          "78": 29
        },


      helpers: {
        ismobile: function(mobile, options) {
          if (mobile() == 'mobile') {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
        isWeChat: function(options) {
          if (SFFn.isMobile.WeChat()) {
            return options.fn(options.contexts || this);
          }else{
            return options.inverse(options.contexts || this);
          }
        },
        isAlipay: function(options) {
          if (SFFn.isMobile.AlipayChat()) {
            return options.fn(options.contexts || this);
          }else{
            return options.inverse(options.contexts || this);
          }
        }
      },

      init: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var bagId = params.bagId;
        var bagCodeId = params.bagCodeId;
        var couponId = params.couponId;
        var cardId = params.cardId;
        var cardIds = params.cardIds;
        if (cardIds) {
          var tmpArr = cardIds.split(",");
          for(var i = 0, tmpItem; tmpItem = tmpArr[i]; i++) {
            this.cardMap[tmpItem] = i;
          }
        }
        this.itemObj.attr("price", params.price);
        can.when(this.initWarriors())
          .done(function() {
            that.itemObj.attr("warrior", that.calculateFightingCapacity(cardId));
            that.render();

            SFWeixin.shareDetail(
              '来看看你是哪个超级英雄，领券人品大测试',
              '变身超级英雄，拿顺丰海淘优惠券，是酷炫的他，柔美的她，还是软萌鸡肋的他？点击测试~优惠券等你来拿',
              'http://m.sfht.com/searchwarrior.html?' + window.location.search.substr(1),
              that.itemObj.warrior.img || 'http://img.sfht.com/sfht/img/sharelog.png');
          });




      },
      render: function() {
        var that = this;
        this.element.html(can.view(template_searchwarrior_share, this.itemObj, this.helpers));
        this.loading.hide();
      },

      calculateFightingCapacity: function(cardId) {
        var warrior = this.warriors[this.cardMap[cardId]];
        var tempnum = "11111";
        warrior.fightArray = tempnum.split("1", warrior.fight);
        warrior.faceArray = tempnum.split("1", warrior.face);
        return warrior;
      },

      initWarriors: function() {
        var that = this;
        return can.ajax({url: '/json/sf.b2c.mall.warriors.json'})
          .done(function(data){
            that.warriors = data;
          })
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      },
      "#shareBtn click": function() {
        this.itemObj.attr("isShowMask", true);
      }
    });
    new searchwarriorshare('.sf-b2c-mall-searchwarriorshare');
  });