'use strict';

define(
  'sf.b2c.mall.page.register',
  [
    'zepto',
    'can',
    'sf.b2c.mall.component.register',
    'sf.b2c.mall.framework.comm',
    'sf.weixin'
  ],
  function ($, can, SFRegister, SFFrameworkComm, SFWeixin) {

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var login = new SFRegister('.container');
  });

