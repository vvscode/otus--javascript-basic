---
title: Занятие 24
description: Создание подключаемых плагинов
---

# OTUS

## Javascript Basic

<!--v-->

### Проверка

- Хорошо ли видно и слышно?
- Проверить идёт ли запись

<!-- s -->

## Создание подключаемых

## плагинов & библиотек

<!-- v -->

## Цели занятия

- Разобраться как устроены подключаемые плагины

- Научиться создавать свои кастомные плагины

<!-- v -->

## Маршрут вебинара

- Введение
- Подключение сторонних скриптов/стилей к странице
- Создание "декларативных" подключаемых плагинов
- Создание "императивных" подключаемых плагинов
- Практика
- Итоги

<!-- v -->

## Вопросы?

<!-- s -->

## Введение

"Плагин" - коллекция многоразовых и универсальных фрагментов кода, написанных на CSS, HTML и JavaScript

Ускоряют процесс разработки, позволяя переиспользовать готовые решения

<!-- ### Введение ℹ️
- CSS & JS в браузере доступны глобально

### Предостережения ℹ️

- CSS & JS доступна глобальна
  - Конфликты имён классов, глобальных переменных
  - Сложность
- Решения
  - BEM, CSS Modules, CSS in JS
  - Компонентные библиотеки React/Angular/Vue
  - [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
  - [JS Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) -->

<!-- s -->

## Подключение сторонних

## скриптов/стилей к странице

1. npm registry + bunders
1. &lt;link>, &lt;script> tags

<!-- v -->

## Подключение сторонних

## скриптов/стилей к странице

1. [npm registry](http://npmjs.com/) + bunders (webpack, parcel, etc)

```sh
$ npm install some-library
```

```js
/* JS or TS file */

// Option 1: Declarative way
import "some-library/dist.css";
import "some-library";

// Option 2: Imperative way
import "some-library/dist.css";
import SomeLibrary from "some-library";

const someLibraryItem = new SomeLibrary(selector, options);
someLibraryItem.doSomething();
```

<!-- v -->

## Подключение сторонних

## скриптов/стилей к странице

2. &lt;link>, &lt;script> tags

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="url-to-some-library-css"></link>
    <script src="url-to-some-library-js"></script>
    <!-- ... -->
  </head>
  <body>
  <!-- ... -->
  </body>
</html>

```

<!-- v -->

## Вопросы?

<!-- s -->

## Создание "декларативных" подключаемых плагинов

- Легко интегрировать (+)
- Менее гибкие (-)

<!-- v -->

## Создание "декларативных" подключаемых плагинов.

### [Example](https://codesandbox.io/s/js-css-declarative-plugin-example-d572z)

<!-- v -->

## Вопросы?

<!-- s -->

## Создание "императивных" подключаемых плагинов

- Нужно самому добавлять логику использования (-)
- Более гибкие (+)

<!-- v -->

## Создание "императивных" подключаемых плагинов

### [Example](https://codesandbox.io/s/js-css-imperative-plugin-example-zcvp9)

<!-- v -->

## Вопросы?

<!-- s -->

## [Практика](https://codesandbox.io/s/amazing-gagarin-s3kbg?file=/index.html)

- Fork codesandbox
- Implement "Accordion" imperative version

<!-- s -->

## Итоги - Тезисы

1. Сторонние плагины/библиотеке можно добавлять 2 способами

- npm + bundlers or link/script tags

1. Плагины могут быть декларативными и императивными
1. Декларативные

- Легко подключаются, но менее настраиваемые

1. Императивные

- Нужно писать логику использование, но более управляемые

<!-- v -->

## Вопросы?

<!-- s -->

## Домашнее задание

Разработать слайдер, который подключается к странице и позволяет получить аналог [bootstrap carousel](https://getbootstrap.com/docs/5.0/components/carousel/)

<!-- s -->

## Спасибо за внимание!

[Ссылка на опрос](https://otus.ru/polls/16711/)
