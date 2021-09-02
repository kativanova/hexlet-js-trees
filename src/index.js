import stringify from './stringify.js';

console.log(stringify('hello')); // hello - значение приведено к строке, но не имеет кавычек
console.log(stringify(true)); // true
console.log(stringify(5)); // 5

const data = { hello: 'world', is: true, nested: { count: 5 } };
console.log(stringify(data)); // то же самое что console.log(stringify(data, ' ', 1);
// {
//  hello: world
//  is: true
//  nested: {
//   count: 5
//  }
// }

console.log(stringify(data, '|-', 2));
// Символ, переданный вторым аргументом повторяется столько раз, сколько указано третьим аргументом.
// {
// |-|-hello: world
// |-|-is: true
// |-|-nested: {
// |-|-|-|-count: 5
// |-|-}
// }
