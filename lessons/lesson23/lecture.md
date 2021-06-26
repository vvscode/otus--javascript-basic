---
title: Занятие 23
description: Создание интерактивных страниц, работа с анимациями
---

# OTUS

## Javascript Basic

<!--v-->

### Проверка

- Хорошо ли видно и слышно?
- Проверить идёт ли запись

<!-- s -->

## Анимации в HTML страницах

<!-- v -->

## Цели занятия

- Разобраться с основными подходами реализации интерактивных страниц
- Разобрать разницу между CSS и JS анимациями

<!-- v -->

## Маршрут вебинара

- Введение
- CSS Анимации
- JS Анимации
- Практика
- Итоги

<!-- v -->

## Вопросы?

<!-- s -->

## Введение

- CSS Анимации
  - CSS Animations && CSS Transitions
- JS Анимации
  - `requestAnimationFrame()`
  - Web Animations API

<!-- s -->

## CSS Transitions

<!-- v -->

> [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions) is a module of CSS that defines how to create smooth transitions between values of a given CSS properties. It allows to create them, but also to define their evolution, using timing functions.

<!-- v -->

## CSS Transitions

CSS Properties

```css
/* property name. ex: width, height, color, background-color, etc */
transition-property: opacity;

/* length of the transition. Ex: 1s, 300ms */
transition-duration: 0.3s;

/* Timing function. Ex: linear, step-end*/
transition-timing-function: ease-in-out;

/* Time to wait before starting transition animation */
transition-delay: 200ms;
```

<!-- v -->

## CSS Transitions

Shorthand Syntax

```css
/* shorthand syntax */
transition: <property> <duration> <timing-function> <delay>;
```

<!-- v -->

ℹ️ Не все CSS Атрибуты поддаются анимированию!

\*[Animatable CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)

<!-- v -->

## [CSS Transitions example](https://jsfiddle.net/hpdr2wxg/2/)

<!-- v -->

## Вопросы?

<!-- s -->

## CSS Animations

<!-- v -->

> [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations) is a module of CSS that lets you animate the values of CSS properties over time, using keyframes. The behavior of these keyframe animations can be controlled by specifying their timing function, duration, their number of repetitions, and other attributes.

<!-- v -->

## CSS Animations

CSS Properties. Define animation

```css
@keyframes my-animation {
  from: {
    /* initial CSS */
    width: 100px;
  }
  to: {
    /* final CSS */
    width: 1000px;
  }
}
```

<!-- v -->

```css
@keyframes my-animation {
  0%: {
    /* initial CSS */
    width: 100px;
    background-color: white;
  }
  100%: {
    /* final CSS */
    width: 1000px;
    background-color: blue;
  }
}
```

<!-- v -->

```css
@keyframes my-animation {
  0%: {
    /* initial CSS */
    width: 100px;
    background-color: white;
  }
  30%: {
    /* initial CSS */
    width: 800px;
    background-color: yellow;
  }
  100%: {
    /* final CSS */
    width: 1000px;
    background-color: blue;
  }
}
```

<!-- v -->

## CSS Animations

CSS Properties. Apply animation

```css
animation-name: my-animation; /* name of the @keyframe at-rule */
animation-duration: 1s; /* Length of the animation */
animation-delay: 100ms; /* Time to wait before starting animation */
animation-iteration-count: infinite; /* Number of times the animation should repeat */
animation-direction: normal; /* Ex: reverse, alternate, alternate-revers */
animation-timing-function: linear; /* Timing function. Ex: linear, step-end*/
animation-fill-mode: none; /* Ex: forwards, backwards, both */
animation-play-state: running; /* Sets whether an animation is running or paused*/
```

<!-- v -->

## CSS Animations

Shorthand Syntax

```css
animation: <duration> | <easing-function> | <delay> | <iteration-count> |
  <direction> | <fill-mode> | <play-state> | <name>;
```

<!-- v -->

ℹ️ Не все CSS Атрибуты поддаются анимированию!

\*[Animatable CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)

<!-- v -->

## [CSS Animations Example](https://jsfiddle.net/rav57b8h/1/)

<!-- v -->

## Вопросы?

<!-- s -->

## JS Анимации

- `requestAnimationFrame()`
- Web Animations API

<!-- s -->

## <code>[requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)</code>

- \*[Reflow/Repaint](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg)
- Альтернатива setTimeout. Отличия:
  - Хорошо оптимизирована, более гладкие анимации
  - Ставится на паузу, если страница не активна

```js
function animationStep() {
  // ...
  window.requestAnimationFrame(animationStep);
}

window.requestAnimationFrame(animationStep);
```

<!-- v -->

## [<code>requestAnimationFrame() Example</code>](https://jsfiddle.net/edqyntx1/)

<!-- v -->

## Вопросы?

<!-- s -->

## [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)

- Удобная/новая альтернатива "`requestAnimationFrame()`"
- Позволяет создавать управляемые анимации с помощью JS

<!-- v -->

## [Web Animations API Example](https://jsfiddle.net/7wut1nsb/42/)

<!-- v -->

## Вопросы?

<!-- s -->

## Итоги - Тезисы

- В большинстве случаев достаточно CSS Animations

  - Для переходов состояний используем "CSS Transitions"
  - Для анимаций элементов используем "CSS Animations"

- Для более сложных анимаций используем JS
  - requestAnimationFrame()
  - Web Animation API - Новая альтернатива "requestAnimationFrame()"
  <!-- v -->

## Вопросы?

<!-- s -->

## Спасибо за внимание!

[ССылка на опрос]()
