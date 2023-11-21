---
title: Занятие 43
description: React
---

# OTUS

## Javascript Basic

<!-- v -->

Вопросы?

<!-- s -->

### [React](https://ru.reactjs.org/)

<!-- v -->

#### Проблемы шаблонизации

- скорость разработки приложения
- скорость работы приложения

<!-- v -->

#### React

- декларативный
- основан на [компонентах](https://reactjs.org/docs/components-and-props.html)
- научитесь однажды — пишите где угодно

<!-- v -->

Особенности **React**

- с компонентами (но не [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components))
- оптимизация обновлений через [vDOM](https://reactjs.org/docs/faq-internals.html)
- минимальный синтаксис шаблонов — [JSX](https://facebook.github.io/jsx/)

<!-- v -->

Идея скорости — [**Virtual DOM**](https://reactjs.org/docs/faq-internals.html)

- архитектура React — отрисовать минимально необходимые изменения
- работа с DOM напрямую — медленно
- vDOM — модель настоящего DOM на легких js-объектах

<!-- v -->

<img src="./images/dom-reconciliation.webp" style="height:500px" />

<!-- v -->

### React - абстрактная идея

- может использоваться на разных платформах (не только Web, но и нативные системы и что-угодно еще представляющее UI - [React Native](https://reactnative.dev/), [React for terminal](https://github.com/vadimdemedes/ink))
- сам React никак не связан ни с Web ни с DOM
- для работы с DOM(HTML) используется отдельный пакет — [react-dom](https://reactjs.org/docs/react-dom.html)

<!-- v -->

### Из чего состоит приложение на React?

[React-элементы](https://ru.reactjs.org/docs/glossary.html) — это составляющие блоки React-приложений. Их **можно перепутать с более известной концепцией «компонентов»**, но в отличие от компонента, элемент описывает то, что вы хотите увидеть на экране.
React-элементы иммутабельны.

<!-- v -->

Представление React элементов через [`createElement`](https://ru.reactjs.org/docs/react-api.html#createelement)

```jsx
React.createElement(type, [props], [...children]);
```

<!-- v -->

```tsx [1-30]
React.createElement(
  "div",
  {
    className: "wrapper",
    style: "margin: 5px",
  },
  React.createElement(
    "button",
    {
      onClick: function onClick() {
        return alert("Click");
      },
      className: "btn",
    },
    "Click me"
  )
);
```

<!-- v -->

```jsx [1-30]
// jsx:
// https://bit.ly/3gCKQOI
<div className="wrapper" style={{ margin: "5px" }}>
  <button onClick={() => alert("Click")} className="btn">
    Click me
  </button>
</div>
```

<!-- v -->

[React-компоненты](https://ru.reactjs.org/docs/glossary.html) — это маленькие, повторно используемые части кода, которые возвращают React-элементы для отображения на странице. Самый простой React-компонент — JavaScript функция, которая возвращает элементы React.

<!-- v -->

```tsx [1-50]
// компонент
const Button = ({ name }) => {
  return React.createElement(
    "button",
    {
      onClick: function onClick() {
        return alert("Click");
      },
      className: "btn",
    },
    name
  );
};

// применение компонента
React.createElement(
  "div",
  {
    className: "wrapper",
    style: "margin: 5px",
  },
  React.createElement(Button, {
    name: "Click me",
  })
);
```

<!-- v -->

```jsx [1-30]
const Button = ({ name }) => (
  <button onClick={() => alert("Click")} className="btn">
    {name}
  </button>
);

// применение компонента
<div className="wrapper" style={{ margin: "5px" }}>
  <Button name="Click me" />
</div>;
```

<!-- v -->

Чтобы [отрисовать элемент на странице](https://ru.reactjs.org/docs/rendering-elements.html) нужен пакет [`react-dom`](https://ru.reactjs.org/docs/react-dom.html)

```jsx [1-10]
const element = <h1>Hello, world</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
```

<!-- v -->

### [Пример работы с React элементами](https://stackblitz.com/edit/basic-react-dom-novgwc?file=index.js)

<!-- v -->

Для поддержки синтаксиса `JSX` нужен пакет [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react). Но при этом вполне можно обходиться и [вообще без JSX](https://ru.reactjs.org/docs/react-without-jsx.html)

<!-- v -->

### Вопросы?

<!-- s -->

### JSX

<!-- v -->

`JSX` — синтаксический сахар для функции `React.createElement`

> JSX — расширение языка JavaScript. Мы рекомендуем использовать его, когда требуется объяснить React, как должен выглядеть UI. JSX напоминает язык шаблонов, наделённый силой JavaScript.

<!-- v -->

[Знакомство с JSX](https://ru.reactjs.org/docs/introducing-jsx.html)

[JSX в деталях](https://ru.reactjs.org/docs/jsx-in-depth.html)

<!-- v -->

#### [Немного о правилах JSX](https://stackblitz.com/edit/react-basic-jsx-otus?file=jsxExamples.jsx)

<!-- v -->

```tsx [1-30]
// 1. Объявление компонентов

// 1.1 Как функция
const Cmp1 = (props) => <div>{props.name}</div>;

// 1.2 Как класс
class Cmp2 extends React.Component {
  render() {
    return <Cmp1 name={this.props.userName}></Cmp1>;
  }
}
```

<!-- v -->

```tsx [1-30]
// 2. Использование компонентов

// 2.1 С закрывающим тегов
<Cmp1 name="Bob"></Cmp1>

// 2.2 С самозакрывающимся тегом (если нет дочерних элементов)
<Cmp1 name="Sam" />
```

<!-- v -->

```tsx [1-30]
// 3. Передача свойств в компонент

// 3.1 Все свойства пишутся в {}
<Cmp1 name={"Sam"} />


// 3.2 Строковые литералы передаются как-есть
<Cmp1 name="Sam" />

// 3.3 Булевые true свойства можно передавать просто указанием
<Cmp1 disabled />
```

<!-- v -->

```tsx [1-30]
// 4 Комментарий

// 4.1 Вокруг компонентов/их методов - обычный js
// так
const Cmp3 = (props /* или так */) => <div>{props.name}</div>;

// 4.2 Внутри jsx
const Cmp4 = (props) => (
  <div>
    {/* вот так */}
    {props.name}
  </div>
);
```

<!-- v -->

```tsx [1-30]
// 5 Выражения

// jsx - subset js, выражения пишутся внутри {} (как в примере с свойствами компонентов)
const Cmp5 = (props) => (
  <div>
    {props.disabled ? <span>No way</span> : <button>Go</button>}
    {props.names.map((name) => (
      <button>{name}</button>
    ))}
    {props.someFlag && <NestedCompnent />}
  </div>
);
```

<!-- v -->

```tsx
// Важно! (ну или было важно)
import React from "react";
```

Начиная с React 17 появилась [возможность](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) использования новой JSX трансформации

<!-- v -->

### Вопросы?

<!-- s -->

### Тестирование

<!-- v -->

- Подход от реализации - [Enzyme](https://enzymejs.github.io/enzyme/)

- Подход от пользователя - [RTL](https://testing-library.com/docs/react-testing-library/intro/)

<!-- v -->

### React-testing-library

> The React Testing Library is a very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils

<!-- v -->

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    // Render component
    render(<App />);
    // Debug info
    screen.debug();
    // For debugging using testing-playground,
    // screen exposes this convenient method
    // which logs a URL that can be opened in a browser
    screen.logTestingPlaygroundURL();
  });
});
```

<!-- v -->

#### Вывод

> RTL используется для взаимодействия с вашими компонентами React так, как это делает человек. То, что видит человек, - это просто визуализированный HTML из ваших компонентов React, поэтому вы видите эту структуру HTML как результат

```html [1-30]
<body>
  <div>
    <div>Hello React</div>
  </div>
</body>
```

<!-- v -->

### Выбор элементов

<!-- v -->

[jest-dom](https://github.com/testing-library/jest-dom/)

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    expect(screen.getByText("Search:")).toBeInTheDocument();
  });
});
```

<!-- v -->

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    // неявная проверка
    // getByText выбрасывает исключение если элемент не найден
    screen.getByText("Search:");

    // явная проверка - рекомендуется
    expect(screen.getByText("Search:")).toBeInTheDocument();
  });
});
```

<!-- v -->

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    // упадет
    expect(screen.getByText("Search")).toBeInTheDocument();

    // пройдет
    expect(screen.getByText("Search:")).toBeInTheDocument();

    // пройдет
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });
});
```

<!-- v -->

### Возможности для поиска

`getByRole` используется для поиска по [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label). Но, [у некоторых HTML элементов есть неявные роли](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.getByRole("");
  });
});
```

<!-- v -->

```[1-30]
Unable to find an accessible element with the role ""

Here are the accessible roles:

document:

Name "":
<body />

--------------------------------------------------
textbox:

Name "Search:":
<input
  id="search"
  type="text"
  value=""
/>

--------------------------------------------------
```

<!-- v -->

```js
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
```

<!-- v -->

### Есть более специфичные способы поиска:

`getByLabelText`:

```html
<label for="search" />
```

`getByPlaceholderText`:

```html
<input placeholder="Search" />
```

`getByAltText`:

```html
<img alt="profile" />
```

`getByDisplayValue`:

```html
<input value="JavaScript" />
```

<!-- v -->

И другие

- getByText
- getByRole
- getByLabelText
- getByPlaceholderText
- getByAltText
- getByDisplayValue

<!-- v -->

### getBy vs queryBy

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.debug();

    // fails
    expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
  });
});
```

<!-- v -->

**getBy** выбрасывает исключение если элемент не найден.

Для работы и проверки элементов, которых нет - можно использовать **queryBy**

<!-- v -->

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});
```

<!-- v -->

### findBy делает асинхронный поиск (И ожидание) элементов

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();

    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});
```

<!-- v -->

Для коллекций элементов есть

- getAllBy
- queryAllBy
- findAllBy

<!-- v -->

### Assertive Functions

[jest-dom](https://github.com/testing-library/jest-dom/)

- toBeDisabled
- toBeEnabled
- toBeEmpty
- toBeEmptyDOMElement
- toBeInTheDocument
- toBeInvalid
- toBeRequired
- and etc...

<!-- v -->

### [Testing-playground](https://testing-playground.com/)

<!-- v -->

### Вопросы?

<!-- v -->

### FIRE EVENT

```js [1-30]
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.debug();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    screen.debug();
  });
});
```

<!-- v -->

```js [1-30]
import React from "react";
import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```

<!-- v -->

### React Testing Library: User Event

> userEvent API имитирует реальное поведение браузера более точно, чем fireEvent API. Например, fireEvent.change() запускает только событие изменения, тогда как userEvent.type запускает событие изменения, а также события keyDown, keyPress и keyUp.

<!-- v -->

```js [1-30]
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```

<!-- v -->

### Обработчики событий

<!-- v -->

<!-- eslint-skip -->

```js
import React from "react";

function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}
```

<!-- v -->

```js [1-30]
import React from "react";
import Search from "./Search";
//  FireEvent
describe("Search", () => {
  test("calls the onChange callback handler", () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
```

<!-- v -->

```js [1-30]
import React from "react";
import Search from "./Search";
// UserEvent
describe("Search", () => {
  test("calls the onChange callback handler", async () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
```

<!-- v -->

Вопросы?

<!-- s -->

### CRA

<!-- v -->

[CRA](https://create-react-app.dev/) - инструмент от [facebook](https://github.com/facebook/create-react-app) для старта разработки приложений

<!-- v -->

```
npx create-react-app my-app
cd my-app
npm start
```

c TS:

```
npx create-react-app my-app --template typescript
```

<!-- v -->

Скрывает от пользователя все настройка за [`react-scripts`](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts)

<!-- v -->

Для открытия настроек есть команда **eject**

<!-- v -->

### На курсе мы НЕ будем использовать CRA!

<!-- v -->

Вопросы?

<!-- s -->

### [Storybook](https://storybook.js.org/)

<!-- v -->

### [Loki](https://loki.js.org/)

<!-- s -->

### Дополнительные материалы

0. https://ru.reactjs.org/docs/getting-started.html
1. https://pomb.us/build-your-own-react/
2. https://jasonformat.com/wtf-is-jsx/
3. https://github.com/pomber/didact
4. [Paul O Shannessy - Building React From Scratch](https://www.youtube.com/watch?v=_MAD4Oly9yg)
5. [YT: Автотесты. Модульное тестирование – Дмитрий Андриянов](https://www.youtube.com/watch?v=DFLXBdfnAeE)
6. [Начало работы со Storybook](https://www.youtube.com/watch?v=lUf8qC_xFHo)
