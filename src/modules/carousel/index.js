define(['jquery'], function ($){
	var $show = $(".carousel");
	var $list = $show.find("li");
	var $btn = $(".go");

	function init() {
		$btn.on("click", function() {
		  
		  if( $btn.prop("disabled") ) { return; }
		  
		  var i = 0;  //已跑次数.
		  var min = $list.length * 4;  //最少跑多少圈.
		  var now = 0;  //当前格子索引.
		  var animateTime = 20;  //动画持续时间.
		  var step = 10;  //动画时间增量.
		  
		  //生成结果.
		  var revalue = (Math.random() * 8)|0;
		  
		  //禁用按钮.
		  $btn.prop("disabled", true);
		  
		  //抽奖动画.
		  function animate(target) {
		    
		    target == undefined && (target = revalue);
		    
		    $list.removeClass("now").eq(target).addClass("now");
		    
		    //速度越来越慢.
		    animateTime += step;
		    
		    //已跑次数递增 1 次.
		    i += 1;
		    
		  };
		  
		  function play() {
		    
		    animate(now);
		    
		    //如果未到最小次数，位置进一.
		    i <= min && (now += 1);
		    //如果跑到最后一格，则从头再跑.
		    now > 7 && (now = 0);
		    
		    //未达到最小次数，则继续跑；否则导去结果.
		    i <= min
		      ? setTimeout(play, animateTime)
		      : stop();
		  }
		  
		  function stop() {
		    
		    if( now != revalue ) {
		      setTimeout(stop, animateTime);
		      animate(now++);
		    } else {
		      setTimeout(animate, animateTime);
		      setTimeout(function() {
		        $btn.prop("disabled", false);
		      }, animateTime + step);
		    }
		    
		    return;
		  }
		  play();
		});
	}

		
	return{
		init: init
	}

})
	