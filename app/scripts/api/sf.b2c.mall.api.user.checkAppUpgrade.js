// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.checkAppUpgrade
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.checkAppUpgrade',
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
      METHOD_NAME: 'user.checkAppUpgrade',
      SECURITY_TYPE: SecurityType.RegisteredDevice.name,
      REQUIRED: {
        'appVersion': 'string',
        'moduleVersion': 'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    }
  });
});