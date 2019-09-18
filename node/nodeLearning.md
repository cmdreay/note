**`https://nodejs.org/api/events.html`学习笔记**

> events
+ node.js使用事件驱动性模型，异步io
+ 许多node核心方法都是基于事件驱动的，他们继承`EventEmitter`类
+ 监听器中的`this`指向当前事件，es6箭头函数会导致this不指向当前事件本身
+ 事件同步调用可以异步操作
+ 新事件添加时默认触发`newListener`事件，监听器移除触发`removeListener`事件
+ newListener中声明的同名触发某个事件总是更快一步
+ `EventEmitter.defaultMaxListeners`：一个事件默认能注册10个监听器，可以通过`emitter.setMaxListeners(n)`修改监听器数量限制。`EventEmitter.defaultMaxListeners`值可以修改，但需要注意的是该数量一旦修改影响所有注册事件，tips:`EventEmitter.defaultMaxListeners`数量不是强制限制，超出会内存泄漏警告
+ `emitter.on`,每添加一个监听事件都会作为结果添加到下一个监听事件中,默认根据添加顺序决定触发监听事件的顺序，但`emitter.prependListener()`方法提前触发
+ `removeListener()`在`emit()`触发后并不会影响监听器的触发,只会移除指定的监听器