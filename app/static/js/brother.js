$(function() {
  $('.sfBrotherDTTb li').on('click', function(event) {
    var tabBtnIndex = $('.sfBrotherDTTb li').index(this);
    $('.sfBrotherDTTb li:eq('+tabBtnIndex+')').removeClass('noFocus').siblings('.sfBrotherDTTb li').addClass('noFocus');
    $('.sfBrotherDTCn:eq('+tabBtnIndex+')').removeClass('hide').siblings('.sfBrotherDTCn').addClass('hide')
  });
});