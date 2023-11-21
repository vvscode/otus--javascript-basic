---
title: Занятие 20
description: Настройка окружения для современной разработки на TS, настройка тестового окружения
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!-- s -->

## Настройка окружения для современной разработки на TS

<!-- v -->

Typescript, хоть и очень похож на Javascript, все же отличается. Поэтому для преобразования кода в [AST](https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D0%BE%D0%B5_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE) нужны другие инструменты.

Подробнее про AST [тут](https://habr.com/ru/company/ruvds/blog/415269/)

<!-- v -->

### Prettier

<!-- v -->

[Работает с TS из-коробки](https://prettier.io/blog/2017/06/03/1.4.0.html)

[При необходимости можно задать парсер для Typescript](https://prettier.io/docs/en/options.html#parser)

<!-- v -->

### Eslint

<!-- v -->

[TSLint](https://palantir.github.io/tslint/) - An extensible linter for the TypeScript language.

TSLint has been deprecated as of 2019

<!-- v -->

Если запустить eslint в TS окружении, вроде ничего и не произойдет.

Потому что eslint по умолчанию проигнорирует ts файлы.

```bash
# Для проверки TS-файлов
npx eslint . --ext .js,.ts
```

<!-- v -->

После этого eslint начнет проверять Typescript файлы, но будет падать с ошибками, если вы используете указания типов.

Решение - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

<!-- v -->

Некоторые правила нужно подправить, потому что они дублируют/конфликтуют с Typescript

<!-- eslint-skip -->

```js
{
  "import/no-unresolved": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/1624
  "import/extensions": ["warn", "never"] // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
}
```

<!-- v -->

### Проверка работы с типами

<!-- v -->

На соответствие типам проверяется не отдельный файл, а весь проект. Для этого нужно попытаться собрать проект - если это прошло успешно, значит проверки прошли.

```bash
npx tsc --noEmit
```

Эта проверка становится частью `lint` скрипта.

<!-- v -->

### Jest

<!-- v -->

Jest уже обрабатывает наши файлы с помощью babel. Зачем?

<!-- v -->

Babel умеет обрабатывать и Typescript при помощи [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

```bash
npm install @babel/preset-typescript --save-dev
```

```
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};
```

<!-- v -->

### Webpack

<!-- v -->

Есть несколько вариантов интеграции

<!-- v -->

Первым делом нужно научить webpack смотреть на ts файлы, с помощью опции [`resolve.extensions`](https://webpack.js.org/configuration/resolve/#resolveextensions)

```js
// webpack.config.js
module.exports = {
  // ...
  resolve: {
    extensions: [".js", ".ts"],
  },
};
```

<!-- v -->

Дальше нужно научить webpack обрабатывать эти файлы

<!-- v -->

**Вариант 1**: [ts-loader](https://github.com/TypeStrong/ts-loader)

Описывается как [в документации webpack](https://webpack.js.org/guides/typescript/) так и [в документации Typescript](https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#webpack)

<!-- v -->

**Вариант 2**: [babel-loader](https://github.com/babel/babel-loader). Упоминается [в документации к Typescript](https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#babel) и его настройка также описана [в документации к webpack](https://webpack.js.org/loaders/babel-loader/#root) _(только помните про расширение файла)_.

<!-- v -->

Варианты дают немного разный результат ([1](http://evanlouie.github.io/posts/typescript-babel-preset-typescript-ts-loader), [2](https://blog.logrocket.com/choosing-between-babel-and-typescript-4ed1ad563e41/), [3](https://www.mattzeunert.com/2019/10/23/migrating-your-webpack-typescript-build-from-ts-loader-to-babel-loader.html)).

<!-- v -->

### Вопросы?

<!-- s -->

## Практика

<!-- v -->

### Вопросы?

<!-- s -->

### Домашнее задание

<!-- v -->

Необходимо

- создать новый репозиторий
- инициализировать его с файлом .gitignore
- создать новую ветку (чтобы можно было создать PR)
- настроить линтинг и actions, настроить автодеплой из PR
- сконфигурировать webpack
- добавить поддержку ts файлов
- добавить поддержку импорта css файлов
- реализовать приложение ["Игра Жизнь"](https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB) на языке Typescript
- ссылку на задеплоенную страницу и на пуллреквест сбросить в чат с преподавателем
- настроить jest и написать тесты на приложение

<!-- v -->

Игра должна поддерживать отображение нескольких независимых полей на странице (см пример)

Критерии оценки

- настроена поддержка typescript через babel - 5
- реализовано приложение "Игра Жизнь" - 5 баллов
- реализовано взаимодействие с полем (клик по ячейке меняет ее состояние) - 2
- реализован автостоп игры, когда все клетки умерли - 2
- реализован механизм изменения размеров поля (два input поля type=number), в т.ч. на лету (при увеличении заполнение мертвыми клетками, при уменьшении просто уничтожения ячеек) - 2
- реализован механизм изменения скорости игры (input type=range) - 2
- реализована подсветка клеток, которые являясь живыми должны умереть в следующем поколении (например мертвые - белый цвет, живые - черный, обреченные на смерть - синий) - 2

Принято от 16 баллов

Задание не принимается:

- без тестов
- без настроенного линтинга, хуков, деплоя приложения через github actions

<!-- v -->

### Вопросы?

<!-- s -->

### Опрос о занятии

<!-- s -->

Дополнительные материалы:

- [Введение в TypeScript](https://metanit.com/web/typescript/1.1.php)
- [Game of life in js](https://github.com/otus-js-student/js--game-of-life)
