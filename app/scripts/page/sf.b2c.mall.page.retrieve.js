/**
 * Created by zhangke on 2015/5/7.
 */
'use strict';

define(
  'sf.b2c.mall.page.retrieve',
  [
    'zepto',
    'can',
    'fastclick',
    'sf.b2c.mall.component.retrieve',
    'sf.b2c.mall.framework.comm',
    'sf.weixin'
  ],
  function ($, can, Fastclick, SFRetrieve, SFFrameworkComm, SFWeixin) {

    Fastclick.attach(document.body);

    SFFrameworkComm.register(3);

    SFWeixin.shareIndex();

    var retrieve = new SFRetrieve('body');
  });