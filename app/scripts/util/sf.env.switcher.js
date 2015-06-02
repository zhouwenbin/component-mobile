'use strict';

define(

  'sf.env.switcher',

  [
    'zepto',
    'can',
    'underscore',
    'sf.util',
  ],

  function($, can, _, SFFn) {

    var setting = ['web', 'wechat', 'alipay', 'app'];
    var defaultSetting = 'web';

    return can.Control.extend({

      init: function() {
        this.options.env = this.getEnvInfo();
        this.options.group = {};
      },

      getEnvInfo: function() {
        var defaultEnv = 'web';
        var loop = {
          'wechat': function() {
            return SFFn.isMobile.WeChat();
          },

          'alipay': function() {
            return SFFn.isMobile.AlipayChat();
          },

          // @todo app的判断逻辑预留
          'app': function() {
            // 如果有cordova对象存在则判断在app中
            return !!cordova;
          }
        }

        var env = null;
        for (var i in loop) {
          if (loop[i]()) {
            env = i;
            break;
          }
        }

        return env ? env : defaultEnv;
      },

      register: function(env, callback) {
        if (_.contains(setting, env)) {
          this.options.group[env] = callback;
        }
      },

      go: function() {
        var fn = this.options.group[this.options.env] || this.options.group[defaultSetting];
        if (_.isFunction(fn)) {
          fn.call(this);
        }
      }
    });

  }
)