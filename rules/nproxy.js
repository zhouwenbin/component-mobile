/**
 * nproxy.js
 * 用以本地开发
 * Created 2015-09-10 09:46.
 */
module.exports = [
  //指定bower_components
  {
    pattern: 'http://10.32.157.67/sfht/haitao-b2c-h5/app/bower_components',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/bower_components'
  },
  //模拟api借口
  {
    pattern: 'http://10.32.157.67/bower_components/',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/bower_components'
  },
  {
    pattern: 'http://10.32.157.67/fixture/lib/canjs/fixture.js',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/fixture/lib/canjs/fixture.js'
  },
  {
    pattern: 'http://10.32.157.67/fixture/framework/sf.b2c.mall.fixture.framework.common.js',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/fixture/framework/sf.b2c.mall.fixture.framework.common.js'
  },
  {
    pattern: 'http://10.32.157.67/fixture/lib/canjs/can.object.js',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/fixture/lib/canjs/can.object.js'
  },
  {
    pattern: 'http://10.32.157.67/templates/',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/templates'
  },
  //指定script
  {
    pattern: 'http://10.32.157.67/scripts',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/scripts'
  },
  //指定摇一摇页面
  {
    pattern: 'http://10.32.157.67/sfht/haitao-b2c-h5/app/shake.html',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/shake.html'
  },
  //指定摇一摇入口js
  {
    pattern: 'http://10.32.157.67/script/page/sf.b2c.mall.page.shake.js',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/scripts/page/sf.b2c.mall.page.shake.js'
  },
  //util/shake
  {
    pattern: 'http://10.32.157.67/script/util/sf.shake.js',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/scripts/util/sf.shake.js'
  },
  //
  {
    pattern: 'http://10.32.157.67/app/fixture/case/shake/sf.b2c.mall.fixture.case.shake.one.js',
    responder: '/Users/huweijian/Documents/webServer/sfht/haitao-b2c-h5/app/fixture/case/shake/sf.b2c.mall.fixture.case.shake.one.js'
  }
];