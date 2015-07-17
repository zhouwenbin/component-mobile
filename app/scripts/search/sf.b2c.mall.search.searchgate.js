'use strict';

/**
 * @author zhang.ke
 */

define('sf.b2c.mall.search.searchgate', [
    'zepto',
    'can',
    'underscore',
    'store',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.widget.bubble',
    'sf.b2c.mall.api.search.hotKeywords',
    "text!template_search_searchgate"
  ],
  function($, can, _, store, SFLoading, SFBubble, SFHotKeywords, template_search_searchgate) {

  return can.Control.extend({


    helpers: {
    },

    renderData: new can.Map({
    }),

    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
    },

  });
})
