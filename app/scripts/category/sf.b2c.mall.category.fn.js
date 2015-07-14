define(
  'sf.b2c.mall.category.fn',

  [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.categoryPage.findCategoryPages',
    'sf.util'
  ],

  function($, can, _, store,  SFConfig,SFFindCategoryPages, SFUtil) {

    return {

      helpers: {

      },

      getCate: function(exId,id, success, error) {
        params = {
          "pId": id
        };
        var aobj=$(".category-content li[pid=\""+exId+"\"]");
        $(aobj).hide();
        var sobj=$(".category-content li[pid=\""+id+"\"]");
        var extabi=$(".category-tab li[cate-p1-id=\""+exId+"\"] i");
        extabi.remove();
        var currenttab=$(".category-tab li[cate-p1-id=\""+id+"\"]");
        currenttab.append("<i class='cat-tab-hr'><hr /></i>");
        if(sobj.length>0){
          $(sobj).show();
        }
       else{
       var sFFindCategoryPages =new SFFindCategoryPages(params);
        can.when(sFFindCategoryPages.sendRequest()).done(function(data) {
          var i=0
          var allItems="";
          _.each(data.value, function(item) {
            var everItem=" <li data-item-id="+item.id+"  pid=\""+id+"\">"+
            " <div class='category-content-p1 getSecondCate' data-item-id=\""+item.id+"\" >"+
            " <div class='category-content-c1'>"+
                " <img src="+item.iconUrl+">"+
            " </div>"+
            " <div class='category-content-c2'>"+
                " <div class='category-content-c2-r1'>"+
            " <div><span >"+item.name+"</span></div>"+
            " <span  class='category-iconarrow-close'></span>"+
            " </div>"+
            " </div>"+
            " </div>"+
                "</li>";
            allItems=allItems+everItem;
            i++;
          });
          $(".category-content ul").append(allItems);

        }) .fail(function(error) {
          console.error(error);
        });
        }
      },

      getSecondCate: function(exSencondIds,id, success, error){
        var currentObj=$(".category-content li[data-item-id=\""+id+"\"]");
        params = {
          "pId": id
        };
        var sFFindCategoryPages =new SFFindCategoryPages(params);
        can.when(sFFindCategoryPages.sendRequest()).done(function(data) {
          var i=0
          var maxle=0;
          if(data.value){
            maxle=data.value.length;
          }
          var allItems="<div class='category-content-p2'><ul>";
          _.each(data.value, function(item) {
            var everItem=" <li>"+
            " <div class='category-content-c2'>"+
            " <a href='http://www.sfht.com/search.html?categoryIds="+item.id+"'>"+
                " <div class='category-content-c2-r1'>"+
            " <div><span >"+item.name+"</span></div>"+
            " </div>"+
            " </a>"+
            " </div>"+
            " </li>";
            if(i==maxle-1){
              everItem=" <li class='category-content-final-li'>"+
              " <div class='category-content-c2'>"+
              " <a href='http://www.sfht.com/search.html?categoryIds="+item.id+"'>"+
              " <div class='category-content-c2-r1'>"+
              " <div><span >"+item.name+"</span></div>"+
              " </div>"+
              " </a>"+
              " </div>"+
              " </li>";
            }
            allItems=allItems+everItem;
            i++;
          });
          allItems=allItems+" </ul></div>";
          currentObj.append(allItems);
          exSencondIds.push(id);
        }) .fail(function(error) {
          alert(error);
          console.error(error);
        });
      }
    }
  });