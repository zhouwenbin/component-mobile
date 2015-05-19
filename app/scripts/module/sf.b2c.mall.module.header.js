define(
  'sf.b2c.mall.module.header', [
    'can',
    'zepto',
    'store',
    'underscore',
    'fastclick',
    'sf.util',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm'
  ],

  function(can, $, store, _, Fastclick, SFFn, SFConfig, SFFrameworkComm) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var header = can.Control.extend({

      init: function() {
        this.setup($('body'));

        var template = can.view.mustache(this.getADHtml());
        $('body').append(template({}));

        this.showAD();
      },

      getADHtml: function() {
        return '<section class="banner-dialog" style="display:none">' +
          '<div class="mask"></div>' +
          '<div class="banner-dialog-b center" id="banner-dialog"><span id="closebutton" class="icon icon15">关闭</span></div>' +
          '</section>'
      },

      "#closebutton click": function($el, event) {
        event && event.stopPropagation();
        $(".banner-dialog").hide();
      },

      "#banner-dialog click": function($el, event) {
        if($(event.target).attr('id') != $el.attr('id')){
          return false;
        }else{
          window.location.href = "http://m.sfht.com/520.html";
        }
      },

      showAD: function() {

        if (this.needShowAd()) {
          $(".banner-dialog").show();

          store.set("lastadshowtime", new Date().getTime());
        }
      },

      needShowAd: function() {

        // 如果在alipay的服务号则不需要展示
        if (SFFn.isMobile.AlipayChat()) {
          return false;
        }

        // 如果已经登录了 则不显示
        if (store.get('csrfToken')) {
          return false;
        }

        // 如果显示没超过一天 则不要显示广告
        if (store.get('lastadshowtime') && (new Date().getTime() - store.get('lastadshowtime') < 60 * 60 * 24 * 1000)) {
          return false;
        }

        var url = window.location.href;

        //URL补齐
        if (url == "http://m.sfht.com/") {
          url = url + "index.html";
        }

        // 如果不是详情页 首页和活动页 则不显示广告
        var isShowURL = /index|activity|detail/.test(url);
        if (!isShowURL) {
          return false;
        }

        return true;
      }
    });

    return new header();

  });