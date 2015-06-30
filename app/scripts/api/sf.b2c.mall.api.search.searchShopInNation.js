// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.search.searchShopInNation
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.search.searchShopInNation',
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
      METHOD_NAME: 'search.searchShopInNation',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: {
        'nationId': 'long',
        'categoryId': 'long'
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