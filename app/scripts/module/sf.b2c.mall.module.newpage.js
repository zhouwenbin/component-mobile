'use strict';
define(
    'sf.b2c.mall.module.newpage', [
        'can',
        'zepto'
    ],
    function(can, $) {
        //功能：选中与当前页面的url相匹配的的li
        var pageSwitch = can.Control.extend({
            init: function(element) {

                var header_height=$('.header').height();
                $(window).scroll(function(){
                    if($('body').scrollTop()>header_height){
                        $('.nav2').addClass('nav2-fixed')
                    }else{
                        $('.nav2').removeClass('nav2-fixed')
                    }
                })

                var currentUrl = window.location.pathname;

                if (currentUrl == '/') {
                    $('.cms-fill-nav').eq(0).addClass("active").siblings().removeClass("active");
                }else{
                    $(".cms-fill-nav li").each(function(limodule){
                        var urlValue = $(this).find("a").attr("href");
                        if(($(this).find("a").attr("href")).indexOf(currentUrl) > 0){
                            $(this).removeClass("active").addClass("active");
                        }
                    });
                }

                this.render();
            },
            render: function() {
                var params = can.route.attr();
                var version = params.version;
                version = version ? version  : '1.0.0';
                var verArr = version.split('.');
                var verTwo = verArr[0] + '.' + verArr[1];
                var verInt = parseFloat(verTwo);
                if( verInt >= 1.3){
                    $(".cms-fill-nav").hide();
                }else{
                    // console.log('get-version-fail');
                }
            }
        })
        new pageSwitch();
    })