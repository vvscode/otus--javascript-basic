---
title: Занятие 46
description: React и Redux
---

# OTUS

## Javascript Basic

<!-- v -->

Вопросы?

<!-- v -->

Принципы redux?

<!-- v -->

Что такое редьюсер?

<!-- v -->

Что такое action?

<!-- v -->

Как создать store?

<!-- v -->

Какой API у store?

<!-- v -->

Какие паттерны разработки на React знаете?

<!-- v -->

Зачем нужен redux-toolkit?

<!-- s -->

## Что React компонентам нужно от Redux?

<!-- v -->

- данные
- возможность делать dispatch для actions

<!-- v -->

Самый примитивный способ для получения доступа к данным из store

```tsx [1-50]
import { store } from "./store";
// ....
class Screen extends React.Component {
  // ....
  render() {
    return;
    <>
      <h1>{store.getState().user.name}</h1>
      <h2>{store.getState().activePage.title}</h2>
    </>;
  }
}
```

<!-- v -->

Для dispatch соответственно

<!-- eslint-skip -->

```ts [1-50]
  onClick() {
    store.dispatch(changePage({id: 'new'}))
  }
```

<!-- v -->

Но ведь этого не достаточно.

Чего не хватает?

<!-- v -->

<!-- eslint-skip -->

```ts [1-50]
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
```

<!-- v -->

А так мы создаем утечку памяти.

<!-- v -->

```tsx [1-50]
// чтобы прекратить прослушивание изменений при размонтировании
// нужно добавить
export class Screen extends React.Component<{}, {}> {
  storeSubscription?: Function;

  componentDidMount() {
    this.storeSubscription = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.storeSubscription && this.storeSubscription();
  }
}
```

<!-- v -->

А для того, чтобы

- не вызывать `.getState()` по многу раз
- иметь представление о том, какие данные из store нужны компоненту - хорошо бы завести **селектор**

<!-- v -->

```ts [1-30]
function getScreenProps(state: State) {
  return {
    gameField: state.gameField,
    nextMove: state.nextMove,
  };
}
```

<!-- v -->

Вместе

```ts [1-50]
export class App extends React.Component {
  private unsubscribe = () => {};

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getComponentData() {
    const state = store.getState();
    return {
      count: state.counter,
      totalCount: state.actionsCounter.count,
    };
  }

  render() {
    const componentData = this.getComponentData();
    return (
      // ...
      null
    );
  }
}
```

<!-- v -->

Вопросы?

<!-- s -->

## Обобщая решение

<!-- v -->

Какой паттерн подходит для подобной задачи?

<!-- v -->

Какие части будут повторяться из компонента в компонент?

<!-- v -->

- подписка на обновления
- отписка от обновлений
- выборка данных

<!-- v -->

Создадим HOC:

<!-- v -->

```tsx [13-50]
import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { store } from "../store";

interface DispatchProp {
  dispatch?: Dispatch<AnyAction>;
}

type State = ReturnType<typeof store.getState>;

// if you want to get more info
// try to check https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
export function withRedux<ComponentProps = any, Props = any>(
  TargetComponent: React.ComponentType<Props>,
  getPropsFromRedux: (state: State) => ComponentProps
): React.ComponentType<Omit<Props, keyof DispatchProp & ComponentProps>> {
  class WrappedComponent extends React.Component<
    Omit<Props, keyof ReturnType<typeof getPropsFromRedux>>,
    State
  > {
    render() {
      return <TargetComponent {...(this.props as any)} />;
    }
  }

  return WrappedComponent;
}
```

<!-- v -->

Внутри которого добавим подписку и отписку

```tsx [25-35]
import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { store } from "../store";

interface DispatchProp {
  dispatch?: Dispatch<AnyAction>;
}

type State = Record<string, unknown>;

// if you want to get more info
// try to check https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
export function withRedux<ComponentProps = any, Props = any>(
  TargetComponent: React.ComponentType<Props>,
  getPropsFromRedux: (state: State) => ComponentProps
): React.ComponentType<Omit<Props, keyof DispatchProp & ComponentProps>> {
  class WrappedComponent extends React.Component<
    Omit<Props, keyof ReturnType<typeof getPropsFromRedux>>,
    State
  > {
    render() {
      return <TargetComponent {...(this.props as any)} />;
    }

    storeSubscription = () => {};
    componentDidMount() {
      this.storeSubscription = store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
      this.storeSubscription();
    }
  }

  return WrappedComponent;
}
```

<!-- v -->

Пробросим нужные части от store через props

