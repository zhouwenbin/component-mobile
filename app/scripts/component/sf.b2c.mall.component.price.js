'use strict';
define('sf.b2c.mall.component.price', [
        'can',
        'underscore',
        'jquery',
        'sf.b2c.mall.api.b2cmall.getProductHotDataList'
    ],
    function (can, _, $, SFGetProductHotDataList) {
        var CONST_CN_CURRENCY_CHAR = '¥';
        return can.Control.extend({
            /**
             * [init description]
             * @param  {[type]} element
             * @param  {[type]} options
             * @return {[type]}
             */
            init: function (element, options) {
                this.data = {};
                this.render();
            },
            /**
             * [init description]
             * @return {[type]}
             */
            render: function () {
                this.showPriceModel();
            },

            showPriceModel: function () {
                var that = this;
                var itemIds = this.getItemList();
                if (_.isArray(itemIds) && itemIds.length > 0) {
                    can.when(this.requestItemList(itemIds))
                        .done(function (data) {
                            _.each(data.value, function (value, key, list) {
                                var $el = that.element.find('[data-itemId=' + value.itemId + ']');
                                var sellingPrice = value.originPrice / 100;
                                var originPrice = value.sellingPrice / 100;
                                var discount = (value.sellingPrice * 10 / value.originPrice).toFixed(1);
                                $el.find('.product-selling-price').text(CONST_CN_CURRENCY_CHAR + sellingPrice);
                                if (originPrice != 0 && sellingPrice < originPrice) {
                                    $el.find('.product-origin-price').text(CONST_CN_CURRENCY_CHAR + originPrice);
                                    $el.find('.product-discount').text('<span class="label-danger">' + discount + '折</span>');
                                }
                                if (value.status == 3) {//在售状态商品
                                    if (value.soldOut) {
                                        $el.find('.product-status').append('<div class="mask"><span class="icon icon4 center">售完</span></div>');
                                    }
                                } else {//不可售商品
                                }
                            });

                        })
                        .fail(function (errorCode) {

                        })
                }
            },

            getItemList: function () {
                var $el = this.element.find('[data-itemId]');
                var ids = [];

                _.each($el, function (el) {
                    var id = $(el).attr('data-itemId');
                    if (!_.isEmpty(id)) {
                        ids.push(window.parseInt(id));
                    }
                });

                return _.uniq(ids);
            },

            requestItemList: function (itemIds) {
                var request = new SFGetProductHotDataList({
                    itemIds: JSON.stringify(itemIds)
                });
                return request.sendRequest();
            }
        });
    }
)