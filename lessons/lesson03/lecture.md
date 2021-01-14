---
title: Занятие 3
description: Объектная модель в Javascript. Прототипное наследование и функции-конструкторы
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!--s-->

### Объектная модель в Javascript: Прототипное наследование и функции-конструкторы

<!-- s -->

### Передача по значению / по ссылке

<!-- v -->

```js [ 1-30]
let i = 1;
let j = 1;
i = 2;

console.log(i, j); // ?
```

<!-- v -->

```js [ 1-30]
let a = {};
let b = {};
a.name = "Bob";

console.log(a.name, b.name); // ?
```

<!-- v -->

```js [ 1-30]
let a = {};
let b = a;
a.name = "Bob";

console.log(a.name, b.name); // ?
```

<!-- v -->

```js [ 1-30]
let a = [];
let b = a;
a.push("Bob");

console.log(a[0], b[0]); // ?
```

<!--v-->

### Вопросы?

<!-- s -->

### Правила именования переменных / свойств

<!-- v -->

- "Говорящее название"
- Переменная - существительное (исключение - булевы переменные)
- Функция/метод - глагол
- Булевы значения - `isA`, `hasB`
- Возможно использование венгерской нотации (`sText`, `nCount`)

<!-- v -->

- camelCase - для переменных и полей объектов/классов
- PascalCase - для классов, конструкторов и пространств имен
- UPPER_CASE - для констант (не неизменяемых переменных, а конфигурационных значений)
- \_secretField - уже не используется, но помнить стоит

<!-- v -->

### Вопросы?

<!-- s -->

### Объекты

<!-- v -->

- Структура данных - хэш
- Ключи - String | Symbol
- Ссылочный тип данных

<!-- v -->

#### Как создать

<!-- v -->

```js [ 1-30]
// Создание объекта 1
//  через литерал
let o1 = {};
let o2 = {
  prop1: "Some value",
  prop2: null,
  prop3: 3,
};
```

<!-- v -->

```js [ 1-30]
// Создание объекта 2
// Вызвать функцию возвращающую объект
let o3 = Object.create(null);
```

<!-- v -->

```js [ 1-30]
// Создание объекта 3
// Использовать `new` с классом или функцией-конструктором
let o4 = new Object();
let o5 = new Object({
  a: 1,
  b: 2,
});
```

<!-- v -->

#### Как работать со свойствами

_Какие есть способы работы со свойствами?_

<!-- v -->

```js [ 1-30]
let o = {};
// точечная нотация
o.prop1 = 1;
console.log(o.prop1);
delete o.prop1;

// скобочная нотация
o['prop2'] = 2;
console.log(o['prop2']);
delete o['prop2];
```

<!-- v -->

```js [ 1-30]
let o = {
  x: 1,
};
console.log(o.x); // ?
let a = "x";
o.a = 2;
console.log(o.x); // ?
let b = "x";
o["b"] = 3;
console.log(o.x); // ?
```

<!-- v -->

### Вопросы?

<!-- s -->

#### Еще немного про свойства объекта

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 2,
};
console.log(o);
console.log(o.prop1); //?
console.log(o.prop2); // ?
```

<!-- v -->

```js [ 1-30]
let o = {
  someMethod: function () {
    console.log("Hey!");
  },
};
console.log(o);
console.log(o.someMethod); //?
console.log(o.toString); // ?
```

<!-- v -->

```js [ 1-30]
let o = {
  someMethod: function () {
    console.log("Hey!");
  },
};
console.log(o);
console.log(o.someMethod()); //?
console.log(o.toString()); // ?
console.log(o.someOtherMethod()); //?
```

<!-- v -->

#### `__proto__`

<!-- v -->

При обращении к свойству объекта:

- свойство ищется в самом объекте
- если свойство не найдено, делается поиск в прототипе объекта
- если свойство не найдено в прототипе, делается поиск дальше по цепочке прототипов, пока цепочка не закончится

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop2: 2,
  },
};
console.log(o);
console.log(o.prop1); //?
console.log(o.prop2); //?
console.log(o.prop3); //?
```

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop2: 2,
    __proto__: {
      prop3: 3,
    },
  },
};
console.log(o);
console.log(o.prop1); //?
console.log(o.prop2); //?
console.log(o.prop3); //?
```

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop1: 2,
  },
};
console.log(o);
console.log(o.prop1); //?
console.log(o.prop2); //?
```

