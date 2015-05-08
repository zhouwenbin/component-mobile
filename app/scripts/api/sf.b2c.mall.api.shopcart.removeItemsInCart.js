// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.shopcart.removeItemsInCart
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.shopcart.removeItemsInCart',
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
      METHOD_NAME: 'shopcart.removeItemsInCart',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: {
        'itemIds': 'string',
        'goods': 'json'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '15000300': '购物车删除商品失败'
      }
    }
  });
});