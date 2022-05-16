---
title: Занятие 33
description: Mediator и EventEmitter как инструмент организации кода
---

# OTUS

## Javascript Basic

<!-- v -->

## Вопросы?

<!-- s -->

## Mediator и EventEmitter как инструмент организации кода

<!-- s -->

### Разберемся с задачей

<!-- v -->

Для начала два термина - **связность(_cohesion_)** и **связанность(_coupling_)**.

[Связность](<https://ru.wikipedia.org/wiki/%D0%A1%D0%B2%D1%8F%D0%B7%D0%BD%D0%BE%D1%81%D1%82%D1%8C_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)>) - на сколько составные части направлены на решение одной задачи.

[Связанность](<https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D1%86%D0%B5%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)>) - на сколько одни модули зависят от других (и как много они знают друг о друге)

<!-- v -->

[Качественный дизайн обладает слабой связанностью (low coupling) и сильной связностью (high cohesion).](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)

Это значит, что программный компонент имеет небольшое число внешних связей и отвечает за решение близких по смыслу задач.

<!-- v -->

**Слабое зацепление (Low Coupling)** и **Высокая связность (High Cohesion)** это 2 из 9 [**шаблонов GRASP**](<https://ru.wikipedia.org/wiki/GRASP#4._%D0%A1%D0%BB%D0%B0%D0%B1%D0%BE%D0%B5_%D0%B7%D0%B0%D1%86%D0%B5%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_(Low_Coupling)>)

<!-- v -->

Высокая связность говорит об эффективности программы (или ее отдельных модулей).

Низкая связанность означает легкость рефакторинга и переиспользуемость кода.

<!-- v -->

### Вопросы?

<!-- s -->

### Наблюдатель (Observer)

<!-- v -->

[Наблюдатель](https://refactoring.guru/ru/design-patterns/observer) - подход (паттерн), позволяющий одним объектам следить и реагировать на события, происходящие в других объектах.

<!-- v -->

<img src="./images/ObservableUML.png" title="Observable UML" />

<!-- v -->

На самом деле вы с ним уже работали - это [EventTarget](https://developer.mozilla.org/ru/docs/Web/API/EventTarget)

<!-- v -->

Данный шаблон часто применяют в ситуациях, в которых отправителя сообщений не интересует, что делают получатели с предоставленной им информацией.

<!-- v -->

Может быть представлен как

<!-- eslint-skip -->

```ts
IObservable {
  addObserver(event, handler)
  removeObserver(event, handler)
  notifyObserver(event, data)
}
```

<!-- v -->

или

<!-- eslint-skip -->

```ts
EventTarget {
  addEventListener(event, handler)
  removeEventListener(event, handler)
  dispatchEvent(event)
}
```

<!-- v -->

или

<!-- eslint-skip -->

```ts
Backbone.Events {
  on(event, handler)
  off(event, handler)
  trigger(event)
}
```

<!-- v -->

Иногда могут добавлять вспомогательные методы, например

<!-- eslint-skip -->

```ts
Backbone.Events {
  // ...
  once(event, handler)
}
```

<!-- v -->

```ts
document.querySelector(element).addEventListener("click", (ev) => {
  alert("Boom!");
});
```

<!-- v -->

Оговорка: чаще всего обработчиком события является функция. Но это также может быть и объект ([EventListener](https://developer.mozilla.org/ru/docs/Web/API/EventListener)) - в зависимости от реализации.

<!-- v -->

### Вопросы?

<!-- s -->

### Посредник (Mediator)

<!-- v -->

[Посредник](https://refactoring.guru/ru/design-patterns/mediator) - это поведенческий паттерн проектирования, который позволяет уменьшить связанность множества классов между собой, благодаря перемещению этих связей в один класс-посредник.

<!-- v -->

**Задача:** Обеспечить взаимодействие множества объектов, сформировав при этом слабую связанность и избавив объекты от необходимости явно ссылаться друг на друга.

**Решение:** Создать объект, инкапсулирующий способ взаимодействия множества объектов.

**Преимущества:** Устраняется связанность между "Коллегами", централизуется управление.

<!-- v -->

Самый распространенный (и простой) вариант реализации паттерна - с использованием **EventEmitter** интерфейса (**Event Bus** - Шина событий).

<!-- v -->

Разница, по сравнению с обычным использованием EventTarget:

- события в EventTarget генерирует сам объект, при работе с EventBus это делают сторонние объекты
- список событий при работе с EventTarget ограничен устройством объекта, при работе с EventBus он определяется участниками

<!-- v -->

<img src="./images/EventBus.jpeg" title="Event Bus" />

<!-- v -->

При этом, чтобы избежать коллизии имен событий, зачастую вводят `namespaces`, в формате **{NAMESPACE}:{EVENT NAME}**. Например `user:add`, `searchHistory:add`.

Нужно отметить, что по-хорошему, префиксы делаются на основе сущностей, а не на основе модулей (иначе происходит раскрытие структуры системы).

<!-- v -->

```ts
const eventBus = new EventBus();

// module 1
eventBus.on("city:changed", (cityName) => console.log(`New city: ${cityName}`));

// module 2
eventBus.trigger("city:changed", "Minsk");
```

<!-- v -->

Как мы могли бы применить это к уже сделанным домашним заданиям?

<!-- v -->

### Вопросы?

<!-- s -->

### Практика

<!-- v -->

[Реализовать Event Emitter](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/master/lessons/lesson33/code/eventEmitter)

<!-- v -->

Реализовать поверх существующего функционала метод **once** (для одноразового вызова обработчика).

<!-- v -->

### Вопросы?

<!-- s -->

Дополнительные материалы:

- [Backbone Events](https://backbonejs.org/#Events) и [исходники](https://backbonejs.org/docs/backbone.html#section-17)
- [EventTarget simple implementation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [Паттерны проектирования понятным языком](https://refactoring.guru/ru/design-patterns)

<!-- v -->

### Опрос о занятии
