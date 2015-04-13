// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.partnerLogin
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.partnerLogin',
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
      METHOD_NAME: 'user.partnerLogin',
      SECURITY_TYPE: SecurityType.None.name,
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
        '1000370': '第三方账户已绑定海淘账户'
      }
    }
  });
});