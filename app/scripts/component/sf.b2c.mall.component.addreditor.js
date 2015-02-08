'use strict';

define('sf.b2c.mall.component.addreditor', [
  'can',
  'zepto',
  'fastclick',
  'sf.b2c.mall.adapter.regions',
  'sf.b2c.mall.api.user.createRecAddress',
  'sf.b2c.mall.api.user.createReceiverInfo',
  'sf.b2c.mall.api.user.updateRecAddress',
  'sf.b2c.mall.business.config'

], function(can, $, Fastclick, RegionsAdapter, SFCreateRecAddress, SFCreateReceiverInfo, SFUpdateRecAddress, SFConfig) {
  Fastclick.attach(document.body);
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
      var html = can.view('templates/component/sf.b2c.mall.component.addreditor.mustache'+'?v='+SFConfig.setting.ver, data);
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

      var that = this;
      $('#addressSave').click(function() {
        that.addressSaveClick();
      })

      $('#backToOrder').click(function() {
        $(".sf-b2c-mall-order-selectReceiveAddress").show();
        $(".sf-b2c-mall-order-itemInfo").show();
        $(".sf-b2c-mall-order-addAdrArea").hide();
      })
    },

    show: function(tag, data, element) {
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
              provinceName: this.adapter.regions.findGroup(0)[0].id,
              cityName: null,
              regionName: null,
              detail: null,
              recId: null,
              cellphone: null,
              recName: null,
              credtNum: null,
              zipCode: null
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
              zipCode: data.zipCode,
              recId: data.recId
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

      var cities = this.adapter.regions.findGroup(window.parseInt(pid));
      this.adapter.addr.place.attr('cities', cities);
      this.adapter.addr.input.attr('cityName', cities[0].id);
    },

    changeRegion: function() {
      var cid = this.adapter.addr.input.attr('cityName');

      var regions = this.adapter.regions.findGroup(window.parseInt(cid));
      this.adapter.addr.place.attr('regions', regions);
      this.adapter.addr.input.attr('regionName', regions[0].id);
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

          def.reject(error);
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
    '#zipcode focus': function(element, event) {
      event && event.preventDefault();
      $('#zipcodeerror').hide();
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

      if (!addr.recName) {
        this.adapter.addr.attr("error", '请填写收货人姓名！');
        return false;
      }
      var testRecName = /^[\u4e00-\u9fa5]{0,10}$/.test($.trim(addr.recName));
      if (testRecName) {} else {
        this.adapter.addr.attr("error", '请填写身份证上真实姓名');
        return false;
      }

      if (!addr.credtNum) {
        this.adapter.addr.attr("error", '请填写收货人身份证号码！');
        return false;
      }
      if (addr.credtNum.length < 18 || addr.credtNum.length > 18) {
        this.adapter.addr.attr("error", '收货人身份证号码填写有误！');
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
        this.adapter.addr.attr("error", '收货人身份证号码填写有误！');
        return false;
      }

      //验证详细地址
      if (!addr.detail) {
        this.adapter.addr.attr("error", '请填写详细地址信息！');
        return false;
      }

      // 5~120字符之间
      if (addr.detail.length > 120 || addr.detail.length < 5) {
        this.adapter.addr.attr("error", '请输入正确地址信息!');
        return false;
      }

      if (!addr.cellphone) {
        this.adapter.addr.attr("error", '请填写收货人手机号码！');
        return false;
      }

      //电话号码正则验证（以1开始，11位验证）)
      if (!/^1\d{10}$/.test(addr.cellphone)) {
        this.adapter.addr.attr("error", '收货人手机号码填写有误！');
        return false;
      }

      //验证邮编，如果用户没输，跳过；反之进行验证
      if (!addr.zipCode) {
        this.adapter.addr.attr("error", '请填写邮编！');
        return false;
      }

      var zipCodeRegex = /[0-9]\d{5}(?!\d)$/.test($.trim(addr.zipCode));
      if (!zipCodeRegex || addr.zipCode.length > 6) {
        this.adapter.addr.attr("error", '邮编填写有误！');
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