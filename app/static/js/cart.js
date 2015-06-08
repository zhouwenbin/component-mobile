$(function(){
  $('.cart li').swipeLeft(function(){
    $(this).css({
      left:-61*2/640*16+'rem'
    })
  })
  $('.cart li').swipeRight(function(){
    $(this).css({
      left:0
    })
  })
  $('.cart li').tap(function(){
    $(this).addClass('active').siblings().removeClass('active');
  })
})
