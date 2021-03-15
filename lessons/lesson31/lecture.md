---
title: Занятие 31
description: Разработка шаблонизатора
---

# OTUS

## Javascript Basic

<!-- v -->

## Вопросы?

<!-- s -->

## Разработка шаблонизатора

<!-- s -->

### Сначала разберемся с понятием и задачей

<!-- v -->

**Шаблонизатор** - инструмент, позволяющий развязать данные и их представление. Чаще всего служит для генерации строк на базе шаблона и набора данных.

Фактически он позволяет один раз задать представление, и потом применять это задание для разных данных (получая однотипную разметку).

<!-- v -->

При этом [разные инструменты определяют разный синтаксис](https://proglib.io/p/templating-languages-and-engines/) для подстановки данных и описания логики представления.

<!-- v -->

Пример разметки

```html [1-30]
<p>Hello, my name is Bob. I am from NY. I have 2 kids:</p>
<ul>
  <li>Sam is 8</li>
  <li>Alice is 3</li>
</ul>
```

<!-- v -->

Пример шаблона с использованием [handlebars](https://handlebarsjs.com/)

```html [1-30]
<p>
  Hello, my name is {{name}}. I am from {{hometown}}. I have {{kids.length}}
  kids:
</p>
<ul>
  {{#kids}}
  <li>{{name}} is {{age}}</li>
  {{/kids}}
</ul>
```

<!-- v -->

Пример шаблона с использованием [lodash.template](https://lodash.com/docs/4.17.15#template)

```html [1-30]
<p>
  Hello, my name is <%= name %>. I am from <%= hometown %>. I have <%=
  kids.length %> kids:
</p>
<ul>
  <% _.forEach(kids, function(kid) { %>
  <li><%= kid.name %> is <%= kid.age %></li>
  <% }); %>
</ul>
```

<!-- v -->

```js [1-30]
// Пример использования шаблона
const template = `<p>Hello, my name is <%- name %>. I am from <%- hometown %>. I have  <%- kids.length %> kids:</p>
<ul>
  <% _.forEach(kids, function(kid) { %>
    <li><%- kid.name %> is <%- kid.age %></li>
  <% }); %>
</ul>`;
const data = {
  name: "Bob",
  hometown: "NY",
  kids: [
    { name: "Sam", age: 8 },
    { name: "Alice", age: 3 },
  ],
};

document.body.innerHTML = _.template(template)(data);
```

<!-- v -->

### Вопросы?

<!-- s -->

### Что умеют шаблонизаторы

<!-- v -->

- **подстановку данных**
- логика представления (условный рендеринг, циклы)
- вызов вспомогательных функций
- подстановка под-шаблонов (компонентов), в т.ч. с параметрами
- если шаблонизатор отвечает за рендеринг - навешивание обработчиков и обновление представления

<!-- v -->

## Какой интерфейс имеют шаблонизаторы

<!-- v -->

```ts [1-10]
// Могут быть разные варианты
// В целом ключевыми параметрами являются
// - строка шаблона
// - набор данных для рендеринга
// - дополнительные параметры
function template(tpl: string, options: any): string;

function template2(tpl: string, options: any): (data: any) => string;

function render(el: HTMLElement, tpl: string, options: any): void;
```

<!-- v -->

По типу шаблонизаторы можно разделить:

- строковые - работают с шаблоном как со строкой
- [синтаксические](https://astexplorer.net/#/gist/ffd5358850aefdc96cdec7bcd3a11191/25bbb9e0a4fddead3ce4834957589d0c72fb43e3) - парсят шаблон в промежуточную структуру ([AST](https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D0%BE%D0%B5_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE))

<!-- v -->

## Зачем вообще нужны шаблонизаторы в Javascript?

<!-- v -->

В Javascript уже есть [шаблонные строки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals)

```js [1-30]
const data = { name: "Bob", age: 23 };

console.log(`Hi, my name is ${name}. I'm ${age} years old`);

// но они привязаны к данным
```

<!-- v -->

Чтобы использовать их с разными данными мы могли бы сделать

```js [1-30]
function render(data) {
  return `Hi, my name is ${name}. I'm ${age} years old`;
}

console.log(render({ name: "Bob", age: 23 }));
console.log(render({ name: "Sam", age: 19 }));

// Но это не решает вопрос с динамическим заданием шаблона
// Когда строку шаблона мы хотели бы задавать на лету
```

<!-- v -->

[А помните такое?](https://learn.javascript.ru/new-function)

```js [1-30]
let tpl = "`${data.name}!`";

function compileTemplate(tpl, data) {
  return new Function("data", "return " + tpl);
}

const template = compileTemplate(tpl);

console.log(template({ name: "Bob" }));
```

<!-- v -->

Но у этого подхода есть несколько моментов

- безопасность (см. [тут](https://2ality.com/2014/01/eval.html) и [тут](https://stackoverflow.com/questions/18060696/security-considerations-using-new-function-during-rendertime-expression))
- [нет возможности пробросить дополнительный функционал через замыкание](https://learn.javascript.ru/new-function#itogo)
- нужно знать синтаксис javascript

А еще, шаблонные строки появились только в ES6.

<!-- v -->

## Вопросы?

<!-- v -->

В целом примитивную подстановку данных можно сделать просто на строковых функциях:

```js [1-30]
function primitiveTemplate(tpl, data) {
  Object.entries(data).forEach(
    ([key, value]) => (tpl = tpl.replace(`<_${key}_>`, value))
  );
  return tpl;
}

console.log(
  primitiveTemplate("Hi, I am <_name_>. I am <_age_> years old", {
    name: "Bob",
    age: 22,
  })
);
```

<!-- v -->

```js [1-30]
console.log(
  primitiveTemplate(
    "Hi, I am <_name_>. I am <_age_> years old. And all these years I am <_name_>",
    { name: "Bob", age: 22 }
  )
); // ?
```

Поэтому помним про [чтение](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/replace) [документации](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

<!-- v -->

## Вопросы?

<!-- s -->

### Строковые шаблонизаторы

<!-- v -->

Строковые шаблонизаторы строятся на манипуляциях со строками и работе со строковыми функциями и регулярными выражениями.

<!-- v -->

[Где объявлены методы строк?](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String)

<!-- v -->

Сильно упростить (а иногда и усложнить) работу со строками могут [регулярные выражения](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions)

<!-- v -->

[**Регулярные выражения (англ. regular expressions)**](https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D1%8B%D0%B5_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F) — язык поиска и манипуляций с подстроками в тексте, основанный на использовании специальных меток (англ. wildcard characters). Для поиска используется строка-образец (англ. pattern, по-русски её часто называют «шаблоном», «маской»), состоящая из символов и метасимволов и задающая правило поиска.

<!-- v -->

Основные метки

- `^` начало строки
- `$` конец строки
- `.` любой символ
- `\s` любой пробельный символ
- `\S` любой НЕ пробельный символ
- `\w` любой буквенно-цифровой символ
- `\W` любой НЕ буквенно-цифровой символ
- `\d` любая цифра
- `\D` любой символ НЕ цифра
- `+` от одного символа и больше
- `*` от нуля символов и больше
- `{1, 2}`, `{3,}` число повторений символов
- `?` ни одного или один символ

<!-- v -->

Сочетания меток

- `[a-z0-9]` любой символ от `a` до `z` или цифра от 0 до 9
- `a|b` - или `a` или `b`
- `[0-9]{4}` - 4 цифры
- `+?7?\d{8}` - маска телефона

<!-- v -->

Особенно в начале рекомендую держать под рукой шпаргалки вроде [такой](https://medium.com/nuances-of-programming/%D1%88%D0%BF%D0%B0%D1%80%D0%B3%D0%B0%D0%BB%D0%BA%D0%B0-%D0%BF%D0%BE-%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D1%8B%D0%BC-%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC-%D0%B2-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D0%B0%D1%85-53820a5f3435) или [такой](https://www.exlab.net/files/tools/sheets/regexp/regexp.pdf).

И рекомендую вложить время в книгу [`Бен Форта. Регулярные выражения за 10 минут`](https://rutracker.org/forum/viewtopic.php?t=3828631).

<!-- v -->

Напишите маску, которая соответствует [дате](https://www.regular-expressions.info/dates.html#:~:text=To%20match%20a%20date%20in,%5D)%5B%2D%20%2F.%5D) в формате `15.03.2021`

<!-- v -->

Регулярные выражения можно задавать как литералы - `/^j[aciprsv]{8}t$/`

Или с помощью конструктора [RegExp](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp) - `new RegExp('/^j[aciprsv]{8}t$/')`

<!-- v -->

Регулярные выражения обладают своим набором методов, вроде [`test`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) или [`exec`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

[Также используются в строковых методах как аргумент](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions#%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0_%D1%81_%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D1%8B%D0%BC%D0%B8_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8).

<!-- v -->

## Вопросы?

<!-- s -->

[Практика](https://codesandbox.io/s/github/vvscode/otus--javascript-basic/tree/master/lessons/lesson31/code/templatePractice)

Написать шаблонизатор, который поддерживает подстановку данных. Использовать регулярные выражения.

<!-- v -->

## Вопросы?

<!-- s -->

### Домашнее задание

<!-- v -->

Разработать собственный шаблонизатор, который должен поддерживать:

- подстановку данных
- условный рендеринг
- работу со списками
- поддерживать дополнительные переменные в циклах (`index`, `isFirst`, `isLast` etc.)

<!-- v -->

Пример шаблона для шаблонизатора:

```html
<!-- Пример шаблона -->
<h2>{{title}}</h2>
{{if author}}
<h3>{{author}}</h3>
{{endif}}
<div class="tags">
  {{for tags as item}}
  <a class="tag" href="#tag{{item.id}}"> {{item.title}} </a>
  {{if notIsLastElement}}, {{endif}}
</div>
```

<!-- v -->

Применить разработанный шаблонизатор к проекту "Прогноз погоды".

<!-- v -->

Отмечу

- это отдельное задание и отдельный PR в проекте с погодой
- условия по покрытию тестами остаются те же (60% минимум)
- шаблонизатор не покрытый тестами не принимается

<!-- v -->

# Вопросы?

<!-- s -->

Дополнительные материалы:

- [YT: Шаблонизаторы - Сергей Пузанков](https://www.youtube.com/watch?v=rBCwulebs9U)
- [Эволюция шаблонных систем для JavaScript](https://learn.javascript.ru/templates)
- [Регулярные выражения](https://learn.javascript.ru/regular-expressions)
- [JS Загрузчик + шаблонизатор или история очередного велика](https://habr.com/ru/post/282041/)
- [Front-end шаблонизатор](https://habr.com/ru/post/302604/)
- [JavaScript template engine in just 20 lines](https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)
- [How To Create A Template Engine Using JavaScript](https://hackernoon.com/how-to-create-new-template-engine-using-javascript-8f26313p)
- Underscore templates: [docs](https://underscorejs.org/#template) and [sources](https://underscorejs.org/docs/modules/template.html)

<!-- v -->

### Опрос о занятии
