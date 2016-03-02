$(function(){
  var goodsUl= $('.oneline-scroll ul');
  var goodsLi = $('.oneline-scroll li');
  var goodsNum = goodsLi.length;
  var goodsWidth = goodsLi.width();
  goodsUl.width((goodsWidth + 20) * goodsNum);
  new IScroll('.oneline-scroll', { eventPassthrough: true,scrollX: true});
})