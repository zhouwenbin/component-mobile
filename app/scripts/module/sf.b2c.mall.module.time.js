define(
  'sf.b2c.mall.module.time', [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.api.b2cmall.getProductHotDataList',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.framework.comm'
  ],
  function(can, $, Fastclick, SFGetProductHotDataList, SFConfig, SFFrameworkComm) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var time = can.Control.extend({

      init: function(element, options) {
        this.render(element);
      },

      render: function(element) {

        var that = this;

        // 调用后台接口 仅为获得服务器时间
        var itemIds = [];
        itemIds.push(-1);

        var getProductHotDataList = new SFGetProductHotDataList({
          itemIds: JSON.stringify(itemIds)
        });

        getProductHotDataList
          .sendRequest()
          .done(function(data) {

            // 获得服务器时间
            var currentServerTime = getProductHotDataList.getServerTime();

            // 渲染倒计时
            that.rendTimeDistanceInfo(currentServerTime, element);
          })
          .fail(function(errorCode) {
            console.error(errorCode);
          })
      },

      /**
       * [rendTimeDistanceInfo 二次渲染倒计时信息]
       * @param  {[type]} currentServerTime 服务器时间
       * @param  {[type]} element mo
       * @return {[type]}
       */
      rendTimeDistanceInfo: function(currentServerTime, element) {

        var that = this;

        var timeNodeList = element.find('.cms-src-timeinfo');

        var currentClientTime = new Date().getTime();
        var distance = currentServerTime - currentClientTime;

        that.interval = setInterval(function() {
          _.each(timeNodeList, function(timeNode) {

            var endTime = $(timeNode).attr('data-cms-endtime');

            var startTime = $(timeNode).attr('data-cms-starttime');

            var time = that.setCountDown($(timeNode).find(".cms-fill-timeinfo")[0], distance, startTime, endTime);
          })
        }, '1000');
      },

      /**startTime,
       * [showCountDown 参考倒计时]
       * @param  {[type]} currentTime
       * @param  {[type]} destTime
       * @return {[type]}
       */
      setCountDown: function(timeNode, distance, startTime, endDate) {

        var leftTime = endDate - new Date().getTime() - distance;
        var startLeftTime = startTime - new Date().getTime() - distance;



        // 3天内显示倒计时，3天外显示即将开始 其他显示活动结束
        if (startLeftTime > 259200000) {
          $(timeNode).closest('.cms-src-timeinfo').find('.cms-fill-gotobuy').text('即将开始');
          timeNode.innerHTML = '<span class="icon icon36"></span>活动即将开始';
        } else if (startLeftTime > 0 && startLeftTime < 259200000) {
          $(timeNode).closest('.cms-src-timeinfo').find('.cms-fill-gotobuy').text('立即购买');
          var leftsecond = parseInt(startLeftTime / 1000);
          var day1 = Math.floor(startLeftTime / (60 * 60 * 24));
          var hour = Math.floor((startLeftTime - day1 * 24 * 60 * 60) / 3600);
          var minute = Math.floor((startLeftTime - day1 * 24 * 60 * 60 - hour * 3600) / 60);
          var second = Math.floor(startLeftTime - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
          timeNode.innerHTML = '<span class="icon icon36"></span><span class="text-error">' + day1 + "天" + hour + "小时" + minute + "分" + second + "秒</span>后开始";
        } else if (leftTime > 0 && startLeftTime < 0) {
          var leftsecond = parseInt(leftTime / 1000);
          var day1 = Math.floor(leftsecond / (60 * 60 * 24));
          var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
          var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
          var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
          timeNode.innerHTML = '<span class="icon icon36"></span>仅剩:<span class="text-error">' + day1 + "天" + hour + "小时" + minute + "分" + second + "秒</span>";
        } else if (leftTime < 0) {
          timeNode.innerHTML = '<span class="icon icon36"></span>抢购结束';
        }

        return leftTime;
      }


    })

    // 查到所有需要渲染价格的模块
    var timeModules = $('.cms-module-filltime');

    // 分别进行实例化
    _.each(timeModules, function(timeModule) {
      new time($(timeModule));
    });
  })