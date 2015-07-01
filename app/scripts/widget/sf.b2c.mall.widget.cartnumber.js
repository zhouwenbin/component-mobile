'use strict'

define(
  'sf.b2c.mall.widget.cartnumber',

  [
    'sf.b2c.mall.api.minicart.getTotalCount',
    'sf.env.switcher',
    'sf.hybrid'
  ],

  function (SFGetTotalCount, SFSwitcher, SFHybrid) {

    var switcher = new SFSwitcher();

    return function (success, error) {

      switcher.register('web', function () {
        var getTotalCount = new SFGetTotalCount();
        getTotalCount
          .done(success)
          .fail(error);
      });

      switcher.register('app', function () {
        var getTotalCount = new SFGetTotalCount();
        getTotalCount
          .done(function (data) {
            SFHybrid.run('updateCartNumber', {amount: data.value});

            success(data);
          })
          .fail(error);

      });

      switcher.go();
    }
  }
);