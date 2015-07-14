'use strict';

define('sf.b2c.mall.component.addrcreate', [
  'can',
  'zepto',
  'sf.b2c.mall.business.config',
  'sf.b2c.mall.widget.message',
  'sf.b2c.mall.widget.region',
  'sf.b2c.mall.api.user.createRecAddress',
  'sf.b2c.mall.api.user.createReceiverInfo',
  'text!template_component_addrcreate'
], function(can, $, SFConfig, SFMessage, SFRegion,
  SFCreateRecAddress, SFCreateReceiverInfo,  
  template_component_addrcreate) {

  return can.Control.extend({

    renderData: null,
    init: function() {
      this.onSuccess = this.options.onSuccess;
    },

    request: function() {
      var that = this;
    },

    /**
     * @description 对页面进行渲染
     * @param  {Map} data 渲染页面的数据
     */
    render: function(data, tag, element) {
      this.setup(element);
      var renderFn = can.mustache(template_component_addrcreate);
      
      var html = renderFn(data);
      element.html(html);
    },

    "#addressSaveCreate click": function(element, event) {
      var result = this.addressSaveClick(element, event);
      if (result === false) {
        element.removeClass("btn-disable");
      }
    },

    show: function(tag, data, element) {
      this.odata = data;
      var that = this;

      that._show.call(that, tag, data, element);

      $(".sf-b2c-mall-order-editAdrArea").show();
      $(".sf-b2c-mall-order-adrDetailArea").hide();
    },

    _show: function(tag, params, element) {
      var info = {
        input: {
          addrId: null,
          nationName: null,
          provinceName: null,
          cityName: null,
          regionName: null,
          detail: null,
          recId: null,
          cellphone: null,
          recName: null,
          credtNum: null,
          receiverName:null,
          receiverId:null,
          isDefault: 0
        },
        error: null
      };
      this.renderData = new can.Map({"addr" :info});

      this.render(this.renderData, tag, element);
    },

    addressSaveClick: function(element, event) {
      event && event.preventDefault();

      //防止重复提交
      if (element.hasClass("btn-disable")) {
        return false;
      } 

      element.addClass("btn-disable");

      $('.textarea').blur();
      $('.input').blur();

      var addr = this.renderData.addr.input.attr();
      addr.receiverName = addr.recName;
      addr.receiverId = addr.credtNum2;

      for (var key in addr) {
        addr[key] = _.str.trim(addr[key]);
      }

      if (!this.validateForm(addr)) {
        return false;
      }

    	var result = this.add(addr, element);
    },

    validateForm: function(addr) {
      //验证是否选择省市区
      if(addr.provinceName == '' 
        || addr.cityName == '' 
        || addr.regionName == ''){

        var message = new SFMessage(null, {
          'tip': '请选择收货地区',
          'type': 'error'
        });

        return false;
      }

      if (!addr.recName) {

        var message = new SFMessage(null, {
          'tip': '请填写收货人姓名！',
          'type': 'error'
        });

        return false;
      }
      var testRecName = /^[\u4e00-\u9fa5]{0,10}$/.test($.trim(addr.recName));
      var isReceiverName =  /先生|女士|小姐/.test($.trim(addr.receiverName));
      if (!testRecName || isReceiverName) {
        var message = new SFMessage(null, {
          'tip': '由于海关发货需要实名制的信息，请您输入真实姓名。感谢您的配合!',
          'type': 'error'
        });

        return false;
      }

      if (!addr.credtNum) {
        var message = new SFMessage(null, {
          'tip': '请填写收货人身份证号码！',
          'type': 'error'
        });

        return false;
      }

      if (this.odata && this.odata.credtNum && addr.credtNum == this.odata.credtNum) {
        addr.credtNum = this.odata.credtNum2
      }

      if (addr.credtNum.length < 18 || addr.credtNum.length > 18) {

        var message = new SFMessage(null, {
          'tip': '收货人身份证号码填写有误！',
          'type': 'error'
        });

        return false;
      }

      var info = {};
      var cardNo = addr.credtNum;
      if (cardNo.length == 18) {
        var year = cardNo.substring(6, 10);
        var month = cardNo.substring(10, 12);
        var day = cardNo.substring(12, 14);
        var p = cardNo.substring(14, 17)
        var birthday = new Date(year, parseFloat(month) - 1,
          parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题
        if (birthday.getFullYear() != parseFloat(year) || birthday.getMonth() != parseFloat(month) - 1 || birthday.getDate() != parseFloat(day)) {
          info.isTrue = false;
        }
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
        var Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
        // 验证校验位
        var sum = 0; // 声明加权求和变量
        var _cardNo = cardNo.split("");
        if (_cardNo[17].toLowerCase() == 'x') {
          _cardNo[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
        }
        for (var i = 0; i < 17; i++) {
          sum += Wi[i] * _cardNo[i]; // 加权求和
        }
        var i = sum % 11; // 得到验证码所位置
        if (_cardNo[17] != Y[i]) {
          info.isTrue = false;
        } else {
          info.isTrue = true;
        }
        info.year = birthday.getFullYear();
        info.month = birthday.getMonth() + 1;
        info.day = birthday.getDate();
        if (p % 2 == 0) {
          info.isFemale = true;
          info.isMale = false;
        } else {
          info.isFemale = false;
          info.isMale = true
        }

      }
      if (!info.isTrue) {

        var message = new SFMessage(null, {
          'tip': '收货人身份证号码填写有误！',
          'type': 'error'
        });

        return false;
      }

      if (!addr.cellphone) {

        var message = new SFMessage(null, {
          'tip': '请填写收货人手机号码！',
          'type': 'error'
        });

        return false;
      }

      //验证详细地址
      if (!addr.detail) {

        var message = new SFMessage(null, {
          'tip': '请填写详细地址信息！',
          'type': 'error'
        });

        return false;
      }

      // 不能含有<>'"
      var isDetailInvalid = /[<>'"]/.test($.trim(addr.detail));
      if (isDetailInvalid) {

        var message = new SFMessage(null, {
          'tip': '亲，您的收货地址输入有误，不能含有< > \' \" 等特殊字符！',
          'type': 'error'
        });

        return false;
      }

      // 5~60字符之间
      if (addr.detail.length > 60 || addr.detail.length < 5) {

        var message = new SFMessage(null, {
          'tip': '亲，您的收货地址输入有误，长度需介于5到60之间！',
          'type': 'error'
        });

        return false;
      }

      //电话号码正则验证（以1开始，11位验证）)
      if (!/^1\d{10}$/.test(addr.cellphone)) {

        var message = new SFMessage(null, {
          'tip': '收货人手机号码填写有误！',
          'type': 'error'
        });

        return false;
      }

      return true;
    },

    add: function(addr, element) {
      var that = this;

      var person = {
        recName: addr.recName,
        type: "ID",
        credtNum: addr.credtNum
      };

      var recId = null;
      var createReceiverInfo = new SFCreateReceiverInfo(person);

      createReceiverInfo
        .sendRequest()
        .done(function(data) {
          recId = data.value;
        })
        .fail(function(error) {
          if (error === 1000310) {
            new SFMessage(null, {
              "title": '顺丰海淘',
              'tip': '您已添加20条收货地址信息，请返回修改！',
              'type': 'error'
            });
          }
          element.removeClass("btn-disable");
          //def.reject(error);
        })
        .then(function(){
          addr.recId = recId;
          var createRecAddress = new SFCreateRecAddress(addr);
          return createRecAddress.sendRequest()
        })
        .done(function(data) {
          that.onSuccess(data);
          element.removeClass("btn-disable");
          return true;
        })
        .fail(function(error) {
          if (error === 1000310) {
            new SFMessage(null, {
              "title": '顺丰海淘',
              'tip': '您已添加20条收货地址信息，请返回修改！',
              'type': 'error'
            });
          }
          element.removeClass("btn-disable");
          return false;
        });
    },

    '#selectRegion click': function(element, event) {
      var that = this;
      $(".address-detail, .nav").hide();
      var region = new SFRegion('.address-region', {
          onFinish: _.bind(function(data){
            this.renderData.addr.input.attr({
              "nationName": data.nationName,
              "provinceName": data.provinceName,
              "cityName": data.cityName,
              "regionName": data.regionName
            })
            $(".address-detail, .nav").show();
          },that),
        }
      );
    },

    "#setDefaultCreate click": function(element, event) {
      if($(element).hasClass("active")) {
        $(element).removeClass("active");
        this.renderData.addr.input.attr("isDefault", 0);
      } else {
        $(element).addClass("active");
        this.renderData.addr.input.attr("isDefault", 1);
      }
    }
  });
})