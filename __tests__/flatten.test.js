import flatten from '../src/flatten.js';

test('border cases', () => {
  const list = [];
  expect(flatten(list)).toEqual([]);
});

test('basic functionality', () => {
  const list = [1, 2, [3, 5], [[4, 3], 2]];
  const result = [1, 2, 3, 5, 4, 3, 2];
  expect(flatten(list)).toEqual(result);
});

test('basic functionality 2', () => {
  const list = [[1], 2, [3, 5], [[4, 3], 2]];
  const result = [1, 2, 3, 5, 4, 3, 2];
  expect(flatten(list)).toEqual(result);
});
