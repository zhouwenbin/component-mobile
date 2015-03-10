'use strict';

define(
  [
    'can',
    'zepto',
    'sf.weixin',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config'
  ],
  function(can, $, SFWeixin, SFFrameworkComm, SFConfig) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

  })