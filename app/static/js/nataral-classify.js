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
  
  //导航滚动
  var tabNum=$('.nataral-tab li').length;
  if(tabNum>4){
    $('.nataral-tab-icon').css({'display':'block'});
    $('.nataral-tab ul').css({
      'width':25 * tabNum +'%'
    });
    new window.IScroll('.nataral-tab-item', { click:iScrollClick(), scrollX: true,scrollY: false });
  }
  $('.nataral-tab-icon').click(function(){
    $(this).parents('.nataral-tab').toggleClass('active');
    if($('.nataral-tab').hasClass('active')){
      new window.IScroll('.nataral-tab-item', { click:iScrollClick(), scrollX: false });
    }else{
      new window.IScroll('.nataral-tab-item', { click:iScrollClick(), scrollX: true,scrollY: false });
    }
  })
  function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
       var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,4);
       return parseFloat(s[0]+s[3]) < 44 ? false : true
      }
  }
  //tab置顶
  var nataral_tab_position=$('.nataral-tab').offset().top;
  var nataralTabId = [];
  var nataralTabOffset = [];
  var nataralNavHeight = $('.nataral-tab').height();
  $(window).scroll(function(){
    if($(window).scrollTop()>=nataral_tab_position){
      $('.nataral-tab').addClass('nataral-tab-fixed');
    }else{
      $('.nataral-tab').removeClass('nataral-tab-fixed');
    }

    for(var i=0;i<tabNum;i++){
      nataralTabId[i] = $('.nataral-tab li').eq(i).find('a').attr('href');
      nataralTabOffset[i] = $(nataralTabId[i]).offset().top - nataralNavHeight;
      if($(window).scrollTop() >= nataralTabOffset[i]){
        $('.nataral-tab li').eq(i).addClass('active').siblings().removeClass('active');
      }
    }
  })
    
  //tab切换
  $('.nataral-tab li').on('touchend',function(){
    var index=$('.nataral-tab li').index(this);
    $(window).scrollTop(nataralTabOffset[index]);
  })

})