<!-- v -->

#### Запись свойств

<!-- v -->

Запись свойств, всегда производится в сам объект (тот, что находится перед последней точкой, в точечной нотации). Независимо от того, есть свойство в объекте или нет.

<!-- v -->

```js [ 1-30]
let o = { __proto__: { prop1: 1 } };
console.log(o.prop1, o.__proto__.prop1); // ?
o.prop1 = 2;
console.log(o.prop1, o.__proto__.prop1); // ?
o["prop1"] = 3;
console.log(o.prop1, o.__proto__.prop1); // ?
```

<!-- v -->

```js [ 1-30]
let proto = { prop0: 1 };
let o1 = { prop1: 1, __proto__: proto };
let o2 = { prop2: 2, __proto__: proto };

console.log(o1.prop0, o2.prop0); // ?

proto.prop0 = 5;
console.log(o1.prop0, o2.prop0); // ?

o2.prop0 = 7;
console.log(o1.prop0, o2.prop0); // ?

console.log(proto.prop0); // ?
```

<!-- v -->

```js [ 1-30]
let proto = { settings: { isAdmin: false } };
let u1 = { name: "Bob", __proto__: proto };
let u2 = { name: "Sam", __proto__: proto };

console.log(u1.settings.isAdmin); // ?
u1.settings.isAdmin = true;
console.log(u1.settings.isAdmin); // ?

console.log(u2.settings.isAdmin); // ?
```

<!-- v -->

Задание прототипа:

- прямая работа с `__proto__`
- [`Object.setPrototypeOf()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
- [`Object.create(proto[, propertiesObject])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- использование конструкторов

<!-- v -->

### Вопросы?

<!-- v -->

### Итерация по полям объекта

<!-- v -->

- `for(let x in obj){}`
- получить список свойств и проитерироваться по нему - [keys](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [values](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/values), [entries](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) (но не в IE!)

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  prop2: 2,
};
for (propName in o) {
  console.log(propName);
}
```

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  prop2: 2,
};
Object.keys(o).forEach((propName) => {
  console.log(propName);
});
```

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  prop2: 2,
};
for (let [key, value] of Object.entries(o)) {
  console.log(`${key}: ${value}`);
}
```

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop2: 2,
  },
};
for (propName in o) {
  console.log(propName);
}
```

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop2: 2,
  },
};
for (propName in o) {
  console.log(
    propName,
    o.hasOwnProperty(propName) ? "в объекте" : "в цепочке прототипов"
  );
}
```

<!-- v -->

```js [1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop2: 2,
  },
};
for (let [key, value] of Object.entries(o)) {
  console.log(`${key}: ${value}`);
}
```

<!-- v -->

#### Удаление свойств

<!-- v -->

Свойства удаляются (так же как и записываются) непосредственно на объекте(на том, что до последней точки, в точечной нотации), не затрагивая цепочку прототипов.

<!-- v -->

```js [ 1-30]
let o = {
  prop1: 1,
  __proto__: {
    prop1: 2,
  },
};
console.log(o.prop1); // ?
delete o.prop1;
console.log(o.prop1); // ?
delete o.prop1;
console.log(o.prop1); // ?
```

<!-- v -->

### Вопросы?

<!-- v -->

```js [ 1-30]
let a = { name: 'Bob' };
let b = { name: 'Sam' };
let settings = {};

