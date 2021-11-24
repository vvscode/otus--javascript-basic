---
title: Занятие 9
description: Современный инструментарий при разработке клиентских (и не только) приложений
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!-- s -->

## Современный инструментарий при разработке приложений

<!-- v -->

**Задача:**: запустить локальный http сервер для просмотра локальных html страниц

**Варианты решения:**

- [`node-static`](https://www.npmjs.com/package/node-static)

<!-- v -->

**Задача:** выполнять код/команды при изменении файлов.

**Варианты решения:**

- [`watch`](https://www.npmjs.com/package/watch)
- [`nodemon`](https://www.npmjs.com/package/nodemon)

<!-- v -->

**Задача:** перезагрузить страницу при изменении файлов.

**Варианты решения:**

- [`browsersync`](https://browsersync.io/)
- [`livereload`](https://www.npmjs.com/package/livereload)

<!-- v -->

**Задача:** преобразовать код между разными стандартами Javascript

**Варианты решения:**

- [`babel`](https://babeljs.io/docs/en/babel-cli/)

<!-- v -->

**Задача:** собрать исходный код в один или несколько javascript файлов

**Варианты решения:**

- [`rollupjs`](https://rollupjs.org/)
- [`parcel`](https://parceljs.org/)
- [`webpack`](https://webpack.js.org/)

<!-- v -->

### Вопросы?

<!-- s -->

## Использование инструментария

<!-- v -->

Parcel вы уже использовали. Можно открыть любую "Vanilla Javascript" песочницу на Codesandbox и посмотреть `package.json`.

<!-- v -->

Плюсы Parcel:

- простота
- почти нет настроек

<!-- v -->

Минусы Parcel:

- простота
- почти нет настроек

<!-- v -->

_"Стандартом"_ в индустрии сейчас является [`webpack`](https://webpack.js.org/)

_А до этого были [`grunt`](https://gruntjs.com/) и [`gulp`](https://gulpjs.com/)._

<!-- v -->

**Важно!** Последняя версия [webpack - `5.x.x`](https://webpack.js.org/blog/2020-10-10-webpack-5-release/), но не все модули обновились для использования с этой версией, так что помните про [`4.x.x`](https://v4.webpack.js.org/)

<!-- v -->

### [Semver](https://semver.org/lang/ru/)

Изменения в версии `МАЖОРНАЯ.МИНОРНАЯ.ПАТЧ` (`5.5.1`) означают:

- **МАЖОРНАЯ**-версия, когда сделаны обратно несовместимые изменения API.
- **МИНОРНАЯ**-версия, когда вы добавлена новая функциональность, не нарушая обратной совместимости.
- **ПАТЧ**-версия, когда делаются обратно совместимые исправления.

<!-- v -->

Минимум для работы с webpack:

- установить как зависимость
- добавить команды в package.json
- добавить файл конфигурации `webpack.config.js` с настройками (по необходимости)

<!-- v -->

### Вопросы?

<!-- v -->

**Задача:** презентовать код из репозитория.

**Варианты решения:**

- [Github Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Heroku](https://www.heroku.com/)
- [Surge](https://surge.sh/)

<!-- v -->

**Внимание**. Остерегайтесь _"легкой"_ настройки через интерфейс. Это

- сложно поддерживать
- сложно масштабировать (или повторять)

<!-- v -->

На курсе для презентации работы (за исключением задач, связанных с разработкой серверного кода), мы будем [использовать Github Pages](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

<!-- v -->

**Задача:** проверить, какой код покрыт тестами (и контролировать этот параметр в дальнейшем).

**Вариант решения:** Контролировать [покрытие кода](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5_%D0%BA%D0%BE%D0%B4%D0%B0)

<!-- v -->

В jest это можно сделать с помощью [параметра командной строки](https://jestjs.io/docs/ru/cli#--coverageboolean) или [настройки в конфигурации](https://jestjs.io/docs/ru/configuration#collectcoverage-boolean). Контролировать изменение параметра так же можно при помощи [соответствующей настройки coverage threshold](https://jestjs.io/docs/ru/configuration#coveragethreshold-object)

<!-- v -->

### Вопросы?

<!-- s -->

## [Домашнее задание](./homework.md)

<!-- v -->

### Вопросы?

<!-- s -->

Дополнительные материалы:

- [YT: Webpack 4. Видео курс (2 ч)](https://www.youtube.com/watch?v=eSaF8NXeNsA)
- [Скринкаст по Webpack](https://learn.javascript.ru/screencast/webpack)
- Jest - Configuring [1](https://www.youtube.com/watch?v=TGfrv7jgW2c) и [2](https://www.youtube.com/watch?v=2sCshscn-rc)
- Дополнительное занятие с примером разработке Game Of Life (в личном кабинете)
- [Workflow для деплоя на Github Pages](https://github.com/otus-js-student/js--game-of-life/blob/master/.github/workflows/deploy-gh-pages.yml)
- [YT: Webpack, как настроить его правильно (OTUS)](https://www.youtube.com/watch?v=dOO3bX3a8YU)
