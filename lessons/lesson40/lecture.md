---
title: Занятие 40
description: Некоторые моменты про деплой одностраничных приложений
---

# OTUS

## Javascript Basic

<!-- v -->

Вопросы?

<!-- s -->

### Ссылки

- [devServer.historyApiFallback](https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback)
- [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath)
- [WebpackHTMLPlugin filename option](https://github.com/jantimon/html-webpack-plugin#options)
- [404 page for Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
- [Пример настройки webpack для работы с history API](https://github.com/vvscode/webpack-gh-pages/pulls)
- [Пример работы роутера с параметризацией](https://gzh7s.csb.app/#city=Moscow)

<!-- s -->

### Домашнее задание

Необходимо:

1. создать и настроить проект\*

2. Разработать библиотеку клиентского роутинга

- конфигурация роутов должна поддерживаться через функции/строки/регулярки
- должна поддерживаться передача параметров в хуки роутера
- реализовать поддержку асинхронных onBeforeEnter, onEnter, onLeave
- добавить настройку для работы с hash/history api
- опубликовать пакет

3. подготовить работу с сдаче

- сделать ревью 2 других работ
- сбросить ссылку на PR, опубликованный проект и рассмотренные пуллреквесты в чат с преподавателем

<!-- v -->

Критерии оценки

- роутер поддерживает роуты из строк - 1 балл
- роутер поддерживает роуты из регулярных выражений - 1 балл
- роутер поддерживает роуты из функций - 1 балл
- роутер поддерживает асинхронные хуки - 1 балл
- роутер поддерживает `onLeave` , `onEnter`, `onBeforeEnter` - 2 балла
- роутер поддерживает переключение api - 1 балл
- пакет опубликован - 1 балл
- сделано ревью 2 проектов - 1 балл
- роутер поддерживает проброс параметров в хуки - 2 балла

Статус принято ставится от 8 баллов

Задание не проверяется при не соответствии базовым требованиям к заданию

<!-- s -->

Вопросы?
