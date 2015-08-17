// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.share.shareUrl
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.share.shareUrl',
[
  'zepto',
  'can',
  'underscore',
  'sf.b2c.mall.framework.comm',
  'sf.b2c.mall.api.security.type'
],
function($, can, _, Comm, SecurityType) {
  'use strict';

  return Comm.extend({
    api: {
      METHOD_NAME: 'share.shareUrl',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: {
        'url': 'string',
        'target': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '18000001': '没有分享活动',
        '18000002': '用户已获取过奖励',
        '18000003': '用户未登录',
        '18000004': 'Url不满足任何规则'
      }
    }
  });
});