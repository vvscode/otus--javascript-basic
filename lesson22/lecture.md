---
title: Занятие 22
description: ФП
---

# OTUS

## Javascript Basic

<!-- v -->

Преподаватель

<!-- v -->

### План вебинара:

- Чистые функции
- Immutable data
- Функции как first class citizens
- Функции высшего порядка
- Декларативный VS императивный подходы
- Семантика методов массива
- Композиция и каррирование

<!-- s -->

## Функциональное программирование

<!-- v -->

**Функциональное программирование (ФП)** — предполагает обходиться вычислением результатов функций от исходных данных и результатов других функций, и не предполагает явного хранения состояния программы. Соответственно, не предполагает оно и изменяемости этого состояния.

<!-- v -->

- Есть функции и данные
- Данные иммутабельны, неизменны
- Функции возвращают новые данные на основе входящих значений

<!-- s -->

## Чистые функции

<!-- v -->

**Чистые функции** - выходные данные зависят только от входных. Функции "без побочных эффектов".

<!-- v -->

Является ли функция чистой?

```js [1-30]
const set = new Set();

function hasDuplicates(arr) {
  return arr.some((val) => {
    if (set.has(val)) return true;
    else {
      set.add(val);
      return false;
    }
  });
}
```

<!-- v -->

Пример чистой функции

```js [1-30]
function hasDuplicates(arr) {
  const set = new Set();
  return arr.some((val) => {
    if (set.has(val)) return true;
    else {
      set.add(val);
      return false;
    }
  });
}
```

Более короткий вариант

```js [1-30]
new Set(arr).values().length === arr.length;
```

<!-- v -->

- если результат чистой функции не используется, её вызов может быть удалён

- результат вызова чистой функции может быть мемоизирован

- если нет никакой зависимости по данным между двумя чистыми функциями, то порядок их вычисления можно поменять

<!-- v -->

### Вопросы?

<!-- s -->

## Immutable data

<!-- v -->

**Что же такое мутация?**

<!-- v -->

**Мутация** — это изменение существующих данных или структуры, которая их в себе хранит.

```js [1-30]
const person = {
  name: "John",
  age: 28,
};
const newPerson = person;
newPerson.age = 30;
console.log(newPerson === person); // истина
console.log(person); // { name: 'John', age: 30 }
```

<!-- v -->

**Иммутабельность** предполагает создание копии существующих данных или структуры, когда необходимы изменения, и добавление этих изменений туда.

<!-- v -->

#### Способы создания копии объекта #1

Object.assign(target, ...sources)

```js [1-30]
const person = {
  name: "John",
  age: 28,
};
const newPerson = Object.assign({}, person, {
  age: 30,
});
console.log(newPerson === person); // ложь
console.log(person); // { name: 'John', age: 28 }
console.log(newPerson); // { name: 'John', age: 30 }
```

После копирования возвращается целевой объект(target).

<!-- v -->

#### Способы создания копии объекта #2

Оператор spread

```js [1-30]
const person = {
  name: "John",
  age: 28,
};
const newPerson = {
  ...person,
  age: 30,
};
console.log(newPerson === person); // ложь
console.log(newPerson); // { name: 'John', age: 30 }
```

<!-- v -->

#### Способы создания копии объекта #3

Для глубокой копии можно использовать

```js [1-30]
target = JSON.parse(JSON.stringify(source));
```

ВАЖНО! JSON.stringify упадет, если будут циклические зависимости, а также не будет копировать методы.

<!-- v -->

А если нужно убрать элемент?

```js [1-30]
const person = {
  name: "John",
  password: "123",
  age: 28,
};
const newPerson = Object.keys(person).reduce((obj, key) => {
  if (key !== property) {
    return { ...obj, [key]: person[key] };
  }
  return obj;
}, {});
```

Еще вариант:

```js [1-30]
const { redundantProperty, ...newPerson } = person;
```

<!-- v -->

#### Заморозка объекта

```js [1-30]
Object.freeze(target);
```

Заморозка объекта будет поверхностной(shallow)  
Для глубокой заморозки объекта ребята из [Mozilla](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) написали готовый способ

<!-- v -->

Плюсы:

- блокировка для многопоточности больше не является проблемой: если данные не изменяются, нет необходимости в какой-либо блокировке, чтобы синхронизировать разные потоки;
- отслеживать изменения в данных намного проще(достаточно сравнить ссылки на объект)

Минусы:

- использование иммутабельных структур данных по своей природе является причиной пиковых значений в использовании памяти.
<!-- v -->

### Вопросы?

<!-- s -->

## First class functions

<!-- v -->

Функция - полноценный гражданин программы

- можно передать в качестве аргумента другой функции

- можно вернуть функцию из другой функции

- можно присвоить переменной или сохранить в структуре данных

<!-- v -->

Передача функции в качестве аргумента другой функции

```js [1-30]
function callArgument(cb) {
  cb();
}

function sayHello() {
  console.log("Hello!");
}

callArgument(sayHello);
```

<!-- v -->

