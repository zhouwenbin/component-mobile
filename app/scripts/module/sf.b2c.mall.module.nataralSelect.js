'use strict';
define(
  'sf.b2c.mall.module.nataralSelect', [
    'can',
    'zepto'
  ],
  function(can, $) {

    var nataralSelect = can.Control.extend({
      init: function(element) {
        var that = this;
        _.each($(".nataral-brand-select"), function(item) {
          that.addSelectEvent(item);
        });
      },

      addSelectEvent: function(item) {
        var that = this;

        $(item).on("click", function() {
          $(this).toggleClass("active");
        })
        $(item).on("click", "li", function() {
          $(this).addClass("active").siblings(".active").removeClass("active");
          var pos = $(this).parents("ul").find("li").index(this);
          var siblingsDivs = $(this)
            .parents(".nataral-brand-select")
            .siblings("div");
          siblingsDivs.hide().eq(pos).show();

        })
      }
    })
    new nataralSelect();
  }
)