let settings[a] = { isAdmin: true };
let settings[b] = { isAdmin: false };

console.log(settings[a]); // ?
console.log(settings[b]); // ?
```

<!-- s -->

### Функции

<!-- v -->

- тип данных - object
- ссылочный тип данных
- `typeof` возвращает `function`

<!-- v -->

Характеристики функции:

- Имя функции
- Число и тип параметров
- Тип возвращаемого значения
- Контекст

<!-- v -->

#### Способы создания функции

<!-- v -->

```js [1-30]
// Создание функции 1
// Function declaration
// - работает hosting
// - всегда есть имя
function greet1(name) {
  console.log("Hello, " + name);
}
greet1();
```

<!-- v -->

```js [1-30]
// Создание функции 2
// Functional Expression
// - не работает хоистинг инициализации (хоистинг объявления зависит от типа переменной)
// - имя опционально (а если задано - доступно ТОЛЬКО внутри функции)
let greet2 = function innerGreetName(name) {
  console.log("Hello, " + name);
};
let greet22 = function (name) {
  console.log("Hello, " + name);
};
greet2();
```

<!-- v -->

```js [1-30]
// Создание функции 3
// Function by constructor
// - не работает хоистинг инициализации (хоистинг объявления зависит от типа переменной)
// - имени нет, или нужно задавать вручную
let greet3 = new Function("name", "return 'Hola, ' + name;");
greet3();
```

<!-- v -->

**Функции высшего порядка** - функции, которые принимают параметром и/или возвращают функции как результат работы.

<!-- v -->

```js [1-30]
let createGreet = function (age) {
  let text = age > 18 ? "Приветствую" : "Хаюшки";
  return function (name) {
    console.log(text + ", " + name);
  };
};
let greet1 = createGreet(45);
greet1("Роберт"); // ?
let greet2 = createGreet(11);
greet2("Саня"); // ?
```

<!-- v -->

```js [1-30]
document.findElementById('btn')
  .addEventListener('click', function() {
    alert('*Opa')!
  });
```

<!-- v -->

Функция - объект

```js [1-30]
let greet = function (name) {
  return "Hi, " + name;
};
console.log(typeof greet); // ?

console.log(greet.hasOwnProperty("hasOwnProperty"));
console.log(greet.hasOwnProperty("toString"));
console.log(greet.toString());
```

<!-- v -->

Функция может быть свойством объекта

```js [1-30]
let o = {
  method: function (param) {
    console.log("Do somethind with", param);
  },
};
o.method("icecream"); // ?
```

<!-- v -->

### Вопросы?

<!-- v -->

#### Замыкания

<!-- v -->

Замыкания в JS - механизм, который позволяет внутри функции получать доступ к переменным, доступным в месте создания функции.

<!-- v -->

```js [1-30]
var createGreet = function (age) {
  var text = age > 18 ? "Приветствую" : "Хаюшки";
  return function (name) {
    console.log(text + ", " + name);
  };
};
var greet1 = createGreet(45);
greet1("Роберт");
```

<!-- v -->

```js [1-30]
function getCounter() {
  let i = 0;
  return {
    next: function () {
      i = i + 1;
    },
    reset: function () {
      i = 0;
    },
    current: function () {
      return i;
    },
  };
}
let counter = getCounter();
console.log(counter.current()); // ?
counter.next();
counter.next();
console.log(counter.current()); // ?
counter.reset();
console.log(counter.current()); // ?
```

<!-- v -->

Доступ к параметрам функции

- по имени
- через [`arguments`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/arguments) (не работает в стрелочных функциях)

<!-- v -->

Для работы с неопределенным числом параметров принято использовать [`rest params`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Rest_parameters)

```js [1-30]
function sum(...values) {
  return values.reduce((acc, el) => acc + el);
}

