$(function(){
  (new MetaHandler()).fixViewportWidth(); 
	$('.tab2-h li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index=$('.tab2-h li').index(this);
    $('.tab2-b').eq(index).addClass('active').siblings().removeClass('active');
    return false;
  })
  $('.children-day .a1').click(function(){
    $('.m-dialog').show();
    return false;
  })
  $('.m-dialog .close').click(function(){
    $('.m-dialog').hide();
    return false;
  })
})