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
// работа с callback-функциями
const x = 2;
// результат мы можем обработать в callback-функции
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
// работа с callback-функциями
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

Краткий итог:

- некоторый функции нужно вызывать с ключевым словом `await`
- `await` работает только внутри функций, которые помечены как `async`

Подробнее мы будем разбирать на занятии про асинхронность

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

[Интерфейсы веб API](https://developer.mozilla.org/ru/docs/Web/API)

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

### [Сохранение данных](https://learn.javascript.ru/data-storage)

<!-- v -->

- [IndexedDB](https://developer.mozilla.org/ru/docs/Web/API/IndexedDB_API)
- [Storage](https://developer.mozilla.org/ru/docs/Web/API/Storage) (Local Storage / Session Storage)
- [Cookies](https://developer.mozilla.org/ru/docs/Web/API/Document/cookie)

<!-- v -->

DOM Storage полезен для хранения небольшого количества данных, но он менее выгоден для большого числа структурированных данных (тк работает со строками). IndexedDB предоставляет решение для клиентского хранилища большого объема структурированных данных, включая файлы/blobs.

<!-- v -->

```js [1-30]
// Пример работы с local storage
const key = "someKey";
const value = "someValue";
localStorage.setItem(key, value);
console.log(localStorage.getItem(key));
localStorage.removeItem(key);
console.log(localStorage.getItem(key)); // null
```

<!-- v -->

```js [1-30]
// ВАЖНО! работает только со строками
const key = "someKey";
const value = 1;
localStorage.setItem(key, value);
console.log(localStorage.getItem(key)); // "1"
```

<!-- v -->

```js [1-30]
// для работы с другими типами данных
// обычно используют сериализацию
const value1 = 1;
const value2 = { name: "Bob" };
localStorage.setItem("value1", JSON.stringify(value1));
localStorage.setItem("value2", JSON.stringify(value2));
console.log(JSON.parse(localStorage.getItem("value1"))); // 1
console.log(JSON.parse(localStorage.getItem("value2"))); // { name: 'Bob' }
```

<!-- v -->

Важно помнить, что если значения нет - вы получите `null` и десериализация сломается. Поэтому перед вызовом `parse` нужно проверять данные.

<!-- v -->

И еще одно отступление про асинхронность (мы будем об этом говорить подробнее на занятии по дизайну вашего API)

<!-- v -->

В разработке принято писать на уровне интерфейсов (абстракций), а не реализаций. То есть вы должны знать ЧТО делает функция или модуль, но не КАК.

Когда вы начинаете использовать детали реализации - это называется "протекающая абстракция".

<!-- v -->

Типичные кандидаты на асинхронные операции:

- запрос данных от пользователя
- сохранение и чтение данных
- обращение к стороннему сервису
- валидации и сложные вычисления

<!-- v -->

Но при этом

- для запроса данных от пользователя есть синхронные `alert` / `prompt`
- для чтения и сохранения данных есть синхронный `localStorage`

<!-- v -->

Лучше сразу заложить возможность для расширения, и использовать асинхронные обертки. Тогда в любой момент можно будет поменять реализацию, и вместо `localStorage` сохранять данные на сервере, например. А вместо `alert` показывать красивое стилизованное модальное окно (которое не блокирует поток).

<!-- v -->

```js [1-30]
async function asyncPrompt(request) {
  return prompt(request);
}
// const x = asyncPrompt(); работать не будет
const x = await asyncPrompt();
```

<!-- v -->

### Вопросы?

<!-- v -->

[Практика](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson04/lessons/lesson04/code/dataStoragePractice)

<!-- v -->

### Вопросы?

<!-- s -->

### [Работа со сторонними сервисами](https://learn.javascript.ru/network)

<!-- v -->

Для работы с HTTP запросами у нас есть два варианта (на самом деле больше, если подключать библиотеки):

- [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest)
- [fetch](https://learn.javascript.ru/fetch)

<!-- v -->

`fetch` - поддерживается современными браузерами, предоставляет Promise-based интерфейс (удобен для `async` функций) и прост в использовании.

<!-- v -->

```js [1-30]
// await-friendly окружение
let response = await fetch(url);

let text = await response.text();

console.log(text);
```

<!-- v -->

```js [1-30]
// await-friendly окружение
let response = await fetch("/article/fetch/post/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify(user),
});

let jsonData = await response.json();
console.log(jsonData);
```

<!-- v -->

`fetch` возвращает вам объект типа [`Response`](https://developer.mozilla.org/ru/docs/Web/API/Response).

Чаще всего используются

- поле `ok`
- поле `status`
- методы `text()` и `json()`

<!-- v -->

### Вопросы?

<!-- v -->

[Практика](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson04/lessons/lesson04/code/fetchPractice)

[OpenWeather API](https://openweathermap.org/current)

<!-- v -->

### Вопросы?

<!-- v -->

Дополнительное задание:

при заходе на страницу показать пользователю погоду в его городе. Для получения этой информации можно сделать запрос на `https://get.geojs.io/v1/ip/geo.json`, который вернет данные в формате JSON.

[GeoAPI](https://www.geojs.io/docs/v1/endpoints/geo/)

<!-- s -->

Собираем все вместе. Создайте страницу:

- при открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности
- он может ввести имя города в поле ввода и увидеть погоду в выбранном городе
- введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где он смотрел погоду
- при клике по строчке города в списке он видит погоду в выбранном

<!-- v -->

### Вопросы?

<!-- s -->

### [Домашнее задание](./homework.md)

<!-- v -->

Вопросы?

<!-- s -->

#### Дополнительные материалы

<!-- v -->

1. [Путеводитель по JavaScript Promise для новичков](https://habr.com/ru/company/zerotech/blog/317256/)
1. [Public APIs](https://github.com/public-apis/public-apis#open-source-projects)
1. [Чистый код на Javascript](https://github.com/BoryaMogila/clean-code-javascript-ru/)
1. [JavaScript. Как работать с API Telegram, Youtube и VK](https://live.ithillel.ua/javascript.-rabota-s-api)
1. [Что на самом деле происходит, когда пользователь вбивает в браузер адрес google.com](https://habr.com/ru/company/htmlacademy/blog/254825/)

<!-- v -->

#### Вопросы для самопроверки

1. Чем куки (cookie) отличаются от localStorage ?

2. Что такое CORS?

3. Что такое и какие есть коды ответов HTTP?

4. Что такое jsonp-запрос?

5. Как реализовать подписку на клик по кнопке, которая отработает только один раз? ( с примером кода )

<!-- v -->

6. Что такое KISS, DRY, YAGNI?

7. Быть в состоянии рассказать что такое XHR, AJAX, CDN

8. Чем XMLHTTPRequest отличается от fetch?
