define(
  'sf.b2c.mall.module.tab', [
    'can',
    'zepto',
    'underscore',
    'fastclick',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm'
  ],

  function(can, $, _, Fastclick, SFConfig, SFFrameworkComm) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var tab = can.Control.extend({
      '.cms-fill-tabfunction click': function (element, event) {
        var tabid = element.attr('data-cms-tabid');

        var contentids = element.parent().parent().find("[name='cms-src-tabcontent']");
        contentids.hide();

        var contentid = element.parent().parent().find("#cms-src-tabcontent"+tabid);

        contentid.show();
      }
    })

    // 查找需要tab切换的代码
    var tabModules = $('.cms-module-filltab');

    // 分别进行实例化
    _.each(tabModules, function(tabModule) {
      new tab($(tabModule));
    });

  });