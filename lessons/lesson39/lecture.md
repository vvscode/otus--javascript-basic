---
title: Занятие 37
description: Клиентский роутинг, как строится одностраничное приложение
---

# OTUS

## Javascript Basic

<!-- v -->

## Клиентский роутинг

Как строится одностраничное приложение (SPA)

<!-- v -->

### Проверка

- Хорошо ли видно и слышно?
- Проверить идёт ли запись

<!-- s -->

## Клиентский роутинг

Как строится одностраничное приложение (SPA)

<!-- v -->

### Цели занятия

- Разобраться какие API можно использовать для организации SPA

- Научиться создавать клиентский роутинг

<!-- v -->

### Маршрут вебинара

- Введение
- Hash API
- History API
- Router
- Практика
- Итоги

<!-- s -->

## Введение

<!-- v -->

**Что такое URL**

<!-- v -->

> Единый указатель ресурса (англ. [**Uniform Resource Locator**](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL), URL) — единообразный локатор (определитель местонахождения) ресурса.

> Ранее назывался Universal Resource Locator — универсальный указатель ресурса. URL служит стандартизированным способом записи **адреса ресурса в сети Интернет**.

<!-- v -->

```
scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
```

```
https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#anchor
```

<!-- v -->

[**Что происходит, когда вы вводите URL в браузере**](http://wsvincent.com/what-happens-when-url/)

<!-- v -->

**Что такое клиентский роутинг**

<!-- v -->

> Клиентский роутинг (**client-side routing**) это, когда пользователь перемещается по приложению/веб-сайту, и при этом **не происходит полной перезагрузки страницы**, даже если URL-адрес страницы изменяется. Вместо этого **используется JavaScript для обновления URL-адреса**, а также для извлечения и отображения нового содержимого.

<!-- v -->

**Способы управления URL на клиенте**

<!-- v -->

- Hash API
- History API

<!-- s -->

## `Hash API`

<!-- v -->

\*Старый способ. До появления HTML5.

<!-- v -->

> Способ управления состояниям фрагмента URL

```
scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
```

<!-- v -->

- window.location.hash
- `window.onhashchange` / `"hashchange"` event

<!-- v -->

[Пример](https://codesandbox.io/s/vigorous-black-vzbit?file=/index.html)

```js
document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target.getAttribute("href");
  location.hash = url; // <= set only hash or URL
});

window.addEventListener("hashchange", () => {
  // <= handle/catch hash changes
  console.log(`hashchange: ${location.hash}`);
});
```

<!-- s -->

## `History API`

<!-- v -->

[Новое API](https://caniuse.com/?search=history) HTML5

<!-- v -->

> [**History API**](https://developer.mozilla.org/en-US/docs/Web/API/History_API) опирается на один DOM интерфейс — объект **History**

> Каждая вкладка браузера имеет уникальный объект History, который находится в `window.history`

<!-- v -->

> [**History**](https://developer.mozilla.org/en-US/docs/Web/API/History) имеет несколько методов, событий и свойств, которыми мы можем **управлять из JavaScript**.

<!-- v -->

<!-- eslint-skip -->

```js
/* Количество записей в текущей сессии истории */
window.history.length

/* Возвращает текущий объект состояния истории */
window.history.state

/* Метод, позволяющий гулять по истории.
 * В качестве аргумента передается смещение, относительно текущей позиции.
 * Если передан 0, то будет обновлена текущая страница.
 * Если индекс выходит за пределы истории, то ничего не произойдет. */
window.history.go(n)

/* Метод, идентичный вызову go(-1) */
window.history.back()

/* Метод, идентичный вызову go(1) */
window.history.forward()

/* Добавляет элемент истории */
window.history.pushState(data, title [, url])

/* Обновляет текущий элемент истории */
window.history.replaceState(data, title [, url])
```

<!-- v -->

```js
/* Триггерится при `history.go/back/forward` или при браузерных кликах */
window.addEventListener("popstate", (event) => console.log(event.state));
```

<!-- v -->

[Пример](https://codesandbox.io/s/vigorous-black-vzbit?file=/index.html)

```js
document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target.getAttribute("href");
  history.pushState({}, url, url); // <--
});

/* Триггерится при `history.go/back/forward` или при браузерных кликах */
window.addEventListener("popstate", (event) => {
  console.log(
    "location: " + document.location + ", state: " + JSON.stringify(event.state)
  );
});
```

<!-- v -->

> \*Нужна настройка сервера, т.к. при обновлении / передаче ссылки должна загрузиться начальная страница

<!-- s -->

## `Router`

<!-- v -->

> Обработчик URL - называется роутером (**Router**)

> Router определяет какой код должен выполняться в зависимости от адреса.
> Логика `router`'а может быть завязана на параметры.

<!-- v -->

\*Бывает серверный и **браузерный** роутинг/роутер.

<!-- v -->

\*Router **не встроенные API**, а скорее общепринятый термин.

<!-- v -->

Очень много готовых библиотек/статей:

- [Pilot: многофункциональный JavaScript роутер](https://habrahabr.ru/company/mailru/blog/172333/)
- [Роутер на JavaScript](http://blog.byndyu.ru/2009/09/javascript.html)
- [A modern JavaScript router in 100 lines](http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url)
- [A simple minimalistic JavaScript router with a fallback for older browsers.](https://github.com/krasimir/navigo)
- [router.js](https://github.com/tildeio/router.js/)

<!-- v -->

Example. Simple Route Interface

```sh
# Interface of Route
IRoute {
  match     # String | RegExp | function
  onEnter([data])   # function
}
```

```js
// Example
const route = {
  match: "/",
  onEnter: () => console.log("onEnter index"),
};
```

<!-- v -->

Example. Advanced Route Interface

```sh
# Interface of Route
IRoute {
  match     # String | RegExp | function
  onEnter([data])   # function
  onLeave([data])   # function
  onBeforeEnter([data])     # function
}
```

```js
// Example
const route = {
  match: "/",
  onEnter: () => console.log("onEnter index"),
  onLeave: () => console.log("onLeave index"),
};
```

<!-- v -->

Example. Router Interface 1

```sh
# Interface of Route
IRouter {
  add(route)    # function
  remove(route) # function
  go(url, [param])  # function
}
```

<!-- v -->

Example. Router Interface 2

```sh
# Interface of Route
IRouter {
  on(match, onEnter)     # function
  go(url, [params])  # function
}
```

<!-- v -->

[Пример](https://codesandbox.io/s/vigorous-black-vzbit?file=/index.html)

<!-- s -->

## Практика

<!-- v -->

To-do:

1. Fork sandbox
1. Implement unsubscribe/remove functionality
1. Add support for "onLeave" callback

```sh
# Interface of Route
IRouter {
  on(match, onEnter, [onLeave])     # function -> function
  go(url, [params])  # function
}
```

<!-- v -->

[codesandbox](https://codesandbox.io/s/vigorous-black-vzbit?file=/examples/practice.js)

<!-- s -->

## Итоги

> 1. **Клиентский роутинг** - навигацию по приложению/веб-сайту без **перезагрузки страницы**

> 2. Способы управления URL на клиенте:  
>    (old) **Hash API** и (new) **History API**

> 3. **Router** (термин)- обработчик URL, определяет какой код должен выполняться в зависимости от адреса. **\*Не встроённое API**

<!-- s -->

### Вопросы?

<!-- s -->

## Спасибо за внимание!

[Ссылка на опрос]()

<!-- s -->

### Ссылки

- [Understanding client side routing by implementing a router in Vanilla JS](https://www.willtaylor.blog/client-side-routing-in-vanilla-js/#:~:text=What%20is%20client%20side%20routing,fetch%20and%20display%20new%20content.)
