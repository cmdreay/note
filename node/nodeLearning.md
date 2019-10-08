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

> fs模块
+ process.cwd()表示当前正在执行操作的文件夹
+ fs支持URL对象表示的路径，比如`new URL('file:///tmp/hello')`,但是URL对象表示的都是绝对路径
+ 注意在Windows开发中调用fs时,文件路径不同于linux(`/git/gitfile/test/`)等其他写法，Windows为`d:\\git\\gitfile\\test\\`

+ fs.access && fs.accessSync 查看文件权限，如读写权限，默认查找文件是否存在，该方法不建议作为文件读写执行前置条件判断。
+ fs.appendFile 文件插入数据，默认不存在则新建文件，第二个参数插入的各种flag参考[File System Flags](https://nodejs.org/api/fs.html#fs_file_system_flags)
+ fs.chmod(path, mode, callback) | chmodSync，修改某个文件的权限，[包含的modes](https://nodejs.org/api/fs.html#fs_file_modes)，通常用三位数字表示对应权限，e.g:`765`,最左侧7位置代表文件所有者权限，中间的6代表所在用户组权限，最右5代表别的用户的权限。
+ fs.chown | chownSync 修改所有者和所在组
+ fs.copyFile(src, dest[, flags], callback)拷贝文件，默认覆盖目标位置相同文件，如果在打开目标文件进行写入后发生错误，Node.js将尝试删除目标(nodejs不能保证操作的原子性)。
+ FS Constants[文件操作相关常量](https://nodejs.org/api/fs.html#fs_fs_constants_1)