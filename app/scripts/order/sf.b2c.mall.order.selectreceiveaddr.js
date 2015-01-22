'use strict';

define('sf.b2c.mall.order.selectreceiveaddr', [
  'can',
  'zepto',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.adapter.address.list',
  'sf.b2c.mall.component.addreditor',
  'sf.b2c.mall.api.user.webLogin',
  'md5'
], function(can, $, SFGetRecAddressList, AddressAdapter, SFAddressEditor, SFUserWebLogin, md5) {
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

    render: function(data) {debugger;
      var html = can.view('templates/order/sf.b2c.mall.order.selectrecaddr.mustache', data);
      this.element.html(html);
    },

    paint: function(data) {
      $(".sf-b2c-mall-order-selectReceiveAddress").show();
      $(".sf-b2c-mall-order-itemInfo").show();
      $(".sf-b2c-mall-order-addAdrArea").hide();

      var that = this;

      var getRecAddressList = new SFGetRecAddressList();

      var user4Login = {
        accountId: 'jiyanliang@sf-express.com',
        type: 'MAIL',
        password: md5('123456' + 'www.sfht.com')
      };

      var webLogin = new SFUserWebLogin(user4Login);

      webLogin
        .sendRequest()
        .done(function(loginResult) {})
        .fail(function(errorCode) {})
        .then(function() {
          return getRecAddressList.sendRequest()
        })
        .done(function(reAddrs) {
          //获得地址列表
          that.adapter4List.addrs = new AddressAdapter({
            addressList: reAddrs.items || [],
            hasData: false
          });

          if (that.adapter4List.addrs.addressList != null && that.adapter4List.addrs.addressList.length > 0) {
            that.adapter4List.addrs.addressList[0].attr("active", "active");
            that.adapter4List.addrs.attr("hasData", true);
          }

          //进行渲染
          that.render(that.adapter4List.addrs);

          that.component.addressEditor = new SFAddressEditor('.sf-b2c-mall-order-addAdrArea', {
             onSuccess: _.bind(that.paint, that)
          });

          $('.addrecaddr').tap(function() {
            that.addRecaddrClick($(this));
          })

        })
        .fail(function(error) {
          console.error(error);
        })
    },

    getCityList: function() {
      return can.ajax('json/sf.b2c.mall.regions.json');
    },

    /**
     * [description 点击编辑]
     * @param  {[type]} element
     * @param  {[type]} event
     * @return {[type]}
     */
    addRecaddrClick: function(element) {debugger;
      $(".sf-b2c-mall-order-selectReceiveAddress").hide();
      $(".sf-b2c-mall-order-itemInfo").hide();
      $(".sf-b2c-mall-order-addAdrArea").show();
      this.component.addressEditor.show("create", null, $(".sf-b2c-mall-order-addAdrArea"));

      return false;
    }
  });
})