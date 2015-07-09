// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.user.rqCash
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.user.rqCash',
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
      METHOD_NAME: 'user.rqCash',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: {
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
<<<<<<< HEAD
        '1000420': '尚未绑定支付宝账户或账户名缺失',
        '1000430': '未达到提现金额限制',
        '1000450': '该时间段内不支持此请求'
=======
        '1000420': '尚未绑定支付宝账户',
        '1000430': '未达到提现金额限制'
>>>>>>> master
      }
    }
  });
});