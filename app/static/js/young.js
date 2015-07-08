$('.wp-inner').fullpage();
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
		}
		
		
	})
	$('.prev').click(function(){
		if(index>0){
			$('.people>li').eq(12-index).removeClass('active');		
			index--;
		}
			
	})
	$('.people').swipeRight(function(){
		if(index<11){
			$('.people>li').eq(11-index).addClass('active');
			index++;
		}
	})
	$('.people').swipeLeft(function(){
		if(index>0){
			$('.people>li').eq(12-index).removeClass('active');		
			index--;
		}
	})
	$('.tab li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
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