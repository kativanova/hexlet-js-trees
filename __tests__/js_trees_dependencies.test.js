import { expect, test } from '@jest/globals';
import sortDeps from '../src/js_trees_dependencies.js';

test('general functionality', () => {
  const deps1 = {
    mongo: [],
    tzinfo: ['thread_safe'],
    uglifier: ['execjs'],
    execjs: ['thread_safe', 'json'],
    redis: [],
  };
  const result = ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];
  const actual = sortDeps(deps1);
  expect(actual).toEqual(result);
});
