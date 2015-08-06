$(function(){
	var header_height=$('.header').height();
	$(window).scroll(function(){
		if($('body').scrollTop()>header_height){
			$('.nav2').addClass('nav2-fixed')
		}else{
			$('.nav2').removeClass('nav2-fixed')
		}
	})
})