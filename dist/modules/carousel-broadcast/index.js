define(['jquery'], function ($){
	var $list = $('.carousel-broadcast ul');

	function init(){
		setInterval(scroll,3000);
	}

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

	return{
		init: init
	}

})
	