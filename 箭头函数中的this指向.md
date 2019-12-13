> <font color="#36c">最近做的项目中遇到了在箭头函数里使用this时报错的问题，把箭头函数的写法改成function()后，this的指向才达到预期。关于这个问题值得研究一下。</font>

在箭头函数出现之前的ES5时代，this指向它的<font color="#c00">调用者</font>。是哪个对象<font color="#c00">调用</font>了这个属性或方法，this就指向这个对象。这有点像“我”这个人称代词，是从谁的嘴里说出了“我”，这个“我”就指代了谁。

**一个简单的例子：**
```javascript
// 用var定义的变量，this指向window
// 调用sayName()等于调用this.sayName()等于调用window.sayName()
var name = 'window';
var sayName = function(){
  return this.name
}
console.log(sayName()) 			//window
console.log(this.sayName()) 	//window
console.log(window.sayName()) 	//window

// 用obj调用的sayName方法，其中this指向调用它的obj
var obj = {
  name : 'obj',
  sayName : function(){
	return this.name
  }
}
console.log(obj.sayName()) 	    //obj
```
后来ES6规范中的箭头函数里面的this是在定义它时绑定的，<font color="#c00">指向它的父级作用域，而不是调用它对象</font>，这个this的指向是不能通过call和apply改变的。


**箭头函数在对象字面量中的this指向：**
```javascript
// 用var定义的变量，this指向window
// 虽然展现结果和上例一样，但是this的指向绑定的时机是有区别的，箭头函数在定义时已经绑定，普通函数只会在调用时确定
var name = 'window';
var sayName = () => {
  return this.name;			//this指向window
};
console.log(sayName());         //window
console.log(this.sayName());    //window
console.log(window.sayName());  //window

//同样用obj调用的sayName方法，this指向父级作用域window
var obj = {
  name: 'obj',
  sayName: () => {
    return this.name;  
  }
};
console.log( obj.sayName() );     //window
console.log( obj.sayName() === window.sayName() );     //true
```
这是箭头函数this指向在对象字面量中的行为。多说一句，在用对象实例调用时会有所差别。

**看下面的例子：**
```javascript
var name = 'window'
    
function Obj(name){     //构造函数Obj
  this.name = name;
  this.s1 = function(){
    return this.name;   //普通函数方法，this指向Obj
  }
  this.s2 = () => {
    return this.name;   //箭头函数方法，this还是指向Obj，因为构造函数function Obj(name)形成了一级作用域
  };
}
Obj.prototype.s3 = function(){
  return this.name;     //原型链上的普通方法，this指向实例obj1的构造函数Obj
}
Obj.prototype.s4 = () => {
  return this.name;     //原型链上的箭头函数，定义它的时候，这个箭头函数的父级作用域是window
}

//实例化对象
const obj1 = new Obj('obj');

console.log(obj1.s1());  //obj
console.log(obj1.s2());  //obj
console.log(obj1.s3());  //obj
console.log(obj1.s4());  //window
```

 - s2()箭头函数会去找`定义它时的父级`作用域，因为构造函数Obj也是个函数，它会形成自己的作用域。定义s2()的时候`父级作用域变成了构造函数Obj所在的域`
 - s4()和s2()的区别是s4()挂载到构造函数的原型上了，`定义s4()的时候，这个箭头函数的父级作用域是window`，所以用实例调用方法会输出了 'window'
 
 **最后总结**：在对象字面量中和在构造函数的原型上使用箭头函数，this指向不是我们预期的结果，在这两种情况下要使用箭头函数。
