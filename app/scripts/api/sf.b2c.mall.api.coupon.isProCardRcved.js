// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.coupon.isProCardRcved
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.coupon.isProCardRcved',
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
      METHOD_NAME: 'coupon.isProCardRcved',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: {
        'proName': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '11000020': '卡券id不存在'
      }
    }
  });
});