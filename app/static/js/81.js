$('.wp-inner').fullpage();
$(function(){
	//翻牌
	$('.page1 .icon1').click(function(){
		$('.page1').addClass('active');
		$(this).hide();
		$('.page1 .start').show();
	})
	//图片切换
	var index = 0;
	$('.next').click(function(){
		if(index<10){
			$('.people>li').eq(10-index).addClass('active');
			index++;
		}
		
		
	})
	$('.prev').click(function(){
		if(index>0){
			$('.people>li').eq(11-index).removeClass('active');		
			index--;
		}
			
	})
	$('.people').swipeLeft(function(){
		if(index<10){
			$('.people>li').eq(10-index).addClass('active');
			index++;
		}
	})
	$('.people').swipeRight(function(){
		if(index>0){
			$('.people>li').eq(11-index).removeClass('active');		
			index--;
		}
	})
	//tab切换
	$('.tab li').click(function(){
		var tab_index=$('.tab li').index(this);
		var people_index=11-index;
		var photo_index=tab_index+1;
		$('.people>li').eq(10-index).find('img').attr('src','../img/young/photo/'+people_index+'/'+photo_index+'.jpg');
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).hasClass('tab-lock')){
			$('.people>li').eq(10-index).find('.people-lock').show();
		}else{
			$('.people>li').eq(10-index).find('.people-lock').hide();
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
	//扒衣
	$('.page3-r2 .a1').click(function(){
		var text=$('.bubble').text();
		text++;

		$('.tooltip').addClass('active');
		setTimeout(function(){
			$('.page3-r2 .a2').removeClass('disabled');
			$('.bubble').show();
			$('.tooltip').removeClass('active');
			$('.bubble').text(text);
		},2000)
			
	})

	
	
})