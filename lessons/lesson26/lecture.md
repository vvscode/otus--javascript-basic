---
title: Занятие 26
description: «Разбор базовых приемов разработки на Typescript - типы, интерфейсы, перечисления и прочее»
---

# OTUS

## Javascript Basic

<!-- v -->

### Вопросы?

<!-- s -->

### Разбор базовых приемов разработки на Typescript

<!-- s -->

### Типы и интерфейсы

<!-- v -->

Базовые типы:

- string
- number
- boolean
- void
- unknown
- symbol
- any
- null / undefined
- never

<!-- v -->

Базовые типы:

- array
- tuple (кортеж)
- enum
- object
- function

<!-- v -->

Литеральные типы

```ts [1-30]
type Yes = "yes";
type Zero = 0;
```

<!-- v -->

Литеральные типы

```ts [1-30]
type Yes = "yes";
let answer: Yes = "no"; // ERROR Type '"no"' is not assignable to type '"yes"'

type Zero = 0;
let result: Zero = 1; // ERROR Type '1' is not assignable to type '0'
```

<!-- v -->

Массивы  
_между этими вариантами нет разницы_

- `number[]`
- `Array<number>`

<!-- v -->

Явные/Неявные типы  
_их поведение не отличается_

```ts [1-30]
let a = 1; // implicit
a = "one"; // ERROR Type 'string' is not assignable to type 'number'

let b: number = 1;
b = "one"; // ERROR Type 'string' is not assignable to type 'number'
```

<!-- v -->

Object types

```ts [1-30]
type Coord = {
  x: number;
  y: number;
};
```

<!-- v -->

Object types

```ts [1-30]
type Coord = { x: number; y: number };

type Square = {
  leftTop: Coord;
  rightBottom: Coord;
};
```

<!-- v -->

Не обязательные поля обозначают `?`

```ts [1-30]
type Coord = {
  x: number;
  y: number;
  timestamp?: number;
};
```

<!-- v -->

Типы для функций

```ts [1-30]
function getNameLength(name: string): number {
  return name ? name.length : 0;
}

// опциональные параметры помечаются `?`
function getOptionalNameLength(name?: string): number {
  return name ? name.length : 0;
}
```

<!-- v -->

Декларация функций

```ts [1-30]
let cb1: Function = (a: number) => a * 2;

let cb2: (a: number) => number = (a) => a * 2;

// Тип можно сужать
let cb3: (a: number) => number = () => 2;

// Но нельзя расширять
// ERROR Type '(a: number) => number' is not assignable to type '() => number'.
let cb4: () => number = (a: number) => a * 2;
```

<!-- v -->

Декларация функций  
_типизация контекста_

```ts [1-30]
// возможность задать тип для контекста
function x(this: number[], a: number) {
  return this.includes(a);
}
```

<!-- v -->

Т.к. Javascript это язык с динамической типизацией, TS для поддержки всего многообразия поддерживает перегрузку функций (и методов).

Мы можем объявить несколько сигнатур, и одну реализацию (которая должна учитывать все сигнатуры).

```ts [1-30]
function sum(a: string, b: string): string;
function sum(a: number, b: number): number;
function sum(a: any, b: any) {
  return a + b;
}

const x = sum(1, 2);
const y = sum("a", "b");
```

<!-- v -->

Мы можем использовать тут generic. Но **не можем** использовать сигнатуру реализации `number|string`

```ts [1-30]
function sum(a: number | string, b: number | string) {
  return a + b;
}
```

Понятно ли почему?

<!-- v -->

### Вопросы?

<!-- v -->

**Приведение типов**

Иногда вы знаете про тип больше, чем знает Typescript. Например - вы точно знаете про значение, которое относится к более широкому типу. Чтобы указать больше конкретики вы можете использовать ключевое слово `as`.

```ts [1-30]
let someData: any = "1234";

let id: string | number | null = someData;

// id.length <--
(id as string).length;
```

<!-- v -->

Подобным образом мы уже действовали, когда делали

```ts [1-30]
const el = document.querySelector("#app") as HTMLElement;
```

<!-- v -->

У вас есть возможность объявлять объекты неизменяемыми c помощью `as const`.

```ts [1-30]
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
} as const;
```

<!-- v -->

```ts [1-30]
// с помощью магии можно сделать тип readonly на любую глубину
type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
```

<!-- v -->

### Вопросы?

<!-- v -->

