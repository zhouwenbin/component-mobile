'use strict';

define('sf.b2c.mall.order.selectreceiveaddr', [
  'can',
  'zepto',
  'sf.b2c.mall.api.user.getIDCardUrlList',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.api.user.webLogin',
  'sf.b2c.mall.adapter.address.list',
  'sf.b2c.mall.component.addreditor',
  'sf.b2c.mall.business.config',
  'sf.b2c.mall.order.iteminfo',
  'sf.b2c.mall.widget.message'
], function(can, $, SFGetIDCardUrlList, SFGetRecAddressList, SFUserWebLogin,
            AddressAdapter, SFAddressEditor, SFConfig, SFItemInfo, SFMessage) {

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
      $(".order").show();
      $(".nav-c1, .nav-c2").show();
      $(".sf-b2c-mall-order-selectReceiveAddress").show();
      $(".sf-b2c-mall-order-itemInfo").show();
      $(".sf-b2c-mall-order-addAdrArea").hide();

      var that = this;

      var getRecAddressList = new SFGetRecAddressList();
      var getIDCardUrlList = new SFGetIDCardUrlList();

      can.when(getRecAddressList.sendRequest(), getIDCardUrlList.sendRequest())
        .done(function(recAddrs, recPersons) {

          that.result = that.queryAddress(recAddrs, recPersons);

          //第一个默认为选中
          if (that.result.length > 0) {
            that.result[0].active = "active";
          }
          
          //获得地址列表
          that.adapter4List.addrs = new AddressAdapter({
            addressList: that.result.slice(0, 1) || []
          });

          //超过一条记录显示更多
          that.adapter4List.addrs.attr("showMore", that.result.length > 1);

          //进行渲染
          that.render(that.adapter4List.addrs);

          //初始化进行回调绑定
          that.component.addressEditor = new SFAddressEditor('.sf-b2c-mall-order-addAdrArea', {
            onSuccess: _.bind(that.paint, that)
          });

          //绑定事件 添加地址
          $('.addrecaddr').click(function() {
            if (that.result.length >= 20) {
              new SFMessage(null, {
                'tip': '很抱歉，每个账户最多可添加20条收货地址',
                'type': 'error'
              });
            }else{
              that.addRecaddrClick($(this));
            }
            
          });

          //点击查看更多
          $('#viewmore').click(function() {
            that.adapter4List.addrs.attr("addressList", that.result || []);
            that.adapter4List.addrs.attr("showMore", false);
          });

          that.initItemInfo();

        })
        .fail(function(error) {
          console.error(error);
        })
    },

    //初始化 itemInfo
    initItemInfo: function() {
      this.component.itemInfo = new SFItemInfo('.sf-b2c-mall-order-itemInfo', {
        addr: this.getSelectedAddr()
      });
    },

    /** 获得收获人和收获地址 */
    queryAddress: function(recAddrs, recPersons) {
      var result = new Array();

      //取得默认的收货人和收货地址
      var defaultRecAddrID = null;
      var defaultRecID = null;
      _.each(recAddrs.items, function(recAddrItem) {
        _.each(recPersons.items, function(presonItem) {
          if (recAddrItem.isDefault != 0 && presonItem.isDefault != 0 && recAddrItem.recId != 0 && presonItem.recId != 0) {
            recAddrItem.recName = presonItem.recName;
            recAddrItem.credtNum = presonItem.credtNum;
            result.push(recAddrItem);

            defaultRecAddrID = recAddrItem.addrId;
            defaultRecID = recAddrItem.recId;
          }
        })
      })

      //取得关联的收货人和收货地址（为啥要遍历两次：因为要确保默认收货人和收货地址放在第一条）
      _.each(recAddrs.items, function(recAddrItem) {
        _.each(recPersons.items, function(presonItem) {
          if (recAddrItem.recId == presonItem.recId && (recAddrItem.isDefault == 0 || presonItem.isDefault == 0) && recAddrItem.recId != 0 && presonItem.recId != 0) {
            if (recAddrItem.addrId != defaultRecAddrID) {
              recAddrItem.recName = presonItem.recName;
              recAddrItem.credtNum = presonItem.credtNum;
              result.push(recAddrItem);
            }
          }
        })
      })

      return result;
    },


    //选择收货地址
    "li.box-address click": function() {
      this.selectaddr(arguments[0]);
      this.initItemInfo();
    },
    selectaddr: function(element) {
      $('li.box-address').removeClass("active");
      element.addClass("active");
    },

    /**
     * [getSelectedAddr 获得选中的收货地址]
     * @return {[type]} [description]
     */
    getSelectedAddr: function() {
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
      $(".order").hide();
      $(".nav-c1, .nav-c2").hide();
      $(".sf-b2c-mall-order-itemInfo").hide();
      $(".sf-b2c-mall-order-addAdrArea").show();
      this.component.addressEditor.show("create", null, $(".sf-b2c-mall-order-addAdrArea"));

      return false;
    }
  });
})