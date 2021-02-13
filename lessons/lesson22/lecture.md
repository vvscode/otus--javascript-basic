---
title: Занятие 22
description: ООП
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

<!-- s -->

## Функциональное программирование

<!-- v -->

**Функциона́льное программи́рование (ФП)** — предполагает обходиться вычислением результатов функций от исходных данных и результатов других функций, и не предполагает явного хранения состояния программы. Соответственно, не предполагает оно и изменяемости этого состояния.

<!-- v -->

- Есть функции и данные
- Данные иммутабельны, неизменны
- Функции возвращают новые данные на основе входящих значений

<!-- s -->

### Чистые функции

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

<!-- v -->

- если результат чистой функции не используется, её вызов может быть удалён

- результат вызова чистой функции может быть мемоизирован

- если нет никакой зависимости по данным между двумя чистыми функциями, то порядок их вычисления можно поменять

<!-- v -->

### Вопросы?

<!-- s -->

### Immutable data

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

ВАЖНО! JSON.stringify упадет, если будут циклические зависимости

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

### First class functions

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

### Функции высшего порядка

<!-- v -->

**Фу́нкция вы́сшего поря́дка** — в программировании функция, принимающая в качестве аргументов другие функции или возвращающая другую функцию в качестве результата.

<!-- v -->

**Мемоизация** — в программировании сохранение результатов выполнения функций для предотвращения повторных вычислений.

<!-- v -->

Реализуем? :)
[Memo](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/fizzbuzz/lessons/lesson01/code/fizzbuzz)

<!-- v -->

### Вопросы?

<!-- s -->

### Декларативный VS императивный подходы

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

### Семантика методов массива

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

### Вопросы?

<!-- s -->

Дополнительные материалы:
TBD

<!-- v -->

### Опрос о занятии
