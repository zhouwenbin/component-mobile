'use strict';

define(
  [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.weixin',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.widget.loading',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.cp.generateSubjectUrlWidthSCM',
    'text!template_receivedividents',
    'sf.b2c.mall.component.nav'
  ],
  function(can, $, SFFrameworkComm, SFWeixin, SFMessage, SFLoading, SFConfig,
    SFGenerateSubjectUrlWidthSCM, template_receivedividents, SFNav) {

    SFFrameworkComm.register(3);
    SFWeixin.shareIndex();

    var content = can.Control.extend({
      itemObj: new can.Map({
        parentSCM: null,
        topicHref: null,
        telephone: "",
        isEnable: false,
        errorMessage: "",
        isShowMask: false,
        scm: null,
        note:null
      }),
      shareObj: new can.Map({
        title:null,
        desc: null,
        link:null,
        imgUrl: 'http://img.sfht.com/sfht/img/sharelog.png'
      }),
      loading: new SFLoading(),
      init: function(element, options) {
        var params = can.deparam(window.location.search.substr(1));
        var parentSCM = params.scm;
        var topicHref = params.subjectURL;
        var title = params.title;
        var desc = params.note;
        this.itemObj.attr({
          parentSCM: parentSCM,
          topicHref: topicHref,
          title: title
        });
        this.shareObj.attr({
          title: title,
          desc: desc
        });

        this.loading.show();
        this.render();
        this.supplement();
      },

      render: function() {
        this.renderHtml();
      },

      supplement: function() {

      },
      renderHtml: function() {
        // var html = can.view(template_receivedividents, this.itemObj);
        var renderFn = can.mustache(template_receivedividents);
        var html = renderFn(this.itemObj);
        this.element.html(html);
        this.loading.hide();
      },

      generateSubjectUrl: function() {
        var that = this;
        var generateSubjectUrlWithSCM = new SFGenerateSubjectUrlWidthSCM({
          parentSCM: this.itemObj.parentSCM,
          phone: this.itemObj.telephone
        });
        return generateSubjectUrlWithSCM.sendRequest()
          .done(function(stringResp) {
            that.itemObj.attr("scm", stringResp);
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
        if (!this.itemObj.attr("isEnable")) {
          return;
        }
        var that = this;
        can.when(this.generateSubjectUrl())
          .done(function() {
            var scm = that.itemObj.attr("scm");
            var href = that.itemObj.attr("topicHref");
            href += /\?/.test(href) ? "&" : "?";
            href += scm.value;
            that.shareObj.attr("link", href);

            SFWeixin.shareDetail(
              that.shareObj.title,
              that.shareObj.desc,
              that.shareObj.link,
              that.shareObj.imgUrl
            );
            window.location.href = href;
            //that.itemObj.attr("isShowMask", true);
          })
          .fail(function() {
            new SFMessage(null, {
              'tip': '抱歉，获取失败！',
              'type': 'error'
            });
          });
      },
      ".mask click": function() {
        this.itemObj.attr("isShowMask", false);
      }

    });

    new SFNav('.sf-b2c-mall-nav');
    new content('.sf-b2c-mall-receivedividents');
  });