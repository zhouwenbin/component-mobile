'use strict'

define(
  'sf.b2c.mall.widget.cartnumber',

  [
    'underscore',
    'sf.b2c.mall.api.minicart.getTotalCount',
    'sf.env.switcher',
    'sf.hybrid'
  ],

  function (_, SFGetTotalCount, SFSwitcher, SFHybrid) {

    return function (success, error) {

      var switcher = new SFSwitcher();

      switcher.register('web', function () {
        var getTotalCount = new SFGetTotalCount();
        getTotalCount.sendRequest()
          .done(success)
          .fail(error);
      });

      switcher.register('app', function () {
        var getTotalCount = new SFGetTotalCount();
        getTotalCount.sendRequest()
          .done(function (data) {
            SFHybrid.run('updateCartNumber', {amount: data.value});

            if (_.isFunction(success)) {
              success(data);
            };

          })
          .fail(error);

      });

      switcher.go();
    }
  }
);