---
title: Занятие 25
description: «Некоторые паттерны разработки на JavaScript - разделение представления и логики»
---

# OTUS

## Javascript Basic

<!-- v -->

### План вебинара:

- Single responsibility
- Абстракция и инкапсуляция, сервисы
- разбиение на MVC
- использование компонентного подхода

<!-- s -->

## Single responsibility

<!-- v -->

принципы **SOLID** были придуманы Робертом Мартином.

**SRE** - принцип единой ответственности.

Мартин определяет ответственность как причину изменения и заключает, что классы должны иметь одну и только одну причину для изменений.

<!-- v -->

Рассмотрим пример

```js [1-30]
class Car {
  constructor(name, model, year) {
    this.name = name;
    this.model = model;
    this.year = year;
  }
  getCar(id) {
    return this.http.get("api/cars/" + id);
  }
  saveCar() {
    return this.post("api/cars", {
      name: this.name,
      year: this.year,
      model: this.model,
    });
  }
}
```

<!-- v -->

```js [1-30]
class Car {
  constructor(name, model, year) {
    this.name = name;
    this.model = model;
    this.year = year;
  }
}
class CarService {
  getCar(id) {
    return this.http.get("api/cars/" + id);
  }
  saveCar(car) {
    this.http.post("api/cars", car);
  }
}
```

<!-- v -->

Еще один пример:

```js [1-30]
class Product {
  get(name) {}
  set(name, value) {}
  save() {}
  update() {}
  delete() {}
  show() {}
  print() {}
}
```

<!-- v -->

```js [1-30]
class ProductEntity {
  get(name) {}
  set(name, value) {}
}
class ProductRepository {
  save() {}
  update() {}
  delete() {}
}
class ProductView {
  show() {}
  print() {}
}
```

<!-- v -->

Рассмотрим еще один пример, класс User:

```js [1-30]
// сохранение данных
user = new User();
user.firstname = "James";
user.lastname = "Bond";
user.save();

// получение данных из базы
user = new User();
user.getByFirstName("John");

// получение данных их связанной таблицы
role = user2.role;
```

При такой архитектуре все будет хорошо работать если проект будет небольшим. Но с ростом проекта увеличением количества требуемых методов, будет расти и сложность архитектуры, все очень быстро может стать запутанным.

<!-- v -->

Разделить на сущность пользователя класс `UserEntity` и класс для работы с базой данных `UserRepository`:

```js [1-30]
// сохранение данных
user = new UserEntity();
user.firstname = "James";
user.lastname = "Bond";
userRepository = new UserRepository();
userRepository.save(user);
// получение данных
userRepository = new UserRepository();
userRepository.getByFirstName("John");
// получение данных их связанной таблицы
role = userRepository.role;
```

<!-- v -->

Еще один пример. Пусть у нас есть класс, который отвечает как за генерацию отчета и за его отправку определенному пользователю

```js [1-30]
class FinancialReportMailer {
  constructor(transactions, account) {
    this.transactions = transactions;
    this.account = account;
    this.report = "";
  }
  generate_report() {
    // generate report
    this.report = make_report;
  }
  send_report() {}
  // send report this.report
}
mailer = FinancialReportMailer(transactions, account);
mailer.generate_report();
mailer.send_report();
```

<!-- v -->

Давайте посмотрим, как выглядит этот код после того, как мы реорганизовали его для соответствия требованиям SRP:

```js [1-30]
class FinancialReportMailer {
  deliver(report, account) {
    //send report
  }
}
class FinancialReportGenerator {
  generate() {
    // generate report
  }
}

report = FinancialReportGenerator().generate();
FinancialReportMailer.deliver(report, account);
```

Если бы мы хотели расширить класс, отвечающий за генерацию отчетов в будущем, мы могли бы просто внести необходимые изменения, не касаясь класса `FinancialReportMailer`.

<!-- v -->

Важно! Принцип применяется не только к классам, но и функциям:

```js [1-30]
function report() {
  //generate report logic
  //..
  //send report
}
```

```js [1-30]
function generateReport() {
  //generate report logic
}
function sendReport() {
  //send report
}
```

Принцип также масштабируется и в обратную сторону, то есть модуль(со множеством файлом) должен также иметь одну причину для изменения.

<!-- v -->

Этот принцип применяется, когда:

- Нужно сделать код гибким и легко изменяемым.
- Сложно заранее определить вектор изменений.
- Разделение функционала — долгая и сложная операция, нежели его объединение, поэтому отдавайте предпочтение декомпозиции. То есть старайтесь сразу создать архитектуру из небольших, независимых друг от друга сущностей.
  <!-- v -->
  Не используйте этот принцип когда:
