$(function(){

  //底部加载
  var num = 1; //计数器初始化为1
  var maxnum = 100; //设置一共要加载几次
  $(window).scroll(function(){
    checkload();
  })
  //建立加载判断函数

  function checkload(){
    var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
    var windowHeight = $(window).height(); //窗口的高度
    var dbHiht = $("body").height(); //整个页面文件的高度
    s= setTimeout(function(){
      if((windowHeight + srollPos) >= (dbHiht) && num != maxnum){
        LoadList();
        num++; //计数器+1
      }
    },500);
  }

  //创建ajax加载函数，并设置变量C，用于输入调用的页面频道,请根据实际情况判断使用，非必要。

  function LoadList(){
    $.get("../html/nataral-classify2-data.html", function(result){
      t = setTimeout(function(){$(".nataral-product ul").append(result)},1);
    });
  }
})