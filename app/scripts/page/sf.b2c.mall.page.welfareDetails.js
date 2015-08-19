'use strict';

define(
  'sf.b2c.mall.page.welfareDetails',
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.share.shareUrl',
    // 'sf.b2c.mall.api.task.directReceiveAward',
    // 'sf.b2c.mall.api.task.getUserTaskList',
    'text!template_welfare_details',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, SFFrameworkComm, SFshareUrl, template_welfare_details, SFLoading) {
      SFFrameworkComm.register(3);
      var loadingCtrl = new SFLoading();
      can.route.ready();

      var welfareList = can.Control.extend({
        itemObj: new can.Map({}),
        '{can.route} change': function() {
          this.render();
        },

        helpers: function() {

        },

        init: function() {
          this.itemObj.recommendTaskList =[];
          this.itemObj.dailyTaskList =[];
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
          var renderFn = can.view.mustache(template_welfare_details);
          var html = renderFn(data);
          this.element.html(html);
          loadingCtrl.hide();
        },

        initLoadDataEvent: function() {
          this.loadingData();
          loadingCtrl.hide();
        },

        loadingData: function(cparams) {
          var that = this;
          var params = {};
          var sFshareUrl =new SFshareUrl(params);
          can.when(sFshareUrl.sendRequest()).done(function(data) {
            that.itemObj.attr(data);
            that.stepCates(that.itemObj);
          }) .fail(function(error) {
            console.error(error);
          });
        },

        // '.joinBtns click': function($element, event) {
        //   if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
        //     window.location.href ="http://m.sfht.com/login.html";
        //     return false;
        //   }
        //   if($element.hasClass('direct')){
        //     $element.attr({
        //       href: 'javascript:;'
        //     });

        //     var taskId = $element.closest('li').attr('data-tab');
        //     var sFdirectReceiveAward = new SFdirectReceiveAward({taskId: taskId});
        //     sFdirectReceiveAward.sendRequest().done(function(taskId){
        //       alert(taskId.text)
        //     }) .fail(function(error){
        //       console.log(error)
        //     })
        //   }
        // },
       });
      new welfareList('body');
  });