$(function(){

	//播放视频
  $('.m81-play').click(function(){
    $('.m81-video').show();
    $('video')[0].play();
    return false;
  })
  $('html').click(function(){
    $('.m81-video').hide();
    $('video')[0].pause();
  })
})