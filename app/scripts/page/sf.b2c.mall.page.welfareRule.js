'use strict';

define(
  'sf.b2c.mall.page.welfareRule', [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.task.getTaskDetail',
    'text!template_welfare_rule',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, SFFrameworkComm, SFgetTaskDetail, template_welfare_rule, SFLoading) {
    SFFrameworkComm.register(3);

    var loadingCtrl = new SFLoading();
    can.route.ready();

    var welfareRule = can.Control.extend({

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.itemObj.getTaskDetail = [];
        this.render();
      },

      render: function() {
        this.request();
        this.initLoadDataEvent();
      },

      request: function(cparams) {
        loadingCtrl.show();
      },

      stepCates: function(data) {
        var renderFn = can.view.mustache(template_welfare_rule);
        var html = renderFn(data);
        this.element.html(html);
        loadingCtrl.hide();
      },

      initLoadDataEvent: function() {
        this.loadingData();
      },

      loadingData: function(cparams) {
        var that = this;
        var taskId = can.route.attr('taskId');
        var sFgetTaskDetail = new SFgetTaskDetail({taskId:taskId});
        can.when(sFgetTaskDetail.sendRequest()).done(function(data) {
          that.itemObj.attr(data);
          that.stepCates(that.itemObj);
          console.log(data);
        }).fail(function(error) {
          console.error(error);
        });
      },
    });
    new welfareRule('body');
  });