function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}
```

<!-- v -->

### Вопросы?

<!-- s -->

### Особенности работы с функциями

<!-- v -->

#### Контекст (`this`)

<!-- v -->

Контекст - определяет в рамках какого **объекта** **выполняется функция**. Определяется тем, какое значение имеет ключевое слово [`this`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this) **при выполнении** функции.

Позволяет изменять/задавать поведение функции.

<!-- v -->

[Строгий режим Javascript](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Strict_mode) - использование ограниченной семантики языка для улучшения стабильности, и который упрощает понимание того, что происходит в программе при возникновении проблем.

Обычный, нестрогий, режим выполнения JavaScript иногда называется Грязным режимом (Sloppy mode).

<!-- v -->

Три возможных варианта

- window
- undefined
- объект

<!-- v -->

```js [1-30]
// window
function someStrangeFunction() {
  console.log("this for someStrangeFunction", this);
}
someStrangeFunction();
```

<!-- v -->

```js [1-30]
"use strict";
// undefined
function someStrangeFunction() {
  console.log("this for someStrangeFunction", this);
}
someStrangeFunction();
```

<!-- v -->

```js [1-30]
// object
var o = {
  prop1: 1,
  someStrangeFunctionInObject: function () {
    console.log("this for someStrangeFunctionInObject", this);
  },
};
o.someStrangeFunctionInObject();
```

<!-- v -->

```js [1-30]
var o = {
  prop1: 1,
  someStrangeFunctionInObject: function () {
    console.log("this for someStrangeFunctionInObject", this);
  },
};
let func = o.someStrangeFunctionInObject;
func(); //?
```

<!-- v -->

```js [1-30]
function someStrangeFunction() {
  console.log("this for someStrangeFunction", this);
}
let o = { prop1: 1 };
someStrangeFunction(); // ?
o.someStrangeMethod = someStrangeFunction;
o.someStrangeMethod(); // ?
```

<!-- v -->

```js [1-30]
// Об этом важно помнить при передаче методов
let o = {
  name: "Bob",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};
document.body.addEventListener("click", o.greet);
```

<!-- v -->

```js [1-30]
let o = {
  name: "Bob",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};
let x = o.greet;
x(); // ?
```

<!-- v -->

#### Изменение и фиксирование контекста

<!-- v -->

```js [1-30]
let o = { prop1: 1, name: "Sam" };
let f = function () {
  console.log(this);
};
f(); // ?
```

<!-- v -->

```js [1-30]
let o = { prop1: 1, name: "Sam" };
let f = function (x) {
  console.log(this, x);
};
o.of = f;
o.of(1); // o, 1
f.call(o, 2); // o, 2
f.apply(o, [3]); // o, 3

var of = f.bind(o);
of(4); // o, 4
```

<!-- v -->

```js [1-30]
let o = { prop1: 1, name: "Sam" };
let f = function (name) {
  console.log(this, name);
};

f.call(o, "user 2"); // параметры один за одним
f.apply(o, ["user 3"]); // параметры списком

