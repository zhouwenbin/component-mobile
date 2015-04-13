// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.partnerBind
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.partnerBind',
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
      METHOD_NAME: 'user.partnerBind',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: {
        'tempToken': 'string',
        'type': 'string',
        'accountId': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '1000020': '账户已注册',
        '1000350': '验证临时token失败,请重新登录',
        '1000360': '第三方账户已绑定海淘账户'
      }
    }
  });
});