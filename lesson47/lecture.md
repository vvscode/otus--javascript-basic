---
title: Занятие 47
description: React Router
---

# OTUS

## Javascript Basic

<!-- v -->

Вопросы?

<!-- s -->

### history (библиотека)

<!-- v -->

```bash
npm i history
```

<!-- v -->

```js [1-100]
import { createBrowserHistory } from "history";
// еще есть createHashHistory и createMemoryHistory

const history = createBrowserHistory();

// читаем
const location = history.location;

// Подписываемся
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
});

// API — совместимый с HTML5 History
history.push("/home", { some: "state" });

// отписаться
unlisten();
```

<!--v-->

## Вопросы?

<!--s-->

### [React-router](https://reactrouter.com/)

<!--v-->

### React-router: что это?

- **React-router** — библиотека для клиентского роутинга в реакт-приложениях:
  - Подписываться на изменения URL и обновлять приложение
  - “Виртуальные” ссылки
  - Парсит пути, достает параметры
- Будем смотреть на react-router v5
- Философия — описание роутов в виде компонентов

<!--v-->

```js [1-100]
import { BrowserRouter, Route } from ‘react-router-dom’;

// BrowserRouter создает объект history и прокидывает
// его вниз
// Можно также HashRouter / MemoryRouter
const App = () => (
  <BrowserRouter>
    { /* Route просто описывает пути */ }
    <Route exact path="/" component={Home} />
    { /* Вместо component можно render */ }
    <Route exact path=“/news" render={() => <News />} />
    <Route path=“/category” component={Category} />
  </BrowserRouter>
);
// как называется паттерн в Route?)
// зачем нужен exact?
```

<!--v-->

### Вложенные Route

```js [1-100]
import {
  BrowserRouter, Route, Switch
} from ‘react-router-dom’;

// также обратите внимание на Switch
const Category = () => (
  <Switch>
    <Route exact path=“/“ component={ CatList } />
    <Route exact path=“/:catid“ component={ CatPage } />
  </Switch>
);

const App = () => (
  <BrowserRouter>
    { /* Route просто описывает пути */ }
    <Route exact path="/" component={Home} />
    { /* Вместо component можно render */ }
    <Route exact path=“/news" render={() => <News />} />
    <Route path=“/category” component={Category} />
  </BrowserRouter>
);
```

<!--v-->

### Route с параметрами

```js [1-100]
const CatPage = ({ match }) => (
  <h1>Viewing category { match.params.catid }</h1>
);

const Category = () => (
  <Switch>
    <Route exact path=“/“ component={ CatList } />
    <Route exact path=“/:catid“ component={ CatPage } />
  </Switch>
);
```

<!--v-->

### Действия при входе

```js [1-100]
class CatPage extends Component {
  // используем лайфсайкл-хук
  componentDidMount() {
    get(`/goods/${ this.props.catid }`).then(…);
  }
  componentDidUpdate() {
    // стандарто: проверка изменения & load
  }
  render () {
    const { match } = this.props;
    const { list = [] } = this.state;
    return <div>
      <h1>Viewing category { match.params.catid }</h1>
    </div>
  }
}

const Category = () => (
  <Switch>
    <Route exact path=“/“ component={ CatList } />
    <Route exact path=“/:catid“ component={ CatPage } />
  </Switch>
);
```

<!--v-->

## Вопросы?

<!--v-->

### Задание

- Пишем структуру роутов для интернет-магазина
  - список
  - категории
  - страницы товаров
  - не-магазинные страницы (контакты, блог).
- присылайте в чат!

<!--v-->

## Вопросы?

<!--s-->

### `<Link />`

<!-- v -->

- У элемента **`<a>`** на самом деле куча полезной функциональности:
  - контекстное меню
  - _ctrl / alt + click_ — открыть в новой вкладке / сохранить
  - **`<a>`** можно даже перетаскивать!
- Если вместо **`<a>`** рисовать

```js [1-100]
  <span onClick={ () => history.pushState(…) }>
    link
  </span>
```

