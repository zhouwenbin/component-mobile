'use strict';


define('sf.b2c.mall.category.pagenavigatelistcontent', [
    'can',
    'zepto',
    'sf.b2c.mall.api.categoryPage.findCategoryPages',
    'sf.b2c.mall.category.fn',
    'sf.helpers',
    'sf.util',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.business.config',
    'sf.env.switcher',
    'text!template_category_navigate',
    'sf.b2c.mall.widget.loading'
  ],
  function(can, $, SFFindCategoryPages, CategoryFn, SFHelpers, SFFn, SFMessage, SFConfig, SFSwitcher, template_category_navigate, SFLoading) {


    var EMPTY_IMG = "http://m.sfht.com/static/img/no.png";
    var PREFIX = 'http://img0.sfht.com';
    var DEFAULT_STATUS = '';
    var DEFAULT_ANIMATE_TIME = 3000;
    var loadingCtrl = new SFLoading();
    var exId=-1;
    var exSencondIds=[];

    can.route.ready();

    return can.Control.extend({
      itemObj: new can.Map({}),

      helpers: {

      },

      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.itemObj.cates=[];
        this.itemObj.catesCont=[];
        this.render();
      },

      render: function() {
        this.initLoadDataEvent();
        //var params = can.deparam(window.location.search.substr(1));
        //params = _.extend(params, can.route.attr());
        //
        //this.request({
        //  pageNum: params.pageNum,
        //  pageSize: params.pageSize,
        //  status: params.status
        //});
      },

      request: function(cparams) {
        var that = this;

        loadingCtrl.show();
        this.paint();
      },

      instanceCates: function(data) {
        var renderFn = can.view.mustache(template_category_navigate);
        var html = renderFn(data, this.helpers);
        var str = JSON.stringify(data);
        this.element.html(html);
        var firstLi=$(".category-tab ul li").get(0);
        if(firstLi){
          $(firstLi).append("<i class='cat-tab-hr'><hr /></i>");
        }
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
        var sFFindCategoryPages =new SFFindCategoryPages(params);
        can.when(sFFindCategoryPages.sendRequest()).done(function(data) {
          var initPid=-1;
          //var str = JSON.stringify(data);
          //alert(str);
          var cates=[];
          _.each(data.value, function(item) {
            cates.push(item);
            if(initPid==-1){
              initPid=item.id;
            }
          });
          that.itemObj.attr("cates",cates);
          exId=initPid;
           params = {
             "pId": initPid
          };
          sFFindCategoryPages =new SFFindCategoryPages(params);
          can.when(sFFindCategoryPages.sendRequest()).done(function(data) {
            var catesCont=[];
            _.each(data.value, function(item) {
              catesCont.push(item);
            });
            that.itemObj.attr("catesCont",catesCont);
            that.instanceCates(that.itemObj);
          }) .fail(function(error) {
            console.error(error);
          });

        }) .fail(function(error) {
          console.error(error);
        });
      },
      '.getCate click': function($element, event) {

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
      '.getSecondCate click':function($element, event) {
        var id=$element.attr("data-item-id");
        var parentLi=$element.parent();
        var spanStatus=$element.find(".category-iconarrow-close");
        var status=spanStatus.length;
          spanStatus.toggleClass("active");
          parentLi.toggleClass("boder-li");
        if($.inArray(id, exSencondIds)>-1){
            parentLi.find(".category-content-p2").toggle();
          return;
        }
        var success = function() {
          window.location.reload();
        };

        var error = function() {
          // @todo 错误提示
        }
        CategoryFn.getSecondCate(exSencondIds,id, success, error);
      }
    });
  });