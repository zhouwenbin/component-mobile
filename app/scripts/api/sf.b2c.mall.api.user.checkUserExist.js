// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.checkUserExist
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.checkUserExist',
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
      METHOD_NAME: 'user.checkUserExist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: {
        'accountId': 'string',
        'type': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '1000340': '用户账户还没有密码'
      }
    }
  });
});