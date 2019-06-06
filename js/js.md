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
