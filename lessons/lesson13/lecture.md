---
title: Занятие 13
description: Инструменты разработки. Тестирование верстки
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!-- s -->

## Инструменты разработки. Тестирование верстки

<!-- s -->

**Задача:** просматривать сайт, который вы разрабатываете в браузере. Можно открыть файл просто с диска, но [лучше использовать http сервер](https://webmasters.stackexchange.com/questions/124869/what-are-the-benefits-of-utilizing-a-web-server-vs-opening-an-html-file-directly).

<!-- v -->

Самый простой вариант:

```bash
npx node-static .
```

Если это будет использоваться в проекте - лучше все же добавить `node-static` в зависимости проекта.

<!-- v -->

Вариант которым будем пользоваться на курсе - [webpack dev server](https://webpack.js.org/configuration/dev-server/) (который вы уже настраивали в прошлой домашней работе).

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** научить наш webpack работать с файлами стилей (чтобы получать немедленное обновление в браузере, возможность сборки и подготовки стилей и т.д.).

<!-- v -->

**Решение:** [style-loader](https://webpack.js.org/loaders/style-loader/#root)

<!-- v -->

```bash
npm i -D style-loader css-loader
```

```js
// webpack.config.js
module: {
  rules: [
    {
      // https://webpack.js.org/loaders/css-loader/
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
  ];
}
```

и

```js
// in your js file
import "./css/styles.css";
```

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** иметь файл для редактирования html разметки (чтобы было, где заниматься версткой).

<!-- v -->

**Решение:** настроить [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/#root), используя параметр [template](https://github.com/jantimon/html-webpack-plugin#options).

<!-- v -->

```js
// webpack.config.js
plugins: [
  new HtmlWebpackPlugin({
    template: "public/index.html",
  }),
];
```

<!-- v -->

**Задача:** иметь несколько файлов, в которых можно работать с версткой (работа с многостраничным сайтом)

**Решения:**

- использование шаблонизаторов (например [handlebars](https://www.npmjs.com/package/handlebars-webpack-plugin), [pug](https://www.npmjs.com/package/html-webpack-pug-plugin) и т.п.)
- настройка [множественных шаблонов](https://github.com/vvscode/env-setup/pull/7/commits/6d77229161e76b1e5c1033e7b5cab9f0e438cc6c)

<!-- v -->

**Задача:** избавиться от дублирования кода в разметке (общие элементы вроде шапки, подвала)

**Решения:**

- использование шаблонизаторов (например [handlebars](https://www.npmjs.com/package/handlebars-webpack-plugin), [pug](https://www.npmjs.com/package/html-webpack-pug-plugin) и т.п.)
- настройка [html-loader](https://webpack.js.org/loaders/html-loader/) (пример настройки можно посмотреть [здесь](https://github.com/jantimon/html-webpack-plugin/tree/main/examples/custom-template))

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** держать css код атомарным, контролировать последовательность подключения правил.

<!-- v -->

**Решение:** разбиваем код на несколько файлов и задаем единую точку входа для стилей (`index.css` например), которая контролирует порядок подключения

<!-- v -->

```css
/* index.css */
@import "./sanitize.css";
@import "./html5doctor.css";

@import "./styles.css";

@import "./media.css";
```

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** Упростить проверку сайта в разных браузерах, или на разных разрешениях экрана.

<!-- v -->

**Решение:** Использовать инструмент [browser-sync](https://browsersync.io/) (или подобный).

Для простоты настройки с webpack мы можем взять [`browser-sync-webpack-plugin`](https://www.npmjs.com/package/browser-sync-webpack-plugin).

<!-- v -->

```bash
npm i -D browser-sync browser-sync-webpack-plugin
```

```js
// webpack.config.js
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
// ...

// https://www.npmjs.com/package/browser-sync-webpack-plugin
new BrowserSyncPlugin(
  {
    // browse to http://localhost:3000/ during development
    host: "localhost",
    port: 3000,
    // proxy the Webpack Dev Server endpoint
    // (which should be serving on http://localhost:3100/)
    // through BrowserSync
    proxy: "http://localhost:9000/",
  },
  // plugin options
  {
    // prevent BrowserSync from reloading the page
    // and let Webpack Dev Server take care of this
    reload: false,
  }
);
```

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** уменьшить число ошибок, связанных со стилями, унифицировать код.

<!-- v -->

**Решение:** [stylelint](https://stylelint.io/). Так же как и eslint может быть настроен и улучшен с помощью [конфигураций и плагинов](https://github.com/stylelint/awesome-stylelint).

<!-- v -->

```bash
npm i -D stylelint stylelint-config-standard
```

после чего создать файл конфигурации

<!-- eslint-skip -->

```js
// .stylelintrc.json
{
  "extends": "stylelint-config-standard"
}
```

и [обновить хуки и скрипты](https://github.com/vvscode/otus-js--module-2/pull/2/commits/d4903cc1a157349629b89ecfb78f861b1732eb87) (для проверки и исправления кода перед коммитом, для проверки кода на CI).

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** упростить проверку верстки, поиск и устранение проблем при изменении кода (что-то поправил и поломалось).

<!-- v -->

**Решение:** писать тесты. Для интерфейса почти нет смысла тестировать разметку или наличие конкретных css правил (потому что один и тот же результат можно достичь разными способами), но [можно контролировать результат](https://medium.com/@lucyhackwrench/%D0%BA%D0%B0%D0%BA-%D0%B8-%D0%B7%D0%B0%D1%87%D0%B5%D0%BC-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%B2%D0%B5%D1%80%D1%81%D1%82%D0%BA%D1%83-84a378bf7bb4).

Раз мы для тестирования используем `jest`, хорошо бы иметь что-то для этого инструмента.

Варианты:

- [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)
- [puppeteer-screenshot-tester](https://github.com/burnpiro/puppeteer-screenshot-tester)

<!-- v -->

```bash
npm i -D puppeteer jest-image-snapshot
```

и настроить тест

<!-- v -->

```js [1-50]
import puppeteer from "puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

describe("styles.test", () => {
  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterEach(() => (jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout));
  [
    { width: 1920, height: 1080 },
    { width: 600, height: 1080 },
  ].forEach(({ width, height }) =>
    it(`should have proper view for ${width}x${height} params`, async () => {
      // setting up puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // set current view port size
      await page.setViewport({ width, height });
      // navigate to the page, served with webpack
      // IMPORTANT!: test assumes webpack is started
      await page.goto("http://localhost:9000", { waitUntil: "networkidle0" });

      const image = await page.screenshot();
      await browser.close();

      expect(image).toMatchImageSnapshot();
    })
  );
});
```

<!-- v -->

**Важно!** для работы такого теста у вас должен быть запущен http сервер (webpack).

После запуска тестов у вас появятся скриншоты в специальной папке.

Если тест упадет - вы получите файл с выделением различий между текущим и ожидаемым результатом.

Для обновления результата используйте ключ `--updateSnapshot/-u`, который обновит ваши эталонные файлы

<!-- v -->

### Вопросы?

<!-- v -->

Пара моментов про CI:

<!-- v -->

нам нужно иметь запущенный webpack для запуска UI тестов. Поэтому обновляем шаг запуска тестов

```yaml [1-10]
- name: Tests check
  run: |
    # https://www.maketecheasier.com/run-bash-commands-background-linux/
    npm start &>/dev/null &

    npm run test
```

<!-- v -->

Сейчас тесты используют браузер, который запускается в системном окружении. Так что внешний вид сайтов [может отличаться](https://www.quora.com/Why-do-fonts-look-different-in-different-computers).

Это может вызвать проблемы при запуски визуальных тестах на разных машинах.

<!-- v -->

Чтобы иметь возможность видеть причину ошибки, полезно добавить в файл workflow следующий шаг

```yaml [1-20]
- name: Archive artifacts for style tests
  uses: actions/upload-artifact@v2
  if: ${{ failure() }}
  with:
    name: styles-tests-artifacts
    path: |
      put_your_style_tests_directory_name
```

<!-- v -->

Решения 2:

- использовать "не четкое" сравнение (с погрешностью)
- использовать виртуальные машины (docker) для запуска таких тестов

<!-- v -->

Первый вариант реализовать достаточно просто. Если тесты запускаются на CI (те у нас есть переменная окружения, которая предоставляет этот флаг), мы можем задать настройки точности сравнения.

```js [1-30]
expect(image).toMatchImageSnapshot(
  process.env.CI
    ? {
        failureThreshold: 0.01,
        failureThresholdType: "percent",
      }
    : undefined
);
```

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** сейчас все наши стили подключаются через javascript. Хорошо бы иметь отдельный css файлик (для удобства и оптимизации загрузки).

<!-- v -->

**Решение:** [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)

<!-- v -->

```bash
npm install -D mini-css-extract-plugin
```

и

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ...
  plugins: [
    // ...
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/css-loader/
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

после этого наши стили будут подключаться с помощью `*.css` файлов.

<!-- v -->

### Вопросы?

<!-- s -->

**Задача:** дополнительная обработка CSS (и не только) для

- минификации
- [авто префиксов](https://habr.com/ru/company/evilmartians/blog/176909/)
- [других улучшений](https://habr.com/ru/post/265449/)

Фактически аналог того, что нам в Javascript позволяет делать Babel. Да, есть LESS, SASS и т.п., но это по факту другие языки.

<!-- v -->

**Решение:** использование [PostCSS](https://postcss.org/) и (для связки с webpack)[postcss-loader](https://webpack.js.org/loaders/postcss-loader/).

<!-- v -->

```bash
npm i -D postcss-loader postcss-preset-env postcss-import
```

и посмотрим это на примере [`cssnano`](http://cssnano.co)

```bash
npm i -D cssnano
```

<!-- v -->

а в конфигурации укажем

```js
// postcss.config.js
module.exports = {
  plugins: {
    // https://github.com/webpack-contrib/postcss-loader/blob/v3.0.0/README.md#configuration
    "postcss-import": {},
    "postcss-preset-env": {},
    cssnano: {},
  },
};
```

и

<!-- eslint-skip -->

```js
// webpack.config.js
    {
      // https://webpack.js.org/loaders/css-loader/
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
    },
```

<!-- v -->

### Вопросы?

<!-- s -->

Дополнительные материалы:

- [Пример настройки инструментов](https://github.com/vvscode/otus-js--module-2/pull/2)
- [Линтинг CSS с помощью stylelint](https://habr.com/ru/post/301594/)
- [Современный CSS для динозавров](https://habr.com/ru/post/348500/)
- [Модульный CSS: — Инструментарий, который мы имеем сейчас в арсенале — это просто сказка](https://habr.com/ru/company/jugru/blog/316308/)
