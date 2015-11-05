$(function(){
  $('.tuantab li').click(function(){
  	var index = $('.tuantab li').index(this);
  	$('.tuantab li').eq(index).addClass('active').siblings().removeClass('active');
  	$('.tuantab-content').eq(index).addClass('active').siblings().removeClass('active');
  })

  $('.tuanbtn .btn').click(function(){
  	$('.tuandialog').removeClass('hide');
  })

  $('.tuandialog .btn').click(function(){
  	$('.tuandialog').addClass('hide');
  	$('.tuanshare').removeClass('hide');
  })
})