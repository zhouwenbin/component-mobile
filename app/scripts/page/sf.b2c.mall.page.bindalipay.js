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
          "realipayaccounterror": ""
        });

        this.render(this.data);

        $("#alipayaccount")[0].oninput = function() {
          $("#alipayaccounterror")[0].style.display = "none";
        };

        $("#realipayaccount")[0].oninput = function() {
          $("#realipayaccounterror")[0].style.display = "none";
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
          '<li><button class="btn btn-success btn-big" id="bindaccount">确定</button></li>' +
          '</ol>' +
          '</form>' +
          '</section>';
      },

      "#bindaccount click": function(element, event) {
        event && event.preventDefault();
        // 调用绑定接口  绑定成功后调用体现接口
        var data = this.data.attr();
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

        var bindAliAct = new SFBindAliAct({
          "aliAct": data.alipayaccount
        });

        var that = this;

        bindAliAct.sendRequest()
          .done(function(data) {
            if (dta.value) {
              var params = can.deparam(window.location.search.substr(1));
              var gotoUrl = params.from;
              window.location.href = gotoUrl;
            }
          })
          .fail(function(error) {
            $("#realipayaccounterror")[0].style.display = "";
            that.data.attr("realipayaccounterror", "支付宝账号绑定失败！");
            return false;
          })

      }

    });

    new bindalipay(".sf-b2c-mall-bindalipay");
  })