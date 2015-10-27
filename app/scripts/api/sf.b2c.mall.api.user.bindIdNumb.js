// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.bindIdNumb
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.bindIdNumb',
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
      METHOD_NAME: 'user.bindIdNumb',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: {
        'idNumb': 'string',
        'dept': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '1000510': '用户已经绑定过工号了',
        '1000520': '该工号已经被其他用户绑定了'
      }
    }
  });
});