$(function(){
  $('#orderdetail-more').click(function(){
     var parent=$(this).parents(".orderinfo-b");
    parent.toggleClass("active");
    if(parent.hasClass('active')){
      $('#orderdetail-more-text').text('收起');
    }else{
      $('#orderdetail-more-text').text('查看更多');
    }
    
  })
})
