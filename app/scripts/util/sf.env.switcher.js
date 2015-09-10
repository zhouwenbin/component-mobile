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

    var setting = ['web', 'wechat', 'alipay', 'localapp', 'onlineapp', 'app'];
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

          'localapp': function () {
            return SFFn.isMobile.localApp();
          },

          'onlineapp': function () {
            return SFFn.isMobile.onlineApp();
          },

          // @todo app的判断逻辑预留
          'app': function() {
            // @deprecated
            // 如果有cordova对象存在则判断在app中
            // return !!cordova;

            return SFFn.isMobile.APP();
          }
        }

        var env = [];
        for (var i in loop) {
          if (loop[i]()) {
            env.push(i);
          }
        }

        return env.length > 0 ? env : [defaultEnv];
      },

      register: function(envs, callback) {

        var fn = function (env) {
          if (_.contains(setting, env)) {
            this.options.group[env] = callback;
          }
        }

        if (_.isArray(envs)) {
          _.each(envs, _.bind(fn, this));
        }else{
          fn.call(this, envs);
        }
      },

      go: function() {
        var runFn = this.options.group[defaultSetting];

        for(var i in this.options.env){
          var fn = this.options.group[this.options.env[i]];
          if (_.isFunction(fn)) {
            runFn = fn;
            break;
          }
        }

        if (_.isFunction(runFn)) {
          runFn.call(this);
        }
      }
    });
  }
);