```tsx [26-27]
import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { store } from "../store";

interface DispatchProp {
  dispatch?: Dispatch<AnyAction>;
}

type State = Record<string, unknown>;

// if you want to get more info
// try to check https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
export function withRedux<ComponentProps = any, Props = any>(
  TargetComponent: React.ComponentType<Props>,
  getPropsFromRedux: (state: State) => ComponentProps
): React.ComponentType<Omit<Props, keyof DispatchProp & ComponentProps>> {
  class WrappedComponent extends React.Component<
    Omit<Props, keyof ReturnType<typeof getPropsFromRedux>>,
    State
  > {
    storeSubscription = () => {};

    render() {
      return (
        <TargetComponent
          dispatch={store.dispatch}
          {...getPropsFromRedux(store.getState())}
          {...(this.props as any)}
        />
      );
    }

    componentDidMount() {
      this.storeSubscription = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
      this.storeSubscription();
    }
  }

  return WrappedComponent;
}
```

<!-- v -->

И зададим имя для компонента-обертки:

```tsx [25-27]
export function withRedux<ComponentProps = any, Props = any>(
  TargetComponent: React.ComponentType<Props>,
  getPropsFromRedux: (state: State) => ComponentProps
): React.ComponentType<Omit<Props, keyof DispatchProp & ComponentProps>> {
  class WrappedComponent extends React.Component<
    Omit<Props, keyof ReturnType<typeof getPropsFromRedux>>,
    State
  > {
    storeSubscription = () => {};

    render() {
      // ...
    }

    componentDidMount() {
      this.storeSubscription = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
      this.storeSubscription();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (
    WrappedComponent as any
  ).displayName = `${TargetComponent.displayName}ConnectedToRedux`;

  return WrappedComponent;
}
```

<!-- v -->

Использовать такой HOC мы можем как

```tsx [1-100]
export const App = withRedux(RawApp, getAppPropsFromRedux);
```

<!-- v -->

Вопросы?

<!-- s -->

## [react-redux](https://react-redux.js.org/)

<!-- v -->

Весь этот функционал уже предоставляется пакетом `react-redux`. С ним redux подключается [в 3 шага](https://react-redux.js.org/introduction/quick-start):

- устанавливаем пакет react-redux
- оборачиваем приложение в `<Provider>`
- подключаем компоненты с помощью connect

<!-- v -->

[Provider](https://react-redux.js.org/api/provider)

```tsx [1-50]
/**
* Makes the Redux store available to the connect() calls in the componet hierarchy below.
*/
export class Provider<A extends Action = AnyAction> extends Component<ProviderProps<A>> { }

export interface ProviderProps<A Extends Action = AnyAction> {
  /**
  * The single Redux store in your applicaton.
  */
  store: Store<any, A>;
  /**
  Optional context to be used internally in react-redux.
  Use React.createContext() to create a context to be used
  If this is used, generate own connect HOC by using connectAdvanced,
  supplying the same context provided to the Provider.
  Initial value doesn't matter, as it is overwritten with the internal state of Provider.
  */
  context?: Context<ReactReduxContextValue>
}
```

<!-- v -->

_[Контекст](https://ru.reactjs.org/docs/context.html) позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях._

<!-- v -->

[`connect`](https://react-redux.js.org/api/connect)

```ts [1-100]
/*
mapStateToProps?: Function
mapDispatchToProps?: Function | Object
mergeProps?: Function
options?: Object
*/

function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?);
```

Подробное описание типов можно найти в [`@types/react-redux`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts#L192)

<!-- v -->

Код будет выглядеть примерно так:

```tsx [1-100]
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./config/store";
import App from "./App";

import "./index.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

<!-- v -->

где

```tsx [1-100]
// App
import React, { Component } from "react";
import { connect } from "react-redux";
import { loadItems } from "../../actions/items";

class App extends Component {
  componentDidMount() {
    this.props.loadItems();
  }
  render() {
    return (
      <div>
        We have {this.props.items.length} item(s)
        <Form />
        <Table items={this.props.items} />
      </div>
    );
  }
}

const mapStateToProps = (state /*, _ownProps*/) => ({
  items: state.items,
});
const mapDispatchToProps = {
  loadItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

<!-- v -->

Вопросы?

<!-- s -->

[Пример](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/master/lessons/lesson46/code/reactredux)

<!-- v -->

Вопросы?

<!-- s -->

### Дополнительные материалы

1. [Написание тестов для связки React + Redux](https://redux.js.org/usage/writing-tests#connected-components)
1. [Мини-курс по Redux от Дэна Абрамова](https://egghead.io/)
1. [Продвинутое продолжение курса (по связке React + Redux)](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)
1. [React HoC в TypeScript. Типизация без боли](https://habr.com/ru/company/sberbank/blog/354104/)
1. [React TypeScript Cheat sheet: Full HOC Example](https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example)
