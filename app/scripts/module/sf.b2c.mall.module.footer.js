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

        var isHideAd = store.get('IS_HIDE_AD');

        if (isHideAd) {
          this.element.find('.downloadapp').hide();
        }else{
          this.element.find('.downloadapp').show();
        }
        var switcher = new SFSwitcher();

        switcher.register('web', _.bind(function() {
          this.element.find('.downloadapp').show();
        }, this));

        switcher.register('app', _.bind(function() {
          this.element.find('.downloadapp').hide();
        }, this));

        // 根据逻辑环境进行执行
        switcher.go();


        var isHideAd = store.get('IS_HIDE_AD');

        if (!this.downloadapp.show  || isHideAd) {
          this.element.find('.downloadapp').hide();
        }else{
          this.element.find('.downloadapp').show();
        }

      },

      '.downloadapp-close click': function ($element, event) {
        store.set('IS_HIDE_AD', 'show');
        this.element.find('.downloadapp').hide();
      }

    });

    return new SFFooter('.sf-b2c-mall-footer');

  });