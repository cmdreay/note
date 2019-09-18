### note索引
+ [node异步相关](./node/node异步相关.md)
+ [模块相关](https://github.com/cmdreay/note/issues/21)
+ [node 核心api学习](./node/nodeLearning.md)
#### 近期要做的事情

- koa 源码
- egg 掌握

#### linux

- [linux 升级 chrome 打不开问题解决方案(已失效)](https://github.com/cmdreay/note/blob/master/essay/linux/linux_chrome_pro.md)
- [常用命令(待更新)](https://github.com/cmdreay/note/tree/master/essay/linux)
- [u 遇到的错误(持续更新)](https://github.com/cmdreay/note/blob/master/essay/linux/error.md)

#### vue

- [vue 开发遇到的问题 心得和解决方案~~](https://github.com/cmdreay/note/blob/master/essay/day11_14.md)

### mongodb

- [mongodb 使用心得](https://github.com/cmdreay/note/blob/master/mongodb/day11_14.md)
- v-console //一个轻量、可拓展、针对手机网页的前端开发者调试面板

### js && es6 相关

- [关于 Promise 和 async await 语法的一些练习](https://github.com/cmdreay/note/blob/master/essay/day11_20.md)
- [array.prototype.map() array.prototype.filter() array.prototype.foreach()三者比较](https://github.com/cmdreay/note/blob/master/essay/es6/day11_20.md)
- [es6 MAP 数据结构](https://github.com/cmdreay/note/blob/master/essay/node/day12_12.md)
- [原生的一些判断](https://github.com/cmdreay/note/blob/master/essay/es6/day4_24.md)
- [js 基础知识温习](./js/js.md)

### redis

- TTL key 查看过期时间
- keys \* 查看所有 keys
- keys 还可以模糊查询 e.g`keys mector:token:180*`查询某手机号的 token

### android

- [android 实际工作手册](https://github.com/cmdreay/note/blob/master/qs.md)

### java 问题(android)

- [学习 android 过程中的 java 问题](./java/android_java.md)

### 小程序

- [用 promise 的方式封装 wx.request](./node/request.js)

## 所接触的内容

> > 后端

- mongoDB
- nodeJS
- koa
- redis
- cheerio 爬虫
- python 启动服务
  > > 前端
- vue (mint-ui)
- angular
- es6
- ionic

> > 小技能和工具

- git
- shell 和 vim 编辑器
- postman
- allow-controll-Allow-origin //跨域访问
- 划词翻译
- docker

## 设计理念

    当一个问题的复杂度大到一个小团队（参考亚马逊的two-pizza team理念）都无法承接的时候，我们需要考虑将其拆分成多个系统或应用，当一个问题的复杂度大到一个工程师在日常工作中无法承载的时候，则应该拆分成不同的模块或应用


    + 数据库设计
        + 贫血模型 Model 中，仅包含状态(属性），不包含行为(方法），采用这种设计时，需要分离出DB层，专门用于数据库操作。
        + 充血模型 Model 中既包括状态，又包括行为，是最符合面向对象的设计方式。
