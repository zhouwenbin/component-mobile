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

      var user4Login = {
        accountId: 'jiyanliang@sf-express.com',
        type: 'MAIL',
        password: md5('123456' + 'www.sfht.com')
      };

      var webLogin = new SFUserWebLogin(user4Login);
      webLogin
        .sendRequest()
        .done(function() {

          can.when(getRecAddressList.sendRequest(), getIDCardUrlList.sendRequest())
            .done(function(reAddrs, recPersons) {
              debugger;
              //获得地址列表
              that.adapter4List.addrs = new AddressAdapter({
                addressList: reAddrs.items || [],
                personList: recPersons.items || [],
              });

              //进行渲染
              that.render(that.adapter4List.addrs);

              //初始化进行回调绑定
              that.component.addressEditor = new SFAddressEditor('.sf-b2c-mall-order-addAdrArea', {
                onSuccess: _.bind(that.paint, that)
              });

              //绑定事件
              $('.addrecaddr').tap(function() {
                that.addRecaddrClick($(this));
              })

            })
            .fail(function(error) {
              console.error(error);
            })

        })
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
      $(".sf-b2c-mall-order-selectReceiveAddress").hide();
      $(".sf-b2c-mall-order-itemInfo").hide();
      $(".sf-b2c-mall-order-addAdrArea").show();
      this.component.addressEditor.show("create", null, $(".sf-b2c-mall-order-addAdrArea"));

      return false;
    }
  });
})