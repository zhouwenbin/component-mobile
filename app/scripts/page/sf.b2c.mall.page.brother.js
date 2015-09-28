'use strict';

define(
  'sf.b2c.mall.page.brother', [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.bindIdNumb',
    'sf.b2c.mall.api.user.getBindedIdNumb',
    'text!template_brother',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, SFFrameworkComm, SFbindIdNumb, SFgetBindedIdNumb, template_brother, SFMessage, SFLoading) {

    SFFrameworkComm.register(3);
    var loadingCtrl = new SFLoading();
    can.route.ready();

    var sfBrother = can.Control.extend({

      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.render();
      },

      render: function() {
        var that = this;
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
        that.loadingData();
        loadingCtrl.hide();
      },

      inToAccount: function(data) {
        var that = this;
        var renderFn = can.view.mustache(template_brother);
        var html = renderFn(data);
        that.element.html(html);
      },

      loadingData: function(cparams) {
        loadingCtrl.show();
        var that = this;
        var getBindedIdNumb = new SFgetBindedIdNumb();
        can.when(getBindedIdNumb.sendRequest()).done(function(data) {
          that.inToAccount(data);
          if (data.userId) {
            var tip = '亲~ 你的海淘账号已经绑定了顺丰工号，为：' + data.idNumb + ',所属分部：' + data.dept + '~';
            that.messageMeok(tip);
          }
        }).fail(function(error) {
          console.error(error);
        });
      },

      '#commitBtn click': function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
        var that = this;
        var inputNum = $('#inputNum').val();
        var isInputNum = $('#isInputNum').val();
        var valueSlt1 = $('#needSelect1').val();
        var valueSlt2 = $('#needSelect2').val();
        if (inputNum.length == 0 || isInputNum.length == 0) {
          that.messageMe('亲~ 请输入并确认你的顺丰工号');
        } else if (inputNum != isInputNum) {
          that.messageMe('亲~ 请输入一致的顺丰工号');
        } else if (valueSlt1 == '请选择区域') {
          that.messageMe('亲~ 请选择区域');
        } else if (valueSlt2 == '请选择分部') {
          that.messageMe('亲~ 请选择分部');
        } else {
          var params = {
            idNumb: isInputNum,
            dept: valueSlt
          };
          var bindIdNumb = new SFbindIdNumb(params);
          bindIdNumb.sendRequest().done(function(data) {
            if (data.value) {
              that.messageMeok('你的顺丰工号已经成为你的专属优惠码，将工号填写在海淘生活卡上就可以派发给用户使用了！加油哦！');
            }
          })
            .fail(function(error) {
              if (error == 1000520) {
                that.messageMe('该工号已经被其他海淘账号绑定，可以作为优惠码直接使用哦！如非本人操作，请联系海淘客服。');
              } else if (error == 1000510) {
                that.messageMe('该海淘账号已经绑定过顺丰工号了，可以作为优惠码直接使用哦~');
              } else {
                console.log(error);
              }
            });
        }
      },

      messageMe: function(tip) {
        var message = new SFMessage(null, {
          'tip': tip,
          'type': 'success',
          'okFunction': _.bind(function() {})
        });
      },

      messageMeok: function(tip) {
        var message = new SFMessage(null, {
          'tip': tip,
          'type': 'success',
          'okFunction': _.bind(function() {
            window.location.href = 'http://' + window.location.hostname + '/invitation.html'
          })
        });
        $('#ok').text('我知道了');
        $('#close').on('click', function(event) {
          window.location.href = 'http://' + window.location.hostname + '/index.html';
        })
      },

      '#needSelect1 click': function(element, event) {
        var that = this;
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
        var inputNum = $('#inputNum').val();
        var isInputNum = $('#isInputNum').val();
        if (inputNum == 0) {
          that.messageMe('亲~ 请输入顺丰工号');
        } else if (isInputNum == 0) {
          that.messageMe('亲~ 请确认顺丰工号');
        } else if (inputNum != isInputNum) {
          that.messageMe('亲~ 请输入一致的顺丰工号');
        }
      },

      '#needSelect1 change': function(element, event) {
        var valueSlt1 = $('#needSelect1').val();
        var valueList = $('#needSelect1 option');
        var jsonranklist = [{
          '安亭分部': '安亭分部',
          '嘉定分部': '嘉定分部',
          '江桥分部': '江桥分部',
          '娄塘分部': '娄塘分部',
          '南翔分部': '南翔分部'
        }, {
          '宝山分部': '宝山分部',
          '罗店分部': '罗店分部',
          '上大分部': '上大分部',
          '吴淞分部': '吴淞分部'
        }, {
          '北郊分部': '北郊分部',
          '普陀分部': '普陀分部',
          '石泉分部': '石泉分部',
          '桃浦分部': '桃浦分部',
          '真源分部': '真源分部'
        }, {
          '博文分部': '博文分部',
          '川沙分部': '川沙分部',
          '高东分部': '高东分部',
          '高桥分部': '高桥分部',
          '金海分部': '金海分部',
          '金桥分部': '金桥分部',
          '康桥分部': '康桥分部',
          '六团分部': '六团分部',
          '陆家嘴分部': '陆家嘴分部',
          '南汇分部': '南汇分部',
          '三林分部': '三林分部',
          '世纪分部': '世纪分部',
          '书院分部': '书院分部',
          '塘桥分部': '塘桥分部',
          '王港分部': '王港分部',
          '杨思分部': '杨思分部',
          '源深分部': '源深分部',
          '张江分部': '张江分部',
          '周浦分部': '周浦分部'
        }, {
          '仓桥分部': '仓桥分部',
          '九亭分部': '九亭分部',
          '泗泾分部': '泗泾分部',
          '松江分部': '松江分部'
        }, {
          '崇明分部': '崇明分部'
        }, {
          '打浦分部': '打浦分部',
          '淮海分部': '淮海分部',
          '黄浦分部': '黄浦分部',
          '卢湾分部': '卢湾分部'
        }, {
          '地平线分部': '地平线分部',
          '七浦分部': '七浦分部'
        }, {
          '丰镇分部': '丰镇分部',
          '虹口分部': '虹口分部',
          '通州分部': '通州分部',
          '闸北分部': '闸北分部'
        }, {
          '奉城分部': '奉城分部',
          '奉贤分部': '奉贤分部',
          '金汇分部': '金汇分部',
          '肖塘分部': '肖塘分部'
        }, {
          '古北分部': '古北分部',
          '虹桥分部': '虹桥分部',
          '锦屏分部': '锦屏分部',
          '长宁分部': '长宁分部',
          '中山分部': '中山分部'
        }, {
          '古美分部': '古美分部',
          '航华分部': '航华分部',
          '沪闵分部': '沪闵分部',
          '华漕分部': '华漕分部',
          '华宁分部': '华宁分部',
          '联明分部': '联明分部',
          '梅陇分部': '梅陇分部',
          '闵行分部': '闵行分部',
          '浦江分部': '浦江分部',
          '莘庄分部': '莘庄分部',
          '颛桥分部': '颛桥分部'
        }, {
          '青浦分部': '青浦分部',
          '徐泾分部': '徐泾分部',
          '赵巷分部': '赵巷分部',
          '重固分部': '重固分部'
        }, {
          '金山分部': '金山分部',
          '朱泾分部': '朱泾分部'
        }, {
          '上体分部': '上体分部',
          '田林分部': '田林分部',
          '宛平分部': '宛平分部',
          '徐汇分部': '徐汇分部',
          '宜山分部': '宜山分部'
        }, {
          '静安分部': '静安分部',
          '巨鹿分部': '巨鹿分部',
          '长寿分部': '长寿分部'
        }, {
          '职能员工': '职能员工'
        }];
        for (var i = 0; i < valueList.length; i++) {
          if (valueList.eq(i).text() == valueSlt1) {
            var m = i - 1;
            var needThis = jsonranklist[m];
            var last = JSON.stringify(needThis);
            for (var key in needThis) {
              var str = '<option value="' + key + '">' + key + '</option>';
              $('#needSelect2').append(str)
            }
          }
        };
      },

      '#needSelect2 focus': function(element, event) {
        var that = this;
        var valueSlt1 = $('#needSelect1').val();
        if (valueSlt1 == '请选择区域') {
          that.messageMe('亲~ 请选择区域');
        }
      },

      '#inputNum focus': function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
      },

      '#isInputNum focus': function(element, event) {
        if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
          var url = 'http://' + window.location.hostname + '/login.html?from=' + encodeURIComponent(window.location.href);
          window.location.href = url;
        }
      },

      '#inputNum blur': function(element, event) {
        var that = this;
        var inputNum = $('#inputNum').val();
        var Reg = /^\d{1,15}$/;
        if (!Reg.test(inputNum)) {
          that.messageMe('亲~ 请输入并确认为1-15位数字的顺丰工号');
        }
      },

    });
    new sfBrother('.sf-b2c-mall-brother-content');
  });