то мы теряем всю браузерную обвеску.

- С другой стороны **`<a>`** по умолчанию

<!--v-->

```js [1-100]
import { Link } from ‘react-router-dom’;
// Хитрая ссылка
<Link to=“/news”>Новости!</Link>

// можно generatePath
<Link
  to={ generatePath(“/user/:id/", { id }) }
>{ name }</Link>

// или просто руками:
<Link to={ `/user/${id}/` }>{ name }</Link>

// или объектом
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```

<!--v-->

### Внешние ссылки

```js [1-100]
//у Link есть подвох
// если на https://vasya-superman.ru написать
<Link to="https://mail.yandex.ru">Yandex.Mail</Link>

// то получится
<a href="https://vasya-superman.ru/https://mail.yandex.ru">
  Yandex.Mail
</a>

// это скорее всего не то, чего мы хотели

// Обход 1 — писать руками <a> для внешних ссылок
// Обход 2 — написать обертку <SmartLink>, которая смотрит на URL,
// проверяет, абсолютный ли он, и рисует <Link>или <a>
```

<!-- v -->

Задание: реализуйте SmartLink

<!--v-->

### Redirect

```js [1-100]
import { Redirect } from ‘react-router-dom’;
// Рендерим Redirect - переходим по адресу
<Redirect to=“/view-ad“ />

// или прямо в списке роутов (допустим, миграция):
<HashRouter>
  <Redirect from=“/user-list" to="/users" />
</HashRouter>

// Более полезный кейс:
const withAuth = Cmp => props => {
  return props.user
    ? <Cmp { ...props } />
    : <Redirect to=“/login” />;
};
```

<!--v-->

### Парсим query string

```js [1-100]
// Противоречивое решение react-router v4:
// убрать работу с queryString
// Теперь все сами:

import queryString from "query-string";

const Page = ({ location }) => {
  const params = queryString.parse(location.search);
  return <GoodsSearch name={params.name} minPrice={params.minPrice} />;
};
```

<!-- v -->

Задание:
`withRouter` подкладывает в пропcы `location` и `match`
напишите `withQuery`, который подкладывает queryParams

<!--v-->

### react-router: парсим query string

[query parameters react router way](https://reactrouter.com/web/example/query-parameters)

<!--v-->

## Вопросы?

<!-- s -->

### [Разделение кода на основе маршрутов](https://ru.reactjs.org/docs/code-splitting.html#route-based-code-splitting)

<!-- v -->

Современный стандарт описывает [динамическую подгрузку модулей](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules#dynamic_module_loading).

```js [1-100]
import("./modules/myModule.js").then((module) => {
  // Do something with the module.
});
```

Полный пример можно посмотреть [здесь](https://github.com/mdn/js-examples/tree/master/modules/dynamic-module-imports)

<!-- v -->

React на стороне клиента предоставляет поддержку ленивой загрузки через [`lazy` api](https://ru.reactjs.org/docs/code-splitting.html#reactlazy)

<!-- v -->

При этом мы даже можем визуализировать процесс загрузки через

```js [1-100]
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Загрузка...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

<!-- v -->

Иногда это используют, для разделения кода, в зависимости от роута

```js [1-100]
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

<!-- v -->

Замечание про [именованный экспорт](https://ru.reactjs.org/docs/code-splitting.html#named-exports)

```js [1-100]
const HugeComponent = React.lazy(() =>
  import("./HugeComponent").then((module) => ({
    default: module.HugeComponent,
  }))
);
```

<!-- v -->

Вопросы?

<!-- s -->

### Дополнительные материалы

1. [Разделение кода](https://ru.reactjs.org/docs/code-splitting.html#named-exports)
1. [Code Splitting React Router Routes with React Lazy and React Suspense](https://karlhadwen.medium.com/code-splitting-react-router-routes-with-react-lazy-and-react-suspense-a3852b42c0a9)
1. [React router examples](https://reactrouter.com/web/guides/quick-start)
1. [React Router v5: The Complete Guide](https://www.sitepoint.com/react-router-complete-guide/)
