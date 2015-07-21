// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.coupon.bindCard
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.coupon.bindCard',
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
      METHOD_NAME: 'coupon.bindCard',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: {
        'name': 'string',
        'mobile': 'string',
        'ids': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '11000240': '用户今天的券已经领完了',
        '11000250': '用户已经领完该活动期间所有的券',
        '11000260': '用户输入手机号有误'
      }
    }
  });
});