f.bind(o)("user 4"); // bind возвращает функцию для вызова
```

<!-- v -->

#### Работа с конструкторами

<!-- v -->

Еще один способ изменить `this` - использовать ключевое слово `new`

- `new` с любой функцией (кроме стрелочной) создает новый объект
- созданный объект получает значение `__proto__` (из свойства конструктора `prototype`)
- созданный объект ассоциируется с `this`
- выполняет функция
- если функция возвращает примитивное значение - неявно возвращается `this`

<!-- v -->

```js [1-30]
var f = function (name) {
  console.log(this);
};
f("Sam"); // ?
console.log(new f("Bob")); // ?
```

<!-- v -->

```js [1-30]
function User(name, greet) {
  // изменяем новый объект при создании
  this.name = name;
  this.greetPhrase = greet;
  this.greet = function () {
    console.log(this.greetPhrase + ", " + this.name);
  };
}
let u1 = new User("Bob", "Hello");
let u2 = new User("Sam", "hi");
console.log(u1, u2);
u1.greet();
u2.greet();
```

<!-- v -->

```js [1-30]
function User(name, greet) {
  this.name = name;
  this.greetPhrase = greet;
}
User.prototype = {
  greet: function () {
    console.log(this.greetPhrase + ", " + this.name);
  },
};
let u1 = new User("Bob", "Hello");
let u2 = new User("Sam", "hi");
console.log(u1, u2);
u1.greet();
u2.greet();
```

<!-- v -->

```js [1-30]
function User(name, greet) {
  this.name = name;
  // читаем greet через замыкание
  this.greet = function () {
    console.log(greet + ", " + this.name);
  };
}
let u1 = new User("Bob", "Hello");
u1.greet();
```

<!-- v -->

Функции-конструкторы - вариант создания "классов" из до-ES6 мира. В целом современные классы, являются "синтаксическим сахаром" и так же работают на прототипах, просто позволяют нам использовать другой синтаксис для описания.

<!-- v -->

```js [1-30]
// ES5
function User(name, greet) {
  this.name = name;
  this.greetPhrase = greet;
}
User.prototype = {
  greet: function () {
    console.log(this.greetPhrase + ", " + this.name);
  },
};
```

<!-- v -->

```js [1--30]
// ES6
class User {
  constructor(name, greet) {
    this.name = name;
    this.greetPhrase = greet;
  }

  greet() {
    console.log(this.greetPhrase + ", " + this.name);
  }
}
```

<!-- v -->

#### Как проверить, что объект является экземпляром класа?

<!-- v -->

```js [1-30]
function User() {}
var fu = {};
var u = new User();

console.log(fu, fu instanceof User);
console.log(u, u instanceof User);
```

<!-- v -->

`instanceof` ходит по цепочке прототипов и ищет совпадение с `prototype`

```
x instanceof Y
-> x.__proto__ === Y.prototype
-> x.__proto__.__proto__ === Y.prototype
-> ...
```

<!-- v -->

```js [1-30]
let o = {};
console.log(o instanceof Array); // ?

o.__proto__ = [];

// o.__proto__.__proto__ === Array.prototype
console.log(o instanceof Array);
```

<!-- v -->

### Вопросы?

<!-- s -->

### [Стрелочные функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

<!-- v -->

- короткий синтаксис
- только Functional expression
- нет имени
- привязаны к значению `this` (который определяется _обычно_ в момент создания функции)
- не могут быть конструкторами
- в них не работают `arguments` / `new.target` / `super` / `yeild`
- удобны для inline использования

<!-- v -->

```js [1-30]
// блочная форма
let double1 = (a) => {
  return a * 2;
};
// Когда один аргумент - скобки можно опускать
let double2 = (a) => {
  return a * 2;
};
// При коротком возвращении - блок и return можно опускать
let double3 = (a) => a * 2;
// а иногда
let func = (_) => new Date().toLocaleTimeString();
```

<!-- v -->

```js [1-30]
// НО!
let func1 = () => {
  foo: 1;
};
func(); // undefined

let func2 = () => ({ foo: 1 });

