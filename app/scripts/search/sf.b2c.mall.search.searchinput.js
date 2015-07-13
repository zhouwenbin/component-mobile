'use strict';

define('sf.b2c.mall.search.searchinput', [
    'zepto',
    'can',
    'underscore',
    'store',
    'zepto.cookie',
    'sf.helpers',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.api.search.hotKeywords',
    "text!template_search_searchinput"
  ],
  function($, can, _, store, cookie, helpers, SFComm, SFConfig,
           SFLoading, SFHotKeywords,
           template_search_searchinput) {
  return can.Control.extend({

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
    	new SFLoading();
    	this.initHotKeywords();
    },

		/**
     * @description 从服务器端获取数据
     * @param searchData
     */
    initHotKeywords: function() {
    	var that = this;
    	var SFHotKeywords = new SFHotKeywords({size: 10});
    	return SFHotKeywords.sendRequest()
    		.done(function(hotKeywords) {
    			that.renderData.attr("hotKeywordList", hotKeywords);
    		});
    },

    render: function(shopId) {
      var that = this;
      can.when(this.initSearchShopInfo(shopId))
        .done(function(){
          that.renderHtml();
        })
        .fail(function() {
          that.goto404();
        });
    },

    /**
     * @description 渲染html
     * @param data
     */
    renderHtml: function(data) {
      //渲染页面
      var renderFn = can.mustache(template_shop_detail);
      var html = renderFn(data || this.renderData, this.helpers);
      this.element.html(html);
    }
  });
})
