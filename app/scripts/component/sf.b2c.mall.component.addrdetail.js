'use strict';

define('sf.b2c.mall.component.addrdetail', [
  'can',
  'zepto',
  'sf.b2c.mall.business.config',
  'sf.b2c.mall.widget.message',
  "sf.b2c.mall.widget.bubble",
  'sf.b2c.mall.api.user.setDefaultAddr',
  'sf.b2c.mall.api.user.setDefaultRecv',
  'sf.b2c.mall.api.user.delRecAddress',
  'sf.b2c.mall.api.user.delRecvInfo',
  'text!template_component_addrdetail'
], function(can, $, SFConfig, SFMessage, SFBubble,
	SFSetDefaultAddr, SFSetDefaultRecv, SFDelRecAddress, SFDelRecvInfo,
	template_component_addrdetail) {

  return can.Control.extend({
    init: function() {
      this.onSuccess = this.options.onSuccess;
    },

    /**
     * @description 对页面进行渲染
     * @param  {Map} data 渲染页面的数据
     */
    render: function(data, tag, element) {
      this.setup(element);
      var renderFn = can.mustache(template_component_addrdetail);
      
      var html = renderFn(data);
      element.html(html);

      this.supplement(tag);
    },

    /**
     * @description 对页面进行补充处理
     */
    supplement: function(tag) {
    },
    
    "[role=edit] click": function(element, event) {
      can.route.attr('tag', 'editaddr');
      $(".sf-b2c-mall-order-adrDetailArea, .sf-b2c-mall-order-addrListArea").hide();
    },
    
    "[role=default] click": function(element, event) {
      var that = this;
      var addr = this.odata;

      var setDefaultRecv = new SFSetDefaultRecv({
        "recId": addr.recId
      });

      var setDefaultAddr = new SFSetDefaultAddr({
        "addrId": addr.addrId
      });
      can.when(setDefaultRecv.sendRequest(), setDefaultAddr.sendRequest())
        .done(function(data){
          new SFBubble(null, {
            "message":'设为默认地址成功！', 
            "tick" :3000}
            );
        });
    },

    show: function(tag, data, element) {
      this.odata = data;
      var that = this;
    	that._show.call(that, tag, data, element);
      $(".sf-b2c-mall-order-adrDetailArea").show();
      $(".sf-b2c-mall-order-editAdrArea").hide();
    },

    _show: function(tag, params, element) {
      var map = {
        'detail': function(data) {
          return {
            input: {
              addrId: data.addrId,
              nationName: data.nationName,
              provinceName: data.provinceName,
              cityName: data.cityName,
              regionName: data.regionName,
              detail: data.detail,
              cellphone: data.cellphone,
              recId: data.recId,
              recName: data.recName,
              credtNum: data.credtNum,
              credtNum2: data.credtNum2
            },
            control: {
              add: false
            },
            mainTitle: {
              text: '修改收货地址'
            },
            cancle: {
              text: '取消修改'
            },
            error: null,
            isDefault: data.isDefault
          };
        }
      };
      var info = map[tag].call(this, params);

      this.render({addr: new can.Map(info)}, tag, element);
    },

    "[role=delete] click": function(){
      var that = this;
      var message = new SFMessage(null, {
        'tip': '确认要删除该收货地址信息吗？',
        'type': 'confirm',
        'okFunction': _.bind(this.delAddress, this, this.odata)
      });
    },

    delAddress: function(address) {
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
            can.route.attr('tag', 'init');
          }
        })
        .fail(function(error, resulterror) {
          console.error(error);
            can.route.attr('tag', 'init');
        })
    },
  });
})