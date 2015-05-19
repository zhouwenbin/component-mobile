$(function(){
  $('#orderdetail-more').click(function(){
     var parent=$(this).parents(".orderinfo-b");
    parent.toggleClass("active");
    if(parent.hasClass('active')){
      $(this).text('收起');
    }else{
      $(this).text('查看更多');
    }
    
  })
})
