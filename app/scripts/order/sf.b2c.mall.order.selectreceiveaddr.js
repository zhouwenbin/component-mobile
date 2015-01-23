'use strict';

define('sf.b2c.mall.order.selectreceiveaddr', [
  'can',
  'zepto',
  'sf.b2c.mall.api.user.getIDCardUrlList',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.adapter.address.list',
  'sf.b2c.mall.component.addreditor',
  'sf.b2c.mall.api.user.webLogin',
  'md5'
], function(can, $, SFGetIDCardUrlList, SFGetRecAddressList, AddressAdapter, SFAddressEditor, SFUserWebLogin, md5) {
  return can.Control.extend({

    /**
     * 初始化
     * @param  {DOM} element 容器element
     * @param  {Object} options 传递的参数
     */
    init: function(element, options) {
      this.adapter4List = {};
      this.component = {};
      this.paint();
    },

    render: function(data) {
      var html = can.view('templates/order/sf.b2c.mall.order.selectrecaddr.mustache', data);
      this.element.html(html);
    },

    paint: function(data) {

      //针对单页应用进行控制
      $(".sf-b2c-mall-order-selectReceiveAddress").show();
      $(".sf-b2c-mall-order-itemInfo").show();
      $(".sf-b2c-mall-order-addAdrArea").hide();

      var that = this;

      var getRecAddressList = new SFGetRecAddressList();
      var getIDCardUrlList = new SFGetIDCardUrlList();

      can.when(getRecAddressList.sendRequest(), getIDCardUrlList.sendRequest())
        .done(function(recAddrs, recPersons) {

          var result = [];

          //取得默认的收货人和收货地址
          _.each(recAddrs.items, function(recAddrItem) {
            _.each(recPersons.items, function(presonItem) {
              if (recAddrItem.isDefault != 0 && presonItem.isDefault != 0) {
                recAddrItem.recName = presonItem.recName;
                recAddrItem.credtNum = presonItem.credtNum;
                result.push(recAddrItem);
              }
            })
          })

          //取得关联的收货人和收货地址（为啥要遍历两次：因为要确保默认收货人和收货地址放在第一条）
          _.each(recAddrs.items, function(recAddrItem) {
            _.each(recPersons.items, function(presonItem) {
              if (recAddrItem.recId == presonItem.recId && recAddrItem.isDefault == 0 && presonItem.isDefault == 0) {
                recAddrItem.recName = presonItem.recName;
                recAddrItem.credtNum = presonItem.credtNum;
                result.push(recAddrItem);
              }
            })
          })

          debugger;
          //获得地址列表
          that.adapter4List.addrs = new AddressAdapter({
            addressList: result || []
          });

          that.adapter4List.addrs.showMore = (result.length > 3);

          //进行渲染
          that.render(that.adapter4List.addrs);

          //初始化进行回调绑定
          that.component.addressEditor = new SFAddressEditor('.sf-b2c-mall-order-addAdrArea', {
            onSuccess: _.bind(that.paint, that)
          });

          //绑定事件
          $('.sf-b2c-mall-order-addAdrArea').tap(function() {
            that.addRecaddrClick($(this));
          })

        })
        .fail(function(error) {
          console.error(error);
        })
    },

    /**
     * [getSelectedAddr 获得选中的收货地址]
     * @return {[type]} [description]
     */
    getSelectedAddr: function() {debugger;
      var index = $("#addrList").find("li.active").eq(0).attr('data-index');
      if (typeof index == 'undefined') {
        return false;
      }
      return this.adapter4List.addrs.get(index);
    },

    /**
     * [description 点击编辑]
     * @param  {[type]} element
     * @param  {[type]} event
     * @return {[type]}
     */
    addRecaddrClick: function(element) {
      $(".sf-b2c-mall-order-selectReceiveAddress").hide();
      $(".sf-b2c-mall-order-itemInfo").hide();
      $(".sf-b2c-mall-order-addAdrArea").show();
      this.component.addressEditor.show("create", null, $(".sf-b2c-mall-order-addAdrArea"));

      return false;
    }
  });
})