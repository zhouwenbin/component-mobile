'use strict';

define('sf.b2c.mall.component.addreditor', [
  'can',
  'zepto',
  'sf.b2c.mall.adapter.regions',
  'sf.b2c.mall.api.user.createRecAddress',
  'sf.b2c.mall.api.user.createReceiverInfo',
  'sf.b2c.mall.api.user.updateRecAddress',
  'sf.b2c.mall.business.config',
  'sf.b2c.mall.widget.message'
], function(can, $, RegionsAdapter, SFCreateRecAddress, SFCreateReceiverInfo, SFUpdateRecAddress, SFConfig, SFMessage) {

  return can.Control.extend({
    init: function() {
      this.adapter = {};
      this.request();
      this.onSuccess = this.options.onSuccess;
    },

    request: function() {
      var that = this;
      return can.ajax({url: '/json/sf.b2c.mall.regions.json'})
        .done(_.bind(function(cities) {
          this.adapter.regions = new RegionsAdapter({
            cityList: cities
          });
        }, this))
        .fail(function(error) {

        });
    },

    /**
     * @description 对页面进行渲染
     * @param  {Map} data 渲染页面的数据
     */
    render: function(data, tag, element) {
      this.setup(element);
      var html = can.view('templates/component/sf.b2c.mall.component.addreditor.mustache', data);
      element.html(html);

      this.supplement(tag);
    },

    /**
     * @description 对页面进行补充处理
     */
    supplement: function(tag) {
      if (tag == 'create') {
        this.changeCity();
        this.changeRegion();
      }
    },
    "#addressSave click": function() {
      this.addressSaveClick();
    },
    "#backToOrder click": function() {
      can.route.attr('tag', 'init');
      $(".order").show();
      $(".order-manager").show();
      $(".nav-c1, .nav-c2").show();
      $(".sf-b2c-mall-order-selectReceiveAddress").show();
      $(".sf-b2c-mall-order-itemInfo").show();
      $(".sf-b2c-mall-order-addAdrArea").hide();
      $(".sf-b2c-mall-order-editAdrArea").hide();
    },

    show: function(tag, data, element) {
      this.odata = data;
      var that = this;
      if (this.adapter.regions) {
        that._show.call(that, tag, data, element);
      } else {
        this.request().then(function() {
          that._show.call(that, tag, data, element);
        });
      }
    },

    _show: function(tag, params, element) {
      var map = {
        'create': function(data) {
          return {
            input: {
              addrId: null,
              nationName: '0',
              provinceName: '0',
              cityName: null,
              regionName: null,
              detail: null,
              recId: null,
              cellphone: null,
              recName: null,
              credtNum: null,
              receiverName:null,
              receiverId:null
            },
            place: {
              countries: [{
                id: 0,
                name: '中国'
              }],
              provinces: this.adapter.regions.findGroup(0),
              cities: null,
              regions: null
            },
            control: {
              add: false
            },
            mainTitle: {
              text: '添加收货地址'
            },
            cancle: {
              text: '取消添加'
            },
            error: null
          };
        },
        'editor': function(data) {
          var provinceId = this.adapter.regions.getIdByName(data.provinceName);
          var cityId = this.adapter.regions.getIdBySuperreginIdAndName(provinceId, data.cityName);
          return {
            input: {
              addrId: data.addrId,
              nationName: 0,
              provinceName: provinceId,
              cityName: cityId,
              regionName: this.adapter.regions.getIdBySuperreginIdAndName(cityId, data.regionName),
              detail: data.detail,
              cellphone: data.cellphone,
              recId: data.recId,
              recName: data.recName,
              credtNum: data.credtNum,
              credtNum2: data.credtNum2
            },
            place: {
              countries: [{
                id: 0,
                name: '中国'
              }],
              provinces: this.adapter.regions.findGroup(0),
              cities: this.adapter.regions.getGroupByName(data.provinceName),
              regions: this.adapter.regions.getGroupByName(data.cityName)
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
            error: null
          };
        }
      };
      var info = map[tag].call(this, params);
      this.adapter.addr = new can.Map(info);

      this.render(this.adapter, tag, element);
    },

    hide: function() {
      this.destroy();
    },

    clearComponents: function() {
      if (this.component.idList) {
        this.component.idList.destroy();
      }

      if (this.component.idEditor) {
        this.component.idEditor.destroy();
      }
    },

    changeCity: function() {
      var pid = this.adapter.addr.input.attr('provinceName');
      if (pid == 0) {
        this.adapter.addr.input.attr('cityName', '0');
        this.adapter.addr.place.attr('cities', '0');
      }else {
        var cities = this.adapter.regions.findGroup(window.parseInt(pid));
        this.adapter.addr.place.attr('cities', cities);
        this.adapter.addr.input.attr('cityName', cities[0].id);
      }
    },

    changeRegion: function() {
      var cid = this.adapter.addr.input.attr('cityName');
      if (cid == 0) {
        this.adapter.addr.input.attr('regionName', '0');
        this.adapter.addr.place.attr('regions', '0');
      }else{
        var regions = this.adapter.regions.findGroup(window.parseInt(cid));
        this.adapter.addr.place.attr('regions', regions);
        this.adapter.addr.input.attr('regionName', regions[0].id);
      }
    },

    '#s2 change': function(element, event) {
      this.changeCity();
      this.changeRegion();
    },

    /**
     * @description 城市发生变化，区同时发生变化
     * @param  {Dom}    element
     * @param  {Event}  event
     */
    '#s3 change': function(element, event) {
      this.changeRegion();
    },

    /**
     * @description 取消保存
     * @param  {Dom}    element
     * @param  {Event}  event
     */
    '#center-add-address-cancel-btn click': function(element, event) {
      event && event.preventDefault();
      this.element.empty();
    },

    add: function(addr) {
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
          //def.reject(error);
        })
        .then(function(){
          addr.recId = recId;
          var createRecAddress = new SFCreateRecAddress(addr);
          return createRecAddress.sendRequest()
        })
        .done(function(data) {
          that.onSuccess(data);
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
          return false;
        });
    },

    update: function(addr) {
      var that = this;

      var updateRecAddress = new SFUpdateRecAddress(addr);
      updateRecAddress
        .sendRequest()
        .done(function(data) {

          var message = new SFMessage(null, {
            'tip': '修改收货地址成功！',
            'type': 'success'
          });

          that.hide();
          that.onSuccess();
        })
        .fail(function(error) {});
    },

    '#paddressSaveCancel click': function(element, event) {
      // this.hide();
      this.element.hide();
      this.element.empty();
      $('#btn-add-addr').show();
      return false;
    },

    '#address focus': function(element, event) {
      event && event.preventDefault();
      $('#detailerror').hide();
    },
    '#cellphone focus': function(element, event) {
      event && event.preventDefault();
      $('#cellphoneerror').hide();
    },

    addressSaveClick: function(element, event) {
      event && event.preventDefault();

      $('.tel-hide').hide();

      $('.textarea').blur();
      $('.input').blur();

      var addr = this.adapter.addr.input.attr();

      var key;
      for (key in addr) {
        addr[key] = _.str.trim(addr[key]);
      }

      addr.nationName = '中国';
      addr.provinceName = this.adapter.regions.findOneName(window.parseInt(addr.provinceName));
      addr.cityName = this.adapter.regions.findOneName(window.parseInt(addr.cityName));
      addr.regionName = this.adapter.regions.findOneName(window.parseInt(addr.regionName));

      //验证是否选择省市区
      if(typeof addr.provinceName == 'undefined' || typeof addr.cityName == 'undefined' || typeof addr.regionName == 'undefined'){

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
      if (testRecName && !isReceiverName) {} else {

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

      if (addr.credtNum == this.odata.credtNum) {
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

      if (addr.addrId) {
        this.update(addr);
      } else {
        var result = this.add(addr);
        if (result) {


        }
      }
    }
  });
})