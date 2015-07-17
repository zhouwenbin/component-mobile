'use strict';

define('sf.b2c.mall.component.searchbox', [
  'can',
  'zepto',
  'underscore',
  'store',
  'sf.b2c.mall.widget.loading',
  'sf.b2c.mall.widget.bubble',
  'sf.b2c.mall.api.search.hotKeywords',
  'text!template_component_searchbox'
], function(can, $, _, store, SFLoading, SFBubble, SFHotKeywords, template_component_searchbox) {

  var STORE_HISTORY_LIST = "searchhistories";
  var HISTORY_SIZE = 10;
  var KEYWORD_SIZE = 10;

  return can.Control.extend({

    loading: new SFLoading(),

    helpers: {},

    renderData: new can.Map({
      showGate: false,
      publicGate: true,
      historyList: {
        data: null,
        show: true
      },
      hotKeywordList: {
        data: null,
        show: true
      },
      changeList: function(context, targetElement, event) {
        if ($(targetElement).text() == "历史记录") {
          context.attr("historyList.show", true);
          context.attr("hotKeywordList.show", false);
        } else {
          context.attr("historyList.show", false);
          context.attr("hotKeywordList.show", true);
        }
      }
    }),

    controlDoms: [],

    init: function() {
      if(typeof this.options.showGate !== 'undefine') {
        this.renderData.attr("showGate", this.options.showGate);
      }

      if (!this.options.showGate) {
        this.renderMain();
      }

      //有自己的label
      if($("label[for=searchInput]").length == 1) {
        this.renderData.attr("publicGate", false);
      }
      this.render();
    },

    render: function() {
      this.renderHtml();
    },

    renderMain: function() {
      if(this.renderData.hotKeywordList.data) {
        return;
      }

      var that = this;
      
      this.initHistories();
      if (that.renderData.historyList.data) {
        this.renderData.attr("hotKeywordList.show", false);
      }
      
      can.when(this.initHotKeywords())
        .done(function() {
          $(".search-box-main").show();
        })
        .always(function() {
          that.loading.hide();
        });
    },

    /**
     * @description 从服务器端获取数据
     * @param searchData
     */
    initHotKeywords: function() {
      var that = this;
      var sfHotKeywords = new SFHotKeywords({"size": KEYWORD_SIZE});
      return sfHotKeywords.sendRequest()
        .done(function(result) {
          that.renderData.attr("hotKeywordList.data", result.value);
        });
    },

    /**
     * @author zhang.ke
     * @description 获取store中history数据
     * @param searchData
     */
    initHistories: function() {
      var that = this;
      that.renderData.attr("historyList.data", store.get(STORE_HISTORY_LIST));
    },

    /**
     * @author zhang.ke
     * @description 渲染html
     * @param data
     */
    renderHtml: function(data) {
      //渲染页面
      var renderFn = can.mustache(template_component_searchbox);
      var html = renderFn(data || this.renderData, this.helpers);
      this.element.html(html);
    },

    showMain: function() {
      var that = this;
      $(".search-box-main").addClass("active");
      var doms = [];
      if(this.options.existDom == "all") {
        _.each($("body > *"), _.bind(function(item, index, list) {
          if ($(item).css("display") !== 'none'
            && $(item).css("opacity") != 0
            && this.element[0] !== item){
              doms.push(item);
          }
        }, this))
        this.controlDoms = doms;
      }

      $(this.options.existDom).hide();
      $(this.controlDoms).hide();
    },

    hideMain: function() {
      if (this.renderData.showGate) {
        $(".search-box-main").removeClass("active");
        $("#searchInput").blur();
        $(this.options.existDom).show();
        $(this.controlDoms).show();
      } else {
        window.history.back();
      }
      
    },

    /**
     * @author zhang.ke
     * @description 开始搜索
     */
    "#searchInput keydown": function(element, event) {
      if (event.keyCode != 13) {
        return;
      }

      var keyword = $(element).val();
      this.search(keyword);
      return false;
    },

    "#searchInput focus": function(element, event) {
      this.renderMain();
      this.showMain();
    },

    /**
     * @author zhang.ke
     * @description 取消按钮
     */
    "#search-cancel-btn click": function(element, event) {
      this.hideMain();
    },

    /**
     * @author zhang.ke
     * @description 跳转到搜索结果页
     */
    "[role=gotoSearch] click": function(element, event) {
      var keyword = $(element).text();
      this.search(keyword);
    },

    "#clearHistoriesBtn click": function(element, event) {
      store.remove(STORE_HISTORY_LIST);
      this.renderData.attr("historyList.data", null);
      this.renderData.attr("hotKeywordList.show", true);
    },

    search: function(keyword) {
      keyword = keyword.replace(/(^\s*)|(\s*$)/g, "")
      if (!keyword) {
        return false;
      }
      this.saveHistories(keyword);
      this.gotoSearchPage(keyword);
    },

    /**
     * @author zhang.ke
     * @description 跳转到搜索结果页
     */
    gotoSearchPage: function(keyword) {
      var params = can.deparam(window.location.search.substr(1));
      var href = ["/search.html?keyword=", keyword]
      //获取存储页数
      var pfs = params.pfs;
      if (pfs) {
        href.push("&pfs=");
        href.push(pfs);
      }

      window.location.href = href.join("");
    },

    /**
     * @author zhang.ke
     * @description 将关键字添加到store中的搜索历史
     */
    saveHistories: function(keyword) {
      var histories;
      if (!this.renderData.historyList.data) {
        histories = [];
      } else {
        histories = this.renderData.historyList.data.serialize();
      }
      histories.splice(0, 0, keyword);
      if (histories.length > HISTORY_SIZE) {
        histories = histories.slice(0, HISTORY_SIZE);
      }
      store.set(STORE_HISTORY_LIST, histories);
    }

  });
});