func2(); // { foo: 1 }
```

[Про label](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/label)

<!-- v -->

```js [1-30]
let o = {
  name: "Bob",
  greet: () => {
    console.log("Hello, " + this.name);
  },
};
document.body.addEventListener("click", o.greet); //?
```

<!-- v -->

```js [1-30]
function O() {
  this.name = "Bob";
  this.greet = () => {
    console.log("Hello, " + this.name);
  };
}
document.body.addEventListener("click", new O().greet); //?
```

<!-- v -->

```js [1-30]
let O = function () {
  this.name = "Bob";
  this.greet = () => {
    console.log("Hello, " + this.name);
  };
};
let greet = new O().greet;
greet.call({ name: "Sam" }); // ?
```

<!-- v -->

При использовании Babel можно пользоваться преимуществами стрелочных функций в классах c помощью [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)

<!-- v -->

### Вопросы?

<!-- s -->

### Что со всем этим делать?

_Понять, простить и пользоваться_

<!-- v -->

- Читать документацию, например [методы функций](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function) / [другие встроенные объекты](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects)
- [Monkey patching](https://learn.javascript.ru/native-prototypes#native-prototype-change)
- [Использовать чужие методы на своих объектах](https://learn.javascript.ru/native-prototypes#zaimstvovanie-u-prototipov)

<!-- s -->

### Домашнее задание

<!-- v -->

В ходе выполнения задания вы поработаете с двумя репозиториями, которые содержат в себе типичные задачи работы на Javascript.

Работать вы будете с двумя репозиториями

https://github.com/mrdavidlaing/javascript-koans

и

https://github.com/liammclennan/JavaScript-Koans

<!-- v -->

Вам нужно для каждого из репозиториев выполнить следующие шаги:

- скачать (склонировать или просто скачать) к себе репозиторий
- разобраться как запустить задачи (которые оформлены в виде тестов)
- внести изменения так, чтобы решения задач проходили тесты
- сделать коммит и пуллреквест с решением
- сделать скриншот всех пройденных тестов

<!-- v -->

Задание можно сдавать в формате

скриншоты пройденных тестов

**или**

скриншоты пройденных тестов и ссылка на пуллреквест с вашими изменениями (работу с гитом мы еще не разбирали, так что это задание со звездочкой)

<!-- v -->

Критерии оценки:

- решены все задачи в 1 репозитории (и предоставлены скриншоты пройденных тестов) - 5 баллов (по 5 за каждый)
- сделан пуллреквест с изменениями по решенным задачам - 3 балла (по 3 за каждый репозиторий)

Принято ставится от 10 баллов

<!-- v -->

### Вопросы?

<!-- s -->

### Дополнительные материалы

<!-- v -->

- [Отладка в браузере Chrome](https://learn.javascript.ru/debugging-chrome)
- [Продвинутая работа с функциями](https://learn.javascript.ru/advanced-functions)
- [Браузер: документ, события, интерфейсы](https://learn.javascript.ru/ui)
- [YT: Про цикл событий в JavaScript или "как на самом деле работает асинхронность"?](https://www.youtube.com/watch?v=8cV4ZvHXQL4)

<!-- v -->

#### Вопросы для самопроверки

<!-- v -->

1. Что такое контекст вызова функции? Чем определяется?

2. Как изменить this внутри функции? (5 способов)

3. чем различаются .call / .apply / .bind

4. Что такое сигнатура функции?

5. Чем характеризуется функция?

<!-- v  -->

6. Что такое прототип?

7. Как работает конструктор? Что происходит при вызове со словом new ?

8. Как происходит чтение свойств из объекта?

9. Как происходит запись свойств в объект?

10. Как проверить на принадлежность классу?

<!-- v -->

11. Как работает instanceof ?

12. Четыре принципа ООП

13. Виды полиморфизма. И их объяснение

14. Событийный цикл в javascript

15. Что такое фаза захвата / capturing ?

<!-- v -->

16. Что такое фаза всплытия / bubbling ?

17. Как подписаться на событие документа / html элемента?

18. Что такое Функция высшего порядка?

19. Что такое синхронный / асинхронный код?

20. Что такое каррирование ?

<!-- v -->

21. Что такое паттерн цепочка ? Как реализовать?

22. В чем разница объявления методов в конструкторе и на .prototype ?

23. Что такое 'полифилл'?

24. Что такое "стрелочная" ("arrow function") функция? Чем она отличается от обычной?

25. Что такое CORS?

<!-- v -->

26. Что такое и какие есть коды ответов HTTP?

27. Что такое делегирование событий? Преимущества и особенности работы с делегированием?

<!-- v -->

### Вопросы?

<!-- s -->

Опрос о занятии
