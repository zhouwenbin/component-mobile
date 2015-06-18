$(function(){
  $('.nataral-classify-h').click(function(){
    $('.nataral-classify').removeClass('active');
    $(this).parents('.nataral-classify').toggleClass('active');
  })
  $('.nataral-classify-b li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  })
  $('.nataral-tab li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index=$('.nataral-tab li').index(this);
    $('.nataral-tab-b').eq(index).addClass('active').siblings().removeClass('active');
  })
  $('.nataral-brand li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  })
})