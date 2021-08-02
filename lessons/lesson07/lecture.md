---
title: Занятие 7
description: Код как «проект» - артефакты работы разработчика. Зависимости и утилиты в стеке JavaScript
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!-- v -->

Домашнее задание:

- создать репозиторий на гитхабе
- инициировать проект в репозитории
- решить предложенные задачи (разместив код и тесты в директории `src`)
- покрыть решение задач автоматическими тестами
- сделать коммит (а лучше несколько - по одному на задание)
- открыть пуллреквест
- прислать ссылку на пуллревест в чат с преподавателем"

<!-- v -->

Критерии оценки:

- создан репозиторий на гитхабе - 1
- создан npm-проект - 1
- Решены задания - 4
- Задания покрыты тестами - 4
- Сделан пуллреквест - 2
- Настроен хаски и линтеры - 1
- Настроен прогон тестов и линтеров на CI (и это видно в пуллреквесте) - 2

Задание считается принятым при 13 баллах

<!-- s -->

## Код как «проект» - артефакты работы разработчика.

### Зависимости и утилиты в стеке JavaScript

<!-- v -->

В "проект" входит не только исходный код Javascript файлов, но и многое другое:

- список зависимостей (и используемых инструментов)
- документация
- тесты
- настройки инфраструктуры и сборки
- ресурсы

и т.п.

Даже история git является частью проекта.

<!-- v -->

Проблема: большое число инструментов, которые используются при работе. И все нужно устанавливать вручную (а еще следить за версиями и обновлениями).

<!-- v -->

Решение: использование пакетных менеджеров

- apt
- winget
- pip
- maven

и т.п.

<!-- v -->

В мире JavaScript инструменты принято писать на Javascript (или заворачивать в него).

