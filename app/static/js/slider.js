window.mySwipe = new Swipe(document.getElementById('slider'), {
  startSlide: 1,
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