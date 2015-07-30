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
        'jweixin',
        'sf.hybrid',
        'vendor.page.response'
    ],
    function(can, $, cookie, touch,  store, Fastclick, _, md5, SFComm, SFConfig, SFFn, SFMessage, ZfullPage, VoteNum, Vote,SFWeixin,SFReceiveCoupon,  SFSwitcher,jweixin,SFHybrid, PageResponse){
        Fastclick.attach(document.body);
        SFComm.register(3);
        SFWeixin.shareYoung();

        var xingNan = 1000;
        var xiaoXiu = 100000;
        var banLuo = 150000;
        var mi = 300000;
        var ticketList = null;
        var freshNum = 15;
        var defaultCouponid = 100;
        var startFlag = false;
        var index = 0;
        var MESSAGE_CLOSE_TIME = 3000;
        var young= can.Control.extend({
            ".people .btn click":function(){
                //微信分享
                if (SFFn.isMobile.WeChat()) {
                    $("#sharearea").show();
                }
                var title = "姐妹们，一起帮忙扒" + (index+1) + "号~";
                var desc = "顺丰海淘裸价狂欢，4个字——划算到爆。";
                var link ="http://m.sfht.com/ouba.html";
                var imgUrl = 'http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+(freshNum-index)+'/'+'1.jpg'
                SFWeixin.shareYoung(title,desc,link, imgUrl);
            }  ,
            /**
             * @description 初始化方法，当调用new时会执行init方法
             * @param  {Dom} element 当前dom元素
             * @param  {Map} options 传递的参数
             */
            init: function(element, options) {

                $('.wp-inner').fullpage();
                $.fn.fullpage.stop();

                var switcher = new SFSwitcher();
                switcher.register('app', function(){
                    // new PageResponse({
                    //     class : 'page',     //模块的类名，使用class来控制页面上的模块(1个或多个)
                    //     mode : 'auto',     // auto || contain || cover
                    //     width : '640',      //输入页面的宽度，只支持输入数值，默认宽度为320px
                    //     height : '1006'      //输入页面的高度，只支持输入数值，默认高度为504px
                    // });
                });

                switcher.register('web', function(){});
                switcher.go();

                $("#nextPage").css("display","none");
                this.getTicketList();
                var that = this;
                var audio=$('#audio');

                //一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
                audio[0].play();
                //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
                document.addEventListener("WeixinJSBridgeReady", function () {
                    audio[0].play();
                }, false);
                //loading效果
                setTimeout(function(){
                    $('.young-loading').hide();
                },10000);

                //播放/关闭音乐
                $('.icon-audio').click(function(){
                    if(audio.hasClass('active')){
                        audio[0].play();
                        $(this).removeClass('active');
                        audio.removeClass('active');
                    }else{
                        audio[0].pause();
                        $(this).addClass('active');
                        audio.addClass('active');
                    }
                })

                this.hideShare();
                this.getCoupon(); //初始化是否领取过优惠券
                this.bayiTimes(); //初始化每日扒衣的次数

                //进入页面初始化随机出现的欧巴
                this.getRandomFresh();
//                $(function(){

                    $('.next').click(function(){
                        $('.page3').addClass('active');
                        if(index<freshNum-1){
                            $('.people>li').eq(freshNum-1-index).addClass('active');
                            index++;
                            that.changFresh(index);
                        }
                        else{
                            index = 0;
                            $('.people>li').removeClass("active");
                            that.changFresh(index);
                        }
                    })
                    $('.prev').click(function(){
                        $('.page3').addClass('active');
                        if(index>0){
                            $('.people>li').eq(freshNum-index).removeClass('active');
                            index--;
                            that.changFresh(index);
//                            var tickets = that.getTicketsByNo(ticketList, freshNum-index);
//                            that.initActiveTab(tickets,freshNum-index,index);  //初始化话最新欧巴图片
                        }
                        else{
                            index = 14;
                            $('.people>li').addClass("active");
                            $('.people>li').eq(0).removeClass("active");
                            that.changFresh(index);
                        }
                    })

                  //左右滑动
                    $('.people').swipeRight(function(){
                        $('.page3').addClass('active');
                        if(index>0){
                            $('.people>li').eq(freshNum-index).removeClass('active');
                            index--;
                            that.changFresh(index);
//                            var tickets = that.getTicketsByNo(ticketList, freshNum-index);
//                            that.initActiveTab(tickets,freshNum-index,index);  //初始化话最新欧巴图片
                        }
                        else{
                            index = 14;
                            $('.people>li').addClass("active");
                            $('.people>li').eq(0).removeClass("active");
                            that.changFresh(index);
                        }
                    })
                    $('.people').swipeLeft(function(){
                        $('.page3').addClass('active');
                        if(index<freshNum-1){
                            $('.people>li').eq(freshNum-1-index).addClass('active');
                            index++;
                            that.changFresh(index);
                        }
                        else{
                            index = 0;
                            $('.people>li').removeClass("active");
                            that.changFresh(index);
                        }
                    })

                    //tab切换
                    $('.tab li').click(function(){
                        var tab_index=$('.tab li').index(this);
                        var people_index=freshNum-index;
                        var photo_index=tab_index+1;
                        $('.people>li').eq(freshNum-1-index).find('img').attr('src','http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+people_index+'/'+photo_index+'.jpg');
                        $(this).addClass('active').siblings().removeClass('active');
                        if($(this).hasClass('tab-lock')){
                            $('.people>li').eq(freshNum-1-index).find('.people-lock').show();
                            $('.people>li').eq(freshNum-1-index).find('.people-lock').find("p").html(that.textMap[tab_index]);
                        }else{
                            $('.people>li').eq(freshNum-1-index).find('.people-lock').hide();
                        }
                    })



            },

            ".page3 .a2 click":function(){
                var obj = $.fn.cookie('coupon20');
                var currentDate = new Date();
                if(obj && obj.split("-").length > 1){
                    if(parseInt(obj.split("-")[1]) != 1){
                        return ;
                    }
                }

                $('.dialog-phone').removeClass('hide');
                $("#username-error-tips").text("");
                $("#phoneNum").val("");
            },

            bayiTimes:function(){
                //初始化每日可以扒衣的次数
                var obj = $.fn.cookie('clickTimes');
                var currentDate = new Date();
                var flag = true;
                var times = 10;
                if(typeof obj == "undefined" || obj == null){
                    var obj =  currentDate.getDate() + "-" + 10;
                    $.fn.cookie('clickTimes', obj);
                }
                else{
                    if(parseInt(obj.split("-")[0]) != currentDate.getDate()){
                        $.fn.cookie('clickTimes',  currentDate.getDate() + "-" + 10);
                    }
                    else{
                        times =  parseInt(obj.split("-")[1]);
                        if(parseInt(obj.split("-")[1]) < 1){
                            flag = false;
                            $(".page3-r2  .a1").css("background","grey");
                            $(".page3-r2  .a1 span").html("小主，明天再来扒衣啊");
                        }
                    }
                }
                $("#clickTimes").text( parseInt(obj.split("-")[1]));
                return flag;
            },
            //优惠券的领取与否
            getCoupon:function(){
                var flag = true;
                var obj = $.fn.cookie('coupon20');
                var currentDate = new Date();
                if(typeof obj == "undefined" || obj == null){
                    var obj =  currentDate.getDate() + "-" + 1;
                    $.fn.cookie('coupon20', obj);
                }
                else{
                    if(parseInt(obj.split("-")[0]) != currentDate.getDate()){
                        $.fn.cookie('coupon20',  currentDate.getDate() + "-" + 1);
                    }
                    else{
                        if(parseInt(obj.split("-")[1]) < 1){
                            flag = false;
                            $(".page3-r2  .a2").css("background","grey");
                            $(".page3-r2  .a2 div").html("已领20元现金卷");
                            $(".page3-r2  .a2 span").html("小主，明天还有！");
                        }
                    }
                }
                return flag;
            },

            //首页点击过后才可以下拉查看
            //翻看小鲜肉图片
            ".page1 .icon1 click":function(){
                $.fn.fullpage.start();
                $("#nextPage").css("display","inline");
                $('.page1').addClass('active');
                $( ".page1 .icon1").hide();
            },

            "#goActive click":function(){
                $('#audio')[0].pause();
                window.location.href = "http://m.sfht.com/activity/439.html";
            },

            //对于非微信打开的，去掉所有的分享
            hideShare:function(){
                if (!SFFn.isMobile.WeChat()) {
                    $(".people li .btn").hide();  //小鲜肉中的分享不显示
                    $("#share").hide();    //领卷成功后的分享不显示
                    $("#share4").css("display","none");  //最后一页的分享字段不显示
                }
            },

            "#shareWeixin click":function(){
                //微信分享
//                var title = "美好肉体集中营！送钱让你扒衣服！";
//                var desc = "有肉看，有券领，不要白不要！";
//                var link ="http://m.sfht.com/activity/439.html";
//                var imgUrl = 'http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+'12/'+'1.jpg'
//                SFWeixin.shareYoung(title,desc,link, imgUrl);
                //SFWeixin.shareYoung();
                if (SFFn.isMobile.WeChat()) {
                    $("#sharearea").show();
                }
            }  ,

            popNotice:function(){
                var $el = $('<div class="dialog-cart" style="z-index:9999;position:fixed;bottom:20px;"><div class="dialog-cart-inner" style="width:242px;padding:20px 60px;"><p style="margin-bottom:10px;">' + this.getRandomAlertInfo() + '</p></div><a href="javascript:" class="icon icon108 closeDialog">关闭</a></div>');
                $(".page3-r1").append($el);
                $('.closeDialog').click(function(event) {
                    $el.remove();
                });
                setTimeout(function() {
                    $el.remove();
                }, 3000);

            },

            //进入活动页面
            "#huodong click":function(){
                window.location.href = "http://m.sfht.com/activity/439.html";

                $('#success').addClass('hide');
                $('#audio')[0].pause();
            },

            //继续扒小鲜肉
            "#goOn click": function(){
                $('#success').addClass('hide');
            },

            "#closeButton click": function(){
                $('.dialog-phone').addClass('hide');
            },

            "#share0 .btn-close click": function(){
                $('#share0').addClass('hide');
            },

            //点击分享
            "#share click": function(){
                $('#success').addClass('hide');

                //微信分享
                if (SFFn.isMobile.WeChat()) {
                    $("#sharearea").show();
                }
                var title = "姐妹们，一起帮忙扒" + (index+1) + "号~";
                var desc = "顺丰海淘裸价狂欢，4个字——划算到爆。";
                var link ="http://m.sfht.com/ouba.html";
                var imgUrl = 'http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+(freshNum-index)+'/'+'1.jpg'
                SFWeixin.shareYoung(title,desc,link, imgUrl);
            },

            "#share1 click":function(){
                $('#share0').addClass('hide');
                //微信分享
                if (SFFn.isMobile.WeChat()) {
                    $("#sharearea").show();
                }
                var title = "姐妹们，一起帮忙扒" + (index+1) + "号~";
                var desc = "顺丰海淘裸价狂欢，4个字——划算到爆。";
                var link ="http://m.sfht.com/ouba.html";
                var imgUrl = 'http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+(freshNum-index)+'/'+'1.jpg'
                SFWeixin.shareYoung(title,desc,link, imgUrl);
            },
            //取消分享按钮
            "#sharearea click": function(){
                $("#sharearea").hide();
            },

            //进行投票，并且刷新页面上的票数
            ".page3-r2  .a1 click": function(){
                var that = this;
                var clickTimes = $.fn.cookie('clickTimes');
                if(clickTimes && clickTimes.split("-").length > 1){
                    var times = parseInt(clickTimes.split("-")[1]) -1;
                    if(times < 0){
                        return ;
                    }
                    $.fn.cookie('clickTimes',  clickTimes.split("-")[0] + "-" + times);

                    if(times < 1){
                        $(".page3-r2  .a1").css("background","grey");
                        $(".page3-r2  .a1 span").html("小主，明天再来扒衣啊");
                        if (SFFn.isMobile.WeChat()) {
                            $("#share0").removeClass("hide");
                        }
                        else{
                            $("#randomText").text( "今天的扒衣机会用完啦，明天再来呀! " );
                            $("#random").css("display","block");
                            setTimeout(' $("#random").css("display","none")',2000);
                        }
                    }
                    else{
                        //扒小鲜肉的文案提示
                        $("#randomText").text(that.getRandomAlertInfo() + "今天还有" + times +  "次扒衣机会哦");
                        $("#random").css("display","block");
                        setTimeout(' $("#random").css("display","none")',2000);
                    }
                    $("#clickTimes").text( times);
                }
                var params = {
                    'voteType': 'XXMAN'
                };
//                var num = freshNum;
//                if($(".people>li").index($(".people>li.active")) != -1){
//                    num =$(".people>li").index($(".people>li.active"));
//                }
//                num = num -1;

                params.voteNo = freshNum-index;

                //刷新投票数
                var voteTicket = new Vote(params);
                voteTicket.sendRequest()
                    .done(function(data) {
//                        ticketList = data.infos;
//                        var tickets = that.getTicketsByNo(ticketList, freshNum-index);
                        $("#clickNum").text(data.infos[0].voteNum);
                        that.tabUnlock(data.infos[0].voteNum);
                   //     that.popNotice();
//                        that.initActiveTab(tickets, freshNum-num, index);
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
                        $('#success').removeClass('hide');

                        var currentDate = new Date();
                        $.fn.cookie('coupon20',  currentDate.getDate() + "-" + 0);
                        $(".page3-r2  .a2").css("background","grey");
                        $(".page3-r2  .a2 div").html("已领20元现金卷");
                        $(".page3-r2  .a2 span").html("小主，明天还有！");
                    })
                    .fail(function(error) {
                        $("#username-error-tips").text(that.errorMap[error] || '领取失败');
                        return  false;
                    });
            },

            //每天的优惠券id
            coupon1Map: {
                "13": '289',
                "14": '290',
                "15": '291',
                "16": '292',
                "17": '293',
                "18": '294',
                "19": '295',
                "20": '296'
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

            //锁的文案
            textMap: {
                "1": "被扒100,000次就看到啦！",
                "2": "被扒150,000次就看到啦！",
                "3": "被扒300,000次就看到啦！"
            },

            // 获得随机信息
            getRandomAlertInfo: function() {
                var map = {
                    "0": "哎呀，欧巴还差一点就脱了，继续扒！",
                    "1": "欧巴就要脱了！叫上闺蜜一起来！人多扒的快",
                    "2": "欧巴的衣服很脆弱，继续扒！根本停不下来！"
                };
                var random = Math.random().toString(3).substr(2, 1);
                return map[random];
            },

            //每次进入页面时，随机出现欧巴
            getRandomFresh: function(){
                var random = Math.floor(Math.random() * 7 );
                index = random;
                var len = $('.people>li').length;
                for(var i = 0; i < len; i++){
                    if(i <freshNum - index){
                        $('.people>li').eq(i).removeClass('active');
                    }
                    else{
                        $('.people>li').eq(i).addClass('active');
                    }
                }
                this.changFresh(index);

//                var tickets = this.getTicketsByNo(ticketList, freshNum-index);
//                this.initActiveTab(tickets,freshNum-index,index);
            },

            //点击下一个或者是上一个的时候触发的东东,index为第几个图片
            changFresh:function(index){
            //    $(".tab li").eq(0).addClass('active').siblings().removeClass('active');  //默认第一个tab为激活状态
                var tickets = this.getTicketsByNo(ticketList, freshNum-index);
                $("#clickNum").text(tickets);   //更新扒的票数
                this.tabUnlock(tickets);   //更新tab的解锁

                var people_index=freshNum-index;
                var photo_index=1;
                this.initActiveTab(tickets, people_index, index);
            },

            //根据小鲜肉的牌号，获取投票数,num为图上的序列号
            getTicketsByNo:function(ticketList, num){
                var tickets = 0;
                if(ticketList != null && ticketList.length > 0){
                    for(var i = 0; i < ticketList.length; i++){
                        if(parseInt(ticketList[i].voteNo) == num){
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
                        $("#clickNum").text(that.getTicketsByNo(ticketList, freshNum-index));
                        that.tabUnlock(that.getTicketsByNo(ticketList, freshNum-index));
                    })
                    .fail(function(error) {
                        console.error(error);
                    })
            },

            //根据票数，显示当前最新的扒图,index为计数器，num为小鲜肉的号码
            initActiveTab:function(tickets, Num, index){
                if(tickets > mi){
                    $(".tab li").eq(3).addClass('active').siblings().removeClass('active');
                    $('.people>li').eq(freshNum-1-index).find('img').attr('src','http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+Num+'/'+4+'.jpg');
                    $('.people>li').eq(freshNum-1-index).find('.people-lock').hide();  //去掉蒙层
                }
                else if(tickets > banLuo){
                    $(".tab li").eq(2).addClass('active').siblings().removeClass('active');
                    $('.people>li').eq(freshNum-1-index).find('img').attr('src','http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+Num+'/'+3+'.jpg');
                    $('.people>li').eq(freshNum-1-index).find('.people-lock').hide();  //去掉蒙层
                }
                else if(tickets > xiaoXiu){
                    $(".tab li").eq(1).addClass('active').siblings().removeClass('active');
                    $('.people>li').eq(freshNum-1-index).find('img').attr('src','http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+Num+'/'+2+'.jpg');
                    $('.people>li').eq(freshNum-1-index).find('.people-lock').hide();  //去掉蒙层
                }
                else{
                    $(".tab li").eq(0).addClass('active').siblings().removeClass('active');
                    $('.people>li').eq(freshNum-1-index).find('img').attr('src','http://img.sfht.com/sfhth5/1.1.143/img/young/photo/'+Num+'/'+1+'.jpg');
                    $('.people>li').eq(freshNum-1-index).find('.people-lock').hide();  //去掉蒙层
                }
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
