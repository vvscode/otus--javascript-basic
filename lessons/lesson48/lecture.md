---
title: Занятие 48
description: Сферы применения Node.js
---

# OTUS

## Javascript Basic

<!-- v -->

Вопросы?

<!-- s -->

### Сферы применения Javascript

<!-- v -->

- Frontend (все, что работает в браузере)
- Backend (Node.js и серверная разработка)
- CLI (утилиты командной строки)
- [Desktop](https://www.electronjs.org/)
- [Кроссплатформенная разработка](https://microsoft.github.io/reactxp/)
- [Встраиваемый язык](https://ru.wikipedia.org/wiki/Rhino) (google docs, ms office, браузеры)
- [IoT](https://www.iotforall.com/javascript-iot)
- Общее назначение (ML, анализ данных и тп)

<!-- v -->

Вопросы?

<!-- s -->

### Внебраузерное использование javascript

<!-- v -->

С 1996 существовал [JScript](https://ru.wikipedia.org/wiki/JScript), который позволял писать скрипты для управления системой

<!-- v -->

В 2009 появляется Node.js ([презентация проекта](https://www.youtube.com/watch?v=EeYvFl7li9E) как замена PHP)

<!-- v -->

С тех пор проект развивался с [разной степенью активности](https://www.wired.com/2014/12/io-js/)

<!-- v -->

Вопросы?

<!-- s -->

### [Node.js](https://nodejs.org/ru/)

<!-- v -->

Построен вокруг движка [v8](https://v8.dev/), к которому написана [обвязка на c++](https://github.com/libuv/libuv) для работы c I/O и [набор модулей на javascript](https://nodejs.org/docs/latest-v12.x/api/)

<!-- v -->

Дополнительные пакеты принято устанавливать с репозиториев ([npmjs](https://www.npmjs.com/)) или напрямую из исходных кодов (просто важно помнить про особенности платформы)

<!-- v -->

Вопросы?

<!-- s -->

### Особенности платформы

<!-- v -->

- Отсутствие браузерных API
- Собственная библиотека модулей
- Использование [commonjs модулей](https://nodejs.org/api/modules.html#modules_modules_commonjs_modules)
- [ES6 импорты поддерживаются ограниченно](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules)
- [Возможность контролировать версию окружения](https://github.com/nvm-sh/nvm) (и [пресекать использование других версий](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines))
- нет заботы о размере используемых пакетов (но нужно помнить про качество этих пакетов)
- callback интерфейсы в стандартной библиотеке (с возможностью [конвертации в promise-based код](https://nodejs.org/api/util.html#util_util_promisify_original)) или блокирующие функции

<!-- v -->

При желании мы можем использовать [ts-node](https://github.com/TypeStrong/ts-node) или уже знакомые babel/webpack для транспиляции и дополнительных возможностей

<!-- v -->

[Отладка скриптов](https://nodejs.org/ru/docs/guides/debugging-getting-started/) может делаться через:

- встроенный инструмент отладки
- chrome://inspect
- IDE

<!-- v -->

Вопросы?

<!-- s -->

### Полезные инструменты

<!-- v -->

[nodemon](https://www.npmjs.com/package/nodemon) - для перезапуска скриптов при изменении исходного кода (замета refresh/hot reload)

<!-- v -->

[Commander](https://github.com/tj/commander.js/) / [Inquirer](https://github.com/SBoudrias/Inquirer.js) / [yargs](https://www.npmjs.com/package/yargs) - для организации cli интерфейсов и роутинга

<!-- v -->

Для работы с серверным кодом

- [express.js](https://expressjs.com/ru/)
- [hapi](https://hapi.dev/) / [loopback](https://loopback.io/)
- [next.js](https://nextjs.org/)
- [nest.js](https://nestjs.com/)

<!-- v -->

Вопросы?

<!-- s -->

### [Deno](https://deno.land/)

<!-- v -->

После того, как Ryan Dahl отошел от разработки в node.js он [пересмотрел подход к разработке](https://www.youtube.com/watch?v=M3BM9TB-8yA) и сейчас работает над проектом Deno

<!-- v -->

Из коробки:

- typescript
- фокус на безопасности
- нет npm (зато есть поддержка разных источников пакетов)

<!-- v -->

Вопросы?

<!-- s -->

Дополнительные материалы:

- [Quick start](https://nodejs.dev/learn)
- [Скринкаст от Ильи Кантора](https://learn.javascript.ru/screencast/nodejs)
