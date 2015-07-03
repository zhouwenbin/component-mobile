//绑定账号js
'use strict'

define(
  'sf.b2c.mall.page.bindalipay', [
    'zepto',
    'can',
    'store',
    'fastclick',
    'md5',
    'sf.b2c.mall.business.config',
    'sf.util',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.user.bindAliAct'
  ],
  function($, can, store, Fastclick, md5, SFBizConf, SFFn, SFMessage, SFFrameworkComm, SFBindAliAct) {

    SFFrameworkComm.register(3);

    Fastclick.attach(document.body);

    var bindalipay = can.Control.extend({

      init: function() {

        this.data = new can.Map({
          "alipayaccount": "",
          "alipayaccounterror": "",
          "realipayaccount": "",
          "realipayaccounterror": "",
          "alipayname": "",
          "alipaynameerror": "",
          "rule": false,
          "ruleerror": ""
        });

        this.render(this.data);

        $("#alipayaccount")[0].oninput = function() {
          $("#alipayaccounterror")[0].style.display = "none";
        };

        $("#realipayaccount")[0].oninput = function() {
          $("#realipayaccounterror")[0].style.display = "none";
        };

        $("#alipayname")[0].oninput = function() {
          $("#alipaynameerror")[0].style.display = "none";
        };
      },

      render: function(data) {
        var template = can.view.mustache(this.bindAccountTemplate());
        this.element.append(template(data));
      },

      bindAccountTemplate: function() {
        return '<section class="login">' +
          '<form action="">' +
          '<ol>' +
          '<li>' +
          '<h2 class="text-h2">绑定支付宝账号</h2>' +
          '</li>' +
          '<li>' +
          '<input type="text" class="input" id="alipayaccount" placeholder="支付宝账号" can-value="alipayaccount"/>' +
          '<span class="text-error" id="alipayaccounterror" style="display:none">{{alipayaccounterror}}</span>' +
          '</li>' +
          '<li>' +
          '<input type="text" class="input" id="realipayaccount" placeholder="确认支付宝账号" can-value="realipayaccount"/>' +
          '<span class="text-error" id="realipayaccounterror" style="display:none">{{realipayaccounterror}}</span>' +
          '</li>' +
          '<li>' +
          '<input type="text" class="input" id="alipayname" placeholder="姓名" can-value="alipayname"/>' +
          '<span class="text-error" id="alipaynameerror" style="display:none">{{alipaynameerror}}</span>' +
          '</li>' +
          '<li>' +
          '<input id="rule" type="checkbox" can-value="rule" style="margin-right: 5px;">我同意规则条款' +
          '<span class="text-error" id="ruleerror" style="display:none">{{ruleerror}}</span>' +
          '</li>' +

          '<li><button class="btn btn-success btn-big" id="bindaccount">确定</button></li>' +
          '</ol>' +
          '</form>' +
          '</section>';
      },

      "#rule click": function(element, event) {
        $("#ruleerror")[0].style.display = "none";
      },

      "#bindaccount click": function(element, event) {
        event && event.preventDefault();
        // 调用绑定接口  绑定成功后调用体现接口
        var data = this.data.attr();

        if (!data.rule) {
          $("#ruleerror")[0].style.display = "";
          this.data.attr("ruleerror", "需同意规则条款");
          return false;
        }

        if (!data.alipayaccount) {
          $("#alipayaccounterror")[0].style.display = "";
          this.data.attr("alipayaccounterror", "不能为空");
          return false;
        }

        if (!data.realipayaccount) {
          $("#realipayaccounterror")[0].style.display = "";
          this.data.attr("realipayaccounterror", "不能为空");
          return false;
        }

        if (data.alipayaccount != data.realipayaccount) {
          $("#realipayaccounterror")[0].style.display = "";
          this.data.attr("realipayaccounterror", "输入的账号不一致");
          return false;
        }

        if (!data.alipayname) {
          $("#alipaynameerror")[0].style.display = "";
          this.data.attr("alipaynameerror", "不能为空");
          return false;
        }

        var bindAliAct = new SFBindAliAct({
          "aliAct": data.alipayaccount,
          "aliActName": data.alipayname
        });

        var that = this;

        bindAliAct.sendRequest()
          .done(function(data) {
            if (data.value) {
              var params = can.deparam(window.location.search.substr(1));
              var gotoUrl = params.from;
              window.location.href = gotoUrl;
            }
          })
          .fail(function(error) {
            $("#alipaynameerror")[0].style.display = "";
            that.data.attr("alipaynameerror", "支付宝账号绑定失败！");
            return false;
          })

      }

    });

    new bindalipay(".sf-b2c-mall-bindalipay");
  })