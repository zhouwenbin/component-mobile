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
  var tabNum=$('.nataral-tab-scroll li').length;
  if(tabNum>4){
    $('.nataral-tab-icon').css({'display':'block'});
    $('.nataral-tab ul').css({
      'width':25 * tabNum +'%'
    });
    new window.IScroll('.nataral-tab-scroll .nataral-tab-item', { click:iScrollClick(), scrollX: true,scrollY: false });
  }
  $('.nataral-tab-scroll .nataral-tab-icon').click(function(){
    $('.nataral-tab-open').addClass('active');
  })
  $('.nataral-tab-open .nataral-tab-icon').click(function(){
    $('.nataral-tab-open').removeClass('active');
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
  var nataral_tab_position=$('.nataral-tab-scroll').offset().top;
  var nataralTabId = [];
  var nataralTabOffset = [];
  var nataralNavHeight = $('.nataral-tab-scroll').height();
  var width = $('.nataral-tab-scroll li').width();
  $(window).scroll(function(){
    if($(window).scrollTop()>=nataral_tab_position){
      $('.nataral-tab-scroll').addClass('nataral-tab-fixed');
    }else{
      $('.nataral-tab-scroll').removeClass('nataral-tab-fixed');
    }

    for(var i = 0;i < tabNum;i ++){
      nataralTabId[i] = $('.nataral-tab-scroll li').eq(i).find('a').attr('href');
      nataralTabOffset[i] = $(nataralTabId[i]).offset().top - nataralNavHeight;
      if($(window).scrollTop() >= nataralTabOffset[i]){
        $('.nataral-tab-scroll li').eq(i).addClass('active').siblings().removeClass('active');
        $('.nataral-tab-open li').eq(i).addClass('active').siblings().removeClass('active');
        if(i > 3){
          var translate = - width * (i - 3);
          $('.nataral-tab-scroll ul').css({
            "transform": "translate(" + translate + "px,0) translateZ(0)" 
          })
        }else{
          $('.nataral-tab-scroll ul').css({
            "transition-duration": "500ms",
            "transform": "translate(0,0) translateZ(0)" 
          })
        }
      }
    }
  })
    
  //tab切换
  $('.nataral-tab-open li').on('click',function(){
    var index = $('.nataral-tab-open li').index(this);
    $(window).scrollTop(nataralTabOffset[index]);
    $('.nataral-tab-open').removeClass('active');
  })

})