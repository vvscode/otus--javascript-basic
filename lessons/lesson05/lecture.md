---
title: Занятие 5
description: Тестирование кода как часть процесса разработки, пример применения тестирования к домашним заданиям
---

# OTUS

## Javascript Basic

<!--v-->

### Вопросы?

<!--s-->

## Тестирование кода как часть процесса разработки

<!-- v -->

[Есть разные определения тестирования:](https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F)

- выполнение программы с целью нахождения ошибок
- практика для получения надежного ПО без излишних усилий на его проверку
- проверка соответствия между реальным поведением программы и её ожидаемым поведением
- процесс наблюдения за работой программы в специальных условиях и выводы на основе наблюдения
- ...

<!-- v -->

Виды тестирования по степени автоматизации:

- автоматизированное
- ручное

<!-- v -->

А вообще тестирование может быть разным:

- [Виды тестирования ПО 1(mind map)](https://qaevolution.ru/testirovanie-po/vidy-testirovaniya-po/)
- [Виды тестирования ПО 2](http://www.protesting.ru/testing/testtypes.html)
- [Классификация видов тестирования](https://qa-academy.by/qaacademy/news/klassifikaciya-vidov-testirovaniya/)

<!-- v -->

Есть даже

**ad-hoc testing** — вид тестирования, который выполняется без подготовки к тестам, без определения ожидаемых результатов, проектирования тестовых сценариев. Это неформальное, импровизационное тестирование.

<!-- v -->

**Но!** Это не наш метод.

[С самого начала у нас есть какая то тактика и мы ее придерживаемся](https://www.youtube.com/watch?v=aHLfyWfeATk)

<!-- v -->

Почему автоматизированное тестирование?

- скорость проверки
- простота проверки
- исключение человека из процесса (страдают машины)
- решение проблемы регрессионного тестирования
- упрощает тестирование отдельных частей и сопряжений

<!-- v -->

## Вопросы?

<!-- v -->

Цели автоматического тестирования с точки зрения разработчика:

- Проверка соответствия ожиданиям
- Документирование кода (Примеры использования)
- Проверка состояния системы (регрессия)
- Поиск / проверка на ошибки

<!-- v -->

[Пирамида тестирования](https://habr.com/ru/post/358950/)

<img src="https://habrastorage.org/getpro/habr/post_images/f6c/930/f2d/f6c930f2d4ae8a6068696ace34e9566e.png" title="Пирамида тестирования" />

<!-- v -->

Что тестируют js-разработчики

- Функционал
- Кроссбраузерность
- Нагрузочное тестирование
- Стресс тестирование (подвид нагрузочного тестирования, направленный на исследование пределов работоспособности системы)
- Юзабилити
- Безопасность

<!-- v -->

Относительно выполнения кода тестирование кода может быть:

- Без выполнения кода (статический анализ: Eslint, Typescript, JSDoc)
- С выполнением кода (полным или частичным)

<!-- v -->

Модульные (unit) и интеграционные (service) тесты:

- Просты в написании
- Тестируют реализацию
- Имеют высокую скорость и точность выявления проблем
- Код для таких тестов "Белый"/"серый" ящик
- Влияют на устройство кода "внутри"

<!-- v -->

Но при этом их не достаточно:

<img src="http://ilkinulas.github.io/assets/integration_tests/no_integration_test.gif" title="Unit tests" />

<!-- v -->

И они не покрывают интеграцию частей

<img src="https://i.imgur.com/HkWPc1u.gif" title="Unit tests" />

<!-- v -->

## Вопросы?

<!-- v -->

Общая схема тестирования:

- подготовка окружения и данных
- выполнение кода
- проверка утверждения

<!-- v -->

```js [1-30]
const numbersList = [1, 2, 3]; // подготовка
const indexOf5 = numbersList.indexOf(5); // выполнение
expect(indexOf5).toBe(-1); // проверка
```

<!-- v -->

```js [1-30]
// сокращенно
expect([1, 2, 3].indexOf(5)).toBe(-1);
```

<!-- v -->

C этого момента действует правило - нет тестов => нет кода.

<!-- v -->

## Вопросы?

<!-- s -->

## Инструменты для тестирования

<!-- v -->

Не обязательно использовать специальные инструменты

```js [1-30]
console.log("111", isPalindrom("111"), true);
console.log("112", isPalindrom("112"), false);
console.log("212", isPalindrom("212"), true);
console.log("2112", isPalindrom("2112"), true);
```

<!-- v -->

```js [1-30]
[
  ["111", true],
  ["112", false],
  ["212", true],
  ["2112", true],
].forEach(([str, expectedResult]) =>
  console.log(str, isPalindrom(str) === expectedResult)
);
```

<!-- v -->

И как эволюция таких решения появились тестовые фреймворки. Которые должны упростить работу с типовыми операциями при тестировании.

<!-- v -->

Что делают тестовые фреймворки:

- задает формат тестов
- объединяет библиотеки, необходимые для тестирования
- запускает тесты
- выводят результат
- позволяет работать с данными для запуска тестов

<!-- v -->

Для Javascript их много (как и для других платформ)

- [Jest](https://jestjs.io/ru/)
- [Mocha](https://mochajs.org)
- [Jasmine](https://jasmine.github.io/)
- [QUnit](https://qunitjs.com/)
- [...](https://github.com/sorrycc/awesome-javascript#testing-frameworks)

Все похожи и каждый особенный

<!-- v -->

На курсе мы будем работать с [Jest](https://jestjs.io/ru/)

- Широко используется (Facebook, Uber, AirBnb, etc)
- Поддерживает из коробки много технологий (React, Vue, Typescript)
- Содержит дополнительные инструменты (так что их не нужно дополнительно настраивать)
- Производительность
- Дружит с другими инструментами

<!-- v -->

Особенности Jest:

- не работает в браузере (только через Node.js)
- может использовать для запуска тестов [jsdom](https://github.com/jsdom/jsdom) - это похоже на браузер, но не то
- позволяет делать подмену модулей

<!-- v -->

```bash
➜  js--game-of-life git:(master) npx jest
 PASS  src/getNewCellState.test.js
 PASS  src/getCellState.test.js
 PASS  src/isAnyoneAlive.test.js
 PASS  src/getNumOfAliveNeighbours.test.js
 PASS  src/getNextState.test.js
 PASS  src/drawField.test.js
 PASS  src/createGameOfLife.test.js

Test Suites: 7 passed, 7 total
Tests:       43 passed, 43 total
Snapshots:   0 total
Time:        3.79 s
Ran all test suites.
```

<!-- v -->

```bash
➜  js--game-of-life git:(master) npx jest --verbose
 PASS  src/isAnyoneAlive.test.js
  isAnyoneAlive
    ✓ is a function (1 ms)
    ✓ returns `false` for empty field
    ✓ returns `true` for field 1x1 from 1 (1 ms)
    ✓ should return false for []
    ✓ should return false for [[]]
    ✓ should return true for [[1]]
    ✓ should return true for [[1],[0]]
    ✓ should return false for [[0],[0]] (1 ms)
    ✓ should return true for [[0,0,0],[0,0,1]]

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.274 s
Ran all test suites.
```

<!-- v -->

## Вопросы?

<!-- s -->

## Про структуру тестов

<!-- v -->

Тесты обычно помещаются в файлы с окончанием `.test` / `.spec`.

Иногда их складывают в отдельные директории, но на курсе мы будем держать тесты рядом с кодом.

<!-- v -->

Тесты группируются в описания (блоки `describe`), описания могут быть вложенными.

```js [1-30]
describe("Module name", () => {});

describe("Another module name", () => {
  describe("Nested module", () => {});
});
```

<!-- v -->

Описание включает в себя один или несколько тестов-утверждений (`it`).

```js [1-30]
describe("isPalindrom", () => {
  it("is a function", () => {});
  it('returns true for "121"', () => {});
});
```

<!-- v -->

Внутри теста находится одно или несколько [ожиданий](https://jestjs.io/docs/ru/using-matchers)

```js [1-30]
describe("isPalindrom", () => {
  it('returns true for "121"', () => {
    expect(isPalindrom("121")).toBe(true);
  });
});
```

<!-- v -->

Возможностей [писать ожидания](https://jestjs.io/docs/ru/expect) много, но свести все можно к проверке утверждения на истинность. Просто использование разных ожиданий может упростить жизнь.

<!-- v -->

```js [1-30]
function sumWithCallback(a, b, cb) {
  cb(a + b);
}
//...
it("calls cb with result", () => {
  let isCalled = false;
  let param = undefined;
  const cb = (x) => {
    isCalled = true;
    param = x;
  };
  sumWithCallback(1, 2, cb);
  expect(isCalled).toBeTruthy();
  expect(param === 3).toBeTruthy();
});
```

<!-- v -->

```js [1-30]
function sumWithCallback(a, b, cb) {
  cb(a + b);
}
//...
it("calls cb with result", () => {
  const cb = jest.fn();
  sumWithCallback(1, 2, cb);
  expect(cb).toHaveBeenCalledWith(3);
});
```

<!-- v -->

Если в тестах есть повторяющиеся операции по подготовке окружения - их можно выносить в [специальные хуки](https://jestjs.io/docs/ru/setup-teardown)

- `beforeAll`
- `beforeEach`
- `afterEach`
- `afterAll`

<!-- v -->

[Чем лучше вы знаете свой тестовый фреймворк - тем проще и быстрее вам писать тесты](https://webdevblog.ru/jest-tutorial-dlya-nachinajushhih-nachalo-raboty-s-jest-dlya-testirovaniya-javascript/).

<!-- v -->

## Вопросы?

<!-- s -->

## Написание тестов

<!-- v -->

Автоматизированные тесты проверяют один или несколько модулей в разных условиях. Значит для этого должна быть возможность запускать код многократно.

Что это для нас означает на уровне кода?

<!-- v -->

Что нужно тестировать:

- нормальную работу
- граничные значения
- обработку исключительных ситуаций

<!-- v -->

## Вопросы?

<!-- v -->

[_Given an input string, you should check if the string contains the same amount of `x` and `o`. The case doesn't matter - if the amount is equal, return a `true` otherwise return `false`_](https://github.com/vvscode/js--interview-questions/blob/master/topics/complex.md)

_Для данной строки нужно проверить, что она содержит одинаковое число `x` и `o`. Регистр не имеет значения. Если число вхождений одинаковое - вернуть `true`, иначе `false`_

Какие тестовые сценарии будем тестировать?

<!-- v -->

[Практика](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson05/lessons/lesson05/code/isEqualXAndO)

В файле `isEqualXAndO.test.js` описать перечисленные сценарии (не меньше 5).

Время выполнения - 5 минут

<!-- v -->

## Вопросы?

<!-- s -->

## Как упростить себе работу с тестами?

<!-- v -->

1. Определите модули, их интерфейсы и возможно структуру
1. Определите где и как модули будут сопрягаться
1. Начинайте с тестирования частей, чтобы быстро получать обратную связь
1. Держите время на тест коротким (опять же для быстрой обратной связи)
1. Держите тесты чистыми
1. Тесты не должны зависеть друг от друга
1. Используйте `--watch` режим, для автоматического перезапуска тестов

<!-- v -->

1. Пишите чистые функции (которые зависят только от входных переменных, всегда выдают предсказуемый результат и не меняют ничего в окружении) ([а такое вообще возможно?](https://medium.com/devschacht/robin-pokorny-do-pure-functions-exist-in-javascript-94fd25180fd))
1. Пишите функции, которые принимают зависимости через параметры (не полагайтесь на замыкания и глобальные объекты)
1. Сначала пишите тесты, а потом код
1. Помните, что тесты тоже код. И тут действуют те же правила - _KISS_, _DRY_ и тп.

<!-- v -->

TDD и цикл RGR

- R1: красный тест (проверяется функциональность, которой нет)
- G: зеленый тест (пишется функциональность, необходимая для теста)
- повторять до получения результата
- R2: рефакторинг (тесты уже есть, вы можете менять реализацию)

<!-- v -->

## Вопросы?

<!-- s -->

## Помощь при тестировании

<!-- v -->

**Задача** - сделать поведение системы предсказуемым (и управляемым), в тех частях, которые мы не хотим тестировать, или которые не являются предсказуемыми в реальной жизни.

[Mocks, stubs, spies etc.](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs)

<!-- v -->

В рамках Jest есть такие инструменты (самые частые)

- [`jest.fn()`](https://jestjs.io/docs/en/jest-object#jestfnimplementation) - для создания новых mock-функций
- [`jest.spyOn()`](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) - для оборачивания в mock-функции существующие методы
- [`jest.mock`](https://jestjs.io/docs/ru/jest-object) - для мока модулей (файлов)

<!-- v -->

```js [1-10]
it("callFn alerts value entered to prompt", () => {
  jest.spyOn(window, "prompt").returnValue("123");
  window.alert = jest.fn();
  expect(window.alert).toHaveBeenCalledWith("123");
});
```

<!-- v -->

Держите тесты чистыми

```js [1-20]
let originalAlert;

beforeEach(() => {
  originalAlert = window.alert;
});
afterEach(() => {
  window.alert = originalAlert;
});

it("callFn alerts value entered to prompt", () => {
  jest.spyOn(window, "prompt").returnValue("123");
  expect(window.alert).toHaveBeenCalledWith("123");
});
```

[Почему не `jest.spyon(window, 'alert')`](https://github.com/jsdom/jsdom/issues/1843)

<!-- v -->

## Вопросы?

<!-- v -->

<!--
// Example tests for TDD session
import { createCalculatorUI } from './createCalculatorUI';
import { calculateResult } from './calculateResult';

jest.mock('./calculateResult');

describe('createCalculatorUI', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
  })

  it('is a funtion', ()=> {
    expect(typeof createCalculatorUI).toBe('function');
  });

  it('creates proper markup', () => {
    createCalculatorUI(el);

    const input = el.querySelector('input');
    const button = el.querySelector('button');
    const history = el.querySelector('.history');

    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toBe('Enter expression here');

    expect(button).toBeTruthy();
    expect(history).toBeTruthy();
  });

  it('calls calculateResult on form submition', () => {
    createCalculatorUI(el);

    el.querySelector('form').submit();
    expect(calculateResult).toHaveBeenCalled();
  });

  it('passes value from input to calculateResult', () => {
    createCalculatorUI(el);
    const expr = '1+1';

    el.querySelector('input').value = expr;
    el.querySelector('form').submit();

    expect(calculateResult).toHaveBeenCalledWith(expr);
  });

  it('clears value of input', () => {
    createCalculatorUI(el);
    const expr = '1+1';

    el.querySelector('input').value = expr;
    el.querySelector('form').submit();

    expect(el.querySelector('input').value).toBe("");
  });

  it('shows result in history block', () => {
    createCalculatorUI(el);
    const expressions = ['1+1', '2*2', '3/3'];

    calculateResult.mockImplementation((expr) => `Result for "${expr}"`);

    expressions.forEach((expr) => {
      el.querySelector('input').value = expr;
      el.querySelector('form').submit();
    });

    const historyEl = el.querySelector('.history');

    console.log(historyEl.innerHTML);
    expressions.forEach((expr) => {
      expect(calculateResult).toHaveBeenCalledWith(expr);
      expect(historyEl.innerHTML.includes(`${expr} = Result for "${expr}"`)).toBe(true);
    });
  });
});

 -->

[Практика](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/lesson05/lessons/lesson05/code/uicalc)

<!-- v -->

## Вопросы?

<!-- v -->

**Задача**: Выбор случайного значения

- Вывести на экран элемент `textarea`, который позволяет ввести многострочный текст, и кнопку.

- По нажатию на кнопку нужно вывести `alert` случайную строку из `textarea`. При этом пустые и пробельные строки игнорируются. Если поле ввода пустое - показать сообщение _"Please provide at least 1 option"_.

Какие тесты нужны для написания программы? Практика TDD.

<!-- s -->

## Дополнительные материалы

<!-- v -->

1. [YT: Разработка через тестирование в JS или как начать любить программирование](https://www.youtube.com/watch?v=xzKwp3nf5KE)
2. [Jest - Начало работы (Весь блок `Introduction` в документации)](https://jestjs.io/docs/ru/getting-started)
3. [Мои «Ого, я этого не знал!» моменты с Jest](https://habr.com/ru/company/otus/blog/457616/)
4. Дополнительное занятие #2 в ЛК ([и репозиторий к нему](https://github.com/otus-js-student/js--game-of-life))
5. [YT: Jest. Unit Тестирование в JavaScript](https://www.youtube.com/watch?v=IEDe8jl5efU)
6. [JavaScript & Node.js testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
7. [Автоматизированное тестирование (в контексте разных языков, обзорно)](https://gist.github.com/codedokode/a455bde7d0748c0a351a)

<!-- v -->

#### Вопросы для самопроверки

<!-- v -->

1. Из каких шагов состоит автоматизированный тест?

2. Самые популярные 5 тестовых фреймворков для Javascript?

3. Для чего нужны моки и стабы?

4. Что такое spy-функции?

5. Что такое пирамида тестирования?

<!-- v  -->

6. Что лучше - e2e или unit тест?

7. Что такое "чистая" функция?

8. Что такое "внедрение зависимостей"?

9. Как запустить jest в режиме наблюдения?

10. Какие хуки для тестовых наборов поддерживаются jest?

<!-- v -->

11. Какие есть формы написания асинхронных тестов в jest?

12. Что такое jsdom?

13. Чем `describe` отличается от `it` ?

<!-- v -->

### Вопросы?

<!-- s -->

Опрос о занятии
