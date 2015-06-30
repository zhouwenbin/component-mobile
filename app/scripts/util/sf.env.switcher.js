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

    var setting = ['web', 'wechat', 'alipay', 'app', 'localapp', 'onlineapp'];
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
            // @deprecated
            // 如果有cordova对象存在则判断在app中
            // return !!cordova;

            return SFFn.isMobile.APP();
          },

          'localapp': function () {
            return SFFn.isMobile.localApp();
          },

          'onlineapp': function () {
            return SFFn.isMobile.onlineApp();
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

      /**
       * [registerManyToOne 注册一个回调到多个环境中]
       * @param  {[type]}   env      [description]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      registerOneCallbackToManyEnv: function(envs, callback) {
        var that = this;

        var envArr = envs.split(",");

        _.each(envArr, function(item) {
          that.register(item, callback);
        })
      },

      /**
       * [registerManyToOne 除去某个环境，其他环境都一个回调]
       * @param  {[type]}   env      [description]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      registerOneCallbackExceptEnv: function(envs, callback) {
        var that = this;

        var envArr = envs.split(",");

        _.each(setting, function(item) {
          _.each(envArr, function(notRegisterItem) {
            if (notRegisterItem != item){
              that.register(item, callback);
            }
          })
        })
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