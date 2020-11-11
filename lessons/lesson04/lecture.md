---
title: Занятие 4
description: Базовое использование API и JavaScript. Как работать с DOM и другими доступными API
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!--s-->

### Базовое использование API и JavaScript.

#### Как работать с DOM и другими доступными API

<!-- s -->

### Асинхронный код - минимум для работы

_Подробнее будет в третьем модуле на занятии про асинхронный код_

<!-- v -->

#### JS - ОДНОПОТОЧНЫЙ ЯЗЫК

- Отрисовка DOM
- Обработка пользовательского ввода
- Выполнение JS кода

<!-- v -->

#### [ОЧЕРЕДЬ ЗАДАЧ В JS](https://developer.mozilla.org/ru/docs/Web/JavaScript/EventLoop)

- Среда выполнения содержит очередь событий (список событий, подлежащих обработке)
- Каждое событие ассоциируется с некоторой функцией.
- Каждый вызов функции добавляет запись в стек
- При завершении функции запись изымается из стека
- Когда стек освобождается, событие извлекается из очереди и обрабатывается (функция вызывается).

<!-- v -->

На бытовом уровне мы могли бы это объяснить так...

<!-- v -->

[Демонстрация](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson04/lessons/lesson04/code/singleThreadInJs?file=/index.html)

<!-- v -->

Поэтому операции, которые занимают длительное (больше 50 ms) операции стараются

- переложить на внешнего исполнителя
- отложить исполнение и разбить на части

<!-- v -->

Так появляется **асинхронный код** - когда результат вы получаете не немедленно, а отложено во времени.

<!-- v -->

Как работать с таким асинхронным кодом? Как это выглядит?

<!-- v -->

```js [1-30]
// работа с callback-фукнциями
const x = 2;
// результат мы можем обработать в callback-фукнции
calculateSomethingAsyncWithCallback(x, (result) => {
  console.log(result);
});
// в node.js было принято
calculateSomethingAsyncWithCallback(x, (error, result) => {
  if (error) {
    return console.error(error);
  }
  // ...
});
```

<!-- v -->

```js [1-30]
// работа с callback-фукнциями
const x = 2;
calculateSomethingAsyncWithCallback(x, (result) => {
  calculateSomethingElseAsyncWithCallback(result, (secondResult) => {
    console.log(result);
  });
});
```

<!-- v -->

### Вопросы?

<!-- v -->

Для решения проблемы [callback hell](http://callbackhell.com/) ввели интерфейс [Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Ispolzovanie_promisov).

<!-- v -->

```js [1-30]
function doSomething() {
  return new Promise((resolve, reject) => {
    console.log("Готово.");
    // Успех в половине случаев.
    if (Math.random() > 0.5) {
      resolve("Успех");
    } else {
      reject("Ошибка");
    }
  });
}

const promise = doSomething();
promise.then(successCallback, failureCallback);
```

<!-- v -->

```js [1-30]
calculateSomethingAsyncWithPromise(x)
  .then((result) => calculateSomethingElseAsyncWithPromise(result))
  .then((secondResult) => console.log(secondResult));
```

<!-- v -->

### Вопросы?

<!-- v -->

Но в Javascript приходит все больше и больше людей с других языков, и им непривычно читать такой код. Кроме того он имеет некоторые проблемы (например нам нужен одновременный доступ к `result` и `secondResult`).

<!-- v -->

Появились `async` функции. Которые предоставляют [`await` механизм](https://learn.javascript.ru/async-await).

<!-- v -->

Мы можем пометить функцию ключевым словом async. Это дает следующее:

1. функция теперь неявно возвращает Promise

1. внутри функции мы можем использовать ключевое слово `await` для разворачивания Promise-результатов

<!-- v -->

```js [1-30]
(async function () {
  const x = 2;
  const result = await calculateSomethingAsyncWithPromise(x);
  const secondResult = await calculateSomethingElseAsyncWithPromise(result);
  console.log(secondResult);
})();
```

<!-- v -->

**НО!** сейчас `await` работает только в `async` функциях.

Хотя мы все ждем [Top-level await](https://github.com/tc39/proposal-top-level-await).

<!-- v -->

### Вопросы?

<!-- s -->

### API

<!-- v -->

**API** (**программный интерфейс** приложения, интерфейс прикладного программирования) (англ. application programming interface, API [эй-пи-ай]) — [описание способов (набор классов, процедур, функций, структур или констант), которыми одна компьютерная программа может взаимодействовать с другой программой](https://ru.wikipedia.org/wiki/API).

<!-- v -->

Под API можно понимать любые методы и свойства, которые не относятся непосредственно к конструкциям языка

<!-- v -->

Каким API пользуются разработчики?

- встроенное в язык
- встроенное в среду исполнения
- предоставляемое дополнительными пакетами
- предоставляемое сторонними сервисами (доступ к которым делается посредством API среды исполнения или дополнительных пакетов)

<!-- v -->

Единственный способ узнать про API - читать документацию (статьи, книги, смотреть доклады).

Единственный способ научиться пользоваться API - работать с API.

<!-- v -->

Что мы посмотрим сегодня:

- работу со страницей (изменение страницы и чтение данных от пользователя)
- работу удаленными ресурсами
- сохранение данных

<!-- v -->

### Вопросы?

<!-- s -->

### Работа со страницей

<!-- v -->

**DOM** - Document Object Model.

API браузера для работы с веб страницей и ее элементами. Представлено глобальными объектами `window`, `document` и API для работы с HTML элементами (создание, удаление, редактирование).

<!-- v -->

Поиск элементов на странице:

- `document.getElementById`
- `document.getElementsByTagName`
- `document.querySelector`
- `document.querySelectoAll`

[Document API](https://developer.mozilla.org/ru/docs/Web/API/Document) и [описание селекторов](http://htmlbook.ru/css/selector)([1](http://sauron.org.ua/post/1254), [2](https://migo.com.ua/blog/css/css-selectory-kotorue-dolzhen-znat-kazhduy.html), [3](https://www.exlab.net/files/tools/sheets/css/css.pdf))

<!-- v -->

Создание и изменение элементов. Два варианта:

- использование `innerHTML` и работа с элементами как со строкой HTML
- использование `document.createElement` и работа с элементами как с узлами дерева

<!-- v -->

Для подписки на события элементов есть 3 варианта:

- `addEventListener` <-- мы будем использовать вот этот
- `onclick="func()"`
- `el.onclick=func`

<!-- v -->

[Пример](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson04/lessons/lesson04/code/DOMExamples)

<!-- v -->

[Практика](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson04/lessons/lesson04/code/DOMExamplesPractice)

<!-- v -->

### Вопросы?

<!-- s -->

Опрос о занятии

[https://otus.ru/polls/16694/](https://otus.ru/polls/16694/)
