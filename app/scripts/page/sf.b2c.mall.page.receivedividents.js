'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.cp.generateSubjectUrlWidthSCM'
  ],
  function(can, $, SFFrameworkComm, SFWeixin, SFLoading, SFConfig, SFGenerateSubjectUrlWidthSCM) {
    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var content = can.Control.extend({
      itemObj: new can.Map({
        parentSCM: null,
        topicHref: null,
        telephone: "",
        isEnable: false,
        errorMessage: "请输入手机号即可领取"
      }),
      loading: new SFLoading(),
      init: function(element, options) {
        var params = can.deparam(window.location.search.substr(1));
        var parentSCM = params.parentSCM || "123";
        var topicHref = params.topicHref || "m.sfht.com";
        this.itemObj.attr({
          parentSCM: parentSCM,
          topicHref: topicHref
        });
        this.render();
        this.supplement();
      },

      render: function() {
        this.renderHtml();
      },

      supplement: function() {

      },
      renderHtml: function() {
        var html = can.view('templates/receivedividents/sf.b2c.mall.receivedividents.mustache', this.itemObj);
        this.element.html(html);
        this.loading.hide();
      },

      generateSubjectUrl: function() {
        var generateSubjectUrlWithSCM = new SFGenerateSubjectUrlWidthSCM({
          parentSCM: this.itemObj.parentSCM,
          phone: this.itemObj.telephone
        });
        return generateSubjectUrlWithSCM.sendRequest()
          .done(function(stringResp) {

          })
          .fail(function() {

          });
      },


      "#telephone keyup":function(targetElement, event) {
        var that = this;
        var newVal = targetElement.val();
        that.itemObj.attr("errorMessage", "手机号格式错误");
        if(!/^1\d{10}$/.test(newVal)) {
          that.itemObj.attr("isEnable", false);
        } else {
          that.itemObj.attr("isEnable", true);
        }
      },

      "#topicLink click": function(targetElement, event) {
        return false;
      }

    });

    new content('.sf-b2c-mall-receivedividents');
  });