'use strict';

define(
  'sf.b2c.mall.page.welfare',
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.share.shareUrl',
    'sf.b2c.mall.api.task.directReceiveAward',
    'sf.b2c.mall.api.task.getUserTaskList',
    'text!template_welfare_list',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, SFFrameworkComm, SFshareUrl, SFdirectReceiveAward ,SFgetUserTaskList, template_welfare_list, SFLoading) {
      SFFrameworkComm.register(3);
      var loadingCtrl = new SFLoading();
      can.route.ready();
      var welfareList = can.Control.extend({
        itemObj: new can.Map({}),
        '{can.route} change': function() {
          this.render();
        },

        init: function() {
          this.itemObj.recommendTaskList =[];
          this.itemObj.dailyTaskList =[];
          this.render();
        },

        render: function() {
          this.initLoadDataEvent();
        },

        request: function(cparams) {
          var that = this;
          loadingCtrl.show();
          this.paint();
        },

        stepCates: function(data) {
          var renderFn = can.view.mustache(template_welfare_list);
          var html = renderFn(data);
          // var str = JSON.stringify(data);
          this.element.html(html);
          loadingCtrl.hide();

        },
        instaceCatesCont: function(data) {
        },
        initLoadDataEvent: function() {
          this.loadingData();
        },

        loadingData: function(cparams) {
          var that = this;
          var params = {
            "pId": 0
          };
          var sFgetUserTaskList =new SFgetUserTaskList(params);
          can.when(sFgetUserTaskList.sendRequest()).done(function(data) {
            console.log(data)
            that.itemObj.attr(data)
            that.stepCates(that.itemObj)

          }) .fail(function(error) {
            console.error(error);
          });
        },
        '.listLi-3 click': function($element, event) {
            if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            window.location.href ="http://m.sfht.com/login.html";
            return false;
          }
          var id=$element.attr("cate-p1-id");
          if(exId==id)return;
          var success = function() {
            window.location.reload();
          };

          var error = function() {
            // @todo 错误提示
          }
          CategoryFn.getCate(exId,id, success, error);
          exId=id;
        },
        // '.getSecondCate click':function($element, event) {
        //   var id=$element.attr("data-item-id");
        //   var parentLi=$element.parent();
        //   var spanStatus=$element.find(".category-iconarrow-close");
        //   var status=spanStatus.length;
        //     spanStatus.toggleClass("active");
        //     parentLi.toggleClass("boder-li");
        //   parentLi.find(".category-content-p2").toggleClass('active');
        //   //parentLi.find(".category-content-p2").toggleClass('active');
        //   if($.inArray(id, exSencondIds)>-1){
        //     return;
        //   }
        //   var success = function() {
        //     window.location.reload();
        //   };

        //   var error = function() {
        //     // @todo 错误提示
        //   }
        //   CategoryFn.getSecondCate(parentLi,exSencondIds,id, success, error);

        // }
       });
      new welfareList('body');
  });