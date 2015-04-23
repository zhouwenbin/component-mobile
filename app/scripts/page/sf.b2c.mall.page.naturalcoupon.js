'use strict';

define("sf.b2c.mall.page.naturalcoupon", [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.coupon.receiveCoupon'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFWeixin, SFConfig, SFReceiveCoupon) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    Fastclick.attach(document.body);

    var naturalcoupon = can.Control.extend({

      init: function(element, options) {
        this.options.data = new can.Map({});

        this.render(element);
      },

      render: function(element) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          this.options.data.attr("hasGetLift", false);
          this.renderHtml(element, this.options.data);
        } else {
          var that = this;

          var params = can.deparam(window.location.search.substr(1));
          var bagid = params.bagid;

          var receiveCoupon = new SFReceiveCoupon({
            "type": "GIFTBAG",
            "bagId": bagid,
            "receiveChannel": 'B2C',
            "receiveWay": 'ZTLQ'
          });

          receiveCoupon
            .sendRequest()
            .done(function(data) {
              // 是否显示领取按钮，未领过还要显示领取按钮
              that.options.data.attr("hasGetLift", true);
              that.renderHtml(element, that.options.data);
            })
            .fail(function(error) {
              // 已经领过了
              if (error === 11000100) {
                // 是否显示领取按钮 已经领过了就不显示了
                that.options.data.attr("hasGetLift", true);
                that.renderHtml(element, that.options.data);
              } else {
                console.error(error);
              }
            })
        }

      },

      "#getcoupon click": function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          window.location.href = SFConfig.setting.link.login + '&from=' + escape(window.location.href);
          return false;
        }

        var that = this;

        var params = can.deparam(window.location.search.substr(1));
        var bagid = params.bagid;

        var receiveCoupon = new SFReceiveCoupon({
          "type": "GIFTBAG",
          "bagId": bagid,
          "receiveChannel": 'B2C',
          "receiveWay": 'ZTLQ'
        });

        receiveCoupon
          .sendRequest()
          .done(function(data) {
            // 是否显示领取按钮，未领过还要显示领取按钮
            that.options.data.attr("hasGetLift", true);
            that.renderHtml(element, that.options.data);
            $("#successdialog").show();
            setTimeout(that.closeDialog, 1000);
          })
          .fail(function(error) {
            // 已经领过了
            if (error === 11000100) {
              // 是否显示领取按钮 已经领过了就不显示了
              that.options.data.attr("hasGetLift", true);
              that.renderHtml(element, that.options.data);
            } else {
              console.error(error);
            }
          })
      },

      closeDialog: function(){
        $("#successdialog").hide();
      },

      /** 渲染 */
      renderHtml: function(element, data) {
        var html = can.view('templates/natural/sf.b2c.mall.natural.coupon.mustache', data);
        element.html(html);
      }
    });

    new naturalcoupon('.haitao-b2c-h5-natural-coupon');

  })