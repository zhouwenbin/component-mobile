$(function(){
  var bannerGoodsNum = $('.banner-goods li').length;
  var bannerGoodsWidth = $('.banner-goods li').width();
  $('.banner-goods .new-goods-list').width((bannerGoodsWidth + 16) * bannerGoodsNum);
  new IScroll('.banner-goods', { eventPassthrough: true,scrollX: true});
  var bannerGoodsNum = $('.baby-times-ct li').length;
  var bannerGoodsWidth = $('.baby-times-ct li').width();
  $('.baby-times-ct ul').width(bannerGoodsWidth * bannerGoodsNum);
  new IScroll('.baby-times-ct', { eventPassthrough: true,scrollX: true});
})