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
        var urlscheme = 'sfhtBridge://service/pluginHelper?plugin='+ plugin +'&method='+ method +'&params='+ encodeURIComponent('[' + JSON.stringify(params) + ']')+ '&callbackId='+callbackId;

        if ($('#apprunner').length == 0) {

          var $el = $('<iframe id="apprunner" style="height:0px"></iframe>');
          $el.attr('src', urlscheme);

          $('body').append($el);
        }else{
          $('#apprunner').attr('src', urlscheme);
        }
      }

    });

    window.bridge = new Bridge();

    window.callback = function (callbackId, status, json, keep) {

      if (bridge.troops && bridge.troops[callbackId]) {

        var fn = bridge.troops[callbackId][status];

        if (_.isFunction(fn)) {
          fn.call(bridge, json);
        }

        if (!keep) {
          delete bridge.troops[callbackId]
        }

        return true;
      }else{
        return false;
      }
    }

  })