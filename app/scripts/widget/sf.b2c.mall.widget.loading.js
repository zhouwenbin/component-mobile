'use strict';

define(
  'sf.b2c.mall.widget.loading',

  [
    'zepto',
    'can',
    'sf.b2c.mall.business.config',
    'text!template_widget_loading',
    'sf.hybrid',
    'sf.env.switcher'
  ],

  function($, can, SFConfig, template_widget_loading, SFHybrid, SFSwitcher) {
    return can.Control.extend({

      init: function() {},

      render: function() {
        this.setup($('body'));

        if ($('.loadingDIV').length == 0) {
          var renderFn = can.mustache(template_widget_loading);
          var html = renderFn({});
          $('body').append(html);
        }else{
          $('.loadingDIV').show();
        }
      },

      show: function() {
        // if ($('.loadingDIV').length == 0) {
        //   this.render();
        // }

        var switcher = new SFSwitcher();

        switcher.register('web', _.bind(function(){
          this.render();
        }, this));

        switcher.register('localapp', function () {
          SFHybrid.toast.loading();
        })

        switcher.go();
      },

      hide: function() {

        var switcher = new SFSwitcher();

        switcher.register('web', function () {
          $('.loadingDIV').remove();
        });

        switcher.register('localapp', function () {
          alert(1,$('.loadingDIV'));
          $('.loadingDIV').remove();
          alert($('.loadingDIV'));
          SFHybrid.toast.dismiss();
        });

        switcher.go();
      }
    });
  })