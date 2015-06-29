'use strict';

define('sf.b2c.mall.component.mypoint', [
    'can',
     'zepto',
     'store',
     'fastclick',
    'sf.b2c.mall.api.integral.getUserIntegralLog',
    'sf.b2c.mall.api.sc.getUserRoutes',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm',
    'sf.env.switcher',
    'text!template_center_point'
  ],
  function(can, $, store, Fastclick,  IntegralLog,  SFGetUserRoutes, SFMessage, SFConfig,SFFrameworkComm,SFSwitcher, template_center_point) {
      var DEFAULT_PAGE_NUM = 1;
      var DEFAULT_PAGE_SIZE = 10;
      var totalNumber = 0;
     Fastclick.attach(document.body);
     SFFrameworkComm.register(3);
    can.route.ready();
    return can.Control.extend({
      init: function(element, options) {
            var that = this;
            this.handler = null;

              //获取当前的页码，如果为空在默认为1
            var routeParams = can.route.attr();
            if (!routeParams.page) {
              routeParams = _.extend(routeParams, {
                page: 1
              });
            }

            var operateTypeV = "";

            var params = {
              "operateType": routeParams.operateType,
                "page": routeParams.page || DEFAULT_PAGE_NUM,
                "size": 10
            }
            this.render(params);
      },

      render: function(params) {
        var that = this;
        var dateAndTime ;
          //调用积分接口
        var getPointList = new IntegralLog(params);
          getPointList.sendRequest()
          .done(function(data) {
                  that.options.integralTotalAmount = data.userTotalIntegral.integralTotalAmount;
                  that.options.expirationDate = data.userTotalIntegral.expireDate;
                  that.options.expireIntegralAmount = data.userTotalIntegral.expireIntegralAmount;
                  totalNumber = data.totalCount;
                   if (data.result && data.result.length > 0) {
                          that.options.result = data.result;
                          _.each(that.options.result, function(point) {
                                    if(point.integralAmount > 0){
                                        point.flag = "text-success";
                                        point.integralAmount = "+" + point.integralAmount;
                                    }
                                   else{
                                        point.flag = "text-important";
                                    }
                                  dateAndTime =  that.getDateAndTime(point.createDate);
                                  point.dateValue = dateAndTime.datePart;
                                  point.timeValue = dateAndTime.timePart;
                          })
                    } else {
                       that.options.result = null;
                    }
                //  var html = can.view('templates/center/sf.b2c.mall.center.point.mustache', that.options);
                  var renderPoint = can.mustache(template_center_point);
                  var html = renderPoint(that.options);
                  that.element.html(html);
                  //获取当前的操作类型，设置当前的li标签
                  var routeParams = can.route.attr();
                  var pageNum = typeof routeParams.page == "undefined"?1:routeParams.page;
                  if( totalNumber < pageNum * 10 + 1){
                      $(".order-r2").css("display","none");
                  }
                  if (routeParams.operateType) {
                      _.each($(".integral-tab li"), function(element) {
                          if($(element).attr("tag") == routeParams.operateType){
                              $(element).addClass("active").siblings().removeClass("active");
                          }
                      }, this)
                  } else {
                      $(".integral-tab li").eq(0).addClass("active");
                  }
                  can.$('.loadingDIV').hide();
          })
          .fail(function(error) {
            console.error(error);
            can.$('.loadingDIV').hide();
          });
      },

       getDateAndTime: function(timeValue){
            var DateValue = new Date(timeValue);
           var monV = DateValue.getMonth() + 1;
           var dayV = DateValue.getDate();
           var hourV = DateValue.getHours();
           var minV = DateValue.getMinutes();
           var secV = DateValue.getSeconds();
            var datePart = DateValue.getFullYear() + "-" + (monV < 10?("0" + monV):monV) + "-" + (dayV < 10?("0" + dayV):dayV);
           var timePart = (hourV < 10?("0" + hourV):hourV) + ":" + (minV < 10?("0" + minV):minV)+ ":" + (secV < 10?("0" + secV):secV);
           return {
               "datePart":datePart,
               "timePart":timePart
           };
       },

      '{can.route} change': function(el, attr, how, newVal, oldVal) {
          var routeParams = can.route.attr();
          var params = {
              "operateType": routeParams.operateType,
              "page": routeParams.page,
              "size": 10
          };
          this.render(params);
      },

     "#viewmore click":function(element, event){
         var routeParams = can.route.attr();
         var currentPage = typeof routeParams.page == "undefined" ?1:routeParams.page;
         if(parseInt(currentPage)  + 1 >= totalNumber/10){
             $(".order-r2").css("display","none");
         }
         if(typeof routeParams.operateType == "undefined" ){
             window.location = " http://m.sfht.com/mypoint.html" + '#!'  + "&page=" + (parseInt(currentPage) + 1);
         }
         else{
             window.location = " http://m.sfht.com/mypoint.html" + '#!' + "operateType=" +  routeParams.operateType + "&page=" + (parseInt(currentPage) + 1);
         }

     },

     "svg click": function(element, event) {
         window.location.href = "http://m.sfht.com/integral-explain.html";
     },
        //点击不同的li，传入不同的参数
      '.integral-tab li click': function(element, event) {
        event && event.preventDefault();
        var that = this;
        // @todo 知道当前需要访问那个tag，并且根据tag，设置params，传给render
        var tag = $(element).attr('tag');
        if(tag == "all"){
            tag = "";
        }
         //选中li的样式的改变
       $(element).addClass("active").siblings().removeClass("active");
       //window.location.href = " http://m.sfht.com/mypoint.html" + '#!' + "operateType=" + tag + "&page=" + 1;

          var switcher = new SFSwitcher();

          switcher.register('web', function () {
              window.location = " http://m.sfht.com/mypoint.html" + '#!' + "operateType=" + tag + "&page=" + 1;
          });

          switcher.register('app', function () {
              can.route.attr('operateType', tag);
          });
          switcher.go();
      }
    });
  })