define(['jquery'], function ($){
	$('.elevator-arrow').click(function(){
		$('.elevator-more').removeClass('hide');
	})
	$('.elevator-more .elevator-arrow').click(function(){
		$('.elevator-more').addClass('hide');
	})

})
	