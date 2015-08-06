'use strict'

define(
  'sf.bridge',

  [
    'zepto',
    'can',
    'underscore',
  ],

  function ($, can, _) {

    var emptyFn = function(){};

    var Bridge = can.Control.extend({

      init: function () {
        this.troops = {};
      },

      register: function (success, error) {
        var timestamp = Date.now()
        var callbackId = 'sfht_'+timestamp;

        this.troops[callbackId] = {
          success: success || emptyFn,
          error: error || emptyFn
        };

        return callbackId;
      },

      run: function (plugin, method, params, success, error) {
        var callbackId = this.register(success, error);
        var paramsJs = JSON.stringify(params);
        var msg;
        try{
          msg = window.sfhtandroidbridge.runner(plugin, method, paramsJs, callbackId);
        }
        catch(e) {
          console.log(e.name + ":" + e.message)
        }
        //if not android
        if (!msg) {
          var urlscheme = 'sfhtbridge://service/pluginHelper?plugin='+ plugin +'&method='+ method +'&params='+ encodeURIComponent('[' + paramsJs + ']')+ '&callbackId='+callbackId;

          if ($('#apprunner').length == 0) {

            var $el = $('<iframe id="apprunner" style="height:0px"></iframe>');
            $el.attr('src', urlscheme);

            $('body').append($el);
          }else{
            $('#apprunner').attr('src', urlscheme);
          }
        }
      }

    });

    window.bridge = new Bridge();

    window.sfhtcallback = function (callbackId, status, json, keep) {

      var map = {
        0: 'error',
        1: 'success'
      }

      var type = map[status];

      if (window.bridge.troops && window.bridge.troops[callbackId]) {

        var fn = window.bridge.troops[callbackId][type];

        if (_.isFunction(fn)) {
          fn.call(window.bridge, json);
        }

        if (!keep) {
          delete window.bridge.troops[callbackId]
        }

        return true;
      }else{
        return false;
      }
    }

  });