/**
 * Напишите функцию compose, возвращающую функцию,
 * при вызове которой к аргументу возвращенной функции
 * применяются все переданный в compose функции-аргументы
 */

export const compose = (...args) => {};

// // Пример вызова
// const upperCase = str => str.toUpperCase();
// const exclaim = str => `${str}!`;
// const repeat = str => `${str} `.repeat(3);

// const withСompose = compose(
//   upperCase,
//   exclaim,
//   repeat,
// );

// console.log(withСompose("I love coding")); // I LOVE CODING! I LOVE CODING! I LOVE CODING!
