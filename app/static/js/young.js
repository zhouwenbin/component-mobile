$('.wp-inner').fullpage({
  loop:true
});
$(function(){
	$('.icon1').click(function(){
		$('.page1 .photo').addClass('active');
		$(this).hide();
	})
	var index = 0;
	$('.next').click(function(){
		if(index<11){
			$('.people>li').eq(11-index).addClass('active');
			index++;
			console.log(index)
		}
		
		
	})
	$('.prev').click(function(){
		if(index>0){
			$('.people>li').eq(12-index).removeClass('active');		
			index--;
			console.log(index)
		}
			
	})
	$('.tab li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
})