Среда выполнения для таких инструментов - [Node.js](https://nodejs.org/).

Пакетный менеджер - [npm](https://www.npmjs.com/) ( [yarn](https://yarnpkg.com/) )

<!-- v -->

Для описания зависимостей (и дополнительной информации) служит файл [`package.json`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json). Его основные поля:

- name
- description / keywords / author
- scripts
- dependencies / devDependencies / optionalDependencies / peerDependencies
- homepage / bugs / repository
- bin / files / main

некоторые пакеты могут держать свои настройки или в отдельных файлах, или как часть файла `package.json`

<!-- v -->

**Оговорка про команды и файлы** - все изменения в проекте отображаются на файлах, вносить эти изменения можно как с помощью команд, так и с помощью обычного редактора.

**Но** это не отменяет установку новых зависимостей.

<!-- v -->

Для инициализации проекта (пакета) служит команда

```bash
npm init

# а если без вопросов
npm init -y
```

<!-- v -->

Для установки пакетов из проекта используется команда

```bash
npm install
# или
npm i
```

<!-- v -->

Разделение зависимостей на `dev` / обычные условное. Но про него важно помнить потому что:

- оно влияет на установку пакетов
- оно влияет на безопасность

<!-- v -->

Пакеты устанавливаются при помощи команды [`npm install`](https://docs.npmjs.com/cli/v6/commands/npm-install)

```bash
# Обычная зависимость
npm install lodash

# Dev зависимость
npm install prettier --save-dev
npm install eslint -D

# Пакеты можно ставить глобально (но я это делать не советую)
npm i node-static -g
```

<!-- v -->

При установке обновляются файлы `package.json` и `package-lock.json`.

Пакеты попадают в директорию `node_modules` (эту директорию обязательно заносим в `.gitignore`).

Утилиты командной строки появляются в `node_modules/.bin/`

<!-- v -->

Запуск команд с npm:

- Команды самого npm: `npm install`
- Команды `npx`: запускает локальные команды или скачивает пакеты и запускает команды из них
- [Lifecycle scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts#life-cycle-scripts): `npm test`, `npm start`
- [Package scripts](https://docs.npmjs.com/cli/v7/commands/npm-run-script): то, что описано в секции `scripts` (npx в таких скриптах не нужен)

<!-- v -->

Типичные задачи, которые решаются при помощи команд:

- сборка
- деплой
- запуск тестов
- запуск линтеров
- публикация новой версии
- генерация документации или ресурсов

Список скриптов можно увидеть с помощью `npm run`

<!-- v -->

## Вопросы?

<!-- s -->

## Jest

### Запуск тестов

<!-- v -->

Задача - получить возможность запускать тесты локально.

<!-- v -->

[Установка jest](https://jestjs.io/docs/ru/getting-started):

```bash
npm install jest @types/jest -D
```

<!-- v -->

Для инициализации jest выполняется команда:

```bash
npx jest --init
```

Для настроек Jest выберите следующую конфигурацию

```bash
✔ Would you like to use Typescript for the configuration file? … no
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
✔ Do you want Jest to add coverage reports? … no
✔ Which provider should be used to instrument code for coverage? › v8
✔ Automatically clear mock calls and instances between every test? … yes
```

<!-- v -->

Для запуска тестов используется команда `npx jest`, которая обычно вешается на скрипт `test` (`npm test`).

<!-- v -->

### Jest и ES6 модули

Jest работает из Node.js, где принят стандарт `commonjs` модулей. Для работы с ES6 модулями

- [либо поддержка на уровне node.js](https://jestjs.io/docs/en/ecmascript-modules)
- [babel-jest](https://jestjs.io/docs/ru/getting-started#%D1%81-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%D0%BC-babel)

<!-- v -->

## Вопросы?

<!-- s -->

## ESLint

### Поиск ошибок в коде

<!-- v -->

- [Держи свой код чистым с помощью ESLint](https://frontend-stuff.com/blog/eslint/)
- [ESLint. Знакомство](https://medium.com/@catwithapple/eslint-%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC%D1%81%D1%82%D0%B2%D0%BE-69ffc19edbf8)
- [Программируем лучше с ESLint, Prettier](https://tproger.ru/translations/setting-up-eslint-and-prettier/)

<!-- v -->

[Установка ESLint](https://eslint.org/docs/user-guide/getting-started):

```bash
npm i eslint -D
npx eslint --init
```

<!-- v -->

Для запуска проверки используется

```bash
npx eslint file.js
npx eslint .

# для исправления ошибок
npx eslint file.js --fix
```

<!-- v -->

Обычно эти команды вешают на скрипты `lint` / `lint:fix`.

```js
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
```

<!-- v -->

ESLint и Jest - т.к. в тестах используются глобальные переменные (вроде `describe`, `it`, `expect`, `jest` и т.п.), нужно сказать ESLint что это нормально. Например с помощью [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest).

В общем случае - запрос в гугл ["eslint jest"](https://www.google.com/search?q=eslint+jest)

<!-- v -->

## Вопросы?

<!-- s -->

## Prettier

<!-- v -->

Проблема - ESLint очень (слишком) гибкий инструмент, который позволяет настроить codestyle очень по-разному.

Задача - сделать унификацию стиля кода.

<!-- v -->

[Установка prettier](https://prettier.io/docs/en/install.html):

```bash
npm i prettier -D
```

И сразу (т.к. область его задач пересекается с eslint), [проверяем как их интегрировать](https://prettier.io/docs/en/integrating-with-linters.html).

<!-- v -->

Ставим [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)

```bash
npm i eslint-config-prettier -D
```

> Then, add eslint-config-prettier to the "extends" array in your .eslintrc.\* file. **Make sure to put it last**, so it gets the chance to override other configs.

> Добавить `eslint-config-prettier` в список секции "extends" вашего файла настроек eslint. **Убедитесь, что добавляете его последним**, чтобы он мог переписывать значения из других конфигураций.

<!-- v -->

Заодно хорошо бы добавить его в секцию скриптов (в задачи `lint` / `lint:fix`)

```js
    "lint": "prettier --check . && eslint .",
    "lint:fix": "prettier --write . && eslint . --fix",
```

<!-- v -->

## Вопросы?

<!-- s -->

## Lint-Staged

<!-- v -->

Проблема - разработчики могут забывать запускать форматирование (а заодно и проверку кода), либо использовать для этого свой редактор (с настройками отличными от настроек команды).

Задача - сделать так, чтобы форматирование применялось к коду автоматически.

<!-- v -->

В прошлый раз мы обсуждали как можно организовывать автоматизацию, с помощью git.

Какой инструмент git может выполнять задачи по триггерам (в том числе [при коммите](https://github.com/git/git/blob/master/templates/hooks--pre-commit.sample))?

<!-- v -->

Инструмент, призванный сделать работу с хуками более удобной - [`husky`](https://github.com/typicode/husky/tree/master)

```
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```

<!-- v -->

Но это только помогает, но не решает задачу.

Для решения создан пакет [`lint-staged`](https://github.com/okonet/lint-staged)

> Run linters against staged git files and don't let 💩 slip into your code base!

<!-- v -->

Ставится командой

```bash
npx mrm lint-staged
```

<!-- v -->

[mrm](https://github.com/sapegin/mrm) - это просто вспомогательный инструмент, который делает все удобнее, но ни разу не обязательный для использования.

К слову им же можно поставить [eslint](https://mrm.js.org/docs/mrm-task-eslint), [prettier](https://mrm.js.org/docs/mrm-task-prettier) и [другие радости разработки](https://mrm.js.org/docs/mrm-task-codecov)

<!-- v -->

После установки нужно проверить секции `husky` и `lint-staged` в файле `package.json` (для `husky@4`)

```js
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*.{css,md,yml,html}": "prettier --write"
```

<!-- v -->

Для `husky@7` [настройки задаются не через `package.json`, а через директорию `.husky`](https://typicode.github.io/husky/#/?id=migrate-from-v4-to-v7)

```bash
# .husky/pre-commit (v7)
lint-staged
```

<!-- v -->

## Вопросы?

<!-- s -->

## Sanity check

<!-- v -->

Проблема - иногда разработчики пропускают запуск тестов / линтеров локально (или специально обходят такие проверки).

Задача - не дать такому коду попасть в основную ветку, независимо от проверок на стороне разработчика.

<!-- v -->

Решение?

<!-- v -->

Мы можем взять типовой [workflow](https://github.com/otus-js-student/js--game-of-life/blob/master/.github/workflows/sanity-check.yml) для такой проверки. И сделать прохождение такой проверки обязательным на уровне репозитория.

- [About required status checks](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/about-required-status-checks)
- [Enabling required status checks](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/enabling-required-status-checks)

<!-- v -->

## Вопросы?

<!-- s -->

Опрос о занятии

<!-- s -->

Дополнительные материалы:

- [Распутываем спагетти-код: как писать поддерживаемый JavaScript](http://prgssr.ru/development/rasputyvaem-spagetti-kod-kak-pisat-podderzhivaemyj-javascript.html)
- [Детальный список инструментов для JavaScript](https://vc.ru/dev/172374-detalnyy-spisok-instrumentov-dlya-javascript)
- [CI/CD для фронтенда: обзор инструментов и практик для автоматизации разработки](https://dou.ua/lenta/articles/ci-cd-for-frontend/)
- [Советы по созданию проектов](https://github.com/elsewhencode/project-guidelines/blob/master/README-ru.md)
