'use strict';

/**
 * @author zhang.ke
 */

define('sf.b2c.mall.search.searchinput', [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.api.search.hotKeywords',
    "text!template_search_searchinput"
  ],
  function($, can, _, store, SFLoading, SFHotKeywords, template_search_searchinput) {

  var STORE_HISTORY_LIST = "searchhistories";
  var HISTORY_SIZE = 10;
  var KEYWORD_SIZE = 10;

  return can.Control.extend({

  	loading: new SFLoading(),

    helpers: {
      'sf-firstImg': function(imageList, options) {
      }
    },

    renderData: new can.Map({
      historyList: null,
      hotKeywordList: null
    }),

    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
      this.loading.show();
      this.render();
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
    			that.renderData.attr("hotKeywordList", result.value);
    		});
    },

		/**
     * @author zhang.ke
     * @description 获取store中history数据
     * @param searchData
     */
    initHistories: function() {
    	var that = this;
			that.renderData.attr("historyList", store.get(STORE_HISTORY_LIST));
    },

    render: function() {
      var that = this;
      
      this.initHistories();
      can.when(this.initHotKeywords())
        .done(function() {
          that.renderHtml();
        })
        .always(function() {
          that.loading.hide();
        });


    }, 

    /**
     * @author zhang.ke
     * @description 渲染html
     * @param data
     */
    renderHtml: function(data) {
      //渲染页面
      var renderFn = can.mustache(template_search_searchinput);
      var html = renderFn(data || this.renderData, this.helpers);
      this.element.html(html);
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
      this.saveHistories(keyword);
      this.gotoSearchPage(keyword);
    },

    /**
     * @author zhang.ke
     * @description 取消按钮即返回上一页
     */
    "#searchCancelLink click": function(element, event) {
      window.history.back();
    },

    /**
     * @author zhang.ke
     * @description 跳转到搜索结果页
     */
    "[role=gotoSearch] click": function(element, event) {
      var keyword = $(element).text();
      this.gotoSearchPage(keyword);
    },

    "#clearHistoriesBtn click": function(element, event) {
      store.remove(STORE_HISTORY_LIST);
      this.renderData.attr("historyList", null);
    },

    /**
     * @author zhang.ke
     * @description 跳转到搜索结果页
     */
    gotoSearchPage: function(keyword) {
      window.location.href = "/search.html?keyword=" + keyword;
    },

    /**
     * @author zhang.ke
     * @description 将关键字添加到store中的搜索历史
     */
    saveHistories: function(keyword) {
      var histories;
      if (!this.renderData.historyList) {
        histories = [];
      } else {
        histories = this.renderData.historyList.serialize();
      }
      histories.splice(0, 0, keyword);
      if (histories.length > HISTORY_SIZE) {
        histories = histories.slice(0, HISTORY_SIZE);
      }
      store.set(STORE_HISTORY_LIST, histories);
    }
  });
})
