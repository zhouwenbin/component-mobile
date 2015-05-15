$(function(){
  $('.cart li').swipeLeft(function(){
    $(this).css({
      left:-61
    })
  })
  $('.cart li').swipeRight(function(){
    $(this).css({
      left:0
    })
  })
})
