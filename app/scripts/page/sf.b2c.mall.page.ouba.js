'use strict';
define(
    'sf.b2c.mall.page.ouba',
    [
        'can',
        'zepto',
        'zepto.cookie',
        'touch',
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
        'sf.b2c.mall.api.coupon.rcvCouponByMobile',
        'sf.env.switcher',
        'sf.hybrid'
    ],
    function(can, $, cookie, touch,  store, Fastclick, _, md5, SFComm, SFConfig, SFFn, SFMessage, ZfullPage, VoteNum, Vote,SFWeixin,SFReceiveCoupon,  SFSwitcher,SFHybrid){
        Fastclick.attach(document.body);
        SFComm.register(3);

        var xingNan = 1000;
        var xiaoXiu = 3000;
        var banLuo = 10000;
        var mi = 30000;
        var ticketList = null;
        var freshNum = 11;
        var defaultCouponid = 337;

        var young= can.Control.extend({
            ".people .btn click":function(){
                //微信分享
                if (SFFn.isMobile.WeChat()) {
                    $("#sharearea").show();
                }
            }  ,
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

//                $(function(){
                //翻看小鲜肉图片
                    $('.page1 .icon1').click(function(){
                        $('.page1').addClass('active');
                        $(this).hide();
                    })
                    var index = 0;
                    $('.next').click(function(){
                        if(index<freshNum-1){
                            $('.people>li').eq(freshNum-1-index).addClass('active');
                            index++;
                            that.changFresh(index);
                        }
                    })
                    $('.prev').click(function(){
                        if(index>0){
                            $('.people>li').eq(freshNum-index).removeClass('active');
                            index--;
                            that.changFresh(index);
                        }
                    })

                  //左右滑动
                    $('.people').swipeRight(function(){
                        if(index<freshNum-1){
                            $('.people>li').eq(freshNum-1-index).addClass('active');
                            index++;
                            that.changFresh(index);
                        }
                    })
                    $('.people').swipeLeft(function(){
                        if(index>0){
                            $('.people>li').eq(freshNum-index).removeClass('active');
                            index--;
                            that.changFresh(index);
                        }
                    })

                    //tab切换
                    $('.tab li').click(function(){
                        var tab_index=$('.tab li').index(this);
                        var people_index=freshNum-index;
                        var photo_index=tab_index+1;
                        $('.people>li').eq(10-index).find('img').attr('src','../img/young/photo/'+people_index+'/'+photo_index+'.jpg');
                        $(this).addClass('active').siblings().removeClass('active');
                        if($(this).hasClass('tab-lock')){
                            $('.people>li').eq(10-index).find('.people-lock').show();
                        }else{
                            $('.people>li').eq(10-index).find('.people-lock').hide();
                        }
                    })

                    $('.page3 .a2').click(function(){
                        $('.dialog-phone').removeClass('hide');
                    })
            },

            //领优惠劵时，对输入的号码进行校验
            "#phoneNum keyup": function(){
                if(!((/^1[0-9]{10}/).test($("#phoneNum").val())&& $("#phoneNum").val().length == 11)){
                    $("#username-error-tips").text('号码格式不正确！');
                    return ;
                }
                else{
                    $("#username-error-tips").text('');
                }
            },

            //进入活动页面
            "#huodong click":function(){
                $('.dialog-success').addClass('hide');
                window.location.href = "http://m.sfht.com/index.html";
            },

            //继续扒小鲜肉
            "#goOn click": function(){
                $('.dialog-success').addClass('hide');
            },

            //点击分享
            "#share click": function(){
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
            },

            //取消分享按钮
            "#sharearea click": function(){
                $("#sharearea").hide();
            },

            //进行投票，并且刷新页面上的票数
            ".page3-r2  .a1 click": function(){
                var that = this;
                var clickTimes = $.fn.cookie('clickTimes');
                if(clickTimes && clickTimes.split("-")[1] > 0){
                    $.fn.cookie('clickTimes',  clickTimes.split("-")[0] + "-" + (parseInt(clickTimes.split("-")[1]) -1));;
                    $("#clickTimes").text( parseInt(clickTimes.split("-")[1]) -1 );
                }
                else if(clickTimes && clickTimes.split("-")[1] < 1){
                    return;
                }

                var params = {
                    'voteType': 'XXMAN'
                };
                var num = freshNum;
                if($(".people>li").index($(".people>li.active")) != -1){
                    num =$(".people>li").index($(".people>li.active"));
                }
                num = num -1;

                params.voteNo = freshNum-num;

                //刷新投票数
                var voteTicket = new Vote(params);
                voteTicket.sendRequest()
                    .done(function(data) {
                        ticketList = data.infos;
                        var tickets = that.getTicketsByNo(ticketList, num);
                        $("#clickNum").text(tickets);
                        that.tabUnlock(tickets);
                    })
                    .fail(function(error) {
                        console.error(error);
                    })
            },

            //领优惠券
            ".dialog-phone .btn click":function(){
                var that = this;
                if(!((/^1[0-9]{9}/).test($("#phoneNum").val()) && $("#phoneNum").val().length == 11)){
                    $("#username-error-tips").text('号码格式不正确！');
                    return ;
                }

                var day = (new Date()).getDate();
                var coupon1id = this.coupon1Map[day] || defaultCouponid;

                var receiveShareCoupon = new SFReceiveCoupon({
                    bagId: coupon1id,
                    mobile: $("#phoneNum").val(),
                    type: "CARD",
                    receiveChannel: 'B2C',
                    receiveWay: 'ZTLQ'
                });
                receiveShareCoupon.sendRequest()
                    .done(function(data) {
                        $('.dialog-phone').addClass('hide');
                        $('.dialog-success').removeClass('hide');
                    })
                    .fail(function(error) {
                        $("#username-error-tips").text(that.errorMap[error] || '领取失败');
                        return  false;
                    });
            },

            //每天的优惠券id
            coupon1Map: {
                "13": '1',
                "14": '2',
                "15": '3',
                "16": '4',
                "17": '5',
                "18": '6',
                "19": '7',
                "20": '8'
            },

            //领取优惠券失败的id
            errorMap: {
                "11000020": "卡券不存在",
                "11000030": "卡券已作废",
                "11000050": "卡券已领完",
                "11000100": "您已领过该券",
                "11000130": "卡包不存在",
                "11000140": "卡包已作废"
            },

            //点击下一个或者是上一个的时候触发的东东,index为第几个图片
            changFresh:function(index){
                $(".tab li").eq(0).addClass('active').siblings().removeClass('active');  //默认第一个tab为激活状态
                var tickets = this.getTicketsByNo(ticketList, freshNum-index);
                $("#clickNum").text(tickets);   //更新扒的票数
                this.tabUnlock(tickets);   //更新tab的解锁

                var people_index=freshNum-index;
                var photo_index=1;
                $('.people>li').eq(10-index).find('img').attr('src','../img/young/photo/'+people_index+'/'+photo_index+'.jpg');
                $('.people>li').eq(10-index).find('.people-lock').hide();  //去掉蒙层
            },

            //根据小鲜肉的牌号，获取投票数,num为图上的序列号
            getTicketsByNo:function(ticketList, num){
                var tickets = 0;
                if(ticketList != null && ticketList.length > 0){
                    for(var i = 0; i < ticketList.length; i++){
                        if(parseInt(ticketList[i].voteNo) == freshNum - num){
                            tickets = ticketList[i].voteNum;
                        }
                    }
                }

                return tickets;
            },

            //每次进入页面查询出所有的投票记录
            getTicketList: function(){
                var voteNum = new VoteNum({'voteType':'XXMAN'});
                var that =  this;
                voteNum.sendRequest()
                    .done(function(data) {
                        ticketList =  data.infos;
                        $("#clickNum").text(that.getTicketsByNo(ticketList, freshNum));
                        that.tabUnlock(that.getTicketsByNo(ticketList, freshNum));
                    })
                    .fail(function(error) {
                        console.error(error);
                    })
            },

            //根据票数判断标签页是否解锁以及百分比滚动条
            tabUnlock: function(num){
                if(num > mi){
                    $(".tab li").removeClass("tab-lock");
                    $(".tab li").find("span").removeClass("lock").addClass("unlock");
                    $(".bar-current").css("width","100%");
                }
                else if(num > banLuo){
                    $(".tab li").removeClass("tab-lock");
                    $(".tab li").eq(3).addClass("tab-lock");
                    $(".tab li").find("span").removeClass("lock").addClass("unlock");
                    $(".tab li").eq(3).find("span").removeClass("unlock").addClass("lock");
                    $(".bar-current").css("width","75%");
                }
                else if(num > xiaoXiu){
                    $(".tab li").removeClass("tab-lock");
                    $(".tab li").eq(2).addClass("tab-lock");
                    $(".tab li").eq(3).addClass("tab-lock");
                    $(".tab li").find("span").removeClass("lock").addClass("unlock");
                    $(".tab li").eq(3).find("span").removeClass("unlock").addClass("lock");
                    $(".tab li").eq(2).find("span").removeClass("unlock").addClass("lock");
                    $(".bar-current").css("width","50%");
                }
                else {
                    $(".tab li").addClass("tab-lock");
                    $(".tab li").eq(0).removeClass("tab-lock");
                    $(".tab li").find("span").removeClass("unlock").addClass("lock");
                    $(".tab li").eq(0).find("span").removeClass("lock").addClass("unlock");
                    $(".bar-current").css("width","25%");
                }
            }
        });
         new young("body");
    });
