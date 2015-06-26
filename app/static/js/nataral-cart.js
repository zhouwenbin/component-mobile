$(function(){
  $('.nataral-product .icon66').click(function(){
    var that = $(this).parents('li').find('img').eq(-1);
    var target=$('.icon65 .dot-error').offset()
    var targetX=target.left,
        targetY=target.top,
        current=that.offset(),
        currentX=current.left,
        currentY=current.top,
        cart_num=$('.dot-error').text();
    that.clone().appendTo(that.parent());
    that.css({
      left:targetX-currentX,
      top:targetY-currentY,
      borderRadius:'50%',
      transform:'rotate(360deg) scale(0.1)',
      zIndex:1000,
      visibility:'hidden'
    })
    
    setTimeout(function(){
        that.remove();
    },1000);
    cart_num++;
    $('.dot-error').text(cart_num);
    return false;
  })
})