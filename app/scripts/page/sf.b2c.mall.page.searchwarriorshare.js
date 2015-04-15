'use strict';

define(
  [
    'can',
    'zepto',
    'fastclick',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.helpers',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.widget.wechatlogin',
    'sf.b2c.mall.widget.message'
  ],
  function(can, $, Fastclick,
           SFWeixin, SFFrameworkComm, SFConfig, helpers,
           SFLoading, SFWeChatLogin, SFMessage) {
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
        "260": 4
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

        SFWeixin.shareDetail(
          '就是你！顺丰海淘的超级英雄！',
          '变身超级英雄，拿顺丰海淘优惠券，是酷炫的他，柔美的她，还是软萌鸡肋的他？点击测试~优惠券等你来拿',
          'http://m.sfht.com/searchwarrior.html?' + window.location.search.substr(1),
          'http://img.sfht.com/sfht/img/sharelog.png');

        can.when(this.initWarriors())
          .done(function() {
            that.itemObj.attr("warrior", that.calculateFightingCapacity(cardId));
            that.render();
          });
      },
      render: function() {
        var that = this;
        this.element.html(can.view("templates/searchwarrior/sf.b2c.mall.searchwarrior.share.mustache", this.itemObj));
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