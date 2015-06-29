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
          if($(this).hasClass("active")) {
            return;
          }
          $(this).addClass("active").siblings(".active").removeClass("active");
          var pos = $(this).parents("ul").find("li").index(this);
          var parentsDiv = $(this)
            .parents(".nataral-brand-select");
          var siblingsDivs = parentsDiv.siblings("div");
          siblingsDivs.hide().eq(pos).show();

          var tabName = $(this).find("a").text();
          parentsDiv.find(".nataral-h2").text(tabName);
        })
      }
    })
    new nataralSelect();
  }
)