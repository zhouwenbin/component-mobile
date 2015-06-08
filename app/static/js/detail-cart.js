//----------加入购物车-------------//
  $('#addtocart-btn').click(function(){
    var that = $('.addtocart-img:last-child');
    var target=$('.icon47').offset()
    var targetX=target.left,
        targetY=target.top,
        current=that.offset(),
        currentX=current.left,
        currentY=current.top,
        cart_num=$('.dot-error').text();
    that.clone().appendTo(that.parent());
    that.css({
      left:targetX-currentX-100,
      top:targetY-currentY,
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
  });