define(
  'sf.b2c.mall.page.logincenterafter', [
    'can',
    'zepto',
    'store',
    'underscore',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm'
  ],

  function(can, $, store, _, Fastclick, SFConfig, SFFrameworkComm) {

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var header = can.Control.extend({

      init: function() {
        var params = can.deparam(window.location.search.substr(1));
        var redirectUrl = window.decodeURIComponent(params.redirectUrl);
        // var redirectUrl = SFConfig.setting.link.index;
        var tempToken = store.get('tempToken');
        var csrfToken = store.get('csrfToken');

        if (tempToken) {
          window.location.href = 'bindaccount.html?tag=' + params.tag + '&redirectUrl=' + window.encodeURIComponent(redirectUrl);
        } else if (csrfToken) {
          window.location.href = redirectUrl || SFConfig.setting.link.index;
        } else {
          window.location.href = SFConfig.setting.link.index;
        }
      }
    });

    return header;

    // new header();

  });