- Заранее известно о неизменяемости кода в конкретном месте
- Решение сильно усложняет разработку и поддержку кода. Всегда нужно сохранять баланс между количеством классов и их необходимостью.
<!-- v -->

### Пример когда следовать этому принципу не нужно.

<!-- v -->

Допустим нам нужно написать класс Modem, о котором мы точно знаем что в будущем мы не будем вносить в него изменения.

```js [1-30]
class Modem {
  dial() {}
  hangup() {}
  send(request) {}
  receive() {}
}
```

<!-- v -->

Если мы будем придерживаться принципа SRP, то нам нужно будет разделить этот класс на два класса `DataChannel` для организации соединения и Connection для передачи данных.

```js [1-30]
class DataChannel {
  dial() {}
  hangup() {}
}
class Connection {
  send(request) {}
  receive() {}
}
```

Но так как мы заранее знаем, что мы никогда не будем менять класс Modem, то в данном случае все таки выгоднее оставить все как есть, иначе в будущем наш код будет иметь избыточную сложность

<!-- v -->

### Вопросы?

<!-- s -->

## Абстракция и инкапсуляция, сервисы

<!-- v -->

[Weather](https://github.com/vvscode/otus--javascript-basic/blob/0eb4ce2297ff0ef45aa60d03216166d88ebbd4a0/lessons/lesson09/lecture.md)

<!-- v -->

### Вопросы?

<!-- s -->

## Разбиение на MVC

<!-- v -->

**Разделение ответственностей** — один из основополагающих принципов инженерного дела. В частности — программной инженерии. В информатике разделение ответственностей представляет собой процесс разделения компьютерной программы на функциональные блоки, как можно меньше перекрывающие функции друг друга.

<!-- v -->

**Модель (Model)** предоставляет данные и реагирует на команды контроллера, изменяя своё состояние.

**Представление (View)** отвечает за отображение данных модели пользователю, реагируя на изменения модели.

**Контроллер (Controller)** интерпретирует действия пользователя, оповещая модель о необходимости изменений.

<!-- v -->

![MVC](/images/MVC-Process.png)

<!-- v -->

### Вопросы?

<!-- s -->

## Компонентный подход

<!-- v -->

![MKC](/images/MKC.jpg)

Это международная космическая станция (МКС).

<!-- v -->

А это то, как она устроена (приблизительно):
![MKC](/images/MKC_components.jpg)

<!-- v -->

Международная космическая станция:

- Состоит из множества компонентов.
- Каждый компонент в свою очередь, состоит из множества более мелких деталей.
- Компоненты имеют очень сложное устройство, и гораздо сложнее большинства сайтов.
- Компоненты разработаны на международной основе, командами из разных стран и говорящих на разных языках.
<!-- v -->

### Компонентная архитектура

Хорошо известное правило разработки сложного программного обеспечения гласит: не создавай сложное программное обеспечение.

Если что-то становится сложным – раздели это на более простые части и соедини наиболее очевидным способом.

<!-- v -->

Компоненты могут содержать подкомпоненты, например сообщения могут быть частями родительского компонента «список сообщений». `Кликабельное` фото пользователя может быть самостоятельным компонентом и т.д.

<!-- v -->

Компонент имеет:

- свой собственный JavaScript-класс.
- DOM-структура управляется исключительно своим классом, и внешний код не имеет к ней доступа (принцип «инкапсуляции»).
- CSS-стили, применённые к компоненту.
- API: события, методы класса и т.п., для взаимодействия с другими компонентами.

<!-- v -->

Представим, что нам нужно реализовать простой `ToDo` лист.
![ToDo List](/images/todolist.png)

<!-- v -->

- Какие компоненты будут у приложения?
- Какие слои?
- Как разделить функционал?
<!-- v -->

[Код](https://codesandbox.io/s/github/acsais/otus--javascript-basic/tree/lesson25/lessons/lesson25/code)

<!-- v -->

Разберем по компонентам и слоям
[Игра жизнь](https://github.com/vvscode/otus--javascript-basic/blob/7220c09094fb760e4d25cc246d271b593d185f19/lessons/lesson20/lecture.md#%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B5%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5)

<!-- s -->

[ДЗ](https://github.com/vvscode/js--base-course/tree/master/04/ht)

<!-- v -->

Дополнительные материалы:

[Shadow dom](https://learn.javascript.ru/shadow-dom)

[Пользовательские элементы](https://developer.mozilla.org/ru/docs/Web/Web_Components/Using_custom_elements)

<!-- v -->

### Опрос о занятии
