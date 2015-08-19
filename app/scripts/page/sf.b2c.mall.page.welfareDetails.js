'use strict';

define(
  'sf.b2c.mall.page.welfareDetails',
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.share.shareUrl',
    'sf.b2c.mall.api.task.getShareBuyDetail',
    'text!template_welfare_details',
    'sf.b2c.mall.widget.loading',
    "sf.bridge"
  ],

  function(can, $, SFFrameworkComm, SFshareUrl, SFgetShareBuyDetail, template_welfare_details, SFLoading, SFbridge) {
      SFFrameworkComm.register(3);
      var loadingCtrl = new SFLoading();
      can.route.ready();

      var welfareDetails = can.Control.extend({
        itemObj: new can.Map({}),
        '{can.route} change': function() {
          this.render();
        },

        init: function() {
          this.itemObj.getShareBuyDetail =[];
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
          var taskId = can.route.attr('taskId');
          var ifHasIsId = can.route.attr('isTaskId');
          if(ifHasIsId == 'isTaskId'){
           $('#isToShare').css('display', 'none');
          }else{
            $('#isShare').css('display', 'none');
          }
          loadingCtrl.hide();
        },

        initLoadDataEvent: function() {
          this.loadingData();
          loadingCtrl.hide();
        },

        loadingData: function(cparams) {
          var that = this;
          var taskId = can.route.attr('taskId');
          var sFgetShareBuyDetail =new SFgetShareBuyDetail({taskId:taskId});
          can.when(sFgetShareBuyDetail.sendRequest()).done(function(data) {
            that.itemObj.attr(data);
            that.stepCates(that.itemObj);
          }) .fail(function(error) {
            console.error(error);
          });
        },

        '.toShareBtn click': function($element, event) {
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            window.location.href ="http://m.sfht.com/login.html";
            return false;
          }
          var pic = $('.imageBig').attr('src');
          var url = can.route.attr();
          var params = {
              "subject": 'fhduoh',
              "description": 'g3rwgr',
              "imageUrl": pic,
              "url": url
          }
          var taskId = can.route.attr('taskId');
          var ifHasIsId = can.route.attr('isTaskId');
          if(ifHasIsId != 'isTaskId'){
           can.route.attr('taskId','isTaskId');
          }
          console.log(url);
          var success =function (data) {
            alert('data.text');
            alert(JSON.stringify(data))
            console.log(url);
            // var url = can.route.attr();
            // var target = '微信朋友圈';
            // var sFshareUrl =new SFshareUrl({url:url,target:target});
            // can.when(sFshareUrl.sendRequest()).done(function(data) {

            // }) .fail(function(error) {
            //   console.error(error);
            // });
          }
          var error = function (data) {
            alert('data.error');
            alert(JSON.stringify(data))
          }
          window.bridge.run('SocialSharing', 'share', params, success, error)
        },
       });
      new welfareDetails('body');
  });