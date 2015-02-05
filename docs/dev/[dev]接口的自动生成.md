## 接口的自动化生成
通过服务端暴露出来的`JSON`文件，结合`Mustache`生成接口文件，具体的步骤如下文所示。

[TOC]

### 环境配置
获取最新的代码之后，安装依赖文件
``` node
npm install
```

### 模块配置

代码的自动化生成是按照模块进行的，在做生成之前我们首先要确定当前的项目需要哪些模块，这些模块的设置在`apigen.js`文件中。

修改`apigen.js`中的关于模块的配置
```
var SOURCE = [
  {
    name: 'liulian',
    src: 'http://115.28.11.229/info.api?json',
    filename: 'liulian.json',
    filterGroup: []
  },
  {
    name: 'haitao',
    src: 'http://115.28.145.123/info.api?json',
    filename: 'haitao.json',
    filterGroup: ['order', 'user', 'logistics', 'product', 'shopcart', 'b2cmall', 'sc', 'supplychain']
  }
];
```
字段`filterGroup`中配置了需要自动化生成的，他的生成步骤是：
```
从服务端下载json配置文件->从filterGroup中过滤需要的模块
```
你需要确认对应的`Server`地址是不是正确

### 自动化生成

完成配置之后执行命令
``` node
grunt create
```
会进行一段脚本的执行，执行完成之后会在`app/scripts/api`目录下出现自动化生成的代码

在`sf.b2c.mall.require.config`文件中重新配置
将原来的配置
``` javascript
'sf.b2c.mall.api.order.submitOrder': 'http://www.google.com/app/scripts/api/order/sf.b2c.mall.api.order.submitOrder',
```
修改
``` javascript
'sf.b2c.mall.api.order.submitOrder': 'scripts/api/order/sf.b2c.mall.api.order.submitOrder',
```
**注**: 在项目中引用的接口接口都需要在这里做配置！

### 配置项目的地址

原来这部分是在`haitao-web-baseline`进行配置的，但是发现，现在在项目中各自的配置都是不一样的。所以我们将配置的代码都移动到业务代码中。

项目配置代码放在了目录中`haitao-b2c-h5/app/scripts/config/`对于不同的环境有不同的配置文件。