define(
  'sf.b2c.mall.module.header', [
    'can',
    'zepto',
    'store',
    'underscore',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm'
  ],

  function(can, $,store, _, Fastclick, SFConfig, SFFrameworkComm) {
    
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var header = can.Control.extend({

      init: function() {
        var params = can.deparam(window.location.search.substr(1));
        var redirectUrl = params.redirectUrl;
        if (store.get('tempToken')) {
          window.location.href = 'bindaccount.html';
        }else{
          window.location.href = redirectUrl || SFConfig.setting.link.index;
        } 
      }
    });

    new header();

  });