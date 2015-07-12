$(function(){
	
    
    var audio=$('#audio');
    var index = 0;
    var people_num=$('.people>li').length;
    function sliderLeft(){
    	$('.page3').addClass('active');
		if(index<people_num-1){
			index++;
			$('.people>li').eq(people_num-index).addClass('active');
			
		}
	}
	function sliderRight(){
		$('.page3').addClass('active');
		if(index>0){
			index--;
			$('.people>li').eq(people_num-index-1).removeClass('active');
			
		}
	}
    //单页滚动
    $('.wp-inner').fullpage();
    //一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
     document.getElementById('audio').play();
    //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
    document.addEventListener("WeixinJSBridgeReady", function () {
        document.getElementById('audio').play();
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
	//翻牌
	$('.page1 .icon1').click(function(){
		$('.page1').addClass('active');
		$(this).hide();
		$('.page1 .start').show();
	})
	//图片切换
	
	
	$('.next').click(function(){
		sliderRight()
	})
	$('.prev').click(function(){
		sliderLeft()
			
	})
	$('.people').swipeLeft(function(){
		sliderLeft()
	})
	$('.people').swipeRight(function(){
		sliderRight()
	})
	//tab切换
	$('.tab li').click(function(){
		var tab_index=$('.tab li').index(this);
		var people_index=people_num-index;
		var photo_index=tab_index+1;
		$('.people>li').eq(people_num-1-index).find('img').attr('src','../img/young/photo/'+people_index+'/'+photo_index+'.jpg');
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).hasClass('tab-lock')){
			$('.people>li').eq(people_num-1-index).find('.people-lock').show();
		}else{
			$('.people>li').eq(people_num-1-index).find('.people-lock').hide();
		}
	})
	//弹窗
	$('.page3 .a2').click(function(){
		$('.dialog-phone').removeClass('hide');
	})
	$('.dialog-phone .btn').click(function(){
		$('.dialog-phone').addClass('hide');
		$('.dialog-success').removeClass('hide');
	})
	$('.dialog-success .btn').click(function(){
		$('.dialog-success').addClass('hide');
	})
})