[Еще немного базовых типов:](https://www.typescriptlang.org/docs/handbook/basic-types.html#unknown)

- `any` - любой тип (отключает проверки typescript)
- `never` - тип который никогда не встречается _(является подтипом любого типа, однако ни один тип не является его подтипом)_
- `unknown` - любой тип, о котором мы не знаем (обычно касается динамических данных, может сужаться к любому типу явным приведением)
- `void` - отсутствие типа

<!-- v -->

В паре с приведением это позволяет делать например `force cast`.

```ts [1-30]
const a = 1 as unknown as string;
console.log(a.length); // что будет в консоли?
```

Бывает полезно в тестах. В рабочем коде лучше использовать [пользовательские type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

<!-- v -->

Более сложный пример с дженериком

```ts [1-30]
function castTo<T>(x: unknown) {
  return x as T;
}

let x: string = castTo<string>(123);
console.log(x.length);
```

Бывает полезно в тестах. В рабочем коде лучше использовать [пользовательские type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

<!-- v -->

Кортежи (типизированные списки)

позволяет определить список с фиксированным размером и известными типами элементов

```ts [1-30]
type Coord = [number, number];
```

<!-- v -->

[Типы-объединения](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

```ts [1-30]
type Id = number | string;

// Вместе с литеральными типами
type Direction = "left" | "right" | "up" | "down";
```

<!-- v -->

[Перечисления](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)

```ts [1-30]
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

<!-- v -->

```ts [1-30]
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

<!-- v -->

```ts [1-30]
enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}
```

<!-- v -->

По умолчанию поддерживают [reverse mapping](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings).

Для отключения транспиляции в JS [используют `const enums`](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)

<!-- v -->

[Номинальные типы данных](https://ru.qaz.wiki/wiki/Nominal_type_system)

- это подход, когда [сравнение типов делается на основе имени](<https://typescript-definitive-guide.ru/book/chapters/Sovmestimost_tipov_na_osnove_vida_tipizacii#Nominativnaya_Tipizaciya_(nominative_typing)>).

В Typescript принята [структурная типизация](<https://typescript-definitive-guide.ru/book/chapters/Sovmestimost_tipov_na_osnove_vida_tipizacii#Strukturnaya_Tipizaciya_(structural_typing)>)

<!-- v -->

```ts [1-30]
type UserId = number | string;
type BookId = number | string;

const bobId: UserId = 3;
const bibleId: BookId = bobId; // <-- иногда мы хотим это исключить
```

<!-- v -->

В Typescript нет номинальных типов, но [их можно создать](https://basarat.gitbook.io/typescript/main-1/nominaltyping).

```ts [1-30]
type BrandedType<BaseType, BrandName extends string> = BaseType & {
  _: BrandName;
};

type Id = number | string;
type UserId = BrandedType<Id, "user">;
type BookId = BrandedType<Id, "book">;

let bobId: UserId = 5 as UserId;
let bookId: BookId = bobId;
```

<!-- v -->

### Вопросы?

<!-- v -->

[Типы и интерфейсы](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)

- Почти все возможности интерфейсов доступны с типами (type aliases)
- **Типы не могут наследовать другие типы, а интерфейс может наследовать другой тип или интерфейс, добавляя, таким образом, новые свойства**
- [Типы не могут декларативно объединяться, а интерфейсы могут](https://www.typescriptlang.org/play?#code/PTAEEEDtQS0gXApgJwGYEMDGjSfdAIx2UQFoB7AB0UkQBMAoEUfO0Wgd1ADd0AbAK6IAzizp16ALgYM4SNFhwBZdAFtV-UAG8GoPaADmNAcMmhh8ZHAMMAvjLkoM2UCvWad+0ARL0A-GYWVpA29gyY5JAWLJAwGnxmbvGgALzauvpGkCZmAEQAjABMAMwALLkANBl6zABi6DB8okR4Jjg+iPSgABboovDk3jjo5pbW1d6+dGb5djLwAJ7UoABKiJTwjThpnpnGpqPBoTLMAJrkArj4kOTwYmycPOhW6AR8IrDQ8N04wmo4HHQCwYi2Waw2W1S6S8HX8gTGITsQA)
- Поскольку интерфейсы больше похожи на поведение объектов в Javascript, **рекомендуется отдавать предпочтение интерфейсам**
- Типы подходят, если вы не можете выразить какую-то форму с помощью интерфейса или вам нужны кортежи или объединения

<!-- v -->

```ts [1-30]
// пример определения функции через интерфейс
interface Double {
  (a: number): number;
}

const double: Double = (x) => x * 2;
```

<!-- v -->

```ts [1-30]
// пример наследования интерфейсов
interface Human {
  name: string;
  email: string;
}

interface Student extends Base {
  averageRate: number;
}

const kotov: Student = {
  name: "Василий Котов",
  email: "kotov@gmail.com",
  averageRate: 4.6,
};
```

<!-- v -->

<a href="https://cqx92skly5b.typeform.com/to/mrwZgwbc" target="_blank">ОПРОС</a>
<a href="https://admin.typeform.com/form/mrwZgwbc/results#insights" target="_blank"><img src="./images/mrbean.jpg"></a><br>

<!-- s -->

Дополнительные материалы:

- [Номинативная типизация в TypeScript или как защитить свой интерфейс от чужих идентификаторов](https://habr.com/ru/post/446768/)
- [Typescript Глубокое Погружение](https://igorfonin.gitbook.io/typescript-book-ru/) ([ссылки на скачивание](https://github.com/etroynov/typescript-book))
- [TypeScript крупным планом](https://typescript-definitive-guide.ru/)
- [Перевод официальной документации Typescript на русский](http://typescript-lang.ru/docs/) _(немного устаревшая, но удобная для чтения)_
- Шпаргалки по Typescript - [1](https://devhints.io/typescript) и [2](https://www.sitepen.com/blog/typescript-cheat-sheet)
