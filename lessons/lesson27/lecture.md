---
title: Занятие 27
description: Расширенные возможности типизации
---

# OTUS

## Javascript Basic

<!-- v -->

### Вопросы?

<!-- s -->

### Расширенные возможности типизации

<!-- s -->

### Обобщённые типы (Generics)

<!-- v -->

Задача - типизировать функцию, которая возвращает такой же тип, как и тип принимаемого значения. Простейший вариант - функция [id](https://en.wikipedia.org/wiki/Identity_function), которая принимает параметр любого типа и возвращает переданный аргумент.

```ts [1-10]
function id(x) {
  return x;
}
```

<!-- v -->

В голову могут придти перегрузки

```ts [1-10]
function id(x: number): number;
function id(x: string): string;
function id(x: boolean): boolean;
function id(x: any): any {
  return x;
}
```

Но таким образом мы все равно не сможем описать все (бесконечное) множество типов. Плюс это достаточно многословно

<!-- v -->

Вариант с `any` не подходит, потому что он позволяет принять любой тип аргумента, но теряет указание типа возвращаемого значения

```ts [1-10]
function id(x: any): any {
  return x;
}

const x1: number = 1;
const x2: string = id(x1); // <--- вот такого мы хотим избежать
```

<!-- v -->

Тут на сцену выходят обобщения. Обобщением (generic) можно считать тип, который имеет в своем составе один или несколько переменных типов.

Примером может быть тип:

```ts
type TypedValue<T> = {
  value: T;
};
```

здесь у нас есть переменный тип `T`, который и позволяет задать обобщение

<!-- v -->

[Примером использования такого типа может быть](https://www.typescriptlang.org/play?#code/C4TwDgpgBAKuEBMBqBDANgVwgHhgPigF4oBvAKCigDd0sAuWMgXzLNEigDkMBbAIwgAnVJmjE4kZLRwA7XgMF4A3KwDGAexkBnYFAAedbvyEisRUhWrSGARgBMAZgAszNZp1QQDCYlM4dggCWMgDmBMTklDSiDADk9s6xzEpAA)

```ts [1-10]
type NumberValue = TypedValue<number>;

const x: NumberValue = {
  value: 1234,
};

const y: TypedValue<string> = {
  value: "1234",
};
```

Т.е. вместо определения n-разных типов, мы фактически создали тип, который принимает один, или несколько параметров.

<!-- v -->

[Возвращаясь к нашему примеру с `id`](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDAJgHgCoD4AUAPALkQwEoiNEBvAKEUQCcBTKEepPAbmoF9rqIEAZyiI8ARiLD6MMAHNEAXkQByMQCYAzABZlXAPR7EAsMNFqiYEAFsARo3qLk6KTNm5xJDojQBaP4kABEEBWEEB2EEBhEEBuEEAZEEAhEEAGEBjAuMBGEEA+EBjAaRBEZLDAFhAgxMBBEBiA1MAuEFTAThBqAyMhETwNC2s7ByVUNEtbe3cxT28-H0QYwA4QQH4QRDiAwGYQMMAeECDAXhB4xEWgxDHU3MBREC2RmP560S1HVHw+r1rfIYwATwAHRkEIaXuRTcRAJhBUkLnUwDYQRapYojDYZeIFQqAeRAvhlPkEQcNxohCnE-sVUlCYkFokCgA)

```ts [1-30]
function id<T>(x: T): T {
  return x;
}

const x1: string = "1234";
// const x2: number = id<string>(x1); <--- результат работы будет строкой
// const x3: number = id<number>(x1); <--- тип аргумента не подходит
const x4 = id(x1); // <-- Typescript по возможности пытается вывести тип самостоятельно
```

Таким образом мы создали тип generic функции

<!-- v -->

При этом мы в обобщенных типах [можем использовать несколько параметров, значения параметров](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=14&pc=3#code/C4TwDgpgBAShAmBXAHgQQMbAJYHsB2APACrgQA0UACgIYgA2O18UAvFNXiAHytQDeAKChRQkAFxQSkMkKhhaDJhJr1G8AQF8A3AIHp8AZ2BQGAcxyJgEuEjSZchAORmLwRxSMAnLHlM82gsKiEBLOOOaW7lAA9NFQBAC0CVCAgiCAciCALCCADCBQgDwggHwggGwggKwggEIgUID8IPkVWSmlgDIgUKX5gNwg9YBcIPlQAAYult2y8qpKUI4AZtRYdAhQnhAAjogQRo4xcYlJUDnp2XlFZZXVtQ1NrR1ddYACIPntWZo6eobGZj7WCCgY2PgEYaY+jv5+LJgqEXngorF4psdjkCiVylUanVGs02p0emCBsIhop4BIAExrKGbbaZHKAcRBmlBAMIggGYQfKAXhB8vcgA) по умолчанию и еще некоторые примеры.

```ts [1-30]
type ReduxAction<Type, Payload = any> = {
  type: Type;
  payload: Payload;
};

const logout: ReduxAction<"logout", string> = {
  type: "logout", // <-- сюда может попасть только `logout`
  payload: "failed request", // <--- а сюда может попасть только строка
};

const login: ReduxAction<"login"> = {
  type: "login", // <-- сюда может попасть только `login`
  payload: 2, // <--- а сюда что угоно
};
```

<!-- v -->

Вопросы?

<!-- s -->

### Условные Типы (Conditional Types)

<!-- v -->

[Условные типы (Conditional Types)](<https://nauchikus.gitlab.io/typescript-definitive-guide/book/contents/%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5%20%D1%82%D0%B8%D0%BF%D1%8B%20(Conditional%20Types).html>), это типы способные принимать одно из двух значений, основываясь на выражении,в котором устанавливается принадлежность к заданному типу данных. Условные типы семантически схожи с тернарным оператором.

<!-- eslint-skip -->

```ts
T extends U ? T1 : T2
```

<!-- v -->

Сам по себе этот прием имеет не много смысла, но он играет новыми красками, [если его применяют в Generic](https://www.typescriptlang.org/play?ssl=10&ssc=34&pln=1&pc=1#code/GYVwdgxgLglg9mABGEBbAkgEwDwAUCGATvqgCoCeADgKYA0iAStQM4gA2UFNiAvIgcTJVqiagA8o1MJmbI0AI2qFEAfjmpFygFyJmUQjDABzAHwAKMSp0CSXagEodTVhzsBuAFChIsBOqwWVoj4YOT2iADeHoiIMMCIFrw8fOCY1MCG1JjhUTExhNRQIIRIAOS4bNT4zCKU1bJ1gqWeMQC+0YgFRSWIYp7tHhAIesG8-phm9m55APQziNgAtIu6+oZGg8NQiPJjKBgTAIxTiHMLy+qaQA)

```ts [1-30]
function numId<
  ParamType,
  ResultType = ParamType extends number ? number : string
>(x?: ParamType): ResultType;
function numId(x?: any) {
  if (x === undefined) {
    return "Please pass param";
  }
  return x;
}

const a = numId(); // <-- string
const b = numId(1); // <-- number
```

<!-- v -->

Вопросы?

<!-- v -->

Более навороченным вариантом условных типов являются типы, созданные с помощью ключевого слова `infer`.

[`infer` позволяет задать переменный тип](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types), который должен быть веден (а не задан, как обычно в generic)

```ts [1-30]
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

<!-- v -->

Другой пример использования `infer`:

```ts [1-30]
type Unpromisify<T> = T extends Promise<infer R> ? R : T;
```

<!-- v -->

Типы с использованием `infer` не пишутся рядовыми разработчиками каждый день. Но знать про такую штуку полезно.

<!-- v -->

Вопросы?

<!-- s -->

### Типы россыпью

<!-- v -->

Оператор `keyof`

Позволяет получить тип, описывающий ключи объектного типа

```ts [1-30]
type Point = { x: number; y: number };
type P = keyof Point; // 'x' | 'y'

const a: P = "x";
const b: P = "y";
// const c: P = 'z';
```

<!-- v -->

Оператор `typeof`

Позволяет получить тип выражения. [Используется в выражениях (например в параметре обобщений), для получения типа переменной.](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=11&pc=59#code/DYUwLgBAzhC8ECIAWJjAPYINwCgekgEMAuCMATwAcR0AzaOCAcgCF0AjJ3Aem4gIjtSFanQbwAjACYAzFgiBeEECsIBECCIID4QQEwggfhBADCCAWECULAHCArt6iICEQY3sA8IHhy0ArgDsAxmACW6FxFoAKAEoIAG8cCAgAJ3AnSN8QiAAPUgkABgAaCHJSGQgAX1w8nF4yKhAIAAVGACUYuIAVMoAeWgA+eXpVVUBpEEBuEF0lS1VAeRBFXQhAdhAFXUBxECNTCHHlMasbHBFyqvhasFiXRuomjbE2+RKE5IgXJwBbdhBIzOyr2-vI-KA)

```ts [1-30]
let s = "hello";

let a: typeof s = "Bob";
// let b: typeof s = 123; не совпадение по типам

function f() {
  return { x: 10, y: 3 };
}
// type P = ReturnType<f>; f ссылается на значение а не на тип
type P = ReturnType<typeof f>; // { x: number, y: number }
```

<!-- v -->

Индексированные типы доступа

[Позволяют определить тип полей на объектных типах](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=10&pc=36#code/C4TwDgpgBAChBOBnA9gOygXigbygQwHMIAuKVAVwFsAjBAbjL0pKkWHgEtUCG8AbDgDcW1ZMj4Q86AL50AUKEhQAgkUywEKVAG0ARIQi6AuvLkBjNGygBZEMvjw8IddrlQcjZqV3KBZwwA0+ESkAIwArFDSAW4eqEwsugBCyNS6QQakAEwAzFEx7rjxXlC6AKLC6cEsOQAc+XImcgrg0ACqiAjqihDIAGY2dg5O2hQ0CCZAA)

```ts [1-30]
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type User = typeof MyArray[number];
```

<!-- v -->

[Mapped типы](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) позволяют [вносить ограничения на ключи объектных типов](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=14&pc=2#code/C4TwDgpgBAYhCGwCuAnCMA28DmBnKAvFAN4BQUUAJvCgNYCyA9pRAFxQAUAlIQHxQA3RgEtKAbnJQAdhADuAVVwQUABRSMAZsIxtOPAvyGiJAXwmlQkKAHkwwYYym5MOXAB4AKuAj8iZCgDaaoyQKKBQwlJQtBAgmlBekAC67ABGjIw68FKm5gDGjrjAUCH2hey2ZU4ueG5wiKjoWHi+JJLUdEws7MAoSBAANJIyCkqq6lo67BrwGEpDFAD0ixRQAB4b07NKUG4AtHtQgOwggAwgUID8IIACIICsIIAsINeA3CAngDwggBwgUIBCIK-nJwNQgHwggGYQS4nQC8IK9AOIgr0ATCAnQByIIBJEGugP+UEAXCAPOFQ0gmIA)

```ts [1-30]
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

const options: OptionsFlags<FeatureFlags> = {
  darkMode: true,
  newUserProfile: false,
  //   xxx: false <-- за пределами типа, ограничивающего ключи
};
```

<!-- v -->

Нужно отметить, что в mapped типах `keyof` подхватывает не только имя свойства, но и его параметры (readonly/optional). [Специальными конструкциями на такие модификаторы можно влиять/изменять](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers).

<!-- v -->

Template Literal Types

Появились в версии 4 и позволяют делать вот такие вещи

```ts [1-30]
type World = "world";

type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
```

<!-- v -->

Вопросы?

<!-- s -->

[Type Guards и распознавание типов](https://www.typescriptlang.org/docs/handbook/advanced-types.html#nullable-types)

<!-- v -->

```ts [1-30]
function getObj() {
  return Math.random() > 0.5
    ? {
        name: "Bob" as const,
        drink: () => "beer",
      }
    : {
        name: "Alica" as const,
        rest: () => "dance",
      };
}

const obj = getObj();

// obj.rest()
// obj.drink()

if (obj.name === "Bob") {
  obj.drink();
} else {
  obj.rest();
}
```

<!-- v -->

Другие варианты:

<!-- v -->

```ts [1-30]
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

<!-- v -->

```ts [1-30]
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

<!-- v -->

Проверки на null/undefined аналогичны тем, что мы делаем в Javascript

<!-- v -->

[Пользовательские type guard / предикаты типов](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=10&pc=2#code/GYVwdgxgLglg9mABDAzgORAWwEYFMBOAFAB4BciAhmAJ4CU5xyKiYWe+iA3gFCJ+L5cUEPiRR8IXNwC+3bgBshiZgF5EAcgCMAJgDMAFnUBuBUrIs2BE9xjBEhVBhwFCKWrS69+jNShPSgA)

```ts [1-30]
function isFish(pet: Fish | Bird): pet is Fish {
  // никакая логика внутри такой фукнции не проверяется!!!
  // если вы допустите тут ошибку - она пойдет по типам дальше
  return (pet as Fish).swim !== undefined;
}
```

<!-- v -->

Вопросы?

<!-- s -->

[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

<!-- v -->

Мы уже посмотрели приемы, как можно писать вспомогательные типы, основываясь на других типах. В настоящее время, [вместе с Typescript](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1471) идет достаточное количество служебных типов, которые сильно упрощают работу.

<!-- v -->

- `Partial<Type>` / `Required<Type>` - позволяет делать поля обязательными или не обязательными
- `Readonly<Type>` - помечает все поля readonly
- `Record<Keys,Type>` - упрощает создание mapped типа, если все ключи однотипные
- `Pick<Type, Keys>` / `Omit<Type, Keys>` - создает подтип на основе существующего
- `Exclude<Type, ExcludedUnion>` / `Extract<Type, Union>` - создает перечисление на основе существующего
- `ReturnType<Type>` - выделяет тип возвращаемого значения функции
- `Uppercase<StringType>` / `Lowercase<StringType>` / `Capitalize<StringType>` - строковые вспомогательные типы

<!-- v -->

Это не полный список, просто одни из самых часто используемых. С новыми релизами могут добавляться новые вспомогательные типы.

<!-- v -->

Кроме того, такие типы можно найти на Github / Stackoveflow / в разных статьях. Иногда вы просто можете не знать, что проблема может быть решена с помощью типов, поэтому полезно читать и смотреть вокруг.

<!-- v -->

Кроме того:

- [utility-types](https://github.com/piotrwitek/utility-types) - "lodash" for static types
- [Type Zoo](https://github.com/pelotom/type-zoo) - many other useful operators have been demonstrated in GitHub issue comments and elsewhere
- [type-fest](https://github.com/sindresorhus/type-fest) - A collection of essential TypeScript types
- [tsdef](https://github.com/joonhocho/tsdef) - common patterns shortcuts definitions snippets utility gist library
- [ts-toolbelt](https://github.com/millsp/ts-toolbelt) - the largest, and most tested type library available right now, featuring +200 utilities
- [Tiny Types](https://github.com/jan-molak/tiny-types) - to give domain meaning to primitive types (номинальные типы)

<!-- v -->

Вопросы?

<!-- s -->

Тестирование типов

<!-- v -->

Вообще как я говорил, проверка того, что типы работают корректно - проект собирается (ну или проходит транспиляция с `--noEmit`).

Но есть проект [tsd](https://github.com/SamVerschueren/tsd) который позволяет писать тесты, на создаваемые типы. Пример таких тестов, можно посмотреть, например, [тут](https://github.com/tj/commander.js/blob/master/typings/index.test-d.ts) или [тут](https://github.com/fastify/secure-json-parse/blob/master/index.test-d.ts)

<!-- s -->

Домашнее задание

<!-- v -->

Необходимо

- создать новый репозиторий
- настроить в нем линтеры, typescript, проверки и pipelines
- добавить в команды package.json команду на проверку валидности TS
- решить задачи на типы (заменить FIXME на реальные типы с использованием utility types/generics, чтобы код компилировался)
- сбросить ссылку на пуллреквест в чат с преподавателем

Задания можно найти здесь https://gist.github.com/vvscode/8b60049bc335bbc52a4c363f92820956

<!-- v -->

Вопросы?

<!-- s -->

Дополнительные материалы:

- [TypeScript: Обобщённые типы](https://canonium.com/articles/typescript-generics/)
- [Обобщенные типы и классы. Документация TypeScript](http://typescript-lang.ru/docs/Generics.html)
- [Typescript: Объединение типов в глубину](https://habr.com/ru/post/526998/)
- [Продвинутые дженерики в TypeScript — Александр Николаичев](https://www.youtube.com/watch?v=YDTZpQrBXjc)
- [PiterJS #53: разработка тайпскриптовых типов через тестирование](https://www.youtube.com/watch?v=KSzZnw7upqM)
- [Advanced Typed Get](https://habr.com/ru/post/556538/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
