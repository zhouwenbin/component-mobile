// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.shake.finishShake
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.shake.finishShake',
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
      METHOD_NAME: 'shake.finishShake',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: {
        'location': 'json',
        'fightingCapacity': 'double',
        'locationType': 'string',
        'item': 'long'
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