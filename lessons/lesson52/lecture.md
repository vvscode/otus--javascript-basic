---
title: Занятие 52
description: Сферы применения Node.js, отличия от разработки в браузере
---

# OTUS

## Javascript Basic

<!-- s -->

## `Сферы применения Node.js, отличия от разработки в браузере`

<!-- v -->

### Маршрут вебинара

1. Что такое Node.js
1. Особенности Node.js
1. Пишем свой Node.js script
1. Библиотеки и фреймворки
1. Практика
1. Итоги

<!-- s -->

## `Что такое Node.js`

<!-- v -->

> [Node.js](https://nodejs.dev/learn) is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!

<!-- v -->

> Node.js runs the [V8 JavaScript engine](https://v8.dev/), the core of Google Chrome, outside of the browser. This allows Node.js to be very fast.

<!-- v -->

### `Преимущества Node.js`

<!-- v -->

#### [Isomorphic] `JavaScript`

<!-- v -->

#### [`Event Loop`](https://nodejs.dev/learn/the-nodejs-event-loop)

<!-- v -->

> \*A Node.js app runs in a single process, without creating a new thread for every request.

> [Non-blocking paradigms](https://blog.usejournal.com/everything-you-need-to-know-about-event-loop-in-javascript-1f14f94e5ab6). \*Blocking behavior the exception rather than the norm.

<!-- v -->

> When Node.js performs an I/O operation, like reading from the network, accessing a database or the file system, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.

> This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.

<!-- v -->

### `Установка Node.js`

<!-- v -->

https://nodejs.org/en/download/

<!-- v -->

[nvm](https://github.com/nvm-sh/nvm)

Для более 2-х версий Node.js

```sh
$ nvm list # list all locally installed versions
$ nvm install v12 # install node v12
$ nvm install v14 # install node v14
$ nvm use v12 # use node v12
```

<!-- v -->

#### [LTS](https://nodesource.com/blog/understanding-how-node-js-release-lines-work/#:~:text=LTS%3A%20LTS%20is%20an%20acronym,an%20extended%20period%20of%20time.) `versions`

Long term support

<!-- v -->

Вопросы?

<!-- s -->

### `Особенности Node.js`

<!-- v -->

#### [`CommonJS`](https://www.sitepoint.com/understanding-es6-modules/) `module system`

<!-- v -->

```js
// ES6 modules

/* main.js */
console.log("running main.js");
import secondary from "./secondary.js"; //👈

/* secondary.js */
console.log("running secondary.js");
```

```txt
running secondary.js
running main.js
```

<!-- v -->

```js
// CommonJS modules

/* main.js */
console.log("running main.js");
const secondary = require("./secondary.js"); //👈

/* secondary.js */
console.log("running secondary.js");
```

```txt
running main.js
running secondary.js
```

<!-- v -->

> ES6 modules are pre-parsed in order to resolve further imports before code is executed.

> CommonJS modules load dependencies on demand while executing the code.

<!-- v -->

Появилась поддержка ES6 Node.js >= "v13"

```js
// ES6 modules for Node.js

/* main.js */
console.log("running main.js");
import secondary from "./secondary.js";

/* secondary.mjs */ //👈
console.log("running secondary.js");
```

<!-- v -->

\*Можно использовать babel/webpack

<!-- v -->

#### `Access to the machine environment`

<!-- v -->

[Built-in modules](https://www.w3schools.com/nodejs/ref_modules.asp)

```js
require("module").builtinModules;
/*
[
  '_http_agent',       '_http_client',        '_http_common',
  '_http_incoming',    '_http_outgoing',      '_http_server',
  '_stream_duplex',    '_stream_passthrough', '_stream_readable',
  '_stream_transform', '_stream_wrap',        '_stream_writable',
  '_tls_common',       '_tls_wrap',           'assert',
  'async_hooks',       'buffer',              'child_process',
  'cluster',           'console',             'constants',
  'crypto',            'dgram',               'dns',
  'domain',            'events',              'fs',
  'http',              'http2',               'https',
  'inspector',         'module',              'net',
  'os',                'path',                'perf_hooks',
  'process',           'punycode',            'querystring',
  'readline',          'repl',                'stream',
  'string_decoder',    'sys',                 'timers',
  'tls',               'trace_events',        'tty',
  'url',               'util',                'v8',
  'vm',                'worker_threads',      'zlib'
]
*/
```

<!-- v -->

#### `No browser API`

```js
console.log(document); // undefined
console.log(window); // undefined
```

<!-- v -->

Вопросы?

<!-- s -->

### `Пишем свой Node.js script`

<!-- v -->

IDE/Environment

- Locally
- [Online](https://www.katacoda.com/courses/nodejs/playground)

<!-- v -->

**1. Create a simple program to list all files in a given directory**

<!-- v -->

**2. Debugging**

<!-- v -->

[node --inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/)

```txt
$ node --inspect index.js

Debugger listening on ws://127.0.0.1:9229/a8225776-a251-4497-bb0d-abbb4c5b61f0
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
started
```

<!-- v -->

[chrome://inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-devtools-55-microsoft-edge)

<!-- v -->

[VS Code](https://nodejs.org/en/docs/guides/debugging-getting-started/#visual-studio-code-1-10)

<!-- v -->

[Other IDEs...](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients)

<!-- v -->

CLI Debugger [node-inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/#node-inspect)

```js
// index.js
const START_MSG = "started";
const END_MSG = "ended";

console.log(START_MSG);

debugger; //👈

console.log(END_MSG);
```

```txt
$ node inspect index.js

< Debugger listening on ws://127.0.0.1:9229/f8a47ad6-097b-4c93-bca1-0c53964f51c2
< For help, see: https://nodejs.org/en/docs/inspector
Break on start in index.js:1
debug>
```

<!-- v -->

#### 3. [`Nodemon`](https://github.com/remy/nodemon) `for auto-restarting`

<!-- v -->

Вопросы?

<!-- s -->

### `Библиотеки и фреймворки`

<!-- v -->

[**NPM**](https://www.npmjs.com/)

\*Без использования browser API

<!-- v -->

**Web server libraries**

- https://expressjs.com
- https://koajs.com
- https://nestjs.com
- https://nodejs.dev/learn#nodejs-frameworks-and-tools
- ...

<!-- v -->

**Working with databases**

- https://expressjs.com/en/guide/database-integration.html
- https://www.prisma.io/dataguide/database-tools/top-nodejs-orms-query-builders-and-database-libraries

<!-- v -->

**Command line helper libraries**

- https://github.com/SBoudrias/Inquirer.js/
- https://github.com/tj/commander.js#readme
- https://github.com/yargs/yargs
- https://github.com/terkelg/prompts
- https://dev.to/yvonnickfrin/7-libraries-to-build-node-js-cli-3jc7
- ...

<!-- s -->

### [`Практика`]()

<!-- v -->

1. Простая версия команды "ls"

```sh
# USAGE
$ node ls.js ./ '.+js$'

```

```js
/* HINTs */

// Get arguments passed
process.argv; // ['node', 'ls.js', '.', '.+js$']

// Get list of files & dirs
const fs = require("fs");
fs.readdir(directory, (err, files) => {});
```

<!-- v -->

2. Простой сервер для получения

текущей даты и времени по тайм зоне

```js
/*
 * Example: http://localhost:8080
 * Example: http://localhost:8080?timezone=Asia/Jakarta
 * Example: http://localhost:8080?timezone=America/New_York
 */
```

```js
// server.js template
const http = require("http");

// Create a server object
const server = http.createServer((req, res) => {
  req.url; // get request url
  res.write("Hello World!!!"); // Write a response to the client
  res.end(); // End the response
});

server.listen(8080);
```

```js
/* HINTs */
require("url").parse; // for parsing req.url
new Date().toLocaleString("en-US", { timeZone });
```

<!-- v -->

Вопросы?

<!-- v -->

Вопросы?

<!-- s -->

### `Итоги`

<!-- v -->

- CommonJS: "require"
- No browser API
- Access to machine environment
- Development: "debugger", "nodemon"

<!-- v -->

Вопросы?

<!-- s -->

### `Дополнительные материалы`

- https://nodejs.dev/learn
- https://nodejs.org/en/docs/guides/getting-started-guide/
- https://github.com/goldbergyoni/nodebestpractices#readme
- https://www.w3schools.com/nodejs/
- https://www.tutorialsteacher.com/nodejs/nodejs-tutorials

<!-- s -->

https://otus.ru/polls/20381
