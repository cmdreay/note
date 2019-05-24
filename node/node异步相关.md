### Nodejs异步流程控制解决方案

#### 并发执行
+ [Async](http://blog.fens.me/nodejs-async/)

+ eventproxy

  [github](https://github.com/JacksonTian/eventproxy)
  
  [api](http://eventproxy.html5ify.com/api.html)
  
  
#### 异步变为同步

+ async/await
+ promise.then
+ generator







#### 参考
+ (NodeJS的异步、并发编程方案)https://blog.csdn.net/qq_36520153/article/details/80443561


#### 使用Promise解决多个异步依赖调用
+ [MDN中Promise.all的释义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
+ [使用Promise解决多个异步依赖调用](https://chenhuichao.com/2016/12/25/es6/promise-all/)



#### 关于async/await的思考

  一直在用async/await处理异步的方法，但是并没有深入思考原理，*比如为什么await尽量不要放在for循环中*，最近遇到并发问题，一味的通过await处理为同步效率不高
  
  查看MDN中关于await的解释
  >An async function can contain an await expression that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.
  
  也就是说在执行完await语句之前程序会一直保持暂停态，如果放在for循环中，结果会按顺序一个一个地串行执行下去，会把执行时间拉长，一般情况下for循环中都是可并发的执行语句，如果希望执行完统一处理可以使用``Promise.all(arr.map((item) => excute))``,promise.all参考MDN用法