Возврат функции как результат другой функции

```js [1-30]
function getHello() {
  return function () {
    console.log("Hello!");
  };
}

const sayHello = getHello();
sayHello();
```

<!-- v -->

Сохранение в структурах данных

```js [1-30]
function sayHello() {
  console.log("Hello!");
}
function sayDratuti() {
  console.log("Dratuti!");
}
function sayBonjour() {
  console.log("Bonjour!");
}

const sayArray = [];
sayArray.push(sayHello);
sayArray.push(sayDratuti);
sayArray.push(sayBonjour);
sayArray.forEach((say) => say());
```

<!-- v -->

### Вопросы?

<!-- s -->

## Функции высшего порядка

<!-- v -->

**Функция высшего порядка** — в программировании функция, принимающая в качестве аргументов другие функции или возвращающая другую функцию в качестве результата.

<!-- v -->

**Мемоизация** — в программировании сохранение результатов выполнения функций для предотвращения повторных вычислений.

<!-- v -->

Реализуем? :)
[Memo](https://codesandbox.io/s/github/acsais/otus--javascript-basic/tree/lesson22/lessons/lesson22/code/memo)

<!-- v -->

### Вопросы?

<!-- s -->

## Декларативный VS императивный подходы

<!-- v -->

Императивный подход отвечает на вопрос КАК?

Декларативный подход отвечает на вопрос ЧТО?

<!-- v -->

Напишите функцию double, которая принимает массив чисел и возвращает новый массив после удвоения каждого элемента в этом массиве. double([1,2,3]) -> [2,4,6]

Напишите функцию add, которая принимает массив и возвращает результат сложения элементов массива. add ([1,2,3]) -> 6

<!-- v -->

Императивный стиль

```js [1-30]
function double(arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
  }
  return results;
}
// ---
function add(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}
```

<!-- v -->

Декларативный стиль

```js [1-30]
function double(arr) {
  return arr.map((item) => item * 2);
}
// ---
function add(arr) {
  return arr.reduce((prev, current) => prev + current, 0);
}
```

<!-- v -->

### Вопросы?

<!-- s -->

## Семантика методов массива

<!-- v -->

#### Метод forEach

```js [1-30]
arr.forEach(function callback(currentValue, index, array) {
    //your iterator
}[, thisArg]);
```

Возвращает undefined  
Не стоит использовать для изменения значений

<!-- v -->

#### Метод sort

```js [1-30]
arr.sort([compareFunction]);
```

Сортирует массив "на месте", т.е. изменяет исходный массив.  
Не ~~по фэншую~~ в стиле ФП :)

<!-- v -->

#### Метод filter

```js [1-30]
let newArray = arr.filter(callback(element[, index, [array]])[, thisArg])
```

Вернётся новый массив с элементами, которые проходят тест(то есть callback вернёт true).

<!-- v -->

#### Метод reduce

```js [1-30]
array.reduce(callback[, initialValue])
```

```js [1-30]
callback(accumulator, currentValue);
```

Пример:

```js [1-30]
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(array1.reduce(reducer, 5)); // 15
```

<!-- v -->

### Вопросы?

<!-- s -->

## Композиция и каррирование

<!-- v -->

**Композиция** - создание сложной функциональности за счет объединения более простых функций.

<!-- v -->

#### Пример

`upperCase` - возьмет строку и вернет её в верхнем регистре

`exclaim` - возьмет строку и добавит восклицательный знак

`repeat` - возьмет строку и утроит её, добавив пробел между ними

```js [1-30]
const upperCase = (str) => str.toUpperCase();
const exclaim = (str) => `${str}!`;
const repeat = (str) => `${str} `.repeat(3);
```

<!-- v -->

Исходная строка «I love coding»

```js [1-30]
const upperCase = (str) => str.toUpperCase();
const exclaim = (str) => `${str}!`;
const repeat = (str) => `${str} `.repeat(3);

console.log(
  repeat(exclaim(upperCase("I love coding"))) // I LOVE CODING! I LOVE CODING! I LOVE CODING!
);
```

Проблема - вызов получился длинным и трудным для чтения

<!-- v -->

Создадим функцию `compose`, которая должна работать следующим образом:

```js [1-30]
const withСompose = compose(upperCase, exclaim, repeat);

console.log(withСompose("I love coding")); // I LOVE CODING! I LOVE CODING! I LOVE CODING!
```

[Compose](https://codesandbox.io/s/github/acsais/otus--javascript-basic/tree/lesson22/lessons/lesson22/code/compose)

<!-- v -->

**Каррирование** – это трансформация функций таким образом, чтобы они принимали аргументы не как f(a, b, c), а как f(a)(b)(c).

<!-- v -->

Пример:

```js [1-30]
function curry(f) {
  // curry(f) выполняет каррирование
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

// использование
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert(carriedSum(1)(2)); // 3
```

<!-- s -->
<!-- v -->

Дополнительные материалы:
[Методы и свойства массивов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)
[Методы и свойства объектов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

<!-- v -->

### Опрос о занятии
