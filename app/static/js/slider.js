$(function(){
  var length=$(".swipe-wrap>div").length;
  var swipeDot='';
  for(var i=0;i<length;i++){
    swipeDot+='<span></span>'
  }
  $('.swipe-dot').append(swipeDot);
  $('.swipe-dot span').eq(0).addClass('active');
})
window.mySwipe = new Swipe(document.getElementById('slider'), {
  startSlide: 0,
  speed: 400,
  auto: 0,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function(index, elem) {
    $('.swipe-dot span').eq(index).addClass('active').siblings().removeClass('active');
  },
  transitionEnd: function(index, elem) {}
});