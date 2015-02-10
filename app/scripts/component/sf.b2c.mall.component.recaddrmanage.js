'use strict';

define('sf.b2c.mall.component.recaddrmanage', [
  'can',
  'zepto',
  'fastclick',
  'sf.b2c.mall.api.user.delRecAddress',
  'sf.b2c.mall.api.user.delRecvInfo',
  'sf.b2c.mall.api.user.getIDCardUrlList',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.adapter.regions',
  'sf.b2c.mall.adapter.address.list',
  'sf.b2c.mall.widget.message',
  'sf.b2c.mall.business.config'


], function(can, $, Fastclick, SFDelRecAddress, SFDelRecvInfo, SFGetIDCardUrlList, SFGetRecAddressList, RegionsAdapter, AddressAdapter, SFMessage, SFConfig) {

  return can.Control.extend({

    init: function(data) {
      this.adapter4List = {};
      this.render(data);
    },

    /**
     * @description 对页面进行渲染
     * @param  {Map} data 渲染页面的数据
     */
    render: function(data) {
      var that = this;

      var getRecAddressList = new SFGetRecAddressList();
      var getIDCardUrlList = new SFGetIDCardUrlList();

      can.when(getRecAddressList.sendRequest(), getIDCardUrlList.sendRequest())
        .done(function(recAddrs, recPersons) {

          that.result = that.queryAddress(recAddrs, recPersons);

          //获得地址列表
          that.adapter4List.addrs = new AddressAdapter({
            addressList: that.result || []
          });

          var html = can.view('templates/component/sf.b2c.mall.component.recaddrmanage.mustache', that.adapter4List.addrs);
          that.element.html(html);

          //绑定事件
          $('.delete').click(function() {
            that.deleteRecAddrClick($(this));
          })

          $('.loadingDIV').hide();

        })
        .fail(function(error) {
          console.error(error);
          $('.loadingDIV').hide();
        })
    },

    deleteRecAddrClick: function(element, event) {
      event && event.preventDefault();
      var index = element.data('index');
      var address = this.adapter4List.addrs.get(index);

      var that = this;
      var message = new SFMessage(null, {
        'tip': '确认要删除该收货地址信息吗？',
        'type': 'confirm',
        'okFunction': _.bind(that.delAddress, that, element, address)
      });
    },

    delAddress: function(element, address) {
      var that = this;

      var delRecAddress = new SFDelRecAddress({
        "addrId": address.addrId
      });

      var delRecvInfo = new SFDelRecvInfo({
        "recId": address.recId
      });

      can.when(delRecAddress.sendRequest())
        .done(function(data) {
          if (data.value) {
            that.render();
          }
        })
        .fail(function(error, resulterror) {
          console.error(error);
          that.render();
        })
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
      var tempObje = {};
      _.each(recAddrs.items, function(recAddrItemTemp) {
        _.each(recPersons.items, function(presonItemTemp) {
          if (recAddrItemTemp.recId == presonItemTemp.recId && (recAddrItemTemp.isDefault == 0 || presonItemTemp.isDefault == 0) && recAddrItemTemp.recId != 0 && presonItemTemp.recId != 0) {

            if (recAddrItemTemp.addrId != defaultRecAddrID && recAddrItemTemp.recId != defaultRecID) {
              tempObje = recAddrItemTemp;
              tempObje.recName = presonItemTemp.recName;
              tempObje.credtNum = presonItemTemp.credtNum;

              result.push(tempObje);
            }

          }
        })
      })

      return result;
    },

  });
})