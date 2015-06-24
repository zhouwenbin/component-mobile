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

        var isShowAd = store.get('IS_SHOW_AD');

        this.element.find('.downloadapp').hide();
      },

      '.downloadapp-close click': function ($element, event) {

      }

    });

    return new SFFooter('.sf-b2c-mall-footer');

  });