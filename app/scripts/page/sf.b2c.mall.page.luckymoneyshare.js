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
    'sf.b2c.mall.api.coupon.getShareBagInfo',
    'sf.b2c.mall.luckymoney.users',
    'text!template_luckymoney_share',
    'sf.env.switcher',
    'sf.hybrid'
  ],
  function(can, $, Fastclick, SFWeixin, SFFrameworkComm, SFConfig, helpers, SFGetOrderShareBagInfo,
    SFLuckyMoneyUsers, template_luckymoney_share, SFSwitcher, SFHybrid) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var luckymoneyshare = can.Control.extend({
      itemObj:  new can.Map({
        isShowMask: false
      }),

      init: function() {
        this.render();
      },
      render: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        var id = params.id;

        can.when(that.initOrderShareBagInfo(id))
          .always(function() {
            that.renderHtml(that.element, that.itemObj);
            var sfLuckyMoneyUsers = new SFLuckyMoneyUsers(".users", {shareBagId: id});
            that.itemObj.attr("userCouponInfo", sfLuckyMoneyUsers.itemObj.userCouponInfo);
            $('.loadingDIV').hide();
          });
      },
      initOrderShareBagInfo: function(shareBagId) {
        var that = this;
        var getOrderShareBagInfo = new SFGetOrderShareBagInfo({
          "shareBagId": shareBagId
        });


        return getOrderShareBagInfo.sendRequest()
          .done(function(cardBagInfo) {
            SFWeixin.shareLuckyMoney(cardBagInfo.title, cardBagInfo.useInstruction, cardBagInfo.bagCodeId);

            //处理卡券规则
            cardBagInfo.useInstructions = cardBagInfo.useInstruction.split("\n");
            that.itemObj.attr({
              cardBagInfo: cardBagInfo
            })
          })
          .fail(function(error) {
            console.error(error);
          });
      },
      renderHtml: function(element, itemObj) {
        // var html = can.view(template_luckymoney_share, itemObj);
        var renderFn = can.mustache(template_luckymoney_share);
        var html = renderFn(itemObj);
        element.html(html);
      },
      "#shareBtn click": function() {
        var that = this;
        // 启动分支逻辑
        var switcher = new SFSwitcher();
        switcher.register('app', function() {
          SFHybrid.share();
        });

        switcher.registerOneCallbackExceptEnv('app', function() {
          that.itemObj.attr("isShowMask", true);
        });

        switcher.go();
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      }
    });
    // new luckymoneyshare('.sf-b2c-mall-luckyMoney-share');

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {
      new luckymoneyshare('.sf-b2c-mall-luckyMoney-share');
      new SFNav('.sf-b2c-mall-nav');
    });

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          SFHybrid.setNetworkListener();
          SFHybrid.isLogin().done(function () {
            new luckymoneyshare('.sf-b2c-mall-luckyMoney-share');
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  })