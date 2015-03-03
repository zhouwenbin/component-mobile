'use strict';

define(
  [
    'can',
    'zepto',
    'sf.weixin',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, SFWeixin, SFConfig) {

    SFWeixin.shareIndex();

  })