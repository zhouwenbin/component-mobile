'use strict';

define(
  'sf.b2c.mall.page.invitationGetfmy', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.widget.message',
    'sf.weixin',
    "sf.bridge",
    'sf.b2c.mall.module.header',
    'zepto.cookie',
  ],

  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFmessage, SFweixin, SFbridge ,SFheader, $cookie){

    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var myInvitationAskfd = can.Control.extend({

      itemObj: new can.Map({}),
      '{can.route} change': function() {
        this.render();
      },

      init: function(element, options) {
        this.render();
      },
      render: function() {
        var that = this;
        if(SFFn.isMobile.WeChat()){
          var url = window.location.href;
          var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
          SFweixin.shareDetail('顺丰海淘的老友计，很有意思，进来看看吧', '顺丰海淘给新客送红包，老客返现金，让新客老客都嗨皮', url, imgUrl);
        }
      },

      '#goToHome click': function(element,event){
        if(SFFn.isMobile.APP()){
          // var params = 'true';
          // var success = function(data) {
          //   console.log('success');
          // };
          // var error = function(data) {
          //   console.log('error');
          // };
          // window.bridge.run('SFNavigation', 'popToRoot', params, success, error);
          window.location.href = 'http://' + window.location.hostname + '/index.html'
        }else{
           window.location.href = 'http://' + window.location.hostname + '/';
        }
      },

    });
    new myInvitationAskfd('body');

  });