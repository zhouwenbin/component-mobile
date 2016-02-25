define(['jquery'], function ($){
	var $list = $('.carousel-broadcast ul');

	function scroll(){
		$list.animate({
			top : '-22px'
		},500,function(){
			$list.find('li').eq(0).appendTo($list);
			$list.css({
				top : '0'
			})
		})
	}

	setInterval(scroll,3000);

})
	