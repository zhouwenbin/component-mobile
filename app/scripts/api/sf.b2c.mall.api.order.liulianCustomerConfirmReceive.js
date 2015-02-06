// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.order.liulianCustomerConfirmReceive
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.order.liulianCustomerConfirmReceive',
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
      METHOD_NAME: 'order.liulianCustomerConfirmReceive',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: {
        'subOrderId': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '4000100': 'order unkown error',
        '4000900': '子订单状态不符合确认操作'
      }
    }
  });
});