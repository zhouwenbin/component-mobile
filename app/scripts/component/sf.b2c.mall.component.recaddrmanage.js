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
  'sf.b2c.mall.business.config',
  'sf.b2c.mall.component.addreditor',
  'text!template_component_recaddrmanage'


], function(can, $, Fastclick, SFDelRecAddress, SFDelRecvInfo, SFGetIDCardUrlList, SFGetRecAddressList, RegionsAdapter, AddressAdapter, SFMessage, SFConfig, SFAddressEditor, template_component_recaddrmanage) {

  can.route.ready();
  var DEFAULT_INIT_TAG = 'init';

  return can.Control.extend({

    init: function(data) {
      this.adapter4List = {};

      //如果tag为init，则要进行单独处理，防止刷新
      var tag = can.route.attr('tag');
      if (tag === DEFAULT_INIT_TAG) {
        this.initRender(DEFAULT_INIT_TAG);
      } else {
        can.route.attr('tag', DEFAULT_INIT_TAG);
      }
    },

    /**
     * @description 对页面进行渲染
     * @param  {Map} data 渲染页面的数据
     */
    render: function(tag) {
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

          var html = can.view(template_component_recaddrmanage, that.adapter4List.addrs);
          that.element.html(html);

          //绑定事件
          $('.delete').click(function() {
            that.deleteRecAddrClick($(this));
          })

          // $('.edit').click(function() {
          //   that.editRecAddrClick($(this));
          // })

          $('.loadingDIV').hide();

          //初始化进行回调绑定
          that.addressEditor = new SFAddressEditor('.sf-b2c-mall-order-editAdrArea', {
            onSuccess: _.bind(that.render, that)
          });

        })
        .fail(function(error) {
          console.error(error);
          $('.loadingDIV').hide();
        })
    },

    '{can.route} change': function() {
      var tag = can.route.attr('tag') || DEFAULT_INIT_TAG;

      this.initRender.call(this, tag, this.data);
    },

    renderMap: {
      'init': function(data) {
        this.render();
      },

      'editaddr': function(data) {
        $(".order-manager").hide();
        this.addressEditor.show("editor", this.data, $(".sf-b2c-mall-order-editAdrArea"));
      },

      'addaddr': function(data) {
        $(".order-manager").hide();
        this.addressEditor.show("create", this.data, $(".sf-b2c-mall-order-editAdrArea"));
      }
    },

    initRender: function(tag, data) {
      var params = can.deparam(window.location.search.substr(1));
      var fn = this.renderMap[tag];
      if (_.isFunction(fn)) {
        fn.call(this, data);
      }
    },

    ".edit click": function(element, event) {
      var index = element[0].dataset["index"];
      this.data = this.adapter4List.addrs.addressList[index];
      can.route.attr('tag', 'editaddr');

      return false;
    },

    ".addrecaddr click": function(element, event) {
      can.route.attr('tag', 'addaddr');

      return false;
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

            if (recAddrItemTemp.addrId != defaultRecAddrID) {
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