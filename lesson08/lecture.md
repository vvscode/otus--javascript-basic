---
title: Занятие 8
description: Итоги по синтаксису JS
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!-- s -->

## Итоги по синтаксису JS

<!-- v -->

```js [1-30]
const myObject = {
  price: 20.99,
  get_price: function () {
    return this.price;
  },
};
const customObject = Object.create(myObject);
customObject.price = 19.99;
delete customObject.price;
console.log(customObject.get_price()); // ?
```

<!-- v -->

```js [1-30]
function Car(color) {
  this.color = color;
}
const lada = new Car("Black");
Car.prototype.currentGear = 1;
console.log(++lada.currentGear); // ?
console.log(Car.prototype.currentGear); // ?
```

<!-- v -->

```js [1-30]
const User = function () {};

User.prototype.attributes = {
  isAdmin: false,
};

const admin = new User("Sam"),
  guest = new User("Bob");

admin.attributes.isAdmin = true;

alert(admin.attributes.isAdmin); // ?
alert(guest.attributes.isAdmin); // ?
```

<!-- v -->

```js [1-30]
let obj = {
  a: 1,
};
(function (obj) {
  obj = {
    a: 2,
  };
})(obj);
console.log(obj.a); // ?
```

<!-- v -->

```js [1-30]
function Person(name) {
  if (name) this.options.name = name;
}

Person.prototype.options = {
  name: "Default name",
};

var foo = new Person("foo");
var bar = new Person("bar");

console.log(foo.options.name); // ?
console.log(bar.options.name); // ?
```

<!-- v -->

```js [1-30]
var a = {};

(function b(a) {
  a.a = 10;
  a = null;
})(a);

console.log(a); // ?
```

<!-- v -->

```js [1-30]
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// ?
```

<!-- v -->

```js [1-30]
var func = [];
for (var i = 0; i < 5; i++) {
  func[i] = function () {
    console.log(i);
  };
}
func[3](); // ?
```

<!-- v -->

```js [1-30]
(function () {
  let a = (b = 5);
})();
console.log(b); // ?
```

<!-- v -->

```js [1-30]
// Create code for next conditions
function calculate() {
  /* put your code here */
}
calculate("+")(1)(2); // 3
calculate("*")(2)(3); // 6
```

<!-- v -->

```js [1-30]
// Create code for next conditions
let sum = function () {
  /* put your code here */
};
let s = sum();
alert(s()); // 0
alert(s(1)()); // 1
alert(s(1)(2)()); //3
alert(s(3)(4)(5)()); // 12
```

<!-- v -->

```js [1-30]
(function (x) {
  return (function (y) {
    console.log(x); // ?
  })(2);
})(1);
```

<!-- v -->

```html [1-30]
<button id="btn-0">Button 1!</button>
<button id="btn-1">Button 2!</button>
<button id="btn-2">Button 3!</button>
<script type="text/javascript">
  var prizes = ["A Unicorn!", "A Hug!", "Fresh Laundry!"];
  for (var btnNum = 0; btnNum < prizes.length; btnNum++) {
    // for each of our buttons, when the user clicks it...
    document.getElementById("btn-" + btnNum).onclick = function () {
      // tell her what she's won!
      alert(prizes[btnNum]);
    };
  }
</script>
```

<!-- v -->

```js [1-30]
const fn = () => {
  let a = 1;
  return () => {
    a++;
    return a;
  };
};
const fnRes = fn();
console.log(fnRes()); // ?
console.log(fnRes()); // ?

const fnRes2 = fn();
console.log(fnRes2()); //?
console.log(fnRes2()); //?
```

<!-- v -->

```js [1-30]
/*
- Do you understand the closure?
- Yes!
- Write a function, that does this next:
*/
const func = (a, b, c, d, e) => a + b + c + d + e;

const hof = yourFunction(func);

console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35
```

<!-- v -->

```js [1-30]
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a); // ?
```

<!-- v -->

```js [1-30]
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;
console.log(a[b]); //?
```

<!-- v -->

```js [1-30]
function test() {
  console.log(a);
  console.log(foo());

  var a = 1;

  function foo() {
    return 2;
  }
}
test();
// ?
```

<!-- v -->

```js [1-30]
(function () {
  alert(inner);
  inner();
  function inner() {
    alert("inner");
  }
})();
// ?
```

<!-- v -->

```js [1-30]
(function () {
  alert(inner);
  inner();
  var inner = function () {
    alert("inner");
  };
})();
// ?
```

<!-- v -->

```js [1-30]
(function () {
  f();
  f = function () {
    console.log(1);
  };
})();
function f() {
  console.log(2);
}
f();
// ?
```

<!-- v -->

```js [1-30]
(function () {
  var x = 1;

  function x() {}

  console.log(x);
})();
```

<!-- v -->

```js [1-30]
(function (foo) {
  return typeof foo.bar;
})({ foo: { bar: 1 } }); // ?
```

<!-- v -->

```js [1-30]
(function f() {
  function f() {
    return 1;
  }
  return f();
  function f() {
    return 2;
  }
})();
// ?
```

<!-- v -->

```js [1-30]
function f() {
  return f;
}
console.log(new f() instanceof f); // ?
```

<!-- v -->

```js [1-30]
var text = "outside";
function logIt() {
  console.log(text);
  var text = "inside";
}
logIt();
// ?
```

<!-- v -->

```js [1-10]
var a = (1, 2, 3);
console.log(a); // ?
```

<!-- v -->

```js [1-10]
// Define a
a == 1 && a == 2 && a == 3; // true
```

<!-- v -->

```js [1-30]
const fn = {};
function valueAccessor(value) {
  var accessor = function (newValue) {
    if (arguments.length === 0) {
      return value;
    }
    value = newValue;
  };
  accessor.__proto__ = fn;
  return accessor;
}
const a = valueAccessor(5);
fn.incrementValue = function () {
  this(this() + 1);
};
a.incrementValue();
a(); //?
```

<!-- v -->

```js [1-30]
// Update code for conditions
function A() {
  this.value = 1;
}
const B = function () {};
/* put your code here */
const b = new B();
b.value === undefined; // should be true
b instanceof A; // should be true
```

<!-- v -->

<!-- eslint-skip -->

```js [1-20]
// create singleton
const getInstance = /* put your code here */
const o1 = getInstance();
const o2 = getInstance();
o1 instanceof User; // true
o1 === o2; // true
```

<!-- v -->

<!-- eslint-skip -->

```js [1-20]
// create singleton
const User = /* your code */
const u1 = new User(1);
const u2 = new User(2);
u1 === u2; // true
```

<!-- v -->

```js [1-30]
var foo = {
  bar: function () {
    return this.baz;
  },
  baz: 1,
};
typeof (f = foo.bar)(); // ?
```

<!-- v -->

```js [1-30]
// Create “native” methods Define a repeatify function on the String object.
// The function accepts an integer that specifies how many times the string has to be repeated.
// The function returns the string repeated the number of times specified. For example:
console.log("hello".repeatify(3)); // hellohellohello
```

<!-- v -->

## Вопросы?

<!-- s -->

Дополнительные материалы:

- [Debug Visualizer](https://marketplace.visualstudio.com/items?itemName=hediet.debug-visualizer)
- [Visualize JavaScript code execution](http://www.pythontutor.com/javascript.html#mode=edit)
- [JavaScript Visualizer (ES5)](https://ui.dev/javascript-visualizer/)
- [Code to graph](https://crubier.github.io/code-to-graph/)
