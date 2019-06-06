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

//  js静态方法命名
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
