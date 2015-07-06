'use strict';

define(
  'sf.hybrid',

  [
    'zepto',
    'can',
    'underscore',
    'md5',
    'store'
  ],

  function($, can, _, md5, store) {

    var toRoot = function() {
      $('.nav-index').click(function(e) {
        e.preventDefault();
        sfnavigator.popToRoot();
      })
    }

    var getInfo = {
      getAppInfo: function() {
        //这里给出默认值
        var appVersion = "1.0.0";
        if (device.appVersion) {
          appVersion = device.appVersion;
        }
        return appVersion;
      }
    }

    var toast = {
      show: function(message) {
        sf.toast.show(message);
      },
      loading: function(message) {
        sf.toast.loading(message);
      },
      dismiss: function() {
        sf.toast.dismiss();
      }
    }

    var login = function() {
      var def = can.Deferred();

      var completecallback = function(logininfo) {
        if (logininfo.isLogin) {
          getTokenInfo()
            .done(function(data) {
              def.resolve(data);
            })
            .fail(function(error) {
              def.reject();
            })
        } else {
          def.reject();
        }
      };

      var cancelcallback = function() {
        def.reject();
      };

      sf.sign.auth(completecallback, cancelcallback);

      return def;
    };

    var getTokenInfo = function() {
      var def = can.Deferred();

      var successcallback = function(data) {
        store.set('csrfToken', data.device.deviceSecret);
        store.set('_tk', data.token);
        def.resolve(data);
      }

      sf.userapi.getTokenInfo(successcallback);
      return def;
    };

    var logout = function() {
      var def = can.Deferred();

      var successcallback = function(data) {
        store.set('HYBRID_IS_LOGIN', false);
        def.resolve(data);
      };

      var errorcallback = function(error) {
        def.reject(error);
      };

      sf.userapi.logout(successcallback, errorcallback);
      return def;
    };

    var isLogin = function() {
      var def = can.Deferred();

      var successcallback = function(isLogin) {
        if (isLogin) {
          store.set('HYBRID_IS_LOGIN', true);
        } else {
          store.set('HYBRID_IS_LOGIN', false);
        }

        def.resolve(isLogin);
      }

      sf.userapi.isLogin(successcallback);

      return def;
    };

    var pay = function(orderId, payType) {
      var def = can.Deferred();

      var map = {
        'ALIPAY': sf.payment.PayType.ALIPAY,
        'WEIXINPAY': sf.payment.PayType.WXPAY
      }

      var successcallback = function(data) {
        def.resolve(data);
      }

      var errorcallback = function(error) {
        def.reject(error);
      }

      sf.payment.requestPay(orderId, map[payType], successcallback, errorcallback);
      return def;
    };

    var share = function(message) {
      var def = can.Deferred();

      var successcallback = function(data) {
        def.resolve(data);
      }

      var errorcallback = function(error) {
        def.reject(error)
      }

      sf.socialsharing.share(message, successcallback.errorcallback);
      return def;
    }

    var sfnavigator = {
      setTitle: function(title) {
        sf.navigation.setTitle(title)
      },
      setRightButton: function(title, imagePath, onclick) {
        sf.navigation.setRightButton(title, imagePath, onclick);
      },
      setLeftButton: function(onclick) {
        sf.navigation.setLeftButton(onclick);
      },
      setNavigationBarHidden: function(hidden, animate) {
        sf.navigation.setNavigationBarHidden(hidden, animate);
      },
      pop: function(animate) {
        sf.navigation.pop(animate);
      },
      popToRoot: function(animate) {
        sf.navigation.popToRoot(animate);
      },
      popToIdentifier: function(identifier, animate) {
        sf.navigation.popToIdentifier(identifier, animate);
      }
    }

    var sfnotifivation = {
      add: function(key, callback) {
        sf.notificationCenter.add(key, callback);
      },

      remove: function(key) {
        sf.notificationCenter.remove(key)
      },

      post: function (key, params) {
        sf.notificationCenter.post(key, params)
      }
    }

    var setNetworkListener = function() {
      var isBroken = false;
      document.addEventListener("offline", function() {
        if ($('.network').length == 0) {
          $('body').prepend('<div style="background: #ffb900; font-size: 14px; padding: 12px;" class="network">当前网络不可用，请检查网络设置</div>');
          isBroken = true;
        };
      }, false);

      document.addEventListener("online", function() {
        if (isBroken) {
          window.location.reload();
        } else {
          $('.network').remove()
        }
      }, false);
    }

    var run = function (key, params) {
      var map = {
        'updateCartNumber': 'NotificationAddedCart'
      };

      var urlscheme = 'sfht://service/pluginHelper?plugin=SFNotificationCenter&method=post&params=["' + map[key] + '", ' + JSON.stringify(params) + ']';

      if ($('#apprunner').length == 0) {

        var $el = $('<iframe id="apprunner"></iframe>');
        $el.attr('src', urlscheme);

        $('body').append($el);
      }else{
        $('#apprunner').attr('src', urlscheme);
      }

      return false;
    };

    var h5share = function (title, description, imageUrl, url) {
      var params = {
        "subject": title,
        "description": description,
        "imageUrl": imageUrl,
        "url": url
      };

      var urlscheme = 'sfht://service/pluginHelper?plugin=SocialSharing&method=share&params='+ encodeURIComponent('[' + JSON.stringify(params) + ']');

      if ($('#apprunner').length == 0) {

        var $el = $('<iframe id="apprunner"></iframe>');
        $el.attr('src', urlscheme);

        $('body').append($el);
      }else{
        $('#apprunner').attr('src', urlscheme);
      }

      return false;
    };

    return {
      login: login,
      isLogin: isLogin,
      getTokenInfo: getTokenInfo,
      getInfo: getInfo,
      pay: pay,
      logout: logout,
      sfnavigator: sfnavigator,
      share: share,
      setNetworkListener: setNetworkListener,
      toRoot: toRoot,
      toast: toast,
      notification: sfnotifivation,
      run: run,
      h5share: h5share
    }

  });