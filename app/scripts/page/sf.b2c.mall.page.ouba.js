'use strict';
define(
    'sf.b2c.mall.page.ouba',
    [
        'can',
        'zepto',
        'zepto.cookie',
        'store',
        'fastclick',
        'underscore',
        'md5',
        'sf.b2c.mall.framework.comm',
        'sf.b2c.mall.business.config',
        'sf.util',
        'sf.b2c.mall.widget.message',
        'zepto.fullpage',
        'sf.b2c.mall.api.user.getVoteNum',
        'sf.b2c.mall.api.user.vote',
        'sf.weixin',
        'sf.hybrid'
    ],
    function(can, $, cookie,  store, Fastclick, _, md5, SFComm, SFConfig, SFFn, SFMessage, ZfullPage, VoteNum, Vote,SFWeixin, SFHybrid){
        Fastclick.attach(document.body);
        SFComm.register(3);

        //初始化小鲜肉图片数组
        var imgArray = {
            "1":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg','http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "2":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "3":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "4":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "5":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "6":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "7":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "8":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "9":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "10":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "11":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg'],
            "12":['http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg','http://img0.sfht.com/img/36d28144d3bdba07b90d80be79de2214.jpg']
        };

        var xingNan = 1000;
        var xiaoXiu = 3000;
        var banLuo = 10000;
        var mi = 30000;
        var ticketList = null;
        var young= can.Control.extend({

            /**
             * @description 初始化方法，当调用new时会执行init方法
             * @param  {Dom} element 当前dom元素
             * @param  {Map} options 传递的参数
             */
            init: function(element, options) {

                $('.wp-inner').fullpage();
                this.getTicketList();
                var that = this;

                //初始化每日可以扒衣的次数
                var obj = $.fn.cookie('clickTimes');
                var currentDate = new Date();
                if(typeof obj == "undefined" || obj == null){
                    var obj =  currentDate.getDate() + "-" + 10;
                    $.fn.cookie('clickTimes', obj);
                }
                else{
                    if(parseInt(obj.split("-")[0]) != currentDate.getDate()){
                        $.fn.cookie('clickTimes',  currentDate.getDate() + "-" + 10);
                    }
                    else{
                        $("#clickTimes").text( parseInt(obj.split("-")[1]));
                    }
                }

                //初始化收个小鲜肉的投票数
                this.changeImg();
                $(function(){
                    $('.page1 .icon1').click(function(){
                        $('.page1').addClass('active');
                        $(this).hide();
                    })
                    var index = 0;
                    $('.next').click(function(){
                        if(index<11){
                            $('.people>li').eq(11-index).addClass('active');
                            index++;
                            that.changeImg();
                        }
                    })
                    $('.prev').click(function(){
                        if(index>0){
                            $('.people>li').eq(12-index).removeClass('active');
                            index--;
                            that.changeImg();
                        }
                    })
//                    $('.people').swipeRight(function(){
//                        if(index<11){
//                            $('.people>li').eq(11-index).addClass('active');
//                            index++;
//                        }
//                    })
//                    $('.people').swipeLeft(function(){
//                        if(index>0){
//                            $('.people>li').eq(12-index).removeClass('active');
//                            index--;
//                        }
//                    })

                    //切换下面的型男或者是小鲜肉,对应的改变图片
                    $('.tab li').click(function(){
                        $(this).addClass('active').siblings().removeClass('active');

                        var num = 12;
                        if($(".people>li").index($(".people>li.active")) != -1){
                            num =$(".people>li").index($(".people>li.active"));
                        }
                        num = num -1;
//                    var index =  $(".people>li").eq(num).find(".tab li").index($(".people>li").eq(num).find(".tab li.active"));
                        var index = $(this).index();
                        $(".people>li").eq(num).find("a").find("img").attr("src", imgArray[12-num][index]);
                    })

                    $('.page3 .a2').click(function(){
                        $('.dialog-phone').removeClass('hide');
                    })

                    $("#phoneNum").keyup(function(){
                        if(!((/^1[0-9]{9}/).test($("#phoneNum").val())&& $("#phoneNum").val().length == 10)){
                            $("#username-error-tips").text('号码格式不正确！');
                            return ;
                        }
                        else{
                            $("#username-error-tips").text('');
                        }
                    });
                    //领优惠券
                    $('.dialog-phone .btn').click(function(){
                        if(!((/^1[0-9]{9}/).test($("#phoneNum").val()) && $("#phoneNum").val().length == 10)){
                            $("#username-error-tips").text('号码格式不正确！');
                            return ;
                        }

                        //领取优惠券
//                        var receiveShareCoupon = new SFReceiveShareCoupon({
//                            'mobile':$("#phoneNum"),
//                            'receiveChannel': 'B2C',
//                            'receiveWay': 'HBLQ',
//                            'shareBagId': this.itemObj.cardBagInfo.bagCodeId,
//                            tempToken: store.get('tempToken')
//                        });
//                        receiveShareCoupon.sendRequest()
//                            .done(function(data) {
//                                $('.dialog-phone').addClass('hide');
//                                $('.dialog-success').removeClass('hide');
//                            })
//                            .fail(function(error) {
//                                new SFMessage(null,{'type': 'error','tip':'领优惠券失败！'});
//                                return ;
//                            });

                        $('.dialog-phone').addClass('hide');
                        $('.dialog-success').removeClass('hide');
                    })
                    $('#goOn').click(function(){
                        $('.dialog-success').addClass('hide');
                    })

                    $('.bt2').click(function(){
                        $('.dialog-success').addClass('hide');
                        window.location.href = "http://m.sfht.com/index.html";
                    })

                    $('#huodong').click(function(){
                        $('.dialog-success').addClass('hide');
                        window.location.href = "http://m.sfht.com/index.html";
                    })

                    $('#share').click(function() {
                        $('.dialog-success').addClass('hide');

                        //app分享
//                        if (SFFn.isMobile.APP()) {
//                            var title = '顺丰海淘疯了~COO带头脱光揽生意， 是！真！脱！';
//                            var desp = '顺丰海淘疯了~COO带头脱光揽生意， 是！真！脱！';
//                            var shareUrl = "http://m.sfht.com/activity/291.html";
//                            var imgUrl = 'http://img.sfht.com/sfhth5/1.1.2/img/luckymoneyshare.jpg';
//                            SFHybrid.h5share(title, desp, imgUrl, shareUrl);
//                        }

                        //微信分享
                        if (SFFn.isMobile.WeChat()) {
                            $("#sharearea").show();
                        }
                    })

                    $("#sharearea").click(function(){
                        $("#sharearea").hide();
                    });
                    //进行投票，并且刷新页面上的票数
                    $(".page3-r2  .a1").click(function(){
                        var params = {
                            'voteType': 'XXMAN'
                        };
                        var num = 12;
                        if($(".people>li").index($(".people>li.active")) != -1){
                            num =$(".people>li").index($(".people>li.active"));
                        }
                        num = num -1;

                        params.voteNo = 12-num;
                        var clickTimes = $.fn.cookie('clickTimes');
                        if(clickTimes && clickTimes.split("-")[1] > 0){
                            $.fn.cookie('clickTimes',  clickTimes.split("-")[0] + "-" + (parseInt(clickTimes.split("-")[1]) -1));;
                            $("#clickTimes").text( parseInt(clickTimes.split("-")[1]) -1 );
                        }

                        //投票代码
                        var voteTicket = new Vote(params);
                        voteTicket.sendRequest()
                            .done(function(data) {
                                ticketList = data.infos;
                                $("#clickNum").text(ticketList.attr(num));
                                this.tabUnlock(ticketList.attr(num), num);
                            })
                            .fail(function(error) {
                                console.error(error);
                            })
                    });
                })
            },

            //每次进入页面查询出所有的投票记录
            getTicketList: function(){
                var voteNum = new VoteNum({'voteType':'XXMAN'});
                voteNum.sendRequest()
                    .done(function(data) {
                        ticketList =  new can.Map(data.infos);
                    })
                    .fail(function(error) {
                        console.error(error);
                    })
            },

            //切换小鲜肉图片，更新页面中显示的票数和tab的解锁
            changeImg: function(){
                var num = 12;
                if($(".people>li").index($(".people>li.active")) != -1){
                    num =$(".people>li").index($(".people>li.active"));
                }
                num = num -1;
                var index =  $(".people>li").eq(num).find(".tab li").index($(".people>li").eq(num).find(".tab li.active"));

                $(".people>li").eq(num).find("a").find("img").attr("src", imgArray[12-num][index]);
                $("#clickNum").text( ticketList.attr(num).voteNum);
                this.tabUnlock(ticketList.attr(num).voteNum, num);
            },

            //根据票数判断标签页是否解锁以及百分比滚动条
            tabUnlock: function(num, index){
                if(num > mi){
                    $(".people>li").eq(index).find(".tab li").removeClass("lock").addClass("unlock");
                    $(".bar-current").css("width","100%");
                }
                else if(num > banLuo){
                    $(".people>li").eq(index).find(".tab li").removeClass("lock").addClass("unlock");
                    $(".people>li").eq(index).find(".tab li").eq(3).removeClass("unlock").addClass("lock");
                    $(".bar-current").css("width","75%");
                }
                else if(num > xiaoXiu){
                    $(".people>li").eq(index).find(".tab li").removeClass("unlock").addClass("lock");
                    $(".people>li").eq(index).find(".tab li").lt(2).removeClass("lock").addClass("unlock");
                    $(".bar-current").css("width","50%");
                }
                else {
                    $(".people>li").eq(index).find(".tab li").removeClass("unlock").addClass("lock");
                    $(".people>li").eq(index).find(".tab li").eq(0).removeClass("lock").addClass("unlock");
                    $(".bar-current").css("width","25%");
                }
            }
        });

        new young("body");
    });
