// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.partnerAppLogin
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.partnerAppLogin',
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
      METHOD_NAME: 'user.partnerAppLogin',
      SECURITY_TYPE: SecurityType.RegisteredDevice.name,
      REQUIRED: {
        'partnerId': 'string',
        'authResp': 'string',
      },
      OPTIONAL: {
        'rembFlag': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '1000320': '用户未授权',
        '1000370': '支付宝验签失败'
      }
    }
  });
});