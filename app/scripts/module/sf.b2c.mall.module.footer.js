define(
  'sf.b2c.mall.module.footer',

  [
    'can',
    'zepto',
    'store'
  ],

  function (can, $, store) {

    var SFFooter = can.Control.extend({

      init: function () {

        var isHideAd = store.get('IS_HIDE_AD');

        if (isHideAd) {
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