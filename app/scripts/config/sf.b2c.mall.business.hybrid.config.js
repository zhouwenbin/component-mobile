define(['zepto'], function ($) {
  'use strict';

  var MD5_KEY = 'www.sfht.com';

  var NONE_APPEND_WORD = 'sfhaitao.xyz!';
  var M_HOST = 'http://m.sfht.com/';
  var VER = $('#version').attr('data-version') || Date.now();

  var DEFAULT_REQUEST_HEADER = {
    _aid: 3,
    _sm: 'md5'
  };

  var host = window.location.hostname;
  var DEV_API_URL = {
    url: 'http://m.sfht.com/m.api',
    fileurl: 'http://m.sfht.com/file.api'
  };

  var IS_IN_APP = true;

  var DEV_FILE_LINK = {
    'agreement'         : M_HOST + 'agreement.html?t='+VER,
    'alipayframe'       : M_HOST + 'alipayframe.html?t='+VER,
    'center'            : M_HOST + 'center.html?t='+VER,
    'detail'            : M_HOST + 'detail/',
    'gotopay'           : M_HOST + 'gotopay.html?t='+VER,
    'index'             : M_HOST + 'index.html',
    'login'             : M_HOST + 'login.html?t='+VER,
    'order'             : M_HOST + 'order.html?t='+VER,
    'orderdetail'       : M_HOST + 'orderdetail.html?t='+VER,
    'orderlist'         : M_HOST + 'orderlist.html?t='+VER,
    'pay-success'       : M_HOST + 'pay-success.html?t='+VER,
    'register'          : M_HOST + 'register.html?t='+VER,
    'coupon'            : M_HOST + 'coupon.html?t='+VER,
    'setpassword'       : M_HOST + 'setpassword.html?t='+VER,
    'bindaccount'       : M_HOST + 'bindaccount.html?t='+VER,
    'weixincenter'      : M_HOST + 'weixincenter.html?t='+VER,
    'luckymoneyshare'   : M_HOST + 'luckymoneyshare.html?t='+VER,
    'luckymoneyaccept'  : M_HOST + 'luckymoneyaccept.html?t='+VER,
    'recaddrmanage'     : M_HOST + 'recaddrmanage.html?t='+VER,
    'getalipaycoupon'   : M_HOST + 'getcoupons.html?t='+VER,
    'paysuccess'        : M_HOST + 'pay-success?t='+VER
  }

  return {
    setting:{
      'ver': VER,
      'none_append_word': NONE_APPEND_WORD,
      'default_header': DEFAULT_REQUEST_HEADER,
      'md5_key': MD5_KEY,
      'api': DEV_API_URL,
      'link': DEV_FILE_LINK,
      'is_app': IS_IN_APP
    }
  };
});