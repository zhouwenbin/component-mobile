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
        var that = this;
        var inputNum = $('#inputNum').val();
        var isInputNum = $('#isInputNum').val();
        var valueSlt = $('#needSelect').val();
        var Reg = /^\d{1,15}$/;
        if (inputNum.length == 0 || isInputNum.length == 0) {
          that.messageMe('亲~ 请输入并确认你的顺丰工号');
        } else if (!Reg.test(inputNum) || !Reg.test(isInputNum)) {
          that.messageMe('亲~ 请输入并确认为1-15位数字的顺丰工号');
        } else if (inputNum != isInputNum) {
          that.messageMe('亲~ 请输入一致的顺丰工号');
        } else if (valueSlt == '请选择分部') {
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

    });
    new sfBrother('.sf-b2c-mall-brother-content');
  });