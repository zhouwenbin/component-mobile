define(['jquery'], function ($){
  var goodsUl= $('.recommend02 ul');
  var goodsLi = $('.recommend02 li');
  var goodsNum = goodsLi.length;
  var goodsWidth = goodsLi.width();
  goodsUl.width((goodsWidth + 10) * goodsNum);
})