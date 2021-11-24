---
title: Занятие 28
description: Разработка собственного API
---

# OTUS

## Javascript Basic

<!-- v -->

### Вопросы?

<!-- s -->

### Разработка собственного API

<!-- v -->

Что такое `API` ?

<!-- v -->

Именование:

- типы и интерфейсы описывают ЧТО происходит
- реализации могут говорить, как это происходит

<!-- v -->

```ts
interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: any): void;
}

class LocalStorage implements Storage {}
```

<!-- v -->

Документирование интерфейсов

- публичные свойства и методы
- для методов определяем типы принимаемых аргументов, и тип возвращаемого значения
- при необходимости типизируем контекст (`this`)

<!-- v -->

Передача параметров:

- Передача параметров через конфигурационный объект
- Ограничивать число параметров 3 мя (и дальше переходить на конфигурационный объект)

<!-- v -->

```ts
function draw1(color: string, x: number, y: number): void {}
function draw2({
  color,
  x,
  y,
}: {
  color: string;
  x: number;
  y: number;
}): void {}
```

<!-- v -->

Асинхронный / синхронный интерфейс

<!-- v -->

Универсальный подход - делать **весь** код асинхронным. Но это плохо сказывается на производительности.

Минимальный список задач для асинхронных интерфейсов:

- чтение/сохранение данных
- ввод/вывод данных от пользователя
- валидации / сложные обработки данных
- работа с удаленными ресурсами

<!-- v -->

Асинхронный интерфейс может быть задан:

- callback-функцией
- Promise-интерфейсом
- событиями

<!-- v -->

Для callback функций есть стандартное [error-first соглашение](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)

```ts
function asyncOperation(
  param: any,
  fun: (error: Error | null, data: any) => {}
): any;
```

<!-- v -->

Для Promise:

```ts
function readData(key) {
  return Promise.resolve(localstorage.getItem(key));
}

async function readData(key) {
  return localstorage.getItem(key);
}
```

<!-- v -->

Документирование API:

- `.d.ts` файлы
- [tsdoc](https://github.com/microsoft/tsdoc)
- тесты

<!-- v -->

Вопросы?
