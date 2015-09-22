'use strict';

define(
  'sf.b2c.mall.page.welfare', [
    'can',
    'zepto',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.api.task.directReceiveAward',
    'sf.b2c.mall.api.task.getUserTaskList',
    'text!template_welfare_list',
    'sf.b2c.mall.widget.message',
    'sf.b2c.mall.widget.loading'
  ],

  function(can, $, SFFrameworkComm, SFdirectReceiveAward, SFgetUserTaskList, template_welfare_list, SFmessage, SFLoading) {
    SFFrameworkComm.register(3);
    var loadingCtrl = new SFLoading();
    can.route.ready();

    var welfareList = can.Control.extend({
      helpers: {
        'sf-uni': function(description) {
          return decodeURIComponent(description())
        }
      },

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function() {
        this.itemObj.recommendTaskList = [];
        this.itemObj.dailyTaskList = [];
        this.render();
      },

      render: function() {
        this.request();
        this.initLoadDataEvent();
      },

      request: function(cparams) {
        loadingCtrl.show();
      },

      stepCates: function(data) {
        var renderFn = can.view.mustache(template_welfare_list);
        var html = renderFn(data, this.helpers);
        this.element.html(html);
        loadingCtrl.hide();
        $('.welfare-list li .joinBtns').each(function(index, el) {
          var thisBtn = $('.welfare-list li .joinBtns').eq(index);
          if (thisBtn.hasClass('direct') && !thisBtn.closest('li').hasClass('completed')) {
            thisBtn.closest('li').addClass('direct');
          }
        });
      },

      initLoadDataEvent: function() {
        this.loadingData();
        loadingCtrl.hide();
      },

      loadingData: function(cparams) {
        var that = this;
        var params = {};
        var sFgetUserTaskList = new SFgetUserTaskList(params);
        can.when(sFgetUserTaskList.sendRequest()).done(function(data) {
          that.itemObj.attr(data);
          that.stepCates(that.itemObj);
        }).fail(function(error) {
          console.error(error);
        });
      },

      '.joinBtns click': function($element, event) {
        alert(0);
        if ($element.hasClass('direct') && $element.closest('li').hasClass('completed')) {
          alert(1);
          event.preventDefault();
        } else {
          alert(2);
          var url = window.location.href;
          if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
            window.location.href = "http://m.sfht.com/login.html?from=" + window.encodeURIComponent(url);
            return false;
          }
          if ($element.hasClass('direct')) {
            $element.attr({
              href: 'javascript:;'
            });
            alert(3);
            var taskId = $element.closest('li').attr('data-tab');
            var getImage = $element.closest('li').find('.stepImage').clone();
            var sFdirectReceiveAward = new SFdirectReceiveAward({
              taskId: taskId
            });
            sFdirectReceiveAward.sendRequest().done(function(data) {
              setTimeout(function() {
                alert(4);
                var message = new SFmessage(null, {
                  'tip': data.richText,
                  'type': 'success',
                  'okFunction': function() {
                    if (data.complete) {
                      $element.closest('li').addClass('completed');
                      $element.text(data.completeButtonText);
                    }
                  },
                });
                $('#messagedialog').addClass('addWelFareStyle');
                getImage.insertBefore('.addWelFareStyle .center h2');
                $('#ok').addClass('addWelFareBtn');
                alert(5);
              }, 300)
            }).fail(function(error) {
              alert(error);
              console.log(error)
            })
          }
        }
      },

      '.ruleToshow click': function($element, event) {
        var taskId = $element.closest('li').attr('data-tab');;
        var url = "http://m.sfht.com/welfare-rule.html#!&"+$.param({
          taskId: taskId
        });
        console.log(url);
        window.location.href = url;
      }

    });
    new welfareList('body');
  });