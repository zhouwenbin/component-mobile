$(function(){
  var bannerGoodsNum = $('.banner-goods li').length;
  var bannerGoodsWidth = $('.banner-goods li').width();
  $('.banner-goods .new-goods-list').width((bannerGoodsWidth + 16) * bannerGoodsNum);
  new IScroll('.banner-goods', { eventPassthrough: true,scrollX: true});
  
  var domWidth = 0;
  $.each($('.tabnav-box li'),function(key,value){
  	domWidth += $(value).width() + 44 ;
  })
  console.log(domWidth);
  $('.tabnav-box ul').width(domWidth);
  new IScroll('.tabnav-box', { eventPassthrough: true,scrollX: true});
})