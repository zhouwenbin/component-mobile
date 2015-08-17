// Auto Generated.  DO NOT EDIT!
/**
  * @class sf.b2c.mall.api.task.directReceiveAward
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'sf.b2c.mall.api.task.directReceiveAward',
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
      METHOD_NAME: 'task.directReceiveAward',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: {
        'taskId': 'long'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
        '19000001': '已领取过奖励',
        '19000002': '任务已过期',
        '19000003': '任务不存在',
        '19000004': '优惠券已发放完毕',
        '19000005': '不是直接领取奖励的任务'
      }
    }
  });
});