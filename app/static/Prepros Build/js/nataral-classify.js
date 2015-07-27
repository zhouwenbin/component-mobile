$(function(){
  //类目展开
  $('.nataral-classify-h').click(function(){
    $('.nataral-classify').removeClass('active');
    $(this).parents('.nataral-classify').toggleClass('active');
  })
  //类目列表选择
  $('.nataral-classify-b li').click(function(){
    $('.nataral-classify-b li').removeClass('active');
    $(this).addClass('active');
    setTimeout(function(){
      $('.nataral-tab-b').removeClass('active');
      $('.nataral-tab li').removeClass('active');
      $('.nataral-product').show();
    },500);
  })
  //tab切换
  $('.nataral-tab li').click(function(){
    $(this).toggleClass('active').siblings().removeClass('active');
    var index=$('.nataral-tab li').index(this);
    $('.nataral-tab-b').eq(index).toggleClass('active').siblings().removeClass('active');
    $('.nataral-product').hide();
  })
  //品牌列表选择
  $('.nataral-brand li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    setTimeout(function(){
      $('.nataral-tab-b').removeClass('active');
      $('.nataral-tab li').removeClass('active');
      $('.nataral-product').show();
    },500);
  })
  //台湾全部商铺
  $('.nataral-brand-h').click(function(){
    $(this).parent().toggleClass('active');
  })
  //tab置顶
  var nataral_tab_position=$('.nataral-tab').offset().top;
  $(window).scroll(function(){
    if($(window).scrollTop()>=nataral_tab_position){
      $('.nataral-tab ul').addClass('nataral-tab-fixed');
    }else{
      $('.nataral-tab ul').removeClass('nataral-tab-fixed');
    }
  })
})