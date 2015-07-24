define(
  'sf.b2c.mall.module.footer',

  [
    'can',
    'zepto',
    'store',
    'sf.env.switcher'
  ],

  function (can, $, store, SFSwitcher) {

    var SFFooter = can.Control.extend({

      init: function () {

        var switcher = new SFSwitcher();

        switcher.register('web', _.bind(function () {
          var isHideAd = store.get('IS_HIDE_AD');
          // 过期
          if (isHideAd && (isHideAd - Date().now() > 1*24*60*60*1000)) {
            store.remove('IS_HIDE_AD');
            isHideAd = null;
          }

          if (isHideAd) {
            this.element.find('.downloadapp').hide();
          }else{
            this.element.find('.downloadapp').show();
          }
        }, this));

        switcher.register('app', _.bind(function () {
          this.element.find('.downloadapp').hide();
        }, this));

        switcher.go();
      },

      '.downloadapp-r1 click': function ($element, event) {
        event && event.preventDefault();
        window.location.href = 'http://m.sfht.com/app.html?from='+ window.location.href
      },

      '.downloadapp-close click': function ($element, event) {
        store.set('IS_HIDE_AD', Date.now());
        this.element.find('.downloadapp').hide();
      }

    });

    return new SFFooter('.sf-b2c-mall-footer');

  });