'use strict';

define('sf.b2c.mall.component.recaddrmanage', [
  'can',
  'zepto',
  'fastclick',
  'sf.b2c.mall.business.config',
  'sf.b2c.mall.api.user.getIDCardUrlList',
  'sf.b2c.mall.api.user.getRecAddressList',
  'sf.b2c.mall.adapter.regions',
  'sf.b2c.mall.adapter.address.list',
  'sf.b2c.mall.widget.message',
  'sf.b2c.mall.widget.loading',
  'sf.b2c.mall.component.addreditor',
  'sf.b2c.mall.component.addrcreate',
  'sf.b2c.mall.component.addrdetail',
  'text!template_component_recaddrmanage'
], function(can, $, Fastclick, SFConfig,
  SFGetIDCardUrlList, SFGetRecAddressList, 
  RegionsAdapter, AddressAdapter, SFMessage, SFLoading, 
  SFAddressEditor, SFAddressCreate, SFAddressDetail, 
  template_component_recaddrmanage) {

  can.route.ready();
  var DEFAULT_INIT_TAG = 'init';

  return can.Control.extend({

    adapter4List: {},
    widgetLoading: new SFLoading(),

    init: function(data) {

      this.widgetLoading.show();

      //如果tag为init，则要进行单独处理，防止刷新
      var tag = can.route.attr('tag');

      this.initRender.call(this, tag || DEFAULT_INIT_TAG);
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

          var result = that.queryAddress(recAddrs, recPersons);

          //获得地址列表
          that.adapter4List.addrs = new AddressAdapter({
            addressList: result || []
          });

          var renderFn = can.mustache(template_component_recaddrmanage);
          var html =  renderFn(that.adapter4List);

          that.element.html(html);

          //初始化进行回调绑定
          that.addressEditor = new SFAddressEditor('.sf-b2c-mall-order-editAdrArea', {
            onSuccess: _.bind(function(){
              can.route.attr('tag', 'detailaddr');
            }, this)
          });
          that.addressDetail = new SFAddressDetail('.sf-b2c-mall-order-adrDetailArea', {
            onSuccess: _.bind(function(){
              can.route.attr('tag', 'init');
            }, this)
          });
          that.addressCreate = new SFAddressCreate('.sf-b2c-mall-order-editAdrArea', {
            onSuccess: _.bind(function(){
              can.route.attr('tag', 'init');
            }, this)
          });

        })
        .fail(function(error) {
          console.error(error);
        })
        .always(function() {
          that.widgetLoading.hide();
        });
    },

    '{can.route} change': function() {
      var tag = can.route.attr('tag') || DEFAULT_INIT_TAG;

      this.initRender.call(this, tag, this.data);
    },

    renderMap: {
      'init': function(data) {
        this.render();
      },

      'detailaddr': function(data) {
        if (!data || !this.addressEditor) {
          return can.route.attr('tag', 'init');
        }

        this.hideAddrManage();
        this.addressDetail.show("detail", this.data, $(".sf-b2c-mall-order-adrDetailArea"));
      },

      'editaddr': function(data) {
        if (!data || !this.addressEditor) {
          return can.route.attr('tag', 'init');
        }

        this.hideAddrManage();
        this.addressEditor.show("editor", this.data, $(".sf-b2c-mall-order-editAdrArea"));
      },

      'addaddr': function(data) {
        if (!this.addressEditor) {
          return can.route.attr('tag', 'init');
        }

        this.hideAddrManage();
        this.addressCreate.show("create", this.data, $(".sf-b2c-mall-order-editAdrArea"));
      }
    },

    hideAddrManage: function() {
      $(".sf-b2c-mall-order-addrListArea").hide();
    },

    initRender: function(tag, data) {
      var params = can.deparam(window.location.search.substr(1));
      var fn = this.renderMap[tag];
      if (_.isFunction(fn)) {
        fn.call(this, data);
      }
    },

    "[role=detail] click": function(element, event) {
      event && event.preventDefault();

      var index = $(element).data("index");
      this.data = this.adapter4List.addrs.addressList[index];
      can.route.attr('tag', 'detailaddr');
    },

    "[role=addrecaddr] click": function(element, event) {
      event && event.preventDefault();
      can.route.attr('tag', 'addaddr');
    },

    /** 获得收获人和收获地址 */
    queryAddress: function(recAddrs, recPersons) {
      var result = new Array();

      //取得默认的收货人和收货地址
      var defaultRecAddrID = null;
      var defaultRecID = null;
      _.each(recAddrs.items, function(recAddrItem) {
        _.each(recPersons.items, function(presonItem) {
          if (recAddrItem.isDefault != 0 && recAddrItem.recId == presonItem.recId) {
            recAddrItem.recName = presonItem.recName;
            recAddrItem.credtNum = presonItem.credtNum;
            recAddrItem.credtNum2 = presonItem.credtNum2;
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
              tempObje.credtNum2 = presonItemTemp.credtNum2;

              result.push(tempObje);
            }

          }
        })
      })

      return result;
    },

  });
})