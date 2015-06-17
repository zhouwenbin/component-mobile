$(function(){
  $('.nataral-classify-btn').click(function(){
    $(this).parents('.nataral-classify').toggleClass('active');
  })
  $('.nataral-classify-b li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  })
  $('.nataral-tab li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  })
})