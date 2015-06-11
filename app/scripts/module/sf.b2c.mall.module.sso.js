define(
  'sf.b2c.mall.module.sso',
  [
    'can',
    'store',
    'sf.env.switcher',
    'sf.hybrid',
    'sf.b2c.mall.api.user.singleSignOn'
  ],

  function (can, store, SFSwitcher, SFHybrid, SFSSO) {

    // －－－－－－－－－－－－－－－－－－－－－－
    // 启动分支逻辑
    var switcher = new SFSwitcher();

    switcher.register('web', function() {});

    switcher.register('app', function() {
      var app = {
        initialize: function() {
          this.bindEvents();
        },

        bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
          app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {

          SFHybrid.isLogin().done(function (isLogin) {
            if (isLogin) {
              SFHybrid.getTokenInfo().done(function (data) {

                // alert(JSON.stringify(data));

                var sso =  new SFSSO({
                  targetDeviceId: data.token.deviceId,
                  targetAppId: 4
                });

                sso.sendRequest().done(function (userinfo) {

                  store.set('csrfToken', userinfo.csrfToken);

                })
              });
            }
          });
        }
      };

      app.initialize();
    });

    switcher.go();
    // －－－－－－－－－－－－－－－－－－－－－－
  })