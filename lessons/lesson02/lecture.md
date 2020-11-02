---
title: Занятие 2
description: Писать базовые скрипты на javascript, создавать программы обрабатывающие ввод от пользователя и делать вывод на странице
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!--s-->

### Версии Javascript

[ES ?? и остальные](https://en.wikipedia.org/wiki/ECMAScript#Versions)

<!--v-->

Для работы в старых браузерах нужна "транспиляция" - процесс превращения кода в код для старых версий.

Для каждого окружения свой набор правил. Можно проверить [тут](https://kangax.github.io/compat-table/es6/).

<!--v-->

Мы работаем с `ES6`.
Но знать про `ES5` все еще нужно.

<!--v-->

- для понимания работы
- для отладки приложений
- для собеседований

<!--v-->

### Вопросы?

<!--s-->

### Типы данных

<!--v-->

Javascript:

[- динамическая типизация

- слабая типизация
- неявная типизация](https://habr.com/ru/post/161205/)

<!--v-->

- undefined
- null
- boolean
- string
- number
- object

- symbol

- bigint

<!--v-->

Узнать про тип переменной можно при помощи оператора `typeof`.

Результатом typeof является строка, содержащая тип.

<!--v-->

```js[1-30]
typeof undefined; // "undefined"
typeof 0; // "number"
typeof 1n; // "bigint"
typeof true; // "boolean"
typeof "foo"; // "string"
typeof Symbol(); // "symbol"
typeof {}; // "object"
typeof null; // "object"  (1)
typeof function () {}; // "function"  (2)
```

<!--v-->

### Вопросы?

<!--s-->

### Объявление переменных

<!--v-->

var / let / const

<!-- v -->

**var** - ES5, область видимости - глобальная или функция, работает hoisting

**let** - ES6, область видимости - блочная, hoisting НЕ работает

**const** - ES6, область видимости - блочная, hoisting НЕ работает

<!--v-->

**let** - позволяет изменять значение

**const** - НЕ позволяет изменять значение. НО! значение это ссылка, если это ссылка на объект - объект по прежнему можно изменять

```js[1-30]
let a = 1;
let b;
b = "2";

let c = null,
  d = {};

const a = 1n;
```

<!-- v -->

### Вопросы

<!-- s -->

### Ввод / вывод

<!-- v -->

```js[1-30]
// Вывод
console.log(1);

alert(2);
```

<!-- v -->

Вывод на странице

```html[5-30]
<div class="message"></div>
```

```js[5-30]
document.querySelector(".message").innerHTML = "Hello";
```

<!-- v -->

```js[1-30]
// Ввод
console.log(prompt("Enter your value:", 123)); // string | null
console.log(prompt("Enter another value:")); // string | null
console.log(confirm("Are you sure?")); // boolean
```

<!-- v -->

Ввод со страницы

```html[5-10]
<input id="someInput" />
```

```js[5-30]
const value = document.getElementById("someInput");
console.log(value);
```

<!-- v -->

### Вопросы?

<!-- s -->

### Условные выражения

<!-- v -->

Логические преобразования

- Значения, которые интуитивно «пустые», вроде `0`, пустой строки `''`, `null`, `undefined` и `NaN`, становятся `false`.
- Все остальные значения становятся `true`.

<!-- v -->

if

```js[1-30]
if (someFlag) {
  console.log("Ho ho ho");
}

// do not do this
// https://eslint.org/docs/rules/curly
if (1 === 2) console.log("You do not see it");
```

<!-- v -->

if / else

```js[1-30]
if (someFlag) {
  console.log("Ho ho ho");
} else {
  console.log("No no no");
}

if (someFlag) {
  console.log("Ho ho ho");
} else if (someOtherFlag) {
  console.log("Da da da");
}
```

<!-- v -->

Тернарный оператор

```js[1-20]
// result = условие ? значение1 : значение2;
const workHoursPerWeek = user.age >= 18 ? 40 : 20;
```

<!-- v -->

Switch

```js[1-20]
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

<!-- v -->

Switch

```js[1-20]
let a = 2 + 2;

switch (a) {
  case 2: // группировка
  case 3:
    alert("Маловато");
    break;
  case 4:
    alert("В точку!");
    break;
  case 5:
    alert("Перебор"); // затронет и следующее действие
  default:
    alert("Давай попробуем еще раз");
}
```

<!-- v -->

С использованием логических операторов

```js[1-30]
// Первый же false-like результат прерывает цепочку &&
const x = someFlag && runOnlyIfFlagIsTrue();

someFlag && condition && runOnlyIfFlagIsTrue();

// Первый же true-like результат прерывает цепочку ||
const y = someAnotherFlag || runOnlyIfAnotherFlagIsFalse();

someAnotherFlag || runOnlyIfAnotherFlagIsFalse();
```

<!-- v -->

## Вопросы?

<!-- s -->

## Циклы

<!-- v -->

while

```js[1-30]
while (condition) {
  // код
  // также называемый "телом цикла"
}
```

<!-- v -->

while

```js[1-30]
let i = 3;
while (i) {
  // когда i будет равно 0, условие станет ложным, и цикл остановится
  alert(i);
  i--;
}
```

<!-- v -->

do..while

```js[1-30]
let i = 3;
do {
  alert(i);
  i--;
} while (i);
```

<!-- v -->

Чем отличаются циклы `while` и `do..while` ?

<!-- v -->

for

```js[1-30]
// любая часть может быть пропущена
for (начало; условие; шаг) {
  // ... тело цикла ...
}
```

<!-- v -->

```js[1-30]
for (let i = 0; i < 3; i++) {
  // выведет 0, затем 1, затем 2
  alert(i);
}
```

<!-- v -->

#### Директивы `break` и `continue`

**break** - выход из цикла в любой момент

**continue** - переход к следующей итерации

<!-- v -->

break

```js[1-30]
for (let i = 0; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
} // ?
```

<!-- v -->

continue

```js[1-30]
let i = 5;
while (i !== 0) {
  if (i === 3) {
    continue;
  }
  console.log(i);
  i = i - 1;
} // ?
```

<!-- v -->

Строгое и нестрогое сравнение

```js[1-30]
5 == 5; // true
5 === 5; // true
new Number(5) == 5; // true
new Number(5) === 5; // false!
new Number(5) == new Number(5);
new Number(5) === new Number(5);
```

<!-- v -->

[Абстрактное сравнение типов](https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison).

Поэтому eslint задает правило [eqeqeq](https://eslint.org/docs/rules/eqeqeq)

<!-- v -->

### Вопросы ?

<!-- s -->

Практика

<!-- s -->

### Дополнительные материалы

- [Основы Javascript](https://learn.javascript.ru/first-steps)
- [Отличия == и === в JavaScript](https://habr.com/ru/post/138272/)
- [YT: What the... JavaScript?](https://www.youtube.com/watch?v=2pL28CcEijU)

<!--s-->

Опрос о занятии

[https://otus.ru/polls/16693/](https://otus.ru/polls/16693/)
