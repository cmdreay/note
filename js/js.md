- [Object.defineProperty()定义属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Parameters)

  可以显式的设置对象描述符

- [Object​.get​OwnProperty​Descriptor()返回指定对象上一个自有属性对应的属性描述符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

* 存取描述符 [get:get 语法将对象属性绑定到查询该属性时将被调用的函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)[set:当尝试设置属性时，set 语法将对象属性绑定到要调用的函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set)

```javascript
let s = {
  value1: 'abc',
  get item() {
    return '1';
  },
  set item(value) {
    this.value1 = value;
  }
};
s.item; // 调用 get
s.item = 'new'; // 调用 set
```

//  js静态方法|变量命名
```javascript
function test() {
  this.context = ['data1']
}
test.prototype.param = function () {
  return 'some data'
}
test.staticfunc = function () {
  return 'other data'
}
```
+ js call apply bind 重温
  + [call方法MDN定义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  + call和apply的区别在于:`call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组`
  
 >call() 允许为不同的对象分配和调用属于一个对象的函数/方法。
 >call() 提供新的 this 值给当前调用的函数/方法。你可以使用 call 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。
 
 + bind `bind()方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项`，就是说传入值就是方法中的this指向
 > 参考：https://www.cnblogs.com/coco1s/p/4833199.html
 + tips 伪数组调用数组方法:如arguments想使用slice方法`Array.prototype.slice.call(arguments)`
### map相关知识
+ [map与Object区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
>  + 一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。
> + Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
> + 你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。
> + Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。
> + Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。
> + Map 在涉及频繁增删键值对的场